import { useFilter } from '@/context/filter-context';
import RestaurantItem from './RestaurantItem';

const RestaurantList = () => {
    const { filteredRestaurants } = useFilter();


    return (
        <div className='flex flex-wrap gap-4'>
            {filteredRestaurants.map((resto) => (
                <RestaurantItem key={resto.id} resto={resto} />
            ))}
        </div >
    );
};

export default RestaurantList;