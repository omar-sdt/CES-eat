import { Menu, menuSchema } from "@/schemas/menuItemSchema"
import { DialogChooseMenu } from "./DialogChooseMenu"


const MenuItem = ({ menu, restaurantId }: { menu: Menu, restaurantId: string }) => {
    const result = menuSchema.safeParse(menu);

    if (!result.success) {
        return <div>Erreur de données : {result.error.message}</div>;
    }

    const { image, name, description, basePrice } = result.data;

    return (
        <div className="relative w-full group">
            <div className="z-0 absolute inset-0 bg-green-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out blur-md rounded-lg z-10"></div>
            <div className="h-full group z-10 border-1 relative flex items-center bg-white shadow-md rounded-lg overflow-hidden p-4 pr-0 gap-2">
                <div className="
                    z-1 absolute top-0 bottom-0 right-0 w-0 bg-green-primary opacity-0 
                    group-hover:opacity-40 group-hover:w-1/6 transition-all duration-300 
                    ease-in-out blur-xl rounded-lg
                    "></div>
                <div className="flex-1 h-full w-75 overflow-hidden">
                    <h3 className="text-lg font-semibold">{name.toUpperCase()}</h3>
                    <p className="font-bold mt-2">{basePrice}€</p>
                    <p className="text-gray-600 text-sm line-clamp-2">
                        {description}
                    </p>
                </div>
                <img
                    src={image}
                    alt={name}
                    className="w-24 h-auto object-fit rounded-lg group-hover:blur-[1px] transition-all duration-300 ease-in-out"
                />

                <DialogChooseMenu menu={result.data} restaurantId={restaurantId} />
            </div>
        </div>
    )
}

export default MenuItem