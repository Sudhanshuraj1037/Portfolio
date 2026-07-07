import { useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 42;
const CONNECT_DISTANCE = 2.6;
const MAX_CONNECTIONS_PER_NODE = 3;
const PULSE_COUNT = 7;
const SIGNAL_COLOR = "#5b8cff";

type Edge = { a: THREE.Vector3; b: THREE.Vector3 };
type PointerRef = RefObject<{ x: number; y: number }>;

// Small seeded RNG so the layout is stable across re-renders within a session
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateGraph() {
  const rand = mulberry32(7);
  const nodes: THREE.Vector3[] = [];

  for (let i = 0; i < NODE_COUNT; i++) {
    // Bias density toward the right/back so the left side (where headline
    // text sits) stays visually quieter.
    const x = (rand() - 0.35) * 9;
    const y = (rand() - 0.5) * 6;
    const z = (rand() - 0.5) * 5 - 1;
    nodes.push(new THREE.Vector3(x, y, z));
  }

  const edges: Edge[] = [];
  const seen = new Set<string>();

  nodes.forEach((node, i) => {
    const distances = nodes
      .map((other, j) => ({ j, dist: node.distanceTo(other) }))
      .filter((d) => d.j !== i && d.dist < CONNECT_DISTANCE)
      .sort((a, b) => a.dist - b.dist)
      .slice(0, MAX_CONNECTIONS_PER_NODE);

    distances.forEach(({ j }) => {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push({ a: node, b: nodes[j] });
      }
    });
  });

  return { nodes, edges };
}

export function NeuralNetworkScene({ pointerRef }: { pointerRef: PointerRef }) {
  const { nodes, edges } = useMemo(generateGraph, []);
  const groupRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.InstancedMesh>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  const nodePositions = useMemo(() => {
    const arr = new Float32Array(nodes.length * 3);
    nodes.forEach((n, i) => n.toArray(arr, i * 3));
    return arr;
  }, [nodes]);

  const edgePositions = useMemo(() => {
    const arr = new Float32Array(edges.length * 6);
    edges.forEach((e, i) => {
      e.a.toArray(arr, i * 6);
      e.b.toArray(arr, i * 6 + 3);
    });
    return arr;
  }, [edges]);

  // Each pulse travels along a random edge, looping with a fresh edge on completion
  const pulses = useMemo(
    () =>
      Array.from({ length: PULSE_COUNT }, () => ({
        edge: edges[Math.floor(Math.random() * edges.length)],
        t: Math.random(),
        speed: 0.15 + Math.random() * 0.15,
      })),
    [edges]
  );

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((_, delta) => {
    // Gentle parallax toward pointer position, damped
    targetRotation.current.y = pointerRef.current.x * 0.25;
    targetRotation.current.x = pointerRef.current.y * 0.12;

    if (groupRef.current) {
      groupRef.current.rotation.y +=
        (targetRotation.current.y - groupRef.current.rotation.y) * 0.02;
      groupRef.current.rotation.x +=
        (targetRotation.current.x - groupRef.current.rotation.x) * 0.02;
    }

    if (pulseRef.current && edges.length > 0) {
      pulses.forEach((pulse, i) => {
        pulse.t += delta * pulse.speed;
        if (pulse.t >= 1) {
          pulse.t = 0;
          pulse.edge = edges[Math.floor(Math.random() * edges.length)];
        }
        const pos = new THREE.Vector3().lerpVectors(
          pulse.edge.a,
          pulse.edge.b,
          pulse.t
        );
        dummy.position.copy(pos);
        dummy.scale.setScalar(1);
        dummy.updateMatrix();
        pulseRef.current!.setMatrixAt(i, dummy.matrix);
      });
      pulseRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Connections — faint, schematic, not decorative wireframe */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[edgePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={SIGNAL_COLOR}
          transparent
          opacity={0.12}
        />
      </lineSegments>

      {/* Nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={SIGNAL_COLOR}
          size={0.06}
          transparent
          opacity={0.55}
          sizeAttenuation
        />
      </points>

      {/* Traveling data pulses along edges */}
      <instancedMesh ref={pulseRef} args={[undefined, undefined, PULSE_COUNT]}>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshBasicMaterial color={SIGNAL_COLOR} transparent opacity={0.9} />
      </instancedMesh>
    </group>
  );
}
