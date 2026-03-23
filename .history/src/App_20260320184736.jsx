import { Container } from "@mui/material";
import NewsFeed from "./components/NewsFeed";
import NewsHeader from "./components/NewsHeader";
import { useEffect, useState } from "react";

function App() {
  const [articles, setArticles] = useState([]);

  const loadData = async (q) => {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&q=${q}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`,
    );
    const data = await response.json();
    return data?.articles?.map((article) => {
      const { title, description, urlToImage, author, publishedAt } = article;
      return { title, description, author, publishedAt, image: urlToImage };
    });
  };
  // تختصار ل data => setArticles(data)

  useEffect(() => {
    loadData("").then(setArticles);
  }, []);

  const searchChangeHandler = (newQuery) => {
    loadData(newQuery).then(setArticles);
  };
  return (
    <Container>
      <NewsHeader onSearchChange={searchChangeHandler} />
      {articles ? <p>loading</p> : <NewsFeed articles={articles} />}
    </Container>
  );
}

export default App;
