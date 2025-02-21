import { useContext } from "react";

import { Sheet, SheetContent } from "@/components/ui/sheet";

import { CartContext } from "../../contexts/cart";

const CartSheet = () => {
    const {isOpen, toggleIsOpen, productsCart} = useContext(CartContext)
    return ( 
        <Sheet open={isOpen} onOpenChange={toggleIsOpen}>
            <SheetContent>
                Cart Is Open
            </SheetContent>
            {productsCart.map((product) => (
                <h1 key={product.id}>{product.name} - {product.quantity}</h1>
            ))}
        </Sheet>
    );
}
 
export default CartSheet;