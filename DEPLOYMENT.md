# Deployment Guide

This document provides information about deploying the Sabine Hansen Portfolio to GitHub Pages.

## Current Deployment Status

✅ **The portfolio is already deployed and live!**
- Site URL: https://sabinehansen.art
- GitHub Pages URL: https://whoistahito.github.io/Portfolio
- Deployment branch: `gh-pages`

## How It Works

### Automatic Deployment
Every time you push changes to the `main` branch, GitHub Actions automatically:
1. Builds the React application using Vite
2. Optimizes assets for production
3. Creates SPA fallback support (404.html)
4. Deploys to the `gh-pages` branch
5. Updates the live site

### Workflow Details
The deployment is handled by `.github/workflows/deploy.yml`:
- **Trigger**: Push to main branch or manual dispatch
- **Node Version**: 20.x (with npm cache)
- **Build Command**: `npm run build`
- **Deploy Tool**: peaceiris/actions-gh-pages@v4
- **Custom Domain**: sabinehansen.art (configured via CNAME)

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Check workflow logs in the Actions tab
   - Ensure all dependencies are properly listed in package.json
   - Test locally with `npm run build`

2. **Site Not Updating**
   - Check if the workflow completed successfully
   - GitHub Pages may take a few minutes to update
   - Clear browser cache

3. **Routing Issues (404 on refresh)**
   - This is already handled with 404.html fallback
   - Ensure BrowserRouter is used (not HashRouter)

4. **Custom Domain Not Working**
   - Check DNS settings for sabinehansen.art
   - Ensure CNAME record points to whoistahito.github.io
   - Verify domain in repository settings

### Manual Deployment

If you need to deploy manually:

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy using gh-pages:
   ```bash
   npm run deploy
   ```

### Repository Settings

Ensure GitHub Pages is enabled in repository settings:
1. Go to repository Settings → Pages
2. Source: "Deploy from a branch"
3. Branch: `gh-pages`
4. Folder: `/ (root)`
5. Custom domain: `sabinehansen.art`

## SEO & Performance

The deployment includes:
- ✅ Meta descriptions and Open Graph tags
- ✅ Favicon and app icons
- ✅ Compressed assets and optimized images
- ✅ SPA routing support
- ✅ Custom domain with HTTPS

## Monitoring

To monitor deployment status:
1. Check the Actions tab for workflow runs
2. View the `gh-pages` branch for deployed content
3. Monitor site uptime and performance

---

*Last updated: August 2025*