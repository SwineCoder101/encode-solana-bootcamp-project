// import Navbar from "@/components/Navbar";

export default function ProjectProfile() {
  return (
    <div className="bg-gray-900 min-h-screen">


      {/* Main Container */}
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-white-800 mb-8 text-center">
          Project Profile Page
        </h1>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Deposit Token */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-bold mb-2 text-blue-500">
              Deposit Token
            </h2>
            <p className="text-gray-700 mb-4">
              Add tokens to the project escrow for secure transactions.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              Deposit Now
            </button>
          </div>

          {/* Withdraw Token */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-bold mb-2 text-green-500">
              Withdraw Token
            </h2>
            <p className="text-gray-700 mb-4">
              Withdraw tokens securely from the project escrow.
            </p>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
              Withdraw Now
            </button>
          </div>

          {/* Display Escrow Balances */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-bold mb-2 text-purple-500">
              Escrow Token Balances
            </h2>
            <p className="text-gray-700 mb-4">
              View the current balance of tokens in escrow.
            </p>
            <div className="text-2xl font-semibold text-purple-600">
              10,000 Tokens
            </div>
          </div>

          {/* Project Description */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-bold mb-2 text-yellow-500">
              Project Description
            </h2>
            <p className="text-gray-700">
              This is a brief description of the project goals, status, and
              other important details.
            </p>
          </div>

          {/* Project Name */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-bold mb-2 text-red-500">
              Project Name
            </h2>
            <p className="text-gray-700 mb-4">Escrow Token Management System</p>
          </div>

          {/* Location & Image */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-bold mb-2 text-indigo-500">
              Location & Image
            </h2>
            <p className="text-gray-700 mb-2">Location: San Francisco, CA</p>
            <img
              src="https://via.placeholder.com/150"
              alt="Project Image"
              className="rounded-md"
            />
          </div>

          {/* Total USD Balance */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-bold mb-2 text-pink-500">
              Total USD Balance
            </h2>
            <p className="text-2xl font-semibold text-pink-600">$15,000</p>
          </div>
        </div>
      </div>
    </div>
  );
}
