/**
 * Form Error Component
 * 
 * A reusable component for displaying form error messages
 * Features:
 * - Conditional rendering based on message presence
 * - Destructive styling for error visibility
 * - Icon integration for visual feedback
 * - Responsive layout with flex positioning
 * 
 * @param {Object} props - Component props
 * @param {string} [props.message] - Error message to display
 * @returns {JSX.Element | null} The error message layout or null if no message
 */
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

interface FormErrorProps {
    message?: string;
} 

export const FormError = ({ message } : FormErrorProps) => {
    // Return null if no error message is provided
    if (!message) return null;

    // Render error message with icon and styling
    return (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
            <ExclamationTriangleIcon className="w-5 h-5"/>
            <p>{message}</p>
        </div>
    )
}