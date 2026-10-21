import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Anton } from 'next/font/google';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { IntroLoader } from '@/components/intro-loader';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://abdulwahid.me';
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Abdul Wahid — AI/ML Developer', template: '%s · Abdul Wahid' },
  description: 'AI/ML developer portfolio focused on machine-learning systems, model evaluation, explainability, and practical software.',
  alternates: { canonical: '/' },
  openGraph: { type: 'website', url: '/', title: 'Abdul Wahid — AI/ML Developer', description: 'Evidence-first AI/ML projects, technical case studies, and writing.', siteName: 'Abdul Wahid' },
  twitter: { card: 'summary_large_image', title: 'Abdul Wahid — AI/ML Developer', description: 'Evidence-first AI/ML projects, technical case studies, and writing.' },
  icons: { icon: '/icons/favicon.png', shortcut: '/icons/favicon.png', apple: '/icons/favicon.png' }, manifest: '/manifest.webmanifest'
};
export const viewport: Viewport = { themeColor: '#f8f8f8', colorScheme: 'light' };
const displayFont = Anton({ weight: '400', subsets: ['latin'], variable: '--font-display', display: 'swap' });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-theme="light" suppressHydrationWarning className={displayFont.variable}><body><a className="skip-link" href="#main">Skip to content</a><SiteHeader /><main id="main">{children}</main><SiteFooter /><IntroLoader /></body></html>;
}
