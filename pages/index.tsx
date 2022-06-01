import type { NextPage } from "next";
import { Suspense } from "react";
import dynamic from 'next/dynamic';

const CreateLinkForm = dynamic(() => import("../src/components/create-link"), {
  ssr: false
})

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
