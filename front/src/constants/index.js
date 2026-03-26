const navLinks = [
  {
    id: 1,
    name: "Members",
    type: "Members",
  },
  {
    id: 3,
    name: "Events",
    type: "Events",
  },
  {
    id: 4,
    name: "Achievements",
    type: "Achievements",
  },
];

const navIcons = [
  {
    id: 1,
    img: "/icons/wifi.svg",
  },
  {
    id: 2,
    img: "/icons/search.svg",
  },
  {
    id: 3,
    img: "/icons/mode.svg",
  },
];

const dockApps = [
  {
    id: "finder",
    name: "Members",
    icon: "finder.png",
    canOpen: true,
  },
  {
    id: "safari",
    name: "About Us",
    icon: "safari.png",
    canOpen: true,
  },
  {
    id: "achievements",
    name: "Achievements",
    icon: "photos.png",
    canOpen: true,
  },
  {
    id: "contact",
    name: "Contact",
    icon: "contact.png",
    canOpen: true,
  },
  {
    id: "events",
    name: "Events",
    icon: "events.png",
    canOpen: true,
  },
];

const links = [
  {
    label: "Discord",
    url: "https://discord.gg/TZ58u3XHyn",
    color: "#5865f2",
    bg: "rgba(88,101,242,0.15)",
    border: "rgba(88,101,242,0.3)",
    icon: "/icons/discord.svg"
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com/official.voidwalkers/",
    color: "#e1306c",
    bg: "rgba(225,48,108,0.15)",
    border: "rgba(225,48,108,0.3)",
    icon: "/icons/instagram.svg"
  },
  {
    label: "X",
    url: "https://x.com/WalkerVoid58594",
    color: "#ffffff",
    bg: "rgba(255,255,255,0.1)",
    border: "rgba(255,255,255,0.2)",
    icon: "/icons/twitter.svg"
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/company/void-walkers/",
    color: "#0A66C2",
    bg: "rgba(10,102,194,0.15)",
    border: "rgba(10,102,194,0.3)",
    icon: "/icons/linkedin.svg"
  },
  {
    label: "Github",
    url: "https://github.com/Void-Walkers-Community",
    color: "#333333",
    bg: "rgba(51,51,51,0.15)",
    border: "rgba(51,51,51,0.3)",
    icon: "/icons/github.svg"
  },
  {
    label: "WhatsApp",
    url: "https://wa.me/919163709777",
    icon: "/icons/whatsapp.svg",
    bg: "rgba(48,209,88,0.15)",
    border: "rgba(48,209,88,0.2)"
  },
];


export {
  navLinks,
  navIcons,
  dockApps,
  links,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
  finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  achievements: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  events: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };