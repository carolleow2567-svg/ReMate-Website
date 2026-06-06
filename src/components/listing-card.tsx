import { Link } from "@tanstack/react-router";
import { MapPin, Recycle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Listing } from "@/lib/listings";

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link
      to="/material/$id"
      params={{ id: listing.id }}
      className="group block focus:outline-none"
    >
      <Card className="overflow-hidden border-border shadow-sm transition-all group-hover:-translate-y-0.5 group-hover:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-ring">
        <div className="relative aspect-[4/3] w-full" style={{ background: listing.bg }}>
          <span className="absolute left-3 top-3 rounded-full bg-card/90 px-2 py-0.5 text-xs font-medium text-foreground shadow-sm backdrop-blur">
            Condition {listing.grade}
          </span>
          <span className="absolute right-3 top-3 rounded-full bg-card/90 px-2 py-0.5 text-xs font-medium text-foreground shadow-sm backdrop-blur">
            {listing.category}
          </span>
        </div>
        <CardContent className="p-4">
          <div className="truncate text-sm font-semibold text-foreground">{listing.title}</div>
          <div className="mt-1 text-xs text-muted-foreground">
            {listing.qty} {listing.unit} · {listing.provider.name}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" /> {listing.distance} · {listing.location}
            </span>
            <span className="text-sm font-semibold text-foreground">{listing.price}</span>
          </div>
          <div
            className="mt-3 flex items-center gap-1.5 border-t border-border pt-3 text-xs"
            style={{ color: "var(--impact)" }}
          >
            <Recycle className="h-3 w-3" />
            Reuse saves ~{listing.co2} kg CO₂e
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
