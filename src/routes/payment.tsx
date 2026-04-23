import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useSyncExternalStore } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { PrimaryButton } from "@/components/PrimaryButton";
import { booking, formatINR, getPhotographer } from "@/lib/store";
import { ArrowLeft, CreditCard, Wallet, Check } from "lucide-react";

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
            <div className="font-display text-2xl">Booking incomplete</div>
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
        <div className="flex items-center px-5 pt-12 pb-2">
          <button
            onClick={() => navigate({ to: "/booking" })}
            className="press h-10 w-10 -ml-2 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
          </button>
          <div className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground ml-1">
            Step 2 of 2
          </div>
        </div>

        <div className="px-7 fade-up">
          <h1 className="font-display text-[32px] leading-tight">
            Almost <em className="italic font-light">there.</em>
          </h1>
        </div>

        {/* Summary card */}
        <section className="mx-7 mt-6 p-5 rounded-2xl bg-background border border-border">
          <div className="flex gap-4">
            <img
              src={photographer.image}
              alt={photographer.name}
              className="h-16 w-16 rounded-xl object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="font-display text-base">{photographer.name}</div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {photographer.category}
              </div>
            </div>
          </div>
          <div className="mt-5 pt-5 border-t border-border space-y-2.5 text-sm">
            <Row label="Package" value={state.packageName ?? ""} />
            <Row label="Date" value={state.date} />
            <Row label="Time" value={state.time} />
          </div>
          <div className="mt-4 pt-4 border-t border-border space-y-2 text-sm">
            <Row label="Subtotal" value={formatINR(total)} muted />
            <Row label="GST (18%)" value={formatINR(gst)} muted />
            <div className="flex items-baseline justify-between pt-2">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                Total
              </span>
              <span className="font-display text-2xl">{formatINR(grand)}</span>
            </div>
          </div>
        </section>

        {/* Payment methods */}
        <section className="px-7 mt-8">
          <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
            Payment method
          </div>
          <div className="space-y-2">
            <PaymentOption
              active={method === "online"}
              onClick={() => setMethod("online")}
              icon={<CreditCard className="h-4 w-4" strokeWidth={1.6} />}
              title="Pay online"
              subtitle="UPI, cards, netbanking · Razorpay"
            />
            <PaymentOption
              active={method === "later"}
              onClick={() => setMethod("later")}
              icon={<Wallet className="h-4 w-4" strokeWidth={1.6} />}
              title="Pay on shoot day"
              subtitle="Cash to the photographer"
            />
          </div>
        </section>
      </div>

      <div className="sticky bottom-0 left-0 right-0 px-7 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] bg-background/95 backdrop-blur-xl border-t border-border">
        <PrimaryButton onClick={confirm} disabled={processing}>
          {processing ? "Confirming…" : `Confirm booking · ${formatINR(grand)}`}
        </PrimaryButton>
      </div>
    </PhoneFrame>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">
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
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`press w-full flex items-center gap-4 p-4 rounded-2xl border transition-colors ${
        active ? "border-foreground bg-background" : "border-border bg-background"
      }`}
    >
      <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-foreground">
        {icon}
      </div>
      <div className="flex-1 text-left">
        <div className="text-sm font-medium text-foreground">{title}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{subtitle}</div>
      </div>
      <div
        className={`h-5 w-5 rounded-full border flex items-center justify-center transition-colors ${
          active ? "border-foreground bg-foreground" : "border-border"
        }`}
      >
        {active && <Check className="h-3 w-3 text-background" strokeWidth={3} />}
      </div>
    </button>
  );
}
