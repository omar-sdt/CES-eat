import { useNavigate, useParams } from "react-router-dom";
import { restaurants } from "@/data/restaurants";
import { Calendar, Map, MapPin, Phone, Star } from "lucide-react";

const Restaurant = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    if (!id || isNaN(Number(id))) {
        navigate("/home");
        return null;
    }

    const restaurant = restaurants.find((resto) => resto.id === id);
    if (!restaurant) {
        navigate("/home");
        return null;
    } else {
        const { id, rating, horaires, phone, name, src, alt } = restaurant;
        return (
            <div className="w-full max-w-7xl mx-auto p-4 flex flex-col">
                <img src={src} alt={alt} className="mb-2 w-full h-[10rem] object-cover rounded-lg shadow-lg" />
                <h1 className="text-2xl font-semibold">{name}</h1>
                <div className="flex flex-row items-center gap-1">
                    <span className="text-sm text-gray-600">{rating}</span>
                    <Star size={16} className='fill-green-primary text-green-primary' />
                </div>

                <div className="flex flex-row w-full mt-4 gap-2">
                    <div className="flex flex-col gap-2 min-w-[16rem]">
                        <div
                            className="group p-4 border rounded-md hover:bg-gray-100 cursor-pointer"
                            onClick={() => window.location.href = `tel:${phone}`}
                        >
                            <p className="text-sm text-gray-600 flex flex-row gap-1 items-center group-hover:text-green-primary">
                                <Phone size={14} className="fill-black group-hover:fill-green-primary" />&nbsp;
                                <span>Tél: </span>
                                <span>{phone}</span>
                            </p>
                        </div>

                        <div className="p-4 border rounded-md">
                            <h2 className="flex flex-row gap-1 mb-4 items-center text-sm text-gray-600">
                                <Calendar size={14} />&nbsp;
                                <span>Horaires d'ouverture</span>
                            </h2>
                            <p className="text-sm text-gray-600">
                                {(typeof horaires === "string" ? horaires.split("\n") : horaires).map((line, index) => (
                                    <span key={index} className="block">{line}</span>
                                ))}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <div
                            className="p-4 border rounded-md"
                            onClick={() => window.location.href = `tel:${phone}`}
                        >
                            <p className="text-sm text-gray-600 flex flex-row gap-1 items-center group-hover:text-green-primary">
                                <Map size={16} /> &nbsp;
                                <span>Adresse : {restaurant.address}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default Restaurant