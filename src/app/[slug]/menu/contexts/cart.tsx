"use client"

import { Products } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

interface CartProduct extends Products {
    quantity: number;
}

export interface ICartContext {
    isOpen: boolean;
    products: CartProduct[];
    toggleIsOpen: () => void;
}

export const CartContext = createContext<ICartContext>({
    isOpen: false,
    products: [],
    toggleIsOpen: () => {},
})

interface ChildrenProps {
    children: ReactNode;
}

export const CartProvider = ({children}: ChildrenProps) => {
    // _setProducts not is used
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [products, _setProducts] = useState<CartProduct[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggleIsOpen = () => {
        setIsOpen(prev => !prev)
    }

    return (
        <CartContext.Provider value={{
            isOpen,
            products,
            toggleIsOpen
        }}>
            {children}
        </CartContext.Provider>
    )

}