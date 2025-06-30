import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";
import { Github, Twitter } from "lucide-react";
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
    signInWithTwitter, 
    signInWithGithub, 
    signUpWithEmail,
    error 
  } = useAuth();

  const form = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const handleSocialLogin = async (provider: 'google' | 'twitter' | 'github') => {
    setIsLoading(true);
    try {
      switch (provider) {
        case 'google':
          await signInWithGoogle();
          break;
        case 'twitter':
          await signInWithTwitter();
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

  const SocialLoginButtons = () => (
    <div className="space-y-3">
      <Button
        type="button"
        variant="outline"
        className="w-full bg-black border-gray-500/20 text-gray-300 hover:bg-gray-800/50 hover:text-gray-200 hover:border-gray-400/40"
        onClick={() => handleSocialLogin('google')}
        disabled={isLoading}
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
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
        className="w-full bg-black border-gray-500/20 text-gray-300 hover:bg-gray-800/50 hover:text-gray-200 hover:border-gray-400/40"
        onClick={() => handleSocialLogin('github')}
        disabled={isLoading}
      >
        <Github className="w-5 h-5 mr-2" />
        Continue with GitHub
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full bg-black border-gray-500/20 text-gray-300 hover:bg-gray-800/50 hover:text-gray-200 hover:border-gray-400/40"
        onClick={() => handleSocialLogin('twitter')}
        disabled={isLoading}
      >
        <Twitter className="w-5 h-5 mr-2" />
        Continue with Twitter
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold bg-gradient-to-tr from-white to-fuchsia-500 text-transparent bg-clip-text">
              Syntaxtual
            </h1>
          </Link>
          <h2 className="mt-6 text-2xl font-bold text-white">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-white/70">
            Join thousands of developers using Syntaxtual
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="bg-red-950/50 border-red-500/50 text-red-200">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Signup Form */}
        <div className="space-y-6 bg-gray-900/50 p-6 rounded-lg border border-gray-500/20">
          <SocialLoginButtons />
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-500/30" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-900/50 px-2 text-gray-400">
                Or create account with email
              </span>
            </div>
          </div>

          <form onSubmit={form.handleSubmit(handleEmailSignup)} className="space-y-4">
            <div>
              <Label htmlFor="displayName" className="text-gray-300">Display Name</Label>
              <Input
                id="displayName"
                type="text"
                placeholder="Enter your display name"
                {...form.register("displayName")}
                className="bg-black border-gray-500/30 text-gray-100 placeholder:text-gray-400/70 focus:border-gray-400"
              />
              {form.formState.errors.displayName && (
                <p className="text-sm text-red-400">{form.formState.errors.displayName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...form.register("email")}
                className="bg-black border-gray-500/30 text-gray-100 placeholder:text-gray-400/70 focus:border-gray-400"
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-400">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                {...form.register("password")}
                className="bg-black border-gray-500/30 text-gray-100 placeholder:text-gray-400/70 focus:border-gray-400"
              />
              {form.formState.errors.password && (
                <p className="text-sm text-red-400">{form.formState.errors.password.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                {...form.register("confirmPassword")}
                className="bg-black border-gray-500/30 text-gray-100 placeholder:text-gray-400/70 focus:border-gray-400"
              />
              {form.formState.errors.confirmPassword && (
                <p className="text-sm text-red-400">{form.formState.errors.confirmPassword.message}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-600/50" 
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-white/70">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;