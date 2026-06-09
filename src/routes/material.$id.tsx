import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  MapPin,
  Recycle,
  Leaf,
  ShieldCheck,
  Star,
  Truck,
  Calendar,
  Package,
  ShoppingCart,
  MessageCircle,
  Share2,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ListingCard } from "@/components/listing-card";
import { getListing, LISTINGS } from "@/lib/listings";

export const Route = createFileRoute("/material/$id")({
  head: ({ params }) => {
    const l = getListing(params.id);
    return {
      meta: [
        { title: l ? `${l.title} — ReMate` : "Material — ReMate" },
        {
          name: "description",
          content: l
            ? `${l.qty} ${l.unit} of ${l.category.toLowerCase()} available in ${l.location}. ${l.description.slice(0, 120)}`
            : "Reusable material listing on ReMate.",
        },
      ],
    };
  },
  loader: ({ params }) => {
    const listing = getListing(params.id);
    if (!listing) throw notFound();
    return { listing };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold">Material not found</h1>
        <p className="mt-2 text-muted-foreground">
          This listing may have been removed or completed.
        </p>
        <Button asChild className="mt-6">
          <Link to="/search">Back to marketplace</Link>
        </Button>
      </div>
    </div>
  ),
  component: MaterialDetailsPage,
});

function MaterialDetailsPage() {
  const { listing } = Route.useLoaderData();
  const related = LISTINGS.filter(
    (l) => l.category === listing.category && l.id !== listing.id,
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-background text-foreground">

      <main className="mx-auto max-w-7xl px-6 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-muted-foreground">
          <Link to="/marketplace" className="hover:text-foreground">
            Marketplace
          </Link>
          <span>/</span>
          <Link to="/search" className="hover:text-foreground">
            {listing.category}
          </Link>
          <span>/</span>
          <span className="truncate text-foreground">{listing.title}</span>
        </nav>

        {/* Title row */}
        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {listing.title}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {listing.distance} · {listing.location}
              </span>
              <span>·</span>
              <span>Posted {listing.posted}</span>
              <span>·</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                Condition {listing.grade}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4" /> Share
            </Button>
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4" /> Save
            </Button>
          </div>
        </div>

        {/* Image gallery */}
        <section className="mt-6 grid gap-3 md:grid-cols-4 md:grid-rows-2">
          <div
            className="relative md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto rounded-2xl"
            style={{ background: listing.bg }}
          >
            <span className="absolute left-4 top-4 rounded-full bg-card/90 px-2.5 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur">
              {listing.category}
            </span>
          </div>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-[4/3] rounded-xl"
              style={{
                background: listing.bg,
                filter: `hue-rotate(${i * 12}deg) brightness(${1 - i * 0.04})`,
              }}
            />
          ))}
        </section>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Main column */}
          <div className="space-y-10">
            {/* Material information */}
            <section>
              <h2 className="text-xl font-semibold tracking-tight">About this material</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                {listing.description}
              </p>

              <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <Spec icon={Package} label="Quantity" value={`${listing.qty} ${listing.unit}`} />
                <Spec icon={ShieldCheck} label="Condition" value={`Grade ${listing.grade}`} />
                <Spec icon={Truck} label="Pickup" value="Buyer arranges" />
                <Spec icon={Calendar} label="Available" value="Within 7 days" />
              </dl>
            </section>

            {/* Provider information */}
            <section>
              <h2 className="text-xl font-semibold tracking-tight">Provider</h2>
              <Card className="mt-3 border-border shadow-sm">
                <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-base font-semibold text-primary">
                      {listing.provider.name
                        .split(" ")
                        .slice(0, 2)
                        .map((s: string) => s[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">
                          {listing.provider.name}
                        </span>
                        {listing.provider.verified && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            <ShieldCheck className="h-3 w-3" /> Verified
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 text-xs text-muted-foreground">
                        {listing.provider.type} · On ReMate since {listing.provider.since}
                      </div>
                      <div className="mt-1 inline-flex items-center gap-1 text-xs text-foreground">
                        <Star className="h-3 w-3 fill-current text-amber-500" />
                        {listing.provider.rating} · 84 completed transactions
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4" /> Message provider
                  </Button>
                </CardContent>
              </Card>
            </section>

            {/* Sustainability impact */}
            <section>
              <h2 className="text-xl font-semibold tracking-tight">Sustainability impact</h2>
              <Card
                className="mt-3 border-0 shadow-sm"
                style={{
                  background:
                    "linear-gradient(135deg, color-mix(in oklab, var(--impact) 12%, transparent), color-mix(in oklab, var(--primary) 8%, transparent))",
                }}
              >
                <CardContent className="p-6">
                  <div className="grid gap-6 sm:grid-cols-3">
                    <ImpactStat
                      label="kg diverted from landfill"
                      value={`${listing.qty}`}
                      icon={Recycle}
                    />
                    <ImpactStat
                      label="CO₂e saved vs. virgin material"
                      value={`${listing.co2} kg`}
                      icon={Leaf}
                    />
                    <ImpactStat
                      label="Equivalent km not driven"
                      value={`${Math.round(Number(listing.co2) * 4)} km`}
                      icon={Truck}
                    />
                  </div>
                  <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                    Estimates use ReMate's Sustainability Impact Analysis model based on category,
                    quantity, and Malaysian grid factors. Contributes to your SDG 9 dashboard.
                  </p>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Sticky action panel */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Card className="border-border shadow-md">
              <CardContent className="p-6">
                <div className="flex items-baseline justify-between">
                  <div className="text-2xl font-semibold text-foreground">{listing.price}</div>
                  <div className="text-xs text-muted-foreground">
                    {listing.qty} {listing.unit} available
                  </div>
                </div>
                <div className="mt-2 inline-flex items-center gap-1.5 text-xs" style={{ color: "var(--impact)" }}>
                  <Recycle className="h-3.5 w-3.5" /> Reuse saves ~{listing.co2} kg CO₂e
                </div>

                <div className="mt-5 space-y-2">
                  <Button size="lg" className="h-11 w-full">
                    <ShoppingCart className="h-4 w-4" /> Add to Request Cart
                  </Button>
                  <Button size="lg" variant="outline" className="h-11 w-full">
                    Request a sample
                  </Button>
                </div>

                <div className="mt-5 space-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                    Verified provider · transaction protected
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="h-3.5 w-3.5 text-primary" />
                    Pickup arranged after request accepted
                  </div>
                  <div className="flex items-center gap-2">
                    <Leaf className="h-3.5 w-3.5 text-primary" />
                    Impact auto-logged to your dashboard
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button asChild variant="ghost" size="sm" className="mt-4">
              <Link to="/search">
                <ArrowLeft className="h-4 w-4" /> Back to results
              </Link>
            </Button>
          </aside>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-semibold tracking-tight">
              More {listing.category.toLowerCase()} nearby
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          </section>
        )}
      </main>

    </div>
  );
}

function Spec({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
        <Icon className="h-3.5 w-3.5" /> {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-foreground">{value}</div>
    </div>
  );
}

function ImpactStat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div>
      <span
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-card text-[var(--impact)] shadow-sm"
      >
        <Icon className="h-4 w-4" />
      </span>
      <div className="mt-3 font-mono text-2xl font-bold tabular-nums text-foreground">
        {value}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
