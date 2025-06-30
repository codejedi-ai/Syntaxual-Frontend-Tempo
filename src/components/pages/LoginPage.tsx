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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-950 to-indigo-950 text-white">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6">
        <Link to="/" className="inline-block">
          <h1 className="text-2xl font-bold bg-gradient-to-tr from-white to-fuchsia-500 text-transparent bg-clip-text">
            Syntaxtual
          </h1>
        </Link>
      </div>

      <div className="flex min-h-screen">
        {/* Left Side - Email Authentication */}
        <div className="flex-1 flex items-center justify-center px-8 py-16 bg-gradient-to-br from-slate-900/50 to-violet-900/30">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-100 to-violet-200 text-transparent bg-clip-text">
                Welcome back
              </h2>
              <p className="mt-2 text-lg text-slate-300">
                Sign in to your account
              </p>
            </div>

            {error && (
              <Alert variant="destructive" className="bg-red-950/50 border-red-500/50 text-red-200">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {showResetForm ? (
              <div className="space-y-6 bg-slate-800/40 backdrop-blur-sm p-8 rounded-xl border border-violet-500/30 shadow-xl">
                {resetSuccess ? (
                  <div className="text-center space-y-4">
                    <p className="text-green-400 text-lg">Password reset email sent!</p>
                    <p className="text-slate-300">Check your inbox for reset instructions.</p>
                    <Button 
                      className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white w-full"
                      onClick={() => {
                        setShowResetForm(false);
                        setResetSuccess(false);
                        setResetEmail("");
                      }}
                    >
                      Back to Login
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-slate-100 mb-2">Reset Password</h3>
                      <p className="text-slate-400">Enter your email to receive reset instructions</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="resetEmail" className="text-violet-300">Email Address</Label>
                        <Input
                          id="resetEmail"
                          type="email"
                          placeholder="Enter your email"
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          className="bg-slate-900/50 border-violet-500/40 text-slate-100 placeholder:text-slate-400 focus:border-indigo-400 focus:ring-indigo-400/20"
                        />
                      </div>
                      <div className="flex space-x-3">
                        <Button 
                          onClick={handlePasswordReset} 
                          disabled={isLoading || !resetEmail}
                          className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white disabled:opacity-50"
                        >
                          {isLoading ? "Sending..." : "Send Reset Email"}
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setShowResetForm(false)}
                          className="flex-1 bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-slate-700/50"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <form onSubmit={form.handleSubmit(handleEmailLogin)} className="space-y-6 bg-slate-800/40 backdrop-blur-sm p-8 rounded-xl border border-violet-500/30 shadow-xl">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-violet-300 text-base">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      {...form.register("email")}
                      className="bg-slate-900/50 border-violet-500/40 text-slate-100 placeholder:text-slate-400 focus:border-indigo-400 focus:ring-indigo-400/20 h-12 text-base"
                    />
                    {form.formState.errors.email && (
                      <p className="text-sm text-red-400 mt-1">{form.formState.errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-violet-300 text-base">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      {...form.register("password")}
                      className="bg-slate-900/50 border-violet-500/40 text-slate-100 placeholder:text-slate-400 focus:border-indigo-400 focus:ring-indigo-400/20 h-12 text-base"
                    />
                    {form.formState.errors.password && (
                      <p className="text-sm text-red-400 mt-1">{form.formState.errors.password.message}</p>
                    )}
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white disabled:opacity-50 h-12 text-base font-semibold shadow-lg" 
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>

                <Button 
                  type="button" 
                  variant="link" 
                  className="w-full p-0 h-auto text-violet-400 hover:text-indigo-300"
                  onClick={() => setShowResetForm(true)}
                >
                  Forgot your password?
                </Button>
              </form>
            )}

            <div className="text-center">
              <p className="text-slate-400">
                Don't have an account?{" "}
                <Link to="/signup" className="text-indigo-400 hover:text-violet-300 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px bg-gradient-to-b from-transparent via-violet-500/50 via-indigo-500/50 to-transparent"></div>

        {/* Right Side - Federated Authentication */}
        <div className="flex-1 flex items-center justify-center px-8 py-16 bg-gradient-to-bl from-indigo-900/50 to-slate-900/30">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-200 to-slate-100 text-transparent bg-clip-text">
                Quick Sign In
              </h2>
              <p className="mt-2 text-lg text-slate-300">
                Use your existing accounts
              </p>
            </div>

            <div className="space-y-4">
              <Button
                type="button"
                variant="outline"
                className="w-full bg-slate-800/40 backdrop-blur-sm border-indigo-500/30 text-slate-200 hover:bg-indigo-900/40 hover:text-indigo-200 hover:border-indigo-400/50 h-14 text-base shadow-lg transition-all duration-200"
                onClick={() => handleSocialLogin('google')}
                disabled={isLoading}
              >
                <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
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
                className="w-full bg-slate-800/40 backdrop-blur-sm border-violet-500/30 text-slate-200 hover:bg-violet-900/40 hover:text-violet-200 hover:border-violet-400/50 h-14 text-base shadow-lg transition-all duration-200"
                onClick={() => handleSocialLogin('github')}
                disabled={isLoading}
              >
                <Github className="w-6 h-6 mr-3" />
                Continue with GitHub
              </Button>
            </div>

            <div className="text-center pt-8">
              <div className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-xl border border-indigo-500/20 shadow-lg">
                <h3 className="text-lg font-semibold text-slate-100 mb-2">Why use social login?</h3>
                <ul className="text-sm text-slate-300 space-y-1 text-left">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-violet-400 rounded-full mr-2"></span>
                    Faster sign-in process
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
                    No need to remember another password
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-slate-400 rounded-full mr-2"></span>
                    Secure authentication
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-violet-400 rounded-full mr-2"></span>
                    Automatic profile setup
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;