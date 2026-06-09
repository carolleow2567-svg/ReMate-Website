import { createFileRoute, Link } from "@tanstack/react-router";
import { CreditCard, Lock, ShieldCheck, Building2, Leaf, Wallet, Banknote } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Stepper } from "./cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — ReMate" },
      { name: "description", content: "Securely complete your circular materials request on ReMate." },
    ],
  }),
  component: CheckoutPage,
});

const SUMMARY = [
  { title: "Reclaimed Chengal beams (3m)", qty: 6, line: 870, kg: 228 },
  { title: "Aluminium offcuts (mixed)", qty: 120, line: 780, kg: 120 },
  { title: "HDPE drums — food-grade", qty: 12, line: 264, kg: 96 },
];

function CheckoutPage() {
  const [method, setMethod] = useState<"card" | "fpx" | "invoice">("card");
  const subtotal = SUMMARY.reduce((s, i) => s + i.line, 0);
  const logistics = 85;
  const platformFee = subtotal * 0.025;
  const total = subtotal + logistics + platformFee;
  const totalKg = SUMMARY.reduce((s, i) => s + i.kg, 0);

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Step 2 of 3</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">Secure checkout</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Payment is held in escrow and released to the provider when materials are confirmed delivered.
            </p>
          </div>
          <Stepper current={2} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-6"
          >
            {/* Buyer info */}
            <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold text-foreground">Buyer information</h2>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <Field id="company" label="Company / organisation" defaultValue="Greenfield Architects Sdn Bhd" />
                <Field id="contact" label="Contact name" defaultValue="Aisyah Rahman" />
                <Field id="email" label="Email" type="email" defaultValue="aisyah@greenfield.my" />
                <Field id="phone" label="Phone" defaultValue="+60 12 345 6789" />
                <Field id="address" label="Pickup / delivery address" className="md:col-span-2" defaultValue="Lot 22, Jalan Industri 4, 83000 Batu Pahat, Johor" />
                <Field id="tax" label="Tax ID (optional)" defaultValue="" />
                <Field id="po" label="Purchase order # (optional)" defaultValue="" />
              </div>
            </section>

            {/* Payment */}
            <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <h2 className="text-sm font-semibold text-foreground">Payment method</h2>
                </div>
                <Badge variant="outline" className="gap-1 text-xs">
                  <ShieldCheck className="h-3 w-3 text-primary" /> PCI-DSS · 256-bit TLS
                </Badge>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <MethodTile active={method === "card"} onClick={() => setMethod("card")} icon={CreditCard} label="Card" hint="Visa · Master · Amex" />
                <MethodTile active={method === "fpx"} onClick={() => setMethod("fpx")} icon={Wallet} label="FPX online banking" hint="Malaysian banks" />
                <MethodTile active={method === "invoice"} onClick={() => setMethod("invoice")} icon={Banknote} label="Invoice (Net 30)" hint="Verified buyers" />
              </div>

              {method === "card" && (
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <Field id="cardName" label="Name on card" defaultValue="Aisyah Rahman" />
                  <Field id="cardNum" label="Card number" placeholder="1234 1234 1234 1234" />
                  <Field id="exp" label="Expiry (MM/YY)" placeholder="12/28" />
                  <Field id="cvc" label="CVC" placeholder="•••" />
                </div>
              )}
              {method === "fpx" && (
                <p className="mt-5 text-sm text-muted-foreground">
                  You'll be redirected to your bank's secure portal after confirming the order.
                </p>
              )}
              {method === "invoice" && (
                <p className="mt-5 text-sm text-muted-foreground">
                  A signed invoice will be issued on order confirmation, payable within 30 days.
                </p>
              )}

              <div className="mt-5 flex items-start gap-2 rounded-xl bg-muted/50 p-3 text-xs text-muted-foreground">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />
                Funds are held in ReMate escrow and only released once you confirm pickup or delivery. Full refund on dispute.
              </div>
            </section>
          </form>

          {/* Order summary */}
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-foreground">Order summary</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {SUMMARY.map((i) => (
                  <li key={i.title} className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-foreground">{i.title}</p>
                      <p className="text-xs text-muted-foreground">Qty {i.qty}</p>
                    </div>
                    <span className="text-foreground">RM {i.line.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
                <Row label="Subtotal" value={`RM ${subtotal.toFixed(2)}`} />
                <Row label="Logistics" value={`RM ${logistics.toFixed(2)}`} />
                <Row label="Platform fee" value={`RM ${platformFee.toFixed(2)}`} />
                <div className="flex items-center justify-between border-t border-border pt-3">
                  <dt className="text-foreground">Total due</dt>
                  <dd className="text-lg font-semibold text-foreground">RM {total.toFixed(2)}</dd>
                </div>
              </dl>
              <Button asChild className="mt-5 w-full" size="lg">
                <Link to="/checkout-success">
                  <Lock className="h-4 w-4" /> Pay RM {total.toFixed(2)}
                </Link>
              </Button>
              <div className="mt-4 flex items-center justify-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Lock className="h-3 w-3" /> Encrypted</span>
                <span>·</span>
                <span>Powered by Stripe</span>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-gradient-to-br from-accent/60 to-card p-6">
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">This order's impact</h3>
              </div>
              <p className="mt-3 text-2xl font-semibold text-foreground">{totalKg} kg</p>
              <p className="text-xs text-muted-foreground">
                diverted from landfill · ~{Math.round(totalKg * 1.6)} kg CO₂e avoided
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function Field({
  id,
  label,
  className = "",
  ...props
}: {
  id: string;
  label: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <Label htmlFor={id} className="text-xs text-muted-foreground">
        {label}
      </Label>
      <Input id={id} className="mt-1.5" {...props} />
    </div>
  );
}

function MethodTile({
  active,
  onClick,
  icon: Icon,
  label,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
        active
          ? "border-primary bg-accent/50 ring-2 ring-primary/30"
          : "border-border bg-background hover:border-primary/40"
      }`}
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
          active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
        }`}
      >
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </div>
    </button>
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
