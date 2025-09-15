"use client";

import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      // redireciona para login se não estiver autenticado
      router.replace("/signin");
    }
  }, [user, router]);

  if (!user) {
    // enquanto verifica, não renderiza nada ou pode colocar um loading simples
    return null;
  }

  return <>{children}</>;
}
