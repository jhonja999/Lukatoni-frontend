"use client";

import type React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useWallet } from "../contexts/WalletContext";
import Image from "next/image";
import lucatoniLogo from '@/public/lucatoni.jpeg'; // Importación directa

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { address, connectWallet, disconnectWallet } = useWallet();

  return (
    <header className="bg-gradient-to-b from-gray-900 to-gray-800 shadow-lg border-b border-gray-700">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Image
            src={lucatoniLogo} // Nota: la ruta comienza desde public/
            alt="Lucatoni Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-blue-200 to-orange-300 bg-clip-text text-transparent">
            LUCATONI
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-blue-400" />
            )}
          </button>
          {address ? (
            <button
              onClick={disconnectWallet}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-red-500/25"
            >
              Disconnect
            </button>
          ) : (
            <button
              onClick={connectWallet}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
