import { Filter } from '@/schemas/filterSchema';
import FilterItem from './filter-item';

type FilterListProps = {
    filters: Filter[];
    selectedFilter: string | null;
    setSelectedFilter: (filterValue: string | null) => void;
};

const filters = [
    { src: "/food-filter/hamburger.svg", title: "Hamburger", value: "hamburger", alt: "Image d'un hamburger" },
    { src: "/food-filter/frites.svg", title: "Frites", value: "frites", alt: "Image de frites" },
    { src: "/food-filter/pizza.svg", title: "Pizza", value: "pizza", alt: "Image de pizza" },
    { src: "/food-filter/viande.svg", title: "Viande", value: "viande", alt: "Image de viande" },
    { src: "/food-filter/asiatique.svg", title: "Asiatique", value: "asiatique", alt: "Image de cuisine asiatique" },
    { src: "/food-filter/poisson.svg", title: "Poisson", value: "poisson", alt: "Image de poisson" },
    { src: "/food-filter/croissant.svg", title: "Petit-déjeuner", value: "petit-dejeuner", alt: "Image de croissant" },
    { src: "/food-filter/salade.svg", title: "Salade", value: "salade", alt: "Image de salade" },
    { src: "/food-filter/sushi.svg", title: "Sushi / Maki", value: "sushi", alt: "Image de sushi" },
    { src: "/food-filter/poulet.svg", title: "Poulet", value: "poulet", alt: "Image de poulet" },
    { src: "/food-filter/cafe.svg", title: "Café", value: "cafe", alt: "Image de café" },
];

const FilterList = ({ selectedFilter, setSelectedFilter }: FilterListProps) => {
    return (
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide whitespace-nowrap w-full py-2">
            {filters.map((filter) => {
                const isSelected = selectedFilter === filter.value;
                return (
                    <FilterItem
                        key={filter.value}
                        filter={filter}
                        isSelected={isSelected}
                        onClick={() => setSelectedFilter(isSelected ? null : filter.value)}
                    />
                );
            })}
        </div>
    );
};

export default FilterList;
