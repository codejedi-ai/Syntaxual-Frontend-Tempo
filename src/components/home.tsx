import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import FeatureCard from "@/components/landing/FeatureCard"
import { Code, Zap, Globe, Shield, Sparkle, Layers } from "lucide-react"
import CodeEditor from "@/components/landing/CodeEditor"
import Header from "@/components/Header"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/30 to-black text-white pt-16">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto py-16 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-fuchsia-600/10 rounded-3xl opacity-30 blur-3xl -z-10"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-tr from-white to-fuchsia-500 text-transparent bg-clip-text">Syntaxual</span>
              <br />
              AI Coding Buddy
            </h1>
            <p className="text-xl text-white/70 max-w-xl">
              Your intelligent coding companion that helps you write better code faster. Powered by advanced AI to understand your coding style and needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700">
                Try For Free
              </Button>
              <Button size="lg" className="border-purple-500 text-white hover:bg-purple-500/10">
                Learn More
              </Button>
            </div>
          </div>
          <div className="order-first lg:order-last mx-auto w-full max-w-[90vw] md:max-w-[600px] lg:max-w-[500px] xl:max-w-[650px]">
            <CodeEditor />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-24 px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Smart Features for Modern Developers</h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Syntaxual offers tools and features designed to streamline your development workflow and enhance productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon="ai"
            title="Intelligent Code Completion"
            description="Get smart code suggestions based on context and your coding patterns."
          />
          <FeatureCard 
            icon="ai"
            title="Code Refactoring"
            description="Automatically identify and fix code smells and improve your code quality."
          />
          <FeatureCard 
            icon="ai"
            title="Multi-language Support"
            description="Works with JavaScript, TypeScript, Python, Java, and many more languages."
          />
          <FeatureCard 
            icon="ai"
            title="Security Analysis"
            description="Detect potential security vulnerabilities in your code as you type."
          />
          <FeatureCard 
            icon="ai"
            title="AI-Powered Documentation"
            description="Generate comprehensive documentation for your code with a single click."
          />
          <FeatureCard 
            icon="ai"
            title="Integration Ecosystem"
            description="Seamlessly integrates with your favorite IDEs and development tools."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto py-24 px-4">
        <div className="bg-gradient-to-r from-purple-900/40 to-fuchsia-900/40 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-fuchsia-500/10 rounded-3xl opacity-30 blur-3xl"></div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Supercharge Your Coding?</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
            Join thousands of developers who are already using Syntaxual to write better code faster.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700">
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto py-2 px-4 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold bg-gradient-to-tr from-white to-fuchsia-500 text-transparent bg-clip-text">Syntaxual</h3>
            <p className="text-white/50">© 2023 Syntaxual. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <Link to="#" className="text-white/70 hover:text-white">About</Link>
            <Link to="#" className="text-white/70 hover:text-white">Pricing</Link>
            <Link to="#" className="text-white/70 hover:text-white">Documentation</Link>
            <Link to="#" className="text-white/70 hover:text-white">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

