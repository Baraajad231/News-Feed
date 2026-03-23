import NewsArticle from "./newsArticle";

const NewsFeed = ({ articles }) => {
  articles.map((article) => {
    console.log({ ...article });
  });
  return (
    <div>
      {articles.map((article) => {
        <NewsArticle {...article} key={crypto.randomUUID()} />;
      })}
    </div>
  );
};

export default NewsFeed;
