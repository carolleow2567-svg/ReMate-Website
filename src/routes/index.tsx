import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Recycle,
  MapPin,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Factory,
  Building2,
  Leaf,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ReMate — Waste-to-Resource Marketplace for the Circular Economy" },
      {
        name: "description",
        content:
          "ReMate connects Malaysia's waste generators with buyers, recyclers, and makers — turning discarded materials into measurable sustainability impact aligned with SDG 9.",
      },
      { property: "og:title", content: "ReMate — Waste-to-Resource Marketplace" },
      {
        property: "og:description",
        content:
          "List what you'd throw away. Find what others need. See your impact.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--primary) 18%, transparent) 0%, transparent 70%)",
          }}
        />
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Circular economy infrastructure for Malaysia
            </div>
            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
              List what you'd throw away.<br />
              <span className="text-primary">Find what others need.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              ReMate is a waste-to-resource marketplace that smart-matches surplus timber,
              metal, plastics, and construction materials with buyers nearby — and measures
              every kilogram diverted from landfill.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-11 px-6 text-sm">
                <Link to="/register">
                  Get started — free <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-11 px-6 text-sm">
                <Link to="/login">Sign in</Link>
              </Button>
            </div>

            {/* Live impact strip */}
            <div className="mx-auto mt-14 grid max-w-3xl grid-cols-3 divide-x divide-border rounded-xl border border-border bg-card shadow-sm">
              {[
                { label: "kg diverted", value: "184,920" },
                { label: "CO₂e saved", value: "62.4 t" },
                { label: "partners", value: "1,240" },
              ].map((kpi) => (
                <div key={kpi.label} className="px-4 py-5 text-left">
                  <div className="font-mono text-2xl font-bold tabular-nums text-foreground md:text-3xl">
                    {kpi.value}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                    {kpi.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-2 md:gap-16">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">
              Our mission
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              A trusted digital backbone for the circular economy.
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            Every year, contractors, factories, and SMEs pay to dispose of materials that
            others would happily buy. ReMate reframes "waste" as "resource" — connecting
            generators with buyers on one transparent platform that turns environmental
            responsibility into a quantifiable business advantage.
          </p>
        </div>
      </section>

      {/* SDG 9 */}
      <section id="sdg" className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid items-center gap-12 md:grid-cols-5">
            <div className="md:col-span-2">
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-accent to-card p-8">
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-card px-3 py-1 text-xs font-medium text-foreground shadow-sm">
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                      United Nations SDG 9
                    </div>
                    <div className="mt-6 font-mono text-7xl font-bold tabular-nums text-primary">
                      09
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-foreground">
                      Industry, Innovation
                      <br />& Infrastructure
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Building resilient infrastructure, promoting inclusive and sustainable
                      industrialization, and fostering innovation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-3">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Innovation that turns industrial byproducts into shared infrastructure.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                ReMate directly advances SDG 9 by giving Malaysian industry the digital
                infrastructure it lacks: a verified, data-rich marketplace that closes
                material loops and makes circular outcomes measurable.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Smart matching that allocates surplus materials by category, distance, and quantity.",
                  "Sustainability Impact Analysis on every transaction — kg diverted, CO₂e saved, equivalences.",
                  "Anticipatory forecasting (SC2) that projects circular supply and demand trends.",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-foreground">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Leaf className="h-3 w-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">
              Why ReMate
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              One platform. Three winning sides.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Factory,
                title: "For waste providers",
                body: "Turn disposal cost into revenue and ESG credit. List a surplus pile in 60 seconds and let buyers come to you.",
              },
              {
                icon: Building2,
                title: "For material buyers",
                body: "Source affordable, verified, location-matched materials. Filter by condition, distance, and quantity.",
              },
              {
                icon: ShieldCheck,
                title: "For administrators",
                body: "Govern a trusted ecosystem with verification, moderation, and exportable SDG 9 impact reports.",
              },
            ].map((b) => (
              <Card key={b.title} className="border-border shadow-sm transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <b.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Marketplace preview */}
      <section id="marketplace" className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex items-end justify-between">
            <div className="max-w-2xl">
              <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                Featured listings
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Live materials, ready for a second life.
              </h2>
            </div>
            <Button asChild variant="ghost" className="hidden md:inline-flex">
              <Link to="/register">
                Browse marketplace <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {LISTINGS.map((l) => (
              <Card
                key={l.title}
                className="overflow-hidden border-border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div
                  className="relative aspect-[4/3] w-full"
                  style={{ background: l.bg }}
                >
                  <span className="absolute left-3 top-3 rounded-full bg-card/90 px-2 py-0.5 text-xs font-medium text-foreground shadow-sm backdrop-blur">
                    Condition {l.grade}
                  </span>
                </div>
                <CardContent className="p-4">
                  <div className="truncate text-sm font-semibold text-foreground">
                    {l.title}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {l.category} · {l.qty}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {l.distance}
                    </span>
                    <span className="text-sm font-semibold text-foreground">{l.price}</span>
                  </div>
                  <div
                    className="mt-3 flex items-center gap-1.5 border-t border-border pt-3 text-xs"
                    style={{ color: "var(--impact)" }}
                  >
                    <Recycle className="h-3 w-3" />
                    Reuse saves ~{l.co2} kg CO₂e
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 pb-24">
          <div className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary to-[oklch(0.5_0.13_175)] p-10 text-primary-foreground md:p-16">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  Start measuring your impact today.
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-primary-foreground/80 md:text-base">
                  Join contractors, recyclers, and makers building Malaysia's
                  circular economy on ReMate. Free to start.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <Button asChild size="lg" variant="secondary" className="h-11 px-6">
                  <Link to="/register">
                    Create your free account <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <div className="flex items-center gap-2 text-xs text-primary-foreground/80">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Anticipatory forecasting included
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

const LISTINGS = [
  {
    title: "Reclaimed Chengal Timber Offcuts",
    category: "Timber",
    qty: "320 kg",
    distance: "4.2 km · Johor Bahru",
    price: "RM 1.80/kg",
    grade: "A",
    co2: "112",
    bg: "linear-gradient(135deg, oklch(0.78 0.06 60), oklch(0.55 0.09 50))",
  },
  {
    title: "Galvanized Steel Sheet Cutoffs",
    category: "Metal",
    qty: "180 kg",
    distance: "6.8 km · Skudai",
    price: "RM 3.20/kg",
    grade: "A",
    co2: "240",
    bg: "linear-gradient(135deg, oklch(0.82 0.02 240), oklch(0.55 0.03 250))",
  },
  {
    title: "HDPE Drum Containers (food-safe)",
    category: "Plastics",
    qty: "45 units",
    distance: "12.0 km · Iskandar Puteri",
    price: "RM 18/unit",
    grade: "B",
    co2: "86",
    bg: "linear-gradient(135deg, oklch(0.85 0.05 200), oklch(0.55 0.09 195))",
  },
  {
    title: "Salvaged Red Clay Bricks",
    category: "Construction",
    qty: "2,400 pcs",
    distance: "9.1 km · Kulai",
    price: "RM 0.45/pc",
    grade: "B",
    co2: "320",
    bg: "linear-gradient(135deg, oklch(0.7 0.08 35), oklch(0.45 0.1 30))",
  },
];
