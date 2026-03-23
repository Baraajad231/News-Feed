import NewsFeed from "./newsArticle";

const NewsHeader = ({ articles }) => {
  return (
    <div>
      {articles.map((article) => {
        <NewsArticle article={article} />;
      })}
    </div>
  );
};

export default NewsFeed;
