import NewsArticle from "./newsArticle";

const NewsHeader = ({ articles }) => {
  return (
    <div>
      {articles?.map((article) => {
        <NewsArticle {...article} key={crypto.randomUUID()} />;
      })}
    </div>
  );
};

export default NewsFeed;
