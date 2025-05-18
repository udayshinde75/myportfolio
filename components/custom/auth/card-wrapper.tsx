import { 
    Card,
    CardContent,
    CardHeader,
    CardFooter
} from "@/components/ui/card";
import { BackButton } from "./back-button";
import { Header } from "./header";
import React from "react";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    icon: React.ReactNode;
    backButtonHref: string;
}

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonHref,
    icon,
} : CardWrapperProps) => {
    return (
        <Card className=" shadow-xl md:border mt-10  border-gray-500 rounded-3xl px-3   backdrop-blur-xl bg-opacity-80 ">
            <CardHeader>
                <Header label={headerLabel}/>
            </CardHeader>
            <CardContent >
                {children}
            </CardContent>
            <CardFooter>
                <BackButton icon={icon} href={backButtonHref}/>
            </CardFooter>
        </Card>
    )
}