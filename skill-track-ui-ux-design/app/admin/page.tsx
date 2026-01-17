import { DashboardStats } from "@/components/dashboard/adddashboard-stats"
import { RecentActivities } from "@/components/dashboard/recent-activities-add"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { DailyChallenges } from "@/components/gamification/daily-challenges"
import { DashboardLayout } from "@/components/layout/add-dashboard-layout"
import { DashboardHeader } from "@/components/dashboard/Adddashboard-header"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <DashboardHeader />
        <DashboardStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <RecentActivities />
          </div>
          <div className="space-y-6">
            <QuickActions />
            <DailyChallenges />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}