import { cn } from "cn"
import { FC, ReactNode } from "react"

interface SettingsContainerProps {
    title: string | ReactNode
    srOnly?: boolean
    children?: ReactNode
}

const SettingsContainer: FC<SettingsContainerProps> = ({ title, srOnly = false, children }) => {
    return (
        <section className="w-full p-4 rounded-lg bg-background border">
            <h2 className={cn("text-lg font-mono mb-8", srOnly && "sr-only")}>
                {title}
            </h2>
            {children}
        </section>
    )
}

export { SettingsContainer }