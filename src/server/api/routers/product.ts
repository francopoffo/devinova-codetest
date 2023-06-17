import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  productInput,
  editProductInput,
  createTranslationProductInput,
} from "~/types";

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

  getAllPT: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.db.productPT.findMany({
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

  getAllSP: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.db.productSP.findMany({
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

  createInPortuguese: publicProcedure
    .input(createTranslationProductInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.productPT.create({
        data: {
          productId: input.productId,
          name: input.name,
          subtitle: input.subtitle,
          description: input.description,
        },
      });
    }),

  createInSpanish: publicProcedure
    .input(createTranslationProductInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.productSP.create({
        data: {
          productId: input.productId,
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

  deletePT: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    return ctx.db.productPT.delete({
      where: {
        id: input,
      },
    });
  }),

  deleteSP: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    return ctx.db.productSP.delete({
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

    editPT: publicProcedure
    .input(editProductInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.productPT.update({
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

    editSP: publicProcedure
    .input(editProductInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.productSP.update({
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
