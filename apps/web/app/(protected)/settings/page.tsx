import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import { SettingsContainer } from "@/components/ui/settings-container"

import { ProfileTab } from "@/app/(protected)/settings/_components/profile-tab"
import { AccountTab } from "@/app/(protected)/settings/_components/account-tab"
import { NotificationTab } from "@/app/(protected)/settings/_components/notification-tab"
import { PrivacyAndSecureTab } from "@/app/(protected)/settings/_components/privacy-and-secure-tab"

const TABS = [
    { id: "profile", label: "Profile", content: <ProfileTab /> },
    { id: "account", label: "Account", content: <AccountTab /> },
    { id: "notification", label: "Notification", content: <NotificationTab /> },
    { id: "privacy-and-secure", label: "Privacy & Secure", content: <PrivacyAndSecureTab /> },
]

const Page = () => {
    return (
        <div className="p-2">
            <Tabs defaultValue="profile">
                <TabsList variant="line">
                    {TABS.map(({ id, label }) => (
                        <TabsTrigger key={id} value={id}>{label}</TabsTrigger>
                    ))}
                </TabsList>
                {TABS.map(({ id, label, content }) => (
                    <TabsContent key={id} value={id}>
                        <SettingsContainer title={label}>
                            {content}
                        </SettingsContainer>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}

export default Page