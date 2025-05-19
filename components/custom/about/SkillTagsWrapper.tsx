/**
 * SkillTagsWrapper Component
 * 
 * A server component wrapper for SkillTags that provides dynamic SEO metadata
 * Features:
 * - Generates dynamic metadata based on skills
 * - Handles SEO optimization for skill-related content
 * - Server-side metadata generation
 * 
 * @param {Object} props - Component props
 * @param {string[]} props.skills - Array of skill strings to display
 * @returns {JSX.Element} The wrapped SkillTags component with metadata
 */
import { Metadata } from 'next';
import SkillTags from './SkillTags';

interface SkillTagsWrapperProps {
  skills: string[];
}

/**
 * Generate dynamic metadata for skills
 * Creates SEO metadata based on the skills array
 * 
 * @param {Object} props - Component props
 * @param {string[]} props.skills - Array of skill strings
 * @returns {Metadata} The generated metadata
 */
export async function generateMetadata({ skills }: SkillTagsWrapperProps): Promise<Metadata> {
  // Create a comma-separated list of skills for metadata
  const skillsList = skills.filter(skill => skill.trim() !== "").join(', ');
  
  return {
    title: `Skills: ${skillsList}`,
    description: `Professional skills and expertise in ${skillsList}`,
    keywords: skillsList,
    openGraph: {
      title: `Skills: ${skillsList}`,
      description: `Professional skills and expertise in ${skillsList}`,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `Skills: ${skillsList}`,
      description: `Professional skills and expertise in ${skillsList}`,
    },
  };
}

export default function SkillTagsWrapper({ skills }: SkillTagsWrapperProps) {
  return <SkillTags skills={skills} />;
} 