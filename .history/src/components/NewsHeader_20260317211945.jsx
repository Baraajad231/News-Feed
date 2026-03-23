import NewsArticle from "./newsArticle";

const NewsHeader = () => {
  return (
    <div>
      {articles.map((article) => {
        <NewsArticle />;
      })}
    </div>
  );
};

export default NewsHeader;
