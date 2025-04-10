"use client";

import RestaurantList from "@/components/restaurant-list";
import SponsorshipSection from "@/components/sponsorship-section";
import { Button } from "@/components/ui/button";
import FilterList from "@/components/filter-list";
import { useFilter } from "@/context/filter-context";
import { useGetAllRestaurantsQuery } from "@/services/restaurant.service.ts";

const UserHome = () => {
    const { selectedFilter, setSelectedFilter } = useFilter();
    const { data: restaurants } = useGetAllRestaurantsQuery();

    const resultCount = restaurants ? restaurants.length : 0;

    return (
        <>
            <div className="w-full flex flex-col gap-2">
                <FilterList />

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

                    <Button effect="shineHover" disabled={!selectedFilter} onClick={() => setSelectedFilter(null)}>
                        Réinitialiser
                    </Button>
                </div>
            </div>

            {restaurants ? (
                <div className="w-full flex flex-col mt-4">
                    <h2 className="text-xl font-bold mb-4">{resultCount} résultat{resultCount > 1 ? 's' : ''}</h2>
                    <RestaurantList restaurants={restaurants} />
                </div>
            ) : (
                <SponsorshipSection
                    titleText="Bénéficiez de -10€ lorsque vos amis essaient Ces’Eat !"
                    btnText="Invitez vos amis"
                />
            )}
        </>
    );
}

export default UserHome;