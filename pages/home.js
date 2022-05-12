import { fetchWrapper } from "../helpers";

const Home = () => {
  function getAll() {
    return fetchWrapper.get("/api/");
  }
  const test = getAll();
  console.log('test', test);
  return <div>Hello.</div>;
};

export default Home;

