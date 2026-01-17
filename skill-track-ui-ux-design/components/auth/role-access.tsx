"use client"
import { useEffect, useState } from "react"

interface RoleAccessProps {
  children: React.ReactNode
  allowedRoles: ("student" | "teacher" | "admin")[]
}

export function RoleAccess({ children, allowedRoles }: RoleAccessProps) {
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setUserRole(user.role)
    }
  }, [])

  if (!userRole || !allowedRoles.includes(userRole as any)) {
    return null // On n'affiche rien si le rôle ne correspond pas
  }

  return <>{children}</>
}