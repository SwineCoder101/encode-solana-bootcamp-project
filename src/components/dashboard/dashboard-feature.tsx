// 'use client'

// import { AppHero } from '../ui/ui-layout'

// const links: { label: string; href: string }[] = [
//   { label: 'Solana Docs', href: 'https://docs.solana.com/' },
//   { label: 'Solana Faucet', href: 'https://faucet.solana.com/' },
//   { label: 'Solana Cookbook', href: 'https://solanacookbook.com/' },
//   { label: 'Solana Stack Overflow', href: 'https://solana.stackexchange.com/' },
//   { label: 'Solana Developers GitHub', href: 'https://github.com/solana-developers/' },
// ]

// export default function DashboardFeature() {
//   return (
//     <div>
//       <AppHero title="Wellcome" subtitle=" " />
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

'use client';

import { AppHero } from '../ui/ui-layout';
import toast, { Toaster } from 'react-hot-toast';

const links: { label: string; href: string }[] = [
  { label: 'Solana Docs', href: 'https://docs.solana.com/' },
  { label: 'Solana Faucet', href: 'https://faucet.solana.com/' },
  { label: 'Solana Cookbook', href: 'https://solanacookbook.com/' },
  { label: 'Solana Stack Overflow', href: 'https://solana.stackexchange.com/' },
  { label: 'Solana Developers GitHub', href: 'https://github.com/solana-developers/' },
];

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
      {/* Hero Section */}
      <AppHero title="Wellcome To our Project" subtitle="" />

      {/* Toast Container */}
      <Toaster position="top-right" />

      {/* Buttons Section */}
      <div className="max-w-xl mx-auto py-6 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-between items-center space-x-4 mb-6">
          {/* Create Project Button */}
          <button
            onClick={handleCreateProject}
            className="btn btn-primary text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Create Project
          </button>

          {/* Presentation Button */}
          <button
            onClick={() => {
              window.location.href = '/presentation'; // Navigate to the Presentation page
            }}
            className="btn btn-secondary text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Presentation
          </button>
        </div>

        {/* Helpful Links */}
        <div className="space-y-2">
          <p>Here are some helpful links to get you started.</p>
          {links.map((link, index) => (
            <div key={index}>
              <a href={link.href} className="link" target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
