import React from 'react';
import Image from 'next/image';

export default function Presentation() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Solara</h1>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Introduction</h2>
        <p>
          Climate change demands urgent action. Carbon offsetting mitigates emissions by supporting projects like reforestation and clean energy. A blockchain-based DApp can revolutionize how we trade carbon credits.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Problem Statement</h2>
        <p>
          Industries face hurdles achieving zero emissions, and current offsetting methods lack transparency, risking fraud and inefficiency.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Solution</h2>
        <p>
          A Solana-powered escrow DApp ensures secure, transparent, and cost-effective carbon credit trading, streamlining the path to a net-zero future.
        </p>
        <p>Our DApp empowers individuals and organizations to directly participate in carbon offsetting, making it accessible to all.</p>
        <p>By leveraging blockchain technology, we eliminate intermediaries, reducing transaction costs and accelerating the process.</p>
        <p>Our platform provides real-time tracking of carbon credits, ensuring transparency and accountability.</p>
      </section>

      <h2 className="text-2xl font-bold mb-8">Visualizing the Solution</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Image src="/image1.jpg" alt="Image 1" width={500} height={300} />
          <p>Functionality</p>
        </div>
        <div>
          <Image src="/image3.jpg" alt="Image 2" width={500} height={300} />
          <p>System flow diagram</p>
        </div>
      </div>
    </div>
  );
}