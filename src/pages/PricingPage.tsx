import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function PricingPage() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <Layout>
      <section className="container mx-auto py-24 px-4 min-h-screen flex flex-col justify-center">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Choose the plan that fits your needs. All plans include core features with different usage limits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <div className="bg-gradient-to-b from-purple-900/20 to-transparent rounded-xl border border-purple-500/20 p-8 hover:border-purple-500/50 transition-all flex flex-col">
            <h3 className="text-xl font-bold mb-2">Free</h3>
            <p className="text-4xl font-bold mb-6">$0<span className="text-lg font-normal text-white/70">/month</span></p>
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-center text-white/80">
                <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center mr-2">✓</div>
                3 AI agents
              </li>
              <li className="flex items-center text-white/80">
                <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center mr-2">✓</div>
                1,000 executions/month
              </li>
              <li className="flex items-center text-white/80">
                <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center mr-2">✓</div>
                Community support
              </li>
            </ul>
            <Button variant="outline" className="w-full mt-auto">Get Started</Button>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-b from-fuchsia-900/30 to-transparent rounded-xl border border-fuchsia-500/30 p-8 hover:border-fuchsia-500/60 transition-all transform scale-105 shadow-lg flex flex-col">
            <div className="bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full inline-block mb-4">Most Popular</div>
            <h3 className="text-xl font-bold mb-2">Pro</h3>
            <p className="text-4xl font-bold mb-6">$19<span className="text-lg font-normal text-white/70">/month</span></p>
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-center text-white/80">
                <div className="w-5 h-5 rounded-full bg-fuchsia-500/20 flex items-center justify-center mr-2">✓</div>
                Unlimited agents
              </li>
              <li className="flex items-center text-white/80">
                <div className="w-5 h-5 rounded-full bg-fuchsia-500/20 flex items-center justify-center mr-2">✓</div>
                50,000 executions/month
              </li>
              <li className="flex items-center text-white/80">
                <div className="w-5 h-5 rounded-full bg-fuchsia-500/20 flex items-center justify-center mr-2">✓</div>
                Priority support
              </li>
              <li className="flex items-center text-white/80">
                <div className="w-5 h-5 rounded-full bg-fuchsia-500/20 flex items-center justify-center mr-2">✓</div>
                Advanced monitoring
              </li>
            </ul>
            <Button variant="default" className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 mt-auto">Subscribe Now</Button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-gradient-to-b from-purple-900/20 to-transparent rounded-xl border border-purple-500/20 p-8 hover:border-purple-500/50 transition-all flex flex-col">
            <h3 className="text-xl font-bold mb-2">Enterprise</h3>
            <p className="text-4xl font-bold mb-6">$49<span className="text-lg font-normal text-white/70">/month</span></p>
            <ul className="space-y-3 mb-8 flex-grow">
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
            <Button variant="outline" className="w-full mt-auto">Contact Sales</Button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-12">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-900/20 to-transparent rounded-lg p-6 border border-purple-500/10">
              <h4 className="text-lg font-semibold mb-2">What counts as an execution?</h4>
              <p className="text-white/70">An execution is each time your AI agent processes a request, whether it's answering a question, making an API call, or running a workflow step.</p>
            </div>
            <div className="bg-gradient-to-r from-purple-900/20 to-transparent rounded-lg p-6 border border-purple-500/10">
              <h4 className="text-lg font-semibold mb-2">Can I upgrade or downgrade my plan?</h4>
              <p className="text-white/70">Yes, you can change your plan at any time. Upgrades are immediate, and downgrades take effect at the end of your billing cycle.</p>
            </div>
            <div className="bg-gradient-to-r from-purple-900/20 to-transparent rounded-lg p-6 border border-purple-500/10">
              <h4 className="text-lg font-semibold mb-2">Do you offer refunds?</h4>
              <p className="text-white/70">We offer a 14-day money-back guarantee on all paid plans. If you're not satisfied, contact us for a full refund.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
