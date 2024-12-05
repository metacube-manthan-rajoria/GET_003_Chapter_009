// Pricing Variables
const vehiclePricing: any = {
    "TWO_WHEELER": {
        "day": 5,
        "month": 100,
        "year": 500
    },
    "THREE_WHEELER": {
        "day": 10,
        "month": 200,
        "year": 1000
    },
    "FOUR_WHEELER": {
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
    "dollar": 85
};

const pricingPlanFormats: any = {
    "day": " / Day", 
    "month": " / Month", 
    "year": " / Year"
};
// let currentCurrency: string = "$";
// let currentPlan: string = "day";
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