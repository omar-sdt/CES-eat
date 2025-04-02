"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { X, ShoppingCart } from "lucide-react"
import { Link } from "react-router-dom"

const Panier = () => {
    const [isEmpty, setIsEmpty] = useState(true)

    return (
        <>
            <Drawer>
                <DrawerTrigger asChild>
                    <Button variant="default" size="navbar" effect="shineHover">
                        <ShoppingCart />
                        Panier • 0
                    </Button>
                </DrawerTrigger>
                {isEmpty ? (
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
                        <div className="mx-auto w-full max-w-sm h-[86%]">
                            <DrawerHeader>
                                <DrawerTitle>Move Goal</DrawerTitle>
                            </DrawerHeader>
                            <div className="h-full text-center flex flex-col justify-center items-center">
                                test

                            </div>
                            <DrawerFooter>
                                <DrawerClose asChild>
                                    <Button>Commander</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </div>
                    </DrawerContent>
                )}
            </Drawer>
        </>
    )
}

export default Panier