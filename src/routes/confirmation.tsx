import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useSyncExternalStore, useEffect, useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { PrimaryButton } from "@/components/PrimaryButton";
import { booking, formatINR, getPhotographer } from "@/lib/store";
import { Check, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/confirmation")({
  head: () => ({ meta: [{ title: "Booking confirmed — FrameIt" }] }),
  component: Confirmation,
});

function Confirmation() {
  const navigate = useNavigate();
  const state = useSyncExternalStore(booking.subscribe, booking.get, booking.get);
  const photographer = state.photographerId ? getPhotographer(state.photographerId) : null;
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 80);
    return () => clearTimeout(t);
  }, []);

  if (!photographer || !state.reference) {
    return (
      <PhoneFrame>
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <Link to="/home" className="text-sm text-muted-foreground underline">
            Go home
          </Link>
        </div>
      </PhoneFrame>
    );
  }

  const goHome = () => {
    booking.reset();
    navigate({ to: "/home" });
  };

  return (
    <PhoneFrame>
      <div className="flex-1 flex flex-col px-6 pt-20 pb-8">
        <div className="flex-1 flex flex-col items-center text-center">
          {/* Animated check */}
          <div className="relative">
            <div
              className={`absolute inset-0 rounded-full bg-foreground/10 transition-all duration-1000 ${
                show ? "scale-[2.5] opacity-0" : "scale-100 opacity-100"
              }`}
            />
            <div
              className={`relative h-24 w-24 rounded-full bg-foreground flex items-center justify-center transition-all duration-700 ${
                show ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
            >
              <Check className="h-10 w-10 text-background" strokeWidth={2.5} />
            </div>
          </div>

          <h1 className="font-display text-[36px] font-semibold tracking-[-0.04em] leading-[1] mt-8">
            You're booked.
          </h1>
          <p className="text-[14px] text-muted-foreground mt-3 max-w-[20rem] leading-relaxed">
            We've sent the details to your phone.
            <br />
            {photographer.name.split(" ")[0]} will reach out before your shoot.
          </p>

          <div className="mt-7 flex items-center gap-2 px-4 py-2 rounded-full bg-secondary">
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-medium">
              Ref
            </span>
            <span className="text-[12px] font-semibold tracking-wider text-foreground">
              {state.reference}
            </span>
          </div>

          {/* Details */}
          <div className="w-full mt-9 p-5 rounded-3xl bg-secondary text-left">
            <div className="flex gap-4 items-center">
              <img
                src={photographer.image}
                alt={photographer.name}
                className="h-14 w-14 rounded-2xl object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="font-display text-[16px] font-semibold tracking-tight">{photographer.name}</div>
                <div className="text-[12px] text-muted-foreground">
                  {photographer.category}
                </div>
              </div>
              <button className="press h-10 w-10 rounded-full bg-foreground text-background flex items-center justify-center shrink-0">
                <MessageCircle className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
            <div className="mt-5 pt-5 border-t border-border grid grid-cols-2 gap-y-4 gap-x-3">
              <Detail label="Date" value={state.date ?? ""} />
              <Detail label="Time" value={state.time ?? ""} />
              <Detail label="Package" value={state.packageName ?? ""} />
              <Detail label="Amount" value={formatINR(state.packagePrice ?? 0)} />
            </div>
            <div className="mt-5 pt-5 border-t border-border flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                Payment
              </span>
              <span
                className={`text-[11px] font-medium px-3 py-1 rounded-full ${
                  state.paymentMethod === "online"
                    ? "bg-foreground text-background"
                    : "bg-background border border-border text-foreground"
                }`}
              >
                {state.paymentMethod === "online" ? "Paid" : "Pay on shoot day"}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2.5 mt-8">
          <PrimaryButton onClick={goHome}>Done</PrimaryButton>
        </div>
      </div>
    </PhoneFrame>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
        {label}
      </div>
      <div className="text-[14px] text-foreground mt-1 font-medium">{value}</div>
    </div>
  );
}
