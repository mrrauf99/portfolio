import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiCplusplus,
} from 'react-icons/si';
import { GrOracle } from 'react-icons/gr';
import { TbBrandCSharp } from 'react-icons/tb';

export const skillCategories = [
  {
    id: 'frontend',
    title: 'Frontend',
    color: 'purple',
    gradientFrom: '#7c3aed',
    gradientTo: '#a855f7',
    skills: [
      { name: 'React', icon: SiReact, color: '#61DAFB', level: 90 },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', level: 92 },
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26', level: 95 },
      { name: 'CSS3', icon: SiCss, color: '#1572B6', level: 88 },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4', level: 80 },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    color: 'cyan',
    gradientFrom: '#0891b2',
    gradientTo: '#06b6d4',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933', level: 95 },
      { name: 'Express.js', icon: SiExpress, color: '#ffffff', level: 95 },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    color: 'emerald',
    gradientFrom: '#059669',
    gradientTo: '#10b981',
    skills: [
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248', level: 95 },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1', level: 80 },
      { name: 'Oracle', icon: GrOracle, color: '#F80000', level: 80 },
    ],
  },
  {
    id: 'languages',
    title: 'Programming',
    color: 'blue',
    gradientFrom: '#2563eb',
    gradientTo: '#3b82f6',
    skills: [
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', level: 92 },
      { name: 'C++', icon: SiCplusplus, color: '#00599C', level: 75 },
      { name: 'C#', icon: TbBrandCSharp, color: '#239120', level: 72 },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & DevOps',
    color: 'pink',
    gradientFrom: '#db2777',
    gradientTo: '#ec4899',
    skills: [
      { name: 'Git', icon: SiGit, color: '#F05032', level: 88 },
      { name: 'GitHub', icon: SiGithub, color: '#ffffff', level: 90 },
    ],
  },
];
