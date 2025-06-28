import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";
import { Github, Mail, Twitter } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  displayName: z.string().min(2, "Display name must be at least 2 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginForm = z.infer<typeof loginSchema>;
type SignupForm = z.infer<typeof signupSchema>;

interface AuthModalProps {
  children: React.ReactNode;
}

export const AuthModal: React.FC<AuthModalProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const { 
    signInWithGoogle, 
    signInWithTwitter, 
    signInWithGithub, 
    signInWithEmail, 
    signUpWithEmail,
    resetPassword,
    error 
  } = useAuth();

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const signupForm = useForm<SignupForm>({
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
      setOpen(false);
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
      setOpen(false);
    } catch (error) {
      console.error('Email sign-in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignup = async (data: SignupForm) => {
    setIsLoading(true);
    try {
      await signUpWithEmail(data.email, data.password, data.displayName);
      setOpen(false);
    } catch (error) {
      console.error('Email sign-up error:', error);
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

  const SocialLoginButtons = () => (
    <div className="space-y-3">
      <Button
        type="button"
        variant="outline"
        className="w-full bg-black border-purple-500/20 text-purple-300 hover:bg-purple-950/50 hover:text-purple-200 hover:border-purple-400/40"
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
        className="w-full bg-black border-purple-500/20 text-purple-300 hover:bg-purple-950/50 hover:text-purple-200 hover:border-purple-400/40"
        onClick={() => handleSocialLogin('github')}
        disabled={isLoading}
      >
        <Github className="w-5 h-5 mr-2" />
        Continue with GitHub
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full bg-black border-purple-500/20 text-purple-300 hover:bg-purple-950/50 hover:text-purple-200 hover:border-purple-400/40"
        onClick={() => handleSocialLogin('twitter')}
        disabled={isLoading}
      >
        <Twitter className="w-5 h-5 mr-2" />
        Continue with Twitter
      </Button>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-black border-purple-500/20 text-purple-100">
        <DialogHeader>
          <DialogTitle className="text-purple-200">Welcome to Syntaxual</DialogTitle>
        </DialogHeader>

        {error && (
          <Alert variant="destructive" className="bg-red-950/50 border-red-500/50 text-red-200">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {showResetForm ? (
          <div className="space-y-4">
            {resetSuccess ? (
              <div className="text-center space-y-4">
                <p className="text-green-400">Password reset email sent! Check your inbox.</p>
                <Button 
                  className="bg-purple-600 hover:bg-purple-700 text-white"
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
                <div className="flex space-x-2">
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
              </>
            )}
          </div>
        ) : (
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-purple-950/30 border border-purple-500/20">
              <TabsTrigger 
                value="login" 
                className="text-purple-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Login
              </TabsTrigger>
              <TabsTrigger 
                value="signup"
                className="text-purple-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <SocialLoginButtons />
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-purple-500/30" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-black px-2 text-purple-400">
                    Or continue with email
                  </span>
                </div>
              </div>

              <form onSubmit={loginForm.handleSubmit(handleEmailLogin)} className="space-y-4">
                <div>
                  <Label htmlFor="loginEmail" className="text-purple-300">Email</Label>
                  <Input
                    id="loginEmail"
                    type="email"
                    placeholder="Enter your email"
                    {...loginForm.register("email")}
                    className="bg-black border-purple-500/30 text-purple-100 placeholder:text-purple-400/70 focus:border-purple-400"
                  />
                  {loginForm.formState.errors.email && (
                    <p className="text-sm text-red-400">{loginForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="loginPassword" className="text-purple-300">Password</Label>
                  <Input
                    id="loginPassword"
                    type="password"
                    placeholder="Enter your password"
                    {...loginForm.register("password")}
                    className="bg-black border-purple-500/30 text-purple-100 placeholder:text-purple-400/70 focus:border-purple-400"
                  />
                  {loginForm.formState.errors.password && (
                    <p className="text-sm text-red-400">{loginForm.formState.errors.password.message}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white disabled:bg-purple-600/50" 
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>

                <Button 
                  type="button" 
                  variant="link" 
                  className="w-full p-0 h-auto text-sm text-purple-400 hover:text-purple-300"
                  onClick={() => setShowResetForm(true)}
                >
                  Forgot your password?
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <SocialLoginButtons />
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-purple-500/30" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-black px-2 text-purple-400">
                    Or create account with email
                  </span>
                </div>
              </div>

              <form onSubmit={signupForm.handleSubmit(handleEmailSignup)} className="space-y-4">
                <div>
                  <Label htmlFor="signupDisplayName" className="text-purple-300">Display Name</Label>
                  <Input
                    id="signupDisplayName"
                    type="text"
                    placeholder="Enter your display name"
                    {...signupForm.register("displayName")}
                    className="bg-black border-purple-500/30 text-purple-100 placeholder:text-purple-400/70 focus:border-purple-400"
                  />
                  {signupForm.formState.errors.displayName && (
                    <p className="text-sm text-red-400">{signupForm.formState.errors.displayName.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="signupEmail" className="text-purple-300">Email</Label>
                  <Input
                    id="signupEmail"
                    type="email"
                    placeholder="Enter your email"
                    {...signupForm.register("email")}
                    className="bg-black border-purple-500/30 text-purple-100 placeholder:text-purple-400/70 focus:border-purple-400"
                  />
                  {signupForm.formState.errors.email && (
                    <p className="text-sm text-red-400">{signupForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="signupPassword" className="text-purple-300">Password</Label>
                  <Input
                    id="signupPassword"
                    type="password"
                    placeholder="Create a password"
                    {...signupForm.register("password")}
                    className="bg-black border-purple-500/30 text-purple-100 placeholder:text-purple-400/70 focus:border-purple-400"
                  />
                  {signupForm.formState.errors.password && (
                    <p className="text-sm text-red-400">{signupForm.formState.errors.password.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="signupConfirmPassword" className="text-purple-300">Confirm Password</Label>
                  <Input
                    id="signupConfirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    {...signupForm.register("confirmPassword")}
                    className="bg-black border-purple-500/30 text-purple-100 placeholder:text-purple-400/70 focus:border-purple-400"
                  />
                  {signupForm.formState.errors.confirmPassword && (
                    <p className="text-sm text-red-400">{signupForm.formState.errors.confirmPassword.message}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white disabled:bg-purple-600/50" 
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
};
