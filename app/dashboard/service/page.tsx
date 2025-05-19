/**
 * Service Page Component
 * 
 * Page component for managing services
 * Features:
 * - Suspense boundary for loading state
 * - Renders ServicePageContent component
 * 
 * @returns {JSX.Element} The service page layout
 */
import { Suspense } from 'react';
import ServicePageContent from './servicepagecontent';

export default function EducationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServicePageContent/>
    </Suspense>
  );
}