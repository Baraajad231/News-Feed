import { Button, Container, styled, Typography } from "@mui/material";
import NewsFeed from "./components/NewsFeed";
import NewsHeader from "./components/NewsHeader";
import { useEffect, useRef, useState, useCallback } from "react";
import { debounce } from "lodash";

const Footer = styled("div")(({ theme }) => ({
  margin: theme.spacing(2, 0),
  display: "flex",
  justifyContent: "space-between",
}));

function App() {
  // 1. تحويل كل الـ Refs إلى States
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("general");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const abortControllerRef = useRef(null);
  const pageSize = 5;

  // الحفاظ على مسمى loadData
  const loadData = async (q, p, cat, signal) => {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&q=${q}&page=${p}&pageSize=${pageSize}&category=${cat}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`,
      { signal },
    );

    const data = await response.json();
    if (data.status === "error") {
      throw new Error(data.message || "An Error has occurred");
    }

    // تحديث إجمالي النتائج لحساب الصفحات لاحقاً
    setTotalResults(parseInt(data.totalResults) || 0);

    return data?.articles?.map((article) => ({
      title: article.title,
      description: article.description,
      author: article.author,
      publishedAt: article.publishedAt,
      image: article.urlToImage,
      url: article.url,
    }));
  };

  // الحفاظ على مسمى fetchAndUpdateArticles
  const fetchAndUpdateArticles = useCallback(
    (currentQuery, currentPage, currentCategory) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      setIsLoading(true);
      setError("");

      loadData(currentQuery, currentPage, currentCategory, controller.signal)
        .then((data) => {
          setArticles(data);
        })
        .catch((err) => {
          if (err.name === "AbortError") return;
          setError(err.message);
        })
        .finally(() => {
          if (!controller.signal.aborted) {
            setIsLoading(false);
          }
        });
    },
    [category],
  ); // تعتمد على الكاتيجوري لضمان تحديث المرجع عند تغيره

  // إنشاء نسخة debounced للبحث فقط
  const debouncedFetch = useCallback(
    debounce((q, p, c) => fetchAndUpdateArticles(q, p, c), 500),
    [fetchAndUpdateArticles],
  );

  // 2. المحرك الرئيسي: useEffect يراقب التغيرات ويجلب البيانات
  useEffect(() => {
    // إذا كان هناك نص بحث، نستخدم الـ debounce
    if (query !== "") {
      debouncedFetch(query, page, category);
    } else {
      // إذا كان البحث فارغاً (عند التحميل أول مرة أو مسح البحث) نجلب البيانات فوراً
      fetchAndUpdateArticles(query, page, category);
    }

    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [query, page, category, debouncedFetch, fetchAndUpdateArticles]);

  // 3. تحديث الـ Handlers ليتعاملوا مع الـ States
  const searchChangeHandler = (newQuery) => {
    setQuery(newQuery);
    setPage(1); // إعادة التصفير عند البحث الجديد
  };

  const handleNextClick = () => {
    setPage((prev) => prev + 1);
  };

  const handlePreviousClick = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    setPage(1); // إعادة التصفير عند تغيير القسم
  };

  const totalPages = Math.ceil(totalResults / pageSize);

  return (
    <Container>
      <NewsHeader
        onSearchChange={searchChangeHandler}
        onCategoryChange={handleCategoryChange}
        category={category}
      />
      {error ? (
        <Typography color="error" align="center" sx={{ mt: 4 }}>
          {error}
        </Typography>
      ) : (
        <NewsFeed articles={articles} loading={isLoading} />
      )}
      <Footer>
        <Button
          variant="outlined"
          onClick={handlePreviousClick}
          disabled={isLoading || page === 1}
        >
          Previous
        </Button>
        <Typography>
          Page {page} of {totalPages || 1}
        </Typography>
        <Button
          variant="outlined"
          onClick={handleNextClick}
          disabled={isLoading || page >= totalPages || articles.length === 0}
        >
          Next
        </Button>
      </Footer>
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
