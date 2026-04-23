import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSyncExternalStore } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";
import { booking } from "@/lib/store";
import {
  ChevronRight,
  Heart,
  CreditCard,
  Bell,
  HelpCircle,
  LogOut,
} from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Account — FrameIt" }] }),
  component: Profile,
});

const items = [
  { label: "Saved photographers", icon: Heart },
  { label: "Payment methods", icon: CreditCard },
  { label: "Notifications", icon: Bell },
  { label: "Help & support", icon: HelpCircle },
];

function Profile() {
  const navigate = useNavigate();
  const state = useSyncExternalStore(booking.subscribe, booking.get, booking.get);
  const initial = (state.userName || "G").charAt(0).toUpperCase();

  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="px-6 pt-14 pb-6 fade-up">
          <h1 className="font-display text-[32px] font-semibold tracking-[-0.04em] leading-[1]">
            Account
          </h1>
        </div>

        {/* Profile card */}
        <div className="mx-6 p-5 rounded-3xl bg-foreground text-background flex items-center gap-4 fade-up">
          <div className="h-14 w-14 rounded-full bg-background text-foreground flex items-center justify-center font-display text-[22px] font-semibold">
            {initial}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-display text-[18px] font-semibold tracking-tight">
              {state.userName || "Guest"}
            </div>
            <div className="text-[12px] text-background/70 mt-0.5">
              FrameIt member · 2025
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-background/60" strokeWidth={2} />
        </div>

        {/* Stats */}
        <div className="mx-6 mt-4 grid grid-cols-3 rounded-3xl bg-secondary py-5 fade-up">
          <Stat value={state.reference ? "1" : "0"} label="Trips" />
          <div className="border-l border-border" />
          <Stat value="0" label="Saved" />
          <div className="border-l border-border" />
          <Stat value="0" label="Reviews" />
        </div>

        {/* Menu */}
        <ul className="mx-6 mt-6 rounded-3xl bg-background border border-border overflow-hidden fade-up">
          {items.map(({ label, icon: Icon }, i) => (
            <li key={label}>
              <button className="press w-full flex items-center gap-4 px-5 py-4 text-left">
                <Icon className="h-[18px] w-[18px] text-foreground" strokeWidth={1.8} />
                <span className="flex-1 text-[14px] font-medium">{label}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" strokeWidth={2} />
              </button>
              {i < items.length - 1 && <div className="h-px bg-border mx-5" />}
            </li>
          ))}
        </ul>

        <div className="px-6 mt-6 mb-10">
          <button
            onClick={() => navigate({ to: "/" })}
            className="press w-full flex items-center justify-center gap-2 h-14 rounded-full bg-secondary text-foreground text-[14px] font-medium"
          >
            <LogOut className="h-4 w-4" strokeWidth={2} />
            Sign out
          </button>
          <p className="text-[11px] text-muted-foreground text-center mt-5">
            FrameIt v1.0 · Made in India
          </p>
        </div>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="font-display text-[22px] font-semibold tracking-tight">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1 font-medium">
        {label}
      </div>
    </div>
  );
}
