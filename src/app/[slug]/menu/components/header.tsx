"use client";

import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { notFound, useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface RestaurantHeaderProps {
  restaurant: Pick<Restaurant, "name" | "coverImageUrl">;
}

const RestaurantHeader = ({ restaurant }: RestaurantHeaderProps) => {
  const router = useRouter();
  const {slug} = useParams<{slug: string}>();

  if(!restaurant) {
    return notFound;
  }
  const handleBackClick = () => router.back();

  const handleOrdersClick = () => router.push(`/${slug}/orders`)

  return (
    <div className="relative h-[250px] w-full">
      <Button
        onClick={handleBackClick}
        variant="secondary"
        size="icon"
        className="absolute left-4 top-4 z-50 rounded-full"
      > 
        <ChevronLeftIcon />
      </Button>
      <Image
        src={restaurant.coverImageUrl}
        alt={restaurant.name}
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
};
export default RestaurantHeader;
