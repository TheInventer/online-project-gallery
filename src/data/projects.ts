
import { Project } from '../components/ProjectCard';

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Cosmic — Containerized Cloud Infrastructure Platform",
    description: "Scalable containerized cloud infrastructure platform that automates provisioning, deployment, and management of containerized applications across 5,000 Kubernetes clusters, each with 500 nodes — 2.5M managed nodes at peak scale.",
    imageUrl: "https://images.unsplash.com/photo-1667372459470-5f61c93c6d3f?auto=format&fit=crop&w=800&q=80",
    projectUrl: "https://example.com/cloud-platform",
    tags: ["Microsoft", "Azure", "Kubernetes", "Kubernetes Agents", "Docker", "Golang", "SDN", "Grafana", "Azure Log Analytics"]
  },
  {
    id: 2,
    title: "Azure Sovereign Clouds — France, Germany & Singapore",
    description: "Built entire Azure Sovereign Cloud infrastructure for three nations from scratch — thousands of servers, full networking, and 20+ DNS services handling 900B+ DNS queries per day at peak.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    projectUrl: "https://example.com/dev-toolkit",
    tags: ["Microsoft", "DNS Services", "Azure DNS", ".Net Core", "Cosmos DB", "Buildout Orchestration", "Kubernetes", "Scalable Architecture"]
  },
  {
    id: 3,
    title: "Azure DNS — 900B Queries/day at Sovereign Scale",
    description: "Designed and operated 20+ Azure DNS services as core infrastructure for France, Germany, and Singapore sovereign clouds — processing over 900 billion DNS queries per day with five-nines availability.",
    imageUrl: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&q=80",
    projectUrl: "https://example.com/azure-dns",
    tags: ["Microsoft", "DNS", "Azure", ".NET Core", "High Availability", "Sovereign Cloud", "Distributed Systems"]
  },
  {
    id: 4,
    title: "Google Cloud Infrastructure",
    description: "Building next-generation scalable cloud infrastructure at Google as Staff Software Engineer, applying distributed systems expertise to Google-scale problems in cloud computing and infrastructure reliability.",
    imageUrl: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=800&q=80",
    projectUrl: "https://example.com/google-cloud",
    tags: ["Google", "Google Cloud", "Cloud Infrastructure", "Distributed Systems", "Scalability", "Site Reliability"]
  },
  {
    id: 5,
    title: "Events Android App",
    description: "Social event discovery platform helping users find and participate in local events with real-time updates, event recommendations, push notifications, and profile management. Built as part of M.S. coursework at UT Austin.",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    projectUrl: "https://example.com/payment-system",
    tags: ["UT Austin", "Java", "Android", "Firebase", "Google Maps API", "Firebase Cloud Messaging", "Event Discovery"]
  },
  {
    id: 6,
    title: "Cosmic — Real-time Analytics Dashboard",
    description: "Real-time data visualization dashboard that processes and displays key metrics from 5,000+ Kubernetes clusters, enabling instant operational decisions across Microsoft's containerized cloud infrastructure.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    projectUrl: "https://example.com/analytics-dashboard",
    tags: ["Microsoft", "Grafana", "Azure Log Analytics", "Kubernetes", "Data Visualization", "Real-time Analytics"]
  },
  {
    id: 7,
    title: "2D Game in Unity",
    description: "2D platformer game developed in Unity featuring engaging gameplay mechanics, character animations, physics-based movement, and a progressive scoring system. Built during M.Tech coursework.",
    imageUrl: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=800&q=80",
    projectUrl: "https://example.com/ecommerce",
    tags: ["IIT Delhi", "Unity", "C#", "Game Development", "2D Graphics", "Physics Engine", "Animation"]
  },
  {
    id: 8,
    title: "Distributed Payment System",
    description: "High-throughput payment processing system capable of handling thousands of transactions per second with fault tolerance, distributed consensus, and strong data consistency guarantees.",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80",
    projectUrl: "https://example.com/payment-system",
    tags: ["NIT Kurukshetra", "Java", "Microservices", "Kafka", "Redis", "MongoDB", "Distributed Systems"]
  },
  {
    id: 9,
    title: "FTP Server from Scratch",
    description: "Full-featured FTP server implementing the RFC 959 protocol with file transfer, user authentication, passive/active mode support, and multi-threaded directory management for concurrent clients.",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    projectUrl: "https://example.com/ecommerce",
    tags: ["IIT Delhi", "C", "Socket Programming", "FTP Protocol", "Multi-threading", "File Systems"]
  },
  {
    id: 10,
    title: "Compiler in Java",
    description: "Full compiler pipeline from lexical analysis through code generation — tokenizer, recursive descent parser, semantic analyzer, and bytecode emitter targeting a custom instruction set. Built for the Compilers course.",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    projectUrl: "https://example.com/ecommerce",
    tags: ["IIT Delhi", "Java", "Compiler Design", "Lexical Analysis", "Syntax Analysis", "Code Generation"]
  },
];
