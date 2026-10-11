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

    let isDisposed = false;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 460;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07080a, 0.08);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    // Positioned at the three-quarter angle matching reference image
    // Front wing in lower foreground, rear wing in upper background
    camera.position.set(-3.6, 2.3, 3.8);
    camera.lookAt(0.1, -0.05, -0.1);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.setClearColor(0x07080a, 0);
    container.appendChild(renderer.domElement);

    // Root Group for car, flow lines, and floor
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Slight orientation tilt for maximum aerodynamic profile
    rootGroup.rotation.y = -Math.PI / 18;

    // -------------------------------------------------------------
    // 2. Materials
    // -------------------------------------------------------------
    // Glowing Neon Racing Red Material for Aero Wings and Halo
    const neonRedMaterial = new THREE.MeshBasicMaterial({
      color: 0xff002b,
      transparent: true,
      opacity: 0.96,
      side: THREE.DoubleSide,
    });

    // Dark Body Panel Material (Translucent carbon stealth)
    const darkBodyMaterial = new THREE.MeshBasicMaterial({
      color: 0x0c0f16,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
    });

    // Technical Wireframe Edge Material (Subtle blue-grey)
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0x2d3a4f,
      transparent: true,
      opacity: 0.65,
      linewidth: 1,
    });

    // Subtle Tire Wireframe Material
    const tireMaterial = new THREE.MeshBasicMaterial({
      color: 0x090b10,
      transparent: true,
      opacity: 0.9,
    });
    const tireEdgeMaterial = new THREE.LineBasicMaterial({
      color: 0x3d4b60,
      transparent: true,
      opacity: 0.5,
    });

    // Helper: create mesh with wireframe overlay
    function createBodyPart(geometry: THREE.BufferGeometry, material = darkBodyMaterial) {
      const group = new THREE.Group();
      const mesh = new THREE.Mesh(geometry, material);
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(geometry, 20),
        wireframeMaterial
      );
      group.add(mesh);
      group.add(edges);
      return group;
    }

    // -------------------------------------------------------------
    // 3. F1 Car Geometry (Oriented along X/Z: Nose at -X/+Z, Rear at +X/-Z)
    // -------------------------------------------------------------
    // Alignment vector: Front is toward (-1.8, 0, 1.4), Rear is toward (1.8, 0, -1.4)
    // To make calculations clean, we build along Z axis and rotate carGroup.
    const carGroup = new THREE.Group();
    rootGroup.add(carGroup);

    // [A] Nosecone & Forward Bulkhead (Z: 0.4 to 2.2, tapering forward)
    const noseGeo = new THREE.BufferGeometry();
    const noseVertices = new Float32Array([
      // Top face
      -0.22, 0.22, 0.6,    0.22, 0.22, 0.6,    0.09, 0.08, 2.05,
      -0.22, 0.22, 0.6,    0.09, 0.08, 2.05,  -0.09, 0.08, 2.05,
      // Left side
      -0.22, 0.22, 0.6,   -0.09, 0.08, 2.05,  -0.09, -0.04, 2.05,
      -0.22, 0.22, 0.6,   -0.09, -0.04, 2.05, -0.22, -0.06, 0.6,
      // Right side
       0.22, 0.22, 0.6,    0.22, -0.06, 0.6,   0.09, -0.04, 2.05,
       0.22, 0.22, 0.6,    0.09, -0.04, 2.05,  0.09, 0.08, 2.05,
      // Nose Tip Droop
      -0.09, 0.08, 2.05,   0.09, 0.08, 2.05,   0.07, 0.02, 2.22,
      -0.09, 0.08, 2.05,   0.07, 0.02, 2.22,  -0.07, 0.02, 2.22,
      // Bottom face
      -0.22, -0.06, 0.6,   0.22, -0.06, 0.6,   0.09, -0.04, 2.05,
      -0.22, -0.06, 0.6,   0.09, -0.04, 2.05, -0.09, -0.04, 2.05,
    ]);
    noseGeo.setAttribute("position", new THREE.BufferAttribute(noseVertices, 3));
    noseGeo.computeVertexNormals();
    carGroup.add(createBodyPart(noseGeo));

    // [B] GLOWING NEON RED FRONT WING (Z = 2.15)
    const frontWingGroup = new THREE.Group();
    carGroup.add(frontWingGroup);

    // Main Swept Wing Plane (V-formation)
    const fwGeo = new THREE.BufferGeometry();
    const fwVertices = new Float32Array([
      // Left Wing Blade
      -0.08, 0.01, 2.18,   -1.12, 0.04, 1.95,   -1.15, 0.03, 1.72,
      -0.08, 0.01, 2.18,   -1.15, 0.03, 1.72,   -0.08, 0.01, 1.95,
      // Right Wing Blade
       0.08, 0.01, 2.18,    1.12, 0.04, 1.95,    1.15, 0.03, 1.72,
       0.08, 0.01, 2.18,    1.15, 0.03, 1.72,    0.08, 0.01, 1.95,
      // Center connecting flap
      -0.08, 0.01, 2.18,    0.08, 0.01, 2.18,    0.08, 0.01, 1.95,
      -0.08, 0.01, 2.18,    0.08, 0.01, 1.95,   -0.08, 0.01, 1.95,
    ]);
    fwGeo.setAttribute("position", new THREE.BufferAttribute(fwVertices, 3));
    fwGeo.computeVertexNormals();
    const fwMesh = new THREE.Mesh(fwGeo, neonRedMaterial);
    const fwEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(fwGeo, 10),
      new THREE.LineBasicMaterial({ color: 0xff3355, linewidth: 2 })
    );
    frontWingGroup.add(fwMesh);
    frontWingGroup.add(fwEdges);

    // Front Wing Vertical Endplates (Left & Right)
    const endplateGeo = new THREE.BoxGeometry(0.02, 0.22, 0.38);
    const leftFwEndplate = new THREE.Mesh(endplateGeo, neonRedMaterial);
    leftFwEndplate.position.set(-1.14, 0.1, 1.84);
    const rightFwEndplate = new THREE.Mesh(endplateGeo, neonRedMaterial);
    rightFwEndplate.position.set(1.14, 0.1, 1.84);
    frontWingGroup.add(leftFwEndplate, rightFwEndplate);

    // [C] Cockpit & Tub (Z: -0.6 to 0.6)
    const tubGeo = new THREE.BufferGeometry();
    const tubVertices = new Float32Array([
      // Top deck around driver
      -0.26, 0.26, -0.5,   0.26, 0.26, -0.5,   0.22, 0.22, 0.6,
      -0.26, 0.26, -0.5,   0.22, 0.22, 0.6,   -0.22, 0.22, 0.6,
      // Left cockpit flank
      -0.26, 0.26, -0.5,  -0.22, 0.22, 0.6,   -0.26, -0.08, 0.6,
      -0.26, 0.26, -0.5,  -0.26, -0.08, 0.6,  -0.3, -0.08, -0.5,
      // Right cockpit flank
       0.26, 0.26, -0.5,   0.22, 0.22, 0.6,    0.26, -0.08, 0.6,
       0.26, 0.26, -0.5,   0.26, -0.08, 0.6,   0.3, -0.08, -0.5,
      // Driver opening cutout
      -0.18, 0.26, 0.15,   0.18, 0.26, 0.15,   0.18, 0.05, -0.35,
      -0.18, 0.26, 0.15,   0.18, 0.05, -0.35, -0.18, 0.05, -0.35,
    ]);
    tubGeo.setAttribute("position", new THREE.BufferAttribute(tubVertices, 3));
    tubGeo.computeVertexNormals();
    carGroup.add(createBodyPart(tubGeo));

    // [D] GLOWING NEON RED HALO (Titanium Driver Safety Cage)
    const haloGroup = new THREE.Group();
    carGroup.add(haloGroup);

    // Center Front Strut
    const haloStrutGeo = new THREE.CylinderGeometry(0.016, 0.022, 0.24, 8);
    const haloStrut = new THREE.Mesh(haloStrutGeo, neonRedMaterial);
    haloStrut.position.set(0, 0.35, 0.14);
    haloStrut.rotation.x = -Math.PI / 10;
    haloGroup.add(haloStrut);

    // Halo Wishbone Arch
    const haloCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.24, 0.34, -0.32),
      new THREE.Vector3(-0.25, 0.44, -0.1),
      new THREE.Vector3(0, 0.46, 0.12),
      new THREE.Vector3(0.25, 0.44, -0.1),
      new THREE.Vector3(0.24, 0.34, -0.32),
    ]);
    const haloArchGeo = new THREE.TubeGeometry(haloCurve, 24, 0.022, 8, false);
    const haloArch = new THREE.Mesh(haloArchGeo, neonRedMaterial);
    haloGroup.add(haloArch);

    // [E] Sidepods & Air Inlets (Z: -1.0 to 0.4)
    // Left Sidepod
    const spLGeo = new THREE.BufferGeometry();
    const spLVertices = new Float32Array([
      // Inlet face (front of sidepod)
      -0.26, 0.22, 0.35,  -0.62, 0.2, 0.3,    -0.64, -0.05, 0.28,
      -0.26, 0.22, 0.35,  -0.64, -0.05, 0.28, -0.26, -0.06, 0.35,
      // Top downwash slope
      -0.26, 0.22, 0.35,  -0.62, 0.2, 0.3,    -0.42, 0.12, -0.9,
      -0.26, 0.22, 0.35,  -0.42, 0.12, -0.9,  -0.24, 0.18, -0.9,
      // Outer flank
      -0.62, 0.2, 0.3,    -0.64, -0.05, 0.28, -0.44, -0.06, -0.9,
      -0.62, 0.2, 0.3,    -0.44, -0.06, -0.9, -0.42, 0.12, -0.9,
    ]);
    spLGeo.setAttribute("position", new THREE.BufferAttribute(spLVertices, 3));
    spLGeo.computeVertexNormals();
    carGroup.add(createBodyPart(spLGeo));

    // Right Sidepod (Mirrored)
    const spRGeo = new THREE.BufferGeometry();
    const spRVertices = new Float32Array([
      // Inlet face
       0.26, 0.22, 0.35,   0.62, 0.2, 0.3,     0.64, -0.05, 0.28,
       0.26, 0.22, 0.35,   0.64, -0.05, 0.28,  0.26, -0.06, 0.35,
      // Top downwash
       0.26, 0.22, 0.35,   0.62, 0.2, 0.3,     0.42, 0.12, -0.9,
       0.26, 0.22, 0.35,   0.42, 0.12, -0.9,   0.24, 0.18, -0.9,
      // Outer flank
       0.62, 0.2, 0.3,     0.64, -0.05, 0.28,  0.44, -0.06, -0.9,
       0.62, 0.2, 0.3,     0.44, -0.06, -0.9,  0.42, 0.12, -0.9,
    ]);
    spRGeo.setAttribute("position", new THREE.BufferAttribute(spRVertices, 3));
    spRGeo.computeVertexNormals();
    carGroup.add(createBodyPart(spRGeo));

    // [F] Engine Airbox & Shark Fin Spine (Z: -0.4 to -1.5)
    const finGeo = new THREE.BufferGeometry();
    const finVertices = new Float32Array([
      // Airbox triangle intake
      0, 0.52, -0.35,   -0.08, 0.3, -0.35,    0.08, 0.3, -0.35,
      // Shark Fin Spine Blade
      0, 0.52, -0.35,    0, 0.55, -1.15,      0, 0.22, -1.2,
      0, 0.52, -0.35,    0, 0.22, -1.2,       0, 0.26, -0.4,
    ]);
    finGeo.setAttribute("position", new THREE.BufferAttribute(finVertices, 3));
    finGeo.computeVertexNormals();
    const finMesh = new THREE.Mesh(finGeo, darkBodyMaterial);
    const finEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(finGeo, 10),
      wireframeMaterial
    );
    carGroup.add(finMesh, finEdges);

    // [G] GLOWING NEON RED REAR WING (Z = -1.65)
    const rearWingGroup = new THREE.Group();
    carGroup.add(rearWingGroup);

    // Main Upper Rear Wing Aerofoil Plane
    const rwGeo = new THREE.BoxGeometry(0.92, 0.04, 0.24);
    const rwMesh = new THREE.Mesh(rwGeo, neonRedMaterial);
    rwMesh.position.set(0, 0.56, -1.62);
    rwMesh.rotation.x = -Math.PI / 14;

    const rwEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(rwGeo),
      new THREE.LineBasicMaterial({ color: 0xff3355, linewidth: 2 })
    );
    rwMesh.add(rwEdges);
    rearWingGroup.add(rwMesh);

    // Rear Wing Endplates (Left & Right)
    const rwEndplateGeo = new THREE.BoxGeometry(0.02, 0.32, 0.36);
    const leftRwEndplate = new THREE.Mesh(rwEndplateGeo, neonRedMaterial);
    leftRwEndplate.position.set(-0.46, 0.46, -1.62);
    const rightRwEndplate = new THREE.Mesh(rwEndplateGeo, neonRedMaterial);
    rightRwEndplate.position.set(0.46, 0.46, -1.62);
    rearWingGroup.add(leftRwEndplate, rightRwEndplate);

    // Center DRS Actuator Pod
    const drsPodGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.12, 6);
    const drsPod = new THREE.Mesh(drsPodGeo, wireframeMaterial);
    drsPod.position.set(0, 0.58, -1.62);
    drsPod.rotation.x = Math.PI / 2;
    rearWingGroup.add(drsPod);

    // [H] 4 Open Wheels (FL, FR, RL, RR)
    function createWheel(x: number, y: number, z: number, width: number, radius: number) {
      const wGroup = new THREE.Group();
      wGroup.position.set(x, y, z);

      // Tire cylinder
      const tireGeo = new THREE.CylinderGeometry(radius, radius, width, 16);
      tireGeo.rotateZ(Math.PI / 2);
      const tire = new THREE.Mesh(tireGeo, tireMaterial);
      const tireEdges = new THREE.LineSegments(
        new THREE.EdgesGeometry(tireGeo, 25),
        tireEdgeMaterial
      );
      wGroup.add(tire);
      wGroup.add(tireEdges);

      // Suspension wishbone lines to chassis
      const susGeo = new THREE.BufferGeometry();
      const susVerts = new Float32Array([
        0, 0, 0,  -Math.sign(x) * 0.55, 0.08, 0.1,
        0, 0, 0,  -Math.sign(x) * 0.55, -0.06, -0.1,
      ]);
      susGeo.setAttribute("position", new THREE.BufferAttribute(susVerts, 3));
      const susLine = new THREE.LineSegments(susGeo, wireframeMaterial);
      wGroup.add(susLine);

      return wGroup;
    }

    const flWheel = createWheel(-0.78, 0.08, 1.35, 0.28, 0.28);
    const frWheel = createWheel(0.78, 0.08, 1.35, 0.28, 0.28);
    const rlWheel = createWheel(-0.72, 0.12, -1.25, 0.36, 0.32);
    const rrWheel = createWheel(0.72, 0.12, -1.25, 0.36, 0.32);
    carGroup.add(flWheel, frWheel, rlWheel, rrWheel);

    // [I] Carbon Floor Undertray Plane
    const floorGeo = new THREE.BufferGeometry();
    const floorVerts = new Float32Array([
      -0.65, -0.06, 0.7,   0.65, -0.06, 0.7,   0.55, -0.06, -1.2,
      -0.65, -0.06, 0.7,   0.55, -0.06, -1.2, -0.55, -0.06, -1.2,
    ]);
    floorGeo.setAttribute("position", new THREE.BufferAttribute(floorVerts, 3));
    floorGeo.computeVertexNormals();
    carGroup.add(createBodyPart(floorGeo));

    // Rotate carGroup to match the angled dynamic stance from the reference image
    carGroup.rotation.y = Math.PI / 3.4;

    // -------------------------------------------------------------
    // 4. Ground Perspective Wireframe Grid
    // -------------------------------------------------------------
    const gridHelper = new THREE.GridHelper(10, 24, 0x1f2937, 0x111622);
    gridHelper.position.y = -0.25;
    rootGroup.add(gridHelper);

    // -------------------------------------------------------------
    // 5. ANIMATED AERODYNAMIC STREAMLINES (Wind-Tunnel Flow)
    // -------------------------------------------------------------
    // Streamlines flow across the car from front to back
    const streamlineDefs = [
      // 1-2. Over the Nosecone and through Cockpit/Halo
      [
        new THREE.Vector3(-2.8, 0.02, 2.2),
        new THREE.Vector3(-1.8, 0.15, 1.4),
        new THREE.Vector3(-0.9, 0.35, 0.7),
        new THREE.Vector3(-0.1, 0.52, 0.1),
        new THREE.Vector3(0.8, 0.58, -0.6),
        new THREE.Vector3(1.7, 0.62, -1.3),
        new THREE.Vector3(3.0, 0.64, -2.2),
      ],
      [
        new THREE.Vector3(-2.6, 0.08, 2.0),
        new THREE.Vector3(-1.6, 0.22, 1.2),
        new THREE.Vector3(-0.7, 0.42, 0.5),
        new THREE.Vector3(0.0, 0.55, -0.1),
        new THREE.Vector3(0.9, 0.60, -0.8),
        new THREE.Vector3(1.8, 0.62, -1.5),
        new THREE.Vector3(3.1, 0.63, -2.4),
      ],
      // 3-4. Over Left Front Wing & Outer Left Sidepod
      [
        new THREE.Vector3(-2.4, 0.01, 2.8),
        new THREE.Vector3(-1.7, 0.16, 2.1),
        new THREE.Vector3(-0.8, 0.28, 1.5),
        new THREE.Vector3(0.2, 0.32, 0.9),
        new THREE.Vector3(1.2, 0.26, 0.1),
        new THREE.Vector3(2.2, 0.42, -0.7),
        new THREE.Vector3(3.4, 0.54, -1.6),
      ],
      [
        new THREE.Vector3(-2.1, 0.05, 3.1),
        new THREE.Vector3(-1.4, 0.22, 2.4),
        new THREE.Vector3(-0.5, 0.32, 1.8),
        new THREE.Vector3(0.5, 0.35, 1.1),
        new THREE.Vector3(1.5, 0.30, 0.3),
        new THREE.Vector3(2.5, 0.48, -0.5),
        new THREE.Vector3(3.6, 0.56, -1.3),
      ],
      // 5-6. Over Right Front Wing & Right Flank
      [
        new THREE.Vector3(-2.7, 0.01, 1.4),
        new THREE.Vector3(-1.8, 0.12, 0.8),
        new THREE.Vector3(-0.9, 0.22, 0.1),
        new THREE.Vector3(-0.1, 0.26, -0.5),
        new THREE.Vector3(0.8, 0.24, -1.1),
        new THREE.Vector3(1.7, 0.52, -1.8),
        new THREE.Vector3(2.9, 0.60, -2.7),
      ],
      [
        new THREE.Vector3(-2.9, 0.05, 1.0),
        new THREE.Vector3(-2.0, 0.16, 0.4),
        new THREE.Vector3(-1.1, 0.25, -0.2),
        new THREE.Vector3(-0.2, 0.28, -0.8),
        new THREE.Vector3(0.7, 0.26, -1.4),
        new THREE.Vector3(1.6, 0.54, -2.1),
        new THREE.Vector3(2.8, 0.62, -2.9),
      ],
      // 7-8. High Wake Inflow over Rear Wing Main Plane
      [
        new THREE.Vector3(-3.0, 0.20, 2.3),
        new THREE.Vector3(-1.9, 0.38, 1.5),
        new THREE.Vector3(-0.8, 0.54, 0.7),
        new THREE.Vector3(0.3, 0.68, -0.1),
        new THREE.Vector3(1.4, 0.74, -0.9),
        new THREE.Vector3(2.4, 0.72, -1.7),
        new THREE.Vector3(3.5, 0.70, -2.5),
      ],
      [
        new THREE.Vector3(-3.2, 0.25, 2.1),
        new THREE.Vector3(-2.1, 0.42, 1.3),
        new THREE.Vector3(-1.0, 0.58, 0.5),
        new THREE.Vector3(0.1, 0.70, -0.3),
        new THREE.Vector3(1.2, 0.76, -1.1),
        new THREE.Vector3(2.2, 0.74, -1.9),
        new THREE.Vector3(3.3, 0.72, -2.7),
      ],
      // 9-10. Low Floor Ground-Effect Diffuser Vortex
      [
        new THREE.Vector3(-2.5, -0.15, 2.5),
        new THREE.Vector3(-1.5, -0.14, 1.8),
        new THREE.Vector3(-0.5, -0.12, 1.1),
        new THREE.Vector3(0.5, -0.10, 0.4),
        new THREE.Vector3(1.5, -0.05, -0.3),
        new THREE.Vector3(2.5, 0.08, -1.1),
        new THREE.Vector3(3.4, 0.15, -1.9),
      ],
      [
        new THREE.Vector3(-2.8, -0.15, 1.8),
        new THREE.Vector3(-1.8, -0.14, 1.1),
        new THREE.Vector3(-0.8, -0.12, 0.4),
        new THREE.Vector3(0.2, -0.10, -0.3),
        new THREE.Vector3(1.2, -0.05, -1.0),
        new THREE.Vector3(2.2, 0.08, -1.8),
        new THREE.Vector3(3.2, 0.15, -2.6),
      ],
    ];

    // Build curve meshes with moving dash shader
    interface FlowLine {
      mesh: THREE.Line;
      material: THREE.ShaderMaterial;
    }

    const flowLines: FlowLine[] = [];

    // Custom Shader for High-Speed Glowing Flow Pulses
    const flowVertexShader = `
      attribute float aProgress;
      varying float vProgress;
      void main() {
        vProgress = aProgress;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const flowFragmentShader = `
      uniform float uTime;
      uniform vec3 uColor;
      uniform float uSpeed;
      uniform float uPulseFreq;
      varying float vProgress;

      void main() {
        // High speed traveling light packets along the streamline
        float flow = fract(vProgress * uPulseFreq - uTime * uSpeed);
        
        // Intense glowing head tapering off into a long tail
        float intensity = smoothstep(0.0, 0.35, flow) * smoothstep(1.0, 0.5, flow);
        
        // Ambient base line (stealth dark grey) + glowing racing red pulse
        vec3 baseColor = vec3(0.12, 0.16, 0.22);
        vec3 activeColor = uColor;
        
        vec3 finalColor = mix(baseColor, activeColor, intensity);
        float alpha = mix(0.25, 0.95, intensity);
        
        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    streamlineDefs.forEach((pts, idx) => {
      const curve = new THREE.CatmullRomCurve3(pts);
      const divisions = 64;
      const points = curve.getPoints(divisions);

      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      // Add aProgress attribute (0.0 at front, 1.0 at rear wake)
      const progressArr = new Float32Array(divisions + 1);
      for (let i = 0; i <= divisions; i++) {
        progressArr[i] = i / divisions;
      }
      geometry.setAttribute("aProgress", new THREE.BufferAttribute(progressArr, 1));

      // Alternating bright red primary lines and secondary telemetry lines
      const isPrimary = idx % 2 === 0;
      const speed = 1.6 + (idx % 3) * 0.25;

      const material = new THREE.ShaderMaterial({
        vertexShader: flowVertexShader,
        fragmentShader: flowFragmentShader,
        transparent: true,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(isPrimary ? 0xff002b : 0xff2b44) },
          uSpeed: { value: speed },
          uPulseFreq: { value: 2.2 },
        },
      });

      const line = new THREE.Line(geometry, material);
      rootGroup.add(line);
      flowLines.push({ mesh: line, material });
    });

    // -------------------------------------------------------------
    // 6. Interactive Cursor Parallax
    // -------------------------------------------------------------
    let targetRotY = -Math.PI / 18;
    let targetRotX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = -Math.PI / 18 + x * 0.35;
      targetRotX = -y * 0.25;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // -------------------------------------------------------------
    // 7. Animation Loop (60 FPS, High Speed Race Dynamics)
    // -------------------------------------------------------------
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Update flow line shaders
      flowLines.forEach((fl) => {
        fl.material.uniforms.uTime.value = elapsedTime;
      });

      // High-speed chassis micro-vibration (330 km/h aerodynamic load)
      const roadVibe = Math.sin(elapsedTime * 32) * 0.003 + Math.sin(elapsedTime * 8) * 0.008;
      carGroup.position.y = roadVibe;

      // Front wing downforce flex simulation
      frontWingGroup.rotation.x = Math.sin(elapsedTime * 6) * 0.015;

      // Smooth cursor parallax damping
      rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.06;
      rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.06;

      renderer.render(scene, camera);
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);

    // -------------------------------------------------------------
    // 8. Resize Handler & Cleanup
    // -------------------------------------------------------------
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
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose geometries & materials
      flowLines.forEach((fl) => {
        fl.mesh.geometry.dispose();
        fl.material.dispose();
      });

      neonRedMaterial.dispose();
      darkBodyMaterial.dispose();
      wireframeMaterial.dispose();
      tireMaterial.dispose();
      tireEdgeMaterial.dispose();
      renderer.dispose();
    };
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[380px] sm:min-h-[460px] flex items-center justify-center select-none overflow-hidden"
    />
  );
}
