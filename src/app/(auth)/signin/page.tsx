"use client";

import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function SignIn() {
  const supabase = useSupabaseClient();
  const [email, setEmail] = useState("");

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) alert(error.message);
    else alert("E-mail de login enviado!");
  };

  return (
    <div>
      <h1>Entrar</h1>
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSignIn}>Enviar link para entrar</button>
    </div>
  );
}
