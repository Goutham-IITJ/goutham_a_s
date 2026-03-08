import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const skills = [
  "C/C++", "Python", "JavaScript", "SQL", "React", "Node.js",
  "Express.js", "JWT", "REST APIs", "Tailwind CSS", "NumPy", "Pandas",
  "Matplotlib", "Plotly", "MongoDB", "Firebase", "GCP", "Cloud Functions",
  "Vertex AI", "ROS2", "Gazebo", "TurtleBot", "Git", "Linux",
  "SolidWorks", "Plotly Dashboards", "Event-driven",
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

function SkillTile({ position, label }: { position: [number, number, number]; label: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      <Html
        center
        distanceFactor={8}
        style={{ pointerEvents: "auto" }}
      >
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`font-mono text-[10px] px-3 py-1.5 rounded-md border whitespace-nowrap select-none transition-all duration-200 cursor-default ${
            hovered
              ? "border-foreground/40 text-foreground bg-foreground/10 shadow-[0_0_20px_-4px_hsla(0,0%,100%,0.2)]"
              : "border-border/50 text-muted-foreground bg-background/80 backdrop-blur-sm"
          }`}
        >
          {label}
        </div>
      </Html>
    </group>
  );
}

function Globe() {
  const groupRef = useRef<THREE.Group>(null);

  const positions = useMemo(() => fibonacciSphere(skills.length, 3.2), []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {skills.map((skill, i) => (
        <SkillTile key={skill} position={positions[i]} label={skill} />
      ))}
    </group>
  );
}

export default function TechGlobe() {
  return (
    <div className="w-full h-[450px] relative">
      <Canvas camera={{ position: [0, 0, 9], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <Globe />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={(3 * Math.PI) / 4}
        />
      </Canvas>
    </div>
  );
}
