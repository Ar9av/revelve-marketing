import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TermsAndConditions() {
  return (
    <div className="container max-w-4xl py-8">
      <Tabs defaultValue="terms">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
          <TabsTrigger value="refund">Cancellation & Refund</TabsTrigger>
        </TabsList>
        
        <TabsContent value="terms">
          <Card>
            <CardHeader>
              <CardTitle>Terms and Conditions</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p className="text-sm text-muted-foreground mb-4">Last updated: {new Date().toLocaleDateString()}</p>
              
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
                  <p>
                    By accessing and using Revelve's services, you agree to be bound by these Terms and Conditions.
                    If you disagree with any part of these terms, you may not access our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">2. Service Description</h2>
                  <p>
                    Revelve provides AI-powered Reddit marketing services. We help businesses engage with Reddit
                    communities through automated, contextually relevant responses while maintaining authenticity
                    and compliance with Reddit's guidelines.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">3. User Obligations</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Maintain accurate account information</li>
                    <li>Comply with Reddit's terms of service</li>
                    <li>Use the service in accordance with applicable laws</li>
                    <li>Maintain confidentiality of account credentials</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">4. Intellectual Property</h2>
                  <p>
                    All content, features, and functionality of our service are owned by Revelve and are protected
                    by international copyright, trademark, and other intellectual property laws.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">5. Limitation of Liability</h2>
                  <p>
                    Revelve shall not be liable for any indirect, incidental, special, consequential, or punitive
                    damages resulting from your use or inability to use the service.
                  </p>
                </section>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="refund">
          <Card>
            <CardHeader>
              <CardTitle>Cancellation and Refund Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p className="text-sm text-muted-foreground mb-4">Last updated: {new Date().toLocaleDateString()}</p>
              
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-4">1. Cancellation Policy</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>You can cancel your subscription at any time</li>
                    <li>Cancellation will take effect at the end of the current billing period</li>
                    <li>You will retain access to the service until the end of your billing period</li>
                    <li>No partial month refunds are provided</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">2. Refund Policy</h2>
                  <p>We offer refunds under the following circumstances:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Technical issues preventing service usage (case-by-case basis)</li>
                    <li>Billing errors or duplicate charges</li>
                    <li>Service unavailability exceeding 24 hours</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">3. Credit Balance</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Unused credits expire after 12 months of inactivity</li>
                    <li>Credits are non-transferable and non-refundable</li>
                    <li>Promotional credits have separate expiration terms</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">4. Requesting a Refund</h2>
                  <p>To request a refund:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Contact support@revelve.io</li>
                    <li>Include your account details and reason for refund</li>
                    <li>Provide relevant transaction information</li>
                  </ul>
                  <p className="mt-4">
                    Refund requests are processed within 5-7 business days. Approved refunds will be issued to the
                    original payment method.
                  </p>
                </section>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}