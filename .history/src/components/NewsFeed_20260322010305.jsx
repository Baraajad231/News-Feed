import { Box, CircularProgress, Typography } from "@mui/material";
import NewsArticle from "./newsArticle";
import LoadingArticle from "./LoadingArticle";

const NewsFeed = ({ articles, loading }) => {
  if (loading) {
    return <LoadingArticle />;
  }

  const results = !articles.length ? (
    <Typography align="center" variant="h6" color="textSecondary" marginTop={4}>
      No articles found.
    </Typography>
  ) : (
    articles.map((article) => (
      <NewsArticle {...article} key={crypto.randomUUID()} />
    ))
  );
  return <div>{results}</div>;
};

export default NewsFeed;
