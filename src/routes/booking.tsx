import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useMemo, useState, useSyncExternalStore } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { PrimaryButton } from "@/components/PrimaryButton";
import { booking, formatINR, getPhotographer } from "@/lib/store";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/booking")({
  head: () => ({ meta: [{ title: "Pick a date — FrameIt" }] }),
  component: Booking,
});

const TIMES = ["09:00", "11:00", "13:00", "15:00", "17:00", "19:00"];

function Booking() {
  const navigate = useNavigate();
  const state = useSyncExternalStore(booking.subscribe, booking.get, booking.get);
  const photographer = state.photographerId
    ? getPhotographer(state.photographerId)
    : null;

  const [date, setDate] = useState<string | null>(state.date);
  const [time, setTime] = useState<string | null>(state.time);

  const today = new Date();
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const daysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0,
  ).getDate();
  const firstWeekday = monthStart.getDay();
  const monthLabel = today.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Pseudo-availability: mark a few days as unavailable
  const unavailable = useMemo(
    () => new Set([3, 9, 14, 22, 28].map((d) => d)),
    [],
  );

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const proceed = () => {
    if (!date || !time) return;
    booking.set({ date, time });
    navigate({ to: "/payment" });
  };

  if (!photographer) {
    return (
      <PhoneFrame>
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <div>
            <div className="font-display text-2xl">Pick a photographer first</div>
            <Link to="/photographers" className="text-sm text-muted-foreground underline mt-2 inline-block">
              Browse
            </Link>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        <div className="flex items-center px-5 pt-12 pb-2">
          <button
            onClick={() => navigate({ to: "/photographer/$id", params: { id: photographer.id } })}
            className="press h-10 w-10 -ml-2 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
          </button>
          <div className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground ml-1">
            Step 1 of 2
          </div>
        </div>

        <div className="px-7 fade-up">
          <h1 className="font-display text-[32px] leading-tight">
            When should
            <br />
            <em className="italic font-light">we shoot?</em>
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            with {photographer.name} · {state.packageName}
          </p>
        </div>

        {/* Calendar */}
        <section className="px-7 mt-8">
          <div className="flex items-center justify-between mb-4">
            <div className="font-display text-base">{monthLabel}</div>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                Available
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-border" />
                Booked
              </span>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <div
                key={i}
                className="text-[10px] uppercase tracking-wider text-muted-foreground py-2"
              >
                {d}
              </div>
            ))}
            {cells.map((d, i) => {
              if (d === null) return <div key={i} />;
              const isPast = d < today.getDate();
              const isUnav = unavailable.has(d) || isPast;
              const dateStr = `${monthLabel.split(" ")[0]} ${d}`;
              const isSelected = date === dateStr;
              return (
                <button
                  key={i}
                  disabled={isUnav}
                  onClick={() => setDate(dateStr)}
                  className={`press aspect-square rounded-full text-sm transition-colors ${
                    isSelected
                      ? "bg-foreground text-background font-medium"
                      : isUnav
                        ? "text-muted-foreground/40 line-through"
                        : "text-foreground hover:bg-accent"
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </section>

        {/* Time slots */}
        <section className="px-7 mt-10">
          <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-4">
            Time slot
          </div>
          <div className="grid grid-cols-3 gap-2">
            {TIMES.map((t) => {
              const active = time === t;
              return (
                <button
                  key={t}
                  onClick={() => setTime(t)}
                  className={`press py-3.5 rounded-xl text-sm border transition-colors ${
                    active
                      ? "bg-foreground text-background border-foreground font-medium"
                      : "bg-background border-border text-foreground"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {/* Sticky cost + CTA */}
      <div className="sticky bottom-0 left-0 right-0 px-7 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] bg-background/95 backdrop-blur-xl border-t border-border">
        <div className="flex items-baseline justify-between mb-3">
          <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
            Running total
          </span>
          <span className="font-display text-2xl">
            {formatINR(state.packagePrice ?? 0)}
          </span>
        </div>
        <PrimaryButton onClick={proceed} disabled={!date || !time}>
          Continue to payment
        </PrimaryButton>
      </div>
    </PhoneFrame>
  );
}
