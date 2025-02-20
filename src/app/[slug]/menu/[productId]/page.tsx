import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ProductsDetails from "./components/products-details";
import ProductsHeader from "./components/products-header";

interface ProductsPageProps {
    params: Promise<{slug: string, productId: string}>
}

const ProductsPage = async ({params}: ProductsPageProps) => {
    const {slug, productId} = await params;
    const products = await db.products.findUnique({
      where: {id: productId}, 
      include: {
        restaurant: {
          select: {
            name: true,
            avatarImageUrl: true,
            slug: true
          }
        }
      }
    })

    if(!products) {
      return notFound
    }

    if(products.restaurant.slug.toUpperCase() !== slug.toUpperCase()) {
      return notFound;
    }

    return ( 
      <div className="flex h-full flex-col">
        <ProductsHeader product={products}/>
        <ProductsDetails product={products}/>
      </div>
    );
}
 
export default ProductsPage;