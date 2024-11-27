import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from 'react';

export function PrivacyPolicy() {
  return (
    <div className="container max-w-4xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p className="text-sm text-muted-foreground mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
              <p>We collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Account information (name, email, password)</li>
                <li>Campaign data and preferences</li>
                <li>Payment information</li>
                <li>Communication preferences</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
              <p>We use the collected information for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Providing and improving our services</li>
                <li>Processing payments and maintaining accounts</li>
                <li>Sending important updates and notifications</li>
                <li>Analyzing usage patterns to enhance user experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">3. Information Sharing</h2>
              <p>We do not sell your personal information. We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Service providers who assist in our operations</li>
                <li>Legal authorities when required by law</li>
                <li>Business partners with your consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
              <p>We implement appropriate security measures to protect your information, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encryption of sensitive data</li>
                <li>Regular security assessments</li>
                <li>Access controls and monitoring</li>
                <li>Secure data storage practices</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">5. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">6. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:support@revelve.io" className="text-primary hover:underline">
                  support@revelve.io
                </a>
              </p>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}