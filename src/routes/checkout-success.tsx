import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Download, Leaf, ArrowRight, Truck, FileText, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Stepper } from "./cart";

export const Route = createFileRoute("/checkout-success")({
  head: () => ({
    meta: [
      { title: "Order confirmed — ReMate" },
      { name: "description", content: "Your circular materials request has been confirmed on ReMate." },
    ],
  }),
  component: SuccessPage,
});

const ITEMS = [
  { title: "Reclaimed Chengal beams (3m)", qty: 6, line: 870, kg: 228 },
  { title: "Aluminium offcuts (mixed)", qty: 120, line: 780, kg: 120 },
  { title: "HDPE drums — food-grade", qty: 12, line: 264, kg: 96 },
];

function SuccessPage() {
  const subtotal = ITEMS.reduce((s, i) => s + i.line, 0);
  const logistics = 85;
  const platformFee = subtotal * 0.025;
  const total = subtotal + logistics + platformFee;
  const totalKg = ITEMS.reduce((s, i) => s + i.kg, 0);
  const totalCo2 = Math.round(totalKg * 1.6);
  const ref = "RMT-2026-04781";

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-6 flex justify-end">
          <Stepper current={3} />
        </div>

        {/* Hero */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-accent/40 to-card p-8 text-center shadow-sm">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[oklch(0.6_0.11_190)]/10 blur-3xl" />
          <div className="relative">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-foreground">
              Payment confirmed
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Your funds are held in escrow. Providers have been notified and will confirm pickup within 24 hours.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-xs">
              <span className="text-muted-foreground">Order ref</span>
              <span className="font-mono font-medium text-foreground">{ref}</span>
            </div>
          </div>
        </div>

        {/* Impact */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-card to-[oklch(0.6_0.11_190)]/10 p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Leaf className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">Sustainability impact generated</h2>
            <Badge variant="secondary" className="ml-auto bg-accent text-accent-foreground">
              Added to your ledger
            </Badge>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <Stat value={`${totalKg} kg`} label="Diverted from landfill" />
            <Stat value={`${totalCo2.toLocaleString()} kg`} label="CO₂e emissions avoided" />
            <Stat value={`${Math.round(totalCo2 * 4)} km`} label="Equivalent driving avoided" />
          </div>
          <p className="mt-5 text-xs text-muted-foreground">
            Contributes to SDG 9 — Industry, Innovation & Infrastructure. View this in your{" "}
            <Link to="/sustainability" className="font-medium text-primary hover:underline">
              sustainability dashboard
            </Link>
            .
          </p>
        </section>

        {/* Receipt */}
        <section className="mt-6 rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">Receipt summary</h2>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4" /> Download PDF
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" /> Share
              </Button>
            </div>
          </div>
          <div className="px-6 py-5">
            <ul className="divide-y divide-border text-sm">
              {ITEMS.map((i) => (
                <li key={i.title} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-foreground">{i.title}</p>
                    <p className="text-xs text-muted-foreground">Qty {i.qty} · {i.kg} kg diverted</p>
                  </div>
                  <span className="text-foreground">RM {i.line.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
              <Row label="Subtotal" value={`RM ${subtotal.toFixed(2)}`} />
              <Row label="Logistics" value={`RM ${logistics.toFixed(2)}`} />
              <Row label="Platform fee" value={`RM ${platformFee.toFixed(2)}`} />
              <div className="flex items-center justify-between border-t border-border pt-3">
                <dt className="text-foreground">Total paid</dt>
                <dd className="text-lg font-semibold text-foreground">RM {total.toFixed(2)}</dd>
              </div>
            </dl>
          </div>
          <div className="flex items-center gap-2 border-t border-border bg-muted/40 px-6 py-3 text-xs text-muted-foreground">
            <Truck className="h-3.5 w-3.5" />
            Estimated pickup window: 2–4 business days · Tracking updates will be emailed.
          </div>
        </section>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link to="/marketplace">
              Return to marketplace <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/sustainability">View impact dashboard</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-card/80 p-4 text-center backdrop-blur">
      <p className="text-2xl font-semibold tracking-tight text-foreground">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  );
}
