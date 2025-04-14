import { Suspense } from 'react';
import EducationPageContent from './educationpagecontent';

export default function EducationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EducationPageContent />
    </Suspense>
  );
}