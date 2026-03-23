import { Container } from "@mui/material";
import NewsFeed from "./components/NewsFeed";
import NewsHeader from "./components/NewsHeader";
import { useEffect, useState } from "react";

function App() {
  const [articles, setArticles] = useState([]);

  const loadData = async () => {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=5833b58b1a934278b67156081b1c582f`,
    );
    const data = await response.json();
    return data?.articles?.map((article) => {
      const { title, description, urlToImage, author, publishedAt } = article;
      return { title, description, author, publishedAt, image: urlToImage };
    });
  };
  // تختصار ل data => setArticles(data)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(loadData().then(setArticles), []);

  return (
    <Container>
      <NewsHeader />
      <NewsFeed articles={articles} />
    </Container>
  );
}

export default App;
