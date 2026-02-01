
'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const GlowingGlobe = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.002;
        }
    });

    return (
        <group>
            {/* Base Sphere (Dark Ocean) */}
            <Sphere args={[2, 64, 64]} ref={meshRef}>
                <meshStandardMaterial
                    color="#0f172a"
                    roughness={0.7}
                    metalness={0.1}
                    emissive="#1e3a8a"
                    emissiveIntensity={0.2}
                />
            </Sphere>

            {/* City Lights / Nodes (Random for demo, would be lat/long) */}
            {[...Array(20)].map((_, i) => {
                const phi = Math.acos(-1 + (2 * i) / 20);
                const theta = Math.sqrt(20 * Math.PI) * phi;
                const x = 2 * Math.cos(theta) * Math.sin(phi);
                const y = 2 * Math.sin(theta) * Math.sin(phi);
                const z = 2 * Math.cos(phi);

                return (
                    <mesh key={i} position={[x, y, z]}>
                        <sphereGeometry args={[0.05, 16, 16]} />
                        <meshBasicMaterial color="#38bdf8" />
                    </mesh>
                )
            })}

            {/* Atmosphere Glow */}
            <Sphere args={[2.2, 64, 64]}>
                <meshPhongMaterial
                    color="#38bdf8"
                    opacity={0.1}
                    transparent
                    side={THREE.BackSide}
                />
            </Sphere>
        </group>
    );
};

export const ImpactGlobe = () => {
    return (
        <div className="h-[600px] w-full relative bg-gray-900 overflow-hidden rounded-xl border border-white/10">
            <div className="absolute top-6 left-6 z-10">
                <h2 className="text-3xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                    Global Impact
                </h2>
                <p className="text-gray-400">IISER Pune Alumni across the world</p>
            </div>

            <Canvas camera={{ position: [0, 0, 5.5] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#38bdf8" />
                <GlowingGlobe />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>

            <div className="absolute bottom-6 right-6 z-10 flex flex-col gap-2">
                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
                    <span className="text-2xl font-bold text-white">45+</span>
                    <span className="text-xs text-gray-400 block">Countries</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
                    <span className="text-2xl font-bold text-emerald-400">120+</span>
                    <span className="text-xs text-gray-400 block">Universities</span>
                </div>
            </div>
        </div>
    );
};
