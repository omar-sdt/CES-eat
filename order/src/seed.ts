import mongoose from 'mongoose';
import {Restaurant} from "./models/restaurant";
import {Dish} from "./models/dishes";
import {connectDB} from "./lib/mongo";

const categories = [
    "Hamburger", "Frites", "Pizza", "Viande", "Asiatique", "Poisson", "Petit-déjeuner",
    "Salade", "Sushi / Maki", "Poulet", "Café", "Végétarien", "Halal", "Promotions"
];

const restaurantData = [
    {
        name: "Burger Palace",
        description: "Les meilleurs burgers de la ville",
        address: "123 Rue du Grill",
        imageUrl: "https://source.unsplash.com/400x300/?burger,restaurant",
        categories: ["Hamburger", "Frites", "Halal", "Promotions"]
    },
    {
        name: "Sushi Zen",
        description: "Spécialités japonaises et makis",
        address: "456 Rue du Japon",
        imageUrl: "https://source.unsplash.com/400x300/?sushi,restaurant",
        categories: ["Sushi / Maki", "Poisson", "Asiatique"]
    },
    {
        name: "Morning Café",
        description: "Idéal pour les petits-déjeuners",
        address: "789 Rue du Matin",
        imageUrl: "https://source.unsplash.com/400x300/?coffee,croissant",
        categories: ["Petit-déjeuner", "Café", "Végétarien"]
    },
    {
        name: "Pizza Napoli",
        description: "Pizzas au feu de bois comme en Italie",
        address: "12 Rue de Rome",
        imageUrl: "https://source.unsplash.com/400x300/?pizza,restaurant",
        categories: ["Pizza", "Végétarien", "Halal"]
    },
    {
        name: "Asian Delight",
        description: "Cuisine fusion asiatique",
        address: "88 Avenue du Dragon",
        imageUrl: "https://source.unsplash.com/400x300/?asian,food",
        categories: ["Asiatique", "Poisson", "Poulet"]
    },
    {
        name: "Green Bowl",
        description: "Salades et plats healthy",
        address: "21 Rue Bio",
        imageUrl: "https://source.unsplash.com/400x300/?salad,healthy",
        categories: ["Salade", "Végétarien", "Promotions"]
    },
    {
        name: "Le Boucher",
        description: "Les meilleures viandes grillées",
        address: "4 Rue de la Côte",
        imageUrl: "https://source.unsplash.com/400x300/?steak,meat",
        categories: ["Viande", "Halal"]
    },
    {
        name: "Fish'n Co",
        description: "Poissons et fruits de mer",
        address: "9 Quai de l’Océan",
        imageUrl: "https://source.unsplash.com/400x300/?fish,seafood",
        categories: ["Poisson"]
    },
    {
        name: "Poulet Doré",
        description: "Spécialiste du poulet rôti et frit",
        address: "33 Rue Croustillante",
        imageUrl: "https://source.unsplash.com/400x300/?fried-chicken",
        categories: ["Poulet", "Halal"]
    },
    {
        name: "La Pause Café",
        description: "Café, pâtisseries et détente",
        address: "77 Avenue Chill",
        imageUrl: "https://source.unsplash.com/400x300/?coffee,shop",
        categories: ["Café", "Petit-déjeuner", "Végétarien"]
    }
];

const dishesPerRestaurant = {
    "Burger Palace": [
        { name: "Burger Classic", description: "Pain, steak, fromage", price: 9.99, imageUrl: "https://source.unsplash.com/400x300/?burger", tags: ["Hamburger", "Halal"] },
        { name: "Frites maison", description: "Frites croustillantes", price: 3.5, imageUrl: "https://source.unsplash.com/400x300/?fries", tags: ["Frites"] },
        { name: "Burger Double", description: "Double steak", price: 12.5, imageUrl: "https://source.unsplash.com/400x300/?double-burger", tags: ["Hamburger"] }
    ],
    "Sushi Zen": [
        { name: "Maki Saumon", description: "Riz, saumon, algue", price: 6.99, imageUrl: "https://source.unsplash.com/400x300/?sushi", tags: ["Sushi / Maki", "Poisson"] },
        { name: "Yakitori Poulet", description: "Brochettes de poulet grillé", price: 5.5, imageUrl: "https://source.unsplash.com/400x300/?yakitori", tags: ["Poulet"] },
        { name: "Sashimi Mix", description: "Assortiment frais", price: 11.5, imageUrl: "https://source.unsplash.com/400x300/?sashimi", tags: ["Poisson"] }
    ],
    "Morning Café": [
        { name: "Croissant", description: "Pur beurre", price: 1.2, imageUrl: "https://source.unsplash.com/400x300/?croissant", tags: ["Petit-déjeuner"] },
        { name: "Café Latte", description: "Expresso et lait", price: 2.5, imageUrl: "https://source.unsplash.com/400x300/?latte", tags: ["Café"] }
    ],
    "Pizza Napoli": [
        { name: "Pizza Margherita", description: "Classique italienne", price: 8.5, imageUrl: "https://source.unsplash.com/400x300/?margherita", tags: ["Pizza", "Végétarien"] },
        { name: "Pizza 4 fromages", description: "Gourmande", price: 9.5, imageUrl: "https://source.unsplash.com/400x300/?cheese-pizza", tags: ["Pizza", "Végétarien"] }
    ],
    "Asian Delight": [
        { name: "Pad Thaï", description: "Nouilles sautées", price: 7.9, imageUrl: "https://source.unsplash.com/400x300/?padthai", tags: ["Asiatique"] },
        { name: "Riz cantonais", description: "Riz sauté œufs-légumes", price: 6.5, imageUrl: "https://source.unsplash.com/400x300/?fried-rice", tags: ["Asiatique", "Végétarien"] }
    ],
    "Green Bowl": [
        { name: "Bowl quinoa-avocat", description: "Fraîcheur garantie", price: 7.2, imageUrl: "https://source.unsplash.com/400x300/?quinoa", tags: ["Salade", "Végétarien"] },
        { name: "Salade César", description: "Classique revisitée", price: 6.9, imageUrl: "https://source.unsplash.com/400x300/?caesar-salad", tags: ["Salade", "Poulet"] }
    ],
    "Le Boucher": [
        { name: "Côte de bœuf", description: "Viande maturée", price: 19.9, imageUrl: "https://source.unsplash.com/400x300/?steak", tags: ["Viande"] },
        { name: "Brochette mixte", description: "Agneau et bœuf", price: 14.5, imageUrl: "https://source.unsplash.com/400x300/?meat-skewers", tags: ["Viande", "Halal"] }
    ],
    "Fish'n Co": [
        { name: "Fish & Chips", description: "Poisson pané + frites", price: 9.5, imageUrl: "https://source.unsplash.com/400x300/?fish-chips", tags: ["Poisson", "Frites"] },
        { name: "Saumon grillé", description: "Filet de saumon", price: 11.5, imageUrl: "https://source.unsplash.com/400x300/?grilled-salmon", tags: ["Poisson"] }
    ],
    "Poulet Doré": [
        { name: "Poulet rôti", description: "Classique", price: 8.0, imageUrl: "https://source.unsplash.com/400x300/?roast-chicken", tags: ["Poulet"] },
        { name: "Tenders frits", description: "Croustillant", price: 6.5, imageUrl: "https://source.unsplash.com/400x300/?chicken-tenders", tags: ["Poulet"] }
    ],
    "La Pause Café": [
        { name: "Cappuccino", description: "Onctueux", price: 2.8, imageUrl: "https://source.unsplash.com/400x300/?cappuccino", tags: ["Café"] },
        { name: "Muffin choco", description: "Moelleux et gourmand", price: 2.0, imageUrl: "https://source.unsplash.com/400x300/?chocolate-muffin", tags: ["Petit-déjeuner"] }
    ]
};

async function seed() {
    await connectDB();

    await Restaurant.deleteMany({});
    await Dish.deleteMany({});

    for (const restData of restaurantData) {
        const restaurant = await Restaurant.create(restData);
        const dishes = dishesPerRestaurant[restData.name] || [];

        for (const dish of dishes) {
            await Dish.create({
                ...dish,
                restaurantId: restaurant._id
            });
        }
    }

    console.log("✅ Base de données seedée avec succès !");
    await mongoose.disconnect();
}

seed().catch(console.error);