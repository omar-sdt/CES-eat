"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Restaurant } from "@/schemas/restaurantItemSchema";
import { restaurantItems } from '@/data/restaurantItems';

// Définition du type pour le contexte
interface FilterContextType {
    selectedFilter: string | null;
    setSelectedFilter: (filter: string | null) => void;
    filteredRestaurants: Restaurant[];
    resultCount: number;
}

// Création du contexte
const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
    children: ReactNode;
}

export const FilterProvider = ({ children }: FilterProviderProps) => {
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

    // Filtrage des restaurants en fonction des tags sélectionné
    const filteredRestaurants = selectedFilter
        ? restaurantItems.filter((restaurant) =>
            restaurant.tags.some((tag) => tag.toLowerCase() === selectedFilter?.toLowerCase())
        )
        : restaurantItems;

    return (
        <FilterContext.Provider value={{
            selectedFilter,
            setSelectedFilter,
            filteredRestaurants,
            resultCount: filteredRestaurants.length
        }}>
            {children}
        </FilterContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte
export const useFilter = (): FilterContextType => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error("useFilter must be used within a FilterProvider");
    }
    return context;
};
