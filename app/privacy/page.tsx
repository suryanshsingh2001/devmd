import { Metadata } from "next";
import { config } from "@/config";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: `Privacy Policy - ${config.name}`,
  description: "Privacy Policy for DevMD - Your blog post conversion tool",
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-5xl mx-auto p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              1. Information We Collect
            </h2>
            <p className="text-muted-foreground">
              When using DevMD, we collect minimal information necessary to
              provide our service:
              <ul className="list-disc pl-6 mt-2">
                <li>Content you paste for conversion</li>
                <li>Basic usage analytics</li>
                <li>Browser type and version</li>
              </ul>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              2. How We Use Your Information
            </h2>
            <p className="text-muted-foreground">
              We use the collected information for:
              <ul className="list-disc pl-6 mt-2">
                <li>Converting your content to markdown</li>
                <li>Improving our service</li>
                <li>Maintaining service security</li>
              </ul>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Data Storage</h2>
            <p className="text-muted-foreground">
              <ul className="list-disc pl-6 mt-2">
                <li>We do not permanently store your converted content</li>
                <li>
                  All conversions are temporary and deleted after processing
                </li>
                <li>We do not share your data with third parties</li>
              </ul>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Cookies</h2>
            <p className="text-muted-foreground">
              <ul className="list-disc pl-6 mt-2">
                <li>We use essential cookies to maintain your session</li>
                <li>Track daily usage limits</li>
                <li>Improve user experience</li>
              </ul>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Contact</h2>
            <p className="text-muted-foreground">
              For privacy-related questions, please contact us at:
              <a
                href={config.profileUrl}
                className="text-primary hover:underline ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                {config.authorName}
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              6. Updates to This Policy
            </h2>
            <p className="text-muted-foreground">
              We may update this privacy policy from time to time. We will
              notify users of any material changes by posting the new privacy
              policy on this page.
            </p>
          </section>
        </div>
      </Card>
    </div>
  );
}
