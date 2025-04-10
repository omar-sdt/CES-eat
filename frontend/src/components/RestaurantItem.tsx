import { restaurantSchema, Restaurant } from '@/schemas/restaurantSchema';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

type RestaurantProps = {
    resto: Restaurant;
};

const RestaurantItem = ({ resto }: RestaurantProps) => {
    const result = restaurantSchema.safeParse(resto);

    if (!result.success) {
        return <div>Erreur de données : {result.error.message}</div>;
    }

    const { id, name, rating, src, alt } = result.data;

    return (
        <Link className="flex flex-col gap-2 w-[236px] group" to={`/restaurant/${id}`}>

            <div className="relative w-full min-h-[7rem]">
                {/* Effet de blur devant l'image */}
                <div className="z-0 absolute inset-0 bg-green-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out blur-md rounded-lg z-10"></div>

                <img
                    src={src}
                    alt={alt}
                    className="w-full h-[7rem] rounded-lg shadow-lg z-10 absolute"
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                />
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
        </Link >
    );
};

export default RestaurantItem;