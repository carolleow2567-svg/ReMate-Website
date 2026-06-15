import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Leaf, Recycle, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — ReMate" },
      {
        name: "description",
        content: "Sign in to ReMate to manage listings, requests, and your sustainability impact.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Please enter your email and password");
      return;
    }
    localStorage.setItem(
      "remateSession",
      JSON.stringify({ isLoggedIn: true, user: "Demo User" })
    );
    login(email.trim());
    toast.success("Login successful");
    navigate({ to: "/marketplace" });
  };

  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-gradient-to-br from-primary to-[oklch(0.45_0.12_175)] p-12 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 backdrop-blur">
            <Leaf className="h-4 w-4" />
          </span>
          <span className="text-lg font-semibold tracking-tight">ReMate</span>
        </Link>

        <div className="max-w-md">
          <h2 className="text-4xl font-semibold tracking-tight">
            Welcome back to the circular economy.
          </h2>
          <p className="mt-4 text-primary-foreground/80">
            Sign in to manage your listings, follow up on requests, and track the kilograms
            you've diverted from landfill.
          </p>

          <ul className="mt-10 space-y-4">
            {[
              { icon: Recycle, label: "Pick up where you left off in your matches" },
              { icon: Sparkles, label: "See updated impact metrics and forecasts" },
              { icon: ShieldCheck, label: "Encrypted sessions, verified counterparties" },
            ].map((f) => (
              <li key={f.label} className="flex items-center gap-3 text-sm">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/15 backdrop-blur">
                  <f.icon className="h-4 w-4" />
                </span>
                {f.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="text-xs text-primary-foreground/70">
          Aligned with United Nations SDG 9 — Industry, Innovation and Infrastructure.
        </div>
      </aside>

      <main className="flex flex-col">
        <div className="flex items-center justify-between border-b border-border px-6 py-4 lg:hidden">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Leaf className="h-4 w-4" />
            </span>
            <span className="text-base font-semibold tracking-tight">ReMate</span>
          </Link>
          <Link to="/register" className="text-sm text-muted-foreground hover:text-foreground">
            Create account
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                Sign in to ReMate
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Welcome back. Enter your credentials to continue.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  className="h-11"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-xs font-medium text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPw ? "text" : "password"}
                    placeholder="Your password"
                    className="h-11 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">
                  Remember me for 30 days
                </Label>
              </div>

              <Button type="submit" className="h-11 w-full text-sm">
                Sign in
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="font-medium text-primary hover:underline">
                  Create one
                </Link>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
