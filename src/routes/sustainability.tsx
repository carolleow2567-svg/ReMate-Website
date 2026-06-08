import { createFileRoute } from "@tanstack/react-router";
import { Leaf, TrendingUp, Recycle, Truck, Factory, Award, Target, Sparkles, ArrowUpRight } from "lucide-react";
import { MarketplaceHeader } from "@/components/marketplace-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/sustainability")({
  head: () => ({
    meta: [
      { title: "Sustainability impact — ReMate" },
      { name: "description", content: "Track waste diverted, CO₂ reductions, and your contribution to SDG 9 through ReMate's circular marketplace." },
    ],
  }),
  component: SustainabilityPage,
});

const KPIS = [
  { label: "Waste diverted from landfill", value: "12,840", unit: "kg", delta: "+8.4% vs last quarter", icon: Recycle, accent: "from-[oklch(0.65_0.13_162)] to-[oklch(0.55_0.12_190)]" },
  { label: "CO₂e emissions reduced", value: "18.6", unit: "tonnes", delta: "= 78,000 km not driven", icon: Leaf, accent: "from-[oklch(0.6_0.13_162)] to-[oklch(0.62_0.11_175)]" },
  { label: "Transactions completed", value: "147", unit: "matches", delta: "92% completion rate", icon: TrendingUp, accent: "from-[oklch(0.62_0.13_180)] to-[oklch(0.55_0.12_210)]" },
  { label: "Materials exchanged", value: "26", unit: "categories", delta: "Across 4 industries", icon: Factory, accent: "from-[oklch(0.58_0.13_162)] to-[oklch(0.5_0.1_200)]" },
];

const MONTHLY = [
  { m: "Jan", diverted: 820, co2: 1.1 },
  { m: "Feb", diverted: 1040, co2: 1.4 },
  { m: "Mar", diverted: 1380, co2: 1.9 },
  { m: "Apr", diverted: 1620, co2: 2.3 },
  { m: "May", diverted: 2150, co2: 3.1 },
  { m: "Jun", diverted: 2480, co2: 3.6 },
];

const MATERIAL_MIX = [
  { name: "Timber & wood", pct: 38, color: "oklch(0.6 0.13 162)" },
  { name: "Scrap metal", pct: 27, color: "oklch(0.55 0.12 200)" },
  { name: "Plastics", pct: 21, color: "oklch(0.65 0.14 80)" },
  { name: "Construction debris", pct: 14, color: "oklch(0.55 0.08 50)" },
];

const SCORE = 87;

function SustainabilityPage() {
  const maxDiverted = Math.max(...MONTHLY.map((m) => m.diverted));
  const circumference = 2 * Math.PI * 56;
  const dash = (SCORE / 100) * circumference;

  return (
    <div className="min-h-screen bg-background">
      <MarketplaceHeader />
      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Badge variant="secondary" className="bg-accent text-accent-foreground">
              <Sparkles className="h-3 w-3" /> Live sustainability ledger
            </Badge>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">Your sustainability impact</h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Verified, audit-ready metrics generated from every successful match on ReMate — aligned with UN SDG 9 indicators.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">Download report (PDF)</Button>
            <Button size="sm">Share impact card <ArrowUpRight className="h-4 w-4" /></Button>
          </div>
        </div>

        {/* KPI cards */}
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {KPIS.map((k) => (
            <div key={k.label} className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${k.accent} opacity-20 blur-2xl`} />
              <div className="flex items-center gap-2">
                <span className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${k.accent} text-primary-foreground`}>
                  <k.icon className="h-4 w-4" />
                </span>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{k.label}</p>
              </div>
              <p className="mt-4 flex items-baseline gap-1.5">
                <span className="text-3xl font-semibold tracking-tight text-foreground">{k.value}</span>
                <span className="text-sm font-medium text-muted-foreground">{k.unit}</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{k.delta}</p>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Bar chart */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:col-span-2">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-base font-semibold text-foreground">Waste diverted — last 6 months</h2>
                <p className="text-sm text-muted-foreground">Kilograms kept out of landfill via verified exchanges.</p>
              </div>
              <Badge variant="outline" className="gap-1">
                <TrendingUp className="h-3 w-3" /> +203%
              </Badge>
            </div>
            <div className="mt-8 flex h-56 items-end justify-between gap-3">
              {MONTHLY.map((m) => {
                const h = (m.diverted / maxDiverted) * 100;
                return (
                  <div key={m.m} className="group flex flex-1 flex-col items-center gap-2">
                    <div className="relative flex h-full w-full items-end">
                      <div
                        className="w-full rounded-t-md bg-gradient-to-t from-primary to-[oklch(0.7_0.13_175)] transition-all group-hover:opacity-90"
                        style={{ height: `${h}%` }}
                      />
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-foreground px-1.5 py-0.5 text-[10px] font-medium text-background opacity-0 transition-opacity group-hover:opacity-100">
                        {m.diverted} kg
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">{m.m}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sustainability score */}
          <div className="rounded-2xl border border-border bg-gradient-to-br from-card to-accent/40 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-foreground">Sustainability score</h2>
              <Award className="h-5 w-5 text-primary" />
            </div>
            <div className="mt-4 flex flex-col items-center">
              <div className="relative h-40 w-40">
                <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
                  <circle cx="70" cy="70" r="56" fill="none" stroke="oklch(0.92 0.01 255)" strokeWidth="14" />
                  <circle
                    cx="70" cy="70" r="56" fill="none"
                    stroke="url(#scoreGrad)"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeDasharray={`${dash} ${circumference}`}
                  />
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="oklch(0.6 0.13 162)" />
                      <stop offset="100%" stopColor="oklch(0.6 0.11 190)" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-semibold tracking-tight text-foreground">{SCORE}</span>
                  <span className="text-xs text-muted-foreground">/ 100</span>
                </div>
              </div>
              <Badge className="mt-3 bg-primary text-primary-foreground">Tier A — Circular leader</Badge>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Weighted from diversion volume, match velocity, partner reviews, and verification depth.
              </p>
            </div>
          </div>
        </div>

        {/* Material mix + progress */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-foreground">Material exchange mix</h2>
              <span className="text-xs text-muted-foreground">26 categories tracked</span>
            </div>
            <div className="mt-5 space-y-4">
              {MATERIAL_MIX.map((m) => (
                <div key={m.name}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{m.name}</span>
                    <span className="font-medium text-foreground">{m.pct}%</span>
                  </div>
                  <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${m.pct}%`, backgroundColor: m.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-5 text-center">
              <div>
                <p className="text-2xl font-semibold text-foreground">147</p>
                <p className="text-xs text-muted-foreground">Matches</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">38</p>
                <p className="text-xs text-muted-foreground">Partners</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">12</p>
                <p className="text-xs text-muted-foreground">Cities</p>
              </div>
            </div>
          </div>

          {/* Goals */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-foreground">Annual goals</h2>
              <Target className="h-5 w-5 text-primary" />
            </div>
            <div className="mt-5 space-y-5">
              {[
                { label: "Divert 20,000 kg of waste", current: 12840, target: 20000, unit: "kg" },
                { label: "Reduce 30 tonnes CO₂e", current: 18.6, target: 30, unit: "t" },
                { label: "Reach 200 verified matches", current: 147, target: 200, unit: "matches" },
              ].map((g) => {
                const pct = Math.min(100, (g.current / g.target) * 100);
                return (
                  <div key={g.label}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{g.label}</span>
                      <span className="text-muted-foreground">{g.current.toLocaleString()} / {g.target.toLocaleString()} {g.unit}</span>
                    </div>
                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-[oklch(0.6_0.11_190)]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{pct.toFixed(0)}% complete</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* SDG 9 */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-[oklch(0.96_0.04_162)] via-card to-[oklch(0.95_0.05_30)] shadow-sm">
          <div className="grid gap-6 p-8 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[oklch(0.55_0.18_30)] text-base font-bold text-white">
                  09
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">UN Sustainable Development Goal</p>
                  <h2 className="text-lg font-semibold text-foreground">Industry, Innovation & Infrastructure</h2>
                </div>
              </div>
              <p className="mt-4 text-sm text-foreground/80">
                ReMate accelerates SDG 9 by enabling industries to retrofit operations with circular inputs,
                investing in resource-efficient infrastructure, and matching surplus producers with innovators.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Badge variant="outline">9.4 Resource efficiency</Badge>
                <Badge variant="outline">9.5 Innovation capacity</Badge>
                <Badge variant="outline">9.b Industrial diversification</Badge>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: Factory, label: "Industries upgraded", value: "4", note: "Construction, manufacturing, packaging, foundry" },
                { icon: Truck, label: "Local logistics enabled", value: "82%", note: "of matches within 80 km radius" },
                { icon: Leaf, label: "Circular procurement", value: "RM 248k", note: "Reinvested in local economies" },
              ].map((c) => (
                <div key={c.label} className="rounded-xl border border-border bg-card/80 p-4 backdrop-blur">
                  <c.icon className="h-5 w-5 text-primary" />
                  <p className="mt-3 text-2xl font-semibold tracking-tight text-foreground">{c.value}</p>
                  <p className="text-xs font-medium text-foreground">{c.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{c.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
