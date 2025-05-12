# Informatik-AI Static Site Deployment Guide

This guide provides instructions for deploying the Informatik-AI website to Hostinger or any other static hosting provider.

## Prerequisites

- Node.js (v18 or later)
- npm (v9 or later)
- A Hostinger account with web hosting

## Building the Static Site

1. Clone the repository:
   ```
   git clone https://github.com/Loveless2k/informatik-ai.git
   cd informatik-ai
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Build the static site:
   ```
   npm run build
   ```
   
   Alternatively, you can use the provided deployment script:
   ```
   deploy-static.bat
   ```

4. The static site will be generated in the `out` directory.

## Testing Locally

To test the static site locally before deployment:

```
npm run serve-static
```

This will start a local server at http://localhost:3002 serving the static site.

## Deploying to Hostinger

1. Log in to your Hostinger control panel.

2. Navigate to the File Manager or use FTP to access your hosting.

3. Upload the entire contents of the `out` directory to the public_html directory (or your preferred subdirectory) on your Hostinger hosting.

4. Ensure the `.htaccess` file is properly uploaded (it's hidden by default).

## Important Configuration Notes

### .htaccess

The `.htaccess` file is crucial for proper routing in a static site. It ensures that all routes are directed to the appropriate HTML files. Make sure this file is properly uploaded to your hosting.

### URL Rewriting

The static site relies on URL rewriting to handle client-side routing. The included `.htaccess` file configures this for Apache servers (which Hostinger uses).

### Cache Control

The static site is configured with appropriate cache headers to optimize performance. Static assets (images, CSS, JS) are cached for a year, while HTML files are cached for an hour.

## Troubleshooting

### 404 Errors on Page Refresh

If you encounter 404 errors when refreshing pages, check that:
- The `.htaccess` file is properly uploaded
- URL rewriting is enabled on your hosting
- The paths in the `.htaccess` file match your site structure

### Missing Assets

If assets (images, CSS, JS) are missing:
- Check that all files from the `out` directory were uploaded
- Verify that the paths in your HTML files are correct
- Check for any console errors in the browser developer tools

### Contact Form Not Working

Since this is a static site, the contact form requires a separate backend service. Options include:
- Using a form submission service like Formspree or Netlify Forms
- Setting up a serverless function (AWS Lambda, Vercel Functions, etc.)
- Using a PHP script on Hostinger to handle form submissions

## Maintenance

To update the site:
1. Make changes to the source code
2. Rebuild the static site using `npm run build`
3. Upload the new files to your hosting

## Performance Optimization

For optimal performance:
- Enable GZIP compression on your hosting (configured in the `.htaccess` file)
- Use a CDN if available
- Optimize images and assets
- Consider using a caching plugin if available

## Security Considerations

The static site includes basic security headers in the `.htaccess` file. For additional security:
- Keep all dependencies updated
- Use HTTPS (configure SSL in your Hostinger control panel)
- Regularly audit your site for vulnerabilities
