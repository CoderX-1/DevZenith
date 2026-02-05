
/// <reference types="@react-three/fiber" />
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { 
  Float, 
  Environment, 
  Sparkles, 
  PerspectiveCamera,
} from '@react-three/drei';
import * as THREE from 'three';

interface ExperienceProps {
  isMobile: boolean;
}

// Pre-allocate objects outside the frame loop to avoid GC overhead
const tempVec = new THREE.Vector3();

const Monolith: React.FC<ExperienceProps> = ({ isMobile }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Get Scroll Progress
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollY / Math.max(maxScroll, 1), 1);
    
    // JOURNEY PHASES
    let targetX = 0;
    let targetZ = 0;
    let targetScale = 1.8;
    let targetRotationY = state.clock.getElapsedTime() * 0.3;
    let targetEmissiveIntensity = 0.5;

    if (progress <= 0.2) {
      targetScale = THREE.MathUtils.lerp(1.8, 1.5, progress * 5);
      targetX = 0;
    } else if (progress <= 0.5) {
      const p = (progress - 0.2) * 3.33;
      targetX = THREE.MathUtils.lerp(0, isMobile ? 0 : 2.5, p);
      targetScale = THREE.MathUtils.lerp(1.5, 1.2, p);
      targetRotationY += p * 2;
    } else if (progress <= 0.8) {
      const p = (progress - 0.5) * 3.33;
      targetX = THREE.MathUtils.lerp(isMobile ? 0 : 2.5, 0, p);
      targetZ = THREE.MathUtils.lerp(0, -5, p);
      targetScale = THREE.MathUtils.lerp(1.2, 0.8, p);
      targetRotationY += 2 + p * 5;
    } else {
      const p = (progress - 0.8) * 5;
      targetZ = THREE.MathUtils.lerp(-5, 0, p);
      targetScale = THREE.MathUtils.lerp(0.8, 2.2, p);
      targetEmissiveIntensity = THREE.MathUtils.lerp(0.5, 5, p);
      targetX = 0;
    }

    // Smooth transition using pre-allocated vector
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.05);
    
    tempVec.set(targetScale, targetScale, targetScale);
    groupRef.current.scale.lerp(tempVec, 0.05);
    
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);

    if (innerCoreRef.current) {
      const mat = innerCoreRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = targetEmissiveIntensity;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial 
            color="#FFD700"
            metalness={0.1}
            roughness={0.05}
            transmission={0.9}
            thickness={1}
            ior={1.5}
            transparent
            opacity={0.8}
            envMapIntensity={1}
          />
        </mesh>
      </Float>
      
      {/* Dynamic Inner Core */}
      <mesh ref={innerCoreRef} scale={0.3}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial 
          color="#FFD700" 
          emissive="#FFD700" 
          emissiveIntensity={1} 
        />
      </mesh>
    </group>
  );
};

const Experience: React.FC<ExperienceProps> = ({ isMobile }) => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={35} />
      
      <ambientLight intensity={0.4} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={3} color="#FFD700" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ffffff" />
      
      <Monolith isMobile={isMobile} />
      
      <Sparkles 
        count={isMobile ? 30 : 80} 
        scale={15} 
        size={2} 
        speed={0.4} 
        opacity={0.3} 
        color="#FFD700" 
      />
      
      <Environment preset="night" />
    </>
  );
};

export default Experience;
