"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from '@/components/Sidebar';
import { Providers } from './providers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePathname } from 'next/navigation';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

// export const metadata: Metadata = {
//   title: "Avatar Studio",
//   description: "Interactive Avatar Creator",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showSidebar = !['/login', '/register'].includes(pathname);

  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen bg-gray-50`}
      >
        <Providers>
          <div className="flex min-h-screen">
            {showSidebar && <Sidebar />}
            <main className={` ${showSidebar ? 'ml-64 flex-1 p-8' : 'w-screen h-screen flex items-center justify-center'}`}>
              {children}
            </main>
          </div>
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
