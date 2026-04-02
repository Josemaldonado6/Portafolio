import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Stars, Float, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Globe, Plane, GraduationCap, Code2, MapPin, Mail, Phone, Briefcase, CheckCircle2 } from 'lucide-react';
import { ThemeProvider } from './ThemeContext';

import { useState } from 'react';

// Reusable animated Bento Card wrapper with Mouse Glow
const BentoCard = ({ children, className, delay = 0, style }: { children: React.ReactNode, className?: string, delay?: number, style?: React.CSSProperties }) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`bento-card ${className || ''}`}
      style={{ 
        ...style,
        '--mouse-x': `${mousePos.x}%`,
        '--mouse-y': `${mousePos.y}%`
      } as any}
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
      <button onClick={toggleLang} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Globe size={18} /> {i18n.language.toUpperCase()}
      </button>
    </div>
  );
}

function PortfolioContent() {
  const { t } = useTranslation();
  
  // Cast arrays safely
  const skillsList = t('bento.skills.list', { returnObjects: true }) as string[];


  return (
    <>
      <Controls />
      
      {/* 3D Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <Suspense fallback={null}>
            <Environment preset="night" />
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={1} fade speed={1.5} />
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={2} color="#8b5cf6" />
            <directionalLight position={[-10, -10, -5]} intensity={1} color="#38bdf8" />
            
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
            
            <Float speed={3} rotationIntensity={2} floatIntensity={2}>
              <mesh>
                <icosahedronGeometry args={[2.8, 15]} />
                <MeshDistortMaterial 
                  color="#38bdf8" 
                  emissive="#1e1b4b"
                  emissiveIntensity={2}
                  roughness={0} 
                  metalness={1} 
                  distort={0.4} 
                  speed={4} 
                  transparent
                  opacity={0.9}
                />
              </mesh>
              {/* Inner Core */}
              <mesh scale={0.8}>
                <icosahedronGeometry args={[1, 1]} />
                <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={5} />
              </mesh>
            </Float>
          </Suspense>
        </Canvas>
      </div>

      {/* Main Bento UI */}
      <div className="bento-container">
        
        {/* HERO CARD */}
        <BentoCard className="col-span-4" delay={0.1}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', zIndex: 2 }}>
            <span style={{ color: 'var(--accent-cyan)', fontWeight: 600, letterSpacing: '2px' }}>{t('bento.hero.greeting').toUpperCase()}</span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: 0, lineHeight: 1.1 }}>
              {t('bento.hero.name')}
            </h1>
            <h2 className="text-gradient" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
              {t('bento.hero.role')}
            </h2>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <span style={{ background: 'rgba(56, 189, 248, 0.1)', color: 'var(--accent-cyan)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} /> {t('bento.hero.status')}
              </span>
              <span style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} /> {t('bento.about.location')}
              </span>
            </div>
          </div>
        </BentoCard>

        {/* SKILLS */}
        <BentoCard className="col-span-2 row-span-2" delay={0.2}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Code2 color="var(--accent-cyan)" />
            <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{t('bento.skills.title')}</h3>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {Array.isArray(skillsList) && skillsList.map((skill, i) => (
              <motion.span 
                key={i}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(56, 189, 248, 0.2)' }}
                style={{ 
                  background: 'rgba(255, 255, 255, 0.05)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '0.6rem 1.2rem', 
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  cursor: 'default'
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </BentoCard>

        {/* EDUCATION */}
        <BentoCard className="col-span-2" delay={0.3}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <GraduationCap color="var(--accent-purple)" />
            <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{t('bento.education.title')}</h3>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ margin: '0 0 0.25rem 0', color: 'var(--accent-cyan)' }}>{t('bento.education.degree1')}</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <span>{t('bento.education.uni')}</span>
              <span>{t('bento.education.date1')}</span>
            </div>
          </div>

          <div>
            <h4 style={{ margin: '0 0 0.25rem 0', color: 'var(--text-primary)' }}>{t('bento.education.degree2')}</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <span>{t('bento.education.uni')}</span>
              <span>{t('bento.education.date2')}</span>
            </div>
          </div>
        </BentoCard>

        {/* MOBILITY & LANGUAGES (Split in logical columns) */}
        <BentoCard className="col-span-1" delay={0.4}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Plane color="var(--accent-cyan)" />
            <h3 style={{ margin: 0 }}>{t('bento.mobility.title')}</h3>
          </div>
          <ul style={{ paddingLeft: '1.5rem', margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <li><strong style={{ color: 'var(--text-primary)' }}>{t('bento.mobility.availability')}</strong></li>
            <li>{t('bento.mobility.relocation')}</li>
            <li>{t('bento.mobility.visa')}</li>
            <li>{t('bento.mobility.passport')}</li>
          </ul>
        </BentoCard>

        <BentoCard className="col-span-1" delay={0.5}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Globe color="var(--accent-purple)" />
            <h3 style={{ margin: 0 }}>{t('bento.languages.title')}</h3>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontWeight: 600 }}>{t('bento.languages.es').split('(')[0]}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Nativo</div>
          </div>
          <div>
            <div style={{ fontWeight: 600 }}>{t('bento.languages.en').split('(')[0]}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>B2 Conversacional / Lectura Fluida</div>
          </div>
        </BentoCard>

        {/* HORIZONTAL CASE STUDIES SHOWCASE */}
        <div className="col-span-12" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', padding: '0 1rem' }}>
            <Briefcase color="var(--accent-cyan)" size={32} />
            <h3 style={{ fontSize: '2.5rem', fontWeight: 800 }}>{t('bento.case_studies.title')}</h3>
          </div>

          <div className="horizontal-scroll-section">
            <div className="horizontal-content-wrapper">
              
              {/* VECODE CARD */}
              <div style={{ width: 'min(85vw, 900px)', whiteSpace: 'normal' }}>
                <BentoCard delay={0.1} style={{ height: '100%' }}>
                  <div style={{ borderLeft: '3px solid var(--accent-cyan)', paddingLeft: '2rem' }}>
                    <h4 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{t('bento.case_studies.vecode.name')}</h4>
                    <div style={{ fontSize: '1.2rem', color: 'var(--accent-purple)', fontWeight: 600 }}>{t('bento.case_studies.vecode.role')}</div>
                    <div style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{t('bento.case_studies.vecode.company')} • {t('bento.case_studies.vecode.date')}</div>
                    
                    <p style={{ fontSize: '1.1rem', fontStyle: 'italic', opacity: 0.8, marginBottom: '2rem' }}>{t('bento.case_studies.vecode.context')}</p>
                    
                    <div className="comparison-grid">
                      <div className="visual-item" style={{ border: '2px solid #722f37' }}>
                        <img src="/assets/projects/vecode/old_auth.png" alt="Legacy" />
                        <span className="visual-label" style={{ background: '#722f37', color: 'white' }}>{t('bento.case_studies.vecode.visuals.before')}</span>
                      </div>
                      <div className="visual-item" style={{ border: '2px solid var(--accent-cyan)' }}>
                        <img src="/assets/projects/vecode/new_dashboard.png" alt="Modern" />
                        <span className="visual-label" style={{ background: 'var(--accent-cyan)', color: 'black' }}>{t('bento.case_studies.vecode.visuals.after')}</span>
                      </div>
                    </div>

                    <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                      {[1,2,3].map(i => (
                        <div key={i}>
                          <h5 style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>{t(`bento.case_studies.vecode.p${i}_title`)}</h5>
                          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>{t(`bento.case_studies.vecode.p${i}_desc`)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </BentoCard>
              </div>

              {/* STEALTH TECH CARD */}
              <div style={{ width: 'min(85vw, 1100px)', whiteSpace: 'normal' }}>
                <BentoCard delay={0.2} style={{ height: '100%', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(56, 189, 248, 0.05))' }}>
                  <div style={{ borderLeft: '3px solid var(--accent-purple)', paddingLeft: '2rem' }}>
                    <h4 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{t('bento.case_studies.stealth.name')}</h4>
                    <div style={{ fontSize: '1.2rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>{t('bento.case_studies.stealth.role')}</div>
                    <div style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{t('bento.case_studies.stealth.company')} • {t('bento.case_studies.stealth.date')}</div>
                    
                    <p style={{ fontSize: '1.1rem', fontStyle: 'italic', opacity: 0.8, marginBottom: '2rem' }}>{t('bento.case_studies.stealth.context')}</p>

                    {/* NEW STEALTH IMAGES */}
                    <div className="comparison-grid" style={{ gridTemplateColumns: '1fr 1.2fr' }}>
                      <div className="visual-item" style={{ border: '1px solid var(--accent-purple)' }}>
                        <img src="/assets/projects/stealth/stealth_drone.png" alt="Drone Pilot" style={{ height: '350px' }} />
                        <span className="visual-label" style={{ background: 'var(--accent-purple)', color: 'white' }}>{t('bento.case_studies.stealth.visuals.screen2')}</span>
                      </div>
                      <div className="visual-item" style={{ border: '1px solid var(--accent-purple)' }}>
                        <img src="/assets/projects/stealth/stealth_draft.png" alt="Draft Analysis" style={{ height: '350px' }} />
                        <span className="visual-label" style={{ background: 'var(--accent-purple)', color: 'white' }}>{t('bento.case_studies.stealth.visuals.screen1')}</span>
                      </div>
                    </div>

                    <div style={{ marginTop: '2rem' }}>
                      <h5 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>{t('bento.case_studies.stealth.expertise_table.title')}</h5>
                      <div style={{ overflowX: 'auto' }}>
                        <table className="expertise-table">
                          <thead>
                            <tr>
                              {((t('bento.case_studies.stealth.expertise_table.headers', { returnObjects: true }) as string[]) || []).map((h, i) => <th key={i}>{h}</th>)}
                            </tr>
                          </thead>
                          <tbody>
                            {((t('bento.case_studies.stealth.expertise_table.rows', { returnObjects: true }) as any[]) || []).map((row, idx) => (
                              <tr key={idx}>
                                <td>{row.domain}</td>
                                <td>{row.capabilities}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </BentoCard>
              </div>

            </div>
          </div>
        </div>

        {/* CONTACT HERO FOOTER */}
        <BentoCard className="col-span-4" delay={0.7} style={{ background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(139, 92, 246, 0.1))', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>{t('bento.contact.title')}</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <a href={`tel:${t('bento.contact.phone')}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.2rem', padding: '1rem 2rem', background: 'var(--glass-bg)', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
              <Phone color="var(--accent-cyan)" /> {t('bento.contact.phone')}
            </a>
            <a href={`mailto:${t('bento.contact.email')}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.2rem', padding: '1rem 2rem', background: 'var(--glass-bg)', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
              <Mail color="var(--accent-purple)" /> {t('bento.contact.email')}
            </a>
          </div>
        </BentoCard>

      </div>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      {/* Fallback bounds AppContent directly so if i18next suspends, we don't crash */}
      <Suspense fallback={<div style={{height: '100vh', display: 'flex', alignItems:'center', justifyContent: 'center', color: 'white', background: '#050511'}}>Loading...</div>}>
        <PortfolioContent />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
