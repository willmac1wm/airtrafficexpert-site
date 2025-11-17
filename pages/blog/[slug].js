import Layout from '../../components/Layout'
import Link from 'next/link'
import { getAllPostIds, getPostData } from '../../lib/posts'

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.slug)
  return {
    props: {
      postData,
    },
  }
}

export default function Post({ postData }) {
  return (
    <Layout title={`${postData.title} - Air Traffic Expert Consulting`}>
      <div className="container">
        <article className="blog-post-content">
          <Link href="/blog" style={{ color: 'var(--secondary-color)', marginBottom: '2rem', display: 'inline-block' }}>
            ← Back to Blog
          </Link>
          
          <h1>{postData.title}</h1>
          <p className="blog-meta">Published on {postData.date}</p>
          
          {postData.image && (
            <img src={postData.image} alt={postData.title} />
          )}
          
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
          
          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
            <Link href="/blog" className="cta-button">
              ← Back to All Articles
            </Link>
          </div>
        </article>
      </div>
    </Layout>
  )
}
