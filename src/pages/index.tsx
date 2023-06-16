import { type NextPage } from "next";

import NewProductForm from "~/components/NewProductForm";
import ProductsList from "~/components/ProductsList";

const Home: NextPage = () => {
  return (
    <main className="flex flex-col items-center gap-4">
      <h1 className="p-8 text-2xl font-bold">Devinova Code Test</h1>
      <NewProductForm />
      <ProductsList />
    </main>
  );
};

export default Home;
