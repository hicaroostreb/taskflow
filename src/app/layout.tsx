"use client";

import { useState } from "react";
import { SessionContextProvider as SupabaseProvider } from "@supabase/auth-helpers-react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Header from "@/components/layout/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <html lang="pt-BR">
      <body>
        <SupabaseProvider supabaseClient={supabaseClient}>
          <Header />
          {children}
        </SupabaseProvider>
      </body>
    </html>
  );
}
