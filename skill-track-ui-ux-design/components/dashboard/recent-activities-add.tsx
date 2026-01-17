import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, UserPlus, Database , FileText } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "security",
    title: "Sécurité système",
    description: "Mise à jour des protocoles de sécurité JWT effectuée",
    time: "Il y a 2 heures",
    icon: ShieldCheck, // Ou Lock
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    id: 2,
    type: "user_management",
    title: "Nouvel utilisateur",
    description: "Validation du compte de Meryem Benjelloun (Professeur)",
    time: "Il y a 5 heures",
    icon: UserPlus,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    id: 3,
    type: "database",
    title: "Maintenance MongoDB",
    description: "Nettoyage des logs et optimisation des index",
    time: "Hier",
    icon: Database,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  {
    id: 4,
    type: "report",
    title: "Rapport généré",
    description: "Statistiques mensuelles d'utilisation prêtes",
    time: "Il y a 2 jours",
    icon: FileText,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
]

export function RecentActivities() {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle>Activités récentes</CardTitle>
        <CardDescription>Vos dernières réalisations et progrès</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className={`p-2 rounded-lg ${activity.bgColor} shrink-0`}>
                  <Icon className={`w-4 h-4 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm mb-0.5">{activity.title}</p>
                  <p className="text-sm text-muted-foreground mb-1">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
