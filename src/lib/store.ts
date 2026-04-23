// Simple in-memory client-side store for booking flow state.
// This is not persisted — page refresh resets state, by design (client-only demo).

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

// High-quality free imagery via Unsplash (CDN, no key required)
const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

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
    image: u("photo-1507003211169-0a1dd7228f2d", 900),
    portfolio: [
      u("photo-1519741497674-611481863552"),
      u("photo-1511285560929-80b456fea0bc"),
      u("photo-1583939003579-730e3918a45a"),
      u("photo-1525772764200-be829a350797"),
    ],
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
    image: u("photo-1544005313-94ddf0286df2", 900),
    portfolio: [
      u("photo-1524504388940-b1c1722653e1"),
      u("photo-1488161628813-04466f872be2"),
      u("photo-1502323777036-f29e3972d82f"),
      u("photo-1438761681033-6461ffad8d80"),
    ],
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
    image: u("photo-1492562080023-ab3db95bfbce", 900),
    portfolio: [
      u("photo-1469474968028-56623f02e42e"),
      u("photo-1470770841072-f978cf4d019e"),
      u("photo-1500964757637-c85e8a162699"),
      u("photo-1504609813442-a8924e83f76e"),
    ],
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
    image: u("photo-1438761681033-6461ffad8d80", 900),
    portfolio: [
      u("photo-1606800052052-a08af7148866"),
      u("photo-1519225421980-715cb0215aed"),
      u("photo-1591604466107-ec97de577aff"),
      u("photo-1469371670807-013ccf25f16a"),
    ],
    bio: "Warm, story-led wedding photography with a feminine touch. I make the camera disappear so the day stays yours.",
    packages: [
      { name: "Pre-Wedding", description: "3 hours · 1 location · 50 edits", price: 21999 },
      { name: "Reception", description: "6 hours · 200 edits", price: 39999 },
      { name: "Full Wedding", description: "2 days · team of 3", price: 84999 },
    ],
  },
  {
    id: "rohan-kapoor",
    name: "Rohan Kapoor",
    category: "Fashion & Commercial",
    tags: ["Fashion", "Studio", "Commercial"],
    location: "Mumbai",
    startingPrice: 19999,
    available: true,
    rating: 4.8,
    shoots: 64,
    image: u("photo-1500648767791-00dcc994a43e", 900),
    portfolio: [
      u("photo-1490481651871-ab68de25d43d"),
      u("photo-1515886657613-9f3515b0c78f"),
      u("photo-1483985988355-763728e1935b"),
      u("photo-1496747611176-843222e1e57c"),
    ],
    bio: "Sharp, contemporary fashion work for brands that want to look serious without being boring.",
    packages: [
      { name: "Lookbook", description: "4 hours · studio · 40 edits", price: 19999 },
      { name: "Editorial", description: "Full day · 3 looks", price: 36999 },
      { name: "Campaign", description: "2 days · team", price: 74999 },
    ],
  },
  {
    id: "meera-nair",
    name: "Meera Nair",
    category: "Maternity & Family",
    tags: ["Maternity", "Family", "Newborn"],
    location: "Bengaluru",
    startingPrice: 14999,
    available: true,
    rating: 4.9,
    shoots: 89,
    image: u("photo-1534528741775-53994a69daeb", 900),
    portfolio: [
      u("photo-1492725764893-90b379c2b6e7"),
      u("photo-1543269865-cbf427effbad"),
      u("photo-1607746882042-944635dfe10e"),
      u("photo-1511895426328-dc8714191300"),
    ],
    bio: "Soft, honest family work shot in your space. No props, no posing — just the people you love.",
    packages: [
      { name: "Maternity", description: "2 hours · home · 40 edits", price: 14999 },
      { name: "Newborn", description: "3 hours · 50 edits", price: 19999 },
      { name: "Family Day", description: "Half day · 80 edits", price: 28999 },
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
