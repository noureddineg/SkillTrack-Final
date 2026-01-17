"use client"
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // 1. Récupération du token depuis le localStorage
    const token = localStorage.getItem("token");
    
    // 2. Définition des accès libres (Pages que tout le monde peut voir)
    const publicPaths = ["/login", "/signup"
      // ,"/onboarding"
    ];
    const isPublicPath = publicPaths.includes(pathname);
    // 1. On définit quelles pages sont réservées à l'ADMIN
const adminPaths = ["/admin", "/users", "/competances", "/addsettings"];

// 2. On définit quelles pages sont réservées au STUDENT
const studentPaths = ["/dashboard", "/skills", "/academic", "/roadmap", "/recommendations", "/learning"];

// 3. Logique de redirection mise à jour
const user = JSON.parse(localStorage.getItem("user") || "{}");

if (!token && !isPublicPath) {
    setAuthorized(false);
    router.push("/login");
} 
else if (token && isPublicPath) {
    router.push(user.role === "admin" ? "/admin" : "/dashboard");
} 
else if (isPublicPath) {
    // Cas 3 : Page publique (login/signup) et pas de token
    // C'EST CETTE LIGNE QUI MANQUAIT pour afficher la page de login
    setAuthorized(true);
}
else if (token) {
    // SI UN STUDENT essaie d'aller sur une page ADMIN
    if (user.role === "student" && adminPaths.includes(pathname)) {
        router.push("/dashboard");
    } 
    // SI UN ADMIN essaie d'aller sur une page STUDENT
    else if (user.role === "admin" && studentPaths.includes(pathname)) {
        router.push("/admin");
    } 
    else {
        setAuthorized(true);
    }
}
  }, [pathname, router]);

  return authorized ? <>{children}</> : null;
}