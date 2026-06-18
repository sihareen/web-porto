import { SectionShell } from "@/components/shared/section-shell";

type ExpertiseItem = {
  title: string;
  description: string;
  tags: string[];
};

const expertiseItems: ExpertiseItem[] = [
  {
    title: "Reliability before novelty",
    description:
      "Field systems must keep measuring, transmitting, and recovering under imperfect power, weather, and network conditions.",
    tags: ["Telemetry", "Device health", "Maintainability"],
  },
  {
    title: "Field conditions shape design",
    description:
      "Hardware, enclosures, firmware, and dashboards are designed around deployment realities, not ideal lab assumptions.",
    tags: ["Sensors", "Enclosures", "Firmware"],
  },
  {
    title: "Data must serve decisions",
    description:
      "Classification, visualization, and alerts matter when they help researchers, operators, or communities act sooner.",
    tags: ["AI", "Dashboards", "Alerts"],
  },
  {
    title: "Technology belongs near people and nature",
    description:
      "Engineering should respect the landscapes and people it serves: coastlines, rivers, field teams, and local context.",
    tags: ["Research", "Deployment", "Resilience"],
  },
];

export function ExpertiseSection() {
  return (
    <SectionShell id="skills" title="Principles" intro="A quiet engineering practice guided by field reliability, decision usefulness, and environmental context.">
      <div className="grid gap-x-10 gap-y-12 md:grid-cols-2">
        {expertiseItems.map((item) => (
          <article
            key={item.title}
            className="group border-t border-[var(--line)] pt-6 transition duration-300 hover:-translate-y-1"
          >
            <h3 className="font-[family-name:var(--font-heading)] text-3xl leading-tight text-[var(--text)]">
              {item.title}
            </h3>
            <p className="mt-4 text-base leading-8 text-[var(--muted)]">{item.description}</p>
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
              {item.tags.map((tag) => (
                <li
                  key={`${item.title}-${tag}`}
                  className="text-[11px] uppercase tracking-[0.16em] text-[var(--accent)]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
