import React from 'react'
import Link from "next/link"

import {
    Menu,
    Settings,
    Search,
    Users2,
    Flag,
    PieChart,
    Mail,
    Images,
    CalendarDays
} from "lucide-react"

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"


const Aside = () => {
    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className='aspect-square w-full flex shrink-0 items-center justify-center bg-primary '>
                <Link
                    href="/"
                    className="group flex w-full h-full shrink-0 items-center justify-center gap-2 text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                >
                    <Menu />
                    <span className="sr-only">Trang chủ</span>
                </Link>
            </nav>
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/search"
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                        >
                            <Search className="h-5 w-5" />
                            <span className="sr-only">Tìm kiếm</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Tìm kiếm</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/dashboard"
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                        >
                            <Users2 className="h-5 w-5" />
                            <span className="sr-only">Người dùng</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Người dùng</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/flag"
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                        >
                            <Flag />
                            <span className="sr-only">Đánh dấu</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Đánh dấu</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/chart"
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                        >
                            <PieChart />
                            <span className="sr-only">Thống kê</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Thông kê</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/mail"
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                        >
                            <Mail />
                            <span className="sr-only">Thư</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Thư</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/image"
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                        >
                            <Images />
                            <span className="sr-only">Hình ảnh</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Hình ảnh</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/calendar"
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                        >
                            <CalendarDays />
                            <span className="sr-only">Lịch</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Lịch</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/setting"
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                        >
                            <Settings className="h-5 w-5" />
                            <span className="sr-only">cài đặt</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Cài đặt</TooltipContent>
                </Tooltip>
            </nav>
        </aside>
    )
}

export default Aside