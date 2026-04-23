import { Link, useLocation } from "@tanstack/react-router";
import { Home, Compass, CalendarDays, User } from "lucide-react";

const items = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/photographers", label: "Discover", icon: Compass },
  { to: "/bookings", label: "Trips", icon: CalendarDays },
  { to: "/profile", label: "Account", icon: User },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="sticky bottom-0 left-0 right-0 z-30 bg-background/85 backdrop-blur-2xl border-t border-border">
      <ul className="flex items-center justify-around px-3 pt-2.5 pb-[max(0.65rem,env(safe-area-inset-bottom))]">
        {items.map(({ to, label, icon: Icon }) => {
          const active =
            to === "/home"
              ? pathname === "/home"
              : pathname.startsWith(to);
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                className="press flex flex-col items-center gap-1 py-1"
              >
                <Icon
                  className="h-[22px] w-[22px] transition-colors"
                  style={{
                    color: active
                      ? "var(--color-foreground)"
                      : "var(--color-muted-foreground)",
                  }}
                  strokeWidth={active ? 2.4 : 1.6}
                />
                <span
                  className="text-[10px] tracking-tight"
                  style={{
                    color: active
                      ? "var(--color-foreground)"
                      : "var(--color-muted-foreground)",
                    fontWeight: active ? 600 : 500,
                  }}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
