"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface HeroCanvasProps {
  isVisible: boolean;
}

export default function HeroCanvas({ isVisible }: HeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isDisposed = false;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(3.2, 1.8, 3.8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Studio Lighting for High-End F1 Vehicle Rendering
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x8f94a0, 1.2);
    fillLight.position.set(-5, 4, -4);
    scene.add(fillLight);

    // Racing Red Rim Accent Light
    const redAccentLight = new THREE.DirectionalLight(0xe10600, 2.2);
    redAccentLight.position.set(-4, 3, 4);
    scene.add(redAccentLight);

    // Top Car & Aerodynamics Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Aerodynamic Wind-Tunnel Streamlines (Flow lines)
    const streamlinesGroup = new THREE.Group();
    rootGroup.add(streamlinesGroup);

    const streamlinesCount = 12;
    const streamlineGeos: THREE.BufferGeometry[] = [];
    const streamlineMats: THREE.LineBasicMaterial[] = [];

    for (let i = 0; i < streamlinesCount; i++) {
      const zOffset = (i / (streamlinesCount - 1) - 0.5) * 1.8;
      const points = [];
      for (let j = 0; j < 14; j++) {
        const x = 2.6 - j * 0.42;
        const y = Math.sin(j * 0.4 + i * 0.5) * 0.05 + (j > 5 ? 0.35 : 0.08);
        const z = zOffset * (1 + Math.sin(j * 0.25) * 0.2);
        points.push(new THREE.Vector3(x, y, z));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      streamlineGeos.push(geo);

      const isRed = i % 3 === 0;
      const mat = new THREE.LineBasicMaterial({
        color: isRed ? 0xe10600 : 0x373e4d,
        transparent: true,
        opacity: isRed ? 0.8 : 0.35,
      });
      streamlineMats.push(mat);

      const line = new THREE.Line(geo, mat);
      streamlinesGroup.add(line);
    }

    // 2. Load the Authentic Formula 1 2022 Regulation GLB Model
    const loader = new GLTFLoader();
    let carModel: THREE.Group | null = null;

    loader.load(
      "/f1.glb",
      (gltf) => {
        if (isDisposed) return;
        carModel = gltf.scene;

        // Auto-center and normalize car scale to fit viewport
        const box = new THREE.Box3().setFromObject(carModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetScale = 3.6 / (maxDim || 1);

        carModel.scale.setScalar(targetScale);
        carModel.position.set(
          -center.x * targetScale,
          -center.y * targetScale,
          -center.z * targetScale
        );

        // Enhance materials with dark carbon and subtle metallic reflection
        carModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            if (mesh.material) {
              const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
              mats.forEach((m) => {
                if (m instanceof THREE.MeshStandardMaterial) {
                  m.roughness = Math.max(0.3, m.roughness);
                  m.metalness = Math.min(0.85, m.metalness + 0.1);
                }
              });
            }
          }
        });

        rootGroup.add(carModel);
      },
      undefined,
      (error) => {
        console.warn("Could not load /f1.glb, check path:", error);
      }
    );

    // Initial Angle & Scale
    rootGroup.rotation.y = -Math.PI / 4.2;
    rootGroup.rotation.x = Math.PI / 14;

    // Interactive pointer parallax
    let targetRotationY = -Math.PI / 4.2;
    let targetRotationX = Math.PI / 14;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotationY = -Math.PI / 4.2 + x * 0.7;
      targetRotationX = Math.PI / 14 - y * 0.45;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });

    // Animation Loop
    const animate = (time: number) => {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      if (!isVisible) return;

      // Gentle aerodynamic suspension motion
      rootGroup.position.y = Math.sin(time * 0.002) * 0.035;

      // Smooth pointer damping
      rootGroup.rotation.y += (targetRotationY - rootGroup.rotation.y) * 0.05;
      rootGroup.rotation.x += (targetRotationX - rootGroup.rotation.x) * 0.05;

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
      isDisposed = true;
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      streamlineGeos.forEach((g) => g.dispose());
      streamlineMats.forEach((m) => m.dispose());
      if (carModel) {
        carModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.geometry?.dispose();
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((m) => m.dispose());
            } else {
              mesh.material?.dispose();
            }
          }
        });
      }
      renderer.dispose();
    };
  }, [isVisible]);

  return <div ref={containerRef} className="w-full h-full min-h-[360px]" />;
}
