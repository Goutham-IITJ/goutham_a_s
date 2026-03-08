import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "framer-motion";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMouseActive;
  varying vec2 vUv;

  #define PI 3.14159265359

  // Attempt a chromatic accretion disk with lensing
  vec3 accretionDisk(vec2 uv, float time) {
    vec2 center = vec2(0.5, 0.5);
    vec2 p = uv - center;

    // Slight tilt for 3D perspective (elliptical)
    p.y *= 2.2;

    float r = length(p);
    float angle = atan(p.y, p.x);

    // Event horizon
    float horizon = 0.08;
    if (r < horizon) return vec3(0.0);

    // Gravitational lensing distortion
    float lensing = 1.0 / (1.0 + exp(-40.0 * (r - 0.1)));
    float lensedR = r * lensing + (1.0 - lensing) * 0.08;

    // Accretion disk rings
    float diskInner = 0.09;
    float diskOuter = 0.45;
    float diskMask = smoothstep(diskInner, diskInner + 0.03, lensedR) * 
                     smoothstep(diskOuter + 0.05, diskOuter - 0.02, lensedR);

    // Spiral structure
    float spiral = sin(angle * 3.0 - log(lensedR + 0.01) * 8.0 + time * 1.5) * 0.5 + 0.5;
    float spiral2 = sin(angle * 5.0 + log(lensedR + 0.01) * 6.0 - time * 0.8) * 0.5 + 0.5;
    float spiral3 = sin(angle * 2.0 - log(lensedR + 0.01) * 12.0 + time * 2.0) * 0.5 + 0.5;

    // Ring bands
    float ring1 = exp(-pow((lensedR - 0.14) * 20.0, 2.0));
    float ring2 = exp(-pow((lensedR - 0.20) * 15.0, 2.0));
    float ring3 = exp(-pow((lensedR - 0.28) * 12.0, 2.0));
    float ring4 = exp(-pow((lensedR - 0.36) * 10.0, 2.0));

    // Intensity based on distance from center
    float radialGlow = exp(-lensedR * 4.0);

    // Color layers — chromatic like the reference
    // Inner: white/blue hot
    vec3 innerColor = vec3(0.9, 0.95, 1.0) * ring1 * 2.0;
    // Mid-inner: warm yellow/orange
    vec3 midColor1 = vec3(1.0, 0.7, 0.2) * ring2 * 1.5;
    // Mid: red/orange
    vec3 midColor2 = vec3(1.0, 0.3, 0.1) * ring3 * 1.2;
    // Outer: dark red/brown
    vec3 outerColor = vec3(0.6, 0.15, 0.05) * ring4;

    // Combine with spiral modulation
    float spiralMod = mix(0.6, 1.0, spiral * 0.5 + spiral2 * 0.3 + spiral3 * 0.2);

    vec3 diskColor = (innerColor + midColor1 + midColor2 + outerColor) * spiralMod * diskMask;

    // Photon ring — bright thin ring at event horizon edge
    float photonRing = exp(-pow((lensedR - 0.095) * 80.0, 2.0));
    vec3 photonColor = vec3(0.8, 0.85, 1.0) * photonRing * 1.5;

    // Lensed light above/below (gravitational lensing arc)
    vec2 pRaw = uv - center;
    float rawR = length(pRaw);
    float aboveBelow = exp(-pow(pRaw.y * 5.0, 2.0)); // concentrate at equator
    float lensingArc = exp(-pow((rawR - 0.12) * 15.0, 2.0)) * aboveBelow;
    vec3 arcColor = vec3(0.7, 0.75, 1.0) * lensingArc * 0.8;

    // Subtle glow
    vec3 glow = vec3(0.4, 0.2, 0.05) * radialGlow * 0.3 * diskMask;

    // Star field background
    float stars = 0.0;
    vec2 starUv = uv * 80.0;
    vec2 starId = floor(starUv);
    vec2 starF = fract(starUv) - 0.5;
    float starHash = fract(sin(dot(starId, vec2(127.1, 311.7))) * 43758.5453);
    if (starHash > 0.97) {
      float starBright = (starHash - 0.97) / 0.03;
      float twinkle = sin(time * 2.0 + starHash * 50.0) * 0.3 + 0.7;
      stars = smoothstep(0.3, 0.0, length(starF)) * starBright * twinkle * 0.4;
    }
    vec3 bg = vec3(stars);

    // Mouse interaction — warp accretion near cursor
    if (uMouseActive > 0.5) {
      vec2 mDelta = uv - uMouse;
      float mDist = length(mDelta);
      float warp = exp(-mDist * mDist * 80.0) * 0.15;
      diskColor += vec3(0.3, 0.5, 1.0) * warp;
    }

    return bg + diskColor + photonColor + arcColor + glow;
  }

  void main() {
    vec3 col = accretionDisk(vUv, uTime);

    // Vignette
    vec2 vig = vUv - 0.5;
    col *= 1.0 - dot(vig, vig) * 0.8;

    // Tone mapping
    col = col / (col + vec3(1.0));
    col = pow(col, vec3(0.9));

    gl_FragColor = vec4(col, 1.0);
  }
`;

function BlackHoleMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: 0 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseActive: { value: 0 },
    }),
    []
  );

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
    uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
    // Smooth fade for mouse active
    uniforms.uMouseActive.value += (mouseRef.current.active - uniforms.uMouseActive.value) * 0.1;
  });

  return (
    <mesh
      ref={meshRef}
      onPointerMove={(e) => {
        if (e.uv) {
          mouseRef.current.x = e.uv.x;
          mouseRef.current.y = e.uv.y;
          mouseRef.current.active = 1;
        }
      }}
      onPointerLeave={() => {
        mouseRef.current.active = 0;
      }}
    >
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function AsciiPortrait() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="cursor-crosshair select-none relative overflow-hidden flex flex-col items-center justify-center"
    >
      <div className="w-full aspect-[16/11] rounded-lg overflow-hidden">
        <Canvas
          camera={{ position: [0, 0, 1], fov: 90 }}
          gl={{ antialias: true, alpha: false }}
          style={{ background: "black" }}
        >
          <BlackHoleMesh />
        </Canvas>
      </div>

      <p className="font-mono text-[8px] text-muted-foreground/40 mt-3 text-center tracking-widest uppercase">
        singularity
      </p>
    </motion.div>
  );
}
