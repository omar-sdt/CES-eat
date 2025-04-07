import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Minus, Plus } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Menu } from "@/schemas/menuItemSchema";
import { useCart } from "@/context/cart-context";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

type SelectionState = {
    size?: {
        name: string;
        price: number;
    };
    accompaniment?: {
        name: string;
        price: number;
    };
    drink?: {
        name: string;
        price: number;
    };
};

export function DialogChooseMenu({ menu, restaurantId }: { menu: Menu; restaurantId: string }) {
    const [currentStep, setCurrentStep] = useState<"size" | "accompaniment" | "drink" | "summary">("size");
    const [selection, setSelection] = useState<SelectionState>({});
    const [quantity, setQuantity] = useState(1);

    const { addToCart } = useCart();

    const handleSelectOption = (type: keyof SelectionState, option: { name: string; price: number }) => {
        setSelection(prev => ({ ...prev, [type]: option }));

        // Déterminer la prochaine étape
        if (type === "size") setCurrentStep("accompaniment");
        else if (type === "accompaniment") setCurrentStep("drink");
        else setCurrentStep("summary");
    };

    const calculateTotal = () => {
        const sizePrice = selection.size?.price || 0;
        const accompanimentPrice = selection.accompaniment?.price || 0;
        const drinkPrice = selection.drink?.price || 0;
        return quantity * (menu.basePrice + sizePrice + accompanimentPrice + drinkPrice);
    };

    const createId = () => {
        //avec restaurantId, menuId, size, accompaniment, drink
        return `${restaurantId}-${menu.id}-${selection.size?.name}-${selection.accompaniment?.name}-${selection.drink?.name}`;
    }

    return (
        <Dialog>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
            <TooltipProvider>
                <Tooltip>
                    <DialogTrigger asChild>
                        <TooltipTrigger asChild>
                            <button className="z-2 absolute bottom-2 right-2 bg-white border border-green-primary 
                                    rounded-full p-2 cursor-pointer transition-all duration-300
                                    group-hover:bottom-1/2 group-hover:translate-y-1/2">
                                <Plus size={20} className="text-black" />
                            </button>
                        </TooltipTrigger>
                    </DialogTrigger>
                    <TooltipContent side="top" align="end">
                        <p>Ajouter ce menu au panier</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <DialogContent className="sm:max-w-[600px] overflow-y-auto">
                <div className="grid gap-4 py-4">
                    {/* Étape 1 : Sélection de la taille */}
                    {currentStep === "size" && (
                        <div className="space-y-4">
                            <div className="flex flex-row">
                                <img src={menu.image} alt={menu.name} className="w-auto h-30 object-fit rounded-lg" />
                                <div className="flex flex-col">
                                    <div className="text-lg font-semibold">{menu.name}</div>
                                    <div className="text-sm text-gray-600">{menu.description}</div>
                                </div>
                            </div>

                            <h3 className="font-medium">Choisissez votre taille</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {menu.options?.size?.map((option, index) => (
                                    <Button
                                        key={index}
                                        variant={selection.size?.name === option.name ? "default" : "outline"}
                                        onClick={() => handleSelectOption("size", option)}
                                    >
                                        {option.name} {option.price > 0 ? `(+${option.price}€)` : ""}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Étape 2 : Sélection de l'accompagnement */}
                    {currentStep === "accompaniment" && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" onClick={() => setCurrentStep("size")}>
                                    ←
                                </Button>
                                <h3 className="font-medium">Choisissez votre accompagnement</h3>
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                                {menu.options?.accompaniments?.map((option, index) => (
                                    <Button
                                        key={index}
                                        variant={selection.accompaniment?.name === option.name ? "default" : "outline"}
                                        onClick={() => handleSelectOption("accompaniment", option)}
                                    >
                                        {option.name} {option.price > 0 ? `(+${option.price}€)` : ""}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Étape 3 : Sélection de la boisson */}
                    {currentStep === "drink" && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" onClick={() => setCurrentStep("accompaniment")}>
                                    ←
                                </Button>
                                <h3 className="font-medium">Choisissez votre boisson</h3>
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                                {menu.options?.drinks?.map((option, index) => (
                                    <Button
                                        key={index}
                                        variant={selection.drink?.name === option.name ? "default" : "outline"}
                                        onClick={() => handleSelectOption("drink", option)}
                                    >
                                        {option.name} {option.price > 0 ? `(+${option.price}€)` : ""}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Étape 4 : Récapitulatif */}
                    {currentStep === "summary" && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" onClick={() => setCurrentStep("drink")}>
                                    ←
                                </Button>
                                <h3 className="font-medium">Votre sélection</h3>
                            </div>

                            <div className="space-y-2">
                                {/* Taille */}
                                <div className="flex justify-between">
                                    <span>Taille:</span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">
                                            {selection.size?.name || "Non sélectionné"}
                                        </span>
                                        {selection.size!.price > 0 && (
                                            <span className="text-sm text-green-600">
                                                +{selection.size!.price.toFixed(2)}€
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Accompagnement */}
                                <div className="flex justify-between">
                                    <span>Accompagnement:</span>
                                    <div className="flex flex-col items-end">
                                        <span className="font-medium">
                                            {selection.accompaniment?.name || "Non sélectionné"}
                                        </span>
                                        {selection.accompaniment!.price > 0 && (
                                            <span className="text-sm text-green-600">
                                                +{selection.accompaniment!.price.toFixed(2)}€
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Boisson */}
                                <div className="flex justify-between">
                                    <span>Boisson:</span>
                                    <div className="flex flex-col items-end">
                                        <span className="font-medium">
                                            {selection.drink?.name || "Non sélectionné"}
                                        </span>
                                        {selection.drink!.price > 0 && (
                                            <span className="text-sm text-green-600">
                                                +{selection.drink!.price.toFixed(2)}€
                                            </span>
                                        )}
                                    </div>
                                </div>



                                {/* Quantité */}
                                <div className="flex justify-between pt-2 border-t border-gray-200 items-center">
                                    <span>Quantité:</span>
                                    <div className="flex items-center gap-2 select-none bg-accent rounded-full p-2 gap-4">
                                        <Minus
                                            size={16}
                                            className="text-black cursor-pointer"
                                            onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                                        />
                                        <span className="font-medium">{quantity || 1}</span>
                                        <Plus
                                            size={16}
                                            className="text-black cursor-pointer"
                                            onClick={() => setQuantity(prev => prev + 1)}
                                        />
                                    </div>
                                </div>

                                {/* Prix de base */}
                                <div className="flex justify-between pt-2 border-t border-gray-200">
                                    <span>Prix de base:</span>
                                    <span className="font-medium">{menu.basePrice.toFixed(2)}€</span>
                                </div>

                                {/* Total */}
                                <div className="flex justify-between pt-2 border-t border-gray-200">
                                    <span className="font-semibold">Total:</span>
                                    <span className="font-bold text-green-600">
                                        {calculateTotal().toFixed(2)}€
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter>
                    {currentStep === "summary" ? (

                        <DialogClose asChild onClick={() => {
                            addToCart({
                                id: createId(),
                                restaurantId: restaurantId,
                                name: menu.name,
                                price: menu.basePrice + (selection.size?.price || 0) + (selection.accompaniment?.price || 0) + (selection.drink?.price || 0),
                                size: selection.size?.name || "",
                                accompaniment: selection.accompaniment?.name || "",
                                drink: selection.drink?.name || "",
                                src: menu.image,
                                quantity: quantity,
                            });
                        }}>
                            <Button type="button" className="w-full">
                                En ajouter {quantity} à la commande • ({calculateTotal().toFixed(2)}€)
                            </Button>
                        </DialogClose>
                    ) : (
                        <div className="w-full text-center text-sm text-gray-500">
                            Étape {currentStep === "size" ? 1 : currentStep === "accompaniment" ? 2 : 3} sur 3
                        </div>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}