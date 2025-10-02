/*
  # Update Schema for YAML-Based Agent Assembly

  ## Overview
  Transform the AI Agent Factory into an Agent-as-Code (AAC) platform where agents are defined
  using YAML configuration files and assembled automatically.

  ## Changes

  ### 1. Update `agents` table
  - Add `yaml_config` (text) - The YAML configuration defining the agent
  - Add `config_version` (text) - Version of the config schema
  - Add `agent_type` (text) - Type of agent (chatbot, workflow, api, etc.)
  - Remove `code` column (code is now generated from YAML)
  - Keep model_provider and model_name for backward compatibility

  ### 2. New table: `agent_templates`
  Templates for different types of agents users can start from.
  - `id` (uuid, primary key)
  - `name` (text) - Template name
  - `description` (text) - Template description
  - `agent_type` (text) - Type of agent this template creates
  - `yaml_template` (text) - The YAML template
  - `is_public` (boolean) - Whether template is publicly available
  - `created_by` (uuid, nullable) - User who created template
  - `created_at` (timestamptz)

  ### 3. Security
  - RLS policies for agent_templates table
  - Users can view public templates and their own private templates
  - Only template creators can modify their templates

  ## Important Notes
  - This migration adds new columns to existing tables
  - YAML configs define agent behavior, prompts, tools, and integrations
  - The assembler will parse YAML and generate executable code
  - Existing agents will have null yaml_config until updated
*/

-- Add new columns to agents table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'agents' AND column_name = 'yaml_config'
  ) THEN
    ALTER TABLE agents ADD COLUMN yaml_config text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'agents' AND column_name = 'config_version'
  ) THEN
    ALTER TABLE agents ADD COLUMN config_version text DEFAULT 'v1';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'agents' AND column_name = 'agent_type'
  ) THEN
    ALTER TABLE agents ADD COLUMN agent_type text DEFAULT 'custom';
  END IF;
END $$;

-- Create agent_templates table
CREATE TABLE IF NOT EXISTS agent_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  agent_type text NOT NULL,
  yaml_template text NOT NULL,
  is_public boolean DEFAULT false NOT NULL,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_agent_templates_type ON agent_templates(agent_type);
CREATE INDEX IF NOT EXISTS idx_agent_templates_public ON agent_templates(is_public);
CREATE INDEX IF NOT EXISTS idx_agent_templates_created_by ON agent_templates(created_by);
CREATE INDEX IF NOT EXISTS idx_agents_type ON agents(agent_type);

-- Enable RLS on agent_templates
ALTER TABLE agent_templates ENABLE ROW LEVEL SECURITY;

-- RLS Policies for agent_templates table
CREATE POLICY "Users can view public templates"
  ON agent_templates FOR SELECT
  TO authenticated
  USING (is_public = true OR created_by = auth.uid());

CREATE POLICY "Users can create own templates"
  ON agent_templates FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update own templates"
  ON agent_templates FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can delete own templates"
  ON agent_templates FOR DELETE
  TO authenticated
  USING (created_by = auth.uid());

-- Insert default public templates
INSERT INTO agent_templates (name, description, agent_type, yaml_template, is_public)
VALUES 
(
  'Simple Chatbot',
  'A basic conversational AI agent',
  'chatbot',
  'name: my-chatbot
description: A friendly conversational agent
version: v1

agent:
  type: chatbot
  model:
    provider: openai
    name: gpt-4
  
  personality:
    tone: friendly
    style: conversational
  
  system_prompt: |
    You are a helpful AI assistant. 
    Be concise, friendly, and accurate.
  
  capabilities:
    - conversation
    - question_answering
  
  memory:
    enabled: true
    max_history: 10',
  true
),
(
  'API Integration Agent',
  'Agent that calls external APIs',
  'api',
  'name: api-agent
description: Agent that integrates with external APIs
version: v1

agent:
  type: api
  model:
    provider: anthropic
    name: claude-3-sonnet
  
  tools:
    - name: fetch_weather
      type: api_call
      endpoint: https://api.weather.com/v1/current
      method: GET
      auth:
        type: api_key
        key: ${WEATHER_API_KEY}
    
    - name: send_email
      type: api_call
      endpoint: https://api.sendgrid.com/v3/mail/send
      method: POST
      auth:
        type: bearer
        token: ${SENDGRID_TOKEN}
  
  workflow:
    - step: receive_input
    - step: process_with_ai
    - step: execute_tool
    - step: return_result',
  true
),
(
  'Workflow Automation Agent',
  'Multi-step workflow agent',
  'workflow',
  'name: workflow-agent
description: Automate complex multi-step workflows
version: v1

agent:
  type: workflow
  model:
    provider: google
    name: gemini-pro
  
  triggers:
    - type: webhook
      path: /trigger
    - type: schedule
      cron: "0 9 * * *"
  
  steps:
    - name: collect_data
      action: query_database
      params:
        table: users
        filter: active = true
    
    - name: analyze
      action: ai_process
      prompt: |
        Analyze the following data and provide insights:
        {{previous_step.data}}
    
    - name: notify
      action: send_notification
      channel: email
      template: summary
  
  error_handling:
    retry: 3
    on_failure: log_and_continue',
  true
)
ON CONFLICT DO NOTHING;