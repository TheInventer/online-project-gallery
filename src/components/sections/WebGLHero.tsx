
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// ─── Constants ────────────────────────────────────────────
const TECH_NODES = [
  'Azure', 'Kubernetes', 'Golang', 'Docker', '.NET Core',
  'CosmosDB', 'Grafana', 'DNS', 'Redis', 'Kafka',
  'Java', 'C#', 'TypeScript', 'SDN', 'Terraform',
  'GitHub', 'Microservices', 'K8s Agents', 'Firebase', 'Unity',
];
const NODE_COLOR_PRIMARY = new THREE.Color('#00B4D8');
const NODE_COLOR_DIM = new THREE.Color('#0078D4');
const LINE_COLOR = new THREE.Color('#00B4D8');
const MAX_LINES = 300;
const CONNECT_DIST = 14;
const STAR_COUNT = 1800;

// ─── Glow texture (shared) ───────────────────────────────
function makeGlowTexture(): THREE.CanvasTexture {
  const size = 64;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.25, 'rgba(255,255,255,0.7)');
  g.addColorStop(0.6, 'rgba(255,255,255,0.15)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(c);
}

interface SceneNode {
  sprite: THREE.Sprite;
  label: string;
  vx: number;
  vy: number;
  alpha: number;
  targetAlpha: number;
  entryDelay: number;
}

export interface NodeScreenPos {
  x: number;
  y: number;
  alpha: number;
  label: string;
}

interface WebGLHeroProps {
  onNodePositions?: (positions: NodeScreenPos[]) => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function WebGLHero({ onNodePositions, containerRef }: WebGLHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);

    // ── Scene + Camera ──
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 500);
    camera.position.set(0, 0, 32);

    // ── Stars ──
    const starPositions = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT * 3; i++) {
      starPositions[i] = (Math.random() - 0.5) * 220;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff, size: 0.12, transparent: true, opacity: 0.45,
      sizeAttenuation: true,
    });
    scene.add(new THREE.Points(starGeo, starMat));

    // ── Node sprites ──
    const glowTex = makeGlowTexture();
    const nodes: SceneNode[] = TECH_NODES.map((label, i) => {
      const angle = (i / TECH_NODES.length) * Math.PI * 2;
      const radius = 10 + Math.random() * 6;
      const mat = new THREE.SpriteMaterial({
        map: glowTex,
        color: i % 3 === 0 ? NODE_COLOR_DIM : NODE_COLOR_PRIMARY,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(mat);
      const scaleBase = 1.4 + Math.random() * 0.8;
      sprite.scale.set(scaleBase, scaleBase, 1);
      sprite.position.set(
        radius * Math.cos(angle) + (Math.random() - 0.5) * 5,
        radius * Math.sin(angle) * 0.55 + (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 14,
      );
      scene.add(sprite);
      return {
        sprite, label,
        vx: (Math.random() - 0.5) * 0.012,
        vy: (Math.random() - 0.5) * 0.008,
        alpha: 0,
        targetAlpha: 0.65 + Math.random() * 0.35,
        entryDelay: i * 120,
      };
    });

    // ── Lines (pre-allocated buffer) ──
    const linePosBuffer = new Float32Array(MAX_LINES * 2 * 3);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePosBuffer, 3));
    lineGeo.setDrawRange(0, 0);
    const lineMat = new THREE.LineBasicMaterial({
      color: LINE_COLOR,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // ── Mouse spring state ──
    let targetCamX = 0, targetCamY = 0;
    let camX = 0, camY = 0;
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetCamX = ((e.clientX - rect.left) / rect.width - 0.5) * 5;
      targetCamY = -((e.clientY - rect.top) / rect.height - 0.5) * 3;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ── Resize ──
    const resize = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // ── RAF loop ──
    let rafId: number;
    let startTime = 0;

    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;

      // Spring camera follow
      camX += (targetCamX - camX) * 0.04;
      camY += (targetCamY - camY) * 0.04;
      camera.position.x = camX;
      camera.position.y = camY;
      camera.lookAt(scene.position);

      // Update nodes
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      const screenPositions: NodeScreenPos[] = [];

      nodes.forEach((node) => {
        // Fade in after delay
        if (elapsed > node.entryDelay) {
          node.alpha = Math.min(node.targetAlpha, node.alpha + 0.005);
        }
        node.sprite.material.opacity = node.alpha;

        // Drift
        node.sprite.position.x += node.vx;
        node.sprite.position.y += node.vy;
        const p = node.sprite.position;
        if (Math.abs(p.x) > 20) node.vx *= -1;
        if (Math.abs(p.y) > 12) node.vy *= -1;

        // Project to screen for HTML labels
        const v = p.clone().project(camera);
        const sx = (v.x + 1) / 2 * w;
        const sy = -(v.y - 1) / 2 * h;
        const depth = Math.max(0, Math.min(1, (v.z + 1) / 2));
        screenPositions.push({ x: sx, y: sy, alpha: node.alpha * (1 - depth * 0.4), label: node.label });
      });

      onNodePositions?.(screenPositions);

      // Update lines
      let lineIdx = 0;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (lineIdx >= MAX_LINES) break;
          const a = nodes[i].sprite.position;
          const b = nodes[j].sprite.position;
          const d = a.distanceTo(b);
          if (d < CONNECT_DIST && nodes[i].alpha > 0.1 && nodes[j].alpha > 0.1) {
            linePosBuffer.set([a.x, a.y, a.z, b.x, b.y, b.z], lineIdx * 6);
            lineIdx++;
          }
        }
      }
      lineGeo.setDrawRange(0, lineIdx * 2);
      lineGeo.attributes.position.needsUpdate = true;
      // Line opacity scales with elapsed time
      lineMat.opacity = Math.min(0.18, (elapsed / 3000) * 0.18);

      // Gentle star rotation
      const starMesh = scene.children.find((c) => c instanceof THREE.Points) as THREE.Points;
      if (starMesh) {
        starMesh.rotation.y = elapsed * 0.00002;
        starMesh.rotation.x = elapsed * 0.000008;
      }

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      ro.disconnect();
      renderer.dispose();
      glowTex.dispose();
      starGeo.dispose();
      starMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      nodes.forEach((n) => { n.sprite.material.dispose(); });
    };
  }, [containerRef, onNodePositions]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}
