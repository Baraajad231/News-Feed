import NewsArticle from "./newsArticle.jsx";
const NewsFeed = ({ articles }) => {
  return (
    <div>
      {articles.map((article) => {
        return <NewsArticle {...article} key={crypto.randomUUID()} />;
      })}
    </div>
  );
};

export default NewsFeed;
