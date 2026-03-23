import React, { useEffect, useState, useCallback, useRef } from "react";
import { debounce } from "lodash";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import NewsHeader from "./components/NewsHeader";
import NewsFeed from "./components/NewsFeed";
import Typography from "@mui/material/Typography";

const DEFAULT_PAGE_SIZE = 5;

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("general");

  const abortController = useRef(new AbortController());

  async function loadData(query, category, page) {
    const baseEndpoint = `https://newsapi.org/v2/top-headlines?country=eg&pageSize=${DEFAULT_PAGE_SIZE}&category=${category}&page=${page}&apiKey=${
      import.meta.env.VITE_NEWS_API_KEY
    }`;

    const response = await fetch(
      query ? `${baseEndpoint}&q=${query}` : baseEndpoint,
      {
        signal: abortController.current.signal,
      },
    );
    const data = await response.json();
    if (data.status !== "ok") {
      throw new Error(`Error: ${data.code}, Details: ${data.message}`);
    }
    return data.articles?.map((article) => {
      const {
        title,
        description,
        urlToImage: image,
        url,
        author,
        publishedAt,
      } = article;
      return {
        title,
        description,
        image,
        url,
        author,
        publishedAt,
      };
    });
  }

  const fetchArticles = useCallback(
    debounce((query, category, page) => {
      setLoading(true);
      setError(undefined);
      abortController.current.abort();
      abortController.current = new AbortController();

      loadData(query, category, page)
        .then((articles) => {
          setLoading(false);
          setArticles(articles);
        })
        .catch((error) => {
          setLoading(false);
          setError(error.message);
        });
    }, 500),
    [],
  );

  useEffect(() => {
    fetchArticles(query, category, page);

    return () => {
      // Cleanup: Abort any pending requests
      abortController.current.abort();
    };
  }, [query, category, page]);

  const handleSearchChange = (newQuery) => {
    setQuery(newQuery);
    // Reset page number when query changes
    setPage(1);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setPage(1);
  };

  function handleNextPage() {
    setPage((prevPage) => prevPage + 1);
  }

  function handlePrevPage() {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  }

  return (
    <Container>
      <NewsHeader
        category={category}
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
      />
      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}
      {!error && (
        <NewsFeed
          articles={articles}
          loading={loading}
          pageSize={DEFAULT_PAGE_SIZE}
        />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "20px 0",
        }}
      >
        <Button
          variant="outlined"
          onClick={handlePrevPage}
          disabled={loading || page === 1}
        >
          Previous
        </Button>
        <Button
          variant="outlined"
          onClick={handleNextPage}
          disabled={loading || articles.length < DEFAULT_PAGE_SIZE}
        >
          Next
        </Button>
      </div>
    </Container>
  );
}

export default App;

// import { Button, Container, styled, Typography } from "@mui/material";
// import NewsFeed from "./components/NewsFeed";
// import NewsHeader from "./components/NewsHeader";
// import { useEffect, useRef, useState } from "react";
// import { debounce } from "lodash";

// const Footer = styled("div")(({ theme }) => ({
//   margin: theme.spacing(2, 0),
//   display: "flex",
//   justifyContent: "space-between",
// }));

// function App() {
//   const [articles, setArticles] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [category, setCategory] = useState("general");
//   const [pageNumbers, setPageNumbers] = useState(1);
//   const [queryValue, setQueryValue] = useState("");

//   const totalPages = useRef(0);
//   const controlledRef = useRef(null);
//   const loadData = async (q, page, category, signal) => {
//     // const controller = new AbortController();

//     const response = await fetch(
//       `https://newsapi.org/v2/top-headlines?country=us&q=${q}&page=${page}&pageSize=5&category=${category}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`,
//       { signal },
//     );
//     const data = await response.json();
//     if (data.status === "error") {
//       throw new Error("An Error has occured");
//     }
//     totalPages.current = Math.ceil(parseInt(data.totalResults) / 5);

//     return data?.articles?.map((article) => {
//       const { title, description, urlToImage, author, publishedAt, url } =
//         article;

//       return {
//         title,
//         description,
//         author,
//         publishedAt,
//         image: urlToImage,
//         url,
//       };
//     });
//   };
//   const fetchAndUpdateArticles = (query, page, type) => {
//     if (controlledRef.current) {
//       controlledRef.current.abort();
//     }

//     const controller = new AbortController();
//     controlledRef.current = controller;

//     setIsLoading(true);
//     setError("");

//     loadData(query, page, type ?? "general", controller.signal)
//       .then((data) => {
//         setArticles(data);
//       })
//       .catch((error) => {
//         if (error.name === "AbortError") {
//           return;
//         }
//         setError(error.message);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };

//   const debouncedLoadData = debounce((newQuery, newPage) => {
//     fetchAndUpdateArticles(newQuery, newPage);
//   }, 500);
//   // تختصار ل data => setArticles(data)

//   useEffect(() => {
//     fetchAndUpdateArticles("", 1);

//     return () => {
//       if (controlledRef.current) {
//         controlledRef.current.abort();
//       }
//     };
//   }, []);

//   const searchChangeHandler = (newQuery) => {
//     setPageNumbers(1);
//     setQueryValue(newQuery);
//     debouncedLoadData(queryValue, 1);
//   };

//   const handleNextClick = () => {
//     const nextPage = pageNumbers + 1;
//     setPageNumbers(nextPage);
//     fetchAndUpdateArticles(queryValue, nextPage);
//   };
//   const handlePreviousClick = () => {
//     const prevPage = pageNumbers - 1;
//     setPageNumbers(prevPage);
//     fetchAndUpdateArticles(queryValue, prevPage);
//   };
//   // ال disabled ممكن تعمله على ال article.Lingth < page size بحيث انه يوفر

//   const handleCategoryChange = (value) => {
//     setPageNumbers(1);
//     setCategory(value);
//     fetchAndUpdateArticles(queryValue, pageNumbers, value);
//   };
//   return (
//     <Container>
//       <NewsHeader
//         onSearchChange={searchChangeHandler}
//         onCategoryChange={handleCategoryChange}
//         category={category}
//       />
//       {error.length === 0 ? (
//         <NewsFeed articles={articles} loading={isLoading} />
//       ) : (
//         <Typography color="error" align="center">
//           {error}
//         </Typography>
//       )}
//       <Footer>
//         <Button
//           variant="outlined"
//           onClick={handlePreviousClick}
//           disabled={isLoading || pageNumbers === 1}
//         >
//           Previous
//         </Button>
//         <Button
//           variant="outlined"
//           onClick={handleNextClick}
//           disabled={isLoading || pageNumbers === totalPages.current}
//         >
//           Next
//         </Button>
//       </Footer>
//     </Container>
//   );
// }

// export default App;
