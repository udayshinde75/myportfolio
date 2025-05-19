import { useState } from 'react';

/**
 * Description Component
 * 
 * A reusable component that displays text with a "read more/show less" functionality
 * Features:
 * - Truncates long text to 50 words initially
 * - Toggle between full and truncated text
 * - Responsive text styling
 * - Accessible button controls
 * 
 * @param {Object} props - Component props
 * @param {string} props.description - The text content to display
 * @returns {JSX.Element} The description component
 */
export const Description = ({ description }: { description: string }) => {
  // State to track whether to show full or truncated description
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  /**
   * Toggles between showing full and truncated description
   */
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Split description into words and determine if truncation is needed
  const words = description.split(' ');
  const shouldTruncate = words.length > 50 && !showFullDescription;
  const displayText = shouldTruncate ? words.slice(0, 50).join(' ') : description;

  return (
    <>
      {/* Main description text */}
      <p className="text-sm text-justify">
        {displayText}
        {/* Show "read more" button if text is truncated */}
        {shouldTruncate && (
          <button 
            onClick={toggleDescription}
            className="text-blue-500 hover:underline ml-1 focus:outline-none"
          >
            ...read more
          </button>
        )}
      </p>
      {/* Show "show less" button if full text is displayed */}
      {!shouldTruncate && words.length > 50 && (
        <button
          onClick={toggleDescription}
          className="text-xs text-blue-500 hover:underline mt-1 focus:outline-none"
        >
          show less
        </button>
      )}
    </>
  );
};
