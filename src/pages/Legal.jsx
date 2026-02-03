
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';
import '../styles/Legal.css'; 

export default function Legal() {
  return (
    <div className="legal-container">
      <div className="legal-nav">
        <BackButton />
      </div>
      
      <div className="legal-content">
        <h1>Legal Information</h1>
        <p className="last-updated">Last Updated: February 2024</p>

        <section>
          <h2>1. Privacy Policy</h2>
          <p>
            We respect your privacy. This application collects the names, messages, and images you upload exclusively for the purpose of generating your Valentine's greeting. 
            Data is stored securely in our database and is accessed only via the unique link you generate.
            We do not sell your personal data to third parties.
          </p>
        </section>

        <section>
          <h2>2. Terms of Service</h2>
          <p>
            By using this service, you agree to not upload content that is illegal, offensive, or violates the rights of others. 
            We reserve the right to remove any content that violates these terms.
            The service is provided "as is" without warranties of any kind.
          </p>
        </section>

        <section>
          <h2>3. Cookie Policy</h2>
          <p>
            We use essential cookies to ensure the website functions correctly (e.g., remembering your session). 
            We may use third-party analytics to understand how our service is used.
          </p>
        </section>

        <section>
          <h2>4. User Content</h2>
          <p>
            You retain ownership of the photos and text you upload. By uploading, you grant us a license to host and display this content solely for the purpose of your greeting card sharing.
          </p>
        </section>
        
        <div className="contact-section">
            <p>Questions? Contact us at support@valentineapp.com</p>
        </div>
      </div>
    </div>
  );
}
