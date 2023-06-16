import { z } from "zod";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "./server/api/root";

type RouterOutputs = inferRouterOutputs<AppRouter>;
type AllProductsOutput = RouterOutputs["product"]["getAll"];

export type Product = AllProductsOutput[number];

export const productInput = z.object({
  name: z.string().nonempty("This field is required."),
  subtitle: z.string().nonempty("This field is required."),
  description: z.string().nonempty("This field is required."),
});

export const editProductInput = z.object({
  id: z.number(),
  name: z.string().nonempty("This field is required."),
  subtitle: z.string().nonempty("This field is required."),
  description: z.string().nonempty("This field is required."),
});
