import Layout from '../components/Layout'
import Link from 'next/link'

export default function Services() {
  return (
    <Layout title="Services - Air Traffic Expert Consulting">
      <section className="hero">
        <div className="container">
          <h1>Our Services</h1>
          <p>Comprehensive Air Traffic Control Solutions</p>
        </div>
      </section>

      <div className="container">
        <section className="section">
          <h2 className="section-title">What We Offer</h2>
          
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h3>🎓 ATC Training & Development</h3>
            <p>
              Drawing from years of experience as an FAA-certified instructor, we provide 
              comprehensive training programs that prepare controllers for real-world operations.
            </p>
            <ul style={{ marginTop: '1rem', color: 'var(--text-light)' }}>
              <li>New controller training programs</li>
              <li>Simulation-based instruction</li>
              <li>Operational procedures and best practices</li>
              <li>Certification preparation</li>
              <li>Continuing education for experienced controllers</li>
            </ul>
          </div>

          <div className="card" style={{ marginBottom: '2rem' }}>
            <h3>📊 Facility Assessments</h3>
            <p>
              Expert evaluation of your ATC facility's operations, procedures, and staffing 
              to identify opportunities for improvement.
            </p>
            <ul style={{ marginTop: '1rem', color: 'var(--text-light)' }}>
              <li>Operational efficiency analysis</li>
              <li>Staffing level assessments</li>
              <li>Procedure review and optimization</li>
              <li>Safety protocol evaluation</li>
              <li>Technology integration recommendations</li>
            </ul>
          </div>

          <div className="card" style={{ marginBottom: '2rem' }}>
            <h3>📋 Policy Consultation</h3>
            <p>
              Strategic guidance on ATC policies, procedures, and regulatory compliance 
              based on extensive operational experience.
            </p>
            <ul style={{ marginTop: '1rem', color: 'var(--text-light)' }}>
              <li>Policy development and review</li>
              <li>FAA compliance guidance</li>
              <li>Standard operating procedure creation</li>
              <li>Emergency procedure planning</li>
              <li>Best practice implementation</li>
            </ul>
          </div>

          <div className="card" style={{ marginBottom: '2rem' }}>
            <h3>👥 Workforce Development</h3>
            <p>
              Address controller retention and career development challenges with proven 
              strategies and industry insights.
            </p>
            <ul style={{ marginTop: '1rem', color: 'var(--text-light)' }}>
              <li>Retention strategy development</li>
              <li>Compensation analysis and recommendations</li>
              <li>Career progression planning</li>
              <li>Mentorship program design</li>
              <li>Work-life balance initiatives</li>
            </ul>
          </div>

          <div className="card" style={{ marginBottom: '2rem' }}>
            <h3>🔬 Industry Analysis</h3>
            <p>
              In-depth analysis of ATC industry trends, challenges, and opportunities 
              to inform strategic decision-making.
            </p>
            <ul style={{ marginTop: '1rem', color: 'var(--text-light)' }}>
              <li>Staffing crisis analysis</li>
              <li>Technology trend assessment</li>
              <li>Competitive benchmarking</li>
              <li>Regulatory impact studies</li>
              <li>Future readiness planning</li>
            </ul>
          </div>

          <div className="card">
            <h3>🎯 Custom Solutions</h3>
            <p>
              Every facility and organization has unique needs. We work with you to develop 
              customized solutions that address your specific challenges.
            </p>
            <ul style={{ marginTop: '1rem', color: 'var(--text-light)' }}>
              <li>Tailored training programs</li>
              <li>Facility-specific assessments</li>
              <li>Custom policy development</li>
              <li>Specialized consulting projects</li>
              <li>Long-term partnership opportunities</li>
            </ul>
          </div>
        </section>

        <section className="section" style={{ textAlign: 'center', background: 'var(--bg-light)', padding: '3rem', borderRadius: '0.5rem' }}>
          <h2 className="section-title">Ready to Get Started?</h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', color: 'var(--text-light)' }}>
            Let's discuss how we can help your organization achieve its ATC goals.
          </p>
          <Link href="/contact" className="cta-button">
            Schedule a Consultation
          </Link>
        </section>
      </div>
    </Layout>
  )
}
