import type { NextPage } from "next";
import { Suspense } from "react";
import CreateLinkForm from "../src/components/create-link";

const Home: NextPage = () => {
  return (
    <>
      <Suspense>
        <CreateLinkForm />
      </Suspense>
    </>
  );
};

export default Home;
