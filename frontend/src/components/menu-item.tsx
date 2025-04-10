import {Dish} from "@/schemas/dish.schema.ts";
import {DialogChooseMenu} from "@/components/dialog-choose-menu.tsx";

type MenuItemProps = {
    dish: Dish;
}

const MenuItem = ({dish}: MenuItemProps) => {
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
                    <h3 className="text-lg font-semibold">{dish.name}</h3>
                    <p className="font-bold mt-2">{dish.price}€</p>
                    <p className="text-gray-600 text-sm line-clamp-2">
                        {dish.description}
                    </p>
                </div>
                <img
                    src="/menu/crispy_naan_creamy.png"
                    alt={dish.description}
                    className="w-24 h-auto object-fit rounded-lg group-hover:blur-[1px] transition-all duration-300 ease-in-out"
                />

                <DialogChooseMenu dish={dish} />
            </div>
        </div>
    )
}

export default MenuItem