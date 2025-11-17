import Layout from '../../components/Layout'
import Link from 'next/link'
import { getSortedPostsData } from '../../lib/posts'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}

export default function Blog({ allPostsData }) {
  return (
    <Layout title="Blog - Air Traffic Expert Consulting">
      <section className="hero">
        <div className="container">
          <h1>Expert Insights & Analysis</h1>
          <p>Air Traffic Control Industry Commentary</p>
        </div>
      </section>

      <div className="container">
        <section className="section">
          <h2 className="section-title">Latest Articles</h2>
          
          {allPostsData.length === 0 ? (
            <div className="card">
              <p>No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="blog-grid">
              {allPostsData.map(({ id, date, title, excerpt, image }) => (
                <article key={id} className="blog-card">
                  {image && <img src={image} alt={title} />}
                  <div className="blog-card-content">
                    <h3>{title}</h3>
                    <p className="blog-meta">{date}</p>
                    <p className="blog-excerpt">{excerpt}</p>
                    <Link href={`/blog/${id}`} className="read-more">
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </Layout>
  )
}
