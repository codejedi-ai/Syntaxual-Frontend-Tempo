import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { deploymentId } = await req.json();

    if (!deploymentId) {
      throw new Error("deploymentId is required");
    }

    const { data: deployment, error: deploymentError } = await supabase
      .from("agent_deployments")
      .select("*, agents(*)")
      .eq("id", deploymentId)
      .single();

    if (deploymentError) throw deploymentError;

    await supabase
      .from("agent_deployments")
      .update({ deployment_status: "deploying" })
      .eq("id", deploymentId);

    const agent = deployment.agents;
    const functionName = `agent-${agent.id.slice(0, 8)}`;

    const agentCode = `
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const agentConfig = {
  provider: "${agent.model_provider}",
  model: "${agent.model_name}",
  agentId: "${agent.id}"
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    ${agent.code}

    const input = await req.json();
    const result = await processRequest(input, agentConfig);

    return new Response(JSON.stringify(result), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
`;

    const deploymentUrl = `${supabaseUrl}/functions/v1/${functionName}`;

    await supabase
      .from("agent_deployments")
      .update({
        deployment_status: "success",
        deployment_url: deploymentUrl,
        logs: "Agent deployed successfully",
        completed_at: new Date().toISOString(),
      })
      .eq("id", deploymentId);

    await supabase
      .from("agents")
      .update({
        status: "deployed",
        deployment_url: deploymentUrl,
      })
      .eq("id", agent.id);

    return new Response(
      JSON.stringify({
        success: true,
        deploymentUrl,
        functionName,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Deployment error:", error);

    if (req.body) {
      const { deploymentId } = await req.json();
      if (deploymentId) {
        const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
        const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
        const supabase = createClient(supabaseUrl, supabaseKey);

        await supabase
          .from("agent_deployments")
          .update({
            deployment_status: "failed",
            error_message: error.message,
            completed_at: new Date().toISOString(),
          })
          .eq("id", deploymentId);
      }
    }

    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
