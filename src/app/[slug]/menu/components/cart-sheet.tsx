import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext } from "../contexts/cart";
import CartProductItem from "./cart-product-item";

const CartSheet = () => {
    const {isOpen, toggleIsOpen, productsCart, total} = useContext(CartContext)
    return ( 
        <Sheet open={isOpen} onOpenChange={toggleIsOpen}>
            <SheetContent aria-description="" className="w-[80%]">
                <SheetHeader>
                    <SheetTitle className="text-sm"> Cart Is Open </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col h-full py-5">
                    <div className="flex-auto">
                        {productsCart.map((product) => (
                            <CartProductItem key={product.id} product={product} />
                        ))}
                    </div>

                    <Card className="mb-4">
                        <CardContent className="p-5">
                            <div className="flex-justify-between">
                                <p className="text-sm text-mudet-foreground">Total</p>
                                <p className="text-sm font-semibold">{formatCurrency(total)}</p>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Button className="w-full rounded-s-full">
                        Finalizar pedido
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
 
export default CartSheet;