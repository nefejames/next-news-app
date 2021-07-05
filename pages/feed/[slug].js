import styles from "@styles/Feed.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import router from "next/router";

export default function Feed({ articles, pageNumber }) {
  return (
    <div className="page-container">
      <div className={styles.paginator}>
        <button
          onClick={() => {
            if (pageNumber > 1) {
              router.push(`/feed/${pageNumber - 1}`);
            }
          }}
          className={pageNumber === 1 ? styles.disabled : styles.active}
        >
          Prev Page
        </button>

        <span>#{pageNumber}</span>

        <button
          onClick={() => {
            if (pageNumber < 5) {
              router.push(`/feed/${pageNumber + 1}`);
            }
          }}
          className={pageNumber === 5 ? styles.disabled : styles.active}
        >
          Next Page
        </button>
      </div>

      <div className={styles.main}>
        {articles.map((article, idx) => (
          <div key={idx} className={styles.post}>
            <h1>
              <Link href={article.url}>
                <a>{article.title}</a>
              </Link>
            </h1>
            <p>{article.description}</p>
            {!!article.urlToImage && <img src={article.urlToImage} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const pageNumber = ctx.query.slug;

  if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
    return {
      props: {
        articles: [],
        pageNumber: 1,
      },
    };
  }

  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEWS_API_KEY}`,
      },
    }
  );

  const data = await res.json();

  const { articles } = data;

  return {
    props: {
      articles,
      pageNumber: Number.parseInt(pageNumber),
    },
  };
};
