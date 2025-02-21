"use client"

import { Products } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

interface CartProduct extends Pick<Products, "id" | "name" | "price" | "imageUrl"> {
    quantity: number;
}

export interface ICartContext {
    isOpen: boolean;
    products: CartProduct[];
    toggleIsOpen: () => void;
    addProduct: (product: CartProduct) => void;
}

export const CartContext = createContext<ICartContext>({
    isOpen: false,
    products: [],
    toggleIsOpen: () => {},
    addProduct: () => {}
})

interface ChildrenProps {
    children: ReactNode;
}

export const CartProvider = ({children}: ChildrenProps) => {
    const [products, setProducts] = useState<CartProduct[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggleIsOpen = () => {
        setIsOpen(prev => !prev)
    }

    // Adiciona o produto a array de produtos do Cart.
    const addProduct = (product: CartProduct) => {
        // Retorna todos os produtos anteriores juntamente com o novo produto recebido.
        setProducts(prev => [...prev, product])
    }
    return (
        <CartContext.Provider value={{
            isOpen,
            products,
            toggleIsOpen,
            addProduct
        }}>
            {children}
        </CartContext.Provider>
    )

}