import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Stars } from '@react-three/drei';
import { ThemeProvider } from './ThemeContext';
import { Globe, Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeContext';

function Controls() {
  const { i18n } = useTranslation();
  const { theme, setTheme } = useTheme();

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
  };

  const toggleTheme = () => {
    if (theme === 'system') setTheme('dark');
    else if (theme === 'dark') setTheme('light');
    else setTheme('system');
  };

  return (
    <div style={{ position: 'fixed', top: '1rem', right: '1rem', display: 'flex', gap: '1rem', zIndex: 100 }}>
      <button onClick={toggleLang} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Globe size={18} /> {i18n.language.toUpperCase()}
      </button>
      <button onClick={toggleTheme} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />} {theme === 'system' ? 'SYS' : theme.toUpperCase()}
      </button>
    </div>
  );
}

function HeroSection() {
  const { t } = useTranslation();
  return (
    <section className="glass-panel" style={{ margin: '20vh auto', maxWidth: '800px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', margin: '0 0 1rem 0' }}>{t('hero.title')}</h1>
      <h2 style={{ fontSize: '1.5rem', color: 'var(--accent-color)' }}>{t('hero.role')}</h2>
      <p>{t('hero.location')}</p>
      <p style={{ fontWeight: 600 }}>{t('hero.availability')}</p>
    </section>
  );
}

function ExperienceSection() {
  const { t } = useTranslation();
  const achievements = t('experience.vecode.achievements', { returnObjects: true }) as string[];

  return (
    <section className="glass-panel" style={{ margin: '10vh auto', maxWidth: '900px' }}>
      <h2 style={{ fontSize: '2.5rem', color: 'var(--accent-color)', borderBottom: '2px solid var(--accent-color)', paddingBottom: '0.5rem' }}>
        {t('experience.title')}
      </h2>
      <div style={{ marginTop: '2rem' }}>
        <h3>{t('experience.vecode.name')} - {t('experience.vecode.company')}</h3>
        <p style={{ fontStyle: 'italic', color: 'gray' }}>{t('experience.vecode.date')}</p>
        <h4>{t('experience.vecode.subtitle')}</h4>
        <p>{t('experience.vecode.legacyDesc')}</p>
        
        <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
          {Array.isArray(achievements) && achievements.map((ach, idx) => (
            <li key={idx} style={{ marginBottom: '1rem' }}>{ach}</li>
          ))}
        </ul>

        <div style={{ padding: '1rem', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '8px', marginTop: '2rem' }}>
          <strong>Impact: </strong> {t('experience.vecode.impact')}
        </div>
      </div>
    </section>
  );
}

function AppContent() {
  return (
    <>
      <Controls />
      
      {/* 3D Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <Suspense fallback={null}>
            <Environment preset="city" />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            {/* Placeholder for Deconstructed Model */}
            <mesh>
              <icosahedronGeometry args={[2, 1]} />
              <meshStandardMaterial color="#2563eb" wireframe />
            </mesh>
          </Suspense>
        </Canvas>
      </div>

      {/* Foreground Content */}
      <div style={{ position: 'relative', zIndex: 1, padding: '2rem' }}>
        <HeroSection />
        <ExperienceSection />
      </div>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
