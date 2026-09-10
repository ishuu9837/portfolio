export interface SkillCategory {
  id: string;
  titleKey: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'aiml',
    titleKey: 'categories.aiml.title',
    skills: ['TensorFlow', 'Keras', 'Scikit-learn', 'OpenCV', 'NumPy', 'Pandas', 'CNNs', 'U-Net'],
  },
  {
    id: 'programming',
    titleKey: 'categories.programming.title',
    skills: ['Python', 'SQL', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'MongoDB', 'Apache Hive'],
  },
  {
    id: 'cloud',
    titleKey: 'categories.cloud.title',
    skills: ['AWS', 'AWS Bedrock', 'Azure', 'Elastic Beanstalk'],
  },
  {
    id: 'visualization',
    titleKey: 'categories.visualization.title',
    skills: ['Power BI', 'Tableau'],
  },
  {
    id: 'tools',
    titleKey: 'categories.tools.title',
    skills: ['Google Colab', 'Jupyter', 'GitHub'],
  },
];
