import { api } from '@/lib/api/client';
import { WhatsAppButton } from '@/components/contact/WhatsAppButton';
import { Mail, Phone, Instagram, Facebook } from 'lucide-react';

export default async function ContactPage({ params }: { params: { company: string } }) {
  const company = await api.getCompany(params.company);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground mb-6">
              Have questions about our products? We&apos;d love to hear from you!
            </p>
          </div>

          {company.contactPhone && (
            <div>
              <WhatsAppButton
                phone={company.contactPhone}
                message={`Hi ${company.name}! I have a question.`}
                className="w-full justify-center"
              />
            </div>
          )}

          <div className="space-y-4">
            {company.contactEmail && (
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <a href={`mailto:${company.contactEmail}`} className="hover:text-primary">
                  {company.contactEmail}
                </a>
              </div>
            )}

            {company.contactPhone && (
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <span>{company.contactPhone}</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Follow Us</h2>
          <div className="space-y-4">
            {company.socialMedia?.instagram && (
              <a
                href={`https://instagram.com/${company.socialMedia.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span>{company.socialMedia.instagram}</span>
              </a>
            )}

            {company.socialMedia?.facebook && (
              <a
                href={company.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
                <span>Facebook</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
