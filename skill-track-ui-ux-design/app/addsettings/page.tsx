import { DashboardLayout } from "@/components/layout/add-dashboard-layout"
import { SettingsHeader } from "@/components/settings/settings-header"
import { SettingsTabs } from "@/components/settings/settings-tabs"

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <SettingsHeader />
        <SettingsTabs />
      </div>
    </DashboardLayout>
  )
}
