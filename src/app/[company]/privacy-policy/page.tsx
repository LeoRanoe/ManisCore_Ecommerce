import { notFound } from 'next/navigation';
import { api } from '@/lib/api/client';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export default async function PrivacyPolicyPage({
  params,
}: {
  params: { company: string };
}) {
  try {
    const company = await api.getCompany(params.company);

    const breadcrumbItems = [
      { label: 'Home', href: `/${params.company}` },
      { label: 'Privacy Policy', href: `/${params.company}/privacy-policy` },
    ];

    return (
      <div className="min-h-screen bg-background">
        <Container className="py-8">
          <Breadcrumb items={breadcrumbItems} />

          <div className="max-w-4xl mx-auto mt-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Privacy Policy
              </h1>
              <p className="text-muted-foreground">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            {/* Content */}
            <div className="bg-card border border-border rounded-2xl p-8">
              {company.privacyPolicy ? (
                <div className="prose prose-sm md:prose-base max-w-none dark:prose-invert">
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {company.privacyPolicy}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Privacy policy information is not available at this time.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Please contact us for privacy-related inquiries.
                  </p>
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div className="mt-8 grid md:grid-cols-2 gap-4">
              <a
                href={`/${params.company}/terms-conditions`}
                className="p-4 bg-card border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <h3 className="font-semibold mb-1">Terms & Conditions</h3>
                <p className="text-sm text-muted-foreground">Read our terms of service</p>
              </a>
              <a
                href={`/${params.company}/faqs`}
                className="p-4 bg-card border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <h3 className="font-semibold mb-1">FAQs</h3>
                <p className="text-sm text-muted-foreground">Find answers to common questions</p>
              </a>
            </div>
          </div>
        </Container>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
