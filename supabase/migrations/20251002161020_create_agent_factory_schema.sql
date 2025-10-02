/*
  # AI Agent Factory Schema

  ## Overview
  This migration creates the core database structure for an AI Agent Factory platform that allows users
  to create, manage, and deploy AI agents as code.

  ## 1. New Tables

  ### `agents`
  The main table storing AI agent configurations and code.
  - `id` (uuid, primary key) - Unique identifier for each agent
  - `user_id` (uuid, foreign key) - References auth.users(id) for agent ownership
  - `name` (text) - Agent name
  - `description` (text) - Agent description
  - `code` (text) - The agent's code implementation
  - `model_provider` (text) - AI provider (openai, anthropic, google, etc.)
  - `model_name` (text) - Specific model (gpt-4, claude-3, etc.)
  - `status` (text) - Agent status: draft, active, deployed, failed
  - `deployment_url` (text, nullable) - URL where agent is deployed
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `api_tokens`
  Securely stores encrypted API tokens for different AI providers.
  - `id` (uuid, primary key) - Unique identifier
  - `user_id` (uuid, foreign key) - References auth.users(id)
  - `provider` (text) - Provider name (openai, anthropic, google, etc.)
  - `token_name` (text) - User-friendly name for the token
  - `encrypted_token` (text) - Encrypted API token (client-side encrypted)
  - `is_active` (boolean) - Whether token is currently active
  - `created_at` (timestamptz) - Creation timestamp
  - `last_used_at` (timestamptz, nullable) - Last time token was used

  ### `agent_deployments`
  Tracks deployment history and status of agents.
  - `id` (uuid, primary key) - Unique identifier
  - `agent_id` (uuid, foreign key) - References agents(id)
  - `user_id` (uuid, foreign key) - References auth.users(id)
  - `deployment_status` (text) - Status: pending, deploying, success, failed
  - `deployment_url` (text, nullable) - Deployed agent URL
  - `error_message` (text, nullable) - Error message if deployment failed
  - `logs` (text, nullable) - Deployment logs
  - `created_at` (timestamptz) - Deployment timestamp
  - `completed_at` (timestamptz, nullable) - When deployment finished

  ### `agent_executions`
  Logs of agent execution/invocation for monitoring and analytics.
  - `id` (uuid, primary key) - Unique identifier
  - `agent_id` (uuid, foreign key) - References agents(id)
  - `user_id` (uuid, foreign key) - References auth.users(id)
  - `input` (jsonb) - Input data sent to agent
  - `output` (jsonb, nullable) - Agent response
  - `status` (text) - Execution status: success, error, timeout
  - `duration_ms` (integer) - Execution time in milliseconds
  - `error_message` (text, nullable) - Error if execution failed
  - `created_at` (timestamptz) - Execution timestamp

  ## 2. Security
  - Enable RLS on all tables
  - Users can only access their own agents, tokens, deployments, and executions
  - Separate policies for SELECT, INSERT, UPDATE, and DELETE operations
  - All policies verify authentication and ownership

  ## 3. Important Notes
  - API tokens should be encrypted on the client side before storage
  - Deployment system will use Supabase Edge Functions
  - Agent code will be validated before deployment
  - Execution logs enable monitoring and debugging
*/

-- Create agents table
CREATE TABLE IF NOT EXISTS agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text DEFAULT '',
  code text NOT NULL,
  model_provider text NOT NULL,
  model_name text NOT NULL,
  status text DEFAULT 'draft' NOT NULL CHECK (status IN ('draft', 'active', 'deployed', 'failed')),
  deployment_url text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create api_tokens table
CREATE TABLE IF NOT EXISTS api_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  provider text NOT NULL,
  token_name text NOT NULL,
  encrypted_token text NOT NULL,
  is_active boolean DEFAULT true NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  last_used_at timestamptz
);

-- Create agent_deployments table
CREATE TABLE IF NOT EXISTS agent_deployments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid REFERENCES agents(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  deployment_status text DEFAULT 'pending' NOT NULL CHECK (deployment_status IN ('pending', 'deploying', 'success', 'failed')),
  deployment_url text,
  error_message text,
  logs text,
  created_at timestamptz DEFAULT now() NOT NULL,
  completed_at timestamptz
);

-- Create agent_executions table
CREATE TABLE IF NOT EXISTS agent_executions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid REFERENCES agents(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  input jsonb NOT NULL,
  output jsonb,
  status text DEFAULT 'success' NOT NULL CHECK (status IN ('success', 'error', 'timeout')),
  duration_ms integer,
  error_message text,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_agents_user_id ON agents(user_id);
CREATE INDEX IF NOT EXISTS idx_agents_status ON agents(status);
CREATE INDEX IF NOT EXISTS idx_api_tokens_user_id ON api_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_api_tokens_provider ON api_tokens(provider);
CREATE INDEX IF NOT EXISTS idx_agent_deployments_agent_id ON agent_deployments(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_deployments_user_id ON agent_deployments(user_id);
CREATE INDEX IF NOT EXISTS idx_agent_executions_agent_id ON agent_executions(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_executions_user_id ON agent_executions(user_id);
CREATE INDEX IF NOT EXISTS idx_agent_executions_created_at ON agent_executions(created_at DESC);

-- Enable Row Level Security
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_deployments ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_executions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for agents table
CREATE POLICY "Users can view own agents"
  ON agents FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own agents"
  ON agents FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own agents"
  ON agents FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own agents"
  ON agents FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for api_tokens table
CREATE POLICY "Users can view own API tokens"
  ON api_tokens FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own API tokens"
  ON api_tokens FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own API tokens"
  ON api_tokens FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own API tokens"
  ON api_tokens FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for agent_deployments table
CREATE POLICY "Users can view own agent deployments"
  ON agent_deployments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own agent deployments"
  ON agent_deployments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own agent deployments"
  ON agent_deployments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own agent deployments"
  ON agent_deployments FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for agent_executions table
CREATE POLICY "Users can view own agent executions"
  ON agent_executions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own agent executions"
  ON agent_executions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own agent executions"
  ON agent_executions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own agent executions"
  ON agent_executions FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for agents table
DROP TRIGGER IF EXISTS update_agents_updated_at ON agents;
CREATE TRIGGER update_agents_updated_at
  BEFORE UPDATE ON agents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();