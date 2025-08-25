"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    let mounted = true
    async function check() {
      try {
        const { data, error } = await supabase.auth.getUser()
        if (error || !data.user) {
          router.replace('/')
          return
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }
    check()
    return () => {
      mounted = false
    }
  }, [router])

  if (loading) {
    return (
      <div className="p-8 text-gray-600">Checking session…</div>
    )
  }

  return <>{children}</>
}
