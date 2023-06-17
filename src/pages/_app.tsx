import { type AppType } from "next/app";
import { api } from "~/utils/api";
import Layout from "~/components/Layout";
import "~/styles/globals.css";
import { Toaster } from "react-hot-toast";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Toaster />
      <Component {...pageProps} />
    </Layout>
  );
};

export default api.withTRPC(MyApp);
