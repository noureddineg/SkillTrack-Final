"use client"

import { useState } from "react"
import { Search, Plus, Pencil, Trash2, MoreHorizontal, Sparkles, Clock, BarChart3 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import { Textarea } from "@/components/ui/textarea"

// Types
type SkillCategory = "technical" | "soft_skill" | "language" | "tool" | "framework"
type SkillLevel = "debutant" | "intermediaire" | "avance" | "expert"
type SkillDifficulty = "facile" | "moyen" | "difficile" | "expert"

interface Skill {
  id: number
  name: string
  level: SkillLevel
  duration: string
  description: string
  difficulty: SkillDifficulty
  category: SkillCategory
}

// Données initiales
const initialSkills: Skill[] = [
  {
    id: 1,
    name: "React",
    level: "avance",
    duration: "6 mois",
    description: "Bibliothèque JavaScript pour créer des interfaces utilisateur",
    difficulty: "moyen",
    category: "framework",
  },
  {
    id: 2,
    name: "TypeScript",
    level: "intermediaire",
    duration: "3 mois",
    description: "Langage de programmation typé basé sur JavaScript",
    difficulty: "moyen",
    category: "technical",
  },
  {
    id: 3,
    name: "Communication",
    level: "expert",
    duration: "Continu",
    description: "Capacité à communiquer efficacement en équipe",
    difficulty: "facile",
    category: "soft_skill",
  },
  {
    id: 4,
    name: "Anglais",
    level: "avance",
    duration: "2 ans",
    description: "Maîtrise de la langue anglaise professionnelle",
    difficulty: "moyen",
    category: "language",
  },
  {
    id: 5,
    name: "Git",
    level: "avance",
    duration: "1 mois",
    description: "Système de contrôle de version distribué",
    difficulty: "facile",
    category: "tool",
  },
  {
    id: 6,
    name: "Next.js",
    level: "intermediaire",
    duration: "4 mois",
    description: "Framework React pour la production",
    difficulty: "difficile",
    category: "framework",
  },
]

const categoryColors: Record<SkillCategory, string> = {
  technical: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  soft_skill: "bg-purple-100 text-purple-700 hover:bg-purple-100",
  language: "bg-green-100 text-green-700 hover:bg-green-100",
  tool: "bg-orange-100 text-orange-700 hover:bg-orange-100",
  framework: "bg-cyan-100 text-cyan-700 hover:bg-cyan-100",
}

const categoryLabels: Record<SkillCategory, string> = {
  technical: "Technique",
  soft_skill: "Soft Skill",
  language: "Langue",
  tool: "Outil",
  framework: "Framework",
}

const levelColors: Record<SkillLevel, string> = {
  debutant: "bg-gray-100 text-gray-600 hover:bg-gray-100",
  intermediaire: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  avance: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  expert: "bg-red-100 text-red-700 hover:bg-red-100",
}

const levelLabels: Record<SkillLevel, string> = {
  debutant: "Débutant",
  intermediaire: "Intermédiaire",
  avance: "Avancé",
  expert: "Expert",
}

const difficultyColors: Record<SkillDifficulty, string> = {
  facile: "bg-green-100 text-green-700 hover:bg-green-100",
  moyen: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  difficile: "bg-orange-100 text-orange-700 hover:bg-orange-100",
  expert: "bg-red-100 text-red-700 hover:bg-red-100",
}

const difficultyLabels: Record<SkillDifficulty, string> = {
  facile: "Facile",
  moyen: "Moyen",
  difficile: "Difficile",
  expert: "Expert",
}

const defaultFormData: Omit<Skill, "id"> = {
  name: "",
  level: "debutant",
  duration: "",
  description: "",
  difficulty: "facile",
  category: "technical",
}

export default function SkillsManagementPage() {
  const [skills, setSkills] = useState<Skill[]>(initialSkills)
  const [searchQuery, setSearchQuery] = useState("")

  // Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Form state
  const [formData, setFormData] = useState(defaultFormData)
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)

  const filteredSkills = skills.filter(
    (skill) =>
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      categoryLabels[skill.category].toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handlers
  const handleAdd = () => {
    const newSkill: Skill = {
      id: Math.max(...skills.map((s) => s.id), 0) + 1,
      ...formData,
    }
    setSkills([...skills, newSkill])
    setFormData(defaultFormData)
    setIsAddDialogOpen(false)
  }

  const handleEdit = () => {
    if (!selectedSkill) return
    setSkills(skills.map((s) => (s.id === selectedSkill.id ? { ...s, ...formData } : s)))
    setFormData(defaultFormData)
    setSelectedSkill(null)
    setIsEditDialogOpen(false)
  }

  const handleDelete = () => {
    if (!selectedSkill) return
    setSkills(skills.filter((s) => s.id !== selectedSkill.id))
    setSelectedSkill(null)
    setIsDeleteDialogOpen(false)
  }

  const openEditDialog = (skill: Skill) => {
    setSelectedSkill(skill)
    setFormData({
      name: skill.name,
      level: skill.level,
      duration: skill.duration,
      description: skill.description,
      difficulty: skill.difficulty,
      category: skill.category,
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (skill: Skill) => {
    setSelectedSkill(skill)
    setIsDeleteDialogOpen(true)
  }

  return (
    <DashboardLayout> 
    <div className="min-h-screen bg-muted/30 p-6 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Gestion des Compétences</h1>
            <p className="text-sm text-muted-foreground">Gérez les compétences de votre plateforme</p>
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
              <CardTitle className="text-lg font-medium">Liste des compétences</CardTitle>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Rechercher une compétence..."
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
                    <TableHead>Nom</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Niveau</TableHead>
                    <TableHead>Difficulté</TableHead>
                    <TableHead>Durée</TableHead>
                    <TableHead className="max-w-[200px]">Description</TableHead>
                    <TableHead className="w-20 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSkills.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        Aucune compétence trouvée.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSkills.map((skill) => (
                      <TableRow key={skill.id} className="hover:bg-muted/30">
                        <TableCell className="font-medium">{skill.name}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={categoryColors[skill.category]}>
                            {categoryLabels[skill.category]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={levelColors[skill.level]}>
                            {levelLabels[skill.level]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={difficultyColors[skill.difficulty]}>
                            {difficultyLabels[skill.difficulty]}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {skill.duration}
                          </span>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate text-muted-foreground" title={skill.description}>
                          {skill.description}
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
                              <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => openEditDialog(skill)}>
                                <Pencil className="h-4 w-4" />
                                Modifier
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="gap-2 cursor-pointer text-destructive focus:text-destructive"
                                onClick={() => openDeleteDialog(skill)}
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
              {filteredSkills.length} compétence{filteredSkills.length > 1 ? "s" : ""} trouvée
              {filteredSkills.length > 1 ? "s" : ""}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialog Ajout */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Ajouter une compétence
            </DialogTitle>
            <DialogDescription>Remplissez les informations pour créer une nouvelle compétence.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="add-name">Nom de la compétence</Label>
              <Input
                id="add-name"
                placeholder="Ex: React, Communication, Anglais..."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Catégorie</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: SkillCategory) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technique</SelectItem>
                    <SelectItem value="soft_skill">Soft Skill</SelectItem>
                    <SelectItem value="language">Langue</SelectItem>
                    <SelectItem value="tool">Outil</SelectItem>
                    <SelectItem value="framework">Framework</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Niveau</Label>
                <Select
                  value={formData.level}
                  onValueChange={(value: SkillLevel) => setFormData({ ...formData, level: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debutant">Débutant</SelectItem>
                    <SelectItem value="intermediaire">Intermédiaire</SelectItem>
                    <SelectItem value="avance">Avancé</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Difficulté</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value: SkillDifficulty) => setFormData({ ...formData, difficulty: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="facile">Facile</SelectItem>
                    <SelectItem value="moyen">Moyen</SelectItem>
                    <SelectItem value="difficile">Difficile</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="add-duration">Durée d'apprentissage</Label>
                <Input
                  id="add-duration"
                  placeholder="Ex: 3 mois, 1 an..."
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="add-description">Description</Label>
              <Textarea
                id="add-description"
                placeholder="Décrivez cette compétence..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
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
            <Button onClick={handleAdd} disabled={!formData.name || !formData.duration}>
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Modification */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Pencil className="h-5 w-5" />
              Modifier la compétence
            </DialogTitle>
            <DialogDescription>Modifiez les informations de la compétence.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Nom de la compétence</Label>
              <Input
                id="edit-name"
                placeholder="Ex: React, Communication, Anglais..."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Catégorie</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: SkillCategory) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technique</SelectItem>
                    <SelectItem value="soft_skill">Soft Skill</SelectItem>
                    <SelectItem value="language">Langue</SelectItem>
                    <SelectItem value="tool">Outil</SelectItem>
                    <SelectItem value="framework">Framework</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Niveau</Label>
                <Select
                  value={formData.level}
                  onValueChange={(value: SkillLevel) => setFormData({ ...formData, level: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debutant">Débutant</SelectItem>
                    <SelectItem value="intermediaire">Intermédiaire</SelectItem>
                    <SelectItem value="avance">Avancé</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Difficulté</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value: SkillDifficulty) => setFormData({ ...formData, difficulty: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="facile">Facile</SelectItem>
                    <SelectItem value="moyen">Moyen</SelectItem>
                    <SelectItem value="difficile">Difficile</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-duration">Durée d'apprentissage</Label>
                <Input
                  id="edit-duration"
                  placeholder="Ex: 3 mois, 1 an..."
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                placeholder="Décrivez cette compétence..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setFormData(defaultFormData)
                setSelectedSkill(null)
                setIsEditDialogOpen(false)
              }}
            >
              Annuler
            </Button>
            <Button onClick={handleEdit} disabled={!formData.name || !formData.duration}>
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
                <p>Êtes-vous sûr de vouloir supprimer cette compétence ? Cette action est irréversible.</p>
                {selectedSkill && (
                  <div className="rounded-lg border bg-muted/50 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{selectedSkill.name}</span>
                      <Badge variant="secondary" className={categoryColors[selectedSkill.category]}>
                        {categoryLabels[selectedSkill.category]}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <BarChart3 className="h-3 w-3" />
                        {levelLabels[selectedSkill.level]}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {selectedSkill.duration}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedSkill.description}</p>
                  </div>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedSkill(null)}>Annuler</AlertDialogCancel>
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
