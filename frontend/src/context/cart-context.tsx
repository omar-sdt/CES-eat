"use client";
import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { MenuSelectedItem } from "@/schemas/menuSelectedItemSchema";

// Définition du contexte du panier avec MenuSelectedItem
interface CartContextType {
    cart: MenuSelectedItem[];
    addToCart: (item: MenuSelectedItem) => void;
    removeFromCart: (restaurantId: string, itemName: string) => void;
    updateQuantity: (restaurantId: string, itemName: string, amount: number) => void;
    clearCart: () => void;
    sousTotalPrice: number;
    reductionPrice: number;
    totalPrice: number;
    totalItems: number;

    deliveryPriorityPrice: number;
    isDeliveryPriority: boolean;
    setIsDeliveryPriority: (value: boolean) => void;

    isPromotionApply: boolean;
    setIsPromotionApply: (value: boolean) => void;
}

// Création du contexte avec une valeur par défaut
const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
    const [cart, setCart] = useState<MenuSelectedItem[]>([]);
    const [isDeliveryPriority, setIsDeliveryPriority] = useState<boolean>(false);
    const [isPromotionApply, setIsPromotionApply] = useState<boolean>(false);

    const deliveryPriorityPrice = 5.39; // Prix de la livraison prioritaire


    const addToCart = (product: MenuSelectedItem) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item =>
                item.id === product.id
            ));
            if (existingProduct) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item
                );
            }
            return [...prevCart, { ...product, quantity: product.quantity }];
        });
    };

    const removeFromCart = (restaurantId: string, itemId: string) => {
        setCart((prevCart) =>
            prevCart.filter((item) =>
                !(item.restaurantId === restaurantId && item.id === itemId)
            )
        );
    };

    const updateQuantity = (restaurantId: string, itemId: string, amount: number) => {
        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item.restaurantId === restaurantId && item.id === itemId
                        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const sousTotalPrice = useMemo(() => {
        return cart
            .reduce((total, item) => total + item.price * item.quantity, 0)
    }, [cart]);

    const reductionPrice = useMemo(() => {
        return sousTotalPrice * 0.1;
    }
        , [cart]);

    const totalPrice = useMemo(() => {
        let total = sousTotalPrice;
        if (isPromotionApply) {
            total -= reductionPrice;
        }
        if (isDeliveryPriority) {
            total += deliveryPriorityPrice;
        }
        return total;
    }
        , [sousTotalPrice, isPromotionApply, reductionPrice, isDeliveryPriority, deliveryPriorityPrice]);

    const totalItems = useMemo(() => {
        console.log(cart);
        return cart.reduce((total, item) => total + item.quantity, 0);
    }
        , [cart]);



    return (
        <CartContext.Provider value={{
            cart,
            totalItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            sousTotalPrice: Number(sousTotalPrice),
            reductionPrice: Number(reductionPrice),
            totalPrice: Number(totalPrice),
            isDeliveryPriority,
            setIsDeliveryPriority,
            isPromotionApply,
            setIsPromotionApply,
            deliveryPriorityPrice: Number(deliveryPriorityPrice),

        }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook personnalisé pour utiliser le panier
export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};