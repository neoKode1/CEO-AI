import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AIChatAssistant from '@/components/AIChatAssistant'
import DebugPanelWrapper from '@/components/DebugPanelWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CEO AI Dashboard',
  description: 'CEO AI Implementation Framework - Autonomous operations with human oversight',
  keywords: 'CEO AI, autonomous operations, business management, AI assistant',
  authors: [{ name: 'CEO AI' }],
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-black">
          {children}
          <AIChatAssistant />
          <DebugPanelWrapper />
        </div>
      </body>
    </html>
  )
}
