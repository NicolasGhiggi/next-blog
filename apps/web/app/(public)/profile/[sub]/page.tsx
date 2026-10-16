import { FC } from "react"
import Image from "next/image"
import { BLUR_DATA_URL } from "@/lib/constants"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { PlusIcon } from "lucide-react"
import { Separator } from "@workspace/ui/components/separator"
import { auth0 } from "@/lib/auth0"

interface Props {
    params: Promise<{ sub: string }>
}

const STATS = [
    { value: "23", label: "posts" },
    { value: "1.3k", label: "followers" },
    { value: "3 years", label: "here" },
]

const Page: FC<Props> = async ({ params }) => {
    const { sub } = await params

    if (!sub) {
        return <p>No profile found</p>
    }

    // todo: make api for get user data
    // todo: make loading state page
    // todo: make error state page

    return (
        <div className="flex flex-col p-2 [--avatar:5rem] sm:[--avatar:6rem] md:[--avatar:7.5rem]">
            <div className="group relative aspect-video w-full cursor-pointer rounded-xl sm:aspect-16/6">
                <Image
                    src="/assets/post/post_01.jpg"
                    alt={`Post of ${sub}`}
                    fill
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="rounded-xl object-cover"
                />
                <div className="pointer-events-none absolute inset-0 rounded-xl inset-ring-1 inset-ring-foreground/10" />
                <Avatar className="absolute bottom-0 left-4 size-(--avatar) translate-y-1/2 rounded-full outline-4 outline-background sm:left-6 md:left-8">
                    <AvatarImage
                        src="https://avatars.githubusercontent.com/u/124599?v=4"
                        alt={`Avatar of ${sub}`}
                    />
                    <AvatarFallback className="text-lg sm:text-xl md:text-2xl">
                        {sub.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </div>
            <div className="flex flex-col gap-3 px-4 pt-[calc(var(--avatar)/2+0.75rem)] sm:gap-2 sm:px-6 sm:pt-3 md:px-8">
                <div className="flex min-h-9 items-center justify-between gap-3 sm:pl-[calc(var(--avatar)+1rem)]">
                    <h1 className="min-w-0 truncate font-mono text-lg leading-none sm:text-xl">
                        @{sub}
                    </h1>
                    <Button size="sm" className="shrink-0">
                        <PlusIcon /> Follow
                    </Button>
                </div>

                <dl className="flex min-h-6 flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground sm:pl-[calc(var(--avatar)+1rem)]">
                    {STATS.map((stat, i) => (
                        <div
                            key={stat.label}
                            className="flex items-center gap-3"
                        >
                            {i > 0 && (
                                <Separator
                                    orientation="vertical"
                                    className="h-4"
                                />
                            )}
                            <div className="flex items-baseline gap-1 text-sm leading-none">
                                <dd className="font-medium text-foreground tabular-nums">
                                    {stat.value}
                                </dd>
                                <dt>{stat.label}</dt>
                            </div>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    )
}

export default Page
