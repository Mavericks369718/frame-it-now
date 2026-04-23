import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { PrimaryButton } from "@/components/PrimaryButton";
import { booking } from "@/lib/store";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [{ title: "Welcome — FrameIt" }],
  }),
  component: Onboarding,
});

function Onboarding() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const submit = () => {
    if (!name.trim()) return;
    booking.set({ userName: name.trim().split(" ")[0] });
    navigate({ to: "/home" });
  };

  return (
    <PhoneFrame>
      <div className="flex flex-col flex-1 px-7 pt-20 pb-10 fade-up">
        <div className="flex items-center gap-1.5 mb-12">
          <div className="h-1 w-8 rounded-full bg-foreground" />
          <div className="h-1 w-8 rounded-full bg-border" />
        </div>

        <div className="mb-auto">
          <div className="text-[10px] tracking-[0.35em] text-muted-foreground uppercase mb-4 font-medium">
            Step 1 of 2
          </div>
          <h1 className="font-display text-[44px] leading-[0.95] text-foreground font-semibold tracking-[-0.04em]">
            What should
            <br />
            we call you?
          </h1>
          <p className="text-[15px] text-muted-foreground mt-4">
            First name is fine.
          </p>
        </div>

        <div className="space-y-5 mt-12">
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Your name"
            className="w-full bg-secondary text-[17px] font-medium outline-none rounded-full px-6 h-[58px] focus:ring-2 focus:ring-foreground transition-all placeholder:text-muted-foreground"
          />
          <PrimaryButton onClick={submit} disabled={!name.trim()}>
            Continue
            <ArrowRight className="h-4 w-4 ml-2" strokeWidth={2.2} />
          </PrimaryButton>
        </div>
      </div>
    </PhoneFrame>
  );
}
