
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import FloatingNav from '@/components/FloatingNav';
import Footer from '../components/Footer';
import { projectsData } from '../data/projects';
import { ArrowLeft, ExternalLink, ArrowUpRight } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { staggerContainer, fadeUp, fadeLeft, scaleIn, pageVariants } from '@/animations';
import MagneticButton from '@/components/ui/MagneticButton';

// ─── Per-project rich metadata ────────────────────────────
// Extends raw project data with case-study content
const projectMeta: Record<number, {
  company: string;
  period: string;
  category: string;
  accentColor: string;
  overview: string;
  challenge: string;
  approach: string[];
  impact: { metric: string; label: string }[];
}> = {
  1: {
    company: 'Microsoft',
    period: '2022 – 2024',
    category: 'Cloud Infrastructure',
    accentColor: '#0078D4',
    overview: 'Cosmic is Microsoft\'s internal containerized cloud infrastructure platform, built to automate provisioning, deployment, and lifecycle management of containerized applications across thousands of Kubernetes clusters worldwide.',
    challenge: 'Orchestrating 5,000+ Kubernetes clusters — each with up to 500 nodes — across multiple Azure regions while ensuring zero-downtime deployments, automated failover, and unified observability at a scale unprecedented within Microsoft\'s internal infrastructure portfolio.',
    approach: [
      'Designed a custom Kubernetes Operator in Golang that acts as a control plane across all cluster instances, enabling declarative cluster management at scale.',
      'Implemented a distributed event bus using Azure Service Bus to propagate cluster state changes across regions with exactly-once delivery guarantees.',
      'Built a real-time observability layer integrating Azure Log Analytics and Grafana, providing unified dashboards across all 5,000+ clusters.',
      'Introduced automated canary deployments at the cluster level — rolling updates propagate to 1% of clusters first, with automatic rollback on anomaly detection.',
      'Developed a custom SDN (Software-Defined Networking) layer for inter-cluster communication with microsecond-level latency SLOs.',
    ],
    impact: [
      { metric: '5,000+', label: 'K8s clusters managed' },
      { metric: '500', label: 'Nodes per cluster' },
      { metric: '99.99%', label: 'Uptime SLA achieved' },
      { metric: '60%', label: 'Reduction in manual ops' },
    ],
  },
  2: {
    company: 'Microsoft',
    period: '2021 – 2023',
    category: 'National Cloud Infrastructure',
    accentColor: '#0078D4',
    overview: 'Built Azure Sovereign Cloud infrastructure for three nations — France, Germany, and Singapore — from bare metal to fully operational cloud regions, meeting each country\'s strict data residency and regulatory requirements.',
    challenge: 'Each sovereign cloud must satisfy the legal and regulatory requirements of its host nation while maintaining feature parity with global Azure — a technically complex constraint requiring custom DNS service topology, isolated control planes, and independent compliance audit trails.',
    approach: [
      'Led the buildout of 20+ DNS services using .NET Core, each independently deployed and monitored within the sovereign boundary.',
      'Integrated with the Buildout Orchestration Platform to automate the physical-to-logical mapping of thousands of servers, racks, and network switches.',
      'Implemented Cosmos DB geo-replication patterns compliant with data residency laws (no cross-border replication without explicit legal approval).',
      'Designed and executed the full network topology for each region: BGP peering, VPN gateway configuration, and ExpressRoute circuits.',
      'Partnered with Azure Networking teams to validate DNS TTL propagation across sovereign boundaries under isolated network conditions.',
    ],
    impact: [
      { metric: '3', label: 'Nations deployed' },
      { metric: '20+', label: 'DNS services built' },
      { metric: '1,000s', label: 'Servers provisioned' },
      { metric: '0', label: 'Compliance violations' },
    ],
  },
  3: {
    company: 'University of Texas, Austin',
    period: '2024 – 2025',
    category: 'Mobile Development',
    accentColor: '#7C3AED',
    overview: 'A social event discovery platform for Android, enabling students and locals to find, create, and RSVP to events — with real-time push notifications, Google Maps integration, and Firebase-powered instant updates.',
    challenge: 'Building a real-time, socially-connected mobile app that gracefully handles concurrent user interactions (RSVPs, event edits, chat) without stale data, while maintaining sub-500ms push notification delivery.',
    approach: [
      'Architected a Firebase Realtime Database schema optimized for fan-out reads — event feeds, RSVP counts, and attendee lists update instantly across all connected clients.',
      'Integrated Firebase Cloud Messaging for push notifications with topic-based subscriptions — users receive only events matching their interest categories.',
      'Used Google Maps SDK for event geo-pinning with custom marker clustering to handle dense urban event density without UI clutter.',
      'Implemented offline-first data caching via Room Database, allowing full browse + RSVP flow without network connectivity.',
    ],
    impact: [
      { metric: '<500ms', label: 'Push notification latency' },
      { metric: 'Real-time', label: 'Feed synchronization' },
      { metric: 'Offline', label: 'Full browse support' },
      { metric: '4', label: 'Firebase services integrated' },
    ],
  },
  4: {
    company: 'Microsoft',
    period: '2022 – 2023',
    category: 'Observability',
    accentColor: '#0078D4',
    overview: 'A real-time analytics dashboard for the Cosmic platform, aggregating metrics from 5,000+ Kubernetes clusters into a unified observability experience — enabling on-call engineers to detect anomalies within seconds.',
    challenge: 'Ingesting metrics from 2.5M nodes in near real-time and presenting them in a coherent, actionable UI without overwhelming on-call engineers with noise.',
    approach: [
      'Designed a tiered metrics aggregation pipeline: per-node → per-cluster → per-region → global rollup, using Azure Log Analytics as the data layer.',
      'Built custom Grafana dashboards with dynamic variable selectors — filter by region, cluster tier, or specific deployment pipeline.',
      'Implemented SLO-based alerting with automatic PagerDuty escalation when error budgets are consumed beyond defined thresholds.',
      'Added anomaly detection using Azure Monitor\'s ML-based alert rules — reduces alert fatigue by 70% vs threshold-only alerts.',
    ],
    impact: [
      { metric: '2.5M', label: 'Nodes monitored' },
      { metric: '<10s', label: 'Alert detection latency' },
      { metric: '70%', label: 'Alert fatigue reduction' },
      { metric: '99.9%', label: 'Dashboard availability' },
    ],
  },
  5: {
    company: 'Personal Project',
    period: '2023',
    category: 'Backend Systems',
    accentColor: '#00B4D8',
    overview: 'A production-grade API gateway handling authentication, rate limiting, and intelligent request routing for a microservices architecture, capable of processing millions of requests per day with sub-10ms overhead.',
    challenge: 'Centralizing cross-cutting concerns (auth, rate-limiting, circuit-breaking) without adding meaningful latency to the critical path of millions of daily API calls.',
    approach: [
      'Built on Node.js/Express with a plugin architecture — each middleware (auth, rate-limit, routing) is independently configurable per route.',
      'Used Redis for distributed rate-limiting with sliding window algorithm — accurate to 1ms resolution across horizontally scaled gateway instances.',
      'Implemented JWT verification with RS256 keys cached in memory, refreshed every 15 minutes — keeps p99 auth latency under 1ms.',
      'Added circuit-breaker pattern using the Hystrix-inspired approach: auto-opens after 5 consecutive failures, half-opens after 30 seconds.',
    ],
    impact: [
      { metric: 'Millions', label: 'Requests per day' },
      { metric: '<10ms', label: 'Gateway overhead' },
      { metric: '<1ms', label: 'JWT verification p99' },
      { metric: '99.95%', label: 'Availability achieved' },
    ],
  },
  6: {
    company: 'IIT Delhi',
    period: '2023',
    category: 'Game Development',
    accentColor: '#F5A623',
    overview: 'A fully featured 2D platformer game built in Unity with C#, featuring custom physics, character animation state machines, procedural level generation, and a global leaderboard.',
    challenge: 'Implementing smooth, responsive platformer physics from scratch in Unity without relying on the built-in physics engine — achieving the "game feel" that makes movement satisfying.',
    approach: [
      'Wrote a custom character controller in C# using raycasting for collision detection — allows precise control over coyote time, jump buffering, and wall-slide mechanics.',
      'Designed an animation state machine with 12 states (idle, run, jump, fall, land, wall-slide, etc.) using Unity\'s Animator with blended transitions.',
      'Used Unity\'s Tilemap system with a procedural generator that assembles pre-authored "chunks" to create infinite, playable levels.',
      'Integrated a scoring system with local persistence via PlayerPrefs and a REST-backed global leaderboard.',
    ],
    impact: [
      { metric: '12', label: 'Animation states' },
      { metric: 'Procedural', label: 'Level generation' },
      { metric: '60 fps', label: 'Stable frame rate' },
      { metric: 'Custom', label: 'Physics controller' },
    ],
  },
  7: {
    company: 'Personal Project',
    period: '2023',
    category: 'Distributed Systems',
    accentColor: '#00B4D8',
    overview: 'A high-throughput, fault-tolerant distributed payment processing system built in Java with Kafka and MongoDB, designed to process thousands of transactions per second with strict consistency guarantees.',
    challenge: 'Guaranteeing exactly-once payment processing in a distributed system where network partitions, duplicate messages, and partial failures are normal operating conditions.',
    approach: [
      'Implemented idempotency at every layer — each transaction carries a client-generated idempotency key stored in Redis with TTL, preventing duplicate charges.',
      'Used Kafka for the event bus with transaction log compaction — payment events are durably stored and replayable for audit and reconciliation.',
      'Applied the Saga pattern for multi-step payment flows (authorize → capture → settle) with compensating transactions on failure.',
      'MongoDB multi-document transactions ensure atomicity for balance updates across accounts — tested to withstand Jepsen-style fault injection.',
    ],
    impact: [
      { metric: '1,000+', label: 'TPS sustained' },
      { metric: 'Exactly-once', label: 'Delivery guarantee' },
      { metric: '0', label: 'Duplicate charges' },
      { metric: 'Sub-50ms', label: 'p99 latency' },
    ],
  },
  8: {
    company: 'IIT Delhi',
    period: '2023',
    category: 'Systems Programming',
    accentColor: '#F5A623',
    overview: 'A fully RFC-959-compliant FTP server written in C, supporting concurrent multi-client sessions via multi-threading, passive and active modes, user authentication, and directory traversal.',
    challenge: 'Implementing concurrent client handling in C without a runtime or framework — all thread synchronization, socket management, and error handling written from first principles.',
    approach: [
      'Used POSIX pthreads for per-client thread spawning with a thread pool to cap concurrent sessions and prevent resource exhaustion.',
      'Implemented both PORT (active) and PASV (passive) FTP modes, handling the dual-channel (control + data) nature of the FTP protocol correctly.',
      'Built a custom user authentication module with password hashing using SHA-256 and a persistent user database file.',
      'Implemented full directory listing (LIST, NLST), file transfer (RETR, STOR), and directory navigation (CWD, PWD, MKD, RMD) commands.',
    ],
    impact: [
      { metric: 'RFC-959', label: 'Full compliance' },
      { metric: 'Multi-thread', label: 'Concurrent sessions' },
      { metric: 'Active+Passive', label: 'FTP modes' },
      { metric: 'SHA-256', label: 'Password hashing' },
    ],
  },
  9: {
    company: 'IIT Delhi',
    period: '2023',
    category: 'Compiler Design',
    accentColor: '#F5A623',
    overview: 'A complete compiler for a custom imperative language, written entirely in Java, implementing all classical compiler phases: lexical analysis, parsing, semantic analysis, intermediate code generation, and optimization.',
    challenge: 'Implementing all compiler phases from scratch — no ANTLR, no LLVM — while producing correct, optimizable intermediate code and providing helpful error messages.',
    approach: [
      'Wrote a hand-coded recursive-descent parser for the language grammar, producing an Abstract Syntax Tree (AST) with precise source-location tracking for error reporting.',
      'Implemented a symbol table with nested scope support — block-scoped variables, function signatures, and type checking all resolved during the semantic analysis pass.',
      'Generated Three-Address Code (TAC) as the intermediate representation, then applied constant folding, dead code elimination, and common subexpression elimination.',
      'Produced x86-style assembly output via a simple register allocator using a linear-scan algorithm.',
    ],
    impact: [
      { metric: '4', label: 'Compiler phases' },
      { metric: '3', label: 'Optimization passes' },
      { metric: 'x86', label: 'Assembly target' },
      { metric: '100%', label: 'Hand-coded' },
    ],
  },
};

// ─── Related Projects Card ────────────────────────────────
function RelatedCard({ project }: { project: typeof projectsData[0] }) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="group block rounded-2xl overflow-hidden transition-all duration-300"
      style={{ background: 'var(--color-surface)', border: '1px solid rgba(255,255,255,0.06)' }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(0,180,216,0.25)';
        (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-4px)';
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 16px 40px rgba(0,0,0,0.4)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.06)';
        (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
      }}
    >
      <div style={{ height: 140, overflow: 'hidden', position: 'relative' }}>
        <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,20,33,0.9) 0%, transparent 60%)' }} />
      </div>
      <div className="p-4">
        <h4 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: '0.9rem', color: '#E8EAED', letterSpacing: '-0.01em', lineHeight: 1.35, marginBottom: '8px' }} className="line-clamp-2">
          {project.title}
        </h4>
        <div className="flex items-center gap-1.5" style={{ color: '#00B4D8', fontSize: '0.8rem', fontWeight: 500 }}>
          View case study <ArrowUpRight size={12} />
        </div>
      </div>
    </Link>
  );
}

// ─── ProjectDetail ────────────────────────────────────────
const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const project = projectsData.find((p) => p.id === Number(id));
  const meta = project ? projectMeta[project.id] : null;

  useEffect(() => {
    if (!project) navigate('/projects');
  }, [project, navigate]);

  const [heroRef, heroInView] = useInView<HTMLElement>({ threshold: 0.05 });
  const [bodyRef, bodyInView] = useInView<HTMLElement>({ threshold: 0.05 });
  const [relatedRef, relatedInView] = useInView<HTMLElement>({ threshold: 0.05 });

  if (!project || !meta) return null;

  const related = projectsData.filter((p) => p.id !== project.id).slice(0, 3);
  const accent = meta.accentColor;

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--color-void)' }}
    >
      <FloatingNav />
      <main className="flex-grow">

        {/* ── Hero Banner ── */}
        <section
          ref={heroRef}
          className="relative overflow-hidden"
          style={{ background: 'var(--color-ink)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
        >
          {/* Wide image */}
          <div className="relative" style={{ height: 'clamp(280px, 40vw, 480px)' }}>
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(to bottom, rgba(13,20,33,0.2) 0%, rgba(13,20,33,0.85) 70%, var(--color-ink) 100%)` }}
            />
            {/* Ambient color tint from accent */}
            <div
              className="absolute inset-0"
              style={{ background: `radial-gradient(ellipse at 30% 50%, ${accent}15 0%, transparent 60%)` }}
            />
          </div>

          {/* Content overlay */}
          <div className="container mx-auto px-4 relative" style={{ marginTop: '-6rem', paddingBottom: '3rem' }}>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={heroInView ? 'visible' : 'hidden'}
            >
              {/* Back link */}
              <motion.div variants={fadeUp}>
                <button
                  onClick={() => navigate('/projects')}
                  className="inline-flex items-center gap-2 mb-6 transition-colors duration-200"
                  style={{ color: '#8892A4', fontSize: '0.875rem' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#E8EAED'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#8892A4'; }}
                >
                  <ArrowLeft size={15} /> Back to Work
                </button>
              </motion.div>

              {/* Company + Category */}
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className="px-3 py-1 rounded-lg text-xs font-semibold"
                  style={{ background: `${accent}18`, border: `1px solid ${accent}35`, color: accent, fontFamily: 'Geist Mono, monospace' }}
                >
                  {meta.company}
                </span>
                <span
                  className="px-3 py-1 rounded-lg text-xs"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#8892A4', fontFamily: 'Geist Mono, monospace' }}
                >
                  {meta.category}
                </span>
                <span
                  style={{ color: '#8892A4', fontSize: '0.8125rem', fontFamily: 'Geist Mono, monospace' }}
                >
                  {meta.period}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={fadeUp}
                style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: '#E8EAED',
                  lineHeight: 1.15,
                  maxWidth: '800px',
                  marginBottom: '1.5rem',
                }}
              >
                {project.title}
              </motion.h1>

              {/* Tech stack chips */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: '#8892A4',
                      fontFamily: 'Geist Mono, monospace',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── Body ── */}
        <section
          ref={bodyRef}
          className="section-pad"
          style={{ background: 'var(--color-void)' }}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

              {/* ── Main Content ── */}
              <div className="lg:col-span-2 space-y-12">
                {/* Overview */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate={bodyInView ? 'visible' : 'hidden'}
                >
                  <motion.p variants={fadeUp} className="label-text mb-3">Overview</motion.p>
                  <motion.p
                    variants={fadeUp}
                    style={{
                      color: '#C8D0DC',
                      fontSize: '1.0625rem',
                      lineHeight: 1.75,
                    }}
                  >
                    {meta.overview}
                  </motion.p>
                </motion.div>

                {/* Challenge */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate={bodyInView ? 'visible' : 'hidden'}
                >
                  <motion.p variants={fadeUp} className="label-text mb-3">The Challenge</motion.p>
                  <motion.div
                    variants={fadeUp}
                    className="rounded-2xl p-6"
                    style={{ background: `${accent}08`, border: `1px solid ${accent}20` }}
                  >
                    <p style={{ color: '#C8D0DC', fontSize: '1rem', lineHeight: 1.75 }}>
                      {meta.challenge}
                    </p>
                  </motion.div>
                </motion.div>

                {/* Approach */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate={bodyInView ? 'visible' : 'hidden'}
                >
                  <motion.p variants={fadeUp} className="label-text mb-4">Engineering Approach</motion.p>
                  <div className="space-y-4">
                    {meta.approach.map((step, i) => (
                      <motion.div
                        key={i}
                        variants={fadeUp}
                        className="flex gap-4"
                      >
                        <div
                          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                          style={{ background: `${accent}18`, border: `1px solid ${accent}30`, color: accent, fontFamily: 'Geist Mono, monospace' }}
                        >
                          {i + 1}
                        </div>
                        <p style={{ color: '#C8D0DC', fontSize: '0.9375rem', lineHeight: 1.7 }}>{step}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* ── Sidebar ── */}
              <motion.div
                variants={fadeLeft}
                initial="hidden"
                animate={bodyInView ? 'visible' : 'hidden'}
                className="lg:col-span-1"
              >
                <div className="sticky top-28 space-y-5">
                  {/* Impact metrics */}
                  <div
                    className="rounded-2xl p-6"
                    style={{ background: 'var(--color-ink)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <p className="label-text mb-5">Impact</p>
                    <div className="grid grid-cols-2 gap-4">
                      {meta.impact.map(({ metric, label }) => (
                        <div key={label}>
                          <p
                            style={{
                              fontFamily: 'Geist Mono, monospace',
                              fontWeight: 700,
                              fontSize: '1.375rem',
                              color: accent,
                              letterSpacing: '-0.03em',
                              lineHeight: 1,
                              marginBottom: '4px',
                            }}
                          >
                            {metric}
                          </p>
                          <p style={{ color: '#8892A4', fontSize: '0.8rem', lineHeight: 1.4 }}>{label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div
                    className="rounded-2xl p-6"
                    style={{ background: 'var(--color-ink)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <p className="label-text mb-4">Tech Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg text-xs"
                          style={{
                            background: `${accent}0D`,
                            border: `1px solid ${accent}25`,
                            color: '#E8EAED',
                            fontFamily: 'Geist Mono, monospace',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div
                    className="rounded-2xl p-6"
                    style={{ background: 'var(--color-ink)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <p
                      style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, color: '#E8EAED', marginBottom: '8px' }}
                    >
                      Interested in this work?
                    </p>
                    <p style={{ color: '#8892A4', fontSize: '0.875rem', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                      Let's discuss how these patterns could apply to your infrastructure.
                    </p>
                    <div className="flex flex-col gap-3">
                      <MagneticButton as="a" href="/contact" variant="primary" magnetStrength={0.2}>
                        Get in Touch
                      </MagneticButton>
                      {project.projectUrl && project.projectUrl !== 'https://example.com/cloud-platform' && (
                        <MagneticButton as="a" href={project.projectUrl} target="_blank" rel="noopener noreferrer" variant="ghost" magnetStrength={0.2}>
                          Live Site <ExternalLink size={13} />
                        </MagneticButton>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Related Projects ── */}
        <section
          ref={relatedRef}
          className="section-pad"
          style={{ background: 'var(--color-ink)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="container mx-auto px-4">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={relatedInView ? 'visible' : 'hidden'}
              className="mb-10"
            >
              <motion.p variants={fadeUp} className="label-text mb-3">More Work</motion.p>
              <motion.h2 variants={fadeUp} className="section-heading">Related projects</motion.h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={relatedInView ? 'visible' : 'hidden'}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              {related.map((p, i) => (
                <motion.div key={p.id} variants={scaleIn} custom={i}>
                  <RelatedCard project={p} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={relatedInView ? 'visible' : 'hidden'}
              className="mt-10 text-center"
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                style={{ color: '#00B4D8' }}
              >
                View all projects <ArrowUpRight size={15} />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
};

export default ProjectDetail;
