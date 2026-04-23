// Simple in-memory client-side store for booking flow state.
// This is not persisted — page refresh resets state, by design (client-only demo).

import photographer1 from "@/assets/photographer-1.jpg";
import photographer2 from "@/assets/photographer-2.jpg";
import photographer3 from "@/assets/photographer-3.jpg";
import photographer4 from "@/assets/photographer-4.jpg";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";

export type Photographer = {
  id: string;
  name: string;
  category: string;
  tags: string[];
  location: string;
  startingPrice: number;
  available: boolean;
  rating: number;
  shoots: number;
  image: string;
  portfolio: string[];
  bio: string;
  packages: { name: string; description: string; price: number }[];
};

export const photographers: Photographer[] = [
  {
    id: "arjun-mehra",
    name: "Arjun Mehra",
    category: "Wedding & Events",
    tags: ["Wedding", "Candid", "Traditional"],
    location: "Mumbai",
    startingPrice: 24999,
    available: true,
    rating: 4.9,
    shoots: 142,
    image: photographer1,
    portfolio: [portfolio1, portfolio4, portfolio3, portfolio2],
    bio: "Documenting Indian weddings with a cinematic, unhurried eye for ten years. Every frame is a quiet moment, never staged.",
    packages: [
      { name: "Half Day", description: "4 hours · 1 photographer · 150 edits", price: 24999 },
      { name: "Full Day", description: "8 hours · 2 photographers · 300 edits", price: 44999 },
      { name: "Wedding Story", description: "2 days · full team · album", price: 89999 },
    ],
  },
  {
    id: "ishita-rao",
    name: "Ishita Rao",
    category: "Portrait & Editorial",
    tags: ["Portrait", "Fashion", "Studio"],
    location: "Bengaluru",
    startingPrice: 12999,
    available: true,
    rating: 4.8,
    shoots: 98,
    image: photographer2,
    portfolio: [portfolio2, portfolio4, portfolio1, portfolio3],
    bio: "Editorial portraits made for people who hate being photographed. Soft light, slow pace, honest results.",
    packages: [
      { name: "Solo Session", description: "90 min · 1 location · 30 edits", price: 12999 },
      { name: "Editorial", description: "3 hours · 2 looks · 60 edits", price: 22999 },
      { name: "Brand Day", description: "Full day · multiple sets", price: 49999 },
    ],
  },
  {
    id: "kabir-shah",
    name: "Kabir Shah",
    category: "Lifestyle & Travel",
    tags: ["Lifestyle", "Travel", "Outdoor"],
    location: "Goa",
    startingPrice: 18999,
    available: false,
    rating: 4.9,
    shoots: 76,
    image: photographer3,
    portfolio: [portfolio3, portfolio2, portfolio1, portfolio4],
    bio: "Golden hour, open roads, and the small things in between. Shooting honest lifestyle work across India.",
    packages: [
      { name: "Couple Shoot", description: "2 hours · 1 location · 40 edits", price: 18999 },
      { name: "Travel Day", description: "Full day · 3 locations · 80 edits", price: 34999 },
      { name: "Campaign", description: "2 days · creative direction", price: 79999 },
    ],
  },
  {
    id: "ananya-iyer",
    name: "Ananya Iyer",
    category: "Wedding & Pre-Wedding",
    tags: ["Wedding", "Pre-Wedding", "Candid"],
    location: "Delhi",
    startingPrice: 21999,
    available: true,
    rating: 4.7,
    shoots: 110,
    image: photographer4,
    portfolio: [portfolio4, portfolio1, portfolio3, portfolio2],
    bio: "Warm, story-led wedding photography with a feminine touch. I make the camera disappear so the day stays yours.",
    packages: [
      { name: "Pre-Wedding", description: "3 hours · 1 location · 50 edits", price: 21999 },
      { name: "Reception", description: "6 hours · 200 edits", price: 39999 },
      { name: "Full Wedding", description: "2 days · team of 3", price: 84999 },
    ],
  },
];

export function getPhotographer(id: string) {
  return photographers.find((p) => p.id === id);
}

// Booking flow state (in-memory)
type BookingState = {
  userName: string;
  photographerId: string | null;
  packageName: string | null;
  packagePrice: number | null;
  date: string | null;
  time: string | null;
  paymentMethod: "online" | "later" | null;
  reference: string | null;
};

let bookingState: BookingState = {
  userName: "",
  photographerId: null,
  packageName: null,
  packagePrice: null,
  date: null,
  time: null,
  paymentMethod: null,
  reference: null,
};

const listeners = new Set<() => void>();

export const booking = {
  get: () => bookingState,
  set: (partial: Partial<BookingState>) => {
    bookingState = { ...bookingState, ...partial };
    listeners.forEach((l) => l());
  },
  subscribe: (l: () => void) => {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  reset: () => {
    bookingState = {
      ...bookingState,
      photographerId: null,
      packageName: null,
      packagePrice: null,
      date: null,
      time: null,
      paymentMethod: null,
      reference: null,
    };
    listeners.forEach((l) => l());
  },
};

export function formatINR(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}
