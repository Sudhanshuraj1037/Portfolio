import { Canvas } from "@react-three/fiber";
import type { RefObject } from "react";
import { NeuralNetworkScene } from "./NeuralNetworkScene";

type PointerRef = RefObject<{ x: number; y: number }>;

export default function NeuralNetworkCanvasInner({
  pointerRef,
}: {
  pointerRef: PointerRef;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 8], fov: 45 }}
      style={{ pointerEvents: "none" }}
    >
      <NeuralNetworkScene pointerRef={pointerRef} />
    </Canvas>
  );
}
