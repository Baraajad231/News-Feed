import NewsFeed from "./newsArticle";

const NewsHeader = () => {
  const { article } = props;
  return (
    <div>
      {articles.map((article) => {
        <NewsArticle article={article} />;
      })}
    </div>
  );
};

export default NewsFeed;
