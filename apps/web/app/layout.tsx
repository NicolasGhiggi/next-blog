import type { Metadata } from 'next';
import { ReactNode } from "react"
import { Geist, Geist_Mono,  } from "next/font/google"

import "@workspace/ui/globals.css"
import { cn } from "@workspace/ui/lib/utils"
import { Toaster } from "@workspace/ui/components/toast"
import { TooltipProvider } from "@workspace/ui/components/tooltip"
import { ThemeProvider } from "@workspace/ui/providers/theme-provider"
import { APP_NAME } from "@/lib/constants"

const geist = Geist({ 
    subsets: ['latin'], 
    variable: '--font-sans',
})

const geistMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
})

export const metadata: Metadata = {
    title: {
        default: APP_NAME,
        template: `%s | ${APP_NAME}`,
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            data-scroll-behavior="smooth"
            className={cn("antialiased", geist.variable, geistMono.variable, "font-sans")}
        >
            <body>
                <ThemeProvider>
                    <TooltipProvider>
                        {children}
                    </TooltipProvider>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    )
}
