import NewsArticle from "./newsArticle";

const NewsFeed = ({ articles }) => {
  console.log(articles);

  return (
    <div>
      {articles.map((article) => {
        <NewsArticle {...article} key={crypto.randomUUID()} />;
      })}
    </div>
  );
};

export default NewsFeed;
