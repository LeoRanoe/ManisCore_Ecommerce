# 🛍️ ManisCore E-Commerce Platform

A modern, premium e-commerce platform built with Next.js 14, TypeScript, and Tailwind CSS. Features multi-company support, dynamic product catalogs, WhatsApp integration, and beautiful responsive design.

## ✨ Features

- 🏢 **Multi-Company Support** - Host multiple storefronts on one platform
- 🛒 **Product Catalog** - Beautiful product cards with filtering and search
- 📱 **WhatsApp Integration** - Direct customer communication
- 🎨 **Premium UI/UX** - Modern design with smooth animations
- 📱 **Fully Responsive** - Works perfectly on all devices
- ⚡ **Fast Performance** - Built with Next.js 14 App Router
- 🔍 **SEO Optimized** - Server-side rendering for better SEO
- 🎥 **YouTube Reviews** - Embed product review videos

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ManisCore_Ecommerce
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_DASHBOARD_API_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3001
NEXT_PUBLIC_DEFAULT_COMPANY=nextx
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3001/nextx](http://localhost:3001/nextx) in your browser.

## 📁 Project Structure

```
ManisCore_Ecommerce/
├── src/
│   ├── app/
│   │   ├── [company]/          # Dynamic company routes
│   │   │   ├── layout.tsx      # Company layout with navigation
│   │   │   ├── page.tsx        # Homepage
│   │   │   ├── products/       # Product catalog
│   │   │   ├── contact/        # Contact page
│   │   │   └── about/          # About page
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Root redirect
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── catalog/            # Product components
│   │   ├── contact/            # Contact components
│   │   ├── layout/             # Layout components
│   │   └── product/            # Product detail components
│   └── lib/
│       └── api/                # API client and types
├── public/                     # Static assets
├── .env.local                  # Environment variables
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── package.json                # Dependencies
```

## 🎨 Customization

### Adding a New Company

Companies are dynamically loaded from the dashboard API. Access any company at:
```
http://localhost:3001/[company-slug]
```

### Theme Customization

Edit `src/app/globals.css` to customize colors:

```css
:root {
  --primary: 221 83% 53%;        /* Primary brand color */
  --secondary: 240 4.8% 95.9%;   /* Secondary color */
  /* ... more color variables */
}
```

## 🚀 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Set environment variables in Vercel dashboard:
- `NEXT_PUBLIC_DASHBOARD_API_URL` - Your dashboard API URL
- `NEXT_PUBLIC_SITE_URL` - Your production site URL
- `NEXT_PUBLIC_DEFAULT_COMPANY` - Default company slug

### Build for Production

```bash
npm run build
npm start
```

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Image Optimization:** Next.js Image
- **Data Fetching:** SWR
- **Form Handling:** React Hook Form + Zod

## 📦 Key Dependencies

- `next` - React framework with SSR
- `react` & `react-dom` - UI library
- `typescript` - Type safety
- `tailwindcss` - Utility-first CSS
- `lucide-react` - Beautiful icons
- `swr` - Data fetching
- `embla-carousel-react` - Touch-friendly carousels
- `react-hook-form` - Form management
- `zod` - Schema validation

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide for the beautiful icons
- Vercel for the hosting platform

## 📞 Support

For support, email support@maniscore.com or message us on WhatsApp.

---

**Built with ❤️ using Next.js and TypeScript**
