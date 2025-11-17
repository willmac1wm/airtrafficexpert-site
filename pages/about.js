import Layout from '../components/Layout'
import Link from 'next/link'

export default function About() {
  return (
    <Layout title="About - Air Traffic Expert Consulting">
      <section className="hero">
        <div className="container">
          <h1>About Air Traffic Expert Consulting</h1>
          <p>17+ Years of Air Traffic Control Excellence</p>
        </div>
      </section>

      <div className="container">
        <section className="section">
          <h2 className="section-title">Our Story</h2>
          <div className="card">
            <p style={{ fontSize: '1.125rem', lineHeight: '1.8' }}>
              Air Traffic Expert Consulting was founded to address the critical challenges 
              facing the air traffic control industry today. With over 17 years of hands-on 
              experience spanning Navy operations, FAA facilities, and federal training 
              programs, we bring a unique perspective to ATC consulting.
            </p>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.8', marginTop: '1.5rem' }}>
              Our founder, Will Macomber, is an FAA-certified Air Traffic Controller who 
              currently serves as an ATC instructor for SAIC under the FAA CTS contract. 
              This combination of operational experience and training expertise allows us 
              to provide practical, effective solutions to the complex challenges facing 
              ATC organizations.
            </p>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Our Expertise</h2>
          <div className="grid-2">
            <div className="card">
              <h3>Military Foundation</h3>
              <p>
                Extensive experience in Navy air traffic control operations, providing 
                a strong foundation in high-pressure, mission-critical environments.
              </p>
            </div>
            <div className="card">
              <h3>FAA Operations</h3>
              <p>
                Deep understanding of FAA facilities, procedures, and regulatory requirements 
                gained through years of operational experience.
              </p>
            </div>
            <div className="card">
              <h3>Training Excellence</h3>
              <p>
                Current role as ATC instructor under federal contract, developing and 
                delivering training to the next generation of controllers.
              </p>
            </div>
            <div className="card">
              <h3>Industry Advocacy</h3>
              <p>
                Active involvement in addressing critical industry issues, including 
                controller compensation and retention challenges.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Our Mission</h2>
          <div className="card">
            <p style={{ fontSize: '1.125rem', lineHeight: '1.8' }}>
              We are committed to improving the air traffic control profession through 
              excellence in training, strategic consultation, and industry advocacy. Our 
              mission is to help ATC organizations optimize their operations, develop their 
              workforce, and navigate the complex challenges facing the industry.
            </p>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.8', marginTop: '1.5rem' }}>
              We believe that effective air traffic control is essential to aviation safety 
              and efficiency. By sharing our expertise and insights, we help organizations 
              build stronger, more capable ATC teams that can meet the demands of modern 
              airspace management.
            </p>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Why Work With Us</h2>
          <div className="grid-3">
            <div className="card">
              <h3>Real Experience</h3>
              <p>
                Not just theory – we've lived the challenges you're facing and know 
                what actually works in real-world ATC operations.
              </p>
            </div>
            <div className="card">
              <h3>Current Expertise</h3>
              <p>
                Active involvement in ATC training means we stay current with the latest 
                techniques, technologies, and industry developments.
              </p>
            </div>
            <div className="card">
              <h3>Proven Results</h3>
              <p>
                Track record of successful training programs, operational improvements, 
                and strategic guidance that delivers measurable outcomes.
              </p>
            </div>
          </div>
        </section>

        <section className="section" style={{ textAlign: 'center', background: 'var(--bg-light)', padding: '3rem', borderRadius: '0.5rem' }}>
          <h2 className="section-title">Let's Work Together</h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', color: 'var(--text-light)' }}>
            Ready to take your ATC operations to the next level?
          </p>
          <Link href="/contact" className="cta-button">
            Contact Us Today
          </Link>
        </section>
      </div>
    </Layout>
  )
}
