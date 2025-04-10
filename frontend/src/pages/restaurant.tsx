import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Map, Phone, Star } from "lucide-react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { menu } from "@/data/menu";
import MenuItem from "@/components/menu-item";
import { Button } from "@/components/ui/button";
import {useGetRestaurantByIdQuery} from "@/services/restaurant.service.ts";

const Restaurant = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    if (!id) {
        navigate("/home");
        return null;
    }

    const {data} = useGetRestaurantByIdQuery(id);

    if (!data) {
        return <div>Loading...</div>;
    }

    const { rating, name, address } = data.restaurant;

    const mapContainerStyle = {
        width: '100%',
        height: '150px'
    };

    const center = {
        lat: 48.8566,
        lng: 2.3522
    };

    const horaires = [
        "Lundi - Vendredi : 10h - 22h",
        "Samedi : 12h - 23h",
        "Dimanche : Fermé"
    ]

    return (
        <div className="w-full max-w-7xl mx-auto p-4 flex flex-col">
            <div>
                <Button variant="link" className="mb-2" onClick={() => navigate(-1)}>
                    <ArrowLeft size={16} className="mr-2" /> Retourner à l'accueil
                </Button>
            </div>
            <img
                src="/restaurant/kfc.svg"
                alt=""
                className="mb-2 w-full h-[10rem] object-cover rounded-lg shadow-lg"
            />
            <h1 className="text-2xl font-semibold">{name}</h1>
            <div className="flex flex-row items-center gap-1">
                <span className="text-sm text-gray-600">{rating}</span>
                <Star size={16} className='fill-green-primary text-green-primary' />
            </div>

            <div className="relative flex flex-row w-full mt-4 gap-2">
                <div className="sticky top-20 flex flex-col h-full gap-2 min-w-[16rem]">
                    <div
                        className="group p-4 border-2 rounded-md hover:bg-gray-100 cursor-pointer"
                        onClick={() => window.location.href = `tel: +336012345678`}
                    >
                        <p className="text-sm text-gray-600 flex flex-row gap-1 items-center group-hover:text-green-primary">
                            <Phone size={14} className="fill-black group-hover:fill-green-primary" />&nbsp;
                            <span>Tél: </span>
                            <span>+336012345678</span>
                        </p>
                    </div>

                    <div className="p-4 border-2 rounded-md">
                        <h2 className="flex flex-row gap-1 mb-4 items-center text-sm text-gray-600">
                            <Calendar size={14} />&nbsp;
                            <span>Horaires d'ouverture</span>
                        </h2>
                        <p className="text-sm text-gray-600">
                            {horaires.length > 0 ? horaires.map((horaire, index) => (
                                <span key={index} className="flex flex-row gap-1 items-center">
                                        <span>{horaire}</span>
                                    {index < horaires.length - 1}
                                    </span>
                            )) : "Non renseigné"}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <div className="flex flex-col p-4 border-2 gap-2 rounded-md">
                        <div className="flex flex-row justify-between">
                            <p className="text-sm text-gray-600 flex flex-row gap-1 items-center">
                                <Map size={16} /> &nbsp;
                                <span>Adresse : {address}</span>
                            </p>

                            <div className="flex flex-row gap-4">
                                <div className="flex flex-col items-center">
                                    <span className="text-sm">0</span>
                                    <span className="text-sm text-gray-600">Prix et frais</span>
                                </div>
                                <div className="h-8 w-[1px] bg-gray-300 mx-2"></div>

                                <div className="flex flex-col items-center">
                                    <span className="text-sm">5 min</span>
                                    <span className="text-sm text-gray-600">Temps de prise en charge</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-full w-full rounded-md overflow-hidden">
                            <LoadScript
                                googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""}
                            >
                                <GoogleMap
                                    mapContainerStyle={mapContainerStyle}
                                    center={center}
                                    zoom={15}
                                >
                                    <Marker position={center} />
                                </GoogleMap>
                            </LoadScript>
                        </div>
                    </div>

                    <div className="container mx-auto px-4 py-8">
                        {menu.map((section, index) => (
                            <div key={index} className="mb-10">
                                <h2 className="text-xl font-bold mb-4">{section.category.toUpperCase()}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {data.dishes.map((item, idx) => (
                                        <MenuItem key={idx} dish={item} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Restaurant;