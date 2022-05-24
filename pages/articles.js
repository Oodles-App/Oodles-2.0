import { useState } from "react";
import prisma from "../db";

export async function getStaticProps() {
  const articles = await prisma.article.findMany();
  return {
    props: {
      initialArticles: articles,
    },
  };
}

function newTab(url) {
  window.open(url);
}
const Articles = ({ initialArticles }) => {
  const [articles, setArticles] = useState(initialArticles);
  const [search, setSearch] = useState("");

  return (
    <div>
      <h1 className="ArticlesPage">Articles</h1>
      <div className="search-container">
        <form action="/action_page.php">
          <input
            id="search"
            type="text"
            placeholder="Search by Title"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            className={"px-6"}
          />
          <ul>
            {articles
              .filter((article) =>
                article.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((article) => (
                <li
                  key={article.id}
                  className={"sm:grid grid-cols-5 bg-white shadow-sm p-7 relative lg:max-w-2xl sm:p-4 rounded-lg lg:col-span-2 lg:ml-20"}
                >
                  {/* <Image src="/default-placeholder.png" width="20px" height="20px" alt="Article picture"/> */}
                  <div className={"pt-5 self-center sm:pt-0 sm:pl-10 col-span-3"}>

                  <h4 className={"text-gray-800 capitalize text-xl font-bold"} onClick={() => newTab(article.url)}>{article.title}</h4>

                  <p className={"capitalize underline inline-block pt-2"}>by {article.author}</p>
                  </div>
                </li>
              ))}
          </ul>
        </form>
      </div>
    </div>
  );
};

export default Articles;
