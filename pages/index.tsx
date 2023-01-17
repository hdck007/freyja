import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Layout from "../components/Layout";
import ListWrapper from "../components/ListWrapper";

const IndexPage = () => {
  const [error, setError] = useState(false);

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      {error && (
        <div className="w-full bg-red-400 rounded-md m-4 transition-all text-white flex justify-between px-4 py-2">
          An error occured
          <span>X</span>
        </div>
      )}
      <ListWrapper setError={setError} />
    </Layout>
  );
};

export default IndexPage;
