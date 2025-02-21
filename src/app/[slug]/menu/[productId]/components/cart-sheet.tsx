import { useContext } from "react";

import { Sheet, SheetContent } from "@/components/ui/sheet";

import { CartContext } from "../../contexts/cart";

const CartSheet = () => {
    const {isOpen, toggleIsOpen} = useContext(CartContext)
    return ( 
        <Sheet open={isOpen} onOpenChange={toggleIsOpen}>
            <SheetContent>
                Cart Is Open
            </SheetContent>
        </Sheet>
    );
}
 
export default CartSheet;