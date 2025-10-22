// Car Brand Logos - using carlogos.org (verified image URLs)
import React from "react";

// Default fallback icon (simple SVG)
const DefaultCarLogo = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <rect x="20" y="30" width="60" height="40" rx="5" fill="#6B7280" />
    <circle cx="30" cy="70" r="8" fill="#374151" />
    <circle cx="70" cy="70" r="8" fill="#374151" />
    <rect x="25" y="35" width="50" height="20" rx="3" fill="#9CA3AF" />
  </svg>
);

const LogoWithFallback = ({ src, alt, className, fallback }) => {
  const [hasError, setHasError] = React.useState(false);
  if (hasError) return fallback;
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
};

// Verified working carlogos.org image map
const getBrandLogoUrl = (make) => {
  const brandMap = {
    audi: "https://www.carlogos.org/car-logos/audi-logo.png",
    bmw: "https://www.carlogos.org/car-logos/bmw-logo.png",
    mercedes: "https://www.carlogos.org/car-logos/mercedes-benz-logo.png",
    "mercedes-benz": "https://www.carlogos.org/car-logos/mercedes-benz-logo.png",
    volkswagen: "https://www.carlogos.org/car-logos/volkswagen-logo.png",
    vw: "https://www.carlogos.org/car-logos/volkswagen-logo.png",
    toyota: "https://www.carlogos.org/car-logos/toyota-logo.png",
    honda: "https://www.carlogos.org/car-logos/honda-logo.png",
    nissan: "https://www.carlogos.org/car-logos/nissan-logo.png",
    mazda: "https://www.carlogos.org/car-logos/mazda-logo.png",
    mitsubishi: "https://www.carlogos.org/car-logos/mitsubishi-logo.png",
    subaru: "https://www.carlogos.org/car-logos/subaru-logo.png",
    lexus: "https://www.carlogos.org/car-logos/lexus-logo.png",
    acura: "https://www.carlogos.org/car-logos/acura-logo.png",
    infiniti: "https://www.carlogos.org/car-logos/infiniti-logo.png",
    hyundai: "https://www.carlogos.org/car-logos/hyundai-logo.png",
    kia: "https://www.carlogos.org/car-logos/kia-logo.png",
    genesis: "https://www.carlogos.org/car-logos/genesis-logo.png",
    ford: "https://www.carlogos.org/car-logos/ford-logo.png",
    chevrolet: "https://www.carlogos.org/car-logos/chevrolet-logo.png",
    chevy: "https://www.carlogos.org/car-logos/chevrolet-logo.png",
    dodge: "https://www.carlogos.org/car-logos/dodge-logo.png",
    jeep: "https://www.carlogos.org/car-logos/jeep-logo.png",
    ram: "https://www.carlogos.org/car-logos/ram-logo.png",
    tesla: "https://www.carlogos.org/car-logos/tesla-logo.png",
    lucid: "https://www.carlogos.org/car-logos/lucid-motors-logo.png",
    rivian: "https://www.carlogos.org/car-logos/rivian-logo.png",
    ferrari: "https://www.carlogos.org/car-logos/ferrari-logo.png",
    lamborghini: "https://www.carlogos.org/car-logos/lamborghini-logo.png",
    maserati: "https://www.carlogos.org/car-logos/maserati-logo.png",
    porsche: "https://www.carlogos.org/car-logos/porsche-logo.png",
    "alfa romeo": "https://www.carlogos.org/car-logos/alfa-romeo-logo.png",
    fiat: "https://www.carlogos.org/car-logos/fiat-logo.png",
    citroen: "https://www.carlogos.org/car-logos/citroen-logo.png",
    peugeot: "https://www.carlogos.org/car-logos/peugeot-logo.png",
    renault: "https://www.carlogos.org/car-logos/renault-logo.png",
    volvo: "https://www.carlogos.org/car-logos/volvo-logo.png",
    saab: "https://www.carlogos.org/car-logos/saab-logo.png",
    mini: "https://www.carlogos.org/car-logos/mini-logo.png",
    "land rover": "https://www.carlogos.org/car-logos/land-rover-logo.png",
    "range rover": "https://www.carlogos.org/car-logos/land-rover-logo.png",
    jaguar: "https://www.carlogos.org/car-logos/jaguar-logo.png",
    "aston martin": "https://www.carlogos.org/car-logos/aston-martin-logo.png",
    bentley: "https://www.carlogos.org/car-logos/bentley-logo.png",
    "rolls-royce": "https://www.carlogos.org/car-logos/rolls-royce-logo.png",
    bugatti: "https://www.carlogos.org/car-logos/bugatti-logo.png",
    mclaren: "https://www.carlogos.org/car-logos/mclaren-logo.png",
    lotus: "https://www.carlogos.org/car-logos/lotus-logo.png",
    seat: "https://www.carlogos.org/car-logos/seat-logo.png",
    skoda: "https://www.carlogos.org/car-logos/skoda-logo.png",
    opel: "https://www.carlogos.org/car-logos/opel-logo.png",
    vauxhall: "https://www.carlogos.org/car-logos/vauxhall-logo.png",
    suzuki: "https://www.carlogos.org/car-logos/suzuki-logo.png",
    dacia: "https://www.carlogos.org/car-logos/dacia-logo.png",
    smart: "https://www.carlogos.org/car-logos/smart-logo.png",
  };

  const normalized = make.toLowerCase().trim();
  const found = brandMap[normalized];
  if (found) return found;

  const entry = Object.entries(brandMap).find(([key]) =>
    normalized.includes(key)
  );
  return entry ? entry[1] : undefined;
};

export const getCarLogoComponent = (make, className = "w-[40px] h-[40px]") => {
  if (!make) return <DefaultCarLogo className={className} />;

  const logoUrl = getBrandLogoUrl(make);
  if (logoUrl) {
    return (
      <LogoWithFallback
        src={logoUrl}
        alt={`${make} logo`}
        className={`${className} object-contain w-[40px] h-[40px]`}
        style={{ aspectRatio: 'auto' }}
        fallback={<DefaultCarLogo className={className} />}
      />
    );
  }

  return <DefaultCarLogo className={className} />;
};
