import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { SupabaseProvider } from '@/lib/supabase/provider'
import Header from '@/components/layout/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rally.ATL - Tennis Matchmaking',
  description: 'Find tennis partners and join sessions in Atlanta',
  keywords: 'tennis, matchmaking, atlanta, tennis partners, tennis sessions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <SupabaseProvider>
            <div className="min-h-screen bg-background">
              <Header />
              <main>
                {children}
              </main>
            </div>
          </SupabaseProvider>
        </body>
      </html>
    </ClerkProvider>
  )
} 