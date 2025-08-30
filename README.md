# Sabine Hansen Portfolio

A modern artist portfolio website built with React, TypeScript, and Tailwind CSS, showcasing Sabine Hansen's artwork and exhibitions.

## 🌐 Live Site

The portfolio is deployed and available at:
- **Custom Domain**: [sabinehansen.art](https://sabinehansen.art)
- **GitHub Pages**: [whoistahito.github.io/Portfolio](https://whoistahito.github.io/Portfolio)

## 🚀 Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions. The deployment process:

1. **Automatic Deployment**: Every push to the `main` branch triggers an automatic deployment
2. **Build Process**: The site is built using Vite and optimized for production
3. **SPA Support**: Single Page Application routing is supported with proper fallback handling
4. **Custom Domain**: Configured to use the custom domain `sabinehansen.art`

### Deployment Workflow

The deployment is handled by `.github/workflows/deploy.yml` which:
- Installs dependencies
- Builds the production version
- Creates SPA fallback (404.html)
- Deploys to the `gh-pages` branch
- Configures custom domain

## 🛠️ Development

### Tech Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router v6
- **UI Components**: Custom components with Radix UI primitives

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/whoistahito/Portfolio.git
   cd Portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components
│   ├── ContactSection/ # Contact information
│   ├── FooterBar/      # Footer component
│   └── SiteHeader/     # Navigation header
├── screens/            # Page components
│   ├── DesktopDark/    # Home/Gallery page
│   ├── aboutMe/        # About page
│   ├── contact/        # Contact page
│   └── exhebitions/    # Exhibitions page
└── assets/             # Images and static files
```

## 📱 Features

- **Responsive Design**: Optimized for desktop viewing (1440px fixed width)
- **Gallery Lightbox**: Interactive artwork viewing with keyboard navigation
- **Multi-language Support**: German/English language switcher (UI ready)
- **SEO Optimized**: Proper meta tags and structured data
- **Performance**: Optimized images and efficient bundling

## 🎨 Pages

- **Home**: Gallery showcase with lightbox functionality
- **Exhibitions**: Past and current exhibition information
- **About**: Artist biography and additional images
- **Contact**: Contact information and social links

## 🔧 Customization

The design system uses CSS custom properties and Tailwind CSS for consistent theming. Key colors and fonts can be modified in:
- `tailwind.config.js` - Theme configuration
- `tailwind.css` - CSS custom properties
- Google Fonts: Antonio font family

---

*Built with ❤️ for Sabine Hansen's artistic portfolio*