import Layout from '../components/Layout'

export default function Contact() {
  return (
    <Layout title="Contact - Air Traffic Expert Consulting">
      <section className="hero">
        <div className="container">
          <h1>Get In Touch</h1>
          <p>Let's discuss how we can help your organization</p>
        </div>
      </section>

      <div className="container">
        <section className="section">
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle">
            Fill out the form below and we'll get back to you within 24 hours.
          </p>

          <form 
            name="contact" 
            method="POST" 
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="contact-form"
          >
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="bot-field" />
            
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required 
                placeholder="John Smith"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                placeholder="john@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                placeholder="(555) 123-4567"
              />
            </div>

            <div className="form-group">
              <label htmlFor="organization">Organization</label>
              <input 
                type="text" 
                id="organization" 
                name="organization" 
                placeholder="Your Company Name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="service">Service Interest</label>
              <select id="service" name="service">
                <option value="">Select a service...</option>
                <option value="training">ATC Training & Development</option>
                <option value="assessment">Facility Assessment</option>
                <option value="policy">Policy Consultation</option>
                <option value="workforce">Workforce Development</option>
                <option value="analysis">Industry Analysis</option>
                <option value="custom">Custom Solution</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea 
                id="message" 
                name="message" 
                required 
                placeholder="Tell us about your needs..."
              ></textarea>
            </div>

            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </section>

        <section className="section">
          <h2 className="section-title">Other Ways to Reach Us</h2>
          <div className="grid-2">
            <div className="card">
              <h3>📧 Email</h3>
              <p>info@airtrafficexpert.com</p>
            </div>
            <div className="card">
              <h3>📱 Phone</h3>
              <p>(555) 123-4567</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
