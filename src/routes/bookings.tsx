import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/bookings")({
  head: () => ({ meta: [{ title: "Your bookings — FrameIt" }] }),
  component: Bookings,
});

function Bookings() {
  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="px-7 pt-14 pb-6 fade-up">
          <div className="text-[11px] tracking-[0.3em] text-muted-foreground uppercase">
            Bookings
          </div>
          <h1 className="font-display text-[32px] leading-[1.1] mt-3">
            Your <em className="italic font-light">shoots</em>
          </h1>
        </div>
        <div className="px-7 mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            No upcoming shoots yet.
          </p>
        </div>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
