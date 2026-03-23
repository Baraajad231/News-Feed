import { Container } from "@mui/material";
import NewsFeed from "./components/NewsFeed";
import NewsHeader from "./components/NewsHeader";
import { useEffect, useState } from "react";
import { debounce } from "lodash";

function App() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async (q) => {
    const controller = new AbortController();
    console.log(controller);

    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&q=${q}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`,
      {
        signal: controller.signal,
      },
    );
    const data = await response.json();

    return data?.articles?.map((article) => {
      const { title, description, urlToImage, author, publishedAt } = article;
      return { title, description, author, publishedAt, image: urlToImage };
    });
  };

  const debouncedLoadData = debounce((newQuery) => {
    setIsLoading(true);

    loadData(newQuery).then((data) => {
      setArticles(data);
      setIsLoading(false);
    });
  }, 500);
  // تختصار ل data => setArticles(data)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);

    loadData("").then((data) => {
      setArticles(data);
      setIsLoading(false);
    });
  }, []);

  const searchChangeHandler = (newQuery) => {
    debouncedLoadData(newQuery);
  };
  return (
    <Container>
      <NewsHeader onSearchChange={searchChangeHandler} />
      <NewsFeed articles={articles} loading={isLoading} />
    </Container>
  );
}

export default App;
