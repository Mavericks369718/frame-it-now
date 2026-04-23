import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { PrimaryButton } from "@/components/PrimaryButton";
import { booking } from "@/lib/store";

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
        <div className="mb-auto">
          <div className="text-[11px] tracking-[0.3em] text-muted-foreground uppercase mb-3">
            Welcome
          </div>
          <h1 className="font-display text-[40px] leading-[1.05] text-foreground">
            What should
            <br />
            we <em className="italic font-light">call you?</em>
          </h1>
          <p className="text-sm text-muted-foreground mt-4">
            Just a first name is fine.
          </p>
        </div>

        <div className="space-y-6 mt-12">
          <div>
            <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-3">
              Your name
            </label>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Aarav"
              className="w-full bg-transparent text-2xl font-display outline-none border-b border-border pb-3 focus:border-foreground transition-colors"
            />
          </div>
          <PrimaryButton onClick={submit} disabled={!name.trim()}>
            Continue
          </PrimaryButton>
        </div>
      </div>
    </PhoneFrame>
  );
}
