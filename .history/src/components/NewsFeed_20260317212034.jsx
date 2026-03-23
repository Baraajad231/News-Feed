import NewsFeed from "./newsArticle";

const NewsHeader = ({ article }) => {
  return (
    <div>
      {articles.map((article) => {
        <NewsArticle article={article} />;
      })}
    </div>
  );
};

export default NewsFeed;
