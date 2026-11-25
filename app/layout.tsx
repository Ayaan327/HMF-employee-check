import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HMF | Attendance portal',
  description:
    'HMF Engineering and Project Management Consultants — employee attendance for our UK and Pakistan teams.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
