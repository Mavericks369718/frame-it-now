import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useSyncExternalStore } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { PrimaryButton } from "@/components/PrimaryButton";
import { booking, formatINR, getPhotographer } from "@/lib/store";
import { ArrowLeft, CreditCard, Wallet, Check, Shield } from "lucide-react";

export const Route = createFileRoute("/payment")({
  head: () => ({ meta: [{ title: "Payment — FrameIt" }] }),
  component: Payment,
});

function Payment() {
  const navigate = useNavigate();
  const state = useSyncExternalStore(booking.subscribe, booking.get, booking.get);
  const photographer = state.photographerId ? getPhotographer(state.photographerId) : null;
  const [method, setMethod] = useState<"online" | "later">("online");
  const [processing, setProcessing] = useState(false);

  const confirm = () => {
    if (!photographer) return;
    setProcessing(true);
    setTimeout(() => {
      const ref = "FRM" + Math.random().toString(36).slice(2, 8).toUpperCase();
      booking.set({ paymentMethod: method, reference: ref });
      navigate({ to: "/confirmation" });
    }, 900);
  };

  if (!photographer || !state.date || !state.time) {
    return (
      <PhoneFrame>
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <div>
            <div className="font-display text-2xl font-semibold">Booking incomplete</div>
            <Link to="/photographers" className="text-sm text-muted-foreground underline mt-2 inline-block">
              Start over
            </Link>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  const total = state.packagePrice ?? 0;
  const gst = Math.round(total * 0.18);
  const grand = total + gst;

  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        <div className="flex items-center justify-between px-5 pt-12 pb-2">
          <button
            onClick={() => navigate({ to: "/booking" })}
            className="press h-11 w-11 rounded-full bg-secondary flex items-center justify-center"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          </button>
          <div className="flex items-center gap-1.5">
            <div className="h-1 w-8 rounded-full bg-foreground" />
            <div className="h-1 w-8 rounded-full bg-foreground" />
            <div className="h-1 w-8 rounded-full bg-foreground" />
          </div>
          <div className="w-11" />
        </div>

        <div className="px-6 fade-up mt-4">
          <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-medium">
            Step 2 of 2
          </div>
          <h1 className="font-display text-[32px] font-semibold tracking-[-0.04em] leading-[1] mt-2">
            Review &
            <br />
            confirm.
          </h1>
        </div>

        {/* Summary card */}
        <section className="mx-6 mt-6 p-5 rounded-3xl bg-secondary">
          <div className="flex gap-4 items-center">
            <img
              src={photographer.image}
              alt={photographer.name}
              className="h-14 w-14 rounded-2xl object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="font-display text-[16px] font-semibold tracking-tight">{photographer.name}</div>
              <div className="text-[12px] text-muted-foreground mt-0.5">
                {photographer.category} · {photographer.location}
              </div>
            </div>
          </div>
          <div className="mt-5 pt-5 border-t border-border space-y-3">
            <Row label="Package" value={state.packageName ?? ""} />
            <Row label="Date" value={state.date} />
            <Row label="Time" value={state.time} />
          </div>
          <div className="mt-4 pt-4 border-t border-border space-y-2.5">
            <Row label="Subtotal" value={formatINR(total)} muted />
            <Row label="GST (18%)" value={formatINR(gst)} muted />
            <div className="flex items-baseline justify-between pt-2">
              <span className="text-[13px] font-medium">
                Total
              </span>
              <span className="font-display text-[24px] font-semibold tracking-tight">{formatINR(grand)}</span>
            </div>
          </div>
        </section>

        {/* Payment methods */}
        <section className="px-6 mt-7">
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3 font-medium">
            Pay with
          </div>
          <div className="space-y-2.5">
            <PaymentOption
              active={method === "online"}
              onClick={() => setMethod("online")}
              icon={<CreditCard className="h-4 w-4" strokeWidth={2} />}
              title="Pay online"
              subtitle="UPI · Cards · Netbanking"
              badge="Razorpay"
            />
            <PaymentOption
              active={method === "later"}
              onClick={() => setMethod("later")}
              icon={<Wallet className="h-4 w-4" strokeWidth={2} />}
              title="Pay on shoot day"
              subtitle="Cash to the photographer"
            />
          </div>
        </section>

        <div className="flex items-center gap-2 mx-6 mt-6 px-4 py-3 rounded-2xl bg-secondary">
          <Shield className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={2} />
          <span className="text-[11px] text-muted-foreground">
            Free cancellation up to 48h before your shoot.
          </span>
        </div>
      </div>

      <div className="sticky bottom-0 left-0 right-0 px-6 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] bg-background/95 backdrop-blur-xl border-t border-border">
        <PrimaryButton onClick={confirm} disabled={processing}>
          {processing ? "Processing…" : `Confirm · ${formatINR(grand)}`}
        </PrimaryButton>
      </div>
    </PhoneFrame>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between text-[13px]">
      <span className="text-muted-foreground">
        {label}
      </span>
      <span className={muted ? "text-muted-foreground" : "text-foreground font-medium"}>
        {value}
      </span>
    </div>
  );
}

function PaymentOption({
  active,
  onClick,
  icon,
  title,
  subtitle,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  badge?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`press w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
        active ? "border-foreground bg-secondary" : "border-border bg-background"
      }`}
    >
      <div className="h-11 w-11 rounded-full bg-foreground text-background flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1 text-left">
        <div className="flex items-center gap-2">
          <div className="text-[14px] font-semibold tracking-tight">{title}</div>
          {badge && (
            <span className="text-[9px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-foreground text-background">
              {badge}
            </span>
          )}
        </div>
        <div className="text-[12px] text-muted-foreground mt-0.5">{subtitle}</div>
      </div>
      <div
        className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${
          active ? "border-foreground bg-foreground" : "border-border"
        }`}
      >
        {active && <Check className="h-3 w-3 text-background" strokeWidth={3} />}
      </div>
    </button>
  );
}
