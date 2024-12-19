'use client';

import { AppHero } from '../ui/ui-layout';
import toast, { Toaster } from 'react-hot-toast';
import { FaFileAlt, FaProjectDiagram, FaDollarSign } from 'react-icons/fa';

export default function DashboardFeature() {
  const handleCreateProject = () => {
    // Show toast notification for 5 seconds
    toast.success('Project has been created', {
      duration: 5000, // Toast stays for 5 seconds
    });

    // Navigate to the Create Project page after a slight delay
    setTimeout(() => {
      window.location.href = '/profile_page';
    }, 500); // Adjust delay to ensure toast is shown before navigation
  };

  return (
    <div>
      <AppHero 
        title="Solara" 
        subtitle="Empowering Climate Action with Secure and Transparent Carbon Credit Trading" 
      />

      <Toaster position="top-right" />

      <div className="max-w-xl mx-auto py-6 sm:px-6 lg:px-8 text-center">
        {/* App Description */}
        <p className="mb-8 text-xl">
          Solara is your gateway to a sustainable future. Our platform enables secure, transparent, and efficient carbon credit trading using blockchain technology. 
          Whether you're offsetting emissions or funding impactful climate projects, Solara simplifies the process, empowering you to make a real difference.
        </p>

        {/* How It Works Section */}
        <div className="mb-8 text-left bg-blue-50 p-6 rounded-md border border-blue-300">
          <h3 className="text-2xl font-bold text-blue-700 mb-4">How It Works</h3>
          <ol className="list-none space-y-4">
            <li className="flex items-center space-x-3">
              <FaFileAlt className="text-blue-500 text-2xl" />
              <span className="text-lg text-gray-800">
                <strong>Step 1:</strong> Fill out your project proposal with details about your climate initiative.
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <FaProjectDiagram className="text-green-500 text-2xl" />
              <span className="text-lg text-gray-800">
                <strong>Step 2:</strong> Create your project and attract supporters on the platform.
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <FaDollarSign className="text-yellow-500 text-2xl" />
              <span className="text-lg text-gray-800">
                <strong>Step 3:</strong> Wait for the funds to settle through our secure escrow system, then withdraw with ease.
              </span>
            </li>
          </ol>
        </div>

        {/* Buttons Section */}
        <div className="flex justify-between items-center space-x-4 mb-6">
          {/* Create Project Button */}
          <button
            onClick={handleCreateProject}
            className="btn btn-primary text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Create Project
          </button>

          {/* Presentation Button */}
          {/* <button
            onClick={() => {
              window.location.href = '/presentation'; // Navigate to the Presentation page
            }}
            className="btn btn-secondary text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Presentation
          </button> */}
        </div>
      </div>

      {/* Epilogue Section */}
      <div className="max-w-xl mx-auto py-6 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-700 text-lg font-medium">
          Together, we can create a cleaner, greener future. Join Solara today and take meaningful action toward a net-zero world.
        </p>
      </div>
    </div>
  );
}
