import Image from "next/image";

export default function AuthBanner() {
  return (
    <section className="hidden md:flex flex-col items-center justify-center bg-[#003366] relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 bg-[url('/fundoGeometrico.svg')] bg-[length:100%] bg-[position:0%_35%] bg-no-repeat" />
      <div className="relative z-10 bg-white p-8 rounded-xl shadow-2xl">
        <Image
          src="/logoConecta.svg"
          alt="Logo Conecta UnB"
          width={250}
          height={250}
          priority
          className="w-auto h-auto"
        />
      </div>
    </section>
  );
}