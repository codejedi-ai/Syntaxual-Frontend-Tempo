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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white flex items-center justify-center p-4">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6">
        <Link to="/" className="inline-flex items-center text-slate-400 hover:text-white transition-colors">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to home
        </Link>
      </div>

      {/* Centered Auth Box */}
      <div className="w-full max-w-md bg-slate-800/30 backdrop-blur-md border border-slate-700/40 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create your account</h1>
          <p className="text-slate-300">Join thousands of developers</p>
        </div>

        {error && (
          <Alert variant="destructive" className="bg-red-950/30 border-red-500/40 text-red-300 mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Social Login Buttons */}
        <div className="space-y-3 mb-6">
          <Button
            type="button"
            variant="outline"
            className="w-full bg-transparent border-slate-600/50 text-white hover:bg-slate-800/50 hover:border-indigo-500/50 hover:text-indigo-400 h-12 justify-center transition-all"
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
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
            className="w-full bg-transparent border-slate-600/50 text-white hover:bg-slate-800/50 hover:border-indigo-500/50 hover:text-indigo-400 h-12 justify-center transition-all"
            onClick={() => handleSocialLogin('github')}
            disabled={isLoading}
          >
            <Github className="w-5 h-5 mr-3" />
            Continue with GitHub
          </Button>
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-700/50" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-slate-800/30 px-4 text-slate-400">
              Or create account with email
            </span>
          </div>
        </div>

        {/* Email Form */}
        <form onSubmit={form.handleSubmit(handleEmailSignup)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="displayName" className="text-slate-200">Full name</Label>
              <Input
                id="displayName"
                type="text"
                placeholder="Enter your full name"
                {...form.register("displayName")}
                className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-indigo-500 focus:ring-0 h-12"
              />
              {form.formState.errors.displayName && (
                <p className="text-red-400 text-sm mt-1">{form.formState.errors.displayName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="text-slate-200">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...form.register("email")}
                className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-indigo-500 focus:ring-0 h-12"
              />
              {form.formState.errors.email && (
                <p className="text-red-400 text-sm mt-1">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-slate-200">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                {...form.register("password")}
                className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-indigo-500 focus:ring-0 h-12"
              />
              {form.formState.errors.password && (
                <p className="text-red-400 text-sm mt-1">{form.formState.errors.password.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-slate-200">Confirm password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                {...form.register("confirmPassword")}
                className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-indigo-500 focus:ring-0 h-12"
              />
              {form.formState.errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1">{form.formState.errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-white text-slate-900 hover:bg-slate-50 disabled:opacity-50 h-12 font-semibold" 
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>

          <div className="text-sm text-slate-400 text-center">
            By creating an account, you agree to our{" "}
            <Link to="#" className="text-indigo-300 hover:text-white hover:underline">Terms</Link>
            {" "}and{" "}
            <Link to="#" className="text-indigo-300 hover:text-white hover:underline">Privacy Policy</Link>
          </div>
        </form>

        <div className="text-center mt-8 pt-6 border-t border-slate-700/30">
          <p className="text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-300 hover:text-white hover:underline font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;