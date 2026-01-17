import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Target,Users, Award, Zap ,TriangleAlert  } from "lucide-react"

const stats = [
  {
    title: "Utilisateurs Totaux",
    value: "1,240",
    change: "",
    trend: "up",
    icon: Users,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  {
    title: "Progression globale",
    value: "67%",
    change: "+12% ce mois",
    trend: "up",
    icon: TrendingUp,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    title: "Cours Actifs",
    value: "80",
    change: "13 restants",
    trend: "neutral",
    icon: Target,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    title: "Alertes Système",
    value: "3",
    change: "+5h cette semaine",
    trend: "up",
    icon: TriangleAlert   ,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
]

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className="border-border/50 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                {stat.trend === "up" && (
                  <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                )}
                {stat.trend === "neutral" && (
                  <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                )}
              </div>
              <div>
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
