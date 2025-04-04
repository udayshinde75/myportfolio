"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
    icon: React.ReactNode;
    href: string;
}   

export const BackButton = ({
    icon,
    href
} : BackButtonProps) => {
    return (
        <Button
            variant={"link"}
            className="font-normal w-full"
            size={"sm"}
        >
            <Link href={href
            }>
                {icon}
            </Link>
        </Button>
    )
}