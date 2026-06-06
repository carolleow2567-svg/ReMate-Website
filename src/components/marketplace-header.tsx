import { Link, useRouterState } from "@tanstack/react-router";
import { Leaf, Plus, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MarketplaceHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navItem = (to: string, label: string) => {
    const active = pathname === to || (to !== "/marketplace" && pathname.startsWith(to));
    return (
      <Link
        to={to}
        className={`text-sm transition-colors ${
          active ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {label}
      </Link>
    );
  };
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Leaf className="h-4 w-4" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-foreground">ReMate</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navItem("/marketplace", "Marketplace")}
          {navItem("/search", "Search")}
          <span className="text-sm text-muted-foreground/60">Impact</span>
          <span className="text-sm text-muted-foreground/60">Cart</span>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex">
            <Link to="/search">
              <Search className="h-4 w-4" /> Search
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/marketplace">
              <Plus className="h-4 w-4" /> List material
            </Link>
          </Button>
          <Button asChild variant="outline" size="icon" className="rounded-full">
            <Link to="/login" aria-label="Account">
              <User className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
