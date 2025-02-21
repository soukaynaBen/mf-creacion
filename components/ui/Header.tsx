'use client';

import { useUser } from "@clerk/nextjs"

function Header() {

  const { user } = useUser()

  return (
    <div className="">Header</div>
  )
}

export default Header