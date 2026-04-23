import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSyncExternalStore } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";
import { PrimaryButton } from "@/components/PrimaryButton";
import { booking } from "@/lib/store";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — FrameIt" }] }),
  component: Profile,
});

function Profile() {
  const navigate = useNavigate();
  const state = useSyncExternalStore(booking.subscribe, booking.get, booking.get);
  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="px-7 pt-14 pb-6 fade-up">
          <div className="text-[11px] tracking-[0.3em] text-muted-foreground uppercase">
            Profile
          </div>
          <h1 className="font-display text-[32px] leading-[1.1] mt-3">
            {state.userName || "Guest"}
          </h1>
        </div>
        <div className="px-7 mt-10">
          <PrimaryButton variant="outline" onClick={() => navigate({ to: "/" })}>
            Sign out
          </PrimaryButton>
        </div>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
