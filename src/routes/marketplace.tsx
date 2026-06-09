import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Hammer,
  Wrench,
  Recycle,
  Plus,
  TrendingUp,
  Leaf,
  Sparkles,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ListingCard } from "@/components/listing-card";
import { LISTINGS } from "@/lib/listings";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Marketplace — ReMate" },
      {
        name: "description",
        content:
          "Browse reusable timber, scrap metal, recyclable plastics, and construction materials from verified providers across Malaysia.",
      },
      { property: "og:title", content: "ReMate Marketplace" },
      {
        property: "og:description",
        content: "Discover surplus materials ready for a second life.",
      },
    ],
  }),
  component: MarketplacePage,
});

const CATEGORIES = [
  {
    key: "Timber",
    label: "Surplus Timber & Wood",
    desc: "Hardwood offcuts, pallets, planks",
    icon: Hammer,
    bg: "linear-gradient(135deg, oklch(0.82 0.07 70), oklch(0.6 0.08 55))",
  },
  {
    key: "Metal",
    label: "Scrap Metal",
    desc: "Steel, copper, aluminium",
    icon: Wrench,
    bg: "linear-gradient(135deg, oklch(0.82 0.02 240), oklch(0.55 0.03 250))",
  },
  {
    key: "Plastics",
    label: "Recyclable Plastics",
    desc: "HDPE, PET, flakes & drums",
    icon: Recycle,
    bg: "linear-gradient(135deg, oklch(0.85 0.05 200), oklch(0.55 0.09 195))",
  },
] as const;

function MarketplacePage() {
  const featured = LISTINGS.slice(0, 4);
  const recent = [...LISTINGS].slice(-4).reverse();

  return (
    <div className="min-h-screen bg-background text-foreground">

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Welcome banner */}
        <section className="overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-card to-card p-8 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Smart-matched for Johor Bahru
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                Welcome back, Sara.
              </h1>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
                12 new materials match your saved categories today. Keep your circular projects
                moving — every reuse measurably reduces CO₂e.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row md:flex-col md:items-end">
              <Button asChild size="lg" className="h-11 px-5">
                <Link to="/marketplace">
                  <Plus className="h-4 w-4" /> Create a listing
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-11 px-5">
                <Link to="/search">
                  Browse all materials <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Sustainability summary */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "kg diverted (you)", value: "1,840", sub: "+220 this month", icon: Recycle },
            { label: "CO₂e saved (you)", value: "612 kg", sub: "≈ 248 km not driven", icon: Leaf },
            { label: "Active matches", value: "12", sub: "in your saved categories", icon: Sparkles },
            { label: "Forecast demand", value: "↑ 18%", sub: "next 30 days · timber", icon: TrendingUp },
          ].map((kpi) => (
            <Card key={kpi.label} className="border-border shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">
                    {kpi.label}
                  </div>
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <kpi.icon className="h-3.5 w-3.5" />
                  </span>
                </div>
                <div className="mt-3 font-mono text-2xl font-bold tabular-nums text-foreground">
                  {kpi.value}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{kpi.sub}</div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Categories */}
        <section className="mt-12">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                Categories
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Browse by material type
              </h2>
            </div>
            <Link
              to="/search"
              className="hidden text-sm text-muted-foreground hover:text-foreground md:inline"
            >
              See all categories →
            </Link>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {CATEGORIES.map((cat) => {
              const count = LISTINGS.filter((l) => l.category === cat.key).length;
              return (
                <Link
                  key={cat.key}
                  to="/search"
                  className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative h-32" style={{ background: cat.bg }}>
                    <span className="absolute right-3 top-3 rounded-full bg-card/90 px-2 py-0.5 text-xs font-medium text-foreground shadow-sm">
                      {count} live
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <cat.icon className="h-4 w-4" />
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-foreground">{cat.label}</div>
                        <div className="text-xs text-muted-foreground">{cat.desc}</div>
                      </div>
                    </div>
                    <div className="mt-4 inline-flex items-center gap-1 text-sm text-primary group-hover:underline">
                      Explore {cat.key.toLowerCase()} <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Featured listings */}
        <section className="mt-14">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                Featured
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Smart-matched for you
              </h2>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link to="/search">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        </section>

        {/* Recently added */}
        <section className="mt-14">
          <div className="flex items-end justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                <Clock className="h-3.5 w-3.5" /> Recently added
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">Fresh on ReMate</h2>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link to="/search">
                Browse new <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recent.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        </section>

        {/* Create Listing CTA */}
        <section className="mt-16">
          <div className="overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary to-[oklch(0.5_0.13_175)] p-8 text-primary-foreground md:p-12">
            <div className="grid items-center gap-6 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Have surplus materials? List them in 60 seconds.
                </h2>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-primary-foreground/85">
                  Turn disposal cost into revenue. Buyers nearby get smart-matched automatically.
                </p>
              </div>
              <div className="flex flex-col gap-2 md:items-end">
                <Button asChild size="lg" variant="secondary" className="h-11 px-6">
                  <Link to="/marketplace">
                    <Plus className="h-4 w-4" /> Create a listing
                  </Link>
                </Button>
                <div className="text-xs text-primary-foreground/80">
                  Verified providers earn higher visibility.
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
