/**
 * Education Page Component
 * 
 * Page component for managing education entries
 * Features:
 * - Suspense boundary for loading state
 * - Renders EducationPageContent component
 * 
 * @returns {JSX.Element} The education page layout
 */
import { Suspense } from 'react';
import EducationPageContent from './educationpagecontent';

export default function EducationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EducationPageContent />
    </Suspense>
  );
}