"use client"

import type React from "react"
import { useWallet } from "../contexts/WalletContext"

const WalletInfo: React.FC = () => {
  const { address, balance } = useWallet()

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      alert("Address copied to clipboard!")
    }
  }

  if (!address) return null

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Wallet Info</h2>
      <p className="mb-2">
        <span className="font-medium">Address:</span> <span className="font-mono">{address}</span>
        <button onClick={copyAddress} className="ml-2 text-blue-500 hover:text-blue-600">
          📋
        </button>
      </p>
      <p>
        <span className="font-medium">Balance:</span> {balance} LUCA
      </p>
    </div>
  )
}

export default WalletInfo

