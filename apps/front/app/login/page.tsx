"use client";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import { useState } from "react";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
    ) {
    event.preventDefault();

    setErro("");

    if (!email.endsWith("@aluno.unb.br") &&
        !email.endsWith("@unb.br")) {

        setErro("Utilize um email institucional da UnB.");

        return;
    }

    try {

        setLoading(true);

        const response = await fetch(
        "http://localhost:3000/auth/login",
        {
            method: "POST",

            headers: {
            "Content-Type": "application/json",
            },

            body: JSON.stringify({
            email,
            senha,
            }),
        }
        );

        if (!response.ok) {
        setErro("Email ou senha incorretos.");
        return;
        }

        const data = await response.json();

        console.log(data);

        // depois colocamos o redirect

    } catch (error) {

        setErro("Erro ao conectar com o servidor.");

    } finally {

        setLoading(false);

    }}

    return (
        <AuthLayout>
        <div className="w-full max-w-md">
            <h1 className="text-5xl font-bold text-[#18335F] text-center mb-16">
            Bem Vindo!
            </h1>

            <form
            onSubmit={handleSubmit}
            className="space-y-6"
            >
            <div>
                <label className="block mb-2">
                Email
                </label>

                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
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

            {erro && (
            <p className="text-center text-red-600 text-sm">
                {erro}
            </p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="
                    w-full
                    rounded-full
                    bg-green-800
                    py-3
                    text-white
                    font-semibold
                    disabled:opacity-50
                "
                >
                {loading ? "Entrando..." : "Login"}
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