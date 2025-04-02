import { restaurantSchema, Restaurant } from '@/schemas/restaurantSchema';
import { Star } from 'lucide-react';

type RestaurantItemProps = {
    resto: Restaurant;
};

const RestaurantItem = ({ resto }: RestaurantItemProps) => {
    const result = restaurantSchema.safeParse(resto);

    if (!result.success) {
        return <div>Erreur de données : {result.error.message}</div>;
    }

    const { name, address, rating, src, alt } = result.data;

    return (
        <div className="flex flex-col gap-2 w-[236px] group">
            <div className="relative w-full">
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-auto rounded-lg shadow-lg"
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
            </div>

            <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                    <h2 className="text-lg font-bold">{name}</h2>
                    <div className="flex flex-row items-center gap-1">
                        <span className="text-sm text-gray-600">{rating}</span>
                        <Star size={16} className='fill-green-primary text-green-primary' />
                    </div>
                </div>

                <div><p className="text-sm text-gray-600">14 km</p></div>
            </div>
        </div >
    );
};

export default RestaurantItem;
