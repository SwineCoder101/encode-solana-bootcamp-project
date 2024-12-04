'use client'

import { AppHero } from '../ui/ui-layout'

const links: { label: string; href: string }[] = [
  { label: 'Solana Docs', href: 'https://docs.solana.com/' },
  { label: 'Solana Faucet', href: 'https://faucet.solana.com/' },
  { label: 'Solana Cookbook', href: 'https://solanacookbook.com/' },
  { label: 'Solana Stack Overflow', href: 'https://solana.stackexchange.com/' },
  { label: 'Solana Developers GitHub', href: 'https://github.com/solana-developers/' },
]

export default function DashboardFeature() {
//   return (
//     <div>
//       <AppHero title="gm" subtitle="Say hi to your new Solana dApp." />
//       <div className="max-w-xl mx-auto py-6 sm:px-6 lg:px-8 text-center">
//         <div className="space-y-2">
//           <p>Here are some helpful links to get you started.</p>
//           {links.map((link, index) => (
//             <div key={index}>
//               <a href={link.href} className="link" target="_blank" rel="noopener noreferrer">
//                 {link.label}
//               </a>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>

//   );
// };
return (
  <div className="min-h-screen bg-gray-900 text-white p-6">
    {/* User Balances Section */}
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">User Balances</h2>
      <p>Total: <span className="font-semibold">$1,000</span></p>
      <p>Escrow: <span className="font-semibold">$700</span></p>
      <p>Available: <span className="font-semibold">$300</span></p>
    </div>

    {/* Escrow Configuration Section */}
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Escrow Configuration</h2>
      <p>Fee: <span className="font-semibold">1%</span></p>
      <p>Status: <span className="font-semibold">Locked</span></p>
      <p>Owner: <span className="font-semibold">User123</span></p>
    </div>

    {/* Widgets Section */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Deposit Widget */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Deposit Funds</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm mb-2">Enter Amount:</label>
            <input
              type="number"
              className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2">Choose Method:</label>
            <select
              className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Bank Transfer</option>
              <option>Crypto</option>
              <option>Card Payment</option>
            </select>
          </div>
          <button
            className="w-full bg-blue-600 text-white hover:bg-blue-500 font-bold py-3 rounded-md transition duration-300"
            type="submit"
          >
            Deposit
          </button>
        </form>
      </div>

      {/* Withdraw Widget */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Withdraw Funds</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm mb-2">Enter Amount:</label>
            <input
              type="number"
              className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2">Choose Destination:</label>
            <select
              className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Bank Account</option>
              <option>Crypto Wallet</option>
            </select>
          </div>
          <button
            className="w-full bg-blue-600 text-white hover:bg-blue-500 font-bold py-3 rounded-md transition duration-300"
            type="submit"
          >
            Withdraw
          </button>
        </form>
      </div>

      {/* Vault Balances */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Vault Balances</h2>
        <p>Pending: <span className="font-semibold">$500</span></p>
        <p>Locked: <span className="font-semibold">$200</span></p>
        <p>Available: <span className="font-semibold">$300</span></p>
      </div>
    </div>
  </div>
);
};

