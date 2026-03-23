import NewsArticle from "./newsArticle";

const NewsFeed = ({ articles }) => {
  const results = !articles.length ? (
    <p>asd</p>
  ) : (
    articles.map((article) => (
      <NewsArticle {...article} key={crypto.randomUUID()} />
    ))
  );
  return <div></div>;
};

export default NewsFeed;
