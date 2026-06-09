import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ImagePlus,
  MapPin,
  Info,
  CheckCircle2,
  Hammer,
  Wrench,
  Recycle,
  Building2,
  Leaf,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/create-listing")({
  head: () => ({
    meta: [
      { title: "Create a listing — ReMate" },
      {
        name: "description",
        content:
          "List surplus timber, metal, plastics, or construction materials on ReMate in 60 seconds.",
      },
    ],
  }),
  component: CreateListingPage,
});

const CATEGORIES = [
  { value: "Timber", label: "Surplus Timber & Wood", icon: Hammer },
  { value: "Metal", label: "Scrap Metal", icon: Wrench },
  { value: "Plastics", label: "Recyclable Plastics", icon: Recycle },
  { value: "Construction", label: "Construction Materials", icon: Building2 },
];

const CONDITIONS = [
  { value: "A", label: "Grade A", desc: "Like-new, clean, ready to reuse" },
  { value: "B", label: "Grade B", desc: "Light wear, fully functional" },
  { value: "C", label: "Grade C", desc: "For recycling or rework" },
];

function CreateListingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      <main className="mx-auto max-w-5xl px-6 py-8">
        <Button asChild variant="ghost" size="sm" className="-ml-2">
          <Link to="/my-listings">
            <ArrowLeft className="h-4 w-4" /> Back to my listings
          </Link>
        </Button>

        <div className="mt-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Create a waste listing
            </h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Turn surplus into resource. ReMate's smart match will surface your listing to
              nearby buyers in your category.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground shadow-sm">
            <Leaf className="h-3.5 w-3.5 text-primary" />
            Estimated impact will be calculated on publish
          </div>
        </div>

        <form className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            {/* Material title */}
            <FormCard title="Material" desc="Tell buyers what you have.">
              <Field label="Material title" hint="Be specific — e.g. ‘Galvanized steel sheet cutoffs (1.2 mm)’">
                <Input placeholder="e.g. Reclaimed Chengal timber offcuts" className="h-11" />
              </Field>

              <Field label="Category">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {CATEGORIES.map((c) => (
                    <label
                      key={c.value}
                      className="flex cursor-pointer flex-col items-start gap-2 rounded-lg border border-input bg-background p-3 text-left transition-colors hover:border-primary/50 has-[input:checked]:border-primary has-[input:checked]:bg-primary/5"
                    >
                      <input
                        type="radio"
                        name="category"
                        value={c.value}
                        defaultChecked={c.value === "Timber"}
                        className="sr-only"
                      />
                      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <c.icon className="h-4 w-4" />
                      </span>
                      <span className="text-xs font-medium text-foreground">{c.label}</span>
                    </label>
                  ))}
                </div>
              </Field>

              <Field label="Description" hint="Include source, dimensions, prior use, and any defects.">
                <Textarea
                  rows={5}
                  placeholder="Surplus from a recent boutique hotel build. Lengths 30–80 cm, dry, stored under cover…"
                />
              </Field>
            </FormCard>

            {/* Quantity / weight / condition */}
            <FormCard title="Quantity & condition" desc="Used to estimate sustainability impact.">
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Quantity">
                  <div className="flex gap-2">
                    <Input className="h-11" placeholder="320" />
                    <Select defaultValue="kg">
                      <SelectTrigger className="h-11 w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="units">units</SelectItem>
                        <SelectItem value="pcs">pcs</SelectItem>
                        <SelectItem value="m3">m³</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </Field>
                <Field label="Estimated weight (kg)">
                  <Input className="h-11" placeholder="320" />
                </Field>
                <Field label="Asking price (RM)">
                  <Input className="h-11" placeholder="1.80 / kg" />
                </Field>
              </div>

              <Field label="Condition">
                <div className="grid gap-2 sm:grid-cols-3">
                  {CONDITIONS.map((c) => (
                    <label
                      key={c.value}
                      className="flex cursor-pointer items-start gap-3 rounded-lg border border-input bg-background p-3 has-[input:checked]:border-primary has-[input:checked]:bg-primary/5"
                    >
                      <input
                        type="radio"
                        name="condition"
                        value={c.value}
                        defaultChecked={c.value === "A"}
                        className="mt-0.5"
                      />
                      <div>
                        <div className="text-sm font-medium text-foreground">{c.label}</div>
                        <div className="text-xs text-muted-foreground">{c.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </Field>
            </FormCard>

            {/* Location */}
            <FormCard title="Pickup location" desc="Buyers near this point are smart-matched first.">
              <Field label="Address or area">
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    className="h-11 pl-10"
                    placeholder="Jalan Sutera, Johor Bahru"
                    defaultValue="Johor Bahru"
                  />
                </div>
              </Field>
              <div
                className="relative h-44 overflow-hidden rounded-lg border border-border"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.95 0.02 160), oklch(0.9 0.04 175))",
                }}
              >
                <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 opacity-40">
                  {Array.from({ length: 72 }).map((_, i) => (
                    <div key={i} className="border border-primary/10" />
                  ))}
                </div>
                <span className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                  <MapPin className="h-4 w-4" />
                </span>
              </div>
            </FormCard>

            {/* Images */}
            <FormCard title="Photos" desc="Up to 8 photos. First photo is the cover.">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-card text-center text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                  <ImagePlus className="h-6 w-6" />
                  <span className="text-xs font-medium">Add photos</span>
                  <input type="file" className="sr-only" multiple accept="image/*" />
                </label>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="relative aspect-square overflow-hidden rounded-lg border border-border"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.82 0.07 70), oklch(0.6 0.08 55))",
                      filter: `hue-rotate(${i * 18}deg)`,
                    }}
                  >
                    {i === 0 && (
                      <span className="absolute left-2 top-2 rounded-full bg-card/90 px-2 py-0.5 text-[10px] font-medium text-foreground shadow-sm">
                        Cover
                      </span>
                    )}
                    <button
                      type="button"
                      className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm hover:bg-background"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              <p className="mt-3 inline-flex items-center gap-2 text-xs text-muted-foreground">
                <Info className="h-3.5 w-3.5" /> Clear, well-lit photos get 3× more requests.
              </p>
            </FormCard>
          </div>

          {/* Sticky summary */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Card className="border-border shadow-md">
              <CardContent className="p-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Live preview
                </div>
                <div
                  className="mt-3 aspect-[4/3] rounded-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.82 0.07 70), oklch(0.6 0.08 55))",
                  }}
                />
                <div className="mt-3 text-sm font-semibold text-foreground">
                  Reclaimed Chengal Timber Offcuts
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">Timber · 320 kg · Grade A</div>
                <div className="mt-2 text-sm font-semibold text-foreground">RM 1.80 / kg</div>

                <div className="mt-4 rounded-lg border border-border bg-primary/5 p-3">
                  <div className="text-xs font-semibold text-primary">Estimated impact</div>
                  <div className="mt-1 font-mono text-lg font-bold tabular-nums text-foreground">
                    ~112 kg CO₂e saved
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Based on category, weight, and grid factors.
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  <Button type="submit" size="lg" className="h-11 w-full">
                    <CheckCircle2 className="h-4 w-4" /> Publish listing
                  </Button>
                  <Button type="button" variant="outline" size="lg" className="h-11 w-full">
                    Save as draft
                  </Button>
                </div>
                <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
                  Publishing means you accept ReMate's marketplace terms. Verified accounts
                  earn higher visibility.
                </p>
              </CardContent>
            </Card>
          </aside>
        </form>
      </main>

    </div>
  );
}

function FormCard({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="border-border shadow-sm">
      <CardContent className="space-y-5 p-6">
        <div>
          <h2 className="text-base font-semibold text-foreground">{title}</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
        </div>
        {children}
      </CardContent>
    </Card>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
