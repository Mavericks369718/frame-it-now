import { Link, useLocation } from "@tanstack/react-router";
import { Home, Search, Calendar, User } from "lucide-react";

const items = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/photographers", label: "Discover", icon: Search },
  { to: "/bookings", label: "Bookings", icon: Calendar },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="sticky bottom-0 left-0 right-0 z-30 bg-background/90 backdrop-blur-xl border-t border-border">
      <ul className="flex items-center justify-around px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {items.map(({ to, label, icon: Icon }) => {
          const active =
            to === "/home"
              ? pathname === "/home"
              : pathname.startsWith(to);
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                className="press flex flex-col items-center gap-1 py-1.5"
              >
                <Icon
                  className="h-5 w-5 transition-colors"
                  style={{
                    color: active
                      ? "var(--color-foreground)"
                      : "var(--color-muted-foreground)",
                  }}
                  strokeWidth={active ? 2.2 : 1.6}
                />
                <span
                  className="text-[10px] tracking-wide"
                  style={{
                    color: active
                      ? "var(--color-foreground)"
                      : "var(--color-muted-foreground)",
                    fontWeight: active ? 600 : 400,
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
