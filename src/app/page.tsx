"use client"; // Certifique-se de que este componente é um componente do cliente

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para a rota atual + /dev-donalds
    router.push(`${window.location.pathname}/dev-donalds`);
  }, [router]);

  return <div className="">Home Page</div>;
};

export default HomePage;
