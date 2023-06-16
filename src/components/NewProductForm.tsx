import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "~/utils/api";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Inputs = {
  name: string;
  subtitle: string;
  description: string;
};

const ProductForm = () => {
  const trpc = api.useContext();

  const { mutate } = api.product.create.useMutation({
    onSettled: async () => {
      await trpc.product.getAll.invalidate();
    },
  });

  const productInput: ZodType<Inputs> = z.object({
    name: z.string().nonempty("This field is required."),
    subtitle: z.string().nonempty("This field is required."),
    description: z.string().nonempty("This field is required."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(productInput),
  });

  const onSubmit: SubmitHandler<Inputs> = (values: Inputs) => {
    mutate(values);
  };

  return (
    <section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-max w-[600px] flex-col items-stretch justify-between gap-4 rounded-md bg-gray-400 p-4"
      >
        <h2 className="self-center text-lg font-bold">Create a new product</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="">
            Name
          </label>
          <input
            type="text"
            {...register("name", {
              required: true,
              maxLength: 15,
            })}
            className="rounded-md p-2"
          />
          {errors.name && (
            <p className="text-center text-sm text-red-600">
              {errors.name?.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Subtitle</label>
          <input
            type="text"
            {...register("subtitle", {
              required: true,
              maxLength: 30,
            })}
            className="rounded-md p-2"
          />
          {errors.subtitle && (
            <p className="text-center text-sm text-red-600">
              {errors.subtitle?.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Description</label>
          <textarea
            rows={5}
            {...register("description", {
              required: true,
              maxLength: 100,
            })}
            className="rounded-md p-2"
          />
          {errors.description && (
            <p className="text-center text-sm text-red-600">
              {errors.description?.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-fit cursor-pointer self-center rounded-md bg-slate-600 px-4 py-2 text-white"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default ProductForm;
