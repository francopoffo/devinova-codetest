import type { Product } from "~/types";

type ProductProps = {
  product: Product;
};

const Product = ({ product }: ProductProps) => {
  const { name, subtitle, description } = product;

  return (
    <li className="flex flex-col gap-2 items-center bg-gray-200 rounded-md p-4 w-[300px] h-[200px]">
      <h2 className="font-bold text-lg">{name}</h2>
      <p className="text-sm text-center">{subtitle}</p>
      <p className="text-xs text-justify">{description}</p>
    </li>
  );
};

export default Product;
