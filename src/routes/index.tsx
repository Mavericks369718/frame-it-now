import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { PrimaryButton } from "@/components/PrimaryButton";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FrameIt — Book India's best photographers" },
      {
        name: "description",
        content:
          "Book wedding, portrait and lifestyle photographers in under two minutes. Curated, premium, transparent pricing.",
      },
    ],
  }),
  component: LoginScreen,
});

function LoginScreen() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const sendOtp = () => {
    if (phone.length !== 10) {
      setError("Enter a valid 10-digit number");
      return;
    }
    setError("");
    setStep("otp");
  };

  const verify = () => {
    if (otp.some((d) => d === "")) {
      setError("Enter the 6-digit code");
      return;
    }
    setError("");
    navigate({ to: "/onboarding" });
  };

  const handleOtpChange = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...otp];
    next[i] = v;
    setOtp(next);
    if (v && i < 5) {
      const el = document.getElementById(`otp-${i + 1}`);
      el?.focus();
    }
  };

  return (
    <PhoneFrame>
      <div className="flex flex-col flex-1 px-7 pt-16 pb-10 fade-up">
        <div className="mb-auto">
          <div className="text-[11px] tracking-[0.3em] text-muted-foreground uppercase mb-3">
            FrameIt
          </div>
          <h1 className="font-display text-[42px] leading-[1.05] text-foreground">
            Book a<br />
            <em className="italic font-light">photographer</em>
            <br />
            in two minutes.
          </h1>
          <p className="text-sm text-muted-foreground mt-4 max-w-[18rem]">
            Curated talent. Transparent pricing. No back-and-forth.
          </p>
        </div>

        <div className="mt-12">
          {step === "phone" ? (
            <div className="space-y-4 fade-up">
              <label className="block text-xs tracking-wider uppercase text-muted-foreground">
                Mobile number
              </label>
              <div className="flex items-center border-b border-border pb-3">
                <span className="text-foreground text-lg mr-3">+91</span>
                <input
                  inputMode="numeric"
                  maxLength={10}
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="98765 43210"
                  className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground/50"
                />
              </div>
              {error && (
                <p className="text-xs text-destructive">{error}</p>
              )}
              <PrimaryButton onClick={sendOtp} className="mt-6">
                Send OTP
              </PrimaryButton>
            </div>
          ) : (
            <div className="space-y-5 fade-up">
              <div>
                <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-1">
                  Enter code
                </label>
                <p className="text-sm text-foreground">
                  Sent to +91 {phone}{" "}
                  <button
                    onClick={() => setStep("phone")}
                    className="text-muted-foreground underline underline-offset-4 ml-1"
                  >
                    edit
                  </button>
                </p>
              </div>
              <div className="flex gap-2 justify-between">
                {otp.map((d, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    inputMode="numeric"
                    maxLength={1}
                    value={d}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    className="w-12 h-14 rounded-xl border border-border bg-background text-center text-xl font-medium outline-none focus:border-foreground"
                  />
                ))}
              </div>
              {error && (
                <p className="text-xs text-destructive">{error}</p>
              )}
              <button
                onClick={() => setOtp(["", "", "", "", "", ""])}
                className="text-xs text-muted-foreground underline underline-offset-4"
              >
                Resend code
              </button>
              <PrimaryButton onClick={verify} className="mt-2">
                Verify & continue
              </PrimaryButton>
            </div>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}
