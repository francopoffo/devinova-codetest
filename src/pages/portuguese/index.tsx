import React from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import ProductsList from "~/components/ProductsList";

const Portuguese: NextPage = () => {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <>
      <ProductsList pathname={pathname} />
    </>
  );
};

export default Portuguese;
