export default function ProjectProfile() {

  const handleDeposit = async () => {
  }

  const handleWithdraw = async () => {
  }

  const getUserUSDCBalance = async () => {
  }

  const getEscrowBalance = async () => {
  }

  const getDepositListForUser = async () => {

  }

  const getEscrowAddress = async () => {
    
  }

  return (
    <div className="bg-gray-900 min-h-screen">


      {/* Main Container */}
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-white-800 mb-8 text-center">
          Renewable Energy Farm
        </h1>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <span>User Balance: 10,000</span>
            </div>
            <br />
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full p-2 border rounded mb-4"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
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
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
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
              <span>10,000 USDC</span>
            </div>
          </div>

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
              Location & Image
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
                <span><strong>Owner Wallet:</strong> 0x1234...abcd</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-teal-600">⏰</span>
                <span><strong>Proposal Timestamp:</strong> 2024-12-19 10:00 AM</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-teal-600">📊</span>
                <span><strong>Status:</strong> Pending Approval</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-teal-600">💰</span>
                <span><strong>Requested Fund Amount:</strong> $50,000</span>
              </li>
              <li className = "flex items-center space-x-2">
                <span className="text-teal-600">🌐</span>
                <span><strong>Website:</strong> <a href="https://www.renewableenergyfarm.com" target="_blank" rel="noopener noreferrer">Renewable Energy Farm</a></span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-teal-600">🕒</span>
                <span><strong>Expiration Date:</strong> 2025-12-19 10:00 AM</span>
              </li>
            </ul>
          </div>

          {/* Total USD Balance */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-bold mb-2 text-pink-500">
              Total USD Balance
            </h2>
            <p className="text-2xl font-semibold text-pink-600">
              $15,000
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
