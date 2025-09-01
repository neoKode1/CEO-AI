# CEO AI - Universal Business Intelligence Assistant

A comprehensive, industry-agnostic AI-powered business management system that acts as your intelligent CEO assistant. Built with Next.js, React, and TypeScript, featuring advanced voice recognition, data analytics, and strategic insights.

## 🚀 Features

### 🎤 Voice Recognition & AI Assistant
- **Floating Microphone Button**: Access voice recognition from anywhere on the page
- **Natural Language Processing**: Speak commands like "Show me my revenue" or "Take me to the agenda"
- **AI-Powered Navigation**: Intelligent routing to relevant dashboard sections
- **Text-to-Speech**: AI responds with voice for simple answers
- **Visual Feedback**: Real-time indicators for listening, speaking, and processing states

### 🏢 Business Intelligence Dashboard
- **Dynamic Content**: Adapts to your industry and business context
- **Strategic Insights**: CEO-level analysis of financial health, client concentration, and project pipeline
- **Real-time Analytics**: Live data visualization and performance metrics
- **Customizable Views**: Industry-specific configurations and layouts

### 📊 Core Business Modules

#### Dashboard & Analytics
- Executive summary with key performance indicators
- Financial health analysis and profit margin calculations
- Project pipeline health and completion rates
- Client concentration risk assessment

#### Plans & Execution
- Business plan management and status tracking
- Goal setting and milestone management
- Strategic roadmap development
- Execution progress monitoring

#### Network & Client Management
- Comprehensive client database with project tracking
- Contact relationship management
- Project status and payment tracking
- Network expansion analytics

#### Financial Management
- Revenue and expense tracking
- Budget analysis and forecasting
- Payment collection monitoring
- Financial performance insights

#### Agenda & Priority Management
- Company agenda with priority levels
- Deadline tracking and overdue alerts
- High-priority item identification
- Strategic task orchestration

### 💰 Advanced Payment Features
- **Cryptocurrency Support**: Accept payments in multiple crypto currencies
- **Invoice Management**: Professional invoicing system
- **Payment Tracking**: Real-time payment status monitoring
- **Multi-currency Support**: Handle various payment methods

### 🔧 Technical Features
- **Responsive Design**: Mobile-first, cross-platform compatibility
- **Real-time Logging**: Comprehensive workflow tracking and debugging
- **Local Storage**: Client-side data persistence
- **TypeScript**: Full type safety and development experience
- **TailwindCSS**: Modern, customizable UI components

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: TailwindCSS with custom color schemes
- **Icons**: Heroicons
- **Charts**: Recharts for data visualization
- **AI Integration**: Anthropic API (Claude)
- **Voice Recognition**: Web Speech API
- **State Management**: React Hooks with local storage persistence

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Anthropic API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/neoKode1/CEO-AI.git
   cd CEO-AI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   ANTHROPIC_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production
```bash
npm run build
npm start
```

## 📱 Usage Guide

### Voice Commands
The AI understands natural language commands:

- **"Show me my revenue"** → Navigates to financial analytics
- **"Take me to the agenda"** → Opens company agenda
- **"What's my client list?"** → Shows network overview
- **"High priority items"** → Filters agenda for urgent tasks
- **"Budget analysis"** → Financial overview and insights

### Manual Navigation
- Use the collapsible sidebar for traditional navigation
- Quick action buttons for common tasks
- Tab-based interface within the dashboard
- Global home button for quick return to main view

### Data Management
- Add clients and projects through intuitive forms
- Track financial records and payment status
- Manage business plans and strategic goals
- Monitor project progress and deadlines

## 🎨 Customization

### Theme Colors
The system uses a modern dark theme with light green accents:
- **Background**: Black (#000000)
- **Accent**: Light Green (#22c55e)
- **Text**: White and gray variations
- **Borders**: Dark gray tones

### Industry Configuration
- Adapts content based on your business type
- Industry-specific metrics and insights
- Customizable dashboard layouts
- Tailored strategic recommendations

## 🔍 Debugging & Development

### Debug Panel
- Real-time application logging
- Workflow tracking and monitoring
- User action analytics
- AI interaction insights
- Export logs for analysis

### Logging Levels
- **DEBUG**: Detailed development information
- **INFO**: General workflow tracking
- **WARN**: Potential issues and warnings
- **ERROR**: Error tracking and debugging

## 📁 Project Structure

```
CEO-AI/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Main dashboard page
│   ├── agenda/           # Company agenda management
│   ├── budget/           # Financial management
│   ├── payments/         # Payment and invoicing
│   └── layout.tsx        # Root layout with AI assistant
├── components/            # React components
│   ├── AIChatAssistant/  # AI chat with voice recognition
│   ├── Sidebar/          # Navigation sidebar
│   ├── ClientManagement/ # Client and project management
│   └── DebugPanel/       # Development debugging tools
├── lib/                  # Utility functions
│   ├── storage.ts        # Local storage management
│   └── logger.ts         # Comprehensive logging system
└── public/               # Static assets
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the debug panel for application logs
- Review the comprehensive logging system for troubleshooting

## 🚀 Roadmap

- [ ] Database integration for production use
- [ ] Multi-user collaboration features
- [ ] Advanced AI model integration
- [ ] Mobile app development
- [ ] API endpoints for external integrations
- [ ] Advanced reporting and analytics
- [ ] Multi-language support

---

**CEO AI** - Your intelligent business partner, powered by AI and designed for success.
