export type ProjectItem = {
  title: string;
  description: string;
  techStack: string[];
  externalUrl: string;
  coverImages: string[];
  labels: Array<"IoT" | "AI" | "Data">;
};

export const heroContent = {
  headline: "Muhammad Rizkan Harin Faza",
  subtitle:
    "Building resilient technology for environmental monitoring and disaster mitigation.",
  ctaLabel: "View Selected Work",
  ctaTarget: "#projects",
};

export const aboutContent = {
  summary:
    "I design and build embedded intelligence for places where failure matters: coastlines, rivers, field stations, and distributed monitoring networks.",
};

export const projects: ProjectItem[] = [
  {
    title: "PUMMA U-TEWS",
    description:
      "Real-time sea level monitoring unit for tsunami early warning integration in high-risk coastal zones.",
    techStack: ["Embedded C", "Sensor Systems", "Telemetry"],
    externalUrl: "https://github.com/sihareen",
    coverImages: ["/project-covers/pumma-utews.jpg", "/project-covers/buoy-utews.jpg"],
    labels: ["IoT", "Data"],
  },
  {
    title: "Environmental Monitoring Systems",
    description:
      "Field monitoring and visualization systems for climate, microclimate, and environmental decision support.",
    techStack: ["Sensors", "Dashboard", "Data Pipeline"],
    externalUrl: "https://github.com/sihareen",
    coverImages: ["/project-covers/microclimate.jpg", "/project-covers/microclimate-dashboard.png"],
    labels: ["IoT", "Data"],
  },
  {
    title: "Flood Early Warning Systems",
    description:
      "River and rainfall monitoring architecture for community-scale disaster preparedness and alerting.",
    techStack: ["LoRa", "IoT", "Telemetry"],
    externalUrl: "https://github.com/sihareen",
    coverImages: ["/project-covers/ews-indomaker.jpg", "/project-covers/eddy-station.jpg"],
    labels: ["IoT"],
  },
  {
    title: "AI Classification Systems",
    description:
      "Applied machine learning systems for environmental and signal classification across edge and server workflows.",
    techStack: ["Python", "TensorFlow", "Edge AI"],
    externalUrl: "https://github.com/sihareen",
    coverImages: ["/project-covers/ai-rtka.jpg", "/project-covers/ai-lemon.jpg"],
    labels: ["AI", "Data"],
  },
];

export const techStack = [
  "C/C++",
  "Python",
  "Node.js",
  "Laravel",
  "PostgreSQL",
  "LoRa",
  "MQTT",
  "TensorFlow",
  "Docker",
];

export const contactContent = {
  email: "muhamadrizkanharinfaza@gmail.com",
  linkedin: "https://www.linkedin.com/in/muhammad-rizkan-harin-faza/",
  github: "https://github.com/sihareen",
};
