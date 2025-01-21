"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"
import { ethers } from "ethers"
import { getLucatoniContract } from "../utils/blockchain"

interface WalletContextType {
  address: string | null
  balance: string
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  sendTokens: (to: string, amount: string) => Promise<void>
  transactions: { type: string; amount: string; date: Date }[]
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState("0")
  const [transactions, setTransactions] = useState<{ type: string; amount: string; date: Date }[]>([])

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        if (window.ethereum && window.ethereum.request) {
          await window.ethereum.request({ method: "eth_requestAccounts" })
        } else {
          throw new Error("MetaMask is not installed or request method is not available")
        }
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const address = await signer.getAddress()
        setAddress(address)
        updateBalance(address)
      } catch (error) {
        console.error("Failed to connect wallet:", error)
      }
    } else {
      console.error("MetaMask is not installed")
    }
  }

  const disconnectWallet = () => {
    setAddress(null)
    setBalance("0")
  }

  const updateBalance = async (address: string) => {
    const contract = getLucatoniContract()
    const balance = await contract.balanceOf(address)
    setBalance(ethers.utils.formatEther(balance))
  }

  const sendTokens = async (to: string, amount: string) => {
    if (!address) throw new Error("Wallet not connected")
    const contract = getLucatoniContract()
    const tx = await contract.transfer(to, ethers.utils.parseEther(amount))
    await tx.wait()
    updateBalance(address)
    // Add transaction to history
    setTransactions((prev) => [...prev, { type: "Send", amount, date: new Date() }])
  }

  useEffect(() => {
    if (address) {
      updateBalance(address)
    }
  }, [address])

  return (
    <WalletContext.Provider value={{ address, balance, connectWallet, disconnectWallet, sendTokens, transactions }}>
      {children}
    </WalletContext.Provider>
  )
}

