import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "../providers/theme-provider"
import { WalletProvider } from "../contexts/WalletContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Lucatoni Frontend",
  description: "A cryptocurrency wallet for Lucatoni tokens",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <WalletProvider>{children}</WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

