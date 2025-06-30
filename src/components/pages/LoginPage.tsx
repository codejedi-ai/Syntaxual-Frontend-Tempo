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
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/30 to-black text-white">
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
        <div className="flex-1 flex items-center justify-center px-8 py-16">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">
                Welcome back
              </h2>
              <p className="mt-2 text-lg text-white/70">
                Sign in to your account
              </p>
            </div>

            {error && (
              <Alert variant="destructive" className="bg-red-950/50 border-red-500/50 text-red-200">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {showResetForm ? (
              <div className="space-y-6 bg-purple-900/20 p-8 rounded-xl border border-purple-500/20">
                {resetSuccess ? (
                  <div className="text-center space-y-4">
                    <p className="text-green-400 text-lg">Password reset email sent!</p>
                    <p className="text-white/70">Check your inbox for reset instructions.</p>
                    <Button 
                      className="bg-purple-600 hover:bg-purple-700 text-white w-full"
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
                      <h3 className="text-xl font-semibold text-white mb-2">Reset Password</h3>
                      <p className="text-white/70">Enter your email to receive reset instructions</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="resetEmail" className="text-purple-300">Email Address</Label>
                        <Input
                          id="resetEmail"
                          type="email"
                          placeholder="Enter your email"
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          className="bg-black border-purple-500/30 text-purple-100 placeholder:text-purple-400/70 focus:border-purple-400"
                        />
                      </div>
                      <div className="flex space-x-3">
                        <Button 
                          onClick={handlePasswordReset} 
                          disabled={isLoading || !resetEmail}
                          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white disabled:bg-purple-600/50"
                        >
                          {isLoading ? "Sending..." : "Send Reset Email"}
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setShowResetForm(false)}
                          className="flex-1 bg-black border-purple-500/30 text-purple-300 hover:bg-purple-950/50"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <form onSubmit={form.handleSubmit(handleEmailLogin)} className="space-y-6 bg-purple-900/20 p-8 rounded-xl border border-purple-500/20">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-purple-300 text-base">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      {...form.register("email")}
                      className="bg-black border-purple-500/30 text-purple-100 placeholder:text-purple-400/70 focus:border-purple-400 h-12 text-base"
                    />
                    {form.formState.errors.email && (
                      <p className="text-sm text-red-400 mt-1">{form.formState.errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-purple-300 text-base">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      {...form.register("password")}
                      className="bg-black border-purple-500/30 text-purple-100 placeholder:text-purple-400/70 focus:border-purple-400 h-12 text-base"
                    />
                    {form.formState.errors.password && (
                      <p className="text-sm text-red-400 mt-1">{form.formState.errors.password.message}</p>
                    )}
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white disabled:bg-purple-600/50 h-12 text-base font-semibold" 
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>

                <Button 
                  type="button" 
                  variant="link" 
                  className="w-full p-0 h-auto text-purple-400 hover:text-purple-300"
                  onClick={() => setShowResetForm(true)}
                >
                  Forgot your password?
                </Button>
              </form>
            )}

            <div className="text-center">
              <p className="text-white/70">
                Don't have an account?{" "}
                <Link to="/signup" className="text-fuchsia-400 hover:text-fuchsia-300 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px bg-gradient-to-b from-transparent via-purple-500/30 to-transparent"></div>

        {/* Right Side - Federated Authentication */}
        <div className="flex-1 flex items-center justify-center px-8 py-16">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">
                Quick Sign In
              </h2>
              <p className="mt-2 text-lg text-white/70">
                Use your existing accounts
              </p>
            </div>

            <div className="space-y-4">
              <Button
                type="button"
                variant="outline"
                className="w-full bg-black border-purple-500/20 text-purple-300 hover:bg-purple-950/50 hover:text-purple-200 hover:border-purple-400/40 h-14 text-base"
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
                className="w-full bg-black border-purple-500/20 text-purple-300 hover:bg-purple-950/50 hover:text-purple-200 hover:border-purple-400/40 h-14 text-base"
                onClick={() => handleSocialLogin('github')}
                disabled={isLoading}
              >
                <Github className="w-6 h-6 mr-3" />
                Continue with GitHub
              </Button>
            </div>

            <div className="text-center pt-8">
              <div className="bg-purple-900/20 p-6 rounded-xl border border-purple-500/20">
                <h3 className="text-lg font-semibold text-white mb-2">Why use social login?</h3>
                <ul className="text-sm text-white/70 space-y-1 text-left">
                  <li>• Faster sign-in process</li>
                  <li>• No need to remember another password</li>
                  <li>• Secure authentication</li>
                  <li>• Automatic profile setup</li>
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