"use client";

import { useState } from "react";
import { createSupabaseClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const supabase = createSupabaseClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email: string) => {
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleSignUp = async () => {
    if (!validateEmail(email)) {
      setErrorMessage("Por favor, insira um email válido.");
      return;
    }
    if (!validatePassword(password)) {
      setErrorMessage("A senha precisa ter no mínimo 8 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/projects`,
      },
    });
    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
    } else {
      alert(
        "Cadastro realizado! Verifique seu email para confirmação e depois faça login."
      );
      router.push("/signin");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSignUp();
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Criar Conta</h1>
        <p>Comece a organizar seus projetos hoje</p>

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
          placeholder="Senha (mínimo 8 caracteres)"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMessage("");
          }}
          disabled={loading}
          className="auth-input"
          required
        />

        <input
          type="password"
          placeholder="Confirme sua senha"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setErrorMessage("");
          }}
          disabled={loading}
          className="auth-input"
          required
        />

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <button disabled={loading || !email || !password || !confirmPassword} className="auth-button" type="submit">
          {loading ? "Cadastrando..." : "Criar conta"}
        </button>

        <div className="auth-footer">
          <p>
            Já tem conta? <Link href="/signin">Faça login aqui</Link>
          </p>
          <Link href="/">← Voltar ao início</Link>
        </div>
      </form>
    </div>
  );
}
