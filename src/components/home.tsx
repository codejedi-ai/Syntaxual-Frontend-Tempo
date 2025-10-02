import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import FeatureCard from "@/components/landing/FeatureCard"
import { Code, Zap, Globe, Shield, Sparkle, Layers } from "lucide-react"
import CodeEditor from "@/components/landing/CodeEditor"
import { scrollToSection } from "@/utils/scrollUtils"
import { useRef } from "react"
import HeroSection from "@/components/landing/HeroSection"
import FeatureGrid from "@/components/landing/FeatureGrid"
import Layout from "@/components/Layout"

export default function Home() {
  const handleNavItemClick = (sectionId: string) => {
    scrollToSection(sectionId);
  };

  return (
    <Layout onNavItemClick={handleNavItemClick}>
      {/* Hero Section */}
      <section id="hero">
        <HeroSection
          title="Agent-as-Code Platform"
          subtitle="Syntaxtual: Define AI agents with YAML. Deploy autonomous systems instantly. Infrastructure-as-Code for AI agents - AAC (Agentic Software Service)."
          onGetStarted={() => handleNavItemClick("features")}
        />
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto py-24 px-4 min-h-screen flex flex-col justify-center">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">YAML-Powered Agent Assembly</h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Define agents declaratively with YAML. Our assembler generates production-ready code automatically. Agent-as-Code made simple.
          </p>
        </div>

        <FeatureGrid
          features={[
            {
              icon: "ai",
              title: "YAML Configuration",
              description: "Declarative agent definitions. Write YAML, deploy agents. Infrastructure-as-Code for AI."
            },
            {
              icon: "code",
              title: "Automatic Assembly",
              description: "YAML to production code instantly. Our assembler handles the complexity."
            },
            {
              icon: "git",
              title: "Multi-Agent Systems",
              description: "Build complex agent workflows. Chatbots, APIs, workflows, and more."
            },
            {
              icon: "ai",
              title: "Secure API Tokens",
              description: "Encrypted storage for your API keys. Your credentials stay safe."
            },
            {
              icon: "code",
              title: "Execution Monitoring",
              description: "Track agent performance, inputs, outputs, and errors in real-time."
            },
            {
              icon: "git",
              title: "Version Control",
              description: "Full deployment history. Roll back to any version instantly."
            }
          ]}
          className="bg-transparent"
        />
      </section>

      {/* Demo Section */}
      <section id="demo" className="container mx-auto py-12 px-4 h-screen flex flex-col">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Write YAML, Deploy Agents</h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Simple YAML configurations become production-ready AI agents in seconds.
          </p>
        </div>
        
        <div className="flex-1 w-full">
          <CodeEditor 
            initialCode={`name: customer-support-bot
description: AI customer support agent
version: v1

agent:
  type: chatbot
  model:
    provider: openai
    name: gpt-4

  personality:
    tone: friendly
    style: helpful

  system_prompt: |
    You are a helpful customer support agent.
    Assist users with their inquiries.

  capabilities:
    - conversation
    - question_answering

  memory:
    enabled: true
    max_history: 10`}
            className="w-full h-full"
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto py-24 px-4 min-h-screen flex flex-col justify-center">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Syntaxtual</h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Agent-as-Code platform. Define AI agents declaratively, deploy instantly. AAC - Agentic Software Service.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="bg-gradient-to-tr from-purple-900/30 to-fuchsia-900/30 rounded-xl p-8 h-[400px] flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-white/70">
                Make AI agent development as simple as writing YAML. No AI expertise required. Agent-as-Code for everyone.
              </p>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-purple-900/20 to-transparent rounded-xl p-6 border-l-4 border-purple-500">
              <h4 className="text-xl font-semibold mb-2">Declarative Configuration</h4>
              <p className="text-white/70">
                YAML-based agent definitions. Version control friendly. Infrastructure-as-Code principles for AI.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-900/20 to-transparent rounded-xl p-6 border-l-4 border-fuchsia-500">
              <h4 className="text-xl font-semibold mb-2">Automatic Code Generation</h4>
              <p className="text-white/70">
                Our assembler converts YAML to production-ready code. Deploy chatbots, APIs, and workflows instantly.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-900/20 to-transparent rounded-xl p-6 border-l-4 border-purple-500">
              <h4 className="text-xl font-semibold mb-2">Template Library</h4>
              <p className="text-white/70">
                Start from pre-built templates. Chatbots, API agents, workflows. Customize and deploy in minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="container mx-auto py-24 px-4">
        <div className="bg-gradient-to-r from-purple-900/40 to-fuchsia-900/40 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-fuchsia-500/10 rounded-3xl opacity-30 blur-3xl"></div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build Your AI Agent?</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
            Join developers building the next generation of autonomous AI systems.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700" onClick={() => window.location.href = '/dashboard'}>
            Start Building Free
          </Button>
        </div>
      </section>
    </Layout>
  );
}