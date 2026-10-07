import { cn } from "cn"
import { FC } from "react"

interface DotBackgroundProps {
    fade?: boolean
}

const DotBackground: FC<DotBackgroundProps> = ({ fade = false }) => {
    return (
        <div className="absolute inset-0">
            <div
                className={cn(
                    "absolute inset-0 -z-50",
                    "bg-size-[20px_20px]",
                    "bg-[radial-gradient(#d4d4d4_1px,transparent_1px)]",
                    "dark:bg-[radial-gradient(#404040_1px,transparent_1px)]",
                )}
            />
            {fade &&
                <div className="pointer-events-none absolute inset-0 -z-40 flex items-center justify-center bg-background mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            }
        </div>
    )
}

export { DotBackground }