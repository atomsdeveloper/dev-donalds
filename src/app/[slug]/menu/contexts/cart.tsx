"use client"

import { Products } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CartProduct extends 
    Pick<Products, "id" | "name" | "price" | "imageUrl"> {
        quantity: number;   
    }

export interface ICartContext {
    isOpen: boolean;
    productsCart: CartProduct[];
    toggleIsOpen: () => void;
    addProductCart: (product: CartProduct) => void;
}

export const CartContext = createContext<ICartContext>({
    isOpen: false,
    productsCart: [],
    toggleIsOpen: () => {},
    addProductCart: () => {}
})

interface ChildrenProps {
    children: ReactNode;
}

export const CartProvider = ({children}: ChildrenProps) => {
    const [productsCart, setProductsCart] = useState<CartProduct[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Troca o valor atual do carrinho (true - false)
    const toggleIsOpen = () => {
        setIsOpen(prev => !prev)
    }

    // Adiciona o produto recebido ao array de produtos do carrinho.
    const addProductCart = (productReceive: CartProduct) => {

        // Verificar se o produto já está no carrinho
        const productIsAlreadyOnTheCart = productsCart.some(productCart => productCart.id === productReceive.id);
        
        // Se não estiver, adicionar ao carrinho
        if(!productIsAlreadyOnTheCart) {
            return setProductsCart(productsThatAlreadyCart => [...productsThatAlreadyCart, productReceive])
        }
    
        // Se ele estiver no carinho
        setProductsCart(productsCart => {
            // Percorre os produtos do carrinho
            return productsCart.map(productCart => {
                // Verifica qual o id do produto do carrinho é igual o id do produto recebido
                if(productCart.id === productReceive.id) {
                    return {
                        ...productCart,
                        // adiciona a quantida ao produto
                        quantity: productCart.quantity + productReceive.quantity
                    }
                }
                // 
                return productCart
            })
        })
    }
    return (
        <CartContext.Provider value={{
            isOpen,
            productsCart,
            toggleIsOpen,
            addProductCart
        }}>
            {children}
        </CartContext.Provider>
    )

}