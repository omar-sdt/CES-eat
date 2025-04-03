import FilterItem from './filter-item';
import { filters } from '@/data/filters';
import { useFilter } from '@/context/filter-context';

const FilterList = () => {

    const { selectedFilter, setSelectedFilter } = useFilter();


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
