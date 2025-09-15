"use client";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [supabaseClient] = useState(() => createClientComponentClient())

  return (
    <html lang="en">
      <body>
          {children}
      </body>
    </html>
  )
}
