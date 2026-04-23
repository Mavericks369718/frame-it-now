import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useSyncExternalStore, useEffect, useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { PrimaryButton } from "@/components/PrimaryButton";
import { booking, formatINR, getPhotographer } from "@/lib/store";
import { Check } from "lucide-react";

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
      <div className="flex-1 flex flex-col px-7 pt-20 pb-8">
        <div className="flex-1 flex flex-col items-center text-center">
          <div
            className={`relative h-20 w-20 rounded-full bg-foreground flex items-center justify-center transition-all duration-700 ${
              show ? "scale-100 opacity-100" : "scale-50 opacity-0"
            }`}
          >
            <Check className="h-9 w-9 text-background" strokeWidth={2} />
          </div>

          <h1 className="font-display text-[34px] leading-tight mt-8">
            Booking <em className="italic font-light">confirmed.</em>
          </h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-[20rem]">
            We've sent the details to your phone. {photographer.name.split(" ")[0]} will reach out before the shoot.
          </p>

          <div className="mt-8 px-5 py-2.5 rounded-full bg-accent">
            <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              Ref ·{" "}
            </span>
            <span className="text-xs font-medium tracking-wider text-foreground">
              {state.reference}
            </span>
          </div>

          {/* Details */}
          <div className="w-full mt-10 p-5 rounded-2xl bg-background border border-border text-left">
            <div className="flex gap-4 items-center">
              <img
                src={photographer.image}
                alt={photographer.name}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div>
                <div className="font-display text-base">{photographer.name}</div>
                <div className="text-xs text-muted-foreground">
                  {photographer.category}
                </div>
              </div>
            </div>
            <div className="mt-5 pt-5 border-t border-border grid grid-cols-2 gap-y-4 gap-x-3">
              <Detail label="Date" value={state.date ?? ""} />
              <Detail label="Time" value={state.time ?? ""} />
              <Detail label="Package" value={state.packageName ?? ""} />
              <Detail label="Amount" value={formatINR(state.packagePrice ?? 0)} />
            </div>
            <div className="mt-5 pt-5 border-t border-border flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                Payment
              </span>
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  state.paymentMethod === "online"
                    ? "bg-foreground text-background"
                    : "bg-accent text-foreground"
                }`}
              >
                {state.paymentMethod === "online" ? "Paid" : "Pay on day"}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2 mt-8">
          <PrimaryButton onClick={goHome}>Done</PrimaryButton>
        </div>
      </div>
    </PhoneFrame>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="text-sm text-foreground mt-1">{value}</div>
    </div>
  );
}
