'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export const Hero3DScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    setIsClient(true);
    if (!containerRef.current) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 520;

    // SCENE
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // CAMERA
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(7, 3.8, 8.5);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.2);
    mainLight.position.set(10, 15, 10);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 30;
    mainLight.shadow.bias = -0.001;
    scene.add(mainLight);

    // Soft green fill light from the charger side
    const greenChargerLight = new THREE.PointLight(0x00e676, 3.5, 12);
    greenChargerLight.position.set(2.8, 2.5, 0);
    scene.add(greenChargerLight);

    // Subtle blue-white rim light
    const rimLight = new THREE.DirectionalLight(0xd9ffea, 1.2);
    rimLight.position.set(-10, 8, -10);
    scene.add(rimLight);

    // STUDIO FLOOR
    const floorGeo = new THREE.PlaneGeometry(35, 35);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xf8faf9,
      roughness: 0.7,
      metalness: 0.1,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.01;
    floor.receiveShadow = true;
    scene.add(floor);

    // Charging Bay circular floor markings
    const bayRingGeo = new THREE.RingGeometry(2.8, 3.0, 64);
    const bayRingMat = new THREE.MeshBasicMaterial({
      color: 0x00e676,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
    });
    const bayRing = new THREE.Mesh(bayRingGeo, bayRingMat);
    bayRing.rotation.x = -Math.PI / 2;
    bayRing.position.set(-0.5, 0.005, 0.2);
    scene.add(bayRing);

    // Inner dashed indicator
    const innerRingGeo = new THREE.RingGeometry(1.5, 1.55, 32);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0x00c853,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.x = -Math.PI / 2;
    innerRing.position.set(-0.5, 0.006, 0.2);
    scene.add(innerRing);

    // -------------------------------------------------------------
    // VEHICLE GROUP (Sleek Pearl-White Electric Sedan)
    // -------------------------------------------------------------
    const carGroup = new THREE.Group();
    carGroup.position.set(-0.8, 0, 0.3);
    carGroup.rotation.y = 0.28;
    scene.add(carGroup);

    // Materials
    const pearlWhitePaint = new THREE.MeshPhysicalMaterial({
      color: 0xf0f3f2,
      metalness: 0.15,
      roughness: 0.18,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });

    const tintedGlass = new THREE.MeshPhysicalMaterial({
      color: 0x1a2420,
      metalness: 0.8,
      roughness: 0.05,
      transmission: 0.6,
      transparent: true,
      opacity: 0.88,
    });

    const wheelRubber = new THREE.MeshStandardMaterial({
      color: 0x1f2421,
      roughness: 0.8,
      metalness: 0.1,
    });

    const alloyRims = new THREE.MeshStandardMaterial({
      color: 0xe0e6e2,
      roughness: 0.25,
      metalness: 0.85,
    });

    const greenBrakeCaliper = new THREE.MeshStandardMaterial({
      color: 0x00e676,
      emissive: 0x00e676,
      emissiveIntensity: 0.3,
      metalness: 0.6,
      roughness: 0.2,
    });

    // Lower Chassis
    const lowerBodyGeo = new THREE.BoxGeometry(4.3, 0.65, 1.95);
    const lowerBody = new THREE.Mesh(lowerBodyGeo, pearlWhitePaint);
    lowerBody.position.y = 0.55;
    lowerBody.castShadow = true;
    lowerBody.receiveShadow = true;
    carGroup.add(lowerBody);

    // Aerodynamic Sculpted Hood & Trunk Taper
    const frontHoodGeo = new THREE.BoxGeometry(1.3, 0.25, 1.88);
    const frontHood = new THREE.Mesh(frontHoodGeo, pearlWhitePaint);
    frontHood.position.set(1.5, 0.72, 0);
    frontHood.rotation.z = -0.12;
    frontHood.castShadow = true;
    carGroup.add(frontHood);

    const rearTrunkGeo = new THREE.BoxGeometry(1.0, 0.28, 1.88);
    const rearTrunk = new THREE.Mesh(rearTrunkGeo, pearlWhitePaint);
    rearTrunk.position.set(-1.65, 0.76, 0);
    rearTrunk.rotation.z = 0.1;
    rearTrunk.castShadow = true;
    carGroup.add(rearTrunk);

    // Cabin / Greenhouse (Curved aerodynamic fastback roofline)
    const cabinGeo = new THREE.CylinderGeometry(0.85, 0.98, 2.1, 16, 1, false, 0, Math.PI);
    const cabin = new THREE.Mesh(cabinGeo, tintedGlass);
    cabin.rotation.z = Math.PI / 2;
    cabin.rotation.x = Math.PI;
    cabin.scale.set(0.68, 1.0, 0.9);
    cabin.position.set(-0.1, 1.0, 0);
    cabin.castShadow = true;
    carGroup.add(cabin);

    // Roof Center Panel
    const roofGeo = new THREE.BoxGeometry(1.9, 0.06, 1.4);
    const roof = new THREE.Mesh(roofGeo, pearlWhitePaint);
    roof.position.set(-0.1, 1.38, 0);
    carGroup.add(roof);

    // Headlights (Continuous Matrix LED Lightstrip)
    const frontLightGeo = new THREE.BoxGeometry(0.12, 0.1, 1.7);
    const lightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const frontLight = new THREE.Mesh(frontLightGeo, lightMat);
    frontLight.position.set(2.14, 0.65, 0);
    carGroup.add(frontLight);

    // Rear Light Bar (Red Sleek Line)
    const rearLightGeo = new THREE.BoxGeometry(0.1, 0.08, 1.75);
    const rearLightMat = new THREE.MeshBasicMaterial({ color: 0xff3b30 });
    const rearLight = new THREE.Mesh(rearLightGeo, rearLightMat);
    rearLight.position.set(-2.15, 0.72, 0);
    carGroup.add(rearLight);

    // Illuminated Charging Port on Left Rear Quarter
    const portRingGeo = new THREE.TorusGeometry(0.12, 0.025, 16, 32);
    const portRingMat = new THREE.MeshBasicMaterial({ color: 0x00e676 });
    const portRing = new THREE.Mesh(portRingGeo, portRingMat);
    portRing.position.set(-1.35, 0.75, 0.98);
    portRing.rotation.y = Math.PI / 2;
    carGroup.add(portRing);

    // Green Port Status Light
    const portGlowLight = new THREE.PointLight(0x00e676, 2.5, 2.5);
    portGlowLight.position.set(-1.35, 0.75, 1.15);
    carGroup.add(portGlowLight);

    // WHEELS (4 Detailed Wheels with calipers & aero alloys)
    const wheelPositions = [
      { x: 1.32, z: 0.95 },
      { x: -1.32, z: 0.95 },
      { x: 1.32, z: -0.95 },
      { x: -1.32, z: -0.95 },
    ];

    const wheelMeshes: THREE.Group[] = [];

    wheelPositions.forEach((pos) => {
      const wGroup = new THREE.Group();
      wGroup.position.set(pos.x, 0.35, pos.z);

      // Tire
      const tireGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.24, 32);
      const tire = new THREE.Mesh(tireGeo, wheelRubber);
      tire.rotation.x = Math.PI / 2;
      tire.castShadow = true;
      wGroup.add(tire);

      // Rim
      const rimGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.25, 16);
      const rim = new THREE.Mesh(rimGeo, alloyRims);
      rim.rotation.x = Math.PI / 2;
      wGroup.add(rim);

      // Caliper
      const caliperGeo = new THREE.BoxGeometry(0.08, 0.14, 0.12);
      const caliper = new THREE.Mesh(caliperGeo, greenBrakeCaliper);
      caliper.position.set(0.12, 0.1, 0);
      wGroup.add(caliper);

      carGroup.add(wGroup);
      wheelMeshes.push(wGroup);
    });

    // -------------------------------------------------------------
    // CHARGING STATION (EVION Monolith Ultra-Fast 350kW)
    // -------------------------------------------------------------
    const chargerGroup = new THREE.Group();
    chargerGroup.position.set(2.4, 0, 1.4);
    chargerGroup.rotation.y = -0.45;
    scene.add(chargerGroup);

    // Monolith Body (Pearl white with beveled profile)
    const stationPillarGeo = new THREE.BoxGeometry(0.7, 2.35, 0.45);
    const stationMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.1,
    });
    const stationPillar = new THREE.Mesh(stationPillarGeo, stationMat);
    stationPillar.position.y = 1.175;
    stationPillar.castShadow = true;
    stationPillar.receiveShadow = true;
    chargerGroup.add(stationPillar);

    // Base Plinth
    const baseGeo = new THREE.BoxGeometry(0.85, 0.1, 0.6);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x202522, roughness: 0.6 });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = 0.05;
    base.castShadow = true;
    chargerGroup.add(base);

    // Interactive Touchscreen Display (Dark Glass with UI graphics)
    const screenGeo = new THREE.PlaneGeometry(0.44, 0.65);
    const screenMat = new THREE.MeshStandardMaterial({
      color: 0x0f1712,
      roughness: 0.1,
      metalness: 0.9,
      emissive: 0x004d26,
      emissiveIntensity: 0.4,
    });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.set(0, 1.42, 0.23);
    chargerGroup.add(screen);

    // Glowing Vertical LED Status Strip on Station Edge
    const ledStripGeo = new THREE.BoxGeometry(0.04, 2.2, 0.02);
    const ledStripMat = new THREE.MeshBasicMaterial({ color: 0x00e676 });
    const ledStripLeft = new THREE.Mesh(ledStripGeo, ledStripMat);
    ledStripLeft.position.set(-0.33, 1.18, 0.22);
    chargerGroup.add(ledStripLeft);

    const ledStripRight = new THREE.Mesh(ledStripGeo, ledStripMat);
    ledStripRight.position.set(0.33, 1.18, 0.22);
    chargerGroup.add(ledStripRight);

    // Top Halo Light Ring
    const haloRingGeo = new THREE.TorusGeometry(0.24, 0.03, 16, 32);
    const haloRingMat = new THREE.MeshBasicMaterial({ color: 0x00e676 });
    const haloRing = new THREE.Mesh(haloRingGeo, haloRingMat);
    haloRing.rotation.x = Math.PI / 2;
    haloRing.position.set(0, 2.37, 0);
    chargerGroup.add(haloRing);

    // -------------------------------------------------------------
    // CHARGING CABLE (Realistic spline curve from charger to EV)
    // -------------------------------------------------------------
    // Calculate world coordinates for charger outlet and car charge port
    const cableStart = new THREE.Vector3(2.15, 1.05, 1.45);
    const cableMid1 = new THREE.Vector3(1.4, 0.25, 1.7);
    const cableMid2 = new THREE.Vector3(-0.4, 0.2, 1.8);
    const cableEnd = new THREE.Vector3(-1.8, 0.72, 1.12);

    const cableCurve = new THREE.CubicBezierCurve3(
      cableStart,
      cableMid1,
      cableMid2,
      cableEnd
    );

    const cableGeo = new THREE.TubeGeometry(cableCurve, 64, 0.035, 12, false);
    const cableMat = new THREE.MeshStandardMaterial({
      color: 0x1a211d,
      roughness: 0.5,
      metalness: 0.2,
    });
    const cableMesh = new THREE.Mesh(cableGeo, cableMat);
    cableMesh.castShadow = true;
    scene.add(cableMesh);

    // -------------------------------------------------------------
    // ENERGY PARTICLES FLOWING ALONG CABLE INTO CAR
    // -------------------------------------------------------------
    const particleCount = 28;
    const particleGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const particleMat = new THREE.MeshBasicMaterial({
      color: 0x00e676,
      transparent: true,
      opacity: 0.9,
    });

    const particles: { mesh: THREE.Mesh; progress: number; speed: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const pMesh = new THREE.Mesh(particleGeo, particleMat);
      const progress = i / particleCount;
      const point = cableCurve.getPoint(progress);
      pMesh.position.copy(point);
      scene.add(pMesh);
      particles.push({
        mesh: pMesh,
        progress,
        speed: 0.0045 + Math.random() * 0.0015,
      });
    }

    // -------------------------------------------------------------
    // INTERACTION & PARALLAX
    // -------------------------------------------------------------
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 7;
    let targetCameraY = 3.8;

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 2;
      mouseY = y * 2;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Handle Resize
    const onResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 520;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', onResize);

    // ANIMATION LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle floating/breathing of vehicle
      carGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.02;

      // Pulse green charging halo & port light
      const pulse = 1.8 + Math.sin(elapsedTime * 3) * 0.8;
      greenChargerLight.intensity = pulse;
      portGlowLight.intensity = pulse * 1.2;

      // Flow energy particles along the bezier cable
      particles.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1) {
          p.progress = 0;
        }
        const point = cableCurve.getPoint(p.progress);
        p.mesh.position.copy(point);
        // Fade in near charger, stay bright along cable, fade at car port
        const alpha = Math.sin(p.progress * Math.PI);
        (p.mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0.2, alpha);
      });

      // Smooth camera parallax
      targetCameraX = 7 + mouseX * 1.2;
      targetCameraY = 3.8 - mouseY * 0.8;
      camera.position.x += (targetCameraX - camera.position.x) * 0.05;
      camera.position.y += (targetCameraY - camera.position.y) * 0.05;
      camera.lookAt(0.2, 0.9, 0.4);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[420px] sm:h-[500px] lg:h-[580px] rounded-3xl overflow-hidden bg-gradient-to-b from-soft-white via-white to-soft-white border border-light-border/70 shadow-card">
      {/* 3D Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating 3D Badge Indicator */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md border border-light-border text-charcoal shadow-soft">
          <span className="w-2 h-2 rounded-full bg-electric-green animate-pulse" />
          Interactive 3D Engine • Real-time WebGL
        </span>
      </div>

      <div className="absolute bottom-4 right-4 z-10 pointer-events-none hidden sm:block">
        <span className="text-[11px] font-medium text-secondary-text bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-light-border">
          Move cursor to orbit view
        </span>
      </div>

      {/* Graceful Fallback if WebGL is disabled or on ultra-low-spec device */}
      {!hasWebGL && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-soft-white">
          <div className="w-16 h-16 rounded-2xl bg-electric-green-mint flex items-center justify-center text-electric-green-deep mb-3">
            <span className="text-2xl font-bold">EV</span>
          </div>
          <h4 className="text-lg font-bold text-charcoal">EVION 350kW Charging Experience</h4>
          <p className="text-xs text-secondary-text max-w-sm mt-1">
            Displaying high-performance charging telemetry. WebGL 3D acceleration is currently disabled.
          </p>
        </div>
      )}
    </div>
  );
};

