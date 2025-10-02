import yaml from 'js-yaml'

export interface AgentConfig {
  name: string
  description: string
  version: string
  agent: {
    type: string
    model: {
      provider: string
      name: string
    }
    personality?: {
      tone?: string
      style?: string
    }
    system_prompt?: string
    capabilities?: string[]
    memory?: {
      enabled: boolean
      max_history?: number
    }
    tools?: Array<{
      name: string
      type: string
      endpoint?: string
      method?: string
      auth?: {
        type: string
        key?: string
        token?: string
      }
    }>
    triggers?: Array<{
      type: string
      path?: string
      cron?: string
    }>
    steps?: Array<{
      name: string
      action: string
      params?: any
      prompt?: string
      channel?: string
      template?: string
    }>
    workflow?: string[]
    error_handling?: {
      retry?: number
      on_failure?: string
    }
  }
}

export class AgentAssembler {
  static parseYAML(yamlString: string): AgentConfig {
    try {
      const config = yaml.load(yamlString) as AgentConfig
      this.validateConfig(config)
      return config
    } catch (error) {
      throw new Error(`YAML parse error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  static validateConfig(config: AgentConfig): void {
    if (!config.name) {
      throw new Error('Agent name is required')
    }
    if (!config.agent) {
      throw new Error('Agent configuration is required')
    }
    if (!config.agent.type) {
      throw new Error('Agent type is required')
    }
    if (!config.agent.model || !config.agent.model.provider || !config.agent.model.name) {
      throw new Error('Agent model configuration is required')
    }
  }

  static assembleToCode(config: AgentConfig): string {
    const agentType = config.agent.type

    switch (agentType) {
      case 'chatbot':
        return this.assembleChatbot(config)
      case 'api':
        return this.assembleAPIAgent(config)
      case 'workflow':
        return this.assembleWorkflowAgent(config)
      default:
        return this.assembleGenericAgent(config)
    }
  }

  private static assembleChatbot(config: AgentConfig): string {
    const systemPrompt = config.agent.system_prompt || 'You are a helpful AI assistant.'
    const memoryEnabled = config.agent.memory?.enabled || false
    const maxHistory = config.agent.memory?.max_history || 10

    return `import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SYSTEM_PROMPT = \`${systemPrompt}\`;
const MEMORY_ENABLED = ${memoryEnabled};
const MAX_HISTORY = ${maxHistory};

const conversationHistory = new Map();

async function processRequest(input: any, agentConfig: any) {
  const { message, userId, conversationId } = input;

  let history = [];
  if (MEMORY_ENABLED && conversationId) {
    history = conversationHistory.get(conversationId) || [];
  }

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history.slice(-MAX_HISTORY),
    { role: "user", content: message }
  ];

  const response = {
    agent: "${config.name}",
    type: "chatbot",
    reply: "This is a simulated response. Integrate with your AI provider here.",
    conversationId: conversationId || Date.now().toString(),
    timestamp: new Date().toISOString()
  };

  if (MEMORY_ENABLED && conversationId) {
    history.push({ role: "user", content: message });
    history.push({ role: "assistant", content: response.reply });
    conversationHistory.set(conversationId, history);
  }

  return response;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const input = await req.json();
    const result = await processRequest(input, {
      provider: "${config.agent.model.provider}",
      model: "${config.agent.model.name}"
    });

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});`
  }

  private static assembleAPIAgent(config: AgentConfig): string {
    const tools = config.agent.tools || []
    const toolDefinitions = tools.map(tool => `
  {
    name: "${tool.name}",
    endpoint: "${tool.endpoint || ''}",
    method: "${tool.method || 'GET'}",
    authType: "${tool.auth?.type || 'none'}"
  }`).join(',')

    return `import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const TOOLS = [${toolDefinitions}];

async function callTool(toolName: string, params: any) {
  const tool = TOOLS.find(t => t.name === toolName);
  if (!tool) throw new Error(\`Tool \${toolName} not found\`);

  const response = await fetch(tool.endpoint, {
    method: tool.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: tool.method !== 'GET' ? JSON.stringify(params) : undefined
  });

  return await response.json();
}

async function processRequest(input: any, agentConfig: any) {
  const { action, tool, params } = input;

  if (tool) {
    const result = await callTool(tool, params);
    return {
      agent: "${config.name}",
      type: "api",
      tool: tool,
      result: result,
      timestamp: new Date().toISOString()
    };
  }

  return {
    agent: "${config.name}",
    type: "api",
    availableTools: TOOLS.map(t => t.name),
    message: "Provide a tool name and params to execute",
    timestamp: new Date().toISOString()
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const input = await req.json();
    const result = await processRequest(input, {
      provider: "${config.agent.model.provider}",
      model: "${config.agent.model.name}"
    });

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});`
  }

  private static assembleWorkflowAgent(config: AgentConfig): string {
    const steps = config.agent.steps || []
    const stepsCode = steps.map((step, idx) => `
    // Step ${idx + 1}: ${step.name}
    stepResults.push({
      step: "${step.name}",
      action: "${step.action}",
      status: "completed",
      timestamp: new Date().toISOString()
    });`).join('\n')

    return `import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

async function processRequest(input: any, agentConfig: any) {
  const stepResults = [];

  ${stepsCode}

  return {
    agent: "${config.name}",
    type: "workflow",
    steps: stepResults,
    status: "completed",
    timestamp: new Date().toISOString()
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const input = await req.json();
    const result = await processRequest(input, {
      provider: "${config.agent.model.provider}",
      model: "${config.agent.model.name}"
    });

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});`
  }

  private static assembleGenericAgent(config: AgentConfig): string {
    return `import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

async function processRequest(input: any, agentConfig: any) {
  return {
    agent: "${config.name}",
    type: "${config.agent.type}",
    provider: agentConfig.provider,
    model: agentConfig.model,
    input: input,
    timestamp: new Date().toISOString()
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const input = await req.json();
    const result = await processRequest(input, {
      provider: "${config.agent.model.provider}",
      model: "${config.agent.model.name}"
    });

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});`
  }
}
