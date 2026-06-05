import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Leaf className="h-4 w-4" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-foreground">ReMate</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#mission" className="text-sm text-muted-foreground hover:text-foreground">Mission</a>
          <a href="#sdg" className="text-sm text-muted-foreground hover:text-foreground">SDG 9</a>
          <a href="#benefits" className="text-sm text-muted-foreground hover:text-foreground">Benefits</a>
          <a href="#marketplace" className="text-sm text-muted-foreground hover:text-foreground">Marketplace</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/login">Sign in</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/register">Get started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-10 md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Leaf className="h-3.5 w-3.5" />
          </span>
          <span className="text-sm font-medium text-foreground">ReMate</span>
          <span className="text-sm text-muted-foreground">— Circular economy infrastructure</span>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} ReMate · UTHM FSKTM · Aligned with SDG 9
        </p>
      </div>
    </footer>
  );
}
