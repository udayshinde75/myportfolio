import { Suspense } from 'react';
import ProjectPageContent from './projectpagecontent';

export default function EducationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectPageContent />
    </Suspense>
  );
}