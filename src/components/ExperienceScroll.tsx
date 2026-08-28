import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Briefcase } from 'lucide-react';

const CaseStudy = ({ project, index }: { project: any, index: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.2 1"] // Trigger when element enters viewport
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <motion.div 
      ref={ref}
      style={{ opacity, scale, y }}
      className="glass-panel"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div style={{ padding: '4rem' }}>
        <h4 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{project.name}</h4>
        <div style={{ fontSize: '1.5rem', color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '1rem' }}>{project.role}</div>
        <div style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.2rem', letterSpacing: '1px' }}>
          {project.company} &mdash; {project.date}
        </div>
        
        <p style={{ fontSize: '1.3rem', opacity: 0.9, marginBottom: '4rem', lineHeight: 1.8, maxWidth: '1000px', color: 'var(--text-secondary)' }}>
          {project.context}
        </p>

        {/* Visuals - Abstracted for the Scroll Component */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '4rem' }}>
           <div style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
             <img src={`/assets/projects/${index === 0 ? 'vecode/old_auth' : 'stealth/stealth_draft'}.png`} alt="Project screen 1" style={{ width: '100%', height: '350px', objectFit: 'cover' }} />
           </div>
           <div style={{ borderRadius: '24px', overflow: 'hidden', border: `1px solid ${index === 0 ? 'var(--accent-cyan)' : 'var(--accent-purple)'}` }}>
             <img src={`/assets/projects/${index === 0 ? 'vecode/new_dashboard' : 'stealth/stealth_drone'}.png`} alt="Project screen 2" style={{ width: '100%', height: '350px', objectFit: 'cover' }} />
           </div>
        </div>

        {/* Dynamic details parsing based on translation keys */}
        {index === 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem' }}>
            {[1,2,3].map(i => (
              <div key={i}>
                <h5 style={{ color: 'var(--accent-cyan)', fontSize: '1.4rem', marginBottom: '1rem' }}>{project[`p${i}_title`]}</h5>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{project[`p${i}_desc`]}</p>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ marginTop: '3rem', background: 'rgba(0,0,0,0.3)', borderRadius: '20px', padding: '2rem', border: '1px solid var(--glass-border)' }}>
             <h5 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--accent-purple)' }}>{project.expertise_table?.title || 'Expertise Applied'}</h5>
             {project.expertise_table?.rows?.map((row: any, i: number) => (
                <div key={i} style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '1.5rem 0' }}>
                  <div style={{ width: '30%', fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-primary)' }}>{row.domain}</div>
                  <div style={{ width: '70%', color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>{row.capabilities}</div>
                </div>
             ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const ExperienceScroll = () => {
  const { t } = useTranslation();
  
  // Safe extraction of nested objects from translation
  const vecodeProject = t('bento.case_studies.vecode', { returnObjects: true });
  const stealthProject = t('bento.case_studies.stealth', { returnObjects: true });

  return (
    <section className="section" style={{ margin: '0 auto', maxWidth: '1600px', zIndex: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '6rem', paddingLeft: '2rem' }}>
        <Briefcase color="var(--accent-cyan)" size={48} />
        <h3 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 900, letterSpacing: '-0.02em' }}>
          {t('bento.case_studies.title', 'Engineering Milestones')}
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem', padding: '0 2rem' }}>
        <CaseStudy project={vecodeProject} index={0} />
        <CaseStudy project={stealthProject} index={1} />
      </div>
    </section>
  );
};
