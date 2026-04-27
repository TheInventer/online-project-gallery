
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { staggerContainer, fadeUp } from '@/animations';
import { BookOpen, GraduationCap, CheckCircle2, Circle, BookMarked } from 'lucide-react';

type Status = 'read' | 'reading' | 'to-read';
type Tab = 'books' | 'courses';

interface BookItem {
  title: string;
  author: string;
  category: string;
  status: Status;
}

interface CourseItem {
  title: string;
  provider: string;
  platform: string;
  color: string;
  status: 'completed' | 'in-progress';
  year?: string;
  credentialId?: string;
}

// ─── Category colour map ──────────────────────────────────
const CAT_COLOR: Record<string, string> = {
  'AI / ML':       '#7C3AED',
  'Algorithms':    '#0078D4',
  'Android':       '#34A853',
  'Architecture':  '#00B4D8',
  'Career':        '#F5A623',
  'Coding':        '#0078D4',
  'Database':      '#7C3AED',
  'DevOps':        '#E91E8C',
  'DNS':           '#0078D4',
  'General':       '#8892A4',
  'Java':          '#FF6B35',
  'Leadership':    '#F5A623',
  'Microservices': '#00B4D8',
  'Networking':    '#34A853',
  'Observability': '#F5A623',
  'System Design': '#0078D4',
  'Testing':       '#E91E8C',
};

const STATUS_META: Record<Status, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  read:    { label: 'Read',     color: '#22c55e', icon: CheckCircle2 },
  reading: { label: 'Reading',  color: '#00B4D8', icon: BookMarked  },
  'to-read': { label: 'To Read', color: '#8892A4', icon: Circle      },
};

// ─── Books data ───────────────────────────────────────────
const books: BookItem[] = [
  // AI / ML
  { title: 'Grokking Deep Learning',                         author: 'Andrew Trask',                        category: 'AI / ML',      status: 'reading'  },
  { title: 'The Hundred-Page Machine Learning Book',         author: 'Andriy Burkov',                       category: 'AI / ML',      status: 'to-read'  },
  { title: 'Designing Machine Learning Systems',             author: 'Chip Huyen',                          category: 'AI / ML',      status: 'reading'  },
  // Algorithms
  { title: 'Grokking Algorithms',                            author: 'Aditya Bhargava',                     category: 'Algorithms',   status: 'read'     },
  { title: 'Grokking Coding Patterns',                       author: '',                                    category: 'Algorithms',   status: 'read'     },
  { title: 'Introduction to Algorithms',                     author: 'Thomas H. Cormen et al.',             category: 'Algorithms',   status: 'read'     },
  { title: 'The Algorithm Design Manual',                    author: 'Steven Skiena',                       category: 'Algorithms',   status: 'to-read'  },
  { title: 'Algorithms to Live By',                          author: 'Brian Christian & Tom Griffiths',     category: 'Algorithms',   status: 'to-read'  },
  // Android
  { title: 'Android Programming: The Big Nerd Ranch Guide',  author: 'Phillips & Stewart',                  category: 'Android',      status: 'read'     },
  // Architecture
  { title: 'Clean Architecture',                             author: 'Robert C. Martin',                    category: 'Architecture', status: 'read'     },
  { title: 'System Analysis and Design',                     author: 'Dennis, Wixom & Roth',                category: 'Architecture', status: 'read'     },
  { title: 'Software Engineering at Google',                 author: 'Winters, Manshreck & Wright',         category: 'Architecture', status: 'read'     },
  { title: 'System Analysis and Design',                     author: 'Scott Tilley',                        category: 'Architecture', status: 'to-read'  },
  { title: 'A Philosophy of Software Design',                author: 'John Ousterhout',                     category: 'Architecture', status: 'read'     },
  { title: 'Software Architecture: The Hard Parts',          author: 'Ford, Richards et al.',               category: 'Architecture', status: 'reading'  },
  { title: 'Understanding Distributed Systems',              author: 'Roberto Vitillo',                     category: 'Architecture', status: 'read'     },
  { title: 'Fundamentals of Software Architecture',          author: 'Mark Richards & Neil Ford',           category: 'Architecture', status: 'read'     },
  { title: 'Designing Distributed Systems',                  author: 'Brendan Burns',                       category: 'Architecture', status: 'read'     },
  { title: 'Domain-Driven Design',                           author: 'Eric Evans',                          category: 'Architecture', status: 'to-read'  },
  { title: 'Flow Architectures',                             author: 'James Urquhart',                      category: 'Architecture', status: 'to-read'  },
  { title: 'Beautiful Architecture',                         author: 'Spinellis & Gousios',                 category: 'Architecture', status: 'to-read'  },
  { title: 'The Software Architect Elevator',                author: 'Gregor Hohpe',                        category: 'Architecture', status: 'read'     },
  // Career
  { title: 'The First 90 Days',                              author: 'Michael Watkins',                     category: 'Career',       status: 'read'     },
  { title: 'On Writing Well',                                author: 'William Zinsser',                     category: 'Career',       status: 'to-read'  },
  { title: 'Building a Career in Software',                  author: 'Daniel Heller',                       category: 'Career',       status: 'to-read'  },
  { title: "The Staff Engineer's Path",                      author: 'Tanya Reilly',                        category: 'Career',       status: 'reading'  },
  { title: 'The Coding Career Handbook',                     author: 'swyx',                                category: 'Career',       status: 'to-read'  },
  { title: '14 Habits of Highly Productive Developers',      author: 'Zeno Rocha',                          category: 'Career',       status: 'to-read'  },
  { title: 'The Standout Developer',                         author: '',                                    category: 'Career',       status: 'to-read'  },
  { title: 'De-Coding The Technical Interview Process',      author: '',                                    category: 'Career',       status: 'to-read'  },
  { title: 'Become an Effective Software Engineering Manager', author: 'James Stanier',                     category: 'Career',       status: 'to-read'  },
  { title: 'The Art of Leadership',                          author: 'Michael Lopp',                        category: 'Career',       status: 'to-read'  },
  { title: "The Manager's Path",                             author: 'Camille Fournier',                    category: 'Career',       status: 'read'     },
  // Coding
  { title: 'Clean Code',                                     author: 'Robert C. Martin',                    category: 'Coding',       status: 'read'     },
  { title: 'Head First Design Patterns',                     author: 'Freeman et al.',                      category: 'Coding',       status: 'read'     },
  { title: 'Refactoring',                                    author: 'Martin Fowler',                       category: 'Coding',       status: 'read'     },
  { title: 'Cracking the Coding Interview',                  author: 'Gayle L. McDowell',                   category: 'Coding',       status: 'read'     },
  { title: 'Design Patterns: Elements of Reusable OO Software', author: 'Gamma, Helm, Johnson & Vlissides', category: 'Coding',      status: 'read'     },
  { title: 'Working Effectively with Legacy Code',           author: 'Michael C. Feathers',                 category: 'Coding',       status: 'to-read'  },
  // Database
  { title: 'Database Internals',                             author: 'Alex Petrov',                         category: 'Database',     status: 'read'     },
  { title: 'Understanding Database Systems',                 author: '',                                    category: 'Database',     status: 'to-read'  },
  // DevOps
  { title: 'Continuous Delivery',                            author: 'Jez Humble & David Farley',           category: 'DevOps',       status: 'read'     },
  { title: 'Accelerate',                                     author: 'Forsgren, Humble & Kim',              category: 'DevOps',       status: 'read'     },
  { title: 'Rapid Development',                              author: 'Steve McConnell',                     category: 'DevOps',       status: 'to-read'  },
  { title: "The Web Application Hacker's Handbook",          author: 'Stuttard & Pinto',                    category: 'DevOps',       status: 'to-read'  },
  { title: 'The DevOps Handbook',                            author: 'Kim, Humble, Debois & Willis',        category: 'DevOps',       status: 'read'     },
  { title: 'Pro Git',                                        author: 'Scott Chacon & Ben Straub',           category: 'DevOps',       status: 'read'     },
  // DNS
  { title: 'DNS and BIND',                                   author: 'Cricket Liu & Paul Albitz',           category: 'DNS',          status: 'read'     },
  { title: 'Pro DNS and BIND 10',                            author: 'Ron Aitchison',                       category: 'DNS',          status: 'read'     },
  { title: 'DNS Security: Defending the Domain Name System', author: '',                                    category: 'DNS',          status: 'read'     },
  { title: 'DNS in Action',                                  author: 'Kabelová & Dostálek',                 category: 'DNS',          status: 'read'     },
  { title: 'The Domain Name Handbook',                       author: 'Ellen Rony & Peter Rony',             category: 'DNS',          status: 'to-read'  },
  { title: 'DNS for Dummies',                                author: '',                                    category: 'DNS',          status: 'read'     },
  { title: 'The Concise Guide to DNS and BIND',              author: 'Nicolai Langfeldt',                   category: 'DNS',          status: 'read'     },
  { title: 'DNS Security Management',                        author: '',                                    category: 'DNS',          status: 'read'     },
  { title: 'The Hidden Potential of DNS in Security',        author: '',                                    category: 'DNS',          status: 'to-read'  },
  { title: 'Managing Mission-Critical Domains and DNS',      author: '',                                    category: 'DNS',          status: 'to-read'  },
  { title: 'RFC 3833 — DNS Threat Model Analysis',           author: 'IETF',                                category: 'DNS',          status: 'read'     },
  // General
  { title: 'The Pragmatic Programmer',                       author: 'David Thomas & Andrew Hunt',          category: 'General',      status: 'read'     },
  { title: 'Code Complete',                                  author: 'Steve McConnell',                     category: 'General',      status: 'read'     },
  { title: 'Code: The Hidden Language of Computer Hardware', author: 'Charles Petzold',                     category: 'General',      status: 'read'     },
  { title: 'The Mythical Man-Month',                         author: 'Frederick Brooks',                    category: 'General',      status: 'read'     },
  { title: 'The Passionate Programmer',                      author: 'Chad Fowler',                         category: 'General',      status: 'to-read'  },
  { title: "Explain the Cloud Like I'm 10",                  author: 'Todd Hoff',                           category: 'General',      status: 'read'     },
  // Java
  { title: 'Modern Java in Action',                          author: 'Urma, Fusco & Mycroft',               category: 'Java',         status: 'read'     },
  { title: 'Java Performance',                               author: 'Scott Oaks',                          category: 'Java',         status: 'read'     },
  { title: 'JVM Performance Engineering',                    author: '',                                    category: 'Java',         status: 'to-read'  },
  { title: 'Effective Java',                                 author: 'Joshua Bloch',                        category: 'Java',         status: 'read'     },
  { title: 'Concurrent Programming in Java',                 author: 'Doug Lea',                            category: 'Java',         status: 'read'     },
  { title: 'Java Concurrency in Practice',                   author: 'Brian Goetz et al.',                  category: 'Java',         status: 'read'     },
  { title: 'Art of Java',                                    author: '',                                    category: 'Java',         status: 'to-read'  },
  { title: 'Head First Java',                                author: 'Sierra & Bates',                      category: 'Java',         status: 'read'     },
  // Leadership
  { title: 'Staff Engineer: Leadership Beyond the Management Track', author: 'Will Larson',                 category: 'Leadership',   status: 'read'     },
  { title: 'An Elegant Puzzle: Systems of Engineering Management', author: 'Will Larson',                  category: 'Leadership',   status: 'read'     },
  { title: 'Team Topologies',                                author: 'Skelton & Pais',                      category: 'Leadership',   status: 'read'     },
  { title: 'Good Strategy / Bad Strategy',                   author: 'Richard Rumelt',                      category: 'Leadership',   status: 'to-read'  },
  { title: 'The Phoenix Project',                            author: 'Kim, Behr & Spafford',                category: 'Leadership',   status: 'read'     },
  { title: 'The New One Minute Manager',                     author: 'Blanchard & Johnson',                 category: 'Leadership',   status: 'read'     },
  { title: 'The Effective Engineer',                         author: 'Edmond Lau',                          category: 'Leadership',   status: 'read'     },
  { title: 'Managing Humans',                                author: 'Michael Lopp',                        category: 'Leadership',   status: 'to-read'  },
  { title: 'Crucial Conversations',                          author: 'Patterson et al.',                    category: 'Leadership',   status: 'to-read'  },
  { title: 'The Five Dysfunctions of a Team',                author: 'Patrick Lencioni',                    category: 'Leadership',   status: 'to-read'  },
  { title: 'Drive',                                          author: 'Daniel Pink',                         category: 'Leadership',   status: 'to-read'  },
  { title: 'The Making of a Manager',                        author: 'Julie Zhuo',                          category: 'Leadership',   status: 'to-read'  },
  { title: 'Peopleware: Productive Projects and Teams',      author: 'DeMarco & Lister',                    category: 'Leadership',   status: 'read'     },
  // Microservices
  { title: 'Microservices Patterns',                         author: 'Chris Richardson',                    category: 'Microservices',status: 'read'     },
  { title: 'Building Microservices',                         author: 'Sam Newman',                          category: 'Microservices',status: 'read'     },
  { title: 'Microservice Architecture',                      author: 'Nadareishvili, Mitra, McLarty & Amundsen', category: 'Microservices', status: 'to-read' },
  // Networking
  { title: 'Computer Networks',                              author: 'Tanenbaum & Wetherall',               category: 'Networking',   status: 'read'     },
  { title: 'Computer Networks: A Top-Down Approach',         author: 'Kurose & Ross',                       category: 'Networking',   status: 'read'     },
  { title: 'Network Warriors',                               author: 'Gary A. Donahue',                     category: 'Networking',   status: 'read'     },
  { title: 'Routing TCP/IP, Volume I & II',                  author: 'Jeff Doyle',                          category: 'Networking',   status: 'read'     },
  { title: 'Network Programmability and Automation',         author: 'Edelman, Lowe & Oswalt',              category: 'Networking',   status: 'to-read'  },
  { title: 'Cloud Native Networking',                        author: '',                                    category: 'Networking',   status: 'to-read'  },
  { title: 'Cloud Networking',                               author: '',                                    category: 'Networking',   status: 'to-read'  },
  { title: 'Zero Trust Networks',                            author: 'Gilman & Barth',                      category: 'Networking',   status: 'to-read'  },
  // Observability
  { title: 'End-to-End Observability with Grafana',          author: '',                                    category: 'Observability',status: 'read'     },
  { title: 'Grafana 7.0',                                    author: '',                                    category: 'Observability',status: 'read'     },
  { title: 'Observability Engineering',                      author: 'Majors, Fong-Jones & Miranda',        category: 'Observability',status: 'reading'  },
  { title: 'Google SRE Monitoring',                          author: 'Google SRE Team',                     category: 'Observability',status: 'read'     },
  { title: 'Cloud Observability in Action',                  author: '',                                    category: 'Observability',status: 'to-read'  },
  { title: 'Logging in Action',                              author: '',                                    category: 'Observability',status: 'to-read'  },
  { title: 'Learning OpenTelemetry',                         author: '',                                    category: 'Observability',status: 'to-read'  },
  // System Design
  { title: 'Designing Data-Intensive Applications',          author: 'Martin Kleppmann',                    category: 'System Design',status: 'read'     },
  { title: 'System Design Interview Vol. 1',                 author: 'Alex Xu',                             category: 'System Design',status: 'read'     },
  { title: 'System Design Interview Vol. 2',                 author: 'Alex Xu',                             category: 'System Design',status: 'read'     },
  // Testing
  { title: 'TDD by Example',                                 author: 'Kent Beck',                           category: 'Testing',      status: 'to-read'  },
  { title: 'Unit Testing: Principles, Practices, and Patterns', author: 'Vladimir Khorikov',               category: 'Testing',      status: 'to-read'  },
  { title: 'The Art of Unit Testing',                        author: 'Roy Osherove',                        category: 'Testing',      status: 'to-read'  },
];

const courses: CourseItem[] = [
  // UT Austin M.S. Coursework
  { title: 'Advances in Deep Learning',        provider: 'University of Texas, Austin', platform: 'M.S. Coursework', color: '#BF5700', status: 'completed', year: 'Aug 2025' },
  { title: 'Android Programming',              provider: 'University of Texas, Austin', platform: 'M.S. Coursework', color: '#BF5700', status: 'completed', year: 'May 2025' },
  { title: 'Deep Learning',                    provider: 'University of Texas, Austin', platform: 'M.S. Coursework', color: '#BF5700', status: 'completed', year: 'May 2025' },
  { title: 'Virtualization',                   provider: 'University of Texas, Austin', platform: 'M.S. Coursework', color: '#BF5700', status: 'completed', year: 'Dec 2024' },
  { title: 'Machine Learning',                 provider: 'University of Texas, Austin', platform: 'M.S. Coursework', color: '#BF5700', status: 'completed', year: 'Dec 2024' },
  { title: 'Planning',                         provider: 'University of Texas, Austin', platform: 'M.S. Coursework', color: '#BF5700', status: 'completed', year: '2024' },
  { title: 'Research under Uncertainty',       provider: 'University of Texas, Austin', platform: 'M.S. Coursework', color: '#BF5700', status: 'completed', year: '2024' },
  { title: 'Online Learning and Optimization', provider: 'University of Texas, Austin', platform: 'M.S. Coursework', color: '#BF5700', status: 'completed', year: '2024' },
  { title: 'Advanced OS',                      provider: 'University of Texas, Austin', platform: 'M.S. Coursework', color: '#BF5700', status: 'completed', year: '2024' },
  { title: 'Reinforcement Learning',           provider: 'University of Texas, Austin', platform: 'M.S. Coursework', color: '#BF5700', status: 'completed', year: '2024' },
  // Udemy
  { title: 'Ask Better Questions',                      provider: 'Udemy', platform: 'Online Course', color: '#A435F0', status: 'completed', year: 'Dec 2025' },
  { title: 'Master Strategic Thinking',                 provider: 'Udemy', platform: 'Online Course', color: '#A435F0', status: 'completed', year: 'Dec 2025' },
  { title: 'Leadership: Practical Leadership Skills',   provider: 'Udemy', platform: 'Online Course', color: '#A435F0', status: 'completed', year: 'Aug 2025' },
  { title: 'Redis Bootcamp for Beginners',              provider: 'Udemy', platform: 'Online Course', color: '#A435F0', status: 'completed', year: 'Aug 2021' },
  { title: 'AZ-900: Microsoft Azure Fundamentals Prep', provider: 'Udemy', platform: 'Online Course', color: '#A435F0', status: 'completed', year: 'Jan 2024' },
  // Microsoft Certification
  { title: 'Microsoft Certified: Azure Fundamentals', provider: 'Microsoft', platform: 'Certification', color: '#0078D4', status: 'completed', year: 'Jan 2024', credentialId: '2E5F32308876A082' },
  // IIT Delhi M.Tech Coursework
  { title: 'Advanced Data Structures',    provider: 'IIT Delhi', platform: 'M.Tech Coursework', color: '#F5A623', status: 'completed', year: '2023' },
  { title: 'Software System Laboratory', provider: 'IIT Delhi', platform: 'M.Tech Coursework', color: '#F5A623', status: 'completed', year: '2023' },
];

const ALL_CATEGORIES = ['All', ...Object.keys(CAT_COLOR).sort()];
const ALL_STATUSES: Array<{ key: Status | 'all'; label: string }> = [
  { key: 'all',     label: 'All'     },
  { key: 'read',    label: 'Read'    },
  { key: 'reading', label: 'Reading' },
  { key: 'to-read', label: 'To Read' },
];

// ─── Book Row ─────────────────────────────────────────────
function BookRow({ book, index }: { book: BookItem; index: number }) {
  const meta = STATUS_META[book.status];
  const Icon = meta.icon;
  const catColor = CAT_COLOR[book.category] ?? '#8892A4';

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: Math.min(index * 0.015, 0.4), duration: 0.35 }}
      className="flex items-start gap-3 py-3 group"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
    >
      <Icon size={14} className="flex-shrink-0 mt-0.5" style={{ color: meta.color }} />

      <div className="flex-1 min-w-0">
        <p
          className="truncate"
          style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontWeight: 600,
            fontSize: '0.875rem',
            color: '#E8EAED',
            lineHeight: 1.3,
          }}
          title={book.title}
        >
          {book.title}
        </p>
        {book.author && (
          <p style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.7rem', color: '#8892A4', marginTop: '2px' }}>
            {book.author}
          </p>
        )}
      </div>

      <span
        className="flex-shrink-0 px-2 py-0.5 rounded-md text-xs hidden sm:block"
        style={{
          background: `${catColor}12`,
          border: `1px solid ${catColor}25`,
          color: catColor,
          fontFamily: 'Geist Mono, monospace',
          fontSize: '0.65rem',
          whiteSpace: 'nowrap',
        }}
      >
        {book.category}
      </span>
    </motion.div>
  );
}

// ─── Course Card ──────────────────────────────────────────
function CourseCard({ course }: { course: CourseItem }) {
  return (
    <div
      className="group relative rounded-2xl overflow-hidden transition-all duration-300 p-5"
      style={{ background: 'var(--color-ink)', border: '1px solid rgba(255,255,255,0.06)' }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = `${course.color}40`;
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 40px rgba(0,0,0,0.35)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${course.color}80, transparent)` }} />
      <div className="flex items-start justify-between mb-4">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${course.color}15`, border: `1px solid ${course.color}25` }}>
          <GraduationCap size={16} style={{ color: course.color }} />
        </div>
        <span
          className="px-2 py-0.5 rounded-full text-xs font-medium"
          style={{
            background: 'rgba(34,197,94,0.1)',
            border: '1px solid rgba(34,197,94,0.25)',
            color: '#22c55e',
            fontFamily: 'Geist Mono, monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          Completed
        </span>
      </div>
      <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: '0.9375rem', color: '#E8EAED', lineHeight: 1.35, marginBottom: '6px' }}>
        {course.title}
      </p>
      <p style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.75rem', color: course.color, marginBottom: '3px' }}>{course.provider}</p>
      <p style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.7rem', color: '#8892A4' }}>
        {course.platform}{course.year && ` · ${course.year}`}
      </p>
      {course.credentialId && (
        <p style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.65rem', color: '#8892A4', marginTop: '6px', opacity: 0.7 }}>
          ID: {course.credentialId}
        </p>
      )}
    </div>
  );
}

// ─── LearningShelf ────────────────────────────────────────
export default function LearningShelf() {
  const [activeTab, setActiveTab] = useState<Tab>('books');
  const [selectedCat, setSelectedCat] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState<Status | 'all'>('all');
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.05 });

  const filtered = useMemo(() => {
    return books.filter((b) => {
      const catMatch = selectedCat === 'All' || b.category === selectedCat;
      const statusMatch = selectedStatus === 'all' || b.status === selectedStatus;
      return catMatch && statusMatch;
    });
  }, [selectedCat, selectedStatus]);

  const counts = useMemo(() => ({
    read:    books.filter((b) => b.status === 'read').length,
    reading: books.filter((b) => b.status === 'reading').length,
    'to-read': books.filter((b) => b.status === 'to-read').length,
  }), []);

  return (
    <section
      ref={ref}
      className="section-pad relative"
      style={{ background: 'var(--color-void)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="mb-10">
          <motion.p variants={fadeUp} className="label-text mb-3">Continuous Learning</motion.p>
          <motion.h2 variants={fadeUp} className="section-heading" style={{ marginBottom: '0.75rem' }}>
            Books & courses that <span className="text-gradient-azure">shaped my thinking</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-3">
            {[
              { label: `${counts.read} Read`,    color: '#22c55e' },
              { label: `${counts.reading} Reading`, color: '#00B4D8' },
              { label: `${counts['to-read']} To Read`, color: '#8892A4' },
            ].map(({ label, color }) => (
              <span key={label} style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.75rem', color }}>
                {label}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Main tabs: Books / Courses */}
        <div
          className="flex gap-2 mb-6 p-1 rounded-xl w-fit"
          style={{ background: 'var(--color-ink)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          {([['books', BookOpen, books.length], ['courses', GraduationCap, courses.length]] as const).map(([key, Icon, count]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                background: activeTab === key ? 'rgba(0,120,212,0.15)' : 'transparent',
                color: activeTab === key ? '#00B4D8' : '#8892A4',
                border: activeTab === key ? '1px solid rgba(0,180,216,0.3)' : '1px solid transparent',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}
            >
              <Icon size={14} />
              {key.charAt(0).toUpperCase() + key.slice(1)}
              <span
                className="px-1.5 py-0.5 rounded-md"
                style={{
                  background: activeTab === key ? 'rgba(0,180,216,0.15)' : 'rgba(255,255,255,0.06)',
                  fontFamily: 'Geist Mono, monospace',
                  fontSize: '0.7rem',
                  color: activeTab === key ? '#00B4D8' : '#8892A4',
                }}
              >
                {count}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'books' ? (
            <motion.div key="books" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {/* Status filter */}
              <div className="flex flex-wrap gap-2 mb-4">
                {ALL_STATUSES.map(({ key, label }) => {
                  const active = selectedStatus === key;
                  const color = key === 'all' ? '#8892A4' : STATUS_META[key as Status].color;
                  const cnt = key === 'all' ? books.length : counts[key as Status];
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedStatus(key)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                      style={{
                        background: active ? `${color}15` : 'rgba(255,255,255,0.03)',
                        border: active ? `1px solid ${color}40` : '1px solid rgba(255,255,255,0.07)',
                        color: active ? color : '#8892A4',
                        fontFamily: 'Geist Mono, monospace',
                      }}
                    >
                      {key !== 'all' && (() => { const I = STATUS_META[key as Status].icon; return <I size={11} />; })()}
                      {label}
                      <span style={{ opacity: 0.7 }}>({cnt})</span>
                    </button>
                  );
                })}
              </div>

              {/* Category filter — horizontally scrollable */}
              <div className="overflow-x-auto pb-2 mb-6" style={{ scrollbarWidth: 'none' }}>
                <div className="flex gap-2" style={{ width: 'max-content' }}>
                  {ALL_CATEGORIES.map((cat) => {
                    const active = selectedCat === cat;
                    const color = cat === 'All' ? '#8892A4' : (CAT_COLOR[cat] ?? '#8892A4');
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCat(cat)}
                        className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap"
                        style={{
                          background: active ? `${color}18` : 'rgba(255,255,255,0.03)',
                          border: active ? `1px solid ${color}45` : '1px solid rgba(255,255,255,0.07)',
                          color: active ? color : '#8892A4',
                          fontFamily: 'Geist Mono, monospace',
                        }}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Results count */}
              <p style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.75rem', color: '#8892A4', marginBottom: '0.75rem' }}>
                {filtered.length} book{filtered.length !== 1 ? 's' : ''}
                {selectedCat !== 'All' && <> · <span style={{ color: CAT_COLOR[selectedCat] }}>{selectedCat}</span></>}
              </p>

              {/* Book list */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{ background: 'var(--color-ink)', border: '1px solid rgba(255,255,255,0.06)', padding: '0 1.25rem' }}
              >
                {filtered.length > 0
                  ? filtered.map((book, i) => <BookRow key={`${book.title}-${i}`} book={book} index={i} />)
                  : (
                    <div className="py-16 text-center">
                      <p style={{ color: '#8892A4', fontFamily: 'Geist Mono, monospace', fontSize: '0.875rem' }}>
                        No books match that filter.
                      </p>
                    </div>
                  )
                }
              </div>
            </motion.div>
          ) : (
            <motion.div key="courses" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map((course) => <CourseCard key={course.title} course={course} />)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-10 text-center"
          style={{ color: '#8892A4', fontSize: '0.8125rem', fontFamily: 'Geist Mono, monospace' }}
        >
          Always reading · Always building · Always learning
        </motion.p>
      </div>
    </section>
  );
}
