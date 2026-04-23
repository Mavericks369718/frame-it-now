import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { PrimaryButton } from "@/components/PrimaryButton";
import { getPhotographer, formatINR, booking } from "@/lib/store";
import { ArrowLeft, Heart, MapPin, Star, Check } from "lucide-react";

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
          <div className="font-display text-2xl font-semibold">Not found</div>
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
        {/* Hero */}
        <div className="relative aspect-[4/5] w-full bg-foreground">
          <img
            src={p.image}
            alt={p.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

          <div className="absolute top-12 left-5 right-5 flex items-center justify-between">
            <Link
              to="/photographers"
              className="press h-11 w-11 rounded-full bg-background/95 backdrop-blur flex items-center justify-center"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            </Link>
            <button className="press h-11 w-11 rounded-full bg-background/95 backdrop-blur flex items-center justify-center">
              <Heart className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur mb-3 ${
                p.available ? "bg-white/95 text-foreground" : "bg-black/60"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  p.available ? "bg-[var(--color-success)]" : "bg-white/70"
                }`}
              />
              <span className="text-[10px] font-medium uppercase tracking-wider">
                {p.available ? "Available today" : "Booked this week"}
              </span>
            </div>
            <h1 className="font-display text-[34px] font-semibold tracking-[-0.04em] leading-[1]">
              {p.name}
            </h1>
            <div className="flex items-center gap-3 text-[12px] text-white/90 mt-2">
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-white text-white" />
                {p.rating}
              </span>
              <span className="text-white/50">·</span>
              <span>{p.shoots} shoots</span>
              <span className="text-white/50">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" strokeWidth={2} />
                {p.location}
              </span>
            </div>
          </div>
        </div>

        <div className="px-6 pt-7 space-y-9">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span
                key={t}
                className="text-[11px] tracking-wide font-medium uppercase px-3 py-1.5 rounded-full bg-secondary text-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Bio */}
          <section>
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3 font-medium">
              About
            </div>
            <p className="text-[15px] leading-relaxed text-foreground">
              {p.bio}
            </p>
          </section>

          {/* Portfolio */}
          <section>
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3 font-medium">
              Portfolio
            </div>
            <div className="grid grid-cols-2 gap-2">
              {p.portfolio.map((src, i) => (
                <div
                  key={i}
                  className={`overflow-hidden rounded-2xl bg-muted ${
                    i === 0 ? "col-span-2 aspect-[16/10]" : "aspect-square"
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
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3 font-medium">
              Choose a package
            </div>
            <div className="space-y-2.5">
              {p.packages.map((pkg, i) => {
                const active = i === selected;
                return (
                  <button
                    key={pkg.name}
                    onClick={() => setSelected(i)}
                    className={`press w-full text-left p-5 rounded-2xl border-2 transition-all ${
                      active
                        ? "border-foreground bg-secondary"
                        : "border-border bg-background"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                            active
                              ? "border-foreground bg-foreground"
                              : "border-border"
                          }`}
                        >
                          {active && (
                            <Check className="h-3 w-3 text-background" strokeWidth={3} />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="font-display text-[16px] font-semibold tracking-tight">
                            {pkg.name}
                          </div>
                          <div className="text-[12px] text-muted-foreground mt-0.5">
                            {pkg.description}
                          </div>
                        </div>
                      </div>
                      <div className="text-[15px] font-semibold tracking-tight shrink-0">
                        {formatINR(pkg.price)}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="sticky bottom-0 left-0 right-0 px-6 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] bg-background/95 backdrop-blur-xl border-t border-border">
        <PrimaryButton onClick={book}>
          Book · {formatINR(p.packages[selected].price)}
        </PrimaryButton>
      </div>
    </PhoneFrame>
  );
}
