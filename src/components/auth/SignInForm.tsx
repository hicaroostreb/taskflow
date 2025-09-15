"use client";

import { useState } from "react";
import { createSupabaseClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const supabase = createSupabaseClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email: string) => {
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  };

  const handleSignIn = async () => {
    if (!validateEmail(email)) {
      setErrorMessage("Por favor, insira um email válido.");
      return;
    }
    if (!password) {
      setErrorMessage("Por favor, insira sua senha.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      setErrorMessage("Email ou senha incorretos. Tente novamente.");
    } else {
      router.push("/projects");
    }
  };

  // Tratamento do submit do form (Enter ou botão)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSignIn();
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Entrar no TaskFlow</h1>
        <p>Digite suas credenciais para acessar sua conta</p>

        <input
          type="email"
          placeholder="Seu email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrorMessage("");
          }}
          disabled={loading}
          className="auth-input"
          required
        />

        <input
          type="password"
          placeholder="Sua senha"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMessage("");
          }}
          disabled={loading}
          className="auth-input"
          required
        />

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <button disabled={loading || !email || !password} className="auth-button" type="submit">
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <div className="auth-footer">
          <p>
            Não tem conta? <Link href="/signup">Cadastre-se aqui</Link>
          </p>
          <Link href="/">← Voltar ao início</Link>
        </div>
      </form>
    </div>
  );
}
