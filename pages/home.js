import React from "react";
import useSwr from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Home = () => {
  const { data, error } = useSwr("/api/tags", fetcher);

  if (error) return <div>Failed to load tags.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>Hello. Here are some dummy tags: {data.map((tag) => tag.name)}</div>
  );
};

export default Home;
