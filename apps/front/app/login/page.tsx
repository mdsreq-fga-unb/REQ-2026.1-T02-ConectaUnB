import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <h1 className="text-5xl font-bold text-[#18335F] text-center mb-16">
          Bem Vindo!
        </h1>

        <form className="space-y-6">
          <div>
            <label className="block mb-2">
              Email
            </label>

            <input
              type="email"
              className="
                w-full
                rounded-full
                border
                border-green-700
                px-4
                py-2
                outline-none
              "
            />
          </div>

          <div>
            <label className="block mb-2">
              Senha
            </label>

            <input
              type="password"
              className="
                w-full
                rounded-full
                border
                border-green-700
                px-4
                py-2
                outline-none
              "
            />
          </div>

          <Link
            href="/esqueci-senha"
            className="
              block
              text-center
              text-[#18335F]
              text-sm
            "
          >
            Esqueci minha senha
          </Link>

          <button
            type="submit"
            className="
              w-full
              rounded-full
              bg-green-800
              py-3
              text-white
              font-semibold
            "
          >
            Login
          </button>

          <Link
            href="/cadastro"
            className="
              block
              text-center
              text-[#18335F]
            "
          >
            Cadastre-se
          </Link>
        </form>
      </div>
    </AuthLayout>
  );
}