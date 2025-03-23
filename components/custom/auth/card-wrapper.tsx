import { 
    Card,
    CardContent,
    CardHeader,
    CardFooter
} from "@/components/ui/card";
import { BackButton } from "./back-button";
import { Header } from "./header";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
}

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonHref,
    backButtonLabel,
} : CardWrapperProps) => {
    return (
        <Card className="md:w-[400px] w-[300px] shadow-xl md:border border-none mt-10 mx-20 border-gray-500 rounded-3xl px-3   backdrop-blur-xl bg-opacity-80 ">
            <CardHeader>
                <Header label={headerLabel}/>
            </CardHeader>
            <CardContent >
                {children}
            </CardContent>
            <CardFooter>
                <BackButton 
                    label={backButtonLabel}
                    href={backButtonHref}
                />
            </CardFooter>
        </Card>
    )
}