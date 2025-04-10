import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CalendarIcon, Check, House, Minus, Plus, ShoppingCart, Trash, Zap } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useCart } from "@/context/cart-context"
import { Link } from "react-router-dom"

import { restaurants } from "@/data/restaurants"
import { toast } from "sonner"


const Payment = () => {
    const [date, setDate] = useState<Date>()
    const { cart, updateQuantity, removeFromCart, sousTotalPrice, reductionPrice, totalPrice, isDeliveryPriority, setIsDeliveryPriority, setIsPromotionApply, isPromotionApply, deliveryPriorityPrice } = useCart();

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

    const groupedCart = cart.reduce((acc, item) => {
        if (!acc[item.restaurantId]) {
            acc[item.restaurantId] = []
        }
        acc[item.restaurantId].push(item)
        return acc
    }, {} as Record<string, typeof cart>)

    const calculateNbItemsOfRestaurant = (restaurantId: string) => {
        return cart.filter(item => item.restaurantId === restaurantId).reduce((total, item) => total + item.quantity, 0)
    }

    //promotion
    const [promotionCode, setPromotionCode] = useState<string>("")
    const applyPromotion = () => {
        if (promotionCode !== "CESEAT10") {
            toast.error("Le code promo est invalide !")
        } else {
            setIsPromotionApply(true);
            toast.success("Code promo appliqué avec succès !")
        }
    }

    return (
        <div className="w-full max-w-7xl mx-auto p-4 flex flex-row gap-4">
            <div className="sticky top-22 flex flex-col w-full border-2 rounded-sm p-4 mb-4 gap-4 h-min">
                <div className="flex flex-col w-full gap-2">
                    <div className="text-lg font-semibold">Adresse de livraison</div>
                    <div className="flex flex-row justify-between w-full items-center bg-gray-100 p-2 rounded-lg">
                        <div className="flex gap-2 items-center">
                            <House className="w-6 h-6" />
                            <div className="flex flex-col">
                                <span className="text-base">10 rue de l'église</span>
                                <span className="text-sm text-gray-600">Dijon, France</span>
                            </div>
                        </div>

                        <Button variant="outline" size="navbar">
                            Modifier l'adresse
                        </Button>
                    </div>
                </div>

                <div className="h-[1px] bg-gray-300 w-full" />

                <div className="flex flex-col gap-4">
                    <div className="text-lg font-semibold mb-2">
                        Options de livraison
                    </div>

                    <div className="flex flex-col gap-4">
                        {/* Option Priorité Plus rapide */}
                        <div className={`flex flex-row justify-between w-full items-center p-3 border rounded-lg hover:bg-accent cursor-pointer transition-all ${isDeliveryPriority ? "bg-accent" : ""}`}
                            onClick={() => setIsDeliveryPriority(true)}>
                            <div className="items-center flex space-x-2 flex-1 gap-2">
                                <Zap className="w-6 h-6 fill-green-primary text-green-primary" />
                                <div className="grid gap-1 leading-none flex-1">
                                    <label
                                        htmlFor="priority"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Priorité Plus rapide
                                    </label>
                                    <p className="text-sm text-muted-foreground">
                                        25 - 40 minutes • Livraison directement chez vous
                                    </p>
                                </div>
                            </div>
                            <div className="text-sm font-semibold ml-4">+{deliveryPriorityPrice}€</div>
                        </div>

                        {/* Option Standard */}
                        <div className={`flex flex-row justify-between w-full items-center p-3 border rounded-lg hover:bg-accent cursor-pointer transition-all ${!isDeliveryPriority ? "bg-accent" : ""}`}
                            onClick={() => setIsDeliveryPriority(false)}>
                            <div className="items-center flex space-x-2 flex-1 gap-2">
                                <ShoppingCart className="w-6 h-6 fill-black text-black" />

                                <div className="grid gap-1 leading-none flex-1">
                                    <label
                                        htmlFor="standard"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Standard
                                    </label>
                                    <p className="text-sm text-muted-foreground">
                                        30 - 45 minutes
                                    </p>
                                </div>
                            </div>
                            <div className="text-sm font-semibold ml-4">Gratuit</div>
                        </div>
                    </div>
                </div>

                <div className="h-[1px] bg-gray-300 w-full" />


                <div className="flex flex-col w-full gap-4">
                    <div className="text-lg font-semibold">
                        Moyen de paiement
                    </div>

                    <div className="flex flex-col gap-2 pl-4">
                        <div className="text-sm">
                            Coordonnées de la carte
                        </div>

                        <Input placeholder="Numéro de carte" />
                        <div className="flex flex-row gap-2">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[280px] justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon />
                                        {date ? format(date, "PPP") : <span>Date d'expiration</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <Input placeholder="Cryptogramme" />
                        </div>


                    </div>

                    <div className="flex flex-col gap-2 pl-4">
                        <div className="text-sm">
                            Titulaire de la carte
                        </div>

                        <Input placeholder="Nom et prénom" />
                    </div>
                </div>

                <Button className="mt-4" effect="shineHover">
                    Valider et payer la commande
                </Button>
            </div >

            <div className="flex flex-col w-full max-w-[32rem]">
                <div className="w-full border-2 p-4 mb-4 rounded-sm">
                    <div className="text-lg font-semibold mb-2">
                        Récapitulatif du panier &nbsp;
                        <span className="text-green-primary">({totalItems} article{totalItems > 1 ? "s" : ""})</span>
                    </div>

                    <div className="flex flex-col gap-4 h-full overflow-y-auto">
                        {Object.entries(groupedCart).map(([restaurantId, items]) => {
                            const restaurant = restaurants.find(r => r.id === restaurantId)

                            return (
                                <Accordion key={restaurantId} type="multiple" className="w-full w-full bg-gray-200 border px-4 pb-4  rounded-sm" defaultValue={["value-1", "value-2"]}>
                                    <AccordionItem value={`item-${restaurantId}`}>
                                        <div className="flex flex-col gap-6">
                                            <AccordionTrigger>
                                                <div className="flex gap-4 items-center">
                                                    <img src={restaurant?.src} alt={restaurant?.name} className="w-24 h-16 rounded-xs object-cover" />
                                                    <div className="flex flex-col gap w-full">
                                                        <span className="text-xl font-semibold">{restaurant?.name.toUpperCase()} ({calculateNbItemsOfRestaurant(restaurantId)} article{calculateNbItemsOfRestaurant(restaurantId) > 1 ? "s" : ""})</span>
                                                        <span className="text-sm text-gray-600">{restaurant?.address}</span>
                                                        <Link to={`/restaurant/${restaurantId}`}>
                                                            <span className="text-sm text-secondary-text underline cursor-pointer">Voir le restaurant</span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </AccordionTrigger>

                                            <AccordionContent>
                                                {items.map((item) => (
                                                    <div key={item.id} className="flex flex-row gap-2 px-2 items-center">
                                                        <img src={item.src} alt={item.name} className="w-24 h-auto rounded-lg object-cover" />
                                                        <div className="flex flex-col gap-2 w-full">
                                                            <span className="text-base font-semibold">{item.name.toUpperCase()}</span>
                                                            <div className="flex justify-between items-center gap-2">
                                                                <div className="flex flex-col w-full">
                                                                    <div className="flex flex-wrap text-sm">
                                                                        <span className="underline whitespace-nowrap">Taille:</span>&nbsp;
                                                                        <span className="text-gray-600">{item.size}</span>
                                                                    </div>
                                                                    <div className="flex flex-wrap text-sm">
                                                                        <span className="underline whitespace-nowrap">Accompagnement:</span>&nbsp;
                                                                        <span className="text-gray-600">{item.accompaniment}</span>
                                                                    </div>
                                                                    <div className="flex flex-wrap text-sm">
                                                                        <span className="underline whitespace-nowrap">Boisson:</span>&nbsp;
                                                                        <span className="text-gray-600">{item.drink}</span>
                                                                    </div>
                                                                </div>

                                                                <div className="flex h-min items-center select-none bg-white rounded-full p-2 gap-4">
                                                                    {item.quantity > 1 ? (
                                                                        <Minus
                                                                            size={16}
                                                                            className="text-black cursor-pointer"
                                                                            onClick={() => updateQuantity(item.restaurantId, item.id, -1)}
                                                                        />
                                                                    ) : (
                                                                        <Trash
                                                                            size={16}
                                                                            className="text-black cursor-pointer"
                                                                            onClick={() => removeFromCart(item.restaurantId, item.id)}
                                                                        />
                                                                    )}
                                                                    <span className="font-medium">{item.quantity}</span>
                                                                    <Plus
                                                                        size={16}
                                                                        className="text-black cursor-pointer"
                                                                        onClick={() => updateQuantity(item.restaurantId, item.id, 1)}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <span className="text-lg font-semibold">
                                                                {(item.price * item.quantity).toFixed(2)}€
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </AccordionContent>
                                        </div>
                                    </AccordionItem>

                                    <div className="h-[1px] bg-gray-300 w-full"></div>
                                    <div className="flex flex-row justify-between items-center mt-4">
                                        <span className="text-lg font-semibold">Total :</span>
                                        <span className="text-lg font-semibold">
                                            {items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}€
                                        </span>
                                    </div>
                                </Accordion>
                            )
                        })}
                    </div>


                </div>

                <div className="w-full border-2 p-4 mb-4 rounded-sm flex flex-col">
                    <div className="text-lg font-semibold mb-2">
                        Promotion
                    </div>
                    <div className="flex flex-row justify-between w-full items-center mb-2">
                        <Input placeholder="Code promo" className="w-full h-full bg-gray-200" value={promotionCode} onChange={(e) => setPromotionCode(e.target.value)} />
                        <Button className="ml-2" effect="shineHover" onClick={() => applyPromotion()}>
                            Appliquer
                        </Button>
                    </div>

                    <div className="w-full flex flex-col gap-2">
                        {isPromotionApply && (
                            <div className="px-4 py-2 w-full border-2 rounded-full flex flex-row justify-between items-center">
                                <div className="flex flex-row gap-2 items-center">
                                    <div className="rounded-full bg-accent w-8 h-8 flex items-center justify-center mr-2">
                                        <Check className="w-4 h-4 text-green-primary" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold">-10% sur votre commande</span>
                                        <span className="text-sm text-gray-600">
                                            <span>Code :</span>&nbsp;
                                            <span className="text-green-primary">CESEAT10</span>
                                        </span>
                                    </div>
                                </div>
                                <Trash className="w-4 h-4 text-black cursor-pointer" onClick={() => setIsPromotionApply(false)} />
                            </div>
                        )}
                    </div>

                </div>

                <div className="w-full border-2 p-4 mb-4 rounded-sm">
                    <div className="text-lg font-semibold mb-2">
                        Total de la commande
                    </div>

                    <div className="flex flex-row justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-gray-600">Sous-total</span>
                        <span className="text-sm font-semibold">{sousTotalPrice.toFixed(2)}€</span>
                    </div>

                    {isPromotionApply && (
                        <div className="flex flex-row justify-between items-center mb-2">
                            <span className="text-sm font-semibold text-gray-600">Promotion</span>
                            <span className="text-sm font-semibold text-green-primary">-{reductionPrice.toFixed(2)}€</span>
                        </div>
                    )}

                    {isDeliveryPriority && (
                        <div className="flex flex-row justify-between items-center mb-2">
                            <span className="text-sm font-semibold text-gray-600">Livraison</span>
                            <span className="text-sm font-semibold"> {deliveryPriorityPrice.toFixed(2)}€</span>
                        </div>
                    )}

                    <div className="flex flex-row justify-between items-center mb-2">
                        <span className="text-lg font-semibold">Total</span>
                        <span className="text-lg font-semibold">{totalPrice.toFixed(2)}€</span>
                    </div>

                    <div className="flex flex-col gap-2 mt-6">
                        <div className="text-sm text-gray-600 text-center">
                            En cliquant sur le bouton pour passer votre commande, vous acceptez le &nbsp;

                            <span className="text-green-primary underline cursor-pointer">
                                Contrat sur les services de livraison avec Ces’Eat.
                            </span>
                        </div>

                        <div className="text-sm text-gray-600 text-center">
                            Vous renoncez pour rappel à votre droit de rétractation ayant pour uobjet les services de livraison. Vous avez la possibilité de recourir à un médiateur de la consommation ici.
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Payment