import Product from "./Product";
import { api } from "~/utils/api";

const ProductsList = () => {
  const { data: products, isLoading, isError } = api.product.getAll.useQuery();

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Error fetching products.</p>;

  return (
    <section>
      <ul className="flex flex-wrap gap-8 items-center justify-center my-12 mx-8">
        {products.length ? (
          products.map((product) => (
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
