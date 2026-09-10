'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/ui/section-header';
import { skillCategories } from '@/lib/data/skills';
import { soundEngine } from '@/lib/audio/sound-engine';

const SKILL_RELATIONS: Record<string, string[]> = {
  Python: ['TensorFlow', 'Keras', 'Scikit-learn', 'OpenCV', 'NumPy', 'Pandas', 'CNNs', 'U-Net', 'Jupyter', 'Google Colab'],
  TensorFlow: ['Python', 'Keras', 'CNNs', 'U-Net', 'NumPy', 'Google Colab'],
  Keras: ['Python', 'TensorFlow', 'CNNs', 'U-Net'],
  'Scikit-learn': ['Python', 'NumPy', 'Pandas'],
  OpenCV: ['Python', 'CNNs', 'U-Net'],
  NumPy: ['Python', 'Pandas', 'Scikit-learn', 'TensorFlow'],
  Pandas: ['Python', 'NumPy', 'SQL', 'Apache Hive', 'Power BI', 'Tableau'],
  CNNs: ['TensorFlow', 'Keras', 'OpenCV', 'U-Net', 'Python'],
  'U-Net': ['CNNs', 'TensorFlow', 'Keras', 'OpenCV', 'Python'],
  SQL: ['Apache Hive', 'MongoDB', 'Python', 'Power BI', 'Tableau'],
  JavaScript: ['TypeScript', 'HTML', 'CSS'],
  TypeScript: ['JavaScript', 'HTML', 'CSS'],
  HTML: ['CSS', 'JavaScript', 'TypeScript'],
  CSS: ['HTML', 'JavaScript', 'TypeScript'],
  MongoDB: ['SQL', 'Python', 'JavaScript'],
  'Apache Hive': ['SQL', 'Python', 'Pandas'],
  AWS: ['AWS Bedrock', 'Elastic Beanstalk', 'Azure', 'Python'],
  'AWS Bedrock': ['AWS', 'Python'],
  Azure: ['AWS', 'Python', 'Power BI'],
  'Elastic Beanstalk': ['AWS'],
  'Power BI': ['SQL', 'Tableau', 'Pandas', 'Azure'],
  Tableau: ['Power BI', 'SQL', 'Pandas'],
  'Google Colab': ['Python', 'Jupyter', 'TensorFlow'],
  Jupyter: ['Python', 'Google Colab', 'NumPy', 'Pandas'],
  GitHub: ['Python', 'JavaScript', 'TypeScript'],
};

export function SkillsSection() {
  const t = useTranslations('skills');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const relatedSkills = hoveredSkill ? SKILL_RELATIONS[hoveredSkill] || [] : [];

  const handleMouseEnter = (skill: string) => {
    setHoveredSkill(skill);
    soundEngine.playHover();
  };

  const handleMouseLeave = () => {
    setHoveredSkill(null);
  };

  return (
    <section id="skills" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeader 
          title={t('title')} 
          subtitle={t('subtitle')} 
        />

        {/* Capability Guidance Note */}
        <div className="flex items-center gap-2 mb-10 font-mono text-xs text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span>HOVER A SKILL TO REVEAL CROSS-DOMAIN RELATIONSHIPS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.titleKey}
              className="flex flex-col p-6 rounded-xl bg-card border border-border/70 hover:border-border transition-colors"
            >
              <h3 className="font-mono text-sm text-foreground uppercase tracking-wider mb-6 pb-2 border-b border-border/80 flex items-center justify-between">
                <span>{t(category.titleKey)}</span>
                <span className="text-muted text-xs">0{category.skills.length}</span>
              </h3>

              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill) => {
                  const isDirect = hoveredSkill === skill;
                  const isRelated = relatedSkills.includes(skill);
                  const isDimmed = hoveredSkill !== null && !isDirect && !isRelated;

                  return (
                    <button
                      key={skill}
                      onMouseEnter={() => handleMouseEnter(skill)}
                      onMouseLeave={handleMouseLeave}
                      className={`px-3 py-1.5 text-xs font-mono rounded-md border text-left transition-all duration-200 cursor-default select-none ${
                        isDirect
                          ? 'bg-accent text-white border-accent scale-105 shadow-md z-10'
                          : isRelated
                          ? 'bg-accent/15 text-accent border-accent font-semibold scale-102 z-10'
                          : isDimmed
                          ? 'bg-background/40 border-border/40 text-muted/30'
                          : 'bg-background border-border text-foreground hover:border-accent hover:text-accent'
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
