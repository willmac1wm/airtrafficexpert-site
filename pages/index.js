import Layout from '../components/Layout'
import Link from 'next/link'

export default function Home() {
  return (
    <Layout title="Air Traffic Expert Consulting - Professional ATC Services">
      <section className="hero">
        <div className="container">
          <h1>Expert Air Traffic Control Consulting</h1>
          <p>17+ Years of FAA Experience | Navy Operations | Federal Training</p>
          <Link href="/contact" className="cta-button">
            Get a Consultation
          </Link>
        </div>
      </section>

      <div className="container">
        <section className="section">
          <h2 className="section-title">Why Choose Air Traffic Expert Consulting?</h2>
          <p className="section-subtitle">
            Led by Will Macomber, FAA-certified Air Traffic Controller with extensive experience 
            across Navy operations, FAA facilities, and federal training programs.
          </p>
          <div className="grid-3">
            <div className="card">
              <h3>🎯 Proven Experience</h3>
              <p>
                17+ years spanning military and civilian air traffic control operations, 
                with hands-on experience in tower, TRACON, and en route facilities.
              </p>
            </div>
            <div className="card">
              <h3>📚 Training Excellence</h3>
              <p>
                Current ATC instructor for SAIC under FAA CTS contract, developing the 
                next generation of air traffic controllers.
              </p>
            </div>
            <div className="card">
              <h3>🔍 Industry Insight</h3>
              <p>
                Deep understanding of FAA operations, staffing challenges, and industry 
                best practices from both operational and training perspectives.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Our Services</h2>
          <div className="grid-2">
            <div className="card">
              <h3>ATC Training & Development</h3>
              <p>
                Comprehensive training programs for new and experienced controllers, 
                including simulation-based instruction and operational procedures.
              </p>
            </div>
            <div className="card">
              <h3>Facility Assessments</h3>
              <p>
                Expert evaluation of ATC facilities, procedures, and staffing to identify 
                opportunities for improvement and optimization.
              </p>
            </div>
            <div className="card">
              <h3>Policy Consultation</h3>
              <p>
                Strategic guidance on ATC policies, procedures, and best practices based 
                on real-world operational experience.
              </p>
            </div>
            <div className="card">
              <h3>Workforce Development</h3>
              <p>
                Assistance with controller retention, compensation strategies, and 
                career development programs.
              </p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/services" className="cta-button">
              View All Services
            </Link>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Latest Insights</h2>
          <p className="section-subtitle">
            Stay informed with expert analysis and industry commentary
          </p>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/blog" className="cta-button">
              Read Our Blog
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  )
}
