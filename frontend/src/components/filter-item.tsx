import { Filter } from '@/schemas/filterSchema';

type FilterItemProps = {
    filter: Filter;
    isSelected: boolean;
    onClick: () => void;
};

const FilterItem = ({ filter, isSelected, onClick }: FilterItemProps) => {
    return (
        <div
            className={`group flex flex-col items-center p-2 rounded-lg cursor-pointer transition-transform duration-300 ease-in-out
        ${isSelected ? "scale-115" : ""}`}
            onClick={onClick}
        >
            {/* Conteneur pour l'image */}
            <div className="w-[50px] h-[50px] p-2 flex justify-center items-center">
                <img
                    src={filter.src}
                    alt={filter.alt}
                    className={`max-w-full max-h-full object-contain rounded-full ${isSelected ? "border-2 border-accent" : ""}`}
                />
            </div>
            {/* Titre avec un fond coloré uniquement en hover */}
            <span className={`text-sm font-medium mt-2 px-3 py-1 rounded-md  group-hover:bg-accent ${isSelected ? "bg-accent" : "bg-gray-100"} `}>
                {filter.title}
            </span>
        </div>
    );
};

export default FilterItem;
