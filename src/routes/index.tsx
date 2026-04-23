import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ArrowRight } from "lucide-react";

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
      <div className="flex flex-col flex-1 relative">
        {/* Hero image */}
        <div className="relative h-[44%] min-h-[300px] bg-foreground overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1551737823-dfd146e0aa22?auto=format&fit=crop&w=900&q=80"
            alt="Photographer at work"
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-background" />

          <div className="relative z-10 px-7 pt-14 fade-up">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-white" />
              <div className="text-[10px] tracking-[0.35em] text-white/90 uppercase font-medium">
                FrameIt
              </div>
            </div>
          </div>
        </div>

        {/* Sheet */}
        <div className="flex-1 flex flex-col px-7 pt-8 pb-10 -mt-10 bg-background rounded-t-[36px] relative z-10 slide-up">
          <h1 className="font-display text-[40px] leading-[0.98] text-foreground tracking-[-0.04em] font-semibold">
            Move at the
            <br />
            speed of light.
          </h1>
          <p className="text-[15px] text-muted-foreground mt-3 max-w-[20rem] leading-relaxed">
            Book a curated photographer in under two minutes. No back-and-forth.
          </p>

          <div className="mt-auto pt-10">
            {step === "phone" ? (
              <div className="space-y-5 fade-up">
                <div className="flex items-stretch gap-2">
                  <div className="flex items-center px-4 h-[58px] rounded-full bg-secondary text-foreground text-[15px] font-medium">
                    +91
                  </div>
                  <div className="flex-1 flex items-center px-5 h-[58px] rounded-full bg-secondary focus-within:ring-2 focus-within:ring-foreground transition-all">
                    <input
                      inputMode="numeric"
                      maxLength={10}
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value.replace(/\D/g, ""))
                      }
                      placeholder="Mobile number"
                      className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
                {error && (
                  <p className="text-xs text-destructive px-2">{error}</p>
                )}
                <PrimaryButton onClick={sendOtp}>
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" strokeWidth={2.2} />
                </PrimaryButton>
                <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
                  By continuing you agree to our Terms & Privacy Policy.
                </p>
              </div>
            ) : (
              <div className="space-y-5 fade-up">
                <div>
                  <p className="text-sm text-foreground">
                    Code sent to{" "}
                    <span className="font-medium">+91 {phone}</span>
                    <button
                      onClick={() => setStep("phone")}
                      className="text-muted-foreground underline underline-offset-4 ml-2 text-xs"
                    >
                      change
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
                      className="w-12 h-14 rounded-2xl bg-secondary text-center text-xl font-semibold outline-none focus:ring-2 focus:ring-foreground transition-all"
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
                <PrimaryButton onClick={verify}>
                  Verify & continue
                </PrimaryButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
