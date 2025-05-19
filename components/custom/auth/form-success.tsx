/**
 * Form Success Component
 * 
 * A reusable component for displaying form success messages
 * Features:
 * - Conditional rendering based on message presence
 * - Success styling with emerald color scheme
 * - Icon integration for visual feedback
 * - Responsive layout with flex positioning
 * 
 * @param {Object} props - Component props
 * @param {string} [props.message] - Success message to display
 * @returns {JSX.Element | null} The success message layout or null if no message
 */
import { CheckCircledIcon } from "@radix-ui/react-icons"

interface FormSuccessProps {
    message?: string;
} 

export const FormSuccess = ({ message } : FormSuccessProps) => {
    // Return null if no success message is provided
    if (!message) return null;

    // Render success message with icon and styling
    return (
        <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
            <CheckCircledIcon className="w-5 h-5"/>
            <p>{message}</p>
        </div>
    )
}