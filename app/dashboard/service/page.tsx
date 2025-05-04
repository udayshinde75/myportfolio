import { Suspense } from 'react';
import ServicePageContent from './servicepagecontent';

export default function EducationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServicePageContent/>
    </Suspense>
  );
}