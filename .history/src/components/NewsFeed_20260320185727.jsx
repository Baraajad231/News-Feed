import { Typography } from "@mui/material";
import NewsArticle from "./newsArticle";

const NewsFeed = ({ articles }) => {
  const results = !articles.length ? (
    <Typography
      align="center"
      variant="h6"
      color="textSecondary"
      marginTop={4}
    ></Typography>
  ) : (
    articles.map((article) => (
      <NewsArticle {...article} key={crypto.randomUUID()} />
    ))
  );
  return <div>{results}</div>;
};

export default NewsFeed;
