
import { Project } from '../components/ProjectCard';

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Cloud Infrastructure Platform",
    description: "Developed a scalable cloud infrastructure platform that automates provisioning, deployment, and management of containerized applications across multiple cloud providers.",
    imageUrl: "https://images.unsplash.com/photo-1560732488-6b0df240254a?auto=format&fit=crop&w=800&q=80",
    projectUrl: "https://example.com/cloud-platform",
    tags: ["AWS", "Kubernetes", "Terraform", "Docker", "TypeScript"]
  },
  {
    id: 2,
    title: "Developer Productivity Toolkit",
    description: "Built an internal toolkit that improved developer workflow and reduced deployment time by 40%, featuring CI/CD pipeline integration and automated testing.",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    projectUrl: "https://example.com/dev-toolkit",
    tags: ["Node.js", "React", "GraphQL", "CI/CD", "Jest"]
  },
  {
    id: 3,
    title: "Distributed Payment System",
    description: "Designed and implemented a high-throughput payment processing system capable of handling thousands of transactions per second with fault tolerance and data consistency.",
    imageUrl: "https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?auto=format&fit=crop&w=800&q=80",
    projectUrl: "https://example.com/payment-system",
    tags: ["Java", "Microservices", "Kafka", "Redis", "MongoDB"]
  },
  {
    id: 4,
    title: "Real-time Analytics Dashboard",
    description: "Created a real-time data visualization dashboard that processes and displays key metrics from multiple data sources, enabling quick business decisions.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    projectUrl: "https://example.com/analytics-dashboard",
    tags: ["React", "D3.js", "Node.js", "WebSockets", "BigQuery"]
  },
  {
    id: 5,
    title: "API Gateway Service",
    description: "Built a centralized API gateway that handles authentication, rate limiting, and request routing for a microservices architecture serving millions of requests per day.",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    projectUrl: "https://example.com/api-gateway",
    tags: ["Node.js", "Express", "Redis", "JWT", "Load Balancing"]
  },
  {
    id: 6,
    title: "E-commerce Platform",
    description: "Developed a scalable e-commerce platform with inventory management, payment processing, and real-time order tracking for a large retail client.",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80",
    projectUrl: "https://example.com/ecommerce",
    tags: ["React", "Node.js", "PostgreSQL", "Redux", "Stripe API"]
  }
];
