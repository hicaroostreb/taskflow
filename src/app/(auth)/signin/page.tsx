"use client";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'

export default function SignIn() {
  const supabase = createClientComponentClient()
  const [email, setEmail] = useState("")

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) alert(error.message)
    else alert("E-mail de login enviado!")
  }

  return (
    <div>
      <h1>Entrar</h1>
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button onClick={handleSignIn}>Enviar link para entrar</button>
    </div>
  )
}
