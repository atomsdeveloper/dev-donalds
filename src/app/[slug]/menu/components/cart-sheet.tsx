import { useContext } from "react";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { CartContext } from "../contexts/cart";
import CartProductItem from "./cart-item";

const CartSheet = () => {
    const {isOpen, toggleIsOpen, productsCart} = useContext(CartContext)
    return ( 
        <Sheet open={isOpen} onOpenChange={toggleIsOpen}>
            <SheetContent aria-description="" className="w-[80%]">
                <SheetHeader>
                    <SheetTitle className="text-sm"> Cart Is Open </SheetTitle>
                </SheetHeader>
                <div className="py-5">
                    {productsCart.map((product) => (
                        <CartProductItem key={product.id} product={product} />
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
}
 
export default CartSheet;