const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "public", "assets");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeSvg(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content);
}

function gradientSvg(label, sublabel = "", colors = ["#0A1628", "#132238"]) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors[0]}"/>
      <stop offset="100%" style="stop-color:${colors[1]}"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#g)"/>
  <rect x="40" y="40" width="720" height="520" fill="none" stroke="#C9A227" stroke-width="2" opacity="0.5"/>
  <text x="400" y="290" text-anchor="middle" fill="#C9A227" font-family="Georgia,serif" font-size="36" font-weight="bold">${label}</text>
  ${sublabel ? `<text x="400" y="340" text-anchor="middle" fill="#E8D48B" font-family="Arial,sans-serif" font-size="18">${sublabel}</text>` : ""}
  <text x="400" y="560" text-anchor="middle" fill="#ffffff" font-family="Arial,sans-serif" font-size="14" opacity="0.5">Al Qibla Air Services</text>
</svg>`;
}

function airlineSvg(code, name) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
  <rect width="120" height="120" rx="12" fill="#0A1628"/>
  <text x="60" y="55" text-anchor="middle" fill="#C9A227" font-family="Arial,sans-serif" font-size="28" font-weight="bold">${code}</text>
  <text x="60" y="80" text-anchor="middle" fill="#E8D48B" font-family="Arial,sans-serif" font-size="10">${name}</text>
</svg>`;
}

function logoSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="95" fill="#0A1628" stroke="#C9A227" stroke-width="3"/>
  <path d="M100 45 L130 95 L115 95 L125 140 L100 115 L75 140 L85 95 L70 95 Z" fill="#C9A227"/>
  <text x="100" y="175" text-anchor="middle" fill="#E8D48B" font-family="Georgia,serif" font-size="12" font-weight="bold">AL QIBLA</text>
</svg>`;
}

// Logo
writeSvg(path.join(root, "logo", "logo.svg"), logoSvg());

// Hero poster
writeSvg(path.join(root, "gallery", "hero-poster.svg"), gradientSvg("Your Journey Begins Here", "Umrah · Group Tickets · Corporate Travel", ["#0A1628", "#1a3a5c"]));

// Flyers
const flyers = [
  ["flyer-1.svg", "Umrah Special 2026", "Packages from PKR 285,000"],
  ["flyer-2.svg", "Group Tickets", "ISB-JED · LHE-DXB · KHI-SHJ"],
  ["flyer-3.svg", "Corporate Travel", "NGO & Company Solutions"],
  ["flyer-4.svg", "Summer Tours", "Dubai · Turkey · Malaysia"],
];
flyers.forEach(([file, title, sub]) => writeSvg(path.join(root, "flyers", file), gradientSvg(title, sub)));

// Gallery
const gallery = [
  ["gallery-1.svg", "Umrah Journey"],
  ["gallery-2.svg", "Dubai Skyline"],
  ["gallery-3.svg", "Airport Departure"],
  ["gallery-4.svg", "Madinah"],
  ["gallery-5.svg", "Travel Group"],
  ["gallery-6.svg", "Istanbul"],
  ["gallery-7.svg", "Corporate Travel"],
  ["gallery-8.svg", "Pilgrims"],
  ["gallery-9.svg", "Airline Partners"],
  ["umrah-1.svg", "Economy Umrah"],
  ["umrah-2.svg", "Premium Umrah"],
  ["umrah-3.svg", "Ramadan Umrah"],
  ["umrah-4.svg", "Family Umrah"],
  ["umrah-5.svg", "Executive Umrah"],
  ["tour-1.svg", "Dubai Tour"],
  ["tour-2.svg", "Turkey Tour"],
  ["tour-3.svg", "Malaysia Tour"],
  ["tour-4.svg", "Northern Pakistan"],
  ["dest-jeddah.svg", "Jeddah"],
  ["dest-madinah.svg", "Madinah"],
  ["dest-dubai.svg", "Dubai"],
  ["dest-istanbul.svg", "Istanbul"],
  ["dest-london.svg", "London"],
  ["dest-doha.svg", "Doha"],
  ["dest-baku.svg", "Baku"],
  ["dest-kl.svg", "Kuala Lumpur"],
  ["blog-1.svg", "Ramadan Umrah Guide"],
  ["blog-2.svg", "Group Ticket Tips"],
  ["blog-3.svg", "Corporate Travel"],
];
gallery.forEach(([file, title]) => writeSvg(path.join(root, "gallery", file), gradientSvg(title, "Al Qibla Air Services")));

// Airlines
const airlineList = [
  ["pk.svg", "PK", "PIA"],
  ["pa.svg", "PA", "Airblue"],
  ["pf.svg", "PF", "AirSial"],
  ["9p.svg", "9P", "Fly Jinnah"],
  ["er.svg", "ER", "Serene"],
  ["ek.svg", "EK", "Emirates"],
  ["ey.svg", "EY", "Etihad"],
  ["fz.svg", "FZ", "Flydubai"],
  ["g9.svg", "G9", "Air Arabia"],
  ["qr.svg", "QR", "Qatar"],
  ["sv.svg", "SV", "Saudia"],
  ["xy.svg", "XY", "Flynas"],
  ["f3.svg", "F3", "Flyadeal"],
  ["wy.svg", "WY", "Oman Air"],
  ["ov.svg", "OV", "SalamAir"],
  ["ku.svg", "KU", "Kuwait"],
  ["j9.svg", "J9", "Jazeera"],
  ["gf.svg", "GF", "Gulf Air"],
  ["tk.svg", "TK", "Turkish"],
  ["pc.svg", "PC", "Pegasus"],
  ["ba.svg", "BA", "British"],
  ["vs.svg", "VS", "Virgin"],
  ["ca.svg", "CA", "Air China"],
  ["cz.svg", "CZ", "China S."],
  ["od.svg", "OD", "Batik"],
  ["tg.svg", "TG", "Thai"],
  ["ul.svg", "UL", "SriLankan"],
  ["hy.svg", "HY", "Uzbekistan"],
  ["kc.svg", "KC", "Astana"],
  ["fs.svg", "FS", "FlyArystan"],
  ["j2.svg", "J2", "AZAL"],
  ["lh.svg", "LH", "Lufthansa"],
  ["et.svg", "ET", "Ethiopian"],
];
airlineList.forEach(([file, code, name]) => writeSvg(path.join(root, "airlines", file), airlineSvg(code, name)));

console.log("Assets generated successfully!");
