'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FAQ } from '@/lib/api/client';

interface FAQAccordionProps {
  faqs: FAQ[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <div
          key={faq.id}
          className="bg-card border border-border rounded-lg overflow-hidden"
        >
          <button
            onClick={() => toggleFAQ(faq.id)}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
          >
            <h3 className="font-semibold text-lg pr-4">{faq.question}</h3>
            <ChevronDown
              className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
                openId === faq.id ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openId === faq.id && (
            <div className="px-6 pb-6 pt-2">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {faq.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
