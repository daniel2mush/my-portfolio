import { Image as ImageIcon } from "lucide-react";

//
interface Projects {
  name: string;
  description: string;
  imageIcon: string | React.ReactNode;
  gitHubLink: string;
  websiteLink: string;
  tools: string[];
}

export const myRecentProject: Projects[] = [
  {
    name: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.",
    gitHubLink: "",
    websiteLink: "",
    imageIcon: <ImageIcon size={60} strokeWidth={1} />,
    tools: [" React", "Node.js", "PostgreSQL", "Stripe"],
  },
  {
    name: "Task Management App",
    description:
      "A collaborative project management tool with real-time updates, file sharing, and team communication.",
    gitHubLink: "",
    websiteLink: "",
    imageIcon: <ImageIcon size={60} strokeWidth={1} />,
    tools: ["   Vue.js", "Express", "Socket.io", "MongoDB"],
  },
  {
    name: "Analytics Dashboard",
    description:
      "A comprehensive analytics platform with interactive charts, real-time data, and custom reporting.",
    gitHubLink: "",
    websiteLink: "",
    imageIcon: <ImageIcon size={60} strokeWidth={1} />,
    tools: ["React", "D3.js", "Python", "Redis"],
  },
  {
    name: "Social Media App",
    description:
      "A modern social platform with real-time messaging, content sharing, and advanced privacy controls.",
    gitHubLink: "",
    websiteLink: "",
    imageIcon: <ImageIcon size={60} strokeWidth={1} />,
    tools: ["Next.js", "GraphQL", "Prisma", "AWS"],
  },
];
