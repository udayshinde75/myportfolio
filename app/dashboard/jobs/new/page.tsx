/**
 * Job Page Component
 * 
 * Page component for managing job entries
 * Features:
 * - Suspense boundary for loading state
 * - Renders JobPageContent component
 * 
 * @returns {JSX.Element} The job page layout
 */

import { Suspense } from 'react';
import JobPageContent from './jobpagecontent';

export default function EducationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JobPageContent />
    </Suspense>
  );
}