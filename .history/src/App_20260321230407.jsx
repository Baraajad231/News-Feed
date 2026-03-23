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
  const pageNumbers = useRef(1);
  const queryValue = useRef("");
  const totalPages = useRef(0);

  const loadData = async (q, page) => {
    // const controller = new AbortController();

    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&q=${q}&page=${page}&pageSize=5&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`,
    );
    const data = await response.json();
    totalPages.current = Math.ceil(parseInt(data.totalResults) / 5);

    return data?.articles?.map((article) => {
      const { title, description, urlToImage, author, publishedAt } = article;
      return { title, description, author, publishedAt, image: urlToImage };
    });
  };

  const fetchAndUpdateArticles = (qery, page) => {
    setIsLoading(true);
    loadData(qery, page).then((data) => {
      setArticles(data);
      setIsLoading(false);
    });
  };

  const debouncedLoadData = debounce((newQuery, newPage) => {
    fetchAndUpdateArticles(newQuery, newPage);
  }, 500);
  // تختصار ل data => setArticles(data)

  useEffect(() => {
    fetchAndUpdateArticles("", 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchChangeHandler = (newQuery) => {
    pageNumbers.current = 1;
    queryValue.current = newQuery;
    debouncedLoadData(queryValue.current, pageNumbers.current);
  };

  const handleNextClick = () => {
    pageNumbers.current = pageNumbers.current + 1;
    fetchAndUpdateArticles(queryValue.current, pageNumbers.current);
  };
  const handlePreviousClick = () => {
    pageNumbers.current = pageNumbers.current - 1;
    fetchAndUpdateArticles(queryValue.current, pageNumbers.current);
  };

  return (
    <Container>
      <NewsHeader onSearchChange={searchChangeHandler} />
      <NewsFeed articles={articles} loading={isLoading} />
      <Footer>
        <Button
          variant="outlined"
          onClick={handlePreviousClick}
          disabled={pageNumbers.current === 1}
        >
          Previous
        </Button>
        <Button
          variant="outlined"
          onClick={handleNextClick}
          disabled={pageNumbers.current === totalPages.current}
        >
          Next
        </Button>
      </Footer>
    </Container>
  );
}

export default App;
