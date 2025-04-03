import { useNavigate, useParams } from "react-router-dom";
import { restaurants } from "@/data/restaurants";

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
        const { id, name, src, alt } = restaurant;
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold">{name}</h1>
                <img src={src} alt={alt} className="w-50 h-auto rounded-lg shadow-lg" />

            </div>
        );
    }
}

export default Restaurant