import { z } from "zod";

export const productInput = z.object({
  name: z.string().min(1),
  subtitle: z.string().min(1),
  description: z.string().min(1),
});
