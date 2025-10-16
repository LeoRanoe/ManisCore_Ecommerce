import { notFound } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { api } from '@/lib/api/client';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FAQAccordion } from '@/components/faqs/FAQAccordion';

export default async function FAQsPage({
  params,
}: {
  params: { company: string };
}) {
  try {
    const company = await api.getCompany(params.company);
    const faqsData = await api.getFAQs(params.company);

    const breadcrumbItems = [
      { label: 'Home', href: `/${params.company}` },
      { label: 'FAQs', href: `/${params.company}/faqs` },
    ];

    // Group FAQs by category
    const groupedFAQs = faqsData.grouped || {};
    const categories = Object.keys(groupedFAQs);

    return (
      <div className="min-h-screen bg-background">
        <Container className="py-8">
          <Breadcrumb items={breadcrumbItems} />

          {/* Header */}
          <div className="text-center mb-12 mt-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our products, shipping, returns, and more.
            </p>
          </div>

          {/* FAQs by Category */}
          {categories.length > 0 ? (
            <div className="max-w-4xl mx-auto space-y-8">
              {categories.map((category) => (
                <div key={category}>
                  <h2 className="text-2xl font-bold mb-6 pb-3 border-b border-border">
                    {category}
                  </h2>
                  <FAQAccordion faqs={groupedFAQs[category]} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-card border border-border rounded-2xl">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <ChevronDown className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No FAQs Available</h3>
              <p className="text-muted-foreground">
                Check back soon for frequently asked questions.
              </p>
            </div>
          )}

          {/* Contact CTA */}
          <div className="mt-16 text-center bg-card border border-border rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-3">Still Have Questions?</h3>
            <p className="text-muted-foreground mb-6">
              Can&apos;t find the answer you&apos;re looking for? Contact our customer support team.
            </p>
            <a
              href={`/${params.company}/contact`}
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Contact Us
            </a>
          </div>
        </Container>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
