import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";
import { photographers, formatINR } from "@/lib/store";
import { Search, SlidersHorizontal, MapPin } from "lucide-react";

export const Route = createFileRoute("/photographers")({
  head: () => ({
    meta: [
      { title: "Discover — FrameIt" },
      {
        name: "description",
        content:
          "Browse curated wedding, portrait and lifestyle photographers across India.",
      },
    ],
  }),
  component: Listing,
});

const filters = ["All", "Wedding", "Portrait", "Travel", "Fashion", "Family"];

function Listing() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  const list = photographers.filter((p) => {
    const matchesFilter =
      active === "All" || p.tags.some((t) => t.toLowerCase().includes(active.toLowerCase()));
    const q = query.toLowerCase();
    const matchesQuery =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q);
    return matchesFilter && matchesQuery;
  });

  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="px-6 pt-14 pb-2 fade-up">
          <h1 className="font-display text-[32px] font-semibold tracking-[-0.04em] leading-[1]">
            Discover
          </h1>
          <p className="text-[13px] text-muted-foreground mt-2">
            {list.length} photographers · across India
          </p>
        </div>

        {/* Search */}
        <div className="px-6 mt-5 flex items-center gap-2 fade-up">
          <div className="flex-1 flex items-center gap-3 px-5 h-12 rounded-full bg-secondary">
            <Search className="h-4 w-4 text-muted-foreground" strokeWidth={1.8} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-muted-foreground"
            />
          </div>
          <button className="press h-12 w-12 rounded-full bg-foreground text-background flex items-center justify-center shrink-0">
            <SlidersHorizontal className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        {/* Filters */}
        <div className="mt-5 px-6 fade-up">
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-6 px-6 pb-1">
            {filters.map((f) => {
              const isActive = f === active;
              return (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={`press shrink-0 px-4 h-9 rounded-full text-[13px] font-medium transition-colors ${
                    isActive
                      ? "bg-foreground text-background"
                      : "bg-background border border-border text-foreground"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>

        {/* List */}
        <ul className="px-6 pb-8 mt-6 space-y-5">
          {list.map((p, i) => (
            <li key={p.id} className="fade-up" style={{ animationDelay: `${i * 50}ms` }}>
              <Link
                to="/photographer/$id"
                params={{ id: p.id }}
                className="press block"
              >
                <div className="relative aspect-[5/4] overflow-hidden rounded-3xl bg-muted">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 top-0 p-4 flex items-center justify-between">
                    <div
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur ${
                        p.available ? "bg-background/95" : "bg-foreground/80 text-background"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          p.available ? "bg-[var(--color-success)]" : "bg-white/70"
                        }`}
                      />
                      <span className="text-[10px] font-medium uppercase tracking-wider">
                        {p.available ? "Available today" : "Booked"}
                      </span>
                    </div>
                    <div className="px-2.5 py-1 rounded-full bg-background/95 backdrop-blur text-[11px] font-semibold">
                      ★ {p.rating}
                    </div>
                  </div>
                </div>
                <div className="flex items-start justify-between gap-3 mt-3 px-1">
                  <div className="min-w-0">
                    <div className="font-display text-[18px] font-semibold tracking-tight truncate">
                      {p.name}
                    </div>
                    <div className="text-[12px] text-muted-foreground mt-0.5 truncate">
                      {p.category}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-1.5">
                      <MapPin className="h-3 w-3" strokeWidth={1.8} />
                      {p.location} · {p.shoots} shoots
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      from
                    </div>
                    <div className="text-[16px] font-semibold tracking-tight">
                      {formatINR(p.startingPrice)}
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
          {list.length === 0 && (
            <li className="text-center text-sm text-muted-foreground py-10">
              No matches. Try another search.
            </li>
          )}
        </ul>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
