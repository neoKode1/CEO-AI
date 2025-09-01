# Anthropic API Setup Guide
## AI-CEO Implementation Framework - Dark Orchestra Films

### Quick Setup with Anthropic API Only

Since you have an Anthropic API key, you can start immediately! Here's how to configure the system:

#### 1. Create Environment File
Create a `.env.local` file in the root directory with this content:

```env
# AI-CEO Implementation Framework - Environment Configuration
# Dark Orchestra Films

# LLM API Configuration (Anthropic)
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Optional: OpenAI API (if you add it later)
# OPENAI_API_KEY=your_openai_api_key_here

# Automation Webhooks (optional - can be added later)
# ZAPIER_WEBHOOK_URL=your_zapier_webhook_url_here
# DISCORD_WEBHOOK_URL=your_discord_webhook_url_here

# System Configuration
NEXT_PUBLIC_APP_NAME="Maestro - AI CEO Dashboard"
NEXT_PUBLIC_COMPANY_NAME="Dark Orchestra Films"
NEXT_PUBLIC_AI_CEO_NAME="Maestro"

# Development Settings
NODE_ENV=development
```

#### 2. Replace Your API Key
Replace `your_anthropic_api_key_here` with your actual Anthropic API key.

#### 3. Install Dependencies
```bash
npm install
```

#### 4. Start the Development Server
```bash
npm run dev
```

### What Works with Anthropic API Only

✅ **Fully Functional:**
- AI CEO decision-making and recommendations
- Content generation for marketing
- Budget analysis and optimization suggestions
- Project management insights
- Communication assistance
- Team management recommendations

⚠️ **Requires Additional Setup (Optional):**
- Automated workflows (Zapier/Make.com)
- Discord/Slack notifications
- External integrations

### Next Steps

1. **Start the application** - The dashboard will work immediately
2. **Configure AI CEO settings** - Go to Settings → AI CEO to set authority levels
3. **Add your budget data** - Enter your $15,600/year budget in the Budget page
4. **Set up funding opportunities** - Add potential funding sources in the Funding page

### Adding Other APIs Later

You can easily add other APIs later by:
1. Getting the additional API keys
2. Adding them to `.env.local`
3. Configuring them in the Settings → Integrations page

### Testing Your Setup

Once you start the application, you can test the AI integration by:
1. Going to the Dashboard
2. Checking the "AI CEO Decisions" section
3. Using the "Ask Maestro" feature in any page

The system will automatically use your Anthropic API key for all AI-powered features.

### Support

If you encounter any issues:
1. Check that your API key is correctly entered
2. Verify your Anthropic account has sufficient credits
3. Check the browser console for any error messages

You're all set to start with just the Anthropic API key! 🚀
