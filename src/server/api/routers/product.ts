import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { productInput, editProductInput } from "~/types";

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.db.product.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return products.map(({ id, name, subtitle, description }) => ({
      id,
      name,
      subtitle,
      description,
    }));
  }),

  create: publicProcedure
    .input(productInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.product.create({
        data: {
          name: input.name,
          subtitle: input.subtitle,
          description: input.description,
        },
      });
    }),

  delete: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    return ctx.db.product.delete({
      where: {
        id: input,
      },
    });
  }),

  edit: publicProcedure
    .input(editProductInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.product.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          subtitle: input.subtitle,
          description: input.description,
        },
      });
    }),
});
