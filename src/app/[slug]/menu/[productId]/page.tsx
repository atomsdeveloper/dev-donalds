import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ProductsHeader from "./components/products-header";

interface ProductsPageProps {
    params: Promise<{slug: string, productId: string}>
}

const ProductsPage = async ({params}: ProductsPageProps) => {
    const {slug, productId} = await params;
    const products = await db.products.findUnique({where: {id: productId}})
    if(!products) {
        return notFound
    }

    return ( 
      <>
        {slug}
        <ProductsHeader product={products}/>
      </>
    );
}
 
export default ProductsPage;