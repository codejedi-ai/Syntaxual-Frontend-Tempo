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
      <section id="hero" className="container mx-auto py-24 px-4 relative min-h-screen flex items-center">
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
              <Button 
                variant="gradient"
                size="lg" 
                onClick={() => handleNavItemClick("features")}
              >
                Explore Features
              </Button>
              <Button 
                variant="gradient"
                size="lg" 
                onClick={() => handleNavItemClick("pricing")}
              >
                View Pricing
              </Button>
            </div>
          </div>
          <div className="order-first lg:order-last mx-auto w-full max-w-[90vw] md:max-w-[600px] lg:max-w-[500px] xl:max-w-[650px]">
            <CodeEditor />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto py-24 px-4 min-h-screen flex flex-col justify-center">
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
            icon="code"
            title="Code Refactoring"
            description="Automatically identify and fix code smells and improve your code quality."
          />
          <FeatureCard 
            icon="git"
            title="Multi-language Support"
            description="Works with JavaScript, TypeScript, Python, Java, and many more languages."
          />
          <FeatureCard 
            icon="ai"
            title="Security Analysis"
            description="Detect potential security vulnerabilities in your code as you type."
          />
          <FeatureCard 
            icon="code"
            title="AI-Powered Documentation"
            description="Generate comprehensive documentation for your code with a single click."
          />
          <FeatureCard 
            icon="git"
            title="Integration Ecosystem"
            description="Seamlessly integrates with your favorite IDEs and development tools."
          />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto py-24 px-4 min-h-screen flex flex-col justify-center">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Choose the plan that fits your needs. All plans include core features with different usage limits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="bg-gradient-to-b from-purple-900/20 to-transparent rounded-xl border border-purple-500/20 p-8 hover:border-purple-500/50 transition-all">
            <h3 className="text-xl font-bold mb-2">Free</h3>
            <p className="text-4xl font-bold mb-6">$0<span className="text-lg font-normal text-white/70">/month</span></p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-white/80">
                <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center mr-2">✓</div>
                Basic code suggestions
              </li>
              <li className="flex items-center text-white/80">
                <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center mr-2">✓</div>
                5 projects
              </li>
              <li className="flex items-center text-white/80">
                <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center mr-2">✓</div>
                Community support
              </li>
            </ul>
            <Button variant="subtle" className="w-full">Get Started</Button>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-b from-fuchsia-900/30 to-transparent rounded-xl border border-fuchsia-500/30 p-8 hover:border-fuchsia-500/60 transition-all transform scale-105 shadow-lg">
            <div className="bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full inline-block mb-4">Most Popular</div>
            <h3 className="text-xl font-bold mb-2">Pro</h3>
            <p className="text-4xl font-bold mb-6">$19<span className="text-lg font-normal text-white/70">/month</span></p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-white/80">
                <div className="w-5 h-5 rounded-full bg-fuchsia-500/20 flex items-center justify-center mr-2">✓</div>
                Advanced code suggestions
              </li>
              <li className="flex items-center text-white/80">
                <div className="w-5 h-5 rounded-full bg-fuchsia-500/20 flex items-center justify-center mr-2">✓</div>
                Unlimited projects
              </li>
              <li className="flex items-center text-white/80">
                <div className="w-5 h-5 rounded-full bg-fuchsia-500/20 flex items-center justify-center mr-2">✓</div>
                Priority support
              </li>
              <li className="flex items-center text-white/80">
                <div className="w-5 h-5 rounded-full bg-fuchsia-500/20 flex items-center justify-center mr-2">✓</div>
                Code quality metrics
              </li>
            </ul>
            <Button variant="gradient" className="w-full">Subscribe Now</Button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-gradient-to-b from-purple-900/20 to-transparent rounded-xl border border-purple-500/20 p-8 hover:border-purple-500/50 transition-all">
            <h3 className="text-xl font-bold mb-2">Enterprise</h3>
            <p className="text-4xl font-bold mb-6">$49<span className="text-lg font-normal text-white/70">/month</span></p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-white/80">
                <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center mr-2">✓</div>
                Everything in Pro
              </li>
              <li className="flex items-center text-white/80">
                <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center mr-2">✓</div>
                Team collaboration
              </li>
              <li className="flex items-center text-white/80">
                <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center mr-2">✓</div>
                Custom integrations
              </li>
              <li className="flex items-center text-white/80">
                <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center mr-2">✓</div>
                Dedicated support
              </li>
            </ul>
            <Button variant="subtle" className="w-full">Contact Sales</Button>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="container mx-auto py-24 px-4 min-h-screen flex flex-col justify-center">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Syntaxual</h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            We're a team of developers and AI experts passionate about creating better coding tools.
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
                To transform the way developers write code by providing intelligent tools that understand code context and developer intent.
              </p>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-purple-900/20 to-transparent rounded-xl p-6 border-l-4 border-purple-500">
              <h4 className="text-xl font-semibold mb-2">Founded by Developers</h4>
              <p className="text-white/70">
                Created by a team who understands the challenges of modern software development firsthand.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-900/20 to-transparent rounded-xl p-6 border-l-4 border-fuchsia-500">
              <h4 className="text-xl font-semibold mb-2">Cutting-Edge AI</h4>
              <p className="text-white/70">
                We leverage the latest in machine learning to build AI that truly understands code patterns and best practices.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-900/20 to-transparent rounded-xl p-6 border-l-4 border-purple-500">
              <h4 className="text-xl font-semibold mb-2">Developer-First Philosophy</h4>
              <p className="text-white/70">
                Every feature we build is designed to fit seamlessly into your workflow and make you more productive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="container mx-auto py-24 px-4">
        <div className="bg-gradient-to-r from-purple-900/40 to-fuchsia-900/40 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-fuchsia-500/10 rounded-3xl opacity-30 blur-3xl"></div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Supercharge Your Coding?</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
            Join thousands of developers who are already using Syntaxual to write better code faster.
          </p>
          <Button variant="gradient" size="lg">
            Get Started Now
          </Button>
        </div>
      </section>
    </Layout>
  );
}

