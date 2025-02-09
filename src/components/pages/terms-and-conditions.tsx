import { Footer } from "@/components/layout/footer";

export function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              Welcome to Revelve Marketing. These terms and conditions outline the rules and regulations
              for the use of our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Company Information</h2>
            <p>
              Legal Name: Arnav Gupta<br />
              Address: Prayagraj, Uttar Pradesh, India, 211004
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Services</h2>
            <p>
              We provide marketing automation and campaign management services. By using our services,
              you agree to comply with and be bound by these terms and conditions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. User Obligations</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must provide accurate and complete information when using our services</li>
              <li>You are responsible for maintaining the confidentiality of your account</li>
              <li>You agree not to use our services for any illegal or unauthorized purpose</li>
              <li>You must not violate any laws in your jurisdiction while using our services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Payment Terms</h2>
            <p>
              All payments are processed securely through our payment partners. Credits purchased are
              non-refundable unless otherwise stated. We reserve the right to modify our pricing
              structure at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
            <p>
              All content, features, and functionality of our services are owned by us and are
              protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
            <p>
              We shall not be liable for any indirect, incidental, special, consequential, or
              punitive damages resulting from your use of our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of any
              material changes via email or through our platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
            <p>
              For any questions about these terms and conditions, please contact us at our registered
              address:
              <br />
              <br />
              Arnav Gupta<br />
              Prayagraj, Uttar Pradesh<br />
              India, 211004
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}