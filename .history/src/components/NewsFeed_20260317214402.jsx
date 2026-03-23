import NewsArticle from "./newsArticle";

const NewsFeed = ({ articles }) => {
  return (
    <div>
      {articles?.map((article) => {
        <NewsArticle {...article} key={crypto.randomUUID()} />;
      })}
      askcas
    </div>
  );
};

export default NewsFeed;
