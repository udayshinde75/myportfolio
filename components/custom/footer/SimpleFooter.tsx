/**
 * SimpleFooter Component
 * 
 * A reusable footer component with animated content display
 * Features:
 * - Animated entrance using Framer Motion
 * - Responsive text layout
 * - Optional heading display
 * - Customizable paragraphs
 * - Centered content alignment
 * 
 * @param {Object} props - Component props
 * @param {string} [props.FirstPara] - First paragraph text
 * @param {string} [props.SecondPara] - Second paragraph text
 * @param {string} [props.headingText="Welcome Back 👋"] - Heading text to display
 * @param {boolean} [props.heading=true] - Whether to show the heading
 * @returns {JSX.Element} The footer layout
 */
'use client'
import { motion } from "framer-motion";

interface FooterProps {
    FirstPara?: string;
    SecondPara?: string;
    headingText?: string;
    heading?: boolean;
}

export default function SimpleFooter({
    FirstPara,
    SecondPara,
    headingText = "Welcome Back 👋",
    heading = true
}: FooterProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center text-center"
        >
            {/* Main content container with responsive width */}
            <div className="mt-6 max-w-full overflow-x-auto">
                <div className="mt-6">
                    {/* Optional heading section */}
                    {heading && (
                        <h2 className="text-2xl font-semibold">{headingText}</h2>
                    )}
                    
                    {/* First paragraph with responsive text size */}
                    <p className="mt-2 px-6 md:text-lg text-sm max-w-2xl mx-auto">
                        {FirstPara}
                    </p>
                    {/* Second paragraph with responsive text size */}
                    <p className="mt-2 px-6 md:text-lg text-sm max-w-2xl mx-auto">
                        {SecondPara}
                    </p>
                </div>

                {/* Commented out button section for future use
                <div className="flex flex-col mt-4 gap-4 justify-center">
                    <Button asChild className="px-6 py-3 mx-auto">
                        <Link href="/contact">Contact Me..</Link>
                    </Button>
                </div>*/}
            </div>
        </motion.div>
    );
}


