export interface Product {
    id: string;
    name: string;
    subName: string;
    price: string;
    description: string;
    folderPath: string;
    themeColor: string;
    gradient: string;
    features: string[];
    stats: { label: string; val: string }[];
    section1: { title: string; subtitle: string };
    section2: { title: string; subtitle: string };
    section3: { title: string; subtitle: string };
    section4: { title: string; subtitle: string };
    detailsSection: { title: string; description: string; imageAlt: string };
    freshnessSection: { title: string; description: string };
    buyNowSection: {
        price: string;
        unit: string;
        processingParams: string[];
        deliveryPromise: string;
        returnPolicy: string;
    };
}

export const products: Product[] = [
    {
        id: "mango",
        name: "Cream Mango",
        subName: "Pure sunshine.",
        price: "₹120",
        description: "Rich in Vitamin C - No preservatives - 100% fruit",
        folderPath: "/images/ezgif-5127e5d4f52c97c9-jpg",
        themeColor: "#FFB74D",
        gradient: "linear-gradient(135deg, #FFD180 0%, #FFB74D 100%)",
        features: ["Rich in Vitamin C", "No preservatives", "100% fruit"],
        stats: [{ label: "Sugar", val: "0g" }, { label: "Water", val: "0%" }, { label: "Pulp", val: "100%" }],
        section1: { title: "Cream Mango.", subtitle: "Pure sunshine." },
        section2: { title: "Bursting with fresh mango.", subtitle: "Hand-picked Alphonso mangoes, perfectly ripened under the summer sun." },
        section3: { title: "Vitamin-packed refreshment.", subtitle: "A natural energy boost that revitalizes your body and mind instantly." },
        section4: { title: "Made from fruit, not concentrate.", subtitle: "" },
        detailsSection: {
            title: "The King of Fruits",
            description: "Our Cream Mango juice uses only the finest Ratnagiri Alphonso mangoes. Known for their rich sweetness and vibrant color, these mangoes are cold-pressed within hours of harvest to preserve every drop of nutrient-rich goodness. It's not just juice; it's a liquid gold experience.",
            imageAlt: "Mango Details"
        },
        freshnessSection: {
            title: "Farm to Bottle",
            description: "We believe in absolute transparency. From the orchard to the bottle, our process is designed to minimize oxidation and maximize flavor. HPP (High Pressure Processing) ensures that our juice stays safe and fresh without any heat treatment, keeping the vital enzymes and vitamins intact."
        },
        buyNowSection: {
            price: "₹120",
            unit: "per 300ml bottle",
            processingParams: ["Cold Pressed", "Never Heated", "HPP Treated"],
            deliveryPromise: "Next-day delivery available in metro cities. Chilled packaging ensures peak freshness.",
            returnPolicy: "100% Satisfaction Guarantee. Not happy? We'll replace it, no questions asked."
        }
    },
    {
        id: "chocolate",
        name: "Dutch Chocolate",
        subName: "Velvety smooth.",
        price: "₹140",
        description: "Premium Cocoa - Almond Milk base - Plant Protein",
        folderPath: "/images/chocolate",
        themeColor: "#8D6E63",
        gradient: "linear-gradient(135deg, #8D6E63 0%, #5D4037 100%)",
        features: ["Premium Cocoa", "Almond Milk", "Plant Protein"],
        stats: [{ label: "Dairy", val: "0%" }, { label: "Protein", val: "12g" }, { label: "Cocoa", val: "100%" }],
        section1: { title: "Dutch Chocolate.", subtitle: "Velvety smooth." },
        section2: { title: "Decadence redefined.", subtitle: "Rich, dark cocoa blended with creamy almond milk for a guilt-free treat." },
        section3: { title: "Plant-powered energy.", subtitle: "Loaded with natural plant protein to fuel your active lifestyle." },
        section4: { title: "Indulgence without compromise.", subtitle: "" },
        detailsSection: {
            title: "Ethically Sourced Cocoa",
            description: "We source our cocoa from sustainable farms in Ghana, ensuring fair wages and premium quality. Blended with our house-made almond milk, this drink offers a silky texture that rivals traditional dairy shakes, but with zero cholesterol and 100% plant-based goodness.",
            imageAlt: "Chocolate Details"
        },
        freshnessSection: {
            title: "Cold-Crafted Perfection",
            description: "Heat destroys delicate cocoa flavonoids. That's why we mix our Dutch Chocolate cold. Our almond milk is pressed fresh daily, never stored. The result is a clean, robust chocolate flavor that feels heavy on the tongue but light on the stomach."
        },
        buyNowSection: {
            price: "₹140",
            unit: "per 300ml bottle",
            processingParams: ["Plant Based", "Cold Blended", "Dairy Free"],
            deliveryPromise: "Shipped in insulated eco-friendly coolers. Keeps perfectly cold for 48 hours.",
            returnPolicy: "Taste the difference or get your money back."
        }
    },
    {
        id: "strawberry",
        name: "Wild Strawberry",
        subName: "Nature's candy.",
        price: "₹150",
        description: "Antioxidant Rich - No added sugar - 80% Wild Berries",
        folderPath: "/images/ezgif-2ac927a590d0b067-jpg",
        themeColor: "#FF5252",
        gradient: "linear-gradient(135deg, #FF8A80 0%, #FF5252 100%)",
        features: ["Antioxidant Rich", "No added sugar", "80% Wild Berries"],
        stats: [{ label: "Sugar", val: "2g" }, { label: "Water", val: "0%" }, { label: "Fiber", val: "100%" }],
        section1: { title: "Wild Strawberry.", subtitle: "Nature's candy." },
        section2: { title: "Forest-picked sweetness.", subtitle: "Harvested from the high-altitude forests, our strawberries are small but packed with flavor." },
        section3: { title: "The Antioxidant Powerhouse.", subtitle: "Each bottle contains over 50 crushed wild strawberries, delivering a massive dose of Vitamin C." },
        section4: { title: "Pure berry bliss.", subtitle: "" },
        detailsSection: {
            title: "The Ruby of the Forest",
            description: "Our Wild Strawberry juice is a celebration of the woods. These aren't your typical grocery store berries; these are wild-type varieties that offer a unique, slightly tart, and deeply aromatic profile that lingers on the palate. Cold-pressed to ensure every flavonoid is preserved.",
            imageAlt: "Strawberry Details"
        },
        freshnessSection: {
            title: "Berry Preservation",
            description: "Berries are delicate. Our patented 'Berry-Lock' process uses ultra-high pressure instead of heat to preserve the vibrant red color and the complex aroma that heat would otherwise destroy."
        },
        buyNowSection: {
            price: "₹150",
            unit: "per 300ml bottle",
            processingParams: ["Flash Pressed", "Bio-Active", "Zero Additives"],
            deliveryPromise: "Delivered in temperature-controlled pods within 12 hours of pressing.",
            returnPolicy: "Love the tartness or we'll send a sweeter batch for free."
        }
    }
];
