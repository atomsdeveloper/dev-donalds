import { useContext } from "react";

import { Sheet, SheetContent } from "@/components/ui/sheet";

import { CartContext } from "../../contexts/cart";

const CartSheet = () => {
    const {isOpen, toggleIsOpen, products} = useContext(CartContext)
    return ( 
        <Sheet open={isOpen} onOpenChange={toggleIsOpen}>
            <SheetContent>
                Cart Is Open
            </SheetContent>
            {products.map((product) => (
                <h1 key={product.id}>{product.name}</h1>
            ))}
        </Sheet>
    );
}
 
export default CartSheet;