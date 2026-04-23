import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";
import { booking, photographers, formatINR } from "@/lib/store";
import { useSyncExternalStore } from "react";
import { ArrowUpRight, Search, Bell, Camera, Heart, Briefcase, Plane } from "lucide-react";

export const Route = createFileRoute("/home")({
  head: () => ({ meta: [{ title: "Home — FrameIt" }] }),
  component: Home,
});

const categories = [
  { label: "Wedding", icon: Heart },
  { label: "Portrait", icon: Camera },
  { label: "Brand", icon: Briefcase },
  { label: "Travel", icon: Plane },
];

function Home() {
  const state = useSyncExternalStore(booking.subscribe, booking.get, booking.get);
  const name = state.userName || "there";
  const featured = photographers.slice(0, 4);
  const trending = photographers.slice(2, 6);

  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="px-6 pt-14 pb-2 flex items-center justify-between fade-up">
          <div>
            <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground font-medium">
              Mumbai · Now
            </div>
            <div className="font-display text-[20px] font-semibold tracking-tight mt-1">
              Hi, {name}.
            </div>
          </div>
          <button className="press h-11 w-11 rounded-full bg-secondary flex items-center justify-center">
            <Bell className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </button>
        </div>

        {/* Big greeting */}
        <div className="px-6 pt-6 fade-up">
          <h1 className="font-display text-[36px] leading-[1] tracking-[-0.04em] font-semibold text-balance">
            Who's shooting
            <br />
            <span className="text-muted-foreground">today?</span>
          </h1>
        </div>

        {/* Search */}
        <Link
          to="/photographers"
          className="press mx-6 mt-6 flex items-center gap-3 px-5 h-14 rounded-full bg-secondary fade-up"
        >
          <Search className="h-[18px] w-[18px] text-muted-foreground" strokeWidth={1.8} />
          <span className="text-[14px] text-muted-foreground flex-1">
            Search by name, style, city…
          </span>
        </Link>

        {/* Categories */}
        <div className="mt-6 px-6 fade-up">
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar -mx-6 px-6">
            {categories.map(({ label, icon: Icon }) => (
              <button
                key={label}
                className="press shrink-0 flex items-center gap-2 px-4 h-10 rounded-full bg-background border border-border"
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                <span className="text-[13px] font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured carousel */}
        <section className="mt-9">
          <div className="flex items-baseline justify-between px-6 mb-4">
            <h2 className="font-display text-[18px] font-semibold tracking-tight">
              Top this week
            </h2>
            <Link
              to="/photographers"
              className="text-[12px] text-muted-foreground flex items-center gap-1"
            >
              See all
              <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar px-6 pb-4 snap-x snap-mandatory">
            {featured.map((p, i) => (
              <Link
                key={p.id}
                to="/photographer/$id"
                params={{ id: p.id }}
                className="press snap-start shrink-0 w-[270px] fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {p.available && (
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/95 backdrop-blur">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" />
                      <span className="text-[10px] font-medium uppercase tracking-wider">
                        Available
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="font-display text-[18px] font-semibold leading-tight">
                      {p.name}
                    </div>
                    <div className="text-[11px] text-white/80 mt-0.5">
                      {p.category} · {p.location}
                    </div>
                    <div className="flex items-baseline justify-between mt-3">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-white/70">
                          from
                        </span>
                        <div className="text-[15px] font-semibold">
                          {formatINR(p.startingPrice)}
                        </div>
                      </div>
                      <div className="h-9 w-9 rounded-full bg-white text-foreground flex items-center justify-center">
                        <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Trending list */}
        <section className="px-6 mt-6 mb-8">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="font-display text-[18px] font-semibold tracking-tight">
              Trending nearby
            </h2>
          </div>
          <ul className="space-y-3">
            {trending.map((p, i) => (
              <li key={p.id} className="fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                <Link
                  to="/photographer/$id"
                  params={{ id: p.id }}
                  className="press flex items-center gap-4 p-2.5 rounded-2xl bg-background border border-border"
                >
                  <div className="relative h-16 w-16 shrink-0 rounded-xl overflow-hidden bg-muted">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[15px] font-semibold tracking-tight">
                      {p.name}
                    </div>
                    <div className="text-[12px] text-muted-foreground mt-0.5">
                      {p.category}
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[11px] font-medium">★ {p.rating}</span>
                      <span className="text-[11px] text-muted-foreground">·</span>
                      <span className="text-[11px] text-muted-foreground">
                        {p.location}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0 pr-1">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      from
                    </div>
                    <div className="text-[14px] font-semibold">
                      {formatINR(p.startingPrice)}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
