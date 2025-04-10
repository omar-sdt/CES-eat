import RestaurantItem from './RestaurantItem';
import { Restaurant } from "@/schemas/restaurantSchema.ts";

type RestaurantListProps = {
    restaurants: Restaurant[];
}

const RestaurantList = ({ restaurants }: RestaurantListProps) => {
    return (
        <div className='flex flex-wrap gap-4'>
            {restaurants.map((resto) => (
                <RestaurantItem key={resto._id} resto={resto} />
            ))}
        </div >
    );
};

export default RestaurantList;
