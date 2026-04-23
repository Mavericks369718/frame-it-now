import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";
import { photographers, formatINR } from "@/lib/store";
import { MapPin } from "lucide-react";

export const Route = createFileRoute("/photographers")({
  head: () => ({
    meta: [
      { title: "All photographers — FrameIt" },
      {
        name: "description",
        content:
          "Browse curated wedding, portrait and lifestyle photographers across India.",
      },
    ],
  }),
  component: Listing,
});

function Listing() {
  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="px-7 pt-14 pb-6 fade-up">
          <div className="text-[11px] tracking-[0.3em] text-muted-foreground uppercase">
            Discover
          </div>
          <h1 className="font-display text-[32px] leading-[1.1] mt-3">
            All <em className="italic font-light">photographers</em>
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            {photographers.length} curated artists
          </p>
        </div>

        <ul className="px-5 pb-8 space-y-4">
          {photographers.map((p, i) => (
            <li key={p.id} className="fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              <Link
                to="/photographer/$id"
                params={{ id: p.id }}
                className="press block bg-background border border-border rounded-2xl overflow-hidden"
              >
                <div className="flex gap-4 p-3">
                  <div className="relative w-28 h-28 shrink-0 overflow-hidden rounded-xl bg-muted">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 py-1 flex flex-col">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          p.available ? "bg-[var(--color-success)]" : "bg-muted-foreground/40"
                        }`}
                      />
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {p.available ? "Available today" : "Booked this week"}
                      </span>
                    </div>
                    <div className="font-display text-lg leading-tight mt-1 text-foreground">
                      {p.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {p.category}
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" strokeWidth={1.5} />
                        {p.location}
                      </div>
                      <div className="text-sm font-medium text-foreground">
                        {formatINR(p.startingPrice)}
                        <span className="text-[10px] text-muted-foreground ml-1">
                          onwards
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
