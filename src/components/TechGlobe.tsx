import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const skills = [
  "C/C++", "Python", "JavaScript", "SQL", "React", "Node.js",
  "Express.js", "JWT", "REST APIs", "Tailwind CSS", "NumPy", "Pandas",
  "Matplotlib", "Plotly", "MongoDB", "Firebase", "GCP", "Cloud Functions",
  "Vertex AI", "ROS2", "Gazebo", "TurtleBot", "Git", "Linux",
  "SolidWorks", "Plotly Dash", "Event-driven",
];

function fibonacciSphere(count: number, radius: number) {
  const points: [number, number, number][] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    points.push([Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius]);
  }
  return points;
}

// Wireframe icosahedron shell — matches home page geometry
function WireframeShell() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.02;
      meshRef.current.rotation.y += delta * 0.03;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2.8, 1]} />
      <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.06} />
    </mesh>
  );
}

// Swarm particles orbiting the globe
function SwarmParticles({ count = 300 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute in a spherical shell between r=2.5 and r=3.5
      const r = 2.5 + Math.random() * 1.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.08;
      pointsRef.current.rotation.x += delta * 0.04;
      // Subtle mouse follow
      pointsRef.current.position.x = THREE.MathUtils.lerp(
        pointsRef.current.position.x,
        state.mouse.x * 0.3,
        0.03
      );
      pointsRef.current.position.y = THREE.MathUtils.lerp(
        pointsRef.current.position.y,
        state.mouse.y * 0.3,
        0.03
      );
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

// Skill labels placed on the sphere
function SkillNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const positions = useMemo(() => fibonacciSphere(skills.length, 2.6), []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      {skills.map((skill, i) => (
        <group key={skill} position={positions[i]}>
          {/* Geometric node point */}
          <mesh>
            <octahedronGeometry args={[0.06, 0]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
          </mesh>
          {/* Label */}
          <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
            <span className="font-mono text-[9px] tracking-wider uppercase text-foreground/70 whitespace-nowrap select-none">
              {skill}
            </span>
          </Html>
        </group>
      ))}
    </group>
  );
}

export default function TechGlobe() {
  return (
    <div className="w-full h-[450px] relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }} dpr={[1, 2]}>
        <WireframeShell />
        <SwarmParticles count={400} />
        <SkillNodes />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={(3 * Math.PI) / 4}
        />
      </Canvas>
    </div>
  );
}
