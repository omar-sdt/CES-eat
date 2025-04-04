"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { X, ShoppingCart, Minus, Plus, Trash } from "lucide-react"
import { Link } from "react-router-dom"
import { useCart } from "@/context/cart-context"

const Panier = () => {
    const { cart, updateQuantity, removeFromCart } = useCart();
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <>
            <Drawer>
                <DrawerTrigger asChild>
                    <Button variant="default" size="navbar" effect="shineHover">
                        <ShoppingCart />
                        Panier • {totalItems}
                    </Button>
                </DrawerTrigger>
                {cart.length == 0 ? (
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
                                    <div className="text-sm text-secondary-text ">Une fois que vous avez ajouté des plats d’un restaurant ou les artiicles d’un magasin, votre panier s’affiche ici.</div>
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
                        <DrawerClose asChild className="absolute left-5 top-[-1rem]">
                            <Button variant="secondary" size="icon" effect="shineHover" className="mt-10">
                                <X />
                            </Button>
                        </DrawerClose>

                        <div className="mx-auto w-full max-w-sm h-full min-w-[500px] p-6 mt-14 gap-6 flex flex-col">
                            {cart.map((item, index) => (
                                <div key={index} className="flex flex-row gap-4 items-center">
                                    <img src={item.src} alt={item.name} className="w-24 h-auto rounded-lg object-fit" />
                                    <div className="flex flex-col gap-2 w-full">
                                        <span className="text-lg font-semibold">{item.name.toUpperCase()}</span>
                                        <div className="flex flex-row justify-between items-center">
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


                                            <div className="flex h-min items-center select-none bg-accent rounded-full p-2 gap-4">
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
                                                        onClick={() => removeFromCart(item.restaurantId, item.id)} />
                                                )}
                                                < span className="font-medium">{item.quantity}</span>
                                                <Plus
                                                    size={16}
                                                    className="text-black cursor-pointer"
                                                    onClick={() => updateQuantity(item.restaurantId, item.id, 1)}
                                                />
                                            </div>
                                        </div>
                                        <span className="text-lg font-semibold"> {(item.price * item.quantity).toFixed(2)}€</span>
                                    </div>
                                </div>
                            ))}

                            <div className="h-[1px] bg-gray-300 w-full mt-4"></div>
                            <div className="flex flex-row justify-between items-center">
                                <span className="text-lg font-semibold">Total :</span>
                                <span className="text-lg font-semibold">{cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}€</span>
                            </div>
                        </div>
                        <DrawerFooter>
                            <DrawerClose asChild>
                                <Button>Commander</Button>
                            </DrawerClose>
                        </DrawerFooter>

                    </DrawerContent>
                )}
            </Drawer>
        </>
    )
}

export default Panier