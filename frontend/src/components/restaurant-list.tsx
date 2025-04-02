import RestaurantItem from './restaurant-item';

const restaurants = [
    { id: "1", name: "KFC Quetigny", address: "10 Rue de Paris", rating: 4.5, src: "/restaurant/kfc.svg", alt: "KFC Quetigny" },
    { id: "2", name: "La Pizzeria", address: "5 Rue de Lyon", rating: 3.8, src: "/restaurant/kfc.svg", alt: "La Pizzeria" },
    { id: "3", name: "Sushi Bar", address: "12 Avenue de Tokyo", rating: 4.2, src: "/restaurant/kfc.svg", alt: "Sushi Bar" },
    { id: "4", name: "Burger Town", address: "99 Boulevard du Fast Food", rating: 4.7, src: "/restaurant/kfc.svg", alt: "Burger Town" },
    { id: "5", name: "Tacos Avenue", address: "7 Place du Marché", rating: 4.1, src: "/restaurant/kfc.svg", alt: "Tacos Avenue" },
    { id: "6", name: "Le Gourmet", address: "22 Rue des Saveurs", rating: 4.9, src: "/restaurant/kfc.svg", alt: "Le Gourmet" },
    { id: "7", name: "Bistrot Parisien", address: "45 Rue de Rivoli", rating: 4.3, src: "/restaurant/kfc.svg", alt: "Bistrot Parisien" },
    { id: "8", name: "Chez Luigi", address: "8 Rue d'Italie", rating: 4.5, src: "/restaurant/kfc.svg", alt: "Chez Luigi" },
    { id: "9", name: "Vegan Spot", address: "30 Rue Verte", rating: 4.6, src: "/restaurant/kfc.svg", alt: "Vegan Spot" },
    { id: "10", name: "Le Petit Boulanger", address: "3 Rue du Pain", rating: 4.2, src: "/restaurant/kfc.svg", alt: "Le Petit Boulanger" },
    { id: "11", name: "Fish & Chips", address: "19 Quai des Marins", rating: 4.0, src: "/restaurant/kfc.svg", alt: "Fish & Chips" },
    { id: "12", name: "Buffet Royal", address: "55 Avenue des Banquets", rating: 4.7, src: "/restaurant/kfc.svg", alt: "Buffet Royal" },
    { id: "13", name: "Le Bistro Chic", address: "28 Rue des Étoiles", rating: 4.3, src: "/restaurant/kfc.svg", alt: "Le Bistro Chic" },
    { id: "14", name: "Chez Mamie", address: "17 Rue du Bonheur", rating: 4.8, src: "/restaurant/kfc.svg", alt: "Chez Mamie" },
    { id: "15", name: "La Cantine Bio", address: "14 Rue de la Nature", rating: 4.5, src: "/restaurant/kfc.svg", alt: "La Cantine Bio" },
    { id: "16", name: "Steakhouse 22", address: "22 Avenue du Grill", rating: 4.6, src: "/restaurant/kfc.svg", alt: "Steakhouse 22" },
    { id: "17", name: "Ramen Tokyo", address: "8 Rue du Japon", rating: 4.7, src: "/restaurant/kfc.svg", alt: "Ramen Tokyo" },
    { id: "18", name: "Curry Express", address: "26 Avenue de Bombay", rating: 4.3, src: "/restaurant/kfc.svg", alt: "Curry Express" },
    { id: "19", name: "Pizza Napoli", address: "31 Rue de Rome", rating: 4.5, src: "/restaurant/kfc.svg", alt: "Pizza Napoli" },
    { id: "20", name: "Grill & Chill", address: "44 Rue du Barbecue", rating: 4.1, src: "/restaurant/kfc.svg", alt: "Grill & Chill" },
    { id: "21", name: "Le Sushi Lounge", address: "12 Rue des Poissons", rating: 4.8, src: "/restaurant/kfc.svg", alt: "Le Sushi Lounge" },
    { id: "22", name: "Wok & Roll", address: "6 Avenue de Pékin", rating: 4.4, src: "/restaurant/kfc.svg", alt: "Wok & Roll" },
    { id: "23", name: "Chez Pierre", address: "9 Place de la Fontaine", rating: 4.2, src: "/restaurant/kfc.svg", alt: "Chez Pierre" },
    { id: "24", name: "Le Coin Thaï", address: "13 Rue de Bangkok", rating: 4.6, src: "/restaurant/kfc.svg", alt: "Le Coin Thaï" },
    { id: "25", name: "Taverne Médiévale", address: "5 Rue du Château", rating: 4.9, src: "/restaurant/kfc.svg", alt: "Taverne Médiévale" },
    { id: "26", name: "Le Bar à Pâtes", address: "27 Rue de Milan", rating: 4.2, src: "/restaurant/kfc.svg", alt: "Le Bar à Pâtes" },
    { id: "27", name: "Gaufres & Délices", address: "32 Rue du Dessert", rating: 4.5, src: "/restaurant/kfc.svg", alt: "Gaufres & Délices" },
    { id: "28", name: "Tortilla Mexicana", address: "15 Avenue du Chili", rating: 4.3, src: "/restaurant/kfc.svg", alt: "Tortilla Mexicana" },
    { id: "29", name: "Brunch Factory", address: "10 Rue du Matin", rating: 4.7, src: "/restaurant/kfc.svg", alt: "Brunch Factory" },
    { id: "30", name: "Coffee & Cake", address: "8 Place du Café", rating: 4.2, src: "/restaurant/kfc.svg", alt: "Coffee & Cake" },
    { id: "31", name: "Poke Bowl House", address: "24 Rue des Tropiques", rating: 4.6, src: "/restaurant/kfc.svg", alt: "Poke Bowl House" },
    { id: "32", name: "Fusion Kitchen", address: "33 Avenue de la Fusion", rating: 4.4, src: "/restaurant/kfc.svg", alt: "Fusion Kitchen" },
    { id: "33", name: "L'Épicerie Fine", address: "18 Rue Gourmande", rating: 4.3, src: "/restaurant/kfc.svg", alt: "L'Épicerie Fine" },
    { id: "34", name: "The Vegan Bistro", address: "20 Avenue Verte", rating: 4.8, src: "/restaurant/kfc.svg", alt: "The Vegan Bistro" },
];

const RestaurantList = () => {
    return (
        <div className='flex flex-wrap gap-4'>
            {restaurants.map((resto) => (
                <RestaurantItem key={resto.id} resto={resto} />
            ))}
        </div >
    );
};

export default RestaurantList;
