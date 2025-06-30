import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";
import { Github } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  displayName: z.string().min(2, "Display name must be at least 2 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupForm = z.infer<typeof signupSchema>;

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { 
    signInWithGoogle, 
    signInWithGithub, 
    signUpWithEmail,
    error 
  } = useAuth();

  const form = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    try {
      switch (provider) {
        case 'google':
          await signInWithGoogle();
          break;
        case 'github':
          await signInWithGithub();
          break;
      }
      navigate('/');
    } catch (error) {
      console.error(`${provider} sign-in error:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignup = async (data: SignupForm) => {
    setIsLoading(true);
    try {
      await signUpWithEmail(data.email, data.password, data.displayName);
      navigate('/');
    } catch (error) {
      console.error('Email sign-up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white flex overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4">
        <Link to="/" className="inline-flex items-center text-slate-400 hover:text-white transition-colors">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to home
        </Link>
      </div>

      {/* Left Side - Email Authentication */}
      <div className="flex-1 flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-white mb-1">Create your account</h1>
            <p className="text-slate-300 text-sm">Join thousands of developers</p>
          </div>

          {error && (
            <Alert variant="destructive" className="bg-red-950/30 border-red-500/40 text-red-300 py-2">
              <AlertDescription className="text-sm">{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={form.handleSubmit(handleEmailSignup)} className="space-y-4">
            <div className="space-y-3">
              <div>
                <Label htmlFor="displayName" className="text-slate-200 text-xs">Full name</Label>
                <Input
                  id="displayName"
                  type="text"
                  placeholder="Enter your full name"
                  {...form.register("displayName")}
                  className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-indigo-500 focus:ring-0 h-9 text-sm"
                />
                {form.formState.errors.displayName && (
                  <p className="text-red-400 text-xs mt-1">{form.formState.errors.displayName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="text-slate-200 text-xs">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...form.register("email")}
                  className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-indigo-500 focus:ring-0 h-9 text-sm"
                />
                {form.formState.errors.email && (
                  <p className="text-red-400 text-xs mt-1">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="password" className="text-slate-200 text-xs">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  {...form.register("password")}
                  className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-indigo-500 focus:ring-0 h-9 text-sm"
                />
                {form.formState.errors.password && (
                  <p className="text-red-400 text-xs mt-1">{form.formState.errors.password.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-slate-200 text-xs">Confirm password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  {...form.register("confirmPassword")}
                  className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-indigo-500 focus:ring-0 h-9 text-sm"
                />
                {form.formState.errors.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1">{form.formState.errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-white text-slate-900 hover:bg-slate-50 disabled:opacity-50 h-9 font-medium text-sm" 
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>

            <div className="text-xs text-slate-400 text-center leading-tight">
              By creating an account, you agree to our{" "}
              <Link to="#" className="text-indigo-300 hover:text-white hover:underline">Terms</Link>
              {" "}and{" "}
              <Link to="#" className="text-indigo-300 hover:text-white hover:underline">Privacy Policy</Link>
            </div>
          </form>

          <div className="text-center">
            <p className="text-slate-400 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-300 hover:text-white hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-px bg-slate-700/50"></div>

      {/* Right Side - Federated Authentication */}
      <div className="flex-1 flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white mb-1">Continue with</h2>
            <p className="text-slate-300 text-sm">Get started in seconds</p>
          </div>

          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full bg-transparent border-slate-600/50 text-white hover:bg-slate-800/50 hover:border-indigo-500/50 hover:text-indigo-400 h-9 justify-start text-sm transition-all"
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading}
            >
              <svg className="w-4 h-4 mr-3" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full bg-transparent border-slate-600/50 text-white hover:bg-slate-800/50 hover:border-indigo-500/50 hover:text-indigo-400 h-9 justify-start text-sm transition-all"
              onClick={() => handleSocialLogin('github')}
              disabled={isLoading}
            >
              <Github className="w-4 h-4 mr-3" />
              Continue with GitHub
            </Button>
          </div>

          <div className="text-center">
            <div className="bg-slate-800/30 p-3 rounded-lg border border-slate-700/50">
              <h3 className="text-sm font-medium text-white mb-2">Join the community</h3>
              <div className="grid grid-cols-2 gap-3 text-center mb-2">
                <div>
                  <div className="text-base font-semibold text-indigo-300">10K+</div>
                  <div className="text-xs text-slate-400">Developers</div>
                </div>
                <div>
                  <div className="text-base font-semibold text-indigo-300">1M+</div>
                  <div className="text-xs text-slate-400">Lines analyzed</div>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-tight">
                Social login creates your profile instantly and gets you started right away.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;