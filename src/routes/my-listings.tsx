import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Plus,
  Search,
  MapPin,
  Eye,
  Pencil,
  Trash2,
  MoreHorizontal,
  Recycle,
  MessageSquare,
  Check,
  X,
  Inbox,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LISTINGS } from "@/lib/listings";

export const Route = createFileRoute("/my-listings")({
  head: () => ({
    meta: [
      { title: "My listings — ReMate" },
      {
        name: "description",
        content: "Manage your active waste listings, pending buyer requests, and impact on ReMate.",
      },
    ],
  }),
  component: MyListingsPage,
});

type Status = "Active" | "Pending review" | "Reserved" | "Sold out" | "Draft";

const STATUS_STYLES: Record<Status, string> = {
  Active: "bg-primary/10 text-primary",
  "Pending review": "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  Reserved: "bg-blue-500/15 text-blue-700 dark:text-blue-400",
  "Sold out": "bg-muted text-muted-foreground",
  Draft: "bg-secondary text-secondary-foreground",
};

const MY = LISTINGS.slice(0, 5).map((l, i) => ({
  ...l,
  status: (
    ["Active", "Active", "Pending review", "Reserved", "Draft"] as Status[]
  )[i],
  views: [248, 132, 18, 412, 0][i],
  requests: [6, 2, 0, 9, 0][i],
}));

const REQUESTS = [
  {
    id: "r1",
    listing: MY[0],
    buyer: "Sara Furniture Studio",
    qty: "80 kg",
    when: "2 hours ago",
    note: "Need for an upcycled bench project, can collect this weekend.",
  },
  {
    id: "r2",
    listing: MY[0],
    buyer: "Maker Space JB",
    qty: "120 kg",
    when: "Yesterday",
    note: "Workshop class. Flexible on pickup date.",
  },
  {
    id: "r3",
    listing: MY[3],
    buyer: "GreenLoop Recyclers",
    qty: "All units",
    when: "3 days ago",
    note: "Bulk reprocessing — will arrange own truck.",
  },
];

function MyListingsPage() {
  const totalActive = MY.filter((m) => m.status === "Active").length;
  const totalRequests = REQUESTS.length;
  const totalViews = MY.reduce((s, m) => s + m.views, 0);
  const totalKg = MY.filter((m) => m.status === "Active").reduce(
    (s, m) => s + Number(m.qty),
    0,
  );

  return (
    <div className="min-h-screen bg-background text-foreground">

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">My listings</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage your active materials, review buyer requests, and track impact.
            </p>
          </div>
          <Button asChild size="lg" className="h-11 px-5">
            <Link to="/create-listing">
              <Plus className="h-4 w-4" /> Create a listing
            </Link>
          </Button>
        </div>

        {/* Stat strip */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Active listings" value={String(totalActive)} sub="visible to buyers" />
          <Stat label="Pending requests" value={String(totalRequests)} sub="awaiting your reply" />
          <Stat label="30-day views" value={String(totalViews)} sub="across all listings" />
          <Stat
            label="kg ready to divert"
            value={totalKg.toLocaleString()}
            sub="from your active listings"
            accent
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="listings" className="mt-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <TabsList>
              <TabsTrigger value="listings">
                Listings <span className="ml-1.5 text-xs text-muted-foreground">{MY.length}</span>
              </TabsTrigger>
              <TabsTrigger value="requests">
                Requests <span className="ml-1.5 text-xs text-muted-foreground">{totalRequests}</span>
              </TabsTrigger>
            </TabsList>
            <div className="relative w-full sm:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="h-9 pl-9" placeholder="Search my listings…" />
            </div>
          </div>

          {/* Listings table */}
          <TabsContent value="listings" className="mt-5">
            <Card className="overflow-hidden border-border shadow-sm">
              <div className="hidden grid-cols-[1.6fr_0.9fr_0.7fr_0.7fr_0.8fr_auto] gap-4 border-b border-border bg-card px-5 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground md:grid">
                <div>Material</div>
                <div>Status</div>
                <div>Views</div>
                <div>Requests</div>
                <div>Price</div>
                <div className="text-right">Actions</div>
              </div>
              <ul className="divide-y divide-border">
                {MY.map((l) => (
                  <li
                    key={l.id}
                    className="grid grid-cols-1 gap-3 px-5 py-4 md:grid-cols-[1.6fr_0.9fr_0.7fr_0.7fr_0.8fr_auto] md:items-center md:gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="h-14 w-14 shrink-0 rounded-lg"
                        style={{ background: l.bg }}
                      />
                      <div className="min-w-0">
                        <Link
                          to="/material/$id"
                          params={{ id: l.id }}
                          className="block truncate text-sm font-semibold text-foreground hover:underline"
                        >
                          {l.title}
                        </Link>
                        <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                          <span>
                            {l.qty} {l.unit} · Grade {l.grade}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {l.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <StatusBadge status={l.status} />
                    </div>
                    <div className="text-sm text-foreground">{l.views}</div>
                    <div className="text-sm text-foreground">
                      {l.requests > 0 ? (
                        <span className="inline-flex items-center gap-1 font-medium text-primary">
                          <Inbox className="h-3.5 w-3.5" /> {l.requests}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </div>
                    <div className="text-sm font-semibold text-foreground">{l.price}</div>
                    <div className="flex items-center justify-end gap-1">
                      <Button asChild variant="ghost" size="icon" aria-label="View">
                        <Link to="/material/$id" params={{ id: l.id }}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" aria-label="Edit">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Delete"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" aria-label="More">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </TabsContent>

          {/* Requests */}
          <TabsContent value="requests" className="mt-5">
            <div className="grid gap-4">
              {REQUESTS.map((r) => (
                <Card key={r.id} className="border-border shadow-sm">
                  <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start gap-4">
                      <div
                        className="h-14 w-14 shrink-0 rounded-lg"
                        style={{ background: r.listing.bg }}
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-foreground">
                            {r.buyer}
                          </span>
                          <span className="text-xs text-muted-foreground">· {r.when}</span>
                        </div>
                        <div className="mt-0.5 text-xs text-muted-foreground">
                          Requested{" "}
                          <span className="font-medium text-foreground">{r.qty}</span> from{" "}
                          <Link
                            to="/material/$id"
                            params={{ id: r.listing.id }}
                            className="font-medium text-primary hover:underline"
                          >
                            {r.listing.title}
                          </Link>
                        </div>
                        <p className="mt-2 max-w-xl text-sm text-foreground/80">"{r.note}"</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 md:flex-col md:items-end">
                      <Button size="sm">
                        <Check className="h-4 w-4" /> Accept
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4" /> Message
                      </Button>
                      <Button size="sm" variant="ghost" className="text-muted-foreground">
                        <X className="h-4 w-4" /> Decline
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

    </div>
  );
}

function Stat({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <Card className="border-border shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
          {accent && (
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Recycle className="h-3.5 w-3.5" />
            </span>
          )}
        </div>
        <div className="mt-3 font-mono text-2xl font-bold tabular-nums text-foreground">
          {value}
        </div>
        <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
