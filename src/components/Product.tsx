import type { Product } from "~/types";
import { useState } from "react";
import { api } from "~/utils/api";
import ToggleDelete from "./ToggleDelete";
import ToggleEdit from "./ToggleEdit";

type ProductProps = {
  product: Product;
};

const Product = ({ product }: ProductProps) => {
  const { id, name, subtitle, description } = product;
  const [toggleDelete, setToggleDelete] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);

  const trpc = api.useContext();

  const { mutate: deleteMutation } = api.product.delete.useMutation({
    onSettled: async () => {
      await trpc.product.getAll.invalidate();
    },
  });

  const { mutate: editMutation } = api.product.edit.useMutation({
    onSettled: async () => {
      await trpc.product.getAll.invalidate();
    },
  });

  const onToggleDelete = () => {
    setToggleDelete(!toggleDelete);
  };

  const onToggleEdit = () => {
    setToggleEdit(!toggleEdit);
  };

  const deleteProduct = () => {
    deleteMutation(id);
  };

  const editProduct = (
    editedName: string,
    editedSubtitle: string,
    editedDescription: string
  ) => {
    editMutation({
      id,
      name: editedName,
      subtitle: editedSubtitle,
      description: editedDescription,
    });
  };

  return (
    <>
      <li className="flex h-[250px] w-[300px] flex-col items-center justify-between gap-2 rounded-md bg-gray-200 p-4">
        <div className="flex flex-col items-center gap-2 w-[100%] h-[75%]">
          <h2 className="text-lg font-bold">{name}</h2>
          <p className="text-center text-sm">{subtitle}</p>
          <p className="text-xs break-words">{description}</p>
        </div>

        <div className="flex gap-2 self-end">
          <button
            className="rounded-md bg-yellow-500 px-4 py-2 text-sm text-white"
            onClick={(e) => {
              e.stopPropagation();
              onToggleEdit();
            }}
          >
            Edit
          </button>
          <button
            className="rounded-md bg-red-500 px-4 py-2 text-sm text-white"
            onClick={(e) => {
              e.stopPropagation();
              onToggleDelete();
            }}
          >
            Delete
          </button>
        </div>
      </li>
      {toggleDelete && (
        <ToggleDelete onDelete={deleteProduct} onToggle={onToggleDelete} />
      )}
      {toggleEdit && (
        <ToggleEdit onEdit={editProduct} onToggle={onToggleEdit} />
      )}
    </>
  );
};

export default Product;
