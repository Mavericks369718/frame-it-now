import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";
import { booking, photographers, formatINR } from "@/lib/store";
import { useSyncExternalStore } from "react";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/home")({
  head: () => ({ meta: [{ title: "Home — FrameIt" }] }),
  component: Home,
});

function Home() {
  const state = useSyncExternalStore(booking.subscribe, booking.get, booking.get);
  const name = state.userName || "there";
  const featured = photographers.slice(0, 4);

  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="px-7 pt-14 pb-2 fade-up">
          <div className="text-[11px] tracking-[0.3em] text-muted-foreground uppercase">
            FrameIt
          </div>
          <h1 className="font-display text-[34px] leading-[1.1] mt-3">
            Hi, {name}.
            <br />
            <em className="italic font-light text-muted-foreground">
              who's shooting today?
            </em>
          </h1>
        </div>

        <section className="mt-8">
          <div className="flex items-baseline justify-between px-7 mb-4">
            <h2 className="font-display text-lg">Featured</h2>
            <span className="text-[11px] tracking-wider uppercase text-muted-foreground">
              This week
            </span>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar px-7 pb-4 snap-x snap-mandatory">
            {featured.map((p) => (
              <Link
                key={p.id}
                to="/photographer/$id"
                params={{ id: p.id }}
                className="press snap-start shrink-0 w-[260px] fade-up"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-3 flex items-start justify-between gap-3">
                  <div>
                    <div className="font-display text-base text-foreground">
                      {p.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {p.category}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      from
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {formatINR(p.startingPrice)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="px-7 mt-6 mb-10">
          <Link
            to="/photographers"
            className="press flex items-center justify-between p-5 rounded-2xl border border-border bg-background"
          >
            <div>
              <div className="font-display text-lg">
                Browse all photographers
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {photographers.length} curated · across India
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-foreground" strokeWidth={1.5} />
          </Link>
        </section>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
