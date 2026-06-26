import { ASSETS, HERO_VIDEO } from "./assets";

export const PAGE_HEROES = {
  about: {
    title: "About Al Qibla Air Services",
    subtitle: "Your trusted travel partner for Umrah, ticketing, visas and corporate travel across Pakistan and worldwide.",
    backgroundImage: ASSETS.flyers.corporate,
    backgroundVideo: HERO_VIDEO,
  },
  services: {
    title: "Our Services",
    subtitle: "Domestic & international ticketing, Umrah packages, visas, hotels, insurance, transfers and 24/7 support.",
    backgroundImage: ASSETS.flyers.visa,
    backgroundVideo: HERO_VIDEO,
  },
  umrah: {
    title: "Umrah Packages",
    subtitle: "Economy, standard, premium and Ramadan packages with verified hotels and complete travel support.",
    backgroundImage: ASSETS.flyers.umrah,
    backgroundVideo: HERO_VIDEO,
  },
  tours: {
    title: "Tour Packages",
    subtitle: "Dubai, Turkey, Malaysia, Thailand, Azerbaijan and worldwide holiday packages.",
    backgroundImage: ASSETS.flyers.tours,
    backgroundVideo: HERO_VIDEO,
  },
  tickets: {
    title: "Available Tickets",
    subtitle: "Group flights, one-way sectors and Umrah routes — updated inventory with live seat availability.",
    backgroundImage: ASSETS.flyers.tickets,
    backgroundVideo: HERO_VIDEO,
  },
  destinations: {
    title: "Explore Destinations",
    subtitle: "Umrah, KSA/UAE groups, visas, tours and corporate travel worldwide.",
    backgroundImage: ASSETS.flyers.airfares,
    backgroundVideo: HERO_VIDEO,
  },
  corporate: {
    title: "Corporate Travel",
    subtitle: "Group travel management for NGOs, companies, schools and delegations.",
    backgroundImage: ASSETS.flyers.corporate,
    backgroundVideo: HERO_VIDEO,
  },
  gallery: {
    title: "Gallery & Flyers",
    subtitle: "Promotional posters, travel highlights and company announcements.",
    backgroundImage: ASSETS.flyers.umrah,
  },
  blog: {
    title: "Blog & Travel News",
    subtitle: "Umrah guides, ticketing tips, visa updates and company news.",
    backgroundImage: ASSETS.flyers.tickets,
    backgroundVideo: HERO_VIDEO,
  },
  contact: {
    title: "Contact Us",
    subtitle: "Peshawar head office and Islamabad branch — maps, phone and WhatsApp support.",
    backgroundImage: ASSETS.flyers.corporate,
  },
  inquiry: {
    title: "Book / Inquiry",
    subtitle: "Send your travel request — we respond quickly on WhatsApp.",
    backgroundImage: ASSETS.flyers.umrah,
    backgroundVideo: HERO_VIDEO,
  },
} as const;
