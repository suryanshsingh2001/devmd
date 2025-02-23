import { Metadata } from "next";
import { config } from "@/config";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: `Terms of Service - ${config.name}`,
  description: "Terms of Service for DevMD - Your blog post conversion tool",
};

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-5xl mx-auto p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="text-muted-foreground">
              By accessing and using DevMD, you agree to be bound by these Terms
              of Service. If you do not agree to these terms, please do not use
              our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              2. Service Description
            </h2>
            <p className="text-muted-foreground">
              DevMD provides a content conversion tool that transforms text into
              markdown format. The service is provided "as is" and may be
              subject to limitations, delays, and other problems inherent in the
              use of internet applications.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              3. User Responsibilities
            </h2>
            <div className="text-muted-foreground">
              <p>Users are responsible for:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>All content submitted for conversion</li>
                <li>Maintaining the confidentiality of their data</li>
                <li>Using the service in compliance with applicable laws</li>
                <li>Not exceeding usage limits</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              4. Limitations of Use
            </h2>
            <div className="text-muted-foreground">
              <p>Users agree not to:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Misuse or abuse the service</li>
                <li>Attempt to gain unauthorized access</li>
                <li>Use the service for illegal purposes</li>
                <li>Share access with unauthorized users</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              5. Intellectual Property
            </h2>
            <p className="text-muted-foreground">
              All content, features, and functionality of DevMD are owned by us
              and are protected by international copyright, trademark, and other
              intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              6. Disclaimer of Warranties
            </h2>
            <p className="text-muted-foreground">
              The service is provided on an "as is" and "as available" basis,
              without any warranties of any kind, either express or implied,
              including but not limited to warranties of merchantability or
              fitness for a particular purpose.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              7. Contact Information
            </h2>
            <p className="text-muted-foreground">
              For any questions about these Terms, please contact:
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
              8. Modifications to Terms
            </h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. Continued
              use of the service after any modifications indicates acceptance of
              the new terms.
            </p>
          </section>
        </div>
      </Card>
    </div>
  );
}
