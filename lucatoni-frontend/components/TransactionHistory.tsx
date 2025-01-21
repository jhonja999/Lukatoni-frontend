"use client"

import type React from "react"
import { useWallet } from "../contexts/WalletContext"

const TransactionHistory: React.FC = () => {
  const { transactions } = useWallet()

  if (transactions.length === 0) {
    return null
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {transactions.map((tx, index) => (
          <li key={index} className="py-4">
            <p className="font-medium">{tx.type}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{tx.amount} LUCA</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{tx.date.toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TransactionHistory

