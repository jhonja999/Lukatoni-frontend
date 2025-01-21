"use client"

import type React from "react"
import { useState } from "react"
import { useWallet } from "../contexts/WalletContext"

const TransactionForm: React.FC = () => {
  const { sendTokens } = useWallet()
  const [to, setTo] = useState("")
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      await sendTokens(to, amount)
      setTo("")
      setAmount("")
    } catch (error) {
      setError("Transaction failed. Please try again.")
      console.error("Transaction error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Send LUCA</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="to" className="block mb-2">
            Recipient Address
          </label>
          <input
            type="text"
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block mb-2">
            Amount (LUCA)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            required
            min="0"
            step="0.000000000000000001"
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  )
}

export default TransactionForm

