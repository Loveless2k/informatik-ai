@echo off
echo ===================================
echo Building static site for deployment
echo ===================================

echo Cleaning previous build...
if exist out rmdir /s /q out

echo Building Next.js static site...
call npm run build

echo Copying .htaccess to output directory...
copy public\.htaccess out\.htaccess

echo Static site built successfully!
echo Output directory: %cd%\out
echo ===================================
echo To test locally, run: npm run serve-static
echo To deploy, upload the contents of the 'out' directory to your Hostinger hosting.
echo ===================================
