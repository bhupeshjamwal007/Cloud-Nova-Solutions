'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, Html } from '@react-three/drei';
import { ThorModel } from './ThorModel';

const Loader = () => (
  <Html center>
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-[rgba(255,255,255,0.1)] border-t-[#0D6EFD] rounded-full animate-spin"></div>
      <span className="text-zinc-400 font-mono text-sm tracking-widest uppercase animate-pulse">Loading Asset</span>
    </div>
  </Html>
);

export default function ModelViewer({ isSubmitted = false }) {
  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        className="w-full h-full absolute inset-0"
      >
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          {/* Position is now fully controlled by GSAP sequence in ThorModel */}
          <ThorModel scale={1.0} isSubmitted={isSubmitted} />
          
          <ContactShadows 
            position={[0, -1.5, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2} 
            far={4} 
            color="#000000"
          />
          
          {/* Studio environment lighting for premium look */}
          <Environment preset="city" />
          
        </Suspense>
      </Canvas>
    </div>
  );
}
