import NewsFeed from "./newsArticle";

const NewsHeader = ({ articles }) => {
  {
    (image, title, description, author, publish);
  }
  return (
    <div>
      {articles?.map((article) => {
        <NewsArticle article={article} key={crypto.randomUUID()} />;
      })}
    </div>
  );
};

export default NewsFeed;
