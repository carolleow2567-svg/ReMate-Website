import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Navigation, Layers, Search, Leaf, Truck, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Map view — ReMate" },
      { name: "description", content: "Discover reusable materials near you on the ReMate geolocation map." },
    ],
  }),
  component: MapPage,
});

type Pin = {
  id: string;
  title: string;
  category: "Timber" | "Metal" | "Plastics" | "Construction";
  provider: string;
  city: string;
  distanceKm: number;
  weightKg: number;
  co2Kg: number;
  price: number;
  // SVG canvas coords (0-100)
  x: number;
  y: number;
};

const PINS: Pin[] = [
  { id: "L-1042", title: "Reclaimed Chengal beams", category: "Timber", provider: "Greenstone Builders", city: "Batu Pahat", distanceKm: 3.2, weightKg: 820, co2Kg: 1140, price: 870, x: 32, y: 58 },
  { id: "L-1018", title: "Aluminium offcuts", category: "Metal", provider: "Setia Foundry", city: "Pasir Gudang", distanceKm: 18.4, weightKg: 310, co2Kg: 2790, price: 780, x: 64, y: 70 },
  { id: "L-1007", title: "HDPE drums (food-grade)", category: "Plastics", provider: "EcoPack KL", city: "Shah Alam", distanceKm: 42.0, weightKg: 96, co2Kg: 172, price: 264, x: 48, y: 22 },
  { id: "L-1031", title: "Concrete blocks (reusable)", category: "Construction", provider: "BuildCircular", city: "Kluang", distanceKm: 27.1, weightKg: 1240, co2Kg: 198, price: 410, x: 22, y: 38 },
  { id: "L-1055", title: "Steel rebar offcuts", category: "Metal", provider: "Iskandar Steelworks", city: "Johor Bahru", distanceKm: 64.3, weightKg: 540, co2Kg: 970, price: 690, x: 78, y: 84 },
  { id: "L-1061", title: "Pallet timber (Grade B)", category: "Timber", provider: "Maker Loft", city: "Senai", distanceKm: 51.2, weightKg: 440, co2Kg: 615, price: 320, x: 70, y: 46 },
  { id: "L-1072", title: "PET flakes (clean)", category: "Plastics", provider: "ReGrain Polymers", city: "Muar", distanceKm: 38.5, weightKg: 180, co2Kg: 320, price: 510, x: 14, y: 64 },
];

const CATEGORY_COLOR: Record<Pin["category"], string> = {
  Timber: "oklch(0.55 0.13 80)",
  Metal: "oklch(0.55 0.04 240)",
  Plastics: "oklch(0.6 0.13 162)",
  Construction: "oklch(0.55 0.08 50)",
};

function MapPage() {
  const [selectedId, setSelectedId] = useState<string>(PINS[0].id);
  const selected = PINS.find((p) => p.id === selectedId)!;
  const sorted = [...PINS].sort((a, b) => a.distanceKm - b.distanceKm);

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-6 py-6">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Materials near you</h1>
            <p className="text-sm text-muted-foreground">
              7 reclaimable listings within 80 km · Sorted by proximity and impact density
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/marketplace">← Return to Marketplace</Link>
            </Button>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search a city or postcode" className="w-72 pl-9" defaultValue="Batu Pahat, Johor" />
            </div>
            <Button variant="outline" size="icon" aria-label="Filters"><Filter className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" aria-label="Layers"><Layers className="h-4 w-4" /></Button>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_380px]">
          {/* Map */}
          <div className="relative h-[640px] overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <MapCanvas
              pins={PINS}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />

            {/* Legend */}
            <div className="absolute left-4 top-4 rounded-xl border border-border bg-card/95 p-3 text-xs shadow-sm backdrop-blur">
              <p className="mb-2 font-medium text-foreground">Categories</p>
              <ul className="space-y-1.5">
                {(Object.keys(CATEGORY_COLOR) as Array<Pin["category"]>).map((c) => (
                  <li key={c} className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: CATEGORY_COLOR[c] }} />
                    <span className="text-muted-foreground">{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Map controls */}
            <div className="absolute right-4 top-4 flex flex-col overflow-hidden rounded-xl border border-border bg-card/95 shadow-sm backdrop-blur">
              <button className="flex h-9 w-9 items-center justify-center text-foreground hover:bg-muted">+</button>
              <div className="h-px bg-border" />
              <button className="flex h-9 w-9 items-center justify-center text-foreground hover:bg-muted">−</button>
            </div>
            <Button size="sm" className="absolute bottom-4 left-4 shadow-md">
              <Navigation className="h-4 w-4" /> Use my location
            </Button>

            {/* Selected pin info card */}
            {selected && (
              <div className="absolute bottom-4 right-4 w-80 rounded-xl border border-border bg-card p-4 shadow-lg">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Badge variant="secondary" className="bg-accent text-accent-foreground">{selected.category}</Badge>
                    <h3 className="mt-2 text-sm font-semibold text-foreground">{selected.title}</h3>
                    <p className="text-xs text-muted-foreground">{selected.provider} · {selected.city}</p>
                  </div>
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full text-primary-foreground"
                    style={{ backgroundColor: CATEGORY_COLOR[selected.category] }}
                  >
                    <MapPin className="h-4 w-4" />
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-lg bg-muted p-2">
                    <p className="font-semibold text-foreground">{selected.distanceKm} km</p>
                    <p className="text-muted-foreground">distance</p>
                  </div>
                  <div className="rounded-lg bg-muted p-2">
                    <p className="font-semibold text-foreground">{selected.weightKg} kg</p>
                    <p className="text-muted-foreground">available</p>
                  </div>
                  <div className="rounded-lg bg-accent p-2">
                    <p className="font-semibold text-foreground">{selected.co2Kg}</p>
                    <p className="text-muted-foreground">kg CO₂e</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">RM {selected.price.toFixed(2)}</span>
                  <Button asChild size="sm">
                    <Link to="/material/$id" params={{ id: selected.id }}>View listing</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Nearby panel */}
          <aside className="rounded-2xl border border-border bg-card shadow-sm">
            <div className="border-b border-border px-5 py-4">
              <h2 className="text-sm font-semibold text-foreground">Nearby listings</h2>
              <p className="text-xs text-muted-foreground">Within 80 km radius</p>
            </div>
            <ul className="max-h-[560px] divide-y divide-border overflow-y-auto">
              {sorted.map((p) => {
                const active = p.id === selectedId;
                return (
                  <li key={p.id}>
                    <button
                      onClick={() => setSelectedId(p.id)}
                      className={`flex w-full items-start gap-3 px-5 py-4 text-left transition-colors ${
                        active ? "bg-accent/40" : "hover:bg-muted/50"
                      }`}
                    >
                      <span
                        className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-lg text-primary-foreground"
                        style={{ backgroundColor: CATEGORY_COLOR[p.category] }}
                      >
                        <MapPin className="h-4 w-4" />
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium text-foreground">{p.title}</p>
                          <span className="text-xs font-medium text-muted-foreground">{p.distanceKm} km</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{p.provider} · {p.city}</p>
                        <div className="mt-2 flex items-center gap-3 text-xs">
                          <span className="inline-flex items-center gap-1 text-primary">
                            <Leaf className="h-3 w-3" /> {p.co2Kg} kg CO₂e
                          </span>
                          <span className="inline-flex items-center gap-1 text-muted-foreground">
                            <Truck className="h-3 w-3" /> ~{Math.round(p.distanceKm * 1.4)} min
                          </span>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </main>
    </div>
  );
}

function MapCanvas({
  pins,
  selectedId,
  onSelect,
}: {
  pins: Pin[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="mapBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.97 0.02 165)" />
          <stop offset="100%" stopColor="oklch(0.94 0.03 195)" />
        </linearGradient>
        <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
          <path d="M5 0 L0 0 0 5" fill="none" stroke="oklch(0.9 0.01 200)" strokeWidth="0.15" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#mapBg)" />
      <rect width="100" height="100" fill="url(#grid)" />

      {/* Decorative land / water shapes */}
      <path d="M0 70 Q20 60 35 68 T70 64 T100 72 L100 100 L0 100 Z" fill="oklch(0.88 0.04 200)" opacity="0.55" />
      <path d="M0 18 Q25 14 40 22 T80 18 T100 24 L100 0 L0 0 Z" fill="oklch(0.95 0.04 150)" opacity="0.5" />
      <path d="M10 45 Q30 35 50 48 T90 42" fill="none" stroke="oklch(0.85 0.05 200)" strokeWidth="0.6" />
      <path d="M5 80 Q40 78 60 85 T98 82" fill="none" stroke="oklch(0.85 0.05 200)" strokeWidth="0.6" />

      {/* Roads */}
      <g stroke="oklch(0.85 0.01 200)" strokeWidth="0.4" fill="none" strokeLinecap="round">
        <path d="M0 50 L100 55" />
        <path d="M40 0 L48 100" />
        <path d="M75 0 L70 100" />
        <path d="M0 30 L100 28" />
      </g>

      {/* User location */}
      <g transform="translate(40 50)">
        <circle r="6" fill="oklch(0.6 0.13 162)" opacity="0.15">
          <animate attributeName="r" values="3;7;3" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle r="1.6" fill="oklch(0.6 0.13 162)" stroke="white" strokeWidth="0.5" />
      </g>

      {/* Pins */}
      {pins.map((p) => {
        const active = p.id === selectedId;
        const color = CATEGORY_COLOR[p.category];
        return (
          <g
            key={p.id}
            transform={`translate(${p.x} ${p.y})`}
            className="cursor-pointer"
            onClick={() => onSelect(p.id)}
          >
            {active && (
              <circle r="4.5" fill={color} opacity="0.18">
                <animate attributeName="r" values="3;5;3" dur="1.8s" repeatCount="indefinite" />
              </circle>
            )}
            <path
              d="M0 -3.2 C1.8 -3.2 3 -2 3 -0.3 C3 1.5 0 4 0 4 C0 4 -3 1.5 -3 -0.3 C-3 -2 -1.8 -3.2 0 -3.2 Z"
              fill={color}
              stroke="white"
              strokeWidth="0.4"
              style={{ filter: active ? "drop-shadow(0 1px 1px rgba(0,0,0,0.3))" : undefined }}
            />
            <circle cy="-0.4" r="0.9" fill="white" />
          </g>
        );
      })}
    </svg>
  );
}
