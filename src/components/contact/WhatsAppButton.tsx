import { MessageCircle } from 'lucide-react';

export function WhatsAppButton({ 
  phone, 
  message = "Hi! I'm interested in your products.",
  className = ""
}: { 
  phone: string; 
  message?: string;
  className?: string;
}) {
  // Clean phone number - remove spaces, dashes, parentheses, and plus sign
  const cleanPhone = phone.replace(/[\s\-\(\)\+]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all ${className}`}
    >
      <MessageCircle className="w-5 h-5" />
      <span>WhatsApp</span>
    </a>
  );
}
