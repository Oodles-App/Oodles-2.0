import { useState } from 'react';
import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient();

export async function getStaticProps() {
    const articles = await prisma.article.findMany();
    return {
        props: { 
            initialArticles: articles
        }
    }
}

function newTab(url) {
    window.open(url)
}
const Articles = ({initialArticles}) => {
    const [articles, setArticles] = useState(initialArticles);
    const [search , setSearch ] = useState("")

    return (
        <div>
            <h1 className="ArticlesPage">Articles</h1>
                <div className="search-container">
                    <form action="/action_page.php">
                    <input id="search" type="text" placeholder="Search by Title" name="search" onChange={e => setSearch(e.target.value)} />
                    <ul>
                        {articles.filter(article => article.title.toLowerCase().includes(search.toLowerCase()))
                        .map((article) => (
                            <li key={article.id}>
                                <h3 onClick={() => newTab(article.url)}>{article.title} by {article.author}</h3>
                            </li>
                        ))
                    }
                    </ul>
                    </form>
                 </div>
        </div>
    )
  };
  
  export default Articles;
  