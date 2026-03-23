import { Container } from "@mui/material";
import NewsFeed from "./components/NewsFeed";
import NewsHeader from "./components/NewsHeader";
import { useState } from "react";

function App() {
  const loadData = async () => {
    const [articles, setArticles] = useState([]);
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`,
    );
    const data = await response.json();
    return data.articles.map((article) => {
      const { title, description, urlToImage, author, publishedAt } = article;
      return { title, description, author, publishedAt, image: urlToImage };
    });
  };

  return (
    <Container>
      <NewsHeader />
      <NewsFeed articles={articles} />
    </Container>
  );
}

export default App;
