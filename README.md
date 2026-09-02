# ☕ Brewza Coffee Roasters

A modern, high-end e-commerce website for an artisan coffee roastery built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Stripe Integration**.



## ✨ Features

- **Interactive Canvas Hero**: Frame-by-frame sticky canvas scroll animation capturing the coffee brewing journey.
- **Dynamic Shop & Catalog**: Full product listing with filtering, detailed coffee origins, flavor tags, and custom roast profiles.
- **Quick-View Modal System**: Seamless single-page product preview modals with backdrop blur and smooth transitions.
- **Cart & Toast Notification**: Non-intrusive bottom-right toast notifications on item addition with a sliding full-featured cart drawer.
- **Stripe Checkout API**: Integrated Next.js API route connecting the shopping cart directly to a secure Stripe Checkout Session.
- **Responsive Mobile Navigation**: Custom mobile navigation drawer with active section highlighting powered by `IntersectionObserver`.
- **Subscription Builder**: Interactive modal for customizing coffee preferences and delivery intervals.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Payments**: [Stripe SDK](https://stripe.com/) (`stripe`, `@stripe/stripe-js`)
- **Fonts**: Google Fonts (`EB Garamond`, `Manrope`)
- **Icons**: Material Symbols / Material Icons Outlined

---

## 🚀 Getting Started

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 2. Clone the Repository
```bash
git clone https://github.com/Vship06/brewza-coffee-website.git
cd brewza-coffee-website
```

### 3. Install Dependencies
```bash
npm install
```


### 4. Run Development Server
```bash
npm run dev
```

---

## 📄 Build & Production

To build the project for production:

```bash
npm run build
npm run start
```

---

## 🌐 Deployment

This application is ready to deploy on **Vercel**:

1. Push your repository to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Add `STRIPE_SECRET_KEY` under the **Environment Variables** settings.
4. Deploy!

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
