import Image from "next/image";

import { SectionShell } from "@/components/shared/section-shell";

const galleryImages = [
  {
    src: "/project-covers/pumma-utews.jpg",
    alt: "PUMMA underwater monitoring system hardware",
    caption: "Underwater monitoring system, pre-deployment documentation.",
    className: "md:col-span-7",
    aspect: "aspect-[5/4]",
  },
  {
    src: "/project-covers/IMG-20240701-WA0034.jpg",
    alt: "Sensor installation in field context",
    caption: "Sensor installation and field operation check.",
    className: "md:col-span-5",
    aspect: "aspect-[4/5]",
  },
  {
    src: "/project-covers/pcb-rtka.jpg",
    alt: "Embedded electronics assembly",
    caption: "Hardware assembly and embedded platform validation.",
    className: "md:col-span-4",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/project-covers/ews-indomaker.jpg",
    alt: "Early warning system deployment",
    caption: "Early warning prototype prepared for operational testing.",
    className: "md:col-span-8",
    aspect: "aspect-[16/9]",
  },
];

export function DeploymentGallerySection() {
  return (
    <SectionShell
      id="field-notes"
      title="Field Notes"
      intro="Deployment photographs are part of the work: sensor installations, hardware assembly, field operations, and research activity."
    >
      <div className="grid gap-5 md:grid-cols-12">
        {galleryImages.map((image) => (
          <figure key={image.src} className={`${image.className} group`}>
            <div className={`relative ${image.aspect} overflow-hidden bg-[var(--image-wash)]`}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition duration-700 group-hover:scale-[1.015]"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </div>
            <figcaption className="mt-3 border-t border-[var(--line)] pt-3 text-xs leading-5 text-[var(--muted)]">
              {image.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </SectionShell>
  );
}
