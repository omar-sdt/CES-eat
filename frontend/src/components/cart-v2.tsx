import {clearCart, removeFromCart, updateQuantity} from "@/features/cart-slice.ts";
import {useAppDispatch, useAppSelector} from "@/store.ts";
import {Button} from "@/components/ui/button.tsx";
import {ChevronLeft, ChevronRight, Minus, Plus, ShoppingCart, Trash, X} from "lucide-react";
import {
    Drawer, DrawerClose, DrawerContent, DrawerFooter,
    DrawerTrigger,
} from "@/components/ui/drawer"
import React from "react";
import {Link} from "react-router-dom";
import {useCreateOrderMutation} from "@/services/order.service.ts";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useGetUserDetailsQuery} from "@/services/auth.service.ts";
import {toast} from "sonner";

export const Cart = () => {
    const cart = useAppSelector((state) => state.cart);
    const { data: user } = useGetUserDetailsQuery();
    const [address, setAddress] = React.useState<string>("");
    const [openDialog, setOpenDialog] = React.useState(false);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const dispatch = useAppDispatch();
    const [createOrder] = useCreateOrderMutation();

    const totalItems = React.useMemo(() => {
        return cart.dishes.reduce((total, item) => total + item.quantity, 0);
    }, [cart])

    const totalPrice = React.useMemo(() => {
        return cart.dishes.reduce((total, item) => total + (item.dish.price * item.quantity), 0);
    }, [cart]);

    const handleRemoveFromCart = (dishId: string) => {
        dispatch(removeFromCart({ _id: dishId }));
    };

    const handleUpdateQuantity = (dishId: string, quantity: number) => {
        dispatch(updateQuantity({ _id: dishId, quantity }));
    }

    const handleCreateOrder = React.useCallback( async () => {
        const dishes = cart.dishes.map(item => ({
            dishId: item.dish._id,
            quantity: item.quantity,
            price: item.dish.price,
        }));
        const restaurantId = cart.dishes[0].dish.restaurantId;

        const userId = user?.id ?? '';

        const orderData = {
            userId: userId,
            restaurantId,
            dishes,
            deliveryAddress: address,
            totalAmount: totalPrice,
        };

        console.log(orderData);

        try {
            const response = await createOrder(orderData).unwrap();
            console.log("Order created successfully:", response);
            // Optionally, you can clear the cart after successful order creation
            dispatch(clearCart()); // Clear the cart
            setAddress(""); // Reset the address field
            setOpenDialog(false); // Close the dialog
            setDrawerOpen(false); // Close the drawer

            toast.success("Order created successfully");
        } catch (error) {
            console.error("Failed to create order:", error);
            toast.error("Failed to create order");
        }
    }, [createOrder, cart, address, totalPrice, user, dispatch]);

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerTrigger asChild>
                <Button variant="default" size="navbar" effect="shineHover">
                    <ShoppingCart />
                    Panier • {totalItems}
                </Button>
            </DrawerTrigger>
            {totalItems == 0 ? (
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
                <DrawerContent className="min-w-[500px]">
                    <DrawerClose asChild className="absolute left-5 top-[-1rem]">
                        <Button variant="secondary" size="icon" effect="shineHover" className="mt-10">
                            <X />
                        </Button>
                    </DrawerClose>

                    <div className="mt-20 px-3 flex flex-col gap-4 h-full overflow-y-auto">
                        {cart.dishes.map((item, index) => (
                            <div key={index} className="flex flex-row gap-2 px-2 items-center">
                                <img src="/menu/crispy_naan_creamy.png" alt={item.dish.description} className="w-24 h-auto rounded-lg object-fit" />
                                <div className="flex flex-col gap-2 w-full">
                                    <span className="text-base font-semibold">{item.dish.name.toUpperCase()}</span>
                                    <div className="flex justify-between items-center gap-2">
                                        <div className="flex flex-col w-full">
                                            <div className="flex flex-wrap text-sm">
                                                <span className="underline whitespace-nowrap">Taille:</span>&nbsp;
                                                <span className="text-gray-600">M</span>
                                            </div>
                                        </div>

                                        <div className="flex h-min items-center select-none bg-accent rounded-full p-2 gap-4">
                                            {item.quantity > 1 ? (
                                                <Minus
                                                    size={16}
                                                    className="text-black cursor-pointer"
                                                    onClick={() => handleUpdateQuantity(item.dish._id, item.quantity - 1)}
                                                />
                                            ) : (
                                                <Trash
                                                    size={16}
                                                    className="text-black cursor-pointer"
                                                    onClick={() => handleRemoveFromCart(item.dish._id)}
                                                />
                                            )}
                                            <span className="font-medium">{item.quantity}</span>
                                            <Plus
                                                size={16}
                                                className="text-black cursor-pointer"
                                                onClick={() => handleUpdateQuantity(item.dish._id, item.quantity + 1)}
                                            />
                                        </div>
                                    </div>
                                    <span className="text-lg font-semibold">
                                        {(item.dish.price * item.quantity).toFixed(2)}€
                                    </span>
                                </div>
                            </div>
                        ))}

                        <div className="h-[1px] bg-gray-300 w-full mt-4"></div>
                        <div className="flex flex-row justify-between items-center">
                            <span className="text-lg font-semibold">Total :</span>
                            <span className="text-lg font-semibold">{totalPrice.toFixed(2)}€</span>
                        </div>
                    </div>

                    <DrawerFooter>
                        <Button onClick={() => setOpenDialog(true)}>Commander</Button>
                    </DrawerFooter>
                </DrawerContent>
            )}
        </Drawer>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Passer une commande
                    </DialogTitle>
                    <DialogDescription>
                        Complétez les informations ci-dessous pour passer votre commande.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4 w-full">
                    <p className="text-3xl font-semibold text-center">{totalPrice.toFixed(2)}€</p>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="address">Adresse de livraison</Label>
                        <Input
                            id="address"
                            type="text"
                            placeholder="Entrez votre adresse de livraison"
                            className="w-full"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <Button variant="outline" onClick={() => setOpenDialog(false)}>
                            <ChevronLeft />
                            Retour
                        </Button>

                        <Button onClick={() => {
                            handleCreateOrder();
                            setOpenDialog(false);
                        }}>
                            Commander <ChevronRight />
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}