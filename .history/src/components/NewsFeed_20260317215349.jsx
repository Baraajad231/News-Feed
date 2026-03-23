import NewsArticle from "./NewsArticle.jsx";

const NewsFeed = ({ articles }) => {
  return (
    <div>
      {articles.map((article) => {
        <NewsArticle {...article} key={crypto.randomUUID()} />;
      })}
    </div>
  );
};

export default NewsFeed;
