import NewsFeed from "./newsArticle";

const NewsHeader = () => {
  return (
    <div>
      {articles.map((article) => {
        <NewsArticle article={article} />;
      })}
    </div>
  );
};

export default NewsFeed;
