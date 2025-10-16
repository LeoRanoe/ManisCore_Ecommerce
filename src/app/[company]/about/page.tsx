import { api } from '@/lib/api/client';
import Image from 'next/image';
import { Target, Users, Award, Heart, CheckCircle2, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default async function AboutPage({ params }: { params: { company: string } }) {
  const company = await api.getCompany(params.company);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-20 sm:py-28 md:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            {company.logoUrl && (
              <div className="mb-8 flex justify-center">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-3xl overflow-hidden bg-white/10 backdrop-blur-sm border-2 border-white/20 p-4">
                  <Image
                    src={company.logoUrl}
                    alt={company.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              </div>
            )}

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              About <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">{company.name}</span>
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 leading-relaxed max-w-3xl mx-auto font-light">
              {company.description || `Discover the story behind ${company.name}`}
            </p>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-8 sm:h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C300,50 900,50 1200,0 L1200,120 L0,120 Z" fill="white" opacity="1"></path>
          </svg>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="container mx-auto px-4 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Mission */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg hover:shadow-2xl transition-all border border-gray-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-2xl mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black mb-4">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                We are committed to providing our customers with the best quality products
                and exceptional customer service. Our team works tirelessly to ensure that
                every product we offer meets the highest standards of excellence.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg hover:shadow-2xl transition-all border border-gray-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-2xl mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black mb-4">Our Values</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Quality, integrity, and customer satisfaction are at the core of everything we do.
                We believe in building lasting relationships with our customers through trust,
                transparency, and delivering value that exceeds expectations.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 sm:p-12 text-white mb-16">
            <h2 className="text-3xl sm:text-4xl font-black mb-10 text-center">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-black mb-2">1000+</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-black mb-2">5000+</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">Orders Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-black mb-2">100%</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-black mb-2">24/7</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">Support</div>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-center">
              Why Choose <span className="bg-gradient-to-r from-gray-900 to-black bg-clip-text text-transparent">{company.name}?</span>
            </h2>
            <p className="text-gray-600 text-center text-lg mb-12 max-w-2xl mx-auto">
              We go above and beyond to ensure you have the best shopping experience
            </p>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Award, title: 'Premium Quality', desc: 'Only authentic products from trusted brands' },
                { icon: TrendingUp, title: 'Competitive Prices', desc: 'Great value for your money' },
                { icon: Users, title: 'Expert Support', desc: 'Fast and reliable customer support via WhatsApp' },
                { icon: CheckCircle2, title: 'Guaranteed Authentic', desc: '100% genuine products guaranteed' },
                { icon: Heart, title: 'Customer First', desc: 'Your satisfaction is our top priority' },
                { icon: Target, title: 'Easy Process', desc: 'Simple and convenient ordering' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all border border-gray-100 group">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl mb-4 group-hover:bg-black group-hover:scale-110 transition-all">
                    <item.icon className="w-6 h-6 text-gray-900 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gray-50 rounded-3xl p-12 sm:p-16">
            <h2 className="text-3xl sm:text-4xl font-black mb-6">Ready to Shop?</h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Explore our collection and find the perfect products for you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${params.company}/products`}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gray-900 to-black text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all"
              >
                <span>Browse Products</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href={`/${params.company}/contact`}
                className="inline-flex items-center justify-center gap-2 bg-white border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-900 hover:text-white hover:scale-105 transition-all"
              >
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
