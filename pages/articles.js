// import '../styles/globals.css'
import {PrismaClient} from '@prisma/client'
import { useState } from 'react';
const prisma = new PrismaClient();

export async function getStaticProps() {
    const articles = await prisma.article.findMany();
    return {
        props:{ 
            initialArticles: articles
        }
    }
}

const Articles = ({initialArticles}) => {
    const [articles, setArticles] = useState(initialArticles);
 
    return (
        <div>
            <h1 className="ArticlesPage">Articles</h1>
                <div className="search-container">
                    <form action="/action_page.php">
                    <input type="text" placeholder="Search.." name="search"/>
                    <button type="submit"><i className="fa fa-search"></i></button>
                    </form>
                 </div>
                 <div>
                    {articles && articles.map((article) => {
                        return(
                            <div key={article.id}>
                                <h3>{article.title}</h3>
                                <p>{article.author}</p>
                            </div>
                        )
                    })}
                 </div>
 




        </div>
    )
  };
  
  export default Articles;
  