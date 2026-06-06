import { createFileRoute } from "@tanstack/react-router";
import { Search, SlidersHorizontal, MapPin } from "lucide-react";
import { MarketplaceHeader } from "@/components/marketplace-header";
import { SiteFooter } from "@/components/site-header";
import { ListingCard } from "@/components/listing-card";
import { LISTINGS } from "@/lib/listings";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Search materials — ReMate" },
      {
        name: "description",
        content:
          "Search and filter reusable materials by category, condition, distance, and price across the ReMate marketplace.",
      },
    ],
  }),
  component: SearchPage,
});

const CATEGORIES = ["Timber", "Metal", "Plastics", "Construction"] as const;
const GRADES = ["A", "B", "C"] as const;

function SearchPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <MarketplaceHeader />

      {/* Search bar */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search timber, copper wire, HDPE drums, bricks…"
              className="h-11 pl-10 text-base"
              defaultValue=""
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Near Johor Bahru"
                className="h-11 w-56 pl-10"
                defaultValue="Johor Bahru"
              />
            </div>
            <Button size="lg" className="h-11 px-5">
              Search
            </Button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Filter sidebar */}
          <aside className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </div>
              <button className="text-xs text-primary hover:underline">Clear all</button>
            </div>

            <FilterGroup title="Category">
              <div className="space-y-2.5">
                {CATEGORIES.map((c) => (
                  <label key={c} className="flex cursor-pointer items-center gap-2.5 text-sm">
                    <Checkbox defaultChecked={c === "Timber"} />
                    <span className="text-foreground">{c}</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {LISTINGS.filter((l) => l.category === c).length}
                    </span>
                  </label>
                ))}
              </div>
            </FilterGroup>

            <FilterGroup title="Condition grade">
              <div className="flex gap-2">
                {GRADES.map((g) => (
                  <label
                    key={g}
                    className="inline-flex h-9 flex-1 cursor-pointer items-center justify-center rounded-md border border-input bg-background text-sm has-[input:checked]:border-primary has-[input:checked]:bg-primary/10 has-[input:checked]:text-primary"
                  >
                    <input type="checkbox" className="sr-only" defaultChecked={g === "A"} />
                    Grade {g}
                  </label>
                ))}
              </div>
            </FilterGroup>

            <FilterGroup title="Distance">
              <Slider defaultValue={[15]} max={50} step={1} />
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>0 km</span>
                <span className="font-medium text-foreground">Within 15 km</span>
                <span>50 km</span>
              </div>
            </FilterGroup>

            <FilterGroup title="Price range (RM)">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs text-muted-foreground">Min</Label>
                  <Input className="mt-1 h-9" defaultValue="0" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Max</Label>
                  <Input className="mt-1 h-9" defaultValue="50" />
                </div>
              </div>
            </FilterGroup>

            <FilterGroup title="Provider">
              <div className="space-y-2.5 text-sm">
                <label className="flex cursor-pointer items-center gap-2.5">
                  <Checkbox defaultChecked />
                  <span className="text-foreground">Verified only</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2.5">
                  <Checkbox />
                  <span className="text-foreground">Rating ≥ 4.5</span>
                </label>
              </div>
            </FilterGroup>

            <Button className="w-full">Apply filters</Button>
          </aside>

          {/* Results */}
          <section>
            <div className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-medium text-foreground">{LISTINGS.length}</span>{" "}
                  materials near Johor Bahru
                </div>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {["Timber", "Grade A", "≤ 15 km", "Verified"].map((chip) => (
                    <span
                      key={chip}
                      className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-xs text-muted-foreground">Sort</Label>
                <Select defaultValue="match">
                  <SelectTrigger className="h-9 w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="match">Smart match (recommended)</SelectItem>
                    <SelectItem value="distance">Nearest first</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: low to high</SelectItem>
                    <SelectItem value="price-high">Price: high to low</SelectItem>
                    <SelectItem value="impact">Highest CO₂e impact</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {LISTINGS.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <Button variant="outline">Load more results</Button>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
