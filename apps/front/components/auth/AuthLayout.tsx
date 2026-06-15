import Image from "next/image";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen flex">
      <section
        className="
          hidden
          md:flex
          w-1/2
          items-center
          justify-center
          bg-cover
          bg-center
        "
        style={{
          backgroundImage: "url('/textura.png')",
        }}
      >
        <Image
          src="/logo.png"
          alt="Conecta UnB"
          width={450}
          height={450}
        />
      </section>

      <section
        className="
          flex-1
          flex
          items-center
          justify-center
          bg-white
          px-8
        "
      >
        {children}
      </section>
    </main>
  );
}