import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Trash2, Leaf, ShieldCheck, ArrowRight, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Request cart — ReMate" },
      { name: "description", content: "Review the reclaimed materials in your request cart before checkout." },
    ],
  }),
  component: CartPage,
});

type CartItem = {
  id: string;
  title: string;
  category: string;
  grade: "A" | "B" | "C";
  provider: string;
  location: string;
  unit: string;
  unitPrice: number;
  weightPerUnit: number; // kg
  co2PerKg: number;
  qty: number;
  image: string;
};

const INITIAL: CartItem[] = [
  {
    id: "L-1042",
    title: "Reclaimed Chengal beams (3m)",
    category: "Timber & wood",
    grade: "A",
    provider: "Greenstone Builders",
    location: "Batu Pahat, Johor",
    unit: "beam",
    unitPrice: 145,
    weightPerUnit: 38,
    co2PerKg: 1.4,
    qty: 6,
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=400&q=80&auto=format&fit=crop",
  },
  {
    id: "L-1018",
    title: "Aluminium offcuts (mixed)",
    category: "Scrap metal",
    grade: "B",
    provider: "Setia Foundry",
    location: "Pasir Gudang, Johor",
    unit: "kg",
    unitPrice: 6.5,
    weightPerUnit: 1,
    co2PerKg: 9,
    qty: 120,
    image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400&q=80&auto=format&fit=crop",
  },
  {
    id: "L-1007",
    title: "HDPE drums — food-grade, cleaned",
    category: "Plastics",
    grade: "A",
    provider: "EcoPack KL",
    location: "Shah Alam, Selangor",
    unit: "drum",
    unitPrice: 22,
    weightPerUnit: 8,
    co2PerKg: 1.8,
    qty: 12,
    image: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=400&q=80&auto=format&fit=crop",
  },
];

function CartPage() {
  const [items, setItems] = useState<CartItem[]>(INITIAL);

  const update = (id: string, delta: number) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)),
    );
  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  const subtotal = items.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  const logistics = items.length ? 85 : 0;
  const platformFee = subtotal * 0.025;
  const total = subtotal + logistics + platformFee;

  const totalKg = items.reduce((s, i) => s + i.qty * i.weightPerUnit, 0);
  const totalCo2 = items.reduce(
    (s, i) => s + i.qty * i.weightPerUnit * i.co2PerKg,
    0,
  );

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Step 1 of 3</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">Request cart</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Review the materials you'd like to request. Providers confirm availability before payment is captured.
            </p>
          </div>
          <Stepper current={1} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
          <section className="space-y-4">
            {items.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
                <p className="text-foreground">Your request cart is empty.</p>
                <Button asChild className="mt-4">
                  <Link to="/marketplace">Browse marketplace</Link>
                </Button>
              </div>
            ) : (
              items.map((i) => (
                <article
                  key={i.id}
                  className="flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm"
                >
                  <img
                    src={i.image}
                    alt={i.title}
                    className="h-28 w-28 flex-none rounded-xl object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-accent text-accent-foreground">
                            {i.category}
                          </Badge>
                          <Badge variant="outline">Grade {i.grade}</Badge>
                        </div>
                        <h3 className="mt-2 text-base font-semibold text-foreground">{i.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {i.provider} · {i.location}
                        </p>
                      </div>
                      <button
                        onClick={() => remove(i.id)}
                        className="text-muted-foreground transition-colors hover:text-destructive"
                        aria-label="Remove"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-auto flex flex-col gap-3 pt-4 sm:flex-row sm:items-end sm:justify-between">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                        <div className="inline-flex items-center rounded-lg border border-border self-start sm:self-auto">
                          <button
                            onClick={() => update(i.id, -1)}
                            className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground"
                            aria-label="Decrease"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-10 text-center text-sm font-medium text-foreground">
                            {i.qty}
                          </span>
                          <button
                            onClick={() => update(i.id, 1)}
                            className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground"
                            aria-label="Increase"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {i.unit} · RM {i.unitPrice.toFixed(2)} each
                        </span>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-base font-semibold text-foreground">
                          RM {(i.qty * i.unitPrice).toFixed(2)}
                        </p>
                        <p className="mt-1 inline-flex items-center gap-1 text-xs text-primary">
                          <Leaf className="h-3 w-3" />
                          ~{Math.round(i.qty * i.weightPerUnit * i.co2PerKg)} kg CO₂e saved
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}
          </section>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-foreground">Cost summary</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <Row label="Subtotal" value={`RM ${subtotal.toFixed(2)}`} />
                <Row label="Logistics estimate" value={`RM ${logistics.toFixed(2)}`} />
                <Row
                  label="Platform fee (2.5%)"
                  value={`RM ${platformFee.toFixed(2)}`}
                />
                <div className="border-t border-border pt-3">
                  <Row
                    label={<span className="text-foreground">Estimated total</span>}
                    value={
                      <span className="text-lg font-semibold text-foreground">
                        RM {total.toFixed(2)}
                      </span>
                    }
                  />
                </div>
              </dl>
              <Button asChild className="mt-5 w-full" size="lg" disabled={!items.length}>
                <Link to="/checkout">
                  Continue to checkout <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5" /> Funds held in escrow until pickup
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-gradient-to-br from-accent/60 to-card p-6">
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Impact in this cart</h3>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-semibold text-foreground">
                    {totalKg.toLocaleString()} kg
                  </p>
                  <p className="text-xs text-muted-foreground">Diverted from landfill</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">
                    {Math.round(totalCo2).toLocaleString()} kg
                  </p>
                  <p className="text-xs text-muted-foreground">CO₂e avoided</p>
                </div>
              </div>
              <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Truck className="h-3.5 w-3.5" /> Most pickups within 80 km
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function Row({
  label,
  value,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  );
}

export function Stepper({ current }: { current: 1 | 2 | 3 }) {
  const steps = ["Cart", "Checkout", "Confirmation"];
  return (
    <ol className="hidden items-center gap-2 md:flex">
      {steps.map((s, idx) => {
        const n = idx + 1;
        const active = n === current;
        const done = n < current;
        return (
          <li key={s} className="flex items-center gap-2">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${
                active
                  ? "bg-primary text-primary-foreground"
                  : done
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {n}
            </span>
            <span
              className={`text-sm ${active ? "font-medium text-foreground" : "text-muted-foreground"}`}
            >
              {s}
            </span>
            {n < steps.length && <span className="mx-2 h-px w-8 bg-border" />}
          </li>
        );
      })}
    </ol>
  );
}
