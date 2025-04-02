"use client";

import SponsorshipSection from "@/components/sponsorship-section";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const filters = [
    { src: "/food-filter/hamburger.svg", title: "Hamburger", value: "hamburger" },
    { src: "/food-filter/frites.svg", title: "Frites", value: "frites" },
    { src: "/food-filter/pizza.svg", title: "Pizza", value: "pizza" },
    { src: "/food-filter/viande.svg", title: "Viande", value: "viande" },
    { src: "/food-filter/asiatique.svg", title: "Asiatique", value: "asiatique" },
    { src: "/food-filter/poisson.svg", title: "Poisson", value: "poisson" },
    { src: "/food-filter/croissant.svg", title: "Petit-déjeuner", value: "petit-dejeuner" },
    { src: "/food-filter/salade.svg", title: "Salade", value: "salade" },
    { src: "/food-filter/sushi.svg", title: "Sushi / Maki", value: "sushi" },
    { src: "/food-filter/poulet.svg", title: "Poulet", value: "poulet" },
    { src: "/food-filter/cafe.svg", title: "Café", value: "cafe" },
];

const Home = () => {
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

    return (
        <div className="w-full max-w-7xl mx-auto p-4 flex flex-col items-center">
            <div className="w-full flex flex-col gap-2">
                {/* Container scrollable */}
                <div className="flex space-x-4 overflow-x-auto scrollbar-hide whitespace-nowrap w-full py-2">
                    {filters.map((filter) => {
                        const isSelected = selectedFilter === filter.value;
                        return (
                            <div
                                key={filter.value}
                                className={`group flex flex-col items-center p-2 rounded-lg cursor-pointer transition-transform duration-300 ease-in-out 
                                ${isSelected ? "scale-115" : "hover:scale-115"}`}
                                onClick={() => setSelectedFilter(filter.value ?? null)}
                            >
                                {/* Conteneur pour l'image */}
                                <div className="w-14 h-14 p-2 flex justify-center items-center">
                                    <img src={filter.src} alt={filter.title} className="max-w-full max-h-full object-contain rounded-full" />
                                </div>
                                {/* Titre avec un fond coloré uniquement en hover */}
                                <span className="text-sm font-medium mt-2 px-3 py-1 rounded-md bg-gray-100 group-hover:bg-accent">
                                    {filter.title}
                                </span>
                            </div>
                        );
                    })}
                </div>

                <div className="flex flex-row w-full justify-between">
                    <div className="flex flex-row gap-4">
                        <Button variant="secondary" size="navbar" effect="shineHover">
                            Végétarien
                        </Button>

                        <Button variant="secondary" size="navbar" effect="shineHover">
                            Halal
                        </Button>

                        <Button variant="secondary" size="navbar" effect="shineHover">
                            Promotions
                        </Button>
                    </div>

                    <Button effect="shineHover" onClick={() => setSelectedFilter(null)}>
                        Réinitialiser
                    </Button>
                </div>
            </div>

            {selectedFilter ? (
                <div className="w-full flex flex-col items-center mt-4">
                    <h2 className="text-xl font-bold mb-4">Résultats pour "{selectedFilter}"</h2>
                    {/* Afficher les résultats ici */}
                </div>
            ) : (
                <>
                    <SponsorshipSection />
                </>


            )}
        </div>
    );
};

export default Home;
