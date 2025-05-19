/**
 * Project Page Component
 * 
 * Page component for managing project entries
 * Features:
 * - Suspense boundary for loading state
 * - Renders ProjectPageContent component
 * 
 * @returns {JSX.Element} The project page layout
 */
import { Suspense } from 'react';
import ProjectPageContent from './projectpagecontent';

export default function EducationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectPageContent />
    </Suspense>
  );
}