// import Navbar from "@/components/Navbar";

export default function AdminDashboard() {
  return (
    <div className="bg-gray-900 min-h-screen">
 
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-white-800 mb-8 text-center">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-bold mb-2 text-red-500">
              Withdraw All
            </h2>
            <p className="text-gray-700 mb-4">
              Withdraw all tokens from the escrow account securely.
            </p>
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
              Withdraw All
            </button>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-bold mb-2 text-blue-500">
              Escrow Token Balances
            </h2>
            <p className="text-gray-700 mb-4">
              View the total tokens held in the escrow account.
            </p>
            <div className="text-2xl font-semibold text-blue-600">
              25,000 Tokens
            </div>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-bold mb-2 text-green-500">
              Total USD Balance
            </h2>
            <p className="text-gray-700 mb-4">
              View the equivalent USD balance for the escrowed tokens.
            </p>
            <div className="text-2xl font-semibold text-green-600">
              $30,000
            </div>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-bold mb-2 text-indigo-500">
              Display Escrow Config
            </h2>
            <p className="text-gray-700 mb-4">
              Configuration details for the escrow system:
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Minimum Deposit: 1,000 Tokens</li>
              <li>Withdrawal Fee: 2%</li>
              <li>Admin Contact: admin@example.com</li>
            </ul>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition col-span-1 md:col-span-2">
            <h2 className="text-xl font-bold mb-4 text-yellow-500">
              Update Escrow Config
            </h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="minDeposit"
                  className="block text-gray-700 font-medium"
                >
                  Minimum Deposit
                </label>
                <input
                  type="number"
                  id="minDeposit"
                  placeholder="Enter minimum deposit"
                  className="w-full p-2 border rounded-md focus:ring focus:ring-yellow-300"
                />
              </div>
              <div>
                <label
                  htmlFor="withdrawFee"
                  className="block text-gray-700 font-medium"
                >
                  Withdrawal Fee (%)
                </label>
                <input
                  type="number"
                  id="withdrawFee"
                  placeholder="Enter withdrawal fee"
                  className="w-full p-2 border rounded-md focus:ring focus:ring-yellow-300"
                />
              </div>
              <button
                type="submit"
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
              >
                Update Config
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
