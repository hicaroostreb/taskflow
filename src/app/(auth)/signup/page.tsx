"use client";

import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "@/styles/auth.css";

export default function SignUp() {
  const supabase = useSupabaseClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUpEmail = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      setErrorMessage(error.message);
    } else {
      alert("Cadastro realizado! Verifique seu email para confirmação.");
      router.push("/signin");
    }
  };

  const handleSignUpGoogle = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    setLoading(false);
    if (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="auth-container">
      <img src="/logo.svg" alt="Logo TaskFlow" style={{ width: 120, marginBottom: 24 }} />
      <h1 style={{ marginBottom: 8 }}>TaskFlow</h1>
      <p style={{ color: '#666', marginBottom: 24 }}>Organize seus projetos facilmente.</p>

      <button onClick={handleSignUpGoogle} disabled={loading} className="google-button">
        <svg width="20" height="20" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg" >
          <path fill="#4285F4" d="M533.5 278.4c0-17.4-1.4-34.1-4.3-50.3H272.1v95.3h146.1c-6.3 33.6-25 62.1-53.3 81.3v67.6h86.1c50.4-46.4 79.9-114.9 79.9-193.9z" />
          <path fill="#34A853" d="M272.1 544.3c72.9 0 134.2-24.1 178.8-65.4l-86.1-67.6c-23.9 16-54.6 25.3-92.7 25.3-71 0-131.2-47.9-152.8-112.3H30.3v70.4c44.5 88 135.8 149.6 241.8 149.6z" />
          <path fill="#FBBC05" d="M119.3 322.3c-8.7-26.4-8.7-54.8 0-81.2V170.7H30.3c-29.2 57.1-29.1 124.5 0 181.6l89-70z" />
          <path fill="#EA4335" d="M272.1 106.9c39.4-.6 77 14.7 105.9 42.3l79.3-79.3C395.5 24.1 334.2 0 272.1 0 166 0 74.7 61.6 30.3 149.6l89 70c21.6-64.4 81.8-112.3 152.8-112.3z" />
        </svg>
        Cadastrar com Google
      </button>

      <div className="separator">ou</div>

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
      />

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <button
        onClick={handleSignUpEmail}
        disabled={loading || !email || !password || !confirmPassword}
        className="auth-button"
      >
        {loading ? "Cadastrando..." : "Criar Conta"}
      </button>

      <p>
        Já tem conta? <Link href="/signin">Faça login aqui</Link>
      </p>
    </div>
  );
}
