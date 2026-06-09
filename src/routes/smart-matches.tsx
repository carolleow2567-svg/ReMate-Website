import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Leaf, MapPin, TrendingUp, Zap, ArrowRight, Brain, Target, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/smart-matches")({
  head: () => ({
    meta: [
      { title: "Smart matches — ReMate" },
      { name: "description", content: "AI-curated material matches based on your past activity, location, and sustainability goals." },
    ],
  }),
  component: SmartMatchesPage,
});

type Match = {
  id: string;
  title: string;
  category: string;
  provider: string;
  city: string;
  distanceKm: number;
  price: number;
  weightKg: number;
  co2Kg: number;
  score: number; // 0-100
  reasons: string[];
  image: string;
};

const MATCHES: Match[] = [
  {
    id: "L-1042",
    title: "Reclaimed Chengal beams (3m)",
    category: "Timber & wood",
    provider: "Greenstone Builders",
    city: "Batu Pahat",
    distanceKm: 3.2,
    price: 870,
    weightKg: 820,
    co2Kg: 1148,
    score: 96,
    reasons: ["Matches your past timber requests", "3.2 km from your warehouse", "Grade A certified"],
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=600&q=80&auto=format&fit=crop",
  },
  {
    id: "L-1031",
    title: "Concrete blocks (reusable)",
    category: "Construction",
    provider: "BuildCircular",
    city: "Kluang",
    distanceKm: 27.1,
    price: 410,
    weightKg: 1240,
    co2Kg: 198,
    score: 91,
    reasons: ["Fits your Q3 procurement plan", "Bulk discount available", "Low-emission logistics partner"],
    image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=600&q=80&auto=format&fit=crop",
  },
  {
    id: "L-1018",
    title: "Aluminium offcuts (mixed)",
    category: "Scrap metal",
    provider: "Setia Foundry",
    city: "Pasir Gudang",
    distanceKm: 18.4,
    price: 780,
    weightKg: 310,
    co2Kg: 2790,
    score: 88,
    reasons: ["Highest CO₂e savings per kg", "Verified KYC provider", "Saved your team RM 1.2k previously"],
    image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=600&q=80&auto=format&fit=crop",
  },
  {
    id: "L-1061",
    title: "Pallet timber (Grade B)",
    category: "Timber & wood",
    provider: "Maker Loft",
    city: "Senai",
    distanceKm: 51.2,
    price: 320,
    weightKg: 440,
    co2Kg: 615,
    score: 82,
    reasons: ["Frequently bundled with your beam orders", "Within budget envelope"],
    image: "https://images.unsplash.com/photo-1605283176567-c5e1a4dd1c80?w=600&q=80&auto=format&fit=crop",
  },
  {
    id: "L-1072",
    title: "PET flakes (clean, sorted)",
    category: "Plastics",
    provider: "ReGrain Polymers",
    city: "Muar",
    distanceKm: 38.5,
    price: 510,
    weightKg: 180,
    co2Kg: 322,
    score: 79,
    reasons: ["New supplier near your route", "Diversifies your material mix"],
    image: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=600&q=80&auto=format&fit=crop",
  },
  {
    id: "L-1055",
    title: "Steel rebar offcuts",
    category: "Scrap metal",
    provider: "Iskandar Steelworks",
    city: "Johor Bahru",
    distanceKm: 64.3,
    price: 690,
    weightKg: 540,
    co2Kg: 970,
    score: 74,
    reasons: ["Complements your construction stockpile"],
    image: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=600&q=80&auto=format&fit=crop",
  },
];

const RECOMMENDATIONS = [
  {
    icon: Recycle,
    title: "Switch to reclaimed timber for your next 2 projects",
    detail: "Based on your demand forecast, this could avoid ~3.4 t of CO₂e and save RM 14k vs virgin lumber.",
  },
  {
    icon: MapPin,
    title: "Bundle pickups within Johor corridor",
    detail: "Three matches are within a 30 km loop — consolidating cuts logistics emissions by ~42%.",
  },
  {
    icon: Target,
    title: "Activate a standing match for aluminium offcuts",
    detail: "You buy aluminium monthly. Enable smart auto-match to lock supply at trend pricing.",
  },
];

function SmartMatchesPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-accent/30 to-card p-8 shadow-sm">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Badge variant="secondary" className="gap-1 bg-accent text-accent-foreground">
                <Sparkles className="h-3 w-3" /> Powered by ReMate Smart Match
              </Badge>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
                6 high-fit matches for your account
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                The matching engine combines your purchase history, location, sustainability goals, and provider trust signals to rank circular opportunities in real time.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <Mini value="6" label="New matches" />
              <Mini value="92%" label="Avg fit score" />
              <Mini value="6.1t" label="CO₂e potential" />
            </div>
          </div>
        </section>

        {/* Matches grid */}
        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">Recommended materials</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/marketplace">Browse all <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {MATCHES.map((m) => (
              <MatchCard key={m.id} m={m} />
            ))}
          </div>
        </section>

        {/* Sustainability recommendations */}
        <section className="mt-10">
          <div className="mb-4 flex items-center gap-2">
            <Brain className="h-4 w-4 text-primary" />
            <h2 className="text-base font-semibold text-foreground">Sustainability recommendations</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {RECOMMENDATIONS.map((r) => (
              <article key={r.title} className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <r.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-foreground">{r.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{r.detail}</p>
                <button className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                  Apply recommendation <ArrowRight className="h-3 w-3" />
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function MatchCard({ m }: { m: Match }) {
  const tier = m.score >= 90 ? "Excellent fit" : m.score >= 80 ? "Strong fit" : "Good fit";
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative h-44 overflow-hidden">
        <img src={m.image} alt={m.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <Badge variant="secondary" className="absolute left-3 top-3 bg-card/90 text-foreground backdrop-blur">
          {m.category}
        </Badge>
        <ScoreBadge score={m.score} tier={tier} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-sm font-semibold text-foreground">{m.title}</h3>
        <p className="text-xs text-muted-foreground">{m.provider} · {m.city}</p>

        <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {m.distanceKm} km</span>
          <span>·</span>
          <span>{m.weightKg} kg available</span>
        </div>

        <ul className="mt-4 space-y-1.5">
          {m.reasons.map((r) => (
            <li key={r} className="flex items-start gap-2 text-xs text-foreground">
              <Zap className="mt-0.5 h-3 w-3 flex-none text-primary" />
              {r}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
          <div>
            <p className="text-lg font-semibold text-foreground">RM {m.price.toFixed(2)}</p>
            <p className="inline-flex items-center gap-1 text-xs text-primary">
              <Leaf className="h-3 w-3" /> {m.co2Kg.toLocaleString()} kg CO₂e
            </p>
          </div>
          <Button asChild size="sm">
            <Link to="/material/$id" params={{ id: m.id }}>View match</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

function ScoreBadge({ score, tier }: { score: number; tier: string }) {
  const circ = 2 * Math.PI * 16;
  const dash = (score / 100) * circ;
  return (
    <div className="absolute right-3 top-3 flex items-center gap-2 rounded-full bg-card/95 px-2.5 py-1.5 shadow-sm backdrop-blur">
      <div className="relative h-9 w-9">
        <svg viewBox="0 0 40 40" className="h-full w-full -rotate-90">
          <circle cx="20" cy="20" r="16" fill="none" stroke="oklch(0.92 0.01 255)" strokeWidth="4" />
          <circle
            cx="20" cy="20" r="16" fill="none"
            stroke="url(#matchGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circ}`}
          />
          <defs>
            <linearGradient id="matchGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.6 0.13 162)" />
              <stop offset="100%" stopColor="oklch(0.6 0.11 190)" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-foreground">
          {score}
        </span>
      </div>
      <div className="pr-1.5 text-[11px] leading-tight">
        <p className="font-medium text-foreground">{tier}</p>
        <p className="flex items-center gap-0.5 text-muted-foreground">
          <TrendingUp className="h-2.5 w-2.5" /> match
        </p>
      </div>
    </div>
  );
}

function Mini({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-card/80 px-4 py-3 backdrop-blur">
      <p className="text-xl font-semibold tracking-tight text-foreground">{value}</p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
    </div>
  );
}
