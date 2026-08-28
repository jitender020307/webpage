import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface JusticeCoreSceneProps {
  isDarkMode?: boolean;
}

export default function JusticeCoreScene({ isDarkMode = true }: JusticeCoreSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 140;
    let height = container.clientHeight || 140;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    // Color schemes
    const emeraldColor = isDarkMode ? 0x10b981 : 0x059669;
    const cyanColor = isDarkMode ? 0x06b6d4 : 0x0891b2;
    const goldColor = isDarkMode ? 0xf59e0b : 0xd97706;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, isDarkMode ? 0.7 : 0.9);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(emeraldColor, 2.5, 20);
    pointLight.position.set(3, 4, 3);
    scene.add(pointLight);

    const secondaryLight = new THREE.PointLight(cyanColor, 1.8, 20);
    secondaryLight.position.set(-3, -3, 2);
    scene.add(secondaryLight);

    // Central Core: Dual Octahedron (Judicial Diamond)
    const coreGeo = new THREE.OctahedronGeometry(1.0, 0);
    const coreMat = new THREE.MeshPhongMaterial({
      color: isDarkMode ? 0x061e16 : 0xf0fdf4,
      emissive: emeraldColor,
      emissiveIntensity: isDarkMode ? 0.45 : 0.3,
      shininess: 120,
      transparent: true,
      opacity: 0.9,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Inner wireframe lattice
    const wireframeGeo = new THREE.WireframeGeometry(coreGeo);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: cyanColor,
      transparent: true,
      opacity: 0.8,
    });
    const wireframeMesh = new THREE.LineSegments(wireframeGeo, wireframeMat);
    coreMesh.add(wireframeMesh);

    // Two Orbiting Rings (representing consensus loops)
    const ringGroup = new THREE.Group();
    const ring1Geo = new THREE.TorusGeometry(1.6, 0.02, 16, 80);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: emeraldColor,
      transparent: true,
      opacity: 0.6,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ringGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.9, 0.02, 16, 80);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: goldColor,
      transparent: true,
      opacity: 0.5,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ringGroup.add(ring2);

    scene.add(ringGroup);

    // Floating particles
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 1.3 + Math.random() * 1.5;
      positions[i] = Math.cos(theta) * radius;
      positions[i + 1] = (Math.random() - 0.5) * 1.5;
      positions[i + 2] = Math.sin(theta) * radius;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: emeraldColor,
      size: 0.04,
      transparent: true,
      opacity: 0.75,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Resize observer
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 140;
      height = container.clientHeight || 140;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let reqId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Rotate core diamond
      coreMesh.rotation.y = elapsed * 0.45;
      coreMesh.rotation.x = Math.sin(elapsed * 0.3) * 0.2;

      // Orbit rings
      ring1.rotation.z = elapsed * 0.35;
      ring2.rotation.x = elapsed * 0.25;

      // Spin particles
      particles.rotation.y = -elapsed * 0.15;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isDarkMode]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center pointer-events-none"
      title="3D Justice Consensus Core"
    />
  );
}
