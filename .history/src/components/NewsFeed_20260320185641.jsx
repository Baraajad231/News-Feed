import { Typography } from "@mui/material";
import NewsArticle from "./newsArticle";

const NewsFeed = ({ articles }) => {
  const results = !articles.length ? (
    <Typography></Typography>
  ) : (
    articles.map((article) => (
      <NewsArticle {...article} key={crypto.randomUUID()} />
    ))
  );
  return <div>{results}</div>;
};

export default NewsFeed;
