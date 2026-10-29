'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import {
  CircleDot,
  Zap,
  ShieldCheck,
  CreditCard,
  Gauge,
  Layers,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

interface Hotspot {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  position: [number, number, number]; // 3D local position on charger
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'screen',
    title: '27-inch Anti-Glare Display',
    subtitle: 'Sunlight-Readable Direct Touch',
    description:
      'High-contrast digital interface displaying real-time power delivery curve, dynamic battery state of charge (SoC), and transparent kilowatt-hour billing.',
    icon: Layers,
    position: [0, 1.45, 0.28],
  },
  {
    id: 'cable',
    title: 'Liquid-Cooled 350kW Cable',
    subtitle: 'Ultra-Lightweight Ergonomics',
    description:
      'Engineered with active thermal liquid management allowing safe, continuous 500-amp peak currents while remaining light and effortless to handle in all weather.',
    icon: Zap,
    position: [0.42, 0.9, 0.15],
  },
  {
    id: 'ring',
    title: 'Dynamic Status Halo',
    subtitle: '360° Visibility Lightring',
    description:
      'High-visibility electric green LED halo communicates bay availability, active charging flow, and completion from over 100 meters away.',
    icon: CircleDot,
    position: [0, 2.38, 0],
  },
  {
    id: 'payment',
    title: 'Contactless EMV & RFID',
    subtitle: 'Universal Tap-to-Pay',
    description:
      'Instant payment via Apple Pay, Google Pay, credit cards, or RFID cards. No mandatory subscriptions or pre-loaded balances required.',
    icon: CreditCard,
    position: [0, 1.05, 0.28],
  },
  {
    id: 'holster',
    title: 'Auto-Locking Weatherproof Bay',
    subtitle: 'IP65 & IK10 Vandal-Resistant',
    description:
      'Motorized auto-locking connector holster with motorized weather seal to prevent moisture, dust, and freezing conditions.',
    icon: ShieldCheck,
    position: [-0.38, 0.75, 0.18],
  },
];

export const StationShowcase3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot>(HOTSPOTS[0]);
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 560;

    // SCENE
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // CAMERA
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 50);
    camera.position.set(0, 1.4, 4.4);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(5, 8, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const backRimLight = new THREE.DirectionalLight(0xd9ffea, 1.4);
    backRimLight.position.set(-5, 6, -5);
    scene.add(backRimLight);

    const greenAccentLight = new THREE.PointLight(0x00e676, 3.5, 6);
    greenAccentLight.position.set(0, 2.4, 0.5);
    scene.add(greenAccentLight);

    // Ground plane with subtle shadow receiver
    const groundGeo = new THREE.PlaneGeometry(16, 16);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0xf8faf9,
      roughness: 0.8,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01;
    ground.receiveShadow = true;
    scene.add(ground);

    // Circular glowing ground plinth
    const ringGeo = new THREE.RingGeometry(1.2, 1.25, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00e676,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide,
    });
    const groundRing = new THREE.Mesh(ringGeo, ringMat);
    groundRing.rotation.x = -Math.PI / 2;
    groundRing.position.y = 0.005;
    scene.add(groundRing);

    // -------------------------------------------------------------
    // 3D CHARGER MODEL GROUP
    // -------------------------------------------------------------
    const charger = new THREE.Group();
    scene.add(charger);

    // Materials
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.15,
      metalness: 0.1,
    });

    const charcoalTrimMat = new THREE.MeshStandardMaterial({
      color: 0x202522,
      roughness: 0.4,
      metalness: 0.3,
    });

    const screenMat = new THREE.MeshStandardMaterial({
      color: 0x111915,
      roughness: 0.05,
      metalness: 0.9,
      emissive: 0x003b1e,
      emissiveIntensity: 0.6,
    });

    const greenEmissiveMat = new THREE.MeshBasicMaterial({ color: 0x00e676 });

    // Main Architectural Monolith Column
    const bodyGeo = new THREE.BoxGeometry(0.78, 2.38, 0.46);
    const body = new THREE.Mesh(bodyGeo, chassisMat);
    body.position.y = 1.19;
    body.castShadow = true;
    body.receiveShadow = true;
    charger.add(body);

    // Base Stand
    const baseGeo = new THREE.BoxGeometry(0.96, 0.12, 0.62);
    const base = new THREE.Mesh(baseGeo, charcoalTrimMat);
    base.position.y = 0.06;
    base.castShadow = true;
    charger.add(base);

    // Screen (27" High-Resolution Display)
    const screenGeo = new THREE.PlaneGeometry(0.5, 0.72);
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 1.45, 0.235);
    charger.add(screenMesh);

    // Screen Bezel
    const screenBezelGeo = new THREE.BoxGeometry(0.54, 0.76, 0.015);
    const screenBezel = new THREE.Mesh(screenBezelGeo, charcoalTrimMat);
    screenBezel.position.set(0, 1.45, 0.23);
    charger.add(screenBezel);

    // Payment Terminal Slot / RFID pad
    const rfidPadGeo = new THREE.BoxGeometry(0.24, 0.14, 0.02);
    const rfidPad = new THREE.Mesh(rfidPadGeo, charcoalTrimMat);
    rfidPad.position.set(0, 0.98, 0.24);
    charger.add(rfidPad);

    // Green indicator on payment pad
    const rfidLedGeo = new THREE.BoxGeometry(0.08, 0.015, 0.025);
    const rfidLed = new THREE.Mesh(rfidLedGeo, greenEmissiveMat);
    rfidLed.position.set(0, 1.02, 0.245);
    charger.add(rfidLed);

    // Top Halo Ring
    const haloGeo = new THREE.TorusGeometry(0.26, 0.032, 16, 40);
    const halo = new THREE.Mesh(haloGeo, greenEmissiveMat);
    halo.rotation.x = Math.PI / 2;
    halo.position.set(0, 2.38, 0);
    charger.add(halo);

    // Dual Cable Holsters (Left & Right)
    const holsterGeo = new THREE.BoxGeometry(0.18, 0.45, 0.28);
    const leftHolster = new THREE.Mesh(holsterGeo, charcoalTrimMat);
    leftHolster.position.set(-0.42, 0.85, 0.05);
    charger.add(leftHolster);

    const rightHolster = new THREE.Mesh(holsterGeo, charcoalTrimMat);
    rightHolster.position.set(0.42, 0.85, 0.05);
    charger.add(rightHolster);

    // Hanging Coiled Cables (Liquid-Cooled Tube)
    const leftCableCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-0.42, 0.65, 0.1),
      new THREE.Vector3(-0.62, 0.1, 0.15),
      new THREE.Vector3(-0.52, 0.05, -0.05),
      new THREE.Vector3(-0.4, 0.85, -0.15)
    );
    const cableTubeGeo = new THREE.TubeGeometry(leftCableCurve, 32, 0.038, 10, false);
    const cableMat = new THREE.MeshStandardMaterial({
      color: 0x222b26,
      roughness: 0.6,
    });
    const leftCableMesh = new THREE.Mesh(cableTubeGeo, cableMat);
    charger.add(leftCableMesh);

    // -------------------------------------------------------------
    // INTERACTION / DRAG TO ROTATE
    // -------------------------------------------------------------
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationY = 0.25;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      setIsRotating(false);
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      targetRotationY += deltaX * 0.008;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        setIsRotating(false);
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      targetRotationY += deltaX * 0.008;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onMouseUp);

    // Resize
    const onResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 560;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', onResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Gentle auto-rotation when user is not manually dragging
      if (isRotating && !isDragging) {
        targetRotationY += 0.003;
      }

      charger.rotation.y += (targetRotationY - charger.rotation.y) * 0.06;

      // Pulse green light
      const pulseIntensity = 2.5 + Math.sin(time * 2.5) * 1.0;
      greenAccentLight.intensity = pulseIntensity;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
      window.removeEventListener('resize', onResize);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isRotating]);

  return (
    <section id="technology" className="py-20 md:py-28 bg-white relative overflow-hidden border-t border-light-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-soft-white border border-light-border text-charcoal shadow-soft mb-4">
            <span className="w-2 h-2 rounded-full bg-electric-green animate-ping" />
            <span className="text-xs font-bold uppercase tracking-widest text-secondary-text">
              HARDWARE ENGINEERING
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight">
            Meet the <span className="text-gradient-green">Next Generation</span> of Charging
          </h2>

          <p className="mt-4 text-base sm:text-lg text-secondary-text leading-relaxed">
            Discover charging experiences designed around convenience, performance, and modern electric mobility.
          </p>
        </div>

        {/* 3D Showcase and Interactive Hotspot Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left / Center 3D Interactive Canvas (7 cols) */}
          <div className="lg:col-span-7 relative h-[450px] sm:h-[540px] rounded-3xl bg-gradient-to-b from-soft-white via-white to-soft-white border border-light-border p-2 shadow-card overflow-hidden">
            <div
              ref={containerRef}
              className="w-full h-full cursor-grab active:cursor-grabbing"
              title="Click and drag to orbit 3D station"
            />

            {/* Floating Top Controls */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/95 backdrop-blur-md border border-light-border shadow-soft text-charcoal flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-electric-green" />
                360° Interactive Monolith
              </span>
            </div>

            <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
              <button
                onClick={() => setIsRotating(!isRotating)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/90 backdrop-blur-md border border-light-border hover:bg-white text-charcoal shadow-soft transition-colors"
              >
                {isRotating ? 'Pause Auto-Spin' : 'Resume Auto-Spin'}
              </button>
              <span className="text-[11px] text-secondary-text bg-white/80 px-2.5 py-1 rounded-lg hidden sm:inline-block">
                Drag to rotate charger
              </span>
            </div>
          </div>

          {/* Right Inspector Tabs / Detail Card (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-secondary-text px-1">
              Select Component to Inspect
            </h3>

            {/* Hotspot Pills */}
            <div className="space-y-2.5">
              {HOTSPOTS.map((hotspot) => {
                const isSelected = activeHotspot.id === hotspot.id;
                const Icon = hotspot.icon;
                return (
                  <button
                    key={hotspot.id}
                    onClick={() => setActiveHotspot(hotspot)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-electric-green-mint/50 border-electric-green shadow-soft'
                        : 'bg-soft-white hover:bg-white border-light-border'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2.5 rounded-xl ${
                          isSelected
                            ? 'bg-electric-green text-charcoal shadow-green-glow-sm'
                            : 'bg-white text-secondary-text border border-light-border'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-charcoal">{hotspot.title}</h4>
                        <span className="text-xs font-medium text-electric-green-deep block">
                          {hotspot.subtitle}
                        </span>
                        {isSelected && (
                          <p className="mt-2 text-xs text-secondary-text leading-relaxed">
                            {hotspot.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? 'rotate-90 text-electric-green-deep' : 'text-secondary-text'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Summary Specification Box */}
            <div className="p-4 rounded-2xl bg-white border border-light-border shadow-soft flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-electric-green-deep" />
                <span className="font-semibold text-charcoal">OCPP 2.0.1 & ISO 15118-20</span>
              </div>
              <span className="font-bold text-electric-green-deep">Turnkey Hardware</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

