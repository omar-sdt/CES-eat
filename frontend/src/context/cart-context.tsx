"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { MenuSelectedItem } from "@/schemas/menuSelectedItemSchema";

// Définition du contexte du panier avec MenuSelectedItem
interface CartContextType {
    cart: MenuSelectedItem[];
    addToCart: (item: MenuSelectedItem) => void;
    removeFromCart: (restaurantId: string, itemName: string) => void;
    updateQuantity: (restaurantId: string, itemName: string, amount: number) => void;
    clearCart: () => void;
}

// Création du contexte avec une valeur par défaut
const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
    const [cart, setCart] = useState<MenuSelectedItem[]>([]);

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

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart
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