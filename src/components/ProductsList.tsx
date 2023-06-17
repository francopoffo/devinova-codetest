import Product from "./Product";
import { api } from "~/utils/api";

type Props = {
  pathname: string;
};

const ProductsList = ({ pathname }: Props) => {
  let products;
  let language = "English";

  if (pathname == "/") {
    language = "English";
    const { data, isLoading, isError } = api.product.getAll.useQuery();

    products = data;

    if (isLoading) return <p>Loading products...</p>;
    if (isError) return <p>Error fetching products.</p>;
  }

  if (pathname == "/spanish") {
    language = "Spanish";
    const { data, isLoading, isError } = api.product.getAllSP.useQuery();

    products = data;

    if (isLoading) return <p>Loading products...</p>;
    if (isError) return <p>Error fetching products.</p>;
  }

  if (pathname == "/portuguese") {
    language = "Portuguese";
    const { data, isLoading, isError } = api.product.getAllPT.useQuery();

    products = data;

    if (isLoading) return <p>Loading products...</p>;
    if (isError) return <p>Error fetching products.</p>;
  }

  return (
    <section>
      <h2 className="mt-12 text-center text-lg font-bold">
        Products in {language}
      </h2>
      <ul className="mx-8 my-12 flex flex-wrap items-center justify-center gap-8">
        {products!.length ? (
          products?.map((product) => (
            <Product key={product.id} product={product} />
          ))
        ) : (
          <p>Create your first product</p>
        )}
      </ul>
    </section>
  );
};

export default ProductsList;
