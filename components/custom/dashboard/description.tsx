import { useState } from 'react';

export const Description = ({ description }: { description: string }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const words = description.split(' ');
  const shouldTruncate = words.length > 50 && !showFullDescription;
  const displayText = shouldTruncate ? words.slice(0, 50).join(' ') : description;

  return (
    <>
      <p className="text-sm text-justify">
        {displayText}
        {shouldTruncate && (
          <button 
            onClick={toggleDescription}
            className="text-blue-500 hover:underline ml-1 focus:outline-none"
          >
            ...read more
          </button>
        )}
      </p>
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
