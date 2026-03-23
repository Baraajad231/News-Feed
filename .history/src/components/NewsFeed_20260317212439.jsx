import NewsFeed from "./newsArticle";

const NewsHeader = ({ articles }) => {
  const { image, title, description, author, publishedAt } = props;
  return (
    <div>
      {articles?.map((article) => {
        <NewsArticle article={article} key={crypto.randomUUID()} />;
      })}
    </div>
  );
};

export default NewsFeed;
