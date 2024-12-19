"use client";

import { useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import { getConnection, getKeypair, getTokenBalance, transferTokens } from '../util/spl-utils';
import { useWallet } from '@solana/wallet-adapter-react';
import { USDC_COIN_ADDRESS } from '../config/TokenConfig';

export default function ProjectProfile() {
  const {publicKey} = useWallet();
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [userBalance, setUserBalance] = useState<number>(0);
  const [escrowBalance, setEscrowBalance] = useState<number>(0);

  const operatorWallet = '9MAocRkm8bcUz2GGM4jNHZ6hWiQbiw5y6uxkV93cjWZ8';
  const userPublicKey = publicKey || new PublicKey(operatorWallet); // Replace with actual user public key


  const handleDeposit = async () => {
    try {
      const connection = getConnection();
      const payer = new PublicKey(operatorWallet);
      const recipient = userPublicKey;
      const mintAddress = new PublicKey('MINT_ADDRESS'); // Replace with actual mint address

      const signature = await transferTokens(connection, payer, payer, recipient, mintAddress, depositAmount);
      console.log('Deposit successful, signature:', signature);
    } catch (error) {
      console.error('Error during deposit:', error);
    }
  };

  const handleWithdraw = async () => {
    try {
      const response = await fetch('/api/withdraw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipient: userPublicKey.toBase58, // Replace with actual recipient public key
          amount: withdrawAmount,
          mintAddress: USDC_COIN_ADDRESS, // Replace with actual mint address
        }),
      });

      const data = await response.json();
      if (data.success) {
        console.log('Withdraw successful, signature:', data.signature);
      } else {
        console.error('Withdraw failed:', data.error);
      }
    } catch (error) {
      console.error('Error during withdraw:', error);
    }
  };

  const getUserUSDCBalance = async () => {
    try {
      const connection = getConnection();
      const mintAddress = new PublicKey('MINT_ADDRESS'); // Replace with actual mint address

      const balance = await getTokenBalance(connection, userPublicKey, mintAddress);
      setUserBalance(balance);
    } catch (error) {
      console.error('Error fetching user balance:', error);
    }
  };

  const getEscrowBalance = async () => {
    try {
      const connection = getConnection();
      const escrowPublicKey = new PublicKey('ESCROW_PUBLIC_KEY'); // Replace with actual escrow public key
      const mintAddress = new PublicKey('MINT_ADDRESS'); // Replace with actual mint address

      const balance = await getTokenBalance(connection, escrowPublicKey, mintAddress);
      setEscrowBalance(balance);
    } catch (error) {
      console.error('Error fetching escrow balance:', error);
    }
  };

  // fetch small string
  const getEscrowAddress = async () => {
    return operatorWallet.substring(0, 5) + '...' + operatorWallet.substring(operatorWallet.length - 5, operatorWallet.length);
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Main Container */}
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-white-800 mb-8 text-center">
          Renewable Energy Farm
        </h1>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Project Description */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-bold mb-2 text-yellow-500">
              Project Description
            </h2>
            <p className="text-gray-700">
              The Renewable Energy Farm project focuses on creating a sustainable source of clean energy for local communities. Funds raised will support the development of wind and solar energy farms, including infrastructure, equipment, and maintenance. This initiative aims to reduce carbon emissions while providing affordable energy to underprivileged areas.
            </p>
          </div>

          {/* Location & Image */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-bold mb-2 text-indigo-500">
              Location
            </h2>
            <p className="text-gray-700 mb-2">Location: San Francisco, CA</p>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Wind_turbines_in_southern_California_2016.jpg/330px-Wind_turbines_in_southern_California_2016.jpg"
              alt="Project Image"
              className="rounded-md"
            />
          </div>

          {/* Fund Details */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-bold mb-2 text-teal-500">
              Fund Details
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center space-x-2">
                <span className="text-teal-600">📋</span>
                <span><strong>Owner Wallet:</strong> {getEscrowAddress()}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-teal-600">⏰</span>
                <span><strong>Proposal Timestamp:</strong> 2024-12-19 10:00 AM</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-teal-600">📊</span>
                <span><strong>Status:</strong> Active</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-teal-600">💰</span>
                <span><strong>Requested Fund Amount:</strong> $50,000</span>
              </li>
              <li className = "flex items-center space-x-2">
                <span className="text-teal-600">🌐</span>
                <span><strong>Website:</strong> <a href="https://www.renewableenergyfarm.com" target="_blank" rel="noopener noreferrer">Green Connect Renewables</a></span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-teal-600">🕒</span>
                <span><strong>Expiration Date:</strong> 2025-12-19 10:00 AM</span>
              </li>
            </ul>
          </div>

          {/* Deposit Token */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-bold mb-2 text-blue-500">
              Deposit Amount
            </h2>
            <p className="text-gray-700 mb-4">
              Make a contribution to offset your carbon footprint.
            </p>
            <div className="flex items-center space-x-2 text-2xl font-semibold text-blue-600">
              <img 
                src="/usd-coin-usdc-logo.png" 
                alt="USDC Logo" 
                className="w-8 h-8" 
              />
              <span>User Balance: {userBalance}</span>
            </div>
            <br />
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full p-2 border rounded mb-4"
              value={depositAmount}
              onChange={(e) => setDepositAmount(Number(e.target.value))}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              onClick={handleDeposit}
            >
              Deposit Now
            </button>
          </div>

          {/* Withdraw Token */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-bold mb-2 text-green-500">
              Cancel Deposit
            </h2>
            <p className="text-gray-700 mb-4">
              Withdraw tokens securely from the project escrow. Please select the deposits you wish to cancel.
            </p>
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full p-2 border rounded mb-4"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(Number(e.target.value))}
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              onClick={handleWithdraw}
            >
              Withdraw Now
            </button>
          </div>

          {/* Display Escrow Balances */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-bold mb-2 text-purple-500">
              Current Funds
            </h2>
            <p className="text-gray-700 mb-4">
              Total Contributions thus far:
            </p>
            <div className="flex items-center space-x-2 text-2xl font-semibold text-purple-600">
              <img 
                src="/usd-coin-usdc-logo.png" 
                alt="USDC Logo" 
                className="w-8 h-8" 
              />
              <span>{escrowBalance} USDC</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}