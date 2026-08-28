import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Stars, Float, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import * as THREE from 'three';

// An abstract data-node structure representing computer vision / AI nodes
const DataNodes = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock?.elapsedTime || state.clock?.getElapsedTime?.() || 0;
      groupRef.current.rotation.y = time * 0.15;
      groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[2.5, 0.5, -2]}>
          <icosahedronGeometry args={[2, 3]} />
          <MeshDistortMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={0.6}
            roughness={0.1}
            metalness={0.8}
            distort={0.3}
            speed={2}
            transparent
            opacity={0.7}
            wireframe
          />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
        <mesh position={[-3, 1, -4]}>
          <octahedronGeometry args={[1.6, 2]} />
          <MeshDistortMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.6}
            roughness={0.1}
            metalness={0.8}
            distort={0.3}
            speed={1.5}
            transparent
            opacity={0.7}
            wireframe
          />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[0, -2, -5]}>
          <torusKnotGeometry args={[1.3, 0.3, 80, 16]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#3b82f6"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.9}
            transparent
            opacity={0.5}
            wireframe
          />
        </mesh>
      </Float>
    </group>
  );
};

export const Hero3D = () => {
  const { t } = useTranslation();

  return (
    <section className="section" style={{ padding: 0, justifyContent: 'center' }}>
      {/* 3D Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ powerPreference: 'high-performance', antialias: true }}>
          <Suspense fallback={null}>
            <Environment preset="night" />
            <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={2.5} color="#8b5cf6" />
            <directionalLight position={[-10, -10, -5]} intensity={2} color="#38bdf8" />
            
            <DataNodes />
          </Suspense>
        </Canvas>
      </div>

      {/* Hero Typography Over 3D */}
      <div style={{ position: 'relative', zIndex: 1, padding: '0 4rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{ color: 'var(--accent-cyan)', fontWeight: 600, letterSpacing: '4px', fontSize: '1.2rem', marginBottom: '1.5rem' }}
          >
            {String(t('bento.hero.greeting') || 'Hi, I am').toUpperCase()}
          </motion.div>
          
          <h1 style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', marginBottom: '1rem', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.04em' }}>
            {String(t('bento.hero.name') || 'JOSÉ MALDONADO').split(' ').map((word, i) => (
              <span key={i} style={{ display: 'block' }}>{word}</span>
            ))}
          </h1>
          
          <h2 className="text-gradient" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, marginTop: '1.5rem' }}>
            {String(t('bento.hero.role') || 'Lead Full-Stack Engineer | AI Algorithm Specialist')}
          </h2>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            style={{ marginTop: '2rem', fontSize: '1.4rem', color: 'var(--text-secondary)', maxWidth: '650px', lineHeight: 1.6 }}
          >
            Building autonomous computer vision pipelines and critical software architectures for the industrial sector.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            style={{ marginTop: '3.5rem' }}
          >
            <div style={{ width: '1px', height: '80px', background: 'linear-gradient(to bottom, var(--accent-cyan), transparent)' }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
