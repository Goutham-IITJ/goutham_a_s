import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// 1. The new Swarm Particle System
function SwarmParticles({ count = 600 }) {
  const pointsRef = useRef(null);

  // Generate random XYZ coordinates for the swarm nodes
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Spread the particles out in a 10x10x10 grid area
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [count]);

  // Animate the swarm
  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Passive patrol drifting
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.03;

      // Kinematic mouse tracking (smoothly interpolates towards cursor)
      pointsRef.current.position.x = THREE.MathUtils.lerp(
        pointsRef.current.position.x,
        state.mouse.x * 0.8,
        0.05,
      );
      pointsRef.current.position.y = THREE.MathUtils.lerp(
        pointsRef.current.position.y,
        state.mouse.y * 0.8,
        0.05,
      );
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      {/* Stark white particles with slight transparency */}
      <pointsMaterial
        size={0.03}
        color="#ffffff"
        transparent
        opacity={0.4}
        sizeAttenuation={true}
      />
    </points>
  );
}

// 2. The Original Central Node
function SpinningWireframe() {
  const meshRef = useRef(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.8, 0]} />
      <meshBasicMaterial
        color="#ffffff"
        wireframe={true}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

// 3. The Main Canvas Container
export default function TechCanvas() {
  return (
    <div className="relative w-full h-full min-h-[350px] cursor-grab active:cursor-grabbing flex items-center justify-center">
      {/* Pulled the camera back slightly to fit the swarm */}
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]}>
        <SwarmParticles count={800} />
        <SpinningWireframe />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
