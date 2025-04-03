import { Menu, menuItemSchema } from "@/schemas/menuItemSchema"
import { Plus } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


type MenuItemProps = {
    key: number;
    menu: Menu;
}
const MenuItem = ({ menu }: MenuItemProps) => {
    const result = menuItemSchema.safeParse(menu);

    if (!result.success) {
        return <div>Erreur de données : {result.error.message}</div>;
    }

    const { image, name, description, price } = result.data;


    return (
        <div className="relative w-full min-h-[7rem] group">
            <div className="z-0 absolute inset-0 bg-green-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out blur-md rounded-lg z-10"></div>
            <div
                className="group z-10 border-1 relative flex items-center bg-white shadow-md rounded-lg overflow-hidden p-4 pr-0 gap-2"
            >

                <div className="
                    z-1 absolute top-0 bottom-0 right-0 w-0 bg-green-primary opacity-0 
                    group-hover:opacity-40 group-hover:w-1/6 transition-all duration-300 
                    ease-in-out blur-xl rounded-lg
                "></div>
                <div className="flex-1">

                    <h3 className="text-lg font-semibold">{name.toUpperCase()}</h3>
                    <p className="font-bold mt-2">{price}€</p>
                    <p className="text-gray-600 text-sm">{description}</p>
                </div>
                <img
                    src={image}
                    alt={name}
                    className="w-24 h-auto object-fit rounded-lg group-hover:blur-[1px] transition-all duration-300 ease-in-out"
                />



                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button className="z-2 absolute bottom-2 right-2 bg-white border border-green-primary 
                                rounded-full p-2 cursor-pointer transition-all duration-300
                                group-hover:bottom-1/2 group-hover:translate-y-1/2
                            ">
                                <Plus size={20} className="text-black" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent
                            side="top"
                            align="end"
                        >
                            <p>Ajoute ce menu au panier</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>



            </div>
        </div>
    )
}

export default MenuItem