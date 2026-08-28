import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Globe, GraduationCap, Code2, Plane } from 'lucide-react';
import { ThemeProvider } from './ThemeContext';

import { CustomCursor } from './components/CustomCursor';
import { Hero3D } from './components/Hero3D';
import { ExperienceScroll } from './components/ExperienceScroll';

// Reusable animated Bento Card wrapper
const BentoCard = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`glass-panel ${className || ''}`}
      style={{ padding: '3rem', display: 'flex', flexDirection: 'column' }}
      whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.4)', borderColor: 'rgba(56, 189, 248, 0.3)' }}
    >
      {children}
    </motion.div>
  );
};

function Controls() {
  const { i18n } = useTranslation();

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
  };

  return (
    <div style={{ position: 'fixed', top: '2rem', right: '2rem', display: 'flex', gap: '1rem', zIndex: 100 }}>
      <motion.button 
        onClick={toggleLang} 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.8rem',
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '0.8rem 1.5rem',
          borderRadius: '50px',
          color: 'white',
          fontWeight: 600,
          cursor: 'pointer'
        }}
        whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }}
      >
        <Globe size={18} /> {i18n.language.toUpperCase()}
      </motion.button>
    </div>
  );
}

function PortfolioContent() {
  const { t } = useTranslation();
  
  // Cast arrays safely
  const skillsList = t('bento.skills.list', { returnObjects: true }) as string[];

  const copyEmail = () => {
    navigator.clipboard.writeText(t('bento.contact.email'));
    alert('Correo copiado al portapapeles');
  };

  return (
    <>
      <CustomCursor />
      <Controls />
      
      {/* 3D Hero Section */}
      <Hero3D />

      {/* Info Grid Section (Skills, Education, etc) */}
      <section className="section" style={{ maxWidth: '1600px', margin: '0 auto', paddingTop: '10rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem' }}>
          
          {/* SKILLS */}
          <BentoCard className="col-span-12" delay={0.1}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
              <div style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '0.8rem', borderRadius: '12px' }}>
                <Code2 color="var(--accent-cyan)" size={28} />
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: 800 }}>{t('bento.skills.title')}</h3>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {Array.isArray(skillsList) && skillsList.map((skill, i) => (
                <div 
                  key={i}
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.05)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '0.8rem 1.5rem', 
                    borderRadius: '16px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.2)';
                    e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </BentoCard>

          {/* EDUCATION */}
          <BentoCard className="col-span-6" delay={0.2}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <GraduationCap color="var(--accent-purple)" size={28} />
              <h3 style={{ fontSize: '2rem', fontWeight: 800 }}>{t('bento.education.title')}</h3>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent-cyan)', fontSize: '1.4rem', fontWeight: 700 }}>{t('bento.education.degree1')}</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                <span>{t('bento.education.uni')}</span>
                <span>{t('bento.education.date1')}</span>
              </div>
            </div>

            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: 600 }}>{t('bento.education.degree2')}</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                <span>{t('bento.education.uni')}</span>
                <span>{t('bento.education.date2')}</span>
              </div>
            </div>
          </BentoCard>

          {/* MOBILITY & LANGUAGES */}
          <BentoCard className="col-span-6" delay={0.3}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
              <Plane color="var(--accent-cyan)" size={28} />
              <h3 style={{ fontSize: '2rem' }}>{t('bento.mobility.title')}</h3>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '2.2', fontSize: '1.2rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-cyan)' }} />
                <strong style={{ color: 'var(--text-primary)' }}>{t('bento.mobility.availability')}</strong>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-purple)' }} />
                {t('bento.mobility.relocation')}
              </li>
            </ul>

            <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', margin: '2rem 0' }} />

            <div style={{ display: 'flex', gap: '4rem' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-primary)' }}>{String(t('bento.languages.es') || '').split('(')[0] || 'Español'}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>{String(t('bento.languages.es') || '').match(/\((.*)\)/)?.[1] || 'Nativo'}</div>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-primary)' }}>{String(t('bento.languages.en') || '').split('(')[0] || 'English'}</div>
                <div style={{ color: 'var(--accent-cyan)', fontSize: '1.1rem', fontWeight: 600 }}>{String(t('bento.languages.en') || '').match(/\((.*)\)/)?.[1] || 'B2 Conversacional'}</div>
              </div>
            </div>
          </BentoCard>
        </div>
      </section>

      {/* Scrollytelling Experience Section */}
      <ExperienceScroll />

      {/* Modern Footer */}
      <section className="section" style={{ minHeight: '60vh', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(to top, rgba(6, 6, 18, 1), transparent)' }}>
        <div style={{ maxWidth: '1200px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '2rem', fontWeight: 900 }}>
            {t('bento.contact.title')}
          </h2>
          <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', maxWidth: '800px', marginBottom: '4rem' }}>
            Soluciones críticas de software y algoritmos de visión autónoma para la industria global.
          </p>
          
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button 
              onClick={copyEmail}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--accent-cyan)',
                padding: '1.5rem 3rem',
                borderRadius: '100px',
                color: 'white',
                fontSize: '1.2rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(56, 189, 248, 0.1)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(56, 189, 248, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {t('bento.contact.email')}
              <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>(Copiar)</span>
            </button>
            
            <a 
              href={`tel:${t('bento.contact.phone')}`}
              style={{
                background: 'rgba(139, 92, 246, 0.1)',
                border: '1px solid var(--accent-purple)',
                padding: '1.5rem 3rem',
                borderRadius: '100px',
                color: 'white',
                fontSize: '1.2rem',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              {t('bento.contact.phone')}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={<div style={{height: '100vh', display: 'flex', alignItems:'center', justifyContent: 'center', color: 'var(--accent-cyan)', background: '#02020a', fontSize: '2rem', fontWeight: 800}}>INITIALIZING SYSTEM...</div>}>
        <PortfolioContent />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
