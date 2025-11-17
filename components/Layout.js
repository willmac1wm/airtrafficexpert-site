import Link from 'next/link'
import Head from 'next/head'

export default function Layout({ children, title = 'Air Traffic Expert Consulting' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Professional Air Traffic Control consulting services" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <div className="header-content">
          <Link href="/" className="logo">
            Air Traffic Expert
          </Link>
          <nav>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h3>Air Traffic Expert Consulting</h3>
            <p>Professional air traffic control consulting and training services.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <ul>
              <li>Email: info@airtrafficexpert.com</li>
              <li>Phone: (555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} Air Traffic Expert Consulting. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
