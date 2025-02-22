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
    decreaseQuantityProductCart: (productId: string) => void
}

export const CartContext = createContext<ICartContext>({
    isOpen: false,
    productsCart: [],
    toggleIsOpen: () => {},
    addProductCart: () => {},
    decreaseQuantityProductCart: () => {}
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
                return productCart
            })
        })
    }

    const decreaseQuantityProductCart = (productId: string) => {
        setProductsCart(productsCart => {
            // Percorre os produtos do carrinho
            return productsCart.map(productCart => {
                // Verifica se o produto atual percorrido dentro de produtos tem o id diferente do id recebido.
                if(productCart.id !== productId) {
                    // Se for diferente não reliza nenhuma ação
                    return productCart
                }
                // Verifica se a quantidade do produto é 1
                if(productCart.quantity === 1) {
                    // Se for igual 1 não realiza nehuma ação
                    return productCart
                }

                // Passado das validações acima que dizer que posso diminuir a quantidade do carrinhp
                return {...productCart, quantity: productCart.quantity - 1};
            })
        })
    }
    return (
        <CartContext.Provider value={{
            isOpen,
            productsCart,
            toggleIsOpen,
            addProductCart,
            decreaseQuantityProductCart
        }}>
            {children}
        </CartContext.Provider>
    )

}