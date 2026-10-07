import { ReactNode } from "react"
import { Geist, Geist_Mono,  } from "next/font/google"

import "@workspace/ui/globals.css"
import { cn } from "@workspace/ui/lib/utils"
import { TooltipProvider } from "@workspace/ui/components/tooltip"
import { ThemeProvider } from "@workspace/ui/providers/theme-provider"

const geist = Geist({ 
    subsets: ['latin'], 
    variable: '--font-sans',
})

const geistMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
})

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
                </ThemeProvider>
            </body>
        </html>
    )
}
