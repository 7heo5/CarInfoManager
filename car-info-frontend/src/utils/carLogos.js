// Car logo mapping for different makes
export const getCarLogo = (make) => {
  const logoMap = {
    // German brands
    'BMW': '🔵',
    'Mercedes': '⭐',
    'Mercedes-Benz': '⭐',
    'Audi': '🔴',
    'Volkswagen': '🔷',
    'VW': '🔷',
    'Porsche': '🏁',
    
    // Japanese brands
    'Toyota': '🔶',
    'Honda': '🔸',
    'Nissan': '🔹',
    'Mazda': '🔺',
    'Subaru': '⭐',
    'Mitsubishi': '🔻',
    'Lexus': '💎',
    'Infiniti': '💠',
    'Acura': '🔸',
    
    // American brands
    'Ford': '🔵',
    'Chevrolet': '🔴',
    'Chevy': '🔴',
    'Cadillac': '👑',
    'Buick': '🔷',
    'GMC': '🔶',
    'Dodge': '⚡',
    'Chrysler': '🔸',
    'Jeep': '🚙',
    'Ram': '🐏',
    'Tesla': '⚡',
    
    // European brands
    'Volvo': '🔷',
    'Saab': '🔸',
    'Fiat': '🔴',
    'Alfa Romeo': '🔴',
    'Ferrari': '🏎️',
    'Lamborghini': '🐂',
    'Maserati': '🔷',
    'Bentley': '👑',
    'Rolls-Royce': '👑',
    'Jaguar': '🐆',
    'Land Rover': '🏔️',
    'Mini': '🔴',
    
    // Korean brands
    'Hyundai': '🔶',
    'Kia': '🔸',
    'Genesis': '💎',
    
    // Chinese brands
    'BYD': '🔷',
    'Geely': '🔸',
    'Great Wall': '🏔️',
    
    // Default fallback
    'default': '🚗'
  };
  
  // Normalize the make name for better matching
  const normalizedMake = make?.toLowerCase().trim();
  const exactMatch = Object.keys(logoMap).find(key => 
    key.toLowerCase() === normalizedMake
  );
  
  if (exactMatch) {
    return logoMap[exactMatch];
  }
  
  // Try partial matching for common variations
  if (normalizedMake?.includes('mercedes')) return logoMap['Mercedes'];
  if (normalizedMake?.includes('volkswagen') || normalizedMake?.includes('vw')) return logoMap['Volkswagen'];
  if (normalizedMake?.includes('chevrolet') || normalizedMake?.includes('chevy')) return logoMap['Chevrolet'];
  if (normalizedMake?.includes('land rover')) return logoMap['Land Rover'];
  if (normalizedMake?.includes('alfa romeo')) return logoMap['Alfa Romeo'];
  if (normalizedMake?.includes('rolls royce')) return logoMap['Rolls-Royce'];
  
  return logoMap['default'];
};

export const getCarLogoColor = (make) => {
  const colorMap = {
    'BMW': 'text-blue-500',
    'Mercedes': 'text-silver-500',
    'Mercedes-Benz': 'text-silver-500',
    'Audi': 'text-red-500',
    'Volkswagen': 'text-blue-600',
    'VW': 'text-blue-600',
    'Porsche': 'text-red-600',
    'Toyota': 'text-red-500',
    'Honda': 'text-red-500',
    'Nissan': 'text-red-500',
    'Mazda': 'text-red-500',
    'Subaru': 'text-blue-500',
    'Mitsubishi': 'text-red-500',
    'Lexus': 'text-gray-500',
    'Infiniti': 'text-blue-500',
    'Acura': 'text-red-500',
    'Ford': 'text-blue-500',
    'Chevrolet': 'text-red-500',
    'Chevy': 'text-red-500',
    'Cadillac': 'text-gray-500',
    'Buick': 'text-blue-500',
    'GMC': 'text-red-500',
    'Dodge': 'text-red-500',
    'Chrysler': 'text-blue-500',
    'Jeep': 'text-green-500',
    'Ram': 'text-gray-500',
    'Tesla': 'text-red-500',
    'Volvo': 'text-blue-500',
    'Saab': 'text-blue-500',
    'Fiat': 'text-red-500',
    'Alfa Romeo': 'text-red-500',
    'Ferrari': 'text-red-500',
    'Lamborghini': 'text-yellow-500',
    'Maserati': 'text-blue-500',
    'Bentley': 'text-gray-500',
    'Rolls-Royce': 'text-gray-500',
    'Jaguar': 'text-green-500',
    'Land Rover': 'text-green-500',
    'Mini': 'text-red-500',
    'Hyundai': 'text-blue-500',
    'Kia': 'text-red-500',
    'Genesis': 'text-gray-500',
    'BYD': 'text-blue-500',
    'Geely': 'text-blue-500',
    'Great Wall': 'text-gray-500',
    'default': 'text-primary'
  };
  
  const normalizedMake = make?.toLowerCase().trim();
  const exactMatch = Object.keys(colorMap).find(key => 
    key.toLowerCase() === normalizedMake
  );
  
  if (exactMatch) {
    return colorMap[exactMatch];
  }
  
  // Try partial matching
  if (normalizedMake?.includes('mercedes')) return colorMap['Mercedes'];
  if (normalizedMake?.includes('volkswagen') || normalizedMake?.includes('vw')) return colorMap['Volkswagen'];
  if (normalizedMake?.includes('chevrolet') || normalizedMake?.includes('chevy')) return colorMap['Chevrolet'];
  if (normalizedMake?.includes('land rover')) return colorMap['Land Rover'];
  if (normalizedMake?.includes('alfa romeo')) return colorMap['Alfa Romeo'];
  if (normalizedMake?.includes('rolls royce')) return colorMap['Rolls-Royce'];
  
  return colorMap['default'];
};
