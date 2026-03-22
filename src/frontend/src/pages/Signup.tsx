import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { Check, Loader2, Shield, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

const PERKS = [
  "Access 8 AI-powered social media tools",
  "Save your best content to your profile",
  "Track your usage and analytics",
  "Free plan — no credit card needed",
];

export default function Signup() {
  const { isAuthenticated, isLoading, login, loginError, loginStatus } =
    useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard", replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (loginError) {
      toast.error(
        "Login failed. If a new tab didn't open, please allow popups/new tabs for this site and try again.",
      );
    }
  }, [loginError]);

  const isLoggingIn = loginStatus === "logging-in";

  return (
    <main className="min-h-[80vh] flex items-center justify-center">
      <div className="hero-gradient absolute inset-0 pointer-events-none" />
      <div className="relative w-full max-w-4xl mx-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 glass-card rounded-2xl overflow-hidden">
          <div className="bg-primary/10 p-10 flex flex-col justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary mb-6">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="font-display text-3xl font-bold mb-4">
              Join <span className="gradient-text">10,000+</span> creators
            </h2>
            <ul className="space-y-3">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-sm">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  {perk}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-10 flex flex-col justify-center">
            <h1 className="font-display text-3xl font-bold mb-2">
              Create your account
            </h1>
            <p className="text-muted-foreground mb-8">
              Sign up using Internet Identity — the most secure authentication
              on the web.
            </p>
            <Button
              onClick={login}
              disabled={isLoading || isLoggingIn}
              size="lg"
              className="w-full shadow-glow mb-4"
              data-ocid="signup.submit_button"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Opening Internet Identity...
                </>
              ) : isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Loading...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Continue with Internet Identity
                </>
              )}
            </Button>

            {/* Mobile/Popup guide info box */}
            <div className="flex items-start gap-3 text-xs bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4 text-left">
              <Shield className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div className="text-blue-800 dark:text-blue-300">
                <p className="font-semibold mb-1">
                  Internet Identity will open
                </p>
                <p>
                  A new tab will open for secure authentication. Please allow it
                  if prompted by your browser.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg p-3 mb-6">
              <Shield className="h-4 w-4 shrink-0 text-primary mt-0.5" />
              <span>
                No email or password needed. Your identity is secured by
                blockchain technology.
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
