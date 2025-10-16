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
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/50 hover:scale-105 overflow-hidden ${className}`}
    >
      {/* Animated Background Shine */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      {/* WhatsApp Icon with Pulse Animation */}
      <div className="relative">
        <div className="absolute inset-0 bg-white/30 rounded-full animate-ping" />
        <MessageCircle className="w-6 h-6 relative z-10" />
      </div>
      
      {/* Text */}
      <span className="relative z-10">Contact on WhatsApp</span>
      
      {/* Arrow Icon */}
      <svg 
        className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </a>
  );
}
