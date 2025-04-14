import { Suspense } from 'react';
import JobPageContent from './jobpagecontent';

export default function EducationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JobPageContent />
    </Suspense>
  );
}