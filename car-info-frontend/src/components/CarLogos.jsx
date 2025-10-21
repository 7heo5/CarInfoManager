// Authentic Car Brand Logos - Using reliable logo service
import React from 'react';

// Default car logo fallback
const DefaultCarLogo = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <rect x="20" y="30" width="60" height="40" rx="5" fill="#6B7280"/>
    <circle cx="30" cy="70" r="8" fill="#374151"/>
    <circle cx="70" cy="70" r="8" fill="#374151"/>
    <rect x="25" y="35" width="50" height="20" rx="3" fill="#9CA3AF"/>
  </svg>
);

// Logo component with error handling
const LogoWithFallback = ({ src, alt, className, fallback }) => {
  const [hasError, setHasError] = React.useState(false);
  
  if (hasError) {
    return fallback;
  }
  
  return (
    <img 
      src={src} 
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
};

// Brand logo mapping with authentic sources
const getBrandLogoUrl = (make) => {
  const brandMap = {
    'bmw': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/120px-BMW.svg.png',
    'mercedes': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/120px-Mercedes-Logo.svg.png',
    'mercedes-benz': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/120px-Mercedes-Logo.svg.png',
    'audi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/120px-Audi-Logo_2016.svg.png',
    'toyota': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Toyota.svg/120px-Toyota.svg.png',
    'honda': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Honda.svg/120px-Honda.svg.png',
    'ford': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_logo_flat.svg/120px-Ford_logo_flat.svg.png',
    'chevrolet': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Chevrolet_logo.svg/120px-Chevrolet_logo.svg.png',
    'chevy': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Chevrolet_logo.svg/120px-Chevrolet_logo.svg.png',
    'tesla': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Tesla_T_symbol.svg/120px-Tesla_T_symbol.svg.png',
    'nissan': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Nissan_logo.svg/120px-Nissan_logo.svg.png',
    'volkswagen': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Volkswagen_logo_2019.svg/120px-Volkswagen_logo_2019.svg.png',
    'vw': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Volkswagen_logo_2019.svg/120px-Volkswagen_logo_2019.svg.png',
    'porsche': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Porsche_logo.svg/120px-Porsche_logo.svg.png',
    'ferrari': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Ferrari-Logo.svg/120px-Ferrari-Logo.svg.png',
    'lexus': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Lexus_logo.svg/120px-Lexus_logo.svg.png',
  };
  
  return brandMap[make.toLowerCase().trim()];
};

// Main logo component function
export const getCarLogoComponent = (make, className = "w-8 h-8") => {
  if (!make) return <DefaultCarLogo className={className} />;
  
  const normalizedMake = make.toLowerCase().trim();
  const logoUrl = getBrandLogoUrl(normalizedMake);
  
  if (logoUrl) {
    return (
      <LogoWithFallback
        src={logoUrl}
        alt={`${make} logo`}
        className={className}
        fallback={<DefaultCarLogo className={className} />}
      />
    );
  }
  
  // Try partial matching for common variations
  if (normalizedMake.includes('mercedes')) {
    const logoUrl = getBrandLogoUrl('mercedes');
    return (
      <LogoWithFallback
        src={logoUrl}
        alt={`${make} logo`}
        className={className}
        fallback={<DefaultCarLogo className={className} />}
      />
    );
  }
  
  if (normalizedMake.includes('volkswagen') || normalizedMake.includes('vw')) {
    const logoUrl = getBrandLogoUrl('volkswagen');
    return (
      <LogoWithFallback
        src={logoUrl}
        alt={`${make} logo`}
        className={className}
        fallback={<DefaultCarLogo className={className} />}
      />
    );
  }
  
  if (normalizedMake.includes('chevrolet') || normalizedMake.includes('chevy')) {
    const logoUrl = getBrandLogoUrl('chevrolet');
    return (
      <LogoWithFallback
        src={logoUrl}
        alt={`${make} logo`}
        className={className}
        fallback={<DefaultCarLogo className={className} />}
      />
    );
  }
  
  return <DefaultCarLogo className={className} />;
};