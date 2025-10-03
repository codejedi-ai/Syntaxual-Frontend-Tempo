import { Link, Navigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import FeatureCard from "@/components/landing/FeatureCard"
import { Code, Zap, Globe, Shield, Sparkle, Layers } from "lucide-react"
import CodeEditor from "@/components/landing/CodeEditor"
import { scrollToSection } from "@/utils/scrollUtils"
import { useRef } from "react"
import HeroSection from "@/components/landing/HeroSection"
import FeatureGrid from "@/components/landing/FeatureGrid"
import Layout from "@/components/Layout"
import { useAuth } from "@/hooks/useAuth"

export default function Home() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleNavItemClick = (sectionId: string) => {
    scrollToSection(sectionId);
  };

  return (
    <Layout onNavItemClick={handleNavItemClick}>
      {/* Hero Section */}
      <section id="hero">
        <HeroSection onGetStarted={() => handleNavItemClick("features")} />
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto py-24 px-4 min-h-screen flex flex-col justify-center">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Self-Replicating Agent Ecosystem</h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            AI agents that create more agents using MCP servers. Code becomes living DNA in an evolving ecosystem.
          </p>
        </div>

        <FeatureGrid
          features={[
            {
              icon: "ai",
              title: "MCP Server Integration",
              description: "Agents connect to Model Context Protocol servers to access tools and generate new agents."
            },
            {
              icon: "code",
              title: "Code as DNA",
              description: "YAML configurations act as genetic code. Agents replicate, mutate, and evolve."
            },
            {
              icon: "git",
              title: "Self-Generation",
              description: "AI agents use MCP servers to create new specialized agents automatically."
            },
            {
              icon: "ai",
              title: "Agent Evolution",
              description: "Agents learn from execution history and improve their own code over time."
            },
            {
              icon: "code",
              title: "MCP Tool Access",
              description: "Agents leverage MCP tools for file systems, databases, APIs, and more."
            },
            {
              icon: "git",
              title: "Ecosystem Growth",
              description: "Watch your agent population grow and specialize organically."
            }
          ]}
          className="bg-transparent"
        />
      </section>

      {/* Demo Section */}
      <section id="demo" className="container mx-auto py-12 px-4 h-screen flex flex-col">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Agent DNA in Action</h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            YAML code becomes the genetic blueprint. Agents inherit, mutate, and spawn new capabilities.
          </p>
        </div>
        
        <div className="flex-1 w-full">
          <CodeEditor
            initialCode={`# Agent DNA - Self-Replicating Configuration
name: agent-factory
description: Agent that creates specialized agents using MCP
version: v1

agent:
  type: generator
  model:
    provider: anthropic
    name: claude-3-5-sonnet

  mcp_servers:
    - name: filesystem
      config:
        allowed_dirs: ["/agents"]
    - name: supabase
      config:
        table: "agents"

  capabilities:
    - agent_generation
    - code_mutation
    - mcp_tool_access

  replication:
    enabled: true
    trigger: on_demand
    mutation_rate: 0.1

  system_prompt: |
    You are an agent factory. You create specialized
    agents by:
    1. Analyzing requirements
    2. Generating YAML DNA
    3. Using MCP tools to deploy
    4. Tracking offspring evolution`}
            className="w-full h-full"
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto py-24 px-4 min-h-screen flex flex-col justify-center">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Evolution of SyntaxTual</h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            From coding assistant to self-replicating agent ecosystem powered by MCP.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="bg-gradient-to-tr from-purple-900/30 to-fuchsia-900/30 rounded-xl p-8 h-[400px] flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">🧬</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-white/70">
                Create a living ecosystem where AI agents generate, evolve, and specialize using MCP servers. Code becomes DNA.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-r from-purple-900/20 to-transparent rounded-xl p-6 border-l-4 border-purple-500">
              <h4 className="text-xl font-semibold mb-2">Phase 1: Coding Buddy</h4>
              <p className="text-white/70">
                Started as a development assistant, similar to Cursor. Helped developers write better code faster.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-900/20 to-transparent rounded-xl p-6 border-l-4 border-fuchsia-500">
              <h4 className="text-xl font-semibold mb-2">Phase 2: Agent-as-Code</h4>
              <p className="text-white/70">
                Evolved into declarative agent definitions. YAML configurations became the language for building AI agents.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-900/20 to-transparent rounded-xl p-6 border-l-4 border-cyan-500">
              <h4 className="text-xl font-semibold mb-2">Phase 3: Living Ecosystem</h4>
              <p className="text-white/70">
                AI agents now use MCP servers to create more agents. A self-sustaining, evolving system where code is DNA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="container mx-auto py-24 px-4">
        <div className="bg-gradient-to-r from-purple-900/40 to-fuchsia-900/40 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-fuchsia-500/10 rounded-3xl opacity-30 blur-3xl"></div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the Agent Evolution</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
            Create agents that create agents. Be part of the living ecosystem where code becomes DNA.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700" onClick={() => window.location.href = '/dashboard'}>
            Start Your Agent Factory
          </Button>
        </div>
      </section>
    </Layout>
  );
}