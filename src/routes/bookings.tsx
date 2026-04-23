import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";
import { useSyncExternalStore } from "react";
import { booking, getPhotographer, formatINR } from "@/lib/store";
import { Calendar, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/bookings")({
  head: () => ({ meta: [{ title: "Your trips — FrameIt" }] }),
  component: Bookings,
});

function Bookings() {
  const state = useSyncExternalStore(booking.subscribe, booking.get, booking.get);
  const photographer = state.photographerId ? getPhotographer(state.photographerId) : null;
  const hasBooking = !!(photographer && state.reference);

  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="px-6 pt-14 pb-2 fade-up">
          <h1 className="font-display text-[32px] font-semibold tracking-[-0.04em] leading-[1]">
            Your trips
          </h1>
          <p className="text-[13px] text-muted-foreground mt-2">
            {hasBooking ? "1 upcoming shoot" : "No upcoming shoots"}
          </p>
        </div>

        {hasBooking ? (
          <div className="px-6 mt-6 fade-up">
            <div className="rounded-3xl overflow-hidden bg-background border border-border">
              <div className="relative aspect-[16/10] bg-muted">
                <img
                  src={photographer.image}
                  alt={photographer.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-white/80 font-medium">
                      Upcoming
                    </div>
                    <div className="font-display text-[22px] font-semibold mt-1">
                      {photographer.name}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-wider text-white/80 font-medium">
                      {state.date}
                    </div>
                    <div className="text-[16px] font-semibold mt-0.5">{state.time}</div>
                  </div>
                </div>
              </div>
              <div className="p-5 flex items-center justify-between">
                <div>
                  <div className="text-[12px] text-muted-foreground">{state.packageName}</div>
                  <div className="text-[16px] font-semibold tracking-tight mt-0.5">
                    {formatINR(state.packagePrice ?? 0)}
                  </div>
                </div>
                <Link
                  to="/confirmation"
                  className="press h-11 px-5 rounded-full bg-foreground text-background text-[13px] font-medium flex items-center gap-1.5"
                >
                  Details
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="px-6 mt-12 flex flex-col items-center text-center fade-up">
            <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center mb-5">
              <Calendar className="h-7 w-7 text-muted-foreground" strokeWidth={1.5} />
            </div>
            <p className="text-[15px] font-medium">No shoots yet</p>
            <p className="text-[13px] text-muted-foreground mt-1.5 max-w-[16rem]">
              Once you book, your upcoming and past shoots will live here.
            </p>
            <Link
              to="/photographers"
              className="press mt-6 h-12 px-6 rounded-full bg-foreground text-background text-[14px] font-medium inline-flex items-center"
            >
              Find a photographer
            </Link>
          </div>
        )}
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
