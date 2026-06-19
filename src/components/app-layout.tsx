import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Leaf, LogOut, Menu, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/marketplace", label: "Marketplace" },
  { to: "/sustainability", label: "Sustainability" },
  { to: "/cart", label: "Cart" },
  { to: "/profile", label: "Profile" },
] as const;

export function AppHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground md:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[260px] p-0">
              <div className="flex h-full flex-col">
                <div className="flex items-center gap-2 border-b px-4 py-4">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <Leaf className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm font-semibold tracking-tight text-foreground">
                    ReMate
                  </span>
                </div>
                <nav className="flex flex-col gap-1 px-3 py-4">
                  {NAV.map((item) => {
                    const active = pathname === item.to;
                    return (
                      <SheetClose key={item.to} asChild>
                        <Link
                          to={item.to}
                          className={`flex items-center rounded-md px-3 py-2.5 text-sm transition-colors ${
                            active
                              ? "bg-primary/10 font-medium text-primary"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    );
                  })}
                  <div className="mt-4 border-t pt-4">
                    {isAuthenticated ? (
                      <div className="space-y-2">
                        <div className="px-3 text-xs text-muted-foreground">
                          Signed in as{" "}
                          <span className="font-medium text-foreground">
                            {user?.name ?? "User"}
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => {
                            logout();
                            toast.success("Signed out");
                            navigate({ to: "/" });
                          }}
                        >
                          <LogOut className="mr-2 h-4 w-4" /> Sign out
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <Button asChild variant="ghost" size="sm">
                          <Link to="/login">Sign in</Link>
                        </Button>
                        <Button asChild size="sm">
                          <Link to="/register">Get started</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Leaf className="h-4 w-4" />
            </span>
            <span className="text-lg font-semibold tracking-tight text-foreground">
              ReMate
            </span>
          </Link>
        </div>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`text-sm transition-colors ${
                  active
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Button asChild variant="outline" size="sm" className="hidden md:inline-flex">
                <Link to="/profile">
                  <User className="h-4 w-4" />
                  {user?.name ?? "Account"}
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  logout();
                  toast.success("Signed out");
                  navigate({ to: "/" });
                }}
              >
                <LogOut className="h-4 w-4" /> Sign out
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Sign in</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/register">Get started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export function AppFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Leaf className="h-3.5 w-3.5" />
          </span>
          <span className="text-sm font-medium text-foreground">ReMate</span>
          <span className="text-sm text-muted-foreground">— Circular economy infrastructure</span>
        </div>
        <nav className="flex items-center gap-6">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} ReMate · Aligned with SDG 9
        </p>
      </div>
    </footer>
  );
}