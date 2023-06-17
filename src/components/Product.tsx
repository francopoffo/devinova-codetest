import type { Product } from "~/types";
import { useState } from "react";
import { api } from "~/utils/api";
import ToggleDelete from "./ToggleDelete";
import ToggleEdit from "./ToggleEdit";
import ToggleTranslation from "./ToggleTranslation";
import toast from "react-hot-toast";

type ProductProps = {
  product: Product;
};

const Product = ({ product }: ProductProps) => {
  const [toggleDelete, setToggleDelete] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [toggleTranslation, setToggleTranslation] = useState(false);

  const trpc = api.useContext();
  let toastProductID: string;

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

  const {
    mutate: createTranslationPT,
    isError: isErrorPT,
    isLoading: isLoadingPT,
    isSuccess: isSuccessPT,
  } = api.product.createInPortuguese.useMutation({});

  const {
    mutate: createTranslationSP,
    isError: isErrorSP,
    isLoading: isLoadingSP,
    isSuccess: isSuccessSP,
  } = api.product.createInSpanish.useMutation({});

  const onToggleDelete = () => {
    setToggleDelete(!toggleDelete);
  };

  const onToggleEdit = () => {
    setToggleEdit(!toggleEdit);
  };

  const onToggleTranslation = () => {
    setToggleTranslation(!toggleTranslation);
  };

  const deleteProduct = () => {
    deleteMutation(product.id);
  };

  const editProduct = (
    editedName: string,
    editedSubtitle: string,
    editedDescription: string
  ) => {
    editMutation({
      id: product.id,
      name: editedName,
      subtitle: editedSubtitle,
      description: editedDescription,
    });
  };

  const translateToPortuguese = (
    translatedName: string,
    translatedSubtitle: string,
    translatedDescription: string
  ) => {
    createTranslationPT({
      name: translatedName,
      subtitle: translatedSubtitle,
      description: translatedDescription,
      productId: product.id,
    });
  };

  const translateToSpanish = (
    translatedName: string,
    translatedSubtitle: string,
    translatedDescription: string
  ) => {
    createTranslationSP({
      name: translatedName,
      subtitle: translatedSubtitle,
      description: translatedDescription,
      productId: product.id,
    });
  };

  if (isLoadingSP) {
    toast.loading("Creating the spanish translation", { id: toastProductID! });
  }
  if (isErrorSP) {
    toast.remove(toastProductID!);
    toast.error(
      "Error while creating translation, check if this product is not already translated to this language!",
      { id: toastProductID! }
    );
  }
  if (isSuccessSP) {
    toast.remove(toastProductID!);
    toast.success(
      "Translation created, check the product in the Spanish page",
      { id: toastProductID! }
    );
  }

  if (isLoadingPT) {
    toast.loading("Creating the portuguese translation");
  }
  if (isErrorPT) {
    toast.remove(toastProductID!);
    toast.error(
      "Error while creating translation, check if this product is not already translated to this language!",
      { id: toastProductID! }
    );
  }
  if (isSuccessPT) {
    toast.remove(toastProductID!);
    toast.success(
      "Translation created, check the product in the Portuguese page",
      { id: toastProductID! }
    );
  }

  return (
    <>
      <li className="flex h-[250px] w-[300px] flex-col items-center justify-between gap-2 rounded-md bg-gray-200 p-4">
        <div className="flex h-[75%] w-[100%] flex-col items-center gap-2">
          <h2 className="text-lg font-bold">{product.name}</h2>
          <p className="text-center text-sm">{product.subtitle}</p>
          <p className="break-words text-xs">{product.description}</p>
        </div>

        <div className="flex gap-2 self-end">
          <button
            className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white"
            onClick={(e) => {
              e.stopPropagation();
              onToggleTranslation();
            }}
          >
            Create translation
          </button>
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
      {toggleTranslation && (
        <ToggleTranslation
          onTranslatePT={translateToPortuguese}
          onTranslateSP={translateToSpanish}
          onToggle={onToggleTranslation}
        />
      )}
    </>
  );
};

export default Product;
