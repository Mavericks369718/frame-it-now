import type { ReactNode } from "react";

/**
 * Mobile-first phone frame. On small screens it fills the viewport.
 * On desktop it shows a centered phone-shaped frame for the demo.
 */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-[var(--color-surface)] flex items-center justify-center md:p-8">
      <div className="phone-frame relative w-full md:w-[420px] md:h-[880px] md:rounded-[48px] md:overflow-hidden flex flex-col min-h-screen md:min-h-0">
        {children}
      </div>
    </div>
  );
}
