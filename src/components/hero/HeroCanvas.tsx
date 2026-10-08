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
    camera.position.set(2.8, 1.8, 4.2);
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

    // Group for F1 vehicle and aerodynamic flow lines
    const f1CarGroup = new THREE.Group();
    scene.add(f1CarGroup);

    // Materials
    const carbonMaterial = new THREE.MeshBasicMaterial({
      color: 0x14161b,
      wireframe: false,
    });
    const carbonWireframeMaterial = new THREE.LineBasicMaterial({
      color: 0x373e4d,
      transparent: true,
      opacity: 0.65,
    });
    const racingRedMaterial = new THREE.MeshBasicMaterial({
      color: 0xe10600,
    });
    const redWireMaterial = new THREE.LineBasicMaterial({
      color: 0xe10600,
      linewidth: 1.5,
    });
    const wheelMaterial = new THREE.MeshBasicMaterial({
      color: 0x0a0b0d,
    });
    const wheelRimMaterial = new THREE.LineBasicMaterial({
      color: 0xe10600,
      transparent: true,
      opacity: 0.8,
    });

    // Array of disposable geometries and materials for unmount
    const disposables: (THREE.BufferGeometry | THREE.Material)[] = [
      carbonMaterial,
      carbonWireframeMaterial,
      racingRedMaterial,
      redWireMaterial,
      wheelMaterial,
      wheelRimMaterial,
    ];

    const registerDisposable = <T extends THREE.BufferGeometry | THREE.Material>(item: T): T => {
      disposables.push(item);
      return item;
    };

    // Helper to add mesh with outline wireframe
    const addWireframeMesh = (
      geo: THREE.BufferGeometry,
      mat: THREE.Material,
      wireMat: THREE.Material = carbonWireframeMaterial
    ): THREE.Group => {
      const group = new THREE.Group();
      const mesh = new THREE.Mesh(geo, mat);
      const wire = new THREE.LineSegments(
        registerDisposable(new THREE.WireframeGeometry(geo)),
        wireMat
      );
      group.add(mesh);
      group.add(wire);
      return group;
    };

    // 1. F1 MAIN MONOCOQUE & NOSE
    // Central chassis body (tapered box)
    const noseGeo = registerDisposable(new THREE.ConeGeometry(0.24, 1.8, 4));
    const nose = addWireframeMesh(noseGeo, carbonMaterial);
    nose.rotation.z = Math.PI / 2;
    nose.rotation.y = Math.PI / 4;
    nose.position.set(0.6, 0.05, 0);
    f1CarGroup.add(nose);

    // Front Wing assembly
    const frontWingMainGeo = registerDisposable(new THREE.BoxGeometry(0.18, 0.02, 1.7));
    const frontWingMain = addWireframeMesh(frontWingMainGeo, racingRedMaterial, redWireMaterial);
    frontWingMain.position.set(1.4, -0.05, 0);
    f1CarGroup.add(frontWingMain);

    // Front Wing Endplates (Left and Right)
    const frontEndplateGeo = registerDisposable(new THREE.BoxGeometry(0.25, 0.16, 0.02));
    const leftFrontPlate = addWireframeMesh(frontEndplateGeo, carbonMaterial);
    leftFrontPlate.position.set(1.4, 0.02, 0.85);
    const rightFrontPlate = addWireframeMesh(frontEndplateGeo, carbonMaterial);
    rightFrontPlate.position.set(1.4, 0.02, -0.85);
    f1CarGroup.add(leftFrontPlate);
    f1CarGroup.add(rightFrontPlate);

    // 2. COCKPIT & HALO ARCH
    // Cockpit base
    const cockpitGeo = registerDisposable(new THREE.BoxGeometry(1.2, 0.28, 0.44));
    const cockpit = addWireframeMesh(cockpitGeo, carbonMaterial);
    cockpit.position.set(-0.2, 0.12, 0);
    f1CarGroup.add(cockpit);

    // F1 Halo Protection Arch
    const haloGeo = registerDisposable(new THREE.TorusGeometry(0.24, 0.025, 8, 24, Math.PI));
    const haloMesh = addWireframeMesh(haloGeo, racingRedMaterial, redWireMaterial);
    haloMesh.rotation.x = Math.PI / 2;
    haloMesh.rotation.y = Math.PI / 2;
    haloMesh.position.set(-0.1, 0.32, 0);
    f1CarGroup.add(haloMesh);

    // Driver Helmet
    const helmetGeo = registerDisposable(new THREE.SphereGeometry(0.09, 12, 12));
    const helmet = addWireframeMesh(helmetGeo, racingRedMaterial);
    helmet.position.set(-0.25, 0.24, 0);
    f1CarGroup.add(helmet);

    // Overhead Airbox Intake
    const airboxGeo = registerDisposable(new THREE.ConeGeometry(0.14, 0.6, 4));
    const airbox = addWireframeMesh(airboxGeo, carbonMaterial);
    airbox.rotation.z = -Math.PI / 2.6;
    airbox.position.set(-0.55, 0.32, 0);
    f1CarGroup.add(airbox);

    // 3. SIDEPODS & ENGINE COVER
    // Left Sidepod
    const sidepodGeo = registerDisposable(new THREE.BoxGeometry(1.1, 0.22, 0.26));
    const leftSidepod = addWireframeMesh(sidepodGeo, carbonMaterial);
    leftSidepod.position.set(-0.35, 0.06, 0.38);
    const rightSidepod = addWireframeMesh(sidepodGeo, carbonMaterial);
    rightSidepod.position.set(-0.35, 0.06, -0.38);
    f1CarGroup.add(leftSidepod);
    f1CarGroup.add(rightSidepod);

    // Shark Fin Engine Cowl
    const finGeo = registerDisposable(new THREE.BufferGeometry());
    const finVertices = new Float32Array([
      -0.4, 0.22, 0,
      -1.2, 0.42, 0,
      -1.2, 0.16, 0,
    ]);
    finGeo.setAttribute("position", new THREE.BufferAttribute(finVertices, 3));
    finGeo.computeVertexNormals();
    const sharkFin = new THREE.Mesh(finGeo, racingRedMaterial);
    f1CarGroup.add(sharkFin);

    // 4. REAR WING ASSEMBLY
    const rearWingMainGeo = registerDisposable(new THREE.BoxGeometry(0.24, 0.02, 1.1));
    const rearWing = addWireframeMesh(rearWingMainGeo, racingRedMaterial, redWireMaterial);
    rearWing.position.set(-1.35, 0.45, 0);
    f1CarGroup.add(rearWing);

    // Rear Wing Endplates
    const rearEndplateGeo = registerDisposable(new THREE.BoxGeometry(0.38, 0.42, 0.02));
    const leftRearPlate = addWireframeMesh(rearEndplateGeo, carbonMaterial);
    leftRearPlate.position.set(-1.35, 0.35, 0.55);
    const rightRearPlate = addWireframeMesh(rearEndplateGeo, carbonMaterial);
    rightRearPlate.position.set(-1.35, 0.35, -0.55);
    f1CarGroup.add(leftRearPlate);
    f1CarGroup.add(rightRearPlate);

    // 5. 4 F1 WHEELS WITH BRAKE DUCTS & WISHBONES
    const wheelCylGeo = registerDisposable(new THREE.CylinderGeometry(0.24, 0.24, 0.22, 24));
    const frontWishboneGeo = registerDisposable(new THREE.CylinderGeometry(0.015, 0.015, 0.6));

    const wheels: THREE.Group[] = [];
    const wheelPositions = [
      { x: 0.95, y: -0.02, z: 0.72 },   // Front Left
      { x: 0.95, y: -0.02, z: -0.72 },  // Front Right
      { x: -0.95, y: -0.02, z: 0.72 },  // Rear Left
      { x: -0.95, y: -0.02, z: -0.72 }, // Rear Right
    ];

    wheelPositions.forEach((pos) => {
      const wheelGroup = new THREE.Group();
      wheelGroup.position.set(pos.x, pos.y, pos.z);

      const tire = new THREE.Mesh(wheelCylGeo, wheelMaterial);
      tire.rotation.x = Math.PI / 2;
      wheelGroup.add(tire);

      // Rim circle outline
      const rimGeo = registerDisposable(new THREE.RingGeometry(0.12, 0.13, 16));
      const rim = new THREE.LineLoop(rimGeo, wheelRimMaterial);
      rim.position.z = pos.z > 0 ? 0.115 : -0.115;
      wheelGroup.add(rim);

      // Wishbone struts connecting wheel to body
      const wishbone = new THREE.Mesh(frontWishboneGeo, carbonWireframeMaterial);
      wishbone.rotation.z = Math.PI / 2;
      wishbone.position.set(0, 0, pos.z > 0 ? -0.25 : 0.25);
      wheelGroup.add(wishbone);

      f1CarGroup.add(wheelGroup);
      wheels.push(wheelGroup);
    });

    // 6. AERODYNAMIC AIRFLOW STREAMLINES (Wind tunnel telemetry lines)
    const streamlineGroup = new THREE.Group();
    f1CarGroup.add(streamlineGroup);

    const streamlineCount = 14;
    const streamCurves: { line: THREE.Line; speed: number; offset: number }[] = [];

    for (let i = 0; i < streamlineCount; i++) {
      const zOffset = (i / (streamlineCount - 1) - 0.5) * 1.5;
      const points = [];
      for (let j = 0; j < 12; j++) {
        const x = 2.4 - j * 0.42;
        const y = Math.sin(j * 0.4 + i) * 0.06 + (j > 4 ? 0.25 : 0.05);
        const z = zOffset * (1 + Math.sin(j * 0.3) * 0.15);
        points.push(new THREE.Vector3(x, y, z));
      }

      const streamGeo = registerDisposable(new THREE.BufferGeometry().setFromPoints(points));
      const isRed = i % 3 === 0;
      const streamMat = registerDisposable(
        new THREE.LineBasicMaterial({
          color: isRed ? 0xe10600 : 0x373e4d,
          transparent: true,
          opacity: isRed ? 0.75 : 0.4,
        })
      );
      const streamLine = new THREE.Line(streamGeo, streamMat);
      streamlineGroup.add(streamLine);
      streamCurves.push({ line: streamLine, speed: 0.8 + Math.random() * 0.5, offset: Math.random() });
    }

    // Scale and angle the F1 Car nicely inside the viewport
    f1CarGroup.scale.set(1.15, 1.15, 1.15);
    f1CarGroup.rotation.y = -Math.PI / 4.5;
    f1CarGroup.rotation.x = Math.PI / 14;

    // Interactive pointer parallax
    let targetRotationY = -Math.PI / 4.5;
    let targetRotationX = Math.PI / 14;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotationY = -Math.PI / 4.5 + x * 0.65;
      targetRotationX = Math.PI / 14 - y * 0.45;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });

    // Animation Loop
    let previousTime = performance.now();

    const animate = (time: number) => {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      if (!isVisible) {
        return;
      }

      const delta = (time - previousTime) * 0.001;
      previousTime = time;

      // Wheel rotation simulation
      wheels.forEach((w) => {
        w.children[0].rotation.x += delta * 12;
      });

      // Gentle aerodynamic chassis oscillation
      f1CarGroup.position.y = Math.sin(time * 0.002) * 0.035;

      // Smooth pointer damping
      f1CarGroup.rotation.y += (targetRotationY - f1CarGroup.rotation.y) * 0.05;
      f1CarGroup.rotation.x += (targetRotationX - f1CarGroup.rotation.x) * 0.05;

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
      disposables.forEach((item) => item.dispose());
      renderer.dispose();
    };
  }, [isVisible]);

  return <div ref={containerRef} className="w-full h-full min-h-[360px]" />;
}
