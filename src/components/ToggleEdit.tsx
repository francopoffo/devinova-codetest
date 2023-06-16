import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { ZodType, z } from "zod";

type Props = {
  onToggle: () => void;
  onEdit: (
    editedName: string,
    editedSubtitle: string,
    editedDescription: string
  ) => void;
};

type Inputs = {
  name: string;
  subtitle: string;
  description: string;
};

const productInput: ZodType<Inputs> = z.object({
  name: z.string().nonempty("This field is required."),
  subtitle: z.string().nonempty("This field is required."),
  description: z.string().nonempty("This field is required."),
});

const ToggleEdit = ({ onToggle, onEdit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(productInput),
  });

  const onSubmit: SubmitHandler<Inputs> = (values: Inputs) => {
    const { name, subtitle, description } = values;

    onEdit(name, subtitle, description);
    onToggle();
  };

  return (
    <div className="fixed left-0 top-0 z-20 h-full w-full bg-black/50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="absolute left-1/2 top-1/2 z-30 flex w-[50%] -translate-x-1/2 -translate-y-1/2 transform flex-col gap-6 rounded-lg bg-gray-200 p-12"
      >
        <h2 className="self-center text-lg font-bold">Edit your product</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
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
        <div className="flex gap-4 self-end">
          <button
            className="rounded-md bg-black px-4 py-2 text-sm text-white"
            onClick={() => onToggle()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-yellow-500 px-4 py-2 text-sm text-white"
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ToggleEdit;
