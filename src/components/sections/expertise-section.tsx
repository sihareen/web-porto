import { SectionShell } from "@/components/shared/section-shell";

type CapabilityDomain = {
  category: string;
  technologies: string[];
};

const capabilities: CapabilityDomain[] = [
  {
    category: "IoT & Embedded Systems",
    technologies: ["Embedded Development", "IoT Architecture", "Edge Computing", "Real-Time Systems", "Microcontrollers"],
  },
  {
    category: "Electronic Systems",
    technologies: ["Circuit Interfacing", "Sensor Integration", "Instrumentation", "Electronic Design", "Hardware Platforms"],
  },
  {
    category: "Communication & Telemetry",
    technologies: ["MQTT", "TCP/IP", "LoRa", "Telemetry Systems", "VoIP", "Wireless Networks"],
  },
  {
    category: "Applied Artificial Intelligence",
    technologies: ["YOLOv8", "TensorFlow", "Computer Vision", "Edge AI", "Model Deployment"],
  },
  {
    category: "Engineering Tools",
    technologies: ["Python", "C/C++", "Node.js", "Laravel", "Raspberry Pi", "ESP32", "PLC", "Linux"],
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
            <h3 className="mb-4 text-xl font-bold uppercase tracking-tight text-[var(--primary)]">{domain.category}</h3>
            <p className="text-sm font-mono leading-relaxed text-[var(--accent)]">
              {domain.technologies.join(" · ")}
            </p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
