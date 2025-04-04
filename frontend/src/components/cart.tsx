"use client"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { X, ShoppingCart, Minus, Plus, Trash } from "lucide-react"
import { Link } from "react-router-dom"
import { useCart } from "@/context/cart-context"
import { restaurants } from "@/data/restaurants"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"

const Cart = () => {
    const { cart, totalItems, sousTotalPrice, updateQuantity, removeFromCart } = useCart()

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

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="default" size="navbar" effect="shineHover">
                    <ShoppingCart />
                    Panier • {totalItems}
                </Button>
            </DrawerTrigger>
            {cart.length === 0 ? (
                <DrawerContent>
                    <DrawerClose asChild className="absolute left-5 top-[-1rem]">
                        <Button variant="secondary" size="icon" effect="shineHover" className="mt-10">
                            <X />
                        </Button>
                    </DrawerClose>
                    <div className="mx-auto w-full max-w-sm h-full min-w-[500px] p-6">
                        <div className="h-full text-center flex flex-col justify-center items-center">
                            <img src="/panier-vide.svg" alt="Logo" className="inline-block mr-2 w-[14rem] select-none" />
                            <div className="flex flex-col gap-2 items-center">
                                <div className="text-lg font-semibold">Ajoutez des articles pour commencer un panier</div>
                                <div className="text-sm text-secondary-text">Une fois que vous avez ajouté des plats d'un restaurant ou les articles d'un magasin, votre panier s'affiche ici.</div>
                                <Link to="/home">
                                    <DrawerClose asChild>
                                        <Button variant="default" size="navbar" effect="shineHover" className="mt-10">
                                            Commander
                                        </Button>
                                    </DrawerClose>
                                </Link>
                            </div>
                        </div>
                    </div>
                </DrawerContent>
            ) : (
                <DrawerContent>
                    <DrawerTitle></DrawerTitle>
                    <DrawerClose asChild className="absolute left-5 top-[-1rem]">
                        <Button variant="secondary" size="icon" effect="shineHover" className="mt-10">
                            <X />
                        </Button>
                    </DrawerClose>

                    <div className="mt-20 px-6 flex flex-col gap-4 h-full overflow-y-auto">
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
                                                            <DrawerClose>
                                                                <span className="text-sm text-secondary-text underline cursor-pointer">Voir le restaurant</span>
                                                            </DrawerClose>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </AccordionTrigger>

                                            <AccordionContent>
                                                {items.map((item) => (
                                                    <div key={item.id} className="flex flex-row gap-2 px-2 pb-3 items-center">
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

                        <div className="h-[1px] bg-gray-300 w-full"></div>
                        <div className="flex flex-row justify-between items-center mt-4">
                            <span className="text-lg font-semibold">Total de la commande :</span>
                            <span className="text-lg font-semibold">
                                {sousTotalPrice.toFixed(2)}€
                            </span>
                        </div>
                    </div>

                    <DrawerFooter>
                        <Link to="/payment">
                            <DrawerClose asChild>
                                <Button variant="default" effect="shineHover" className="w-full mt-4">Commander pour {sousTotalPrice.toFixed(2)}€</Button>
                            </DrawerClose>
                        </Link>
                    </DrawerFooter>
                </DrawerContent >
            )}
        </Drawer >
    )
}

export default Cart