"use client"

import { useState } from "react"
import { Search, Plus, Pencil, Trash2, MoreHorizontal, UserCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/layout/add-dashboard-layout"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Types
interface User {
  id: number
  username: string
  name: string
  email: string
  role: "admin" | "teacher" | "student"
  status: "actif" | "inactif"
  avatar: string
}

// Données initiales
const initialUsers: User[] = [
  {
    id: 1,
    username: "noureddine_a",
    name: "Noureddine Amrani",
    email: "noureddine.a@email.com",
    role: "admin",
    status: "actif",
    avatar: "/image.png",
  },
  {
    id: 2,
    username: "meryem_b",
    name: "Meryem Benjelloun",
    email: "meryem.b@email.com",
    role: "teacher",
    status: "actif",
    avatar: "/image.png",
  },
  {
    id: 3,
    username: "abdelkarim_h",
    name: "Abdelkarim Hafidi",
    email: "abdelkarim.h@email.com",
    role: "student",
    status: "inactif",
    avatar: "/image.png",
  },
  {
    id: 4,
    username: "fatima_z",
    name: "Fatima-Zahra Mansouri",
    email: "fatima.z@email.com",
    role: "teacher",
    status: "actif",
    avatar: "/image.png",
  },
  {
    id: 5,
    username: "youssef_k",
    name: "Youssef Kassimi",
    email: "youssef.k@email.com",
    role: "student",
    status: "actif",
    avatar: "/image.png",
  },
]

const roleColors: Record<string, string> = {
  admin: "bg-red-100 text-red-700 hover:bg-red-100",
  teacher: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  student: "bg-green-100 text-green-700 hover:bg-green-100",
}

const roleLabels: Record<string, string> = {
  admin: "Admin",
  teacher: "Enseignant",
  student: "Étudiant",
}

const statusColors: Record<string, string> = {
  actif: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  inactif: "bg-gray-100 text-gray-600 hover:bg-gray-100",
}

const defaultFormData = {
  username: "",
  name: "",
  email: "",
  role: "student" as const,
  status: "actif" as const,
  avatar: "",
}

export default function UsersManagementPage() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [searchQuery, setSearchQuery] = useState("")

  // Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Form state
  const [formData, setFormData] = useState(defaultFormData)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handlers
  const handleAdd = () => {
    const newUser: User = {
      id: Math.max(...users.map((u) => u.id), 0) + 1,
      ...formData,
      avatar: formData.avatar || `/placeholder.svg?height=40&width=40&query=${formData.name} avatar`,
    }
    setUsers([...users, newUser])
    setFormData(defaultFormData)
    setIsAddDialogOpen(false)
  }

  const handleEdit = () => {
    if (!selectedUser) return
    setUsers(
      users.map((u) => (u.id === selectedUser.id ? { ...u, ...formData, avatar: formData.avatar || u.avatar } : u)),
    )
    setFormData(defaultFormData)
    setSelectedUser(null)
    setIsEditDialogOpen(false)
  }

  const handleDelete = () => {
    if (!selectedUser) return
    setUsers(users.filter((u) => u.id !== selectedUser.id))
    setSelectedUser(null)
    setIsDeleteDialogOpen(false)
  }

  const openEditDialog = (user: User) => {
    setSelectedUser(user)
    setFormData({
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      avatar: user.avatar,
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (user: User) => {
    setSelectedUser(user)
    setIsDeleteDialogOpen(true)
  }

  return (
   <DashboardLayout> 
    <div className="min-h-screen bg-muted/30 p-6 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Gestion des Utilisateurs</h1>
            <p className="text-sm text-muted-foreground">Gérez les utilisateurs de votre plateforme</p>
          </div>
          <Button className="gap-2" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            Ajouter
          </Button>
        </div>

        {/* Card avec Table */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-lg font-medium">Liste des utilisateurs</CardTitle>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un utilisateur..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-12">Avatar</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="w-20 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        Aucun utilisateur trouvé.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-muted/30">
                        <TableCell>
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback className="text-xs font-medium">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell className="font-mono text-sm text-muted-foreground">@{user.username}</TableCell>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell className="text-muted-foreground">{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={roleColors[user.role]}>
                            {roleLabels[user.role]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={statusColors[user.status]}>
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => openEditDialog(user)}>
                                <Pencil className="h-4 w-4" />
                                Modifier
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="gap-2 cursor-pointer text-destructive focus:text-destructive"
                                onClick={() => openDeleteDialog(user)}
                              >
                                <Trash2 className="h-4 w-4" />
                                Supprimer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              {filteredUsers.length} utilisateur{filteredUsers.length > 1 ? "s" : ""} trouvé
              {filteredUsers.length > 1 ? "s" : ""}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialog Ajout */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserCircle className="h-5 w-5" />
              Ajouter un utilisateur
            </DialogTitle>
            <DialogDescription>Remplissez les informations pour créer un nouvel utilisateur.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="add-avatar">URL de l'avatar (optionnel)</Label>
             <Input
      id="add-avatar"
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setFormData({ ...formData, avatar: reader.result as string });
          };
          reader.readAsDataURL(file); 
        }
      }}
    />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="add-username">Nom d'utilisateur</Label>
              <Input
                id="add-username"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="add-name">Nom complet</Label>
              <Input
                id="add-name"
                placeholder="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="add-email">Email</Label>
              <Input
                id="add-email"
                type="email"
                placeholder="noure.ddine@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Rôle</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value: "admin" | "teacher" | "student") => setFormData({ ...formData, role: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Étudiant</SelectItem>
                    <SelectItem value="teacher">Enseignant</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Statut</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "actif" | "inactif") => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="actif">Actif</SelectItem>
                    <SelectItem value="inactif">Inactif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setFormData(defaultFormData)
                setIsAddDialogOpen(false)
              }}
            >
              Annuler
            </Button>
            <Button onClick={handleAdd} disabled={!formData.username || !formData.name || !formData.email}>
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Modification */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Pencil className="h-5 w-5" />
              Modifier l'utilisateur
            </DialogTitle>
            <DialogDescription>Modifiez les informations de l'utilisateur.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-avatar">URL de l'avatar</Label>
              <Input
                id="edit-avatar"
                placeholder="https://example.com/avatar.png"
                value={formData.avatar}
                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-username">Nom d'utilisateur</Label>
              <Input
                id="edit-username"
                placeholder="jdupont"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Nom complet</Label>
              <Input
                id="edit-name"
                placeholder="Jean Dupont"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                placeholder="jean.dupont@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Rôle</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value: "admin" | "teacher" | "student") => setFormData({ ...formData, role: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Étudiant</SelectItem>
                    <SelectItem value="teacher">Enseignant</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Statut</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "actif" | "inactif") => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="actif">Actif</SelectItem>
                    <SelectItem value="inactif">Inactif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setFormData(defaultFormData)
                setSelectedUser(null)
                setIsEditDialogOpen(false)
              }}
            >
              Annuler
            </Button>
            <Button onClick={handleEdit} disabled={!formData.username || !formData.name || !formData.email}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Suppression */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-4">
                <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.</p>
                {selectedUser && (
                  <div className="flex items-center gap-3 rounded-lg border bg-muted/50 p-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedUser.avatar || "/placeholder.svg"} alt={selectedUser.name} />
                      <AvatarFallback>
                        {selectedUser.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{selectedUser.name}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        @{selectedUser.username} • {selectedUser.email}
                      </p>
                    </div>
                    <Badge variant="secondary" className={roleColors[selectedUser.role]}>
                      {roleLabels[selectedUser.role]}
                    </Badge>
                  </div>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedUser(null)}>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
 </DashboardLayout>
    
  )
}
