# 🛍️ ManisCore E-Commerce Platform

A clean, professional e-commerce platform built with Next.js 14, TypeScript, and Tailwind CSS. Features multi-company support, dynamic product catalogs, WhatsApp integration, and modern black & white design.

## ✨ Features

- 🏢 **Multi-Company Support** - Host multiple storefronts on one platform
- 🛒 **Product Catalog** - Clean product cards with filtering and search
- 📱 **WhatsApp Integration** - Direct customer communication
- 🎨 **Professional UI/UX** - Clean black & white minimalist design
- 📱 **Fully Responsive** - Works perfectly on all devices
- ⚡ **Fast Performance** - Built with Next.js 14 App Router
- 🔍 **SEO Optimized** - Server-side rendering for better SEO
- 🖼️ **Image Optimization** - Next.js Image component for fast loading
- 📊 **Real-time Stock** - Connected to dashboard for live inventory

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- pnpm package manager (`npm install -g pnpm`)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/LeoRanoe/ManisCore_Ecommerce.git
cd ManisCore_Ecommerce
```

2. Install dependencies:
```bash
pnpm install
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
pnpm dev
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

### Automatic Deployment (Recommended)

This repository is connected to Vercel for automatic deployments:
1. Push to `master` branch
2. Vercel automatically builds and deploys
3. Live in 2-3 minutes!

### Manual Deployment

1. Install Vercel CLI:
```bash
pnpm add -g vercel
```

2. Deploy:
```bash
vercel --prod
```

### Environment Variables

Set these in your Vercel dashboard (Settings → Environment Variables):

**Production:**
```env
NEXT_PUBLIC_DASHBOARD_API_URL=https://manis-core-dashboard.vercel.app
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_DEFAULT_COMPANY=next-x
```

### Build for Production

```bash
pnpm build
pnpm start
```

## 📚 Documentation

- **[Deployment Guide](./DEPLOYMENT_GUIDE.md)** - Complete deployment instructions
- **[Final Summary](./FINAL_SUMMARY.md)** - Project completion summary
- **[Quick Start Guide](./QUICK_START_GUIDE.md)** - Getting started guide
- **[Visual Changes](./VISUAL_CHANGES.md)** - Design documentation
- **[Redesign Summary](./REDESIGN_SUMMARY.md)** - Full redesign details

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Image Optimization:** Next.js Image
- **Package Manager:** pnpm
- **Deployment:** Vercel

## 📦 Key Dependencies

- `next` - React framework with SSR
- `react` & `react-dom` - UI library
- `typescript` - Type safety
- `tailwindcss` - Utility-first CSS
- `lucide-react` - Beautiful icons
- `clsx` & `tailwind-merge` - Class name utilities

## 🎨 Design Philosophy

- **Minimalist** - Clean black & white theme
- **Professional** - No AI-generated look
- **Fast** - Optimized performance
- **Functional** - Every element has purpose
- **Responsive** - Mobile-first design

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

For support, contact via WhatsApp through the platform.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**

**Status:** ✅ Production Ready | 🚀 Deployed | 📱 Responsive
