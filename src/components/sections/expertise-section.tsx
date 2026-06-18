import { SectionShell } from "@/components/shared/section-shell";

type CapabilityDomain = {
  category: string;
  technologies: string[];
};

const capabilities: CapabilityDomain[] = [
  {
    category: "Systems Engineering",
    technologies: ["Embedded Systems", "IoT Architecture", "Edge Computing", "Real-Time Systems"],
  },
  {
    category: "Software Development",
    technologies: ["Python", "C/C++", "Node.js", "Laravel", "Backend Systems"],
  },
  {
    category: "Communication Protocols",
    technologies: ["MQTT", "TCP/IP", "LoRa", "Telemetry", "VoIP", "Network Engineering"],
  },
  {
    category: "Artificial Intelligence",
    technologies: ["YOLOv8", "TensorFlow", "Computer Vision", "Edge AI", "Model Deployment"],
  },
  {
    category: "Hardware Platforms",
    technologies: ["Raspberry Pi", "ESP32", "Single Board Computers", "PLC", "Linux", "Microcontrollers"],
  },
];

export function ExpertiseSection() {
  return (
    <SectionShell id="skills" sectionNumber="04" title="Expertise">
      <div className="mx-auto max-w-[900px] space-y-3">
        {capabilities.map((domain) => (
          <div
            key={domain.category}
            className="engineering-card p-7"
          >
            <h3 className="mb-4 text-xl font-bold uppercase tracking-tight text-[var(--text-primary)]">{domain.category}</h3>
            <p className="text-sm font-mono leading-relaxed text-[var(--text-secondary)]">
              {domain.technologies.join(" · ")}
            </p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
