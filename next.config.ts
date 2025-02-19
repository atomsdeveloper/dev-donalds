import type { NextConfig } from "next";

/* config options here */
const nextConfig: NextConfig = {
  // Configurando imagens para que o next aceite as imagens vindas desse host.
  images: {
    remotePatterns: [{ hostname: "u9a6wmr3as.ufs.sh" }],
  },
};

export default nextConfig;
