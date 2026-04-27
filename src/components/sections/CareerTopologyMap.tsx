
import { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { useInView } from '@/hooks/useInView';
import { motion } from 'framer-motion';
import { fadeUp } from '@/animations';

// ─── Graph Data ───────────────────────────────────────────
type NodeType = 'company' | 'project' | 'skill';

interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  type: NodeType;
  color: string;
  r: number;
  detail?: string;
}

interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
}

const NODES: GraphNode[] = [
  // Companies
  { id: 'google', label: 'Google', type: 'company', color: '#34A853', r: 32, detail: 'Staff Software Engineer · Dec 2025–present' },
  { id: 'microsoft', label: 'Microsoft', type: 'company', color: '#0078D4', r: 28, detail: 'Software Architect L64 · 2016-2020, 2021-Nov 2025' },
  { id: 'disney', label: 'Disney+', type: 'company', color: '#00B4D8', r: 22, detail: 'Software Engineer II · 2020-2021' },
  { id: 'ut-austin', label: 'UT Austin', type: 'company', color: '#7C3AED', r: 20, detail: 'M.S. Computer Science · 2024-present' },
  // Projects
  { id: 'cosmic', label: 'Cosmic', type: 'project', color: '#0078D4', r: 14, detail: '5,000+ K8s clusters platform' },
  { id: 'sovereign', label: 'Sovereign\nClouds', type: 'project', color: '#0078D4', r: 14, detail: 'France · Germany · Singapore' },
  { id: 'devops', label: 'Azure\nDevOps', type: 'project', color: '#0078D4', r: 12, detail: 'GitHub Actions · Pipelines' },
  { id: 'hotstar-infra', label: 'OTT Infra', type: 'project', color: '#00B4D8', r: 12, detail: 'Content delivery · SEA launch' },
  { id: 'analytics', label: 'Analytics\nDashboard', type: 'project', color: '#0078D4', r: 11, detail: 'Real-time cluster metrics' },
  { id: 'events-app', label: 'Events App', type: 'project', color: '#7C3AED', r: 11, detail: 'Android · Firebase' },
  // Skills
  { id: 'k8s', label: 'Kubernetes', type: 'skill', color: '#00B4D8', r: 9 },
  { id: 'golang', label: 'Golang', type: 'skill', color: '#00B4D8', r: 9 },
  { id: 'azure', label: 'Azure', type: 'skill', color: '#0078D4', r: 9 },
  { id: 'dotnet', label: '.NET Core', type: 'skill', color: '#7C3AED', r: 8 },
  { id: 'dns', label: 'DNS', type: 'skill', color: '#0078D4', r: 8 },
  { id: 'grafana', label: 'Grafana', type: 'skill', color: '#F5A623', r: 8 },
  { id: 'java', label: 'Java', type: 'skill', color: '#F5A623', r: 8 },
  { id: 'ml', label: 'ML / AI', type: 'skill', color: '#7C3AED', r: 8 },
  { id: 'docker', label: 'Docker', type: 'skill', color: '#00B4D8', r: 8 },
  { id: 'redis', label: 'Redis', type: 'skill', color: '#F5A623', r: 7 },
];

const LINKS: GraphLink[] = [
  // Company → Project / Skill
  { source: 'google', target: 'k8s' },
  { source: 'google', target: 'golang' },
  { source: 'google', target: 'docker' },
  { source: 'microsoft', target: 'cosmic' },
  { source: 'microsoft', target: 'sovereign' },
  { source: 'microsoft', target: 'devops' },
  { source: 'microsoft', target: 'analytics' },
  { source: 'disney', target: 'hotstar-infra' },
  { source: 'ut-austin', target: 'events-app' },
  { source: 'ut-austin', target: 'ml' },
  // Project → Skill
  { source: 'cosmic', target: 'k8s' },
  { source: 'cosmic', target: 'golang' },
  { source: 'cosmic', target: 'azure' },
  { source: 'cosmic', target: 'docker' },
  { source: 'cosmic', target: 'grafana' },
  { source: 'sovereign', target: 'dns' },
  { source: 'sovereign', target: 'dotnet' },
  { source: 'sovereign', target: 'azure' },
  { source: 'devops', target: 'azure' },
  { source: 'analytics', target: 'grafana' },
  { source: 'analytics', target: 'k8s' },
  { source: 'hotstar-infra', target: 'java' },
  { source: 'events-app', target: 'java' },
  // Cross-skill
  { source: 'cosmic', target: 'redis' },
  { source: 'hotstar-infra', target: 'redis' },
];

// ─── Detail Tooltip ───────────────────────────────────────
function NodeTooltip({ node, x, y }: { node: GraphNode; x: number; y: number }) {
  return (
    <motion.div
      key={node.id}
      initial={{ opacity: 0, scale: 0.9, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 6 }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'absolute',
        left: x + 16,
        top: y - 10,
        background: 'rgba(13,20,33,0.95)',
        backdropFilter: 'blur(16px)',
        border: `1px solid ${node.color}35`,
        borderRadius: '10px',
        padding: '10px 14px',
        pointerEvents: 'none',
        zIndex: 20,
        maxWidth: '200px',
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${node.color}20`,
      }}
    >
      <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: '0.875rem', color: '#E8EAED', marginBottom: '2px' }}>
        {node.label.replace('\n', ' ')}
      </p>
      {node.detail && (
        <p style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.7rem', color: node.color, lineHeight: 1.5 }}>
          {node.detail}
        </p>
      )}
      <p style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.65rem', color: '#8892A4', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {node.type}
      </p>
    </motion.div>
  );
}

// ─── CareerTopologyMap ────────────────────────────────────
export default function CareerTopologyMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{ node: GraphNode; x: number; y: number } | null>(null);
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.1 });
  const started = useRef(false);

  const buildGraph = useCallback(() => {
    const svg = svgRef.current;
    const container = containerRef.current;
    if (!svg || !container) return;

    const width = container.offsetWidth;
    const height = Math.max(480, container.offsetHeight);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('width', String(width));
    svg.setAttribute('height', String(height));

    // Clear previous
    d3.select(svg).selectAll('*').remove();

    const defs = d3.select(svg).append('defs');

    // Glow filter
    const filter = defs.append('filter').attr('id', 'glow').attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%');
    filter.append('feGaussianBlur').attr('in', 'SourceGraphic').attr('stdDeviation', '3').attr('result', 'blur');
    const merge = filter.append('feMerge');
    merge.append('feMergeNode').attr('in', 'blur');
    merge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Clone nodes/links for simulation (D3 mutates them)
    const nodes: GraphNode[] = NODES.map((n) => ({ ...n }));
    const links: GraphLink[] = LINKS.map((l) => ({ ...l }));

    // Force simulation
    const sim = d3.forceSimulation<GraphNode>(nodes)
      .force('link', d3.forceLink<GraphNode, GraphLink>(links)
        .id((d) => d.id)
        .distance((l) => {
          const s = l.source as GraphNode;
          const t = l.target as GraphNode;
          if (s.type === 'company' && t.type === 'project') return 90;
          if (s.type === 'project' && t.type === 'skill') return 65;
          return 80;
        })
        .strength(0.6))
      .force('charge', d3.forceManyBody<GraphNode>().strength((d) => {
        if (d.type === 'company') return -400;
        if (d.type === 'project') return -200;
        return -80;
      }))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide<GraphNode>().radius((d) => d.r + 14).strength(0.8))
      .force('x', d3.forceX(width / 2).strength(0.04))
      .force('y', d3.forceY(height / 2).strength(0.04));

    const g = d3.select(svg).append('g');

    // Links
    const linkSel = g.append('g').selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', (d) => {
        const s = d.source as GraphNode;
        return s.color;
      })
      .attr('stroke-opacity', 0.18)
      .attr('stroke-width', 1);

    // Nodes group
    const nodeSel = g.append('g').selectAll<SVGGElement, GraphNode>('g')
      .data(nodes)
      .join('g')
      .style('cursor', 'pointer')
      .call(
        d3.drag<SVGGElement, GraphNode>()
          .on('start', (event, d) => {
            if (!event.active) sim.alphaTarget(0.3).restart();
            d.fx = d.x; d.fy = d.y;
          })
          .on('drag', (event, d) => { d.fx = event.x; d.fy = event.y; })
          .on('end', (event, d) => {
            if (!event.active) sim.alphaTarget(0);
            d.fx = null; d.fy = null;
          })
      )
      .on('mouseenter', function (event, d) {
        // Highlight connected nodes
        const connected = new Set<string>([d.id]);
        links.forEach((l) => {
          const s = (l.source as GraphNode).id;
          const t = (l.target as GraphNode).id;
          if (s === d.id) connected.add(t);
          if (t === d.id) connected.add(s);
        });
        nodeSel.style('opacity', (n) => connected.has(n.id) ? 1 : 0.2);
        linkSel.style('opacity', (l) => {
          const s = (l.source as GraphNode).id;
          const t = (l.target as GraphNode).id;
          return (s === d.id || t === d.id) ? 0.8 : 0.06;
        });
        // Tooltip
        const rect = svg.getBoundingClientRect();
        setTooltip({ node: d, x: event.clientX - rect.left, y: event.clientY - rect.top });
      })
      .on('mouseleave', () => {
        nodeSel.style('opacity', 1);
        linkSel.style('opacity', 0.18);
        setTooltip(null);
      });

    // Glow circle (outer ring)
    nodeSel.append('circle')
      .attr('r', (d) => d.r + 6)
      .attr('fill', (d) => d.color)
      .attr('fill-opacity', 0.06)
      .attr('filter', 'url(#glow)');

    // Main circle
    nodeSel.append('circle')
      .attr('r', (d) => d.r)
      .attr('fill', (d) => `${d.color}18`)
      .attr('stroke', (d) => d.color)
      .attr('stroke-width', (d) => d.type === 'company' ? 2 : 1)
      .attr('stroke-opacity', (d) => d.type === 'company' ? 0.9 : 0.6);

    // Label
    nodeSel.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('fill', '#E8EAED')
      .attr('font-family', 'Geist Mono, monospace')
      .attr('font-size', (d) => d.type === 'company' ? '9px' : '7.5px')
      .attr('font-weight', (d) => d.type === 'company' ? '600' : '400')
      .attr('pointer-events', 'none')
      .each(function (d) {
        const lines = d.label.split('\n');
        if (lines.length === 1) {
          d3.select(this).text(d.label);
        } else {
          lines.forEach((line, i) => {
            d3.select(this).append('tspan')
              .attr('x', 0)
              .attr('dy', i === 0 ? `-${(lines.length - 1) * 0.55}em` : '1.1em')
              .text(line);
          });
        }
      });

    // Tick
    sim.on('tick', () => {
      linkSel
        .attr('x1', (d) => (d.source as GraphNode).x!)
        .attr('y1', (d) => (d.source as GraphNode).y!)
        .attr('x2', (d) => (d.target as GraphNode).x!)
        .attr('y2', (d) => (d.target as GraphNode).y!);

      nodeSel.attr('transform', (d) => `translate(${d.x},${d.y})`);
    });

    // Stop simulation after it settles (performance)
    setTimeout(() => sim.alphaTarget(0), 5000);

    return () => { sim.stop(); d3.select(svg).selectAll('*').remove(); };
  }, []);

  // Start simulation when section enters view (once)
  useEffect(() => {
    if (inView && !started.current) {
      started.current = true;
      const cleanup = buildGraph();
      return cleanup;
    }
  }, [inView, buildGraph]);

  // Rebuild on resize
  useEffect(() => {
    const ro = new ResizeObserver(() => {
      if (started.current) buildGraph();
    });
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [buildGraph]);

  return (
    <section
      ref={sectionRef}
      className="section-pad relative"
      style={{ background: 'var(--color-void)' }}
    >
      <div className="container mx-auto px-4 mb-10">
        <motion.p variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="label-text mb-3">
          Career Graph
        </motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="section-heading" style={{ maxWidth: 520 }}>
          Every node, connection,{' '}
          <span className="text-gradient-azure">and cluster</span>
        </motion.h2>
        <motion.p variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} style={{ color: '#8892A4', fontSize: '0.9375rem', maxWidth: '420px', marginTop: '0.5rem' }}>
          Hover a node to explore connections. Drag to rearrange. Your career as a distributed system.
        </motion.p>
      </div>

      {/* Graph container */}
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative mx-auto"
        style={{
          width: '100%',
          maxWidth: '1000px',
          height: 'clamp(420px, 55vw, 580px)',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.06)',
          background: 'var(--color-ink)',
          overflow: 'hidden',
        }}
      >
        <svg ref={svgRef} style={{ display: 'block', width: '100%', height: '100%' }} />

        {/* Tooltip */}
        {tooltip && <NodeTooltip node={tooltip.node} x={tooltip.x} y={tooltip.y} />}

        {/* Legend */}
        <div
          style={{
            position: 'absolute', bottom: '1rem', left: '1rem',
            display: 'flex', gap: '1rem',
            fontFamily: 'Geist Mono, monospace', fontSize: '0.65rem', color: '#8892A4',
          }}
        >
          {[
            { color: '#0078D4', label: 'Company' },
            { color: '#00B4D8', label: 'Project' },
            { color: '#F5A623', label: 'Skill' },
          ].map(({ color, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', border: `1.5px solid ${color}`, background: `${color}20` }} />
              {label}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
