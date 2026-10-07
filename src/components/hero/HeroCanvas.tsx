"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface HeroCanvasProps {
  isVisible: boolean;
}

export default function HeroCanvas({ isVisible }: HeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    // Cap device pixel ratio at 1.5 for performance budget
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Group for all aerodynamic telemetry objects
    const telemetryGroup = new THREE.Group();
    scene.add(telemetryGroup);

    // 1. Central Aerodynamic Wireframe Core (Torus Knot with low polygon count)
    const coreGeometry = new THREE.TorusKnotGeometry(1.2, 0.28, 64, 12, 2, 3);
    const coreWireframe = new THREE.WireframeGeometry(coreGeometry);
    const coreMaterial = new THREE.LineBasicMaterial({
      color: 0x373e4d,
      transparent: true,
      opacity: 0.45,
    });
    const coreLine = new THREE.LineSegments(coreWireframe, coreMaterial);
    telemetryGroup.add(coreLine);

    // 2. Telemetry Accent Flow Ring (Racing Red)
    const ringGeometry = new THREE.RingGeometry(1.85, 1.88, 48);
    const ringWireframe = new THREE.WireframeGeometry(ringGeometry);
    const ringMaterial = new THREE.LineBasicMaterial({
      color: 0xe10600,
      transparent: true,
      opacity: 0.85,
    });
    const ringLine = new THREE.LineSegments(ringWireframe, ringMaterial);
    ringLine.rotation.x = Math.PI / 2.2;
    telemetryGroup.add(ringLine);

    // 3. Outer Orbit Coordinate Circle (Subtle telemetry marker)
    const outerGeometry = new THREE.BufferGeometry();
    const pointsCount = 40;
    const positions = new Float32Array(pointsCount * 3);
    for (let i = 0; i < pointsCount; i++) {
      const angle = (i / pointsCount) * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * 2.3;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = Math.sin(angle) * 2.3;
    }
    outerGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const outerMaterial = new THREE.PointsMaterial({
      color: 0x8f94a0,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
    });
    const outerPoints = new THREE.Points(outerGeometry, outerMaterial);
    telemetryGroup.add(outerPoints);

    // Interactive pointer parallax (subtle, restrained)
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotationY = x * 0.4;
      targetRotationX = y * 0.3;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });

    // Animation Loop (paused if off-screen)
    let previousTime = performance.now();

    const animate = (time: number) => {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      if (!isVisible) {
        return;
      }

      const delta = (time - previousTime) * 0.001;
      previousTime = time;

      // Slow telemetry orbital rotation
      telemetryGroup.rotation.y += delta * 0.3;
      ringLine.rotation.z += delta * 0.2;

      // Smooth pointer damping
      telemetryGroup.rotation.x += (targetRotationX - telemetryGroup.rotation.x) * 0.05;
      telemetryGroup.rotation.z += (targetRotationY - telemetryGroup.rotation.z) * 0.05;

      renderer.render(scene, camera);
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      coreGeometry.dispose();
      coreWireframe.dispose();
      coreMaterial.dispose();
      ringGeometry.dispose();
      ringWireframe.dispose();
      ringMaterial.dispose();
      outerGeometry.dispose();
      outerMaterial.dispose();
      renderer.dispose();
    };
  }, [isVisible]);

  return <div ref={containerRef} className="w-full h-full min-h-[360px]" />;
}
