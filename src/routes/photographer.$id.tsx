import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { PrimaryButton } from "@/components/PrimaryButton";
import { getPhotographer, formatINR, booking } from "@/lib/store";
import { ArrowLeft, MapPin, Star } from "lucide-react";

export const Route = createFileRoute("/photographer/$id")({
  loader: ({ params }) => {
    const photographer = getPhotographer(params.id);
    if (!photographer) throw notFound();
    return { photographer };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.photographer.name} — FrameIt` },
          { name: "description", content: loaderData.photographer.bio },
          { property: "og:title", content: loaderData.photographer.name },
          { property: "og:description", content: loaderData.photographer.bio },
          { property: "og:image", content: loaderData.photographer.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <PhoneFrame>
      <div className="flex-1 flex items-center justify-center p-8 text-center">
        <div>
          <div className="font-display text-2xl">Not found</div>
          <Link to="/photographers" className="text-sm text-muted-foreground underline mt-2 inline-block">
            Browse photographers
          </Link>
        </div>
      </div>
    </PhoneFrame>
  ),
  component: Profile,
});

function Profile() {
  const { photographer: p } = Route.useLoaderData();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);

  const book = () => {
    const pkg = p.packages[selected];
    booking.set({
      photographerId: p.id,
      packageName: pkg.name,
      packagePrice: pkg.price,
    });
    navigate({ to: "/booking" });
  };

  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {/* Hero image */}
        <div className="relative aspect-[4/5] w-full bg-muted">
          <img
            src={p.image}
            alt={p.name}
            className="w-full h-full object-cover"
          />
          <Link
            to="/photographers"
            className="press absolute top-12 left-5 h-10 w-10 rounded-full bg-background/90 backdrop-blur flex items-center justify-center"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
          </Link>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background/60 to-transparent">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  p.available ? "bg-[var(--color-success)]" : "bg-muted-foreground/50"
                }`}
              />
              {p.available ? "Available today" : "Booked this week"}
            </div>
            <h1 className="font-display text-3xl mt-1">{p.name}</h1>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-foreground text-foreground" />
                {p.rating}
              </span>
              <span>·</span>
              <span>{p.shoots} shoots</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" strokeWidth={1.5} />
                {p.location}
              </span>
            </div>
          </div>
        </div>

        <div className="px-7 pt-6 space-y-10">
          {/* Bio */}
          <section>
            <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
              About
            </div>
            <p className="text-[15px] leading-relaxed text-foreground">
              {p.bio}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="text-[11px] tracking-wide uppercase px-3 py-1.5 rounded-full border border-border text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>

          {/* Portfolio */}
          <section>
            <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
              Portfolio
            </div>
            <div className="grid grid-cols-2 gap-2">
              {p.portfolio.map((src, i) => (
                <div
                  key={i}
                  className={`overflow-hidden rounded-xl bg-muted ${
                    i === 0 ? "col-span-2 aspect-[4/3]" : "aspect-square"
                  }`}
                >
                  <img
                    src={src}
                    alt={`Work ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Packages */}
          <section>
            <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
              Packages
            </div>
            <div className="space-y-2">
              {p.packages.map((pkg, i) => {
                const active = i === selected;
                return (
                  <button
                    key={pkg.name}
                    onClick={() => setSelected(i)}
                    className={`press w-full text-left p-5 rounded-2xl border transition-colors ${
                      active
                        ? "border-foreground bg-background"
                        : "border-border bg-background"
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="font-display text-lg">{pkg.name}</div>
                      <div className="text-base font-medium">
                        {formatINR(pkg.price)}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {pkg.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="sticky bottom-0 left-0 right-0 px-7 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] bg-background/95 backdrop-blur-xl border-t border-border">
        <PrimaryButton onClick={book}>
          Book {p.packages[selected].name} · {formatINR(p.packages[selected].price)}
        </PrimaryButton>
      </div>
    </PhoneFrame>
  );
}
