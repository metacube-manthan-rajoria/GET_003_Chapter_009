// Pricing Variables
const vehiclePricing: any = {
    "two-wheeler": {
        "day": 5,
        "month": 100,
        "year": 500
    },
    "three-wheeler": {
        "day": 10,
        "month": 200,
        "year": 1000
    },
    "four-wheeler": {
        "day": 20,
        "month": 500,
        "year": 3500
    }
};

const currencySymbol: any = {
    "rupees": "₹",
    "yen": "¥",
    "dollar": "$"
};

const currencyConversionRatio: any = {
    "rupees": 1,
    "yen": 1/1.77,
    "dollar": 85,
    "none": 85
};

const pricingPlanFormats: any = {
    "day": " / Day", 
    "month": " / Month", 
    "year": " / Year"
};

function getVehiclePricing(vehicleType: string, planType: string): number{
    return vehiclePricing[vehicleType][planType]??=0;
}

function getCurrencySymbol(input: string): string {
    let value = currencySymbol[input]
    return value??="$";
}

function getCurrencyConversionRatio(input: string): number {
    let value = currencyConversionRatio[input]
    return value??=1;
}

function getPricingPlanFormat(input: string): string {
    let value = pricingPlanFormats[input]
    return value??=" / Day";
}

export {getVehiclePricing, getCurrencySymbol, getCurrencyConversionRatio, getPricingPlanFormat};