"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para a rota atual + /dev-donalds
    router.push(`/dev-donalds`);
  }, [router]);

  return <div className="">Home Page</div>;
};

export default HomePage;
