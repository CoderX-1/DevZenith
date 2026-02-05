/// <reference types="@react-three/fiber" />
import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { 
  Float, 
  MeshTransmissionMaterial, 
  Environment, 
  Sparkles, 
  PerspectiveCamera,
  useScroll
} from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// Monolith component handles the central 3D asset behavior
const Monolith = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  // High-end glass material configuration
  const materialProps = {
    thickness: 0.5,
    roughness: 0.1,
    transmission: 1,
    ior: 1.2,
    chromaticAberration: 0.05,
    backside: true,
  };

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Smooth scroll integration without Drei ScrollControls to stay lightweight
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollY / maxScroll, 1);
    
    // Transform logic based on scroll phases
    // Phase 1: 0 - 0.2 (Hero)
    // Phase 2: 0.2 - 0.5 (Services)
    // Phase 3: 0.5 - 0.8 (Work)
    // Phase 4: 0.8 - 1.0 (Contact)
    
    const targetScale = 1.5 - progress * 0.5;
    const targetRotationX = state.clock.getElapsedTime() * 0.2 + progress * Math.PI;
    const targetZ = -2 + progress * 2;

    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationX, 0.1);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.1);
    
    // Fragment separation effect on high scroll
    if (meshRef.current) {
      const shatterAmount = progress > 0.3 ? (progress - 0.3) * 5 : 0;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1;
    }
  });

  return (
    // Fixed intrinsic element types by adding fiber reference
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef}>
          <octahedronGeometry args={[1, 0]} />
          <MeshTransmissionMaterial {...materialProps} color="#FFD700" />
        </mesh>
      </Float>
      
      {/* Decorative inner core */}
      <mesh scale={0.4}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={2} />
      </mesh>
    </group>
  );
};

// Main Experience component used within <Canvas />
const Experience = () => {
  return (
    // Replaced invalid div with fragment to avoid DOM elements inside R3F Canvas
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
      
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#FFD700" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#ffffff" />
      
      <Monolith />
      
      <Sparkles 
        count={60} 
        scale={10} 
        size={2} 
        speed={0.4} 
        opacity={0.2} 
        color="#FFD700" 
      />
      
      <Environment preset="city" />
    </>
  );
};

export default Experience;