"use client";

import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "@/styles/header.css";

export default function Header() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Erro ao sair: " + error.message);
      return;
    }
    router.push("/signin");
  };

  if (!user) {
    // Não mostra o header quando não há usuário logado
    return null;
  }

  return (
    <header>
      <nav>
        <Link href="/projects">
          Projetos
        </Link>
        <Link href="/dashboard">
          Dashboard
        </Link>
      </nav>
      <button
        onClick={handleLogout}
      >
        Sair
      </button>
    </header>
  );
}
