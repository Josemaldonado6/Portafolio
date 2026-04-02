import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Stars, Float, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Globe, Plane, GraduationCap, Code2, MapPin, Briefcase, CheckCircle2 } from 'lucide-react';
import { ThemeProvider } from './ThemeContext';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// Reusable animated Bento Card wrapper with Mouse Glow & Expand functionality
const BentoCard = ({ children, className, delay = 0, style, id, onExpand }: { children: React.ReactNode, className?: string, delay?: number, style?: React.CSSProperties, id?: string, onExpand?: (id: string) => void }) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      layoutId={id}
      onClick={() => id && onExpand?.(id)}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`bento-card ${className || ''}`}
      style={{ 
        ...style,
        cursor: id ? 'zoom-in' : 'default',
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
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  // Cast arrays safely
  const skillsList = t('bento.skills.list', { returnObjects: true }) as string[];

  const renderExpandedContent = (id: string) => {
    // This helper renders the same content inside the modal
    // For simplicity, we repeat the logic based on ID
    switch(id) {
      case 'hero': return (
        <div style={{ padding: '2rem' }}>
          <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>{t('bento.hero.name')}</h1>
          <h2 className="text-gradient" style={{ fontSize: '2rem' }}>{t('bento.hero.role')}</h2>
          <p style={{ marginTop: '2rem', fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Especialista en arquitecturas Full-Stack críticas y sistemas de Visión Artificial Autónoma.</p>
        </div>
      );
      case 'skills': return (
        <div>
          <h3 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>{t('bento.skills.title')}</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {skillsList.map((s, i) => <span key={i} style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem 2rem', borderRadius: '12px' }}>{s}</span>)}
          </div>
        </div>
      );
      case 'education': return (
        <div>
          <h3 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>{t('bento.education.title')}</h3>
          <div style={{ borderLeft: '4px solid var(--accent-purple)', paddingLeft: '2rem' }}>
            <h4 style={{ fontSize: '1.8rem', color: 'var(--accent-cyan)' }}>{t('bento.education.degree1')}</h4>
            <p>{t('bento.education.uni')} | {t('bento.education.date1')}</p>
            <hr style={{ border: 'none', borderTop: '1px solid var(--glass-border)', margin: '2rem 0' }} />
            <h4 style={{ fontSize: '1.8rem' }}>{t('bento.education.degree2')}</h4>
            <p>{t('bento.education.uni')} | {t('bento.education.date2')}</p>
          </div>
        </div>
      );
      case 'vecode_vid_1': return <img src="/assets/projects/vecode/old_auth.png" style={{ width: '100%', borderRadius: '20px' }} />;
      case 'vecode_vid_2': return <img src="/assets/projects/vecode/new_dashboard.png" style={{ width: '100%', borderRadius: '20px' }} />;
      case 'stealth_vid_1': return <img src="/assets/projects/stealth/stealth_draft.png" style={{ width: '100%', borderRadius: '20px' }} />;
      case 'stealth_vid_2': return <img src="/assets/projects/stealth/stealth_drone.png" style={{ width: '100%', borderRadius: '20px' }} />;
      default: return <div style={{ color: 'white' }}>Contenido en detalle para {id} próximamente...</div>;
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(t('bento.contact.email'));
    alert('Correo copiado al portapapeles');
  };

  return (
    <>
      <Controls />
      
      <AnimatePresence>
        {expandedId && (
          <motion.div 
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedId(null)}
          >
            <motion.div 
              layoutId={expandedId}
              className="expanded-card"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setExpandedId(null)}
                style={{ position: 'absolute', top: '2rem', right: '2rem', padding: '0.5rem 1rem' }}
              >
                Cerrar Esc
              </button>
              {/* Simplified Modal Content */}
              <div style={{ padding: '1rem' }}>
                 <div style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', marginBottom: '1rem' }}>MODO ENFOQUE</div>
                 {renderExpandedContent(expandedId)}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* 3D Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vw', maxHeight: '100vh', zIndex: -1, pointerEvents: 'none', opacity: 0.6 }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <Suspense fallback={null}>
            <Environment preset="night" />
            <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={0.5} />
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={3} color="#8b5cf6" />
            <directionalLight position={[-10, -10, -5]} intensity={2} color="#38bdf8" />
            
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} enablePan={false} />
            
            <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
              <mesh position={[4, 1, -2]}>
                <icosahedronGeometry args={[2.5, 8]} />
                <MeshDistortMaterial 
                  color="#38bdf8" 
                  emissive="#000000"
                  emissiveIntensity={0}
                  roughness={0.2} 
                  metalness={0.9} 
                  distort={0.4} 
                  speed={1.5} 
                  transparent
                  opacity={0.4}
                />
              </mesh>
            </Float>
          </Suspense>
        </Canvas>
      </div>

      {/* Main Bento UI */}
      <div className="bento-container">
        
        {/* HERO CARD (Master of Engineering) */}
        <BentoCard id="hero" onExpand={setExpandedId} className="col-span-6" delay={0.1}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', zIndex: 2 }}>
            <span style={{ color: 'var(--accent-cyan)', fontWeight: 600, letterSpacing: '3px', fontSize: '0.9rem' }}>{t('bento.hero.greeting').toUpperCase()}</span>
            <h1 style={{ fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', marginBottom: 0, fontWeight: 900, lineHeight: 1 }}>
              {t('bento.hero.name')}
            </h1>
            <h2 className="text-gradient" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 700 }}>
              {t('bento.hero.role')}
            </h2>
            <div style={{ display: 'flex', gap: '1.2rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: 'var(--accent-cyan)', padding: '0.6rem 1.4rem', borderRadius: '50px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                <CheckCircle2 size={18} /> {t('bento.hero.status')}
              </span>
              <span style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '0.6rem 1.4rem', borderRadius: '50px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <MapPin size={18} /> {t('bento.about.location')}
              </span>
            </div>
          </div>
        </BentoCard>

        {/* SKILLS (Tech Ecosystem) - REMOVED row-span-2 to fix gap */}
        <BentoCard id="skills" onExpand={setExpandedId} className="col-span-6" delay={0.2}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
            <div style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '0.8rem', borderRadius: '12px' }}>
              <Code2 color="var(--accent-cyan)" size={28} />
            </div>
            <h3 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800 }}>{t('bento.skills.title')}</h3>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {Array.isArray(skillsList) && skillsList.map((skill, i) => (
              <motion.span 
                key={i}
                whileHover={{ scale: 1.08, backgroundColor: 'rgba(56, 189, 248, 0.25)', borderColor: 'var(--accent-cyan)' }}
                style={{ 
                  background: 'rgba(255, 255, 255, 0.05)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '0.8rem 1.5rem', 
                  borderRadius: '16px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'default',
                  transition: 'all 0.3s ease'
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </BentoCard>

        {/* EDUCATION (Advanced Engineering) */}
        <BentoCard id="education" onExpand={setExpandedId} className="col-span-6" delay={0.3}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <GraduationCap color="var(--accent-purple)" size={28} />
            <h3 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800 }}>{t('bento.education.title')}</h3>
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent-cyan)', fontSize: '1.3rem', fontWeight: 700 }}>{t('bento.education.degree1')}</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
              <span>{t('bento.education.uni')}</span>
              <span>{t('bento.education.date1')}</span>
            </div>
          </div>

          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 600 }}>{t('bento.education.degree2')}</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
              <span>{t('bento.education.uni')}</span>
              <span>{t('bento.education.date2')}</span>
            </div>
          </div>
        </BentoCard>

        {/* MOBILITY & LANGUAGES (25/25 split) */}
        <BentoCard id="mobility" onExpand={setExpandedId} className="col-span-3" delay={0.4}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
            <Plane color="var(--accent-cyan)" size={24} />
            <h3 style={{ margin: 0, fontSize: '1.4rem' }}>{t('bento.mobility.title')}</h3>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '2.2', fontSize: '1.05rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-cyan)' }} />
              <strong style={{ color: 'var(--text-primary)' }}>{t('bento.mobility.availability')}</strong>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-purple)' }} />
              {t('bento.mobility.relocation')}
            </li>
            <li>{t('bento.mobility.visa')}</li>
            <li>{t('bento.mobility.passport')}</li>
          </ul>
        </BentoCard>

        <BentoCard id="languages" onExpand={setExpandedId} className="col-span-3" delay={0.5}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
            <Globe color="var(--accent-purple)" size={24} />
            <h3 style={{ margin: 0, fontSize: '1.4rem' }}>{t('bento.languages.title')}</h3>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{t('bento.languages.es').split('(')[0]}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>{t('bento.languages.es').match(/\((.*)\)/)?.[1] || 'Nativo'}</div>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{t('bento.languages.en').split('(')[0]}</div>
            <div style={{ color: 'var(--accent-cyan)', fontSize: '0.95rem', fontWeight: 600 }}>{t('bento.languages.en').match(/\((.*)\)/)?.[1] || 'B2 Conversacional'}</div>
          </div>
        </BentoCard>

        {/* CASE STUDIES (Vertical Bento Layout for Stability) */}
        <div className="col-span-12" style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginTop: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0 1rem' }}>
            <Briefcase color="var(--accent-cyan)" size={32} />
            <h3 style={{ fontSize: '2.5rem', fontWeight: 800 }}>{t('bento.case_studies.title')}</h3>
          </div>

          {/* VECODE CASE STUDY */}
          <BentoCard delay={0.1} className="col-span-12">
            <div style={{ borderLeft: '4px solid var(--accent-cyan)', paddingLeft: '2rem' }}>
              <h4 style={{ fontSize: '2.4rem', marginBottom: '0.8rem' }}>{t('bento.case_studies.vecode.name')}</h4>
              <div style={{ fontSize: '1.3rem', color: 'var(--accent-purple)', fontWeight: 600, marginBottom: '0.5rem' }}>{t('bento.case_studies.vecode.role')}</div>
              <div style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>{t('bento.case_studies.vecode.company')} • {t('bento.case_studies.vecode.date')}</div>
              
              <p style={{ fontSize: '1.2rem', fontStyle: 'italic', opacity: 0.9, marginBottom: '3rem', lineHeight: 1.8, maxWidth: '1000px' }}>{t('bento.case_studies.vecode.context')}</p>
              
              <div className="comparison-grid" style={{ marginBottom: '4rem' }}>
                <div className="visual-item" onClick={() => setExpandedId('vecode_vid_1')} style={{ border: '2px solid #722f37', cursor: 'zoom-in' }}>
                  <motion.img layoutId="vecode_vid_1" src="/assets/projects/vecode/old_auth.png" alt="Legacy" style={{ height: '400px' }} />
                  <span className="visual-label" style={{ background: '#722f37', color: 'white' }}>{t('bento.case_studies.vecode.visuals.before')}</span>
                </div>
                <div className="visual-item" onClick={() => setExpandedId('vecode_vid_2')} style={{ border: '2px solid var(--accent-cyan)', cursor: 'zoom-in' }}>
                  <motion.img layoutId="vecode_vid_2" src="/assets/projects/vecode/new_dashboard.png" alt="Modern" style={{ height: '400px' }} />
                  <span className="visual-label" style={{ background: 'var(--accent-cyan)', color: 'black' }}>{t('bento.case_studies.vecode.visuals.after')}</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
                {[1,2,3].map(i => (
                  <div key={i}>
                    <h5 style={{ color: 'var(--accent-cyan)', fontSize: '1.3rem', marginBottom: '1rem' }}>{t(`bento.case_studies.vecode.p${i}_title`)}</h5>
                    <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.8 }}>{t(`bento.case_studies.vecode.p${i}_desc`)}</p>
                  </div>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* STEALTH TECH CASE STUDY */}
          <BentoCard delay={0.2} className="col-span-12" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(6, 6, 18, 0.95))' }}>
            <div style={{ borderLeft: '4px solid var(--accent-purple)', paddingLeft: '2rem' }}>
              <h4 style={{ fontSize: '2.4rem', marginBottom: '0.8rem' }}>{t('bento.case_studies.stealth.name')}</h4>
              <div style={{ fontSize: '1.3rem', color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '0.5rem' }}>{t('bento.case_studies.stealth.role')}</div>
              <div style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>{t('bento.case_studies.stealth.company')} • {t('bento.case_studies.stealth.date')}</div>
              
              <p style={{ fontSize: '1.2rem', fontStyle: 'italic', opacity: 0.9, marginBottom: '3rem', lineHeight: 1.8, maxWidth: '1000px' }}>{t('bento.case_studies.stealth.context')}</p>

              <div className="comparison-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', marginBottom: '4rem' }}>
                <div className="visual-item" onClick={() => setExpandedId('stealth_vid_2')} style={{ border: '1px solid var(--accent-purple)', cursor: 'zoom-in' }}>
                  <motion.img layoutId="stealth_vid_2" src="/assets/projects/stealth/stealth_drone.png" alt="Drone Pilot" style={{ height: '450px' }} />
                  <span className="visual-label" style={{ background: 'var(--accent-purple)', color: 'white' }}>{t('bento.case_studies.stealth.visuals.screen2')}</span>
                </div>
                <div className="visual-item" onClick={() => setExpandedId('stealth_vid_1')} style={{ border: '1px solid var(--accent-purple)', cursor: 'zoom-in' }}>
                  <motion.img layoutId="stealth_vid_1" src="/assets/projects/stealth/stealth_draft.png" alt="Draft Analysis" style={{ height: '450px' }} />
                  <span className="visual-label" style={{ background: 'var(--accent-purple)', color: 'white' }}>{t('bento.case_studies.stealth.visuals.screen1')}</span>
                </div>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <h5 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', marginBottom: '2rem' }}>{t('bento.case_studies.stealth.expertise_table.title')}</h5>
                <div style={{ overflowX: 'auto' }}>
                  <table className="expertise-table">
                    <thead>
                      <tr>
                        {((t('bento.case_studies.stealth.expertise_table.headers', { returnObjects: true }) as string[]) || []).map((h, i) => <th key={i} style={{ fontSize: '1.1rem' }}>{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {((t('bento.case_studies.stealth.expertise_table.rows', { returnObjects: true }) as any[]) || []).map((row, idx) => (
                        <tr key={idx}>
                          <td style={{ minWidth: '220px', fontSize: '1.05rem', fontWeight: 600 }}>{row.domain}</td>
                          <td style={{ fontSize: '1rem' }}>{row.capabilities}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </BentoCard>
        </div>

        {/* BENTO FOOTER (Contact Redesign) */}
        <BentoCard className="col-span-12" delay={0.7} style={{ background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(6, 6, 18, 0.9))', minHeight: '400px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', width: '100%', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', fontWeight: 900, lineHeight: 1.1 }}>{t('bento.contact.title')}</h2>
              <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>Soluciones críticas de software y algoritmos de visión autónoma para la industria global.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '32px', border: '1px solid var(--glass-border)' }}>
                <div style={{ color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.9rem', letterSpacing: '1px' }}>EMAIL EMPRESARIAL</div>
                <div onClick={copyEmail} style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 700, color: 'white', cursor: 'copy', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {t('bento.contact.email')}
                  <div style={{ background: 'rgba(255,255,255,1)', color: 'black', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.8rem' }}>Copiar</div>
                </div>
              </div>
              <div style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '2rem', borderRadius: '32px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                <div style={{ color: 'var(--accent-purple)', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.9rem', letterSpacing: '1px' }}>WHATSAPP DIRECTO</div>
                <a href={`tel:${t('bento.contact.phone')}`} style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 700, color: 'white', textDecoration: 'none' }}>
                  {t('bento.contact.phone')}
                </a>
              </div>
            </div>
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
