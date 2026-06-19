import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Mail, Phone, Building2, BadgeCheck, Calendar, Leaf, ArrowUpRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your profile — ReMate" },
      { name: "description", content: "Manage your ReMate profile, activity, and recent circular-economy transactions." },
    ],
  }),
  component: ProfilePage,
});

const ACTIVITY = [
  { label: "Listings published", value: "18", trend: "+3 this month" },
  { label: "Successful matches", value: "42", trend: "92% completion" },
  { label: "Member since", value: "Mar 2024", trend: "Verified provider" },
  { label: "Reputation score", value: "4.9", trend: "based on 38 reviews" },
];

const TRANSACTIONS = [
  { id: "TX-2041", material: "Reclaimed Chengal beams", role: "Sold", party: "Greenfield Architects", date: "Jun 02, 2026", weight: "820 kg", impact: "1,140 kg CO₂e", status: "Completed" },
  { id: "TX-2039", material: "Aluminium offcuts", role: "Sold", party: "Setia Foundry", date: "May 28, 2026", weight: "310 kg", impact: "2,790 kg CO₂e", status: "Completed" },
  { id: "TX-2034", material: "HDPE drums (clean)", role: "Bought", party: "EcoPack KL", date: "May 21, 2026", weight: "150 kg", impact: "270 kg CO₂e", status: "Completed" },
  { id: "TX-2030", material: "Pallet timber (Grade B)", role: "Sold", party: "Maker Loft Studio", date: "May 12, 2026", weight: "440 kg", impact: "610 kg CO₂e", status: "Completed" },
  { id: "TX-2028", material: "Steel rebar offcuts", role: "Bought", party: "BuildCircular", date: "May 04, 2026", weight: "1,200 kg", impact: "1,920 kg CO₂e", status: "In transit" },
];

function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(280px,360px)_1fr]">
          {/* Profile card */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.55_0.12_190)] text-3xl font-semibold text-primary-foreground">
                    AR
                  </div>
                  <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground ring-4 ring-card">
                    <BadgeCheck className="h-4 w-4" />
                  </span>
                </div>
                <h1 className="mt-4 text-xl font-semibold tracking-tight text-foreground">Aisyah Rahman</h1>
                <p className="text-sm text-muted-foreground">Sustainability Lead · Greenstone Builders</p>
                <Badge variant="secondary" className="mt-3 gap-1 bg-accent text-accent-foreground">
                  <Leaf className="h-3 w-3" /> Verified circular provider
                </Badge>
                <div className="mt-4 flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-foreground">4.9</span>
                  <span className="text-muted-foreground">(38 reviews)</span>
                </div>
                <div className="mt-5 flex w-full gap-2">
                  <Button className="flex-1">Edit profile</Button>
                  <Button variant="outline" className="flex-1" asChild>
                    <Link to="/sustainability">View impact</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-foreground">Contact information</h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-foreground">aisyah.rahman@greenstone.my</p>
                    <p className="text-xs text-muted-foreground">Primary email</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-foreground">+60 12 345 6789</p>
                    <p className="text-xs text-muted-foreground">Verified mobile</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Building2 className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-foreground">Greenstone Builders Sdn Bhd</p>
                    <p className="text-xs text-muted-foreground">Construction · 50 employees</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-foreground">Batu Pahat, Johor</p>
                    <p className="text-xs text-muted-foreground">Service radius 80 km</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-foreground">Joined March 2024</p>
                    <p className="text-xs text-muted-foreground">KYC verified</p>
                  </div>
                </li>
              </ul>
            </div>
          </aside>

          {/* Right column */}
          <section className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-base font-semibold text-foreground">Activity summary</h2>
                  <p className="text-sm text-muted-foreground">A snapshot of your circular marketplace performance.</p>
                </div>
                <Button variant="ghost" size="sm" asChild className="self-start shrink-0">
                  <Link to="/my-listings">Manage listings <ArrowUpRight className="h-4 w-4" /></Link>
                </Button>
              </div>
              <div className="mt-5 grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
                {ACTIVITY.map((a) => (
                  <div key={a.label} className="rounded-xl border border-border bg-background p-4">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">{a.label}</p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{a.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{a.trend}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card shadow-sm">
              <div className="flex flex-col gap-3 border-b border-border px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:px-6">
                <div>
                  <h2 className="text-base font-semibold text-foreground">Recent transactions</h2>
                  <p className="text-sm text-muted-foreground">Last 5 matched exchanges across your account.</p>
                </div>
                <Button variant="outline" size="sm" className="self-start shrink-0">Export CSV</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <tr>
                      <th className="px-3 py-3 font-medium sm:px-6">Ref</th>
                      <th className="px-3 py-3 font-medium sm:px-6">Material</th>
                      <th className="hidden px-3 py-3 font-medium sm:table-cell sm:px-6">Counterparty</th>
                      <th className="px-3 py-3 font-medium sm:px-6">Weight</th>
                      <th className="hidden px-3 py-3 font-medium sm:table-cell sm:px-6">Impact</th>
                      <th className="px-3 py-3 font-medium sm:px-6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {TRANSACTIONS.map((t) => (
                      <tr key={t.id} className="hover:bg-muted/30">
                        <td className="px-3 py-4 font-mono text-xs text-muted-foreground sm:px-6">{t.id}</td>
                        <td className="px-3 py-4 sm:px-6">
                          <p className="font-medium text-foreground">{t.material}</p>
                          <p className="text-xs text-muted-foreground">{t.date} · {t.role}</p>
                        </td>
                        <td className="hidden px-3 py-4 text-foreground sm:table-cell sm:px-6">{t.party}</td>
                        <td className="px-3 py-4 text-foreground sm:px-6">{t.weight}</td>
                        <td className="hidden px-3 py-4 sm:table-cell sm:px-6">
                          <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
                            <Leaf className="h-3 w-3" /> {t.impact}
                          </span>
                        </td>
                        <td className="px-3 py-4 sm:px-6">
                          <Badge variant={t.status === "Completed" ? "secondary" : "outline"}>{t.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
