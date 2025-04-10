"use client";

import RestaurantList from "@/components/RestaurantList";
import SponsorshipSection from "@/components/SponsorshipSection";
import { Button } from "@/components/ui/button";
import FilterList from "@/components/FilterList";
import { useFilter } from "@/context/filter-context";


const UserHome = () => {
    const { selectedFilter, setSelectedFilter, resultCount } = useFilter();

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

            {selectedFilter ? (
                <div className="w-full flex flex-col mt-4">
                    <h2 className="text-xl font-bold mb-4">{resultCount} résultat{resultCount > 1 ? 's' : ''}</h2>
                    <RestaurantList />
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