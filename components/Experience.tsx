
/// <reference types="@react-three/fiber" />
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Environment, Sparkles, PerspectiveCamera, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ExperienceProps {
  isMobile: boolean;
}

const tempVec = new THREE.Vector3();

const DustParticles = () => {
  const count = 1000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0005;
      pointsRef.current.rotation.x += 0.0002;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.1}
      />
    </Points>
  );
};

const NeuralCore: React.FC<ExperienceProps> = ({ isMobile }) => {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const innerGlowRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.SpotLight>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollY / Math.max(maxScroll, 1), 1);
    
    // THE TECH JOURNEY PATHING
    let tX = 0, tZ = 0, tScale = isMobile ? 1.4 : 2.0, tEmissive = 0.5;
    let ringExpansion = 1.0;
    let rotationSpeed = 1.0;

    if (progress <= 0.2) {
      // PHASE 1: HERO
      tScale = THREE.MathUtils.lerp(isMobile ? 1.4 : 2.0, isMobile ? 1.2 : 1.7, progress * 5);
      ringExpansion = 1.0;
    } else if (progress <= 0.5) {
      // PHASE 2: SERVICES (Expand & Tilt)
      const p = (progress - 0.2) * 3.33;
      tX = THREE.MathUtils.lerp(0, isMobile ? 0 : 2.8, p);
      tScale = THREE.MathUtils.lerp(isMobile ? 1.2 : 1.7, isMobile ? 0.9 : 1.4, p);
      ringExpansion = THREE.MathUtils.lerp(1.0, 1.8, p);
      rotationSpeed = 1.5;
    } else if (progress <= 0.8) {
      // PHASE 3: WORK (Fast Counter-Rotation)
      const p = (progress - 0.5) * 3.33;
      tX = THREE.MathUtils.lerp(isMobile ? 0 : 2.8, 0, p);
      tZ = THREE.MathUtils.lerp(0, -6, p);
      tScale = THREE.MathUtils.lerp(isMobile ? 0.9 : 1.4, isMobile ? 0.7 : 1.0, p);
      ringExpansion = THREE.MathUtils.lerp(1.8, 1.2, p);
      rotationSpeed = 4.0;
    } else {
      // PHASE 4: CONTACT (Convergence & Glow)
      const p = (progress - 0.8) * 5;
      tZ = THREE.MathUtils.lerp(-6, 0, p);
      tScale = THREE.MathUtils.lerp(isMobile ? 0.7 : 1.0, isMobile ? 2.5 : 3.5, p);
      tEmissive = THREE.MathUtils.lerp(0.5, 10.0, p);
      ringExpansion = THREE.MathUtils.lerp(1.2, 0.95, p);
      rotationSpeed = 0.5;
    }

    // Apply global transforms
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, tX, 0.05);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, tZ, 0.05);
    tempVec.set(tScale, tScale, tScale);
    groupRef.current.scale.lerp(tempVec, 0.05);

    // Animate Rings
    const time = state.clock.getElapsedTime();
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.5 * rotationSpeed;
      ring1Ref.current.rotation.y = time * 0.3 * rotationSpeed;
      ring1Ref.current.scale.setScalar(ringExpansion);
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -time * 0.6 * rotationSpeed;
      ring2Ref.current.rotation.x = time * 0.2 * rotationSpeed;
      ring2Ref.current.scale.setScalar(ringExpansion * 0.85);
    }

    // Core pulsing & Mouse tracking
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.01;
      const pulse = Math.sin(time * 2) * 0.05 + 1;
      coreRef.current.scale.setScalar(pulse);
    }

    if (innerGlowRef.current) {
      (innerGlowRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = tEmissive;
    }

    // Spotlight mouse tracking
    if (lightRef.current) {
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, state.mouse.x * 8, 0.1);
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, state.mouse.y * 8, 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      <spotLight 
        ref={lightRef}
        position={[0, 0, 10]} 
        angle={0.25} 
        penumbra={1} 
        intensity={20} 
        color="#FFD700" 
      />

      {/* Main Glass Housing */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.6, 64, 64]} />
        <meshPhysicalMaterial 
          color="#FFD700"
          metalness={0.1}
          roughness={0.02}
          transmission={1.0}
          thickness={1.5}
          ior={1.8}
          transparent
          opacity={0.6}
          envMapIntensity={2}
        />
      </mesh>

      {/* Internal Energy Source */}
      <mesh ref={innerGlowRef} scale={0.3}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={1} />
      </mesh>

      {/* Technical Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.2, 0.02, 8, 64]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={1} 
          roughness={0.1} 
          emissive="#FFD700" 
          emissiveIntensity={0.2} 
        />
      </mesh>

      {/* Technical Ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.4, 0.015, 6, 64]} />
        <meshStandardMaterial 
          color="#ffffff" 
          metalness={1} 
          roughness={0} 
          opacity={0.5} 
          transparent 
        />
      </mesh>
    </group>
  );
};

const Experience: React.FC<ExperienceProps> = ({ isMobile }) => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
      <ambientLight intensity={0.2} />
      
      <NeuralCore isMobile={isMobile} />
      
      <DustParticles />
      <Sparkles count={isMobile ? 25 : 80} scale={20} size={1.5} speed={0.5} opacity={0.1} color="#FFD700" />
      <Environment preset="night" />
    </>
  );
};

export default Experience;
