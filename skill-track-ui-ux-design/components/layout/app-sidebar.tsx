"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Logo } from "@/components/ui/logo"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LayoutDashboard,
  Target,
  BookOpen,
  Award,
  Lightbulb,
  User,
  Settings,
  Trophy,
  TrendingUp,
  LogOut,
} from "lucide-react"
const navigation = [
  {
    title: "Principal",
    items: [
      { title: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard ,roles: ["student", "teacher", "admin"]},
      { title: "Mes compétences", href: "/skills", icon: Award ,roles: ["student", "teacher", "admin"]},
      { title: "Parcours académique", href: "/academic", icon: BookOpen ,roles: ["student", "teacher", "admin"]},
      { title: "Roadmap carrière", href: "/roadmap", icon: Target ,roles: ["student", "teacher", "admin"]},
    ],
  },
  {
    title: "Apprentissage",
    items: [
      { title: "Recommandations IA", href: "/recommendations", icon: Lightbulb, roles: ["student"] },
      { title: "Mes formations", href: "/learning", icon: TrendingUp, roles: ["student"] },
    ],
  },
  {
    title: "Profil",
    items: [
      { title: "Mon portfolio", href: "/portfolio", icon: Trophy ,roles: ["student", "teacher", "admin"]},
      { title: "Mon profil", href: "/profile", icon: User ,roles: ["student", "teacher", "admin"]},
      { title: "Paramètres", href: "/settings", icon: Settings ,roles: ["student", "teacher", "admin"]},
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter();
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const handleLogout = () => {

    // 1. On vide la session locale
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    // 2. On redirige vers la page de login
    router.push("/login");
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center justify-between">
          <Logo size="sm" />
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      <SidebarContent>
        {navigation.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  if (item.roles && !item.roles.includes(user?.role)) return null;
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link href={item.href}>
                          <Icon className="w-4 h-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-sidebar-accent transition-colors">
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Badge className="absolute -bottom-1 -right-1 h-5 px-1.5 text-xs bg-primary">12</Badge>
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-sm">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-muted-foreground">2450 XP • Niveau 12</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile">
                <User className="w-4 h-4 mr-2" />
                Profil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <Settings className="w-4 h-4 mr-2" />
                Paramètres
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive cursor-pointer" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
