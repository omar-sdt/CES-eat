"use client";

import RestaurantList from "@/components/restaurant-list";
import SponsorshipSection from "@/components/sponsorship-section";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import FilterList from "@/components/filter-list";

const Home = () => {
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

    return (
        <div className="w-full max-w-7xl mx-auto p-4 flex flex-col items-center">
            <div className="w-full flex flex-col gap-2">
                <FilterList
                    selectedFilter={selectedFilter}
                    setSelectedFilter={setSelectedFilter}
                />

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
                <div className="w-full flex flex-col mt-4">
                    <h2 className="text-xl font-bold mb-4">164 résultats</h2>
                    <RestaurantList />
                </div>
            ) : (
                <SponsorshipSection />
            )}
        </div>
    );
};

export default Home;
