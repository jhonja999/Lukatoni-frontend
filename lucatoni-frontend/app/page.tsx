"use client"

import Header from "../components/Header"
import WalletInfo from "../components/WalletInfo"
import TransactionForm from "../components/TransactionForm"
import TransactionHistory from "../components/TransactionHistory"
import Footer from "../components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <WalletInfo />
        <TransactionForm />
        <TransactionHistory />
      </main>
      <Footer />
    </div>
  )
}

