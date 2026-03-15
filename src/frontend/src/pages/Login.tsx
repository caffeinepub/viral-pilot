import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { Loader2, Shield, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard", replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <main className="min-h-[80vh] flex items-center justify-center">
      <div className="hero-gradient absolute inset-0 pointer-events-none" />
      <div className="relative w-full max-w-md mx-4">
        <div className="glass-card rounded-2xl p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-glow">
              <Sparkles className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="font-display text-3xl font-bold mb-2">Welcome back</h1>
          <p className="text-muted-foreground mb-8">
            Sign in to access your dashboard and AI tools.
          </p>

          <Button
            onClick={login}
            disabled={isLoading}
            size="lg"
            className="w-full shadow-glow mb-4"
            data-ocid="login.submit_button"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Shield className="h-4 w-4 mr-2" />
            )}
            Sign in with Internet Identity
          </Button>

          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg p-3 mb-6">
            <Shield className="h-4 w-4 shrink-0 text-primary" />
            <span>
              Secured by the Internet Computer. No passwords, no email required.
            </span>
          </div>

          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-primary hover:underline font-medium"
            >
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
