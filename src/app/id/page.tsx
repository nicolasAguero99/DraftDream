'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Commponents
import Nav from '@/components/nav'

function Page (): JSX.Element {
  const router = useRouter()
  const randomIdRoom = crypto.randomUUID()

  useEffect(() => {
    router.push(`/id/${randomIdRoom}`)
  }, [])

  return (
    <Nav />
  )
}

export default Page
