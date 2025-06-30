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

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  const { 
    signInWithGoogle, 
    signInWithGithub, 
    signInWithEmail,
    resetPassword,
    error 
  } = useAuth();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
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

  const handleEmailLogin = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      await signInWithEmail(data.email, data.password);
      navigate('/');
    } catch (error) {
      console.error('Email sign-in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!resetEmail) return;
    
    setIsLoading(true);
    try {
      await resetPassword(resetEmail);
      setResetSuccess(true);
    } catch (error) {
      console.error('Password reset error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 text-white flex items-center justify-center p-4">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6">
        <Link to="/" className="inline-flex items-center text-purple-300 hover:text-white transition-colors">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to home
        </Link>
      </div>

      {/* Centered Auth Box */}
      <div className="w-full max-w-md bg-purple-900/20 backdrop-blur-md border border-purple-700/30 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-purple-300">Sign in to your account</p>
        </div>

        {error && (
          <Alert variant="destructive" className="bg-red-950/30 border-red-500/40 text-red-300 mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {showResetForm ? (
          <div className="space-y-6">
            {resetSuccess ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Check your email</h3>
                <p className="text-purple-300">We've sent password reset instructions to your email.</p>
                <Button 
                  className="w-full bg-white text-purple-900 hover:bg-purple-50 h-12"
                  onClick={() => {
                    setShowResetForm(false);
                    setResetSuccess(false);
                    setResetEmail("");
                  }}
                >
                  Back to sign in
                </Button>
              </div>
            ) : (
              <>
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">Reset your password</h3>
                  <p className="text-purple-300">Enter your email and we'll send you a reset link</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="resetEmail" className="text-purple-200">Email</Label>
                    <Input
                      id="resetEmail"
                      type="email"
                      placeholder="Enter your email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="bg-purple-900/30 border-purple-700/50 text-white placeholder:text-purple-400 focus:border-purple-500 focus:ring-0 h-12"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <Button 
                      onClick={handlePasswordReset} 
                      disabled={isLoading || !resetEmail}
                      className="flex-1 bg-white text-purple-900 hover:bg-purple-50 disabled:opacity-50 h-12"
                    >
                      {isLoading ? "Sending..." : "Send reset link"}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowResetForm(false)}
                      className="flex-1 bg-transparent border-purple-600/50 text-purple-200 hover:bg-purple-800/30 hover:text-white h-12"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            {/* Social Login Buttons */}
            <div className="space-y-3 mb-6">
              <Button
                type="button"
                variant="outline"
                className="w-full bg-transparent border-purple-600/50 text-white hover:bg-purple-800/30 hover:text-indigo-400 h-12 justify-center"
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
                className="w-full bg-transparent border-purple-600/50 text-white hover:bg-purple-800/30 hover:text-indigo-400 h-12 justify-center"
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
                <span className="w-full border-t border-purple-700/50" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-purple-900/20 px-4 text-purple-300">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={form.handleSubmit(handleEmailLogin)} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-purple-200">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...form.register("email")}
                    className="bg-purple-900/30 border-purple-700/50 text-white placeholder:text-purple-400 focus:border-purple-500 focus:ring-0 h-12"
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-400 text-sm mt-1">{form.formState.errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="password" className="text-purple-200">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    {...form.register("password")}
                    className="bg-purple-900/30 border-purple-700/50 text-white placeholder:text-purple-400 focus:border-purple-500 focus:ring-0 h-12"
                  />
                  {form.formState.errors.password && (
                    <p className="text-red-400 text-sm mt-1">{form.formState.errors.password.message}</p>
                  )}
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-white text-purple-900 hover:bg-purple-50 disabled:opacity-50 h-12 font-semibold" 
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>

              <div className="text-center">
                <button 
                  type="button" 
                  className="text-purple-300 hover:text-white transition-colors"
                  onClick={() => setShowResetForm(true)}
                >
                  Forgot your password?
                </button>
              </div>
            </form>
          </>
        )}

        <div className="text-center mt-8 pt-6 border-t border-purple-700/30">
          <p className="text-purple-300">
            Don't have an account?{" "}
            <Link to="/signup" className="text-white hover:underline font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;