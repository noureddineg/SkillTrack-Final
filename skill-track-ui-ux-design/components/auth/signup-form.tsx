"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function SignupForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    
    // Vérification du mot de passe
    if (formData.get("password") !== formData.get("confirmPassword")) {
      setError("Les mots de passe ne correspondent pas");
      setIsLoading(false);
      return;
    }

    const userData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      username: formData.get("username"), // Ajouté pour MongoDB
      email: formData.get("email"),
      password: formData.get("password"),
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de l'inscription");
      }

      // Succès : Redirection vers le login
      router.push("/onboarding");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Créer un compte</CardTitle>
        <CardDescription>Commencez votre parcours vers l'excellence</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input name="firstName" id="firstName" placeholder="firstName" required className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input name="lastName" id="lastName" placeholder="lastName" required className="h-11" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Nom d'utilisateur</Label>
            <Input name="username" id="username" placeholder="username" required className="h-11" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input name="email" id="email" type="email" placeholder="votreemail@exemple.com" required className="h-11" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input name="password" id="password" type="password" required className="h-11" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
            <Input name="confirmPassword" id="confirmPassword" type="password" required className="h-11" />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" required />
            <label htmlFor="terms" className="text-sm font-medium leading-none">J'accepte les conditions</label>
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full h-11" disabled={isLoading}>
            {isLoading ? "Création..." : "Créer mon compte"}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-center text-sm text-muted-foreground w-full">
          Déjà un compte ? <Link href="/login" className="font-medium text-primary hover:underline">Se connecter</Link>
        </p>
      </CardFooter>
    </Card>
  )
}