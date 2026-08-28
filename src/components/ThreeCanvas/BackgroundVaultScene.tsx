import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  LEGAL_DOCUMENTS,
  createDocumentTexture,
  createDocumentBackTexture,
} from './documentTextures';
import { FileCheck, ShieldCheck, Sparkles, ScrollText } from 'lucide-react';

interface BackgroundVaultSceneProps {
  isDarkMode?: boolean;
}

interface DocumentItem {
  group: THREE.Group;
  mesh: THREE.Mesh;
  baseX: number;
  baseY: number;
  baseZ: number;
  speed: number;
  floatOffset: number;
  flutterSpeed: number;
  initialRot: THREE.Euler;
  docIndex: number;
}

export default function BackgroundVaultScene({ isDarkMode = true }: BackgroundVaultSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const [isInteractiveHighlight, setIsInteractiveHighlight] = useState<boolean>(false);

  // Trigger animation ref for manual inspection
  const triggerFlutterRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Viewport Dimensions
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Track all disposable Three.js resources
    const disposables: { dispose: () => void }[] = [];

    // -------------------------------------------------------------
    // SCENE, CAMERA & RENDERER SETUP
    // -------------------------------------------------------------
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 9.5);

    // Subtle atmospheric fog to merge seamlessly into app background
    const fogColor = isDarkMode ? 0x090d12 : 0xf8fafc;
    scene.fog = new THREE.FogExp2(fogColor, 0.035);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isDarkMode ? 1.15 : 1.25;

    // Ensure canvas stays pristine and transparent
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Color Palette Accents
    const emeraldNeon = isDarkMode ? 0x10b981 : 0x059669;
    const cyanNeon = isDarkMode ? 0x06b6d4 : 0x0891b2;

    // -------------------------------------------------------------
    // LIGHTING (Crafted for crisp paper readability & subtle highlights)
    // -------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(
      isDarkMode ? 0x334155 : 0xffffff,
      isDarkMode ? 1.4 : 1.5
    );
    scene.add(ambientLight);

    const mainDirectionalLight = new THREE.DirectionalLight(0xffffff, isDarkMode ? 1.8 : 2.0);
    mainDirectionalLight.position.set(6, 8, 7);
    scene.add(mainDirectionalLight);

    const rimEmeraldLight = new THREE.PointLight(emeraldNeon, isDarkMode ? 3.2 : 2.0, 24);
    rimEmeraldLight.position.set(5, 2, 4);
    scene.add(rimEmeraldLight);

    const cyanFillLight = new THREE.PointLight(cyanNeon, isDarkMode ? 2.5 : 1.8, 24);
    cyanFillLight.position.set(-5, -2, 3);
    scene.add(cyanFillLight);

    // -------------------------------------------------------------
    // SUBTLE BACKGROUND CYBER GRID (Unified 3D Ground)
    // -------------------------------------------------------------
    const gridHelper = new THREE.GridHelper(
      42,
      42,
      isDarkMode ? 0x10b981 : 0x059669,
      isDarkMode ? 0x1e293b : 0xe2e8f0
    );
    gridHelper.position.set(0, -6.5, -4);
    gridHelper.rotation.x = 0.15;
    const gridMat = gridHelper.material as THREE.LineBasicMaterial;
    gridMat.transparent = true;
    gridMat.opacity = isDarkMode ? 0.18 : 0.25;
    scene.add(gridHelper);
    disposables.push(gridHelper.geometry, gridMat);

    // -------------------------------------------------------------
    // 3D FLOATING LEGAL DOCUMENTS (Continuous Multi-Tier Stream)
    // -------------------------------------------------------------
    const docGroup = new THREE.Group();
    scene.add(docGroup);

    const documentItems: DocumentItem[] = [];

    // Realistic document card geometry with real physical thickness
    const docCardGeo = new THREE.BoxGeometry(1.28, 1.80, 0.014);
    disposables.push(docCardGeo);

    // Edge paper material
    const edgePaperMat = new THREE.MeshStandardMaterial({
      color: isDarkMode ? 0x334155 : 0xe2e8f0,
      roughness: 0.6,
      metalness: 0.05,
    });
    disposables.push(edgePaperMat);

    // Generate shared security seal back texture
    const backTexture = createDocumentBackTexture(isDarkMode);
    disposables.push(backTexture);

    const backMaterial = new THREE.MeshStandardMaterial({
      map: backTexture,
      roughness: 0.4,
      metalness: 0.1,
    });
    disposables.push(backMaterial);

    // Balanced spatial anchors across the 3D scroll corridor
    // Arranged symmetrically in the left and right margins to frame content cleanly
    const baseAnchors = [
      // Left lane dockets
      { x: -3.5, y: 2.2, z: 1.4, rx: 0.12, ry: 0.24, rz: -0.09, speed: 1.0 },
      { x: -2.8, y: -0.8, z: 1.0, rx: 0.22, ry: -0.16, rz: 0.14, speed: 1.1 },
      { x: -3.2, y: -3.2, z: 0.2, rx: 0.14, ry: -0.12, rz: 0.06, speed: 1.05 },
      // Right lane dockets
      { x: 3.5, y: 2.4, z: 1.3, rx: -0.15, ry: -0.26, rz: 0.11, speed: 0.95 },
      { x: 2.9, y: -0.4, z: 0.8, rx: -0.20, ry: 0.22, rz: -0.08, speed: 1.15 },
      { x: 3.4, y: -2.8, z: 1.1, rx: -0.18, ry: -0.18, rz: 0.12, speed: 1.0 },
      // Depth background floating docket
      { x: 0.5, y: 3.6, z: -1.2, rx: 0.06, ry: 0.14, rz: -0.18, speed: 0.85 },
    ];

    LEGAL_DOCUMENTS.forEach((docMeta, idx) => {
      const frontTexture = createDocumentTexture(docMeta, isDarkMode);
      disposables.push(frontTexture);

      const frontMat = new THREE.MeshStandardMaterial({
        map: frontTexture,
        roughness: 0.4,
        metalness: 0.1,
      });
      disposables.push(frontMat);

      // BoxGeometry Material Array:
      // [right, left, top, bottom, front, back]
      const cardMaterials = [
        edgePaperMat,
        edgePaperMat,
        edgePaperMat,
        edgePaperMat,
        frontMat,
        backMaterial,
      ];

      const docMesh = new THREE.Mesh(docCardGeo, cardMaterials);
      const anchor = baseAnchors[idx % baseAnchors.length];

      const itemGroup = new THREE.Group();
      itemGroup.position.set(anchor.x, anchor.y, anchor.z);
      itemGroup.rotation.set(anchor.rx, anchor.ry, anchor.rz);
      itemGroup.add(docMesh);

      docGroup.add(itemGroup);

      documentItems.push({
        group: itemGroup,
        mesh: docMesh,
        baseX: anchor.x,
        baseY: anchor.y,
        baseZ: anchor.z,
        speed: anchor.speed,
        floatOffset: (idx / LEGAL_DOCUMENTS.length) * Math.PI * 2,
        flutterSpeed: 1.0 + (idx % 3) * 0.35,
        initialRot: new THREE.Euler(anchor.rx, anchor.ry, anchor.rz),
        docIndex: idx,
      });
    });

    // -------------------------------------------------------------
    // FLOATING SECURITY CYPHER PARTICLES (Cryptographic dust)
    // -------------------------------------------------------------
    const particleCount = 80;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 18;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      particleSpeeds[i] = 0.2 + Math.random() * 0.4;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: emeraldNeon,
      size: 0.05,
      transparent: true,
      opacity: isDarkMode ? 0.6 : 0.4,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    disposables.push(particleGeo, particleMat);

    // -------------------------------------------------------------
    // INTERACTION & SCROLL STATE
    // -------------------------------------------------------------
    let currentScroll = 0;
    let targetScroll = 0;
    let scrollVelocity = 0;
    let lastScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;

    const getWindowScrollProgress = () => {
      const docEl = document.documentElement;
      const body = document.body;
      const sy = window.pageYOffset || docEl.scrollTop || body.scrollTop || 0;
      const totalH = Math.max(docEl.scrollHeight, body.scrollHeight, docEl.clientHeight);
      const winH = window.innerHeight || docEl.clientHeight;
      const max = Math.max(totalH - winH, 1);
      return Math.min(Math.max(sy / max, 0), 1);
    };

    const handleScroll = () => {
      const sy = window.pageYOffset || document.documentElement.scrollTop || 0;
      targetScroll = getWindowScrollProgress();
      const rawVelocity = (sy - lastScrollY) * 0.003;
      scrollVelocity = Math.max(-0.4, Math.min(0.4, rawVelocity));
      lastScrollY = sy;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Mouse movement for subtle tactile parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Responsive Viewport Resize Handler
    const updateDimensions = () => {
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', updateDimensions);

    // Interactive Boost Trigger
    let manualFlutterBoost = 0;
    triggerFlutterRef.current = () => {
      manualFlutterBoost = 1.0;
    };

    // -------------------------------------------------------------
    // ANIMATION LOOP (Silky Smooth 60 FPS)
    // -------------------------------------------------------------
    let animId: number;
    const clock = new THREE.Clock();

    const render = () => {
      animId = requestAnimationFrame(render);
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      // Decay manual flutter boost
      if (manualFlutterBoost > 0) {
        manualFlutterBoost = Math.max(0, manualFlutterBoost - delta * 0.8);
      }

      // Continuously sample scroll progress
      targetScroll = getWindowScrollProgress();

      // Silky smooth scroll lerp
      currentScroll += (targetScroll - currentScroll) * 0.085;
      scrollVelocity *= 0.94; // natural decay

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Update HUD progress percentage
      const percent = Math.round(currentScroll * 100);
      setScrollPercent(percent);

      // Compute dynamic camera viewport boundaries at z = 0
      const vFovRad = (camera.fov * Math.PI) / 180;
      const visibleHeightAtDist = 2 * Math.tan(vFovRad / 2) * camera.position.z;
      const visibleWidthAtDist = visibleHeightAtDist * camera.aspect;
      const halfH = visibleHeightAtDist * 0.5;

      // Camera Subtle Motion (Parallax depth)
      camera.position.x = mouseX * 0.35;
      camera.position.y = -mouseY * 0.25;
      camera.lookAt(mouseX * 0.1, 0, 0);

      // Floating Documents Flow & Parallax (Continuous Multi-Section Orbit)
      documentItems.forEach((item) => {
        // Adjust horizontal spread proportionally to screen width
        const responsiveBaseX = item.baseX * Math.min(camera.aspect / 1.35, 1.15);

        // Continuous vertical scroll displacement with wrap-around
        const scrollDistance = currentScroll * 9.5 * item.speed;
        const totalSpan = halfH * 2.6; // span of vertical wrapping corridor
        let currentY = item.baseY - scrollDistance;

        // Wrap around smoothly so documents continuously populate the background
        while (currentY < -halfH - 1.8) {
          currentY += totalSpan;
        }
        while (currentY > halfH + 1.8) {
          currentY -= totalSpan;
        }

        // Harmonic hovering motion (organic breathing float)
        const flutterMultiplier = 1.0 + manualFlutterBoost * 2.0;
        const floatY = Math.sin(elapsed * item.flutterSpeed * flutterMultiplier + item.floatOffset) * 0.15;
        const floatX = Math.cos(elapsed * 0.7 * flutterMultiplier + item.floatOffset) * 0.10;

        // Soft aerodynamic banking when moving
        const bankTilt = Math.max(-0.28, Math.min(0.28, scrollVelocity * 0.6));

        // Apply smooth coordinates
        item.group.position.x = responsiveBaseX + floatX + mouseX * 0.25;
        item.group.position.y = currentY + floatY;
        item.group.position.z = item.baseZ + mouseY * 0.12 + manualFlutterBoost * 0.3;

        // Rotations: initial tilt + continuous drift + aerodynamic tilt + manual boost
        item.group.rotation.x =
          item.initialRot.x +
          Math.sin(elapsed * 1.1 + item.floatOffset) * 0.08 +
          bankTilt;
        item.group.rotation.y =
          item.initialRot.y +
          Math.cos(elapsed * 0.8 + item.floatOffset) * 0.08 +
          currentScroll * 0.35 +
          manualFlutterBoost * 0.4;
        item.group.rotation.z =
          item.initialRot.z +
          Math.sin(elapsed * 0.6 + item.floatOffset) * 0.06;
      });

      // Security Cypher Dust Particles Drift
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const positions = posAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particleSpeeds[i] * delta * 0.4;
        if (positions[i * 3 + 1] > 8) {
          positions[i * 3 + 1] = -8;
        }
      }
      posAttr.needsUpdate = true;
      particles.rotation.y = elapsed * 0.025;

      renderer.render(scene, camera);
    };

    render();

    // -------------------------------------------------------------
    // CLEANUP
    // -------------------------------------------------------------
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateDimensions);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();

      // Dispose all collected geometries, materials, and canvas textures
      disposables.forEach((item) => {
        try {
          item.dispose();
        } catch {
          // ignore
        }
      });
    };
  }, [isDarkMode]);

  return (
    <div
      id="documents-background-container"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* 3D WebGL Canvas rendered seamlessly in the background */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Floating HUD Indicator Pill: Shows verified 3D documents & scroll sync */}
      <div className="absolute bottom-6 right-6 pointer-events-auto z-20 hidden md:flex items-center gap-3">
        <div
          className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border backdrop-blur-md text-xs font-mono transition-all duration-300 ${
            isDarkMode
              ? 'bg-slate-900/85 border-slate-700/60 text-slate-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
              : 'bg-white/90 border-slate-200 text-slate-700 shadow-lg'
          }`}
        >
          {/* Status Indicator */}
          <div className="flex items-center gap-1.5">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>LEGAL DOCKETS</span>
            </span>
          </div>

          <span className="text-slate-500">|</span>

          {/* Active 3D Documents Counter */}
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <ScrollText className="w-3 h-3 text-cyan-400 inline" />
            <span>7 VERIFIED EXHIBITS</span>
          </span>

          <span className="text-slate-500">|</span>

          {/* Scroll progress gauge */}
          <span className="text-[11px] text-slate-400">
            SCROLL: <span className="font-bold text-emerald-400">{scrollPercent}%</span>
          </span>

          {/* Interactive Trigger Button to cycle flutter inspection */}
          <button
            onClick={() => {
              if (triggerFlutterRef.current) {
                triggerFlutterRef.current();
              }
              setIsInteractiveHighlight(true);
              setTimeout(() => setIsInteractiveHighlight(false), 2000);
            }}
            title="Inspect 3D Documents Motion"
            className="ml-1 p-1 rounded hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isInteractiveHighlight ? 'animate-spin text-cyan-400' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
