'use client';

import { LandingPage } from '../components/landing-page';

export default function Home() {
  console.log("Home component is rendering");
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white relative">
      <div className="relative z-10 w-full h-full">
        <LandingPage />
      </div>
    </div>
  );
}