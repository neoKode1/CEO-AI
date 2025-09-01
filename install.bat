@echo off
echo ========================================
echo AI-CEO Implementation Framework Setup
echo Dark Orchestra Films
echo ========================================
echo.

echo Installing dependencies...
npm install

echo.
echo Creating environment file...
if not exist .env.local (
    echo NEXT_PUBLIC_LLM_API_KEY=your_api_key_here > .env.local
    echo NEXT_PUBLIC_ZAPIER_WEBHOOK=your_webhook_url_here >> .env.local
    echo NEXT_PUBLIC_DISCORD_WEBHOOK=your_discord_webhook_here >> .env.local
    echo Environment file created. Please update with your actual API keys.
) else (
    echo Environment file already exists.
)

echo.
echo Building the application...
npm run build

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To start the development server:
echo npm run dev
echo.
echo To start the production server:
echo npm start
echo.
echo Don't forget to:
echo 1. Update .env.local with your API keys
echo 2. Configure your integrations in the Settings page
echo 3. Set up your AI CEO authority levels
echo.
pause
