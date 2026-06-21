import { ExperienceCategory, ProjectStatus } from "@prisma/client";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.email().min(1),
  password: z.string().min(8),
});

export const projectFormSchema = z.object({
  title: z.string().trim(),
  description: z.string().trim(),
  projectLabels: z.array(z.string().trim()).default([]),
  techStack: z.string().trim(),
  externalUrl: z.string().trim(),
  coverImageFileName: z.string().trim().optional().nullable(),
  galleryImageFileNames: z.array(z.string().trim()).default([]),
  existingCoverImagesRaw: z.string().trim().optional().nullable(),
  displayOrder: z.coerce.number().int(),
  status: z.enum(ProjectStatus),
});

export const experienceFormSchema = z.object({
  period: z.string().trim(),
  title: z.string().trim(),
  company: z.string().trim().optional().nullable(),
  description: z.string().trim(),
  tags: z.string().trim(),
  category: z.enum(ExperienceCategory),
  displayOrder: z.coerce.number().int(),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
export type ExperienceFormValues = z.infer<typeof experienceFormSchema>;
