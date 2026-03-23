import { Button, Container, styled } from "@mui/material";
import NewsFeed from "./components/NewsFeed";
import NewsHeader from "./components/NewsHeader";
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

const Footer = styled("div")(({ theme }) => ({
  margin: theme.spacing(2, 0),
  display: "flex",
  justifyContent: "space-between",
}));

function App() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const pageNumber = useRef(1);
  const queryValue = useRef("1");

  const loadData = async (q, page) => {
    // const controller = new AbortController();

    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&q=${q}&page=${page}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`,
    );
    const data = await response.json();

    return data?.articles?.map((article) => {
      const { title, description, urlToImage, author, publishedAt } = article;
      return { title, description, author, publishedAt, image: urlToImage };
    });
  };

  const fetchAndUpdate = (q, page) => {};

  const debouncedLoadData = debounce((newQuery, newPage) => {
    setIsLoading(true);

    loadData(newQuery, newPage).then((data) => {
      setArticles(data);
      setIsLoading(false);
    });
  }, 500);
  // تختصار ل data => setArticles(data)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);

    loadData("", 1).then((data) => {
      setArticles(data);
      setIsLoading(false);
    });
  }, []);

  const searchChangeHandler = (newQuery) => {
    queryValue.current = newQuery;
    debouncedLoadData(queryValue.current, pageNumber.current);
  };

  const handleNextClick = () => {
    pageNumber.current = pageNumber.current + 1;
  };
  const handlePreviousClick = () => {
    pageNumber.current = pageNumber.current - 1;
  };

  return (
    <Container>
      <NewsHeader onSearchChange={searchChangeHandler} />
      <NewsFeed articles={articles} loading={isLoading} />
      <Footer>
        <Button variant="outlined" onClick={handlePreviousClick}>
          Previous
        </Button>
        <Button variant="outlined" onClick={handleNextClick}>
          Next
        </Button>
      </Footer>
    </Container>
  );
}

export default App;
