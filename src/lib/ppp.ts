export const PPP_DISCOUNTS: Record<string, number> = {
    'TR': 0.6, // 60% discount for Turkey
    'IN': 0.6, // 60% discount for India
    'BR': 0.5, // 50% discount for Brazil
    'ID': 0.5, // 50% discount for Indonesia
    'PH': 0.5, // 50% discount for Philippines
    'VN': 0.5, // 50% discount for Vietnam
    'EG': 0.6, // 60% discount for Egypt
    'PK': 0.6, // 60% discount for Pakistan
    'NG': 0.6, // 60% discount for Nigeria
    'BD': 0.6, // 60% discount for Bangladesh
    'RU': 0.5, // 50% discount for Russia
    'TH': 0.5, // 50% discount for Thailand
    'MX': 0.4, // 40% discount for Mexico
    'AR': 0.5, // 50% discount for Argentina
}

export const COUNTRY_NAMES: Record<string, string> = {
    'TR': 'Turkey',
    'IN': 'India',
    'BR': 'Brazil',
    'ID': 'Indonesia',
    'PH': 'Philippines',
    'VN': 'Vietnam',
    'EG': 'Egypt',
    'PK': 'Pakistan',
    'NG': 'Nigeria',
    'BD': 'Bangladesh',
    'RU': 'Russia',
    'TH': 'Thailand',
    'MX': 'Mexico',
    'AR': 'Argentina',
    'US': 'United States'
}

export function calculatePPPPrice(originalPriceCents: number, countryCode: string) {
    const discount = PPP_DISCOUNTS[countryCode] || 0

    if (discount === 0) return null

    const finalPriceCents = Math.round(originalPriceCents * (1 - discount))

    return {
        originalPrice: originalPriceCents / 100,
        finalPrice: finalPriceCents / 100,
        discountPercentage: discount * 100,
        countryName: COUNTRY_NAMES[countryCode] || countryCode
    }
}
