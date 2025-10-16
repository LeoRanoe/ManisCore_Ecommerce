import { api } from '@/lib/api/client';
import Image from 'next/image';

export default async function AboutPage({ params }: { params: { company: string } }) {
  const company = await api.getCompany(params.company);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About {company.name}</h1>

        {company.logoUrl && (
          <div className="mb-8 flex justify-center">
            <div className="relative w-32 h-32">
              <Image
                src={company.logoUrl}
                alt={company.name}
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground mb-6">
            {company.description || `Welcome to ${company.name}!`}
          </p>

          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-6">
            We are committed to providing our customers with the best quality products
            and exceptional customer service. Our team works tirelessly to ensure that
            every product we offer meets the highest standards of excellence.
          </p>

          <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
            <li>Premium quality products from trusted brands</li>
            <li>Competitive pricing and great value</li>
            <li>Fast and reliable customer support via WhatsApp</li>
            <li>Authentic products guaranteed</li>
            <li>Easy ordering process</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-muted-foreground">
            Have questions or want to learn more? Don't hesitate to reach out to us
            through WhatsApp or email. We're here to help!
          </p>
        </div>
      </div>
    </div>
  );
}
