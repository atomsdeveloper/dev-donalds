"use client"

import { Products } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

// Pegando somente as propriedades que são necessárias.
interface ProductsHeaderProps {
    product: Pick<Products, "name" | "imageUrl">
}

const ProductsHeader = ({product}: ProductsHeaderProps) => {
    const {slug} = useParams<{slug: string}>();
    const router = useRouter();

    const handleBackClick = () => router.back();
    const handleOrdersClick = () => router.push(`/${slug}/orders`);

    return ( 
        <div className="relative min-h-[300px] w-full">
            <Button
                onClick={handleBackClick}
                variant="secondary"
                size="icon"
                className="absolute left-4 top-4 z-50 rounded-full"
            >
                <ChevronLeftIcon />
            </Button>

            <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-contain"
            />
            
            <Button
                variant="secondary"
                size="icon"
                className="absolute right-4 top-4 z-50 rounded-full"
                onClick={handleOrdersClick}
            >
                <ScrollTextIcon />
            </Button>
        </div>
     );
}
 
export default ProductsHeader;