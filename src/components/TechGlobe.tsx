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

function WireframeShell() {
  const meshRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.02;
      meshRef.current.rotation.y += delta * 0.03;
    }
  });
  return (
    <group ref={meshRef}>
      <mesh>
        <icosahedronGeometry args={[2.75, 3]} />
        <meshBasicMaterial color="#0a0a0a" />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[2.76, 1]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.06} />
      </mesh>
    </group>
  );
}

function SwarmParticles({ count = 300 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
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
      pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, state.mouse.x * 0.3, 0.03);
      pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, state.mouse.y * 0.3, 0.03);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.25} sizeAttenuation />
    </points>
  );
}

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
          <mesh>
            <octahedronGeometry args={[0.05, 0]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
          </mesh>
          <Html center distanceFactor={7} style={{ pointerEvents: "none" }}>
            <div
              style={{
                background: "rgba(0, 0, 0, 0.7)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "6px",
                padding: "4px 10px",
                whiteSpace: "nowrap",
                boxShadow: "0 0 12px -4px rgba(255, 255, 255, 0.06)",
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  color: "rgba(255, 255, 255, 0.9)",
                  textTransform: "uppercase",
                }}
              >
                {skill}
              </span>
            </div>
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
