import React from "react";

interface LandingScreenProps {
  handleStart: () => void
}

const LandingScreen:React.FC<LandingScreenProps> = ({handleStart}) => (
    <main className="flex min-h-screen flex-col items-center justify-center py-2 bg-slate-900 text-white">
      <h1 className="text-6xl text-center font-bold mb-20">
        Location Genie <span className="font-medium block md:inline-block">🧞</span>
      </h1>
      <button 
        onClick={handleStart} 
        className="p-10 bg-white hover:bg-slate-700 text-slate-700 hover:text-white text-6xl font-bold rounded-2xl"
      >
        Start
      </button>
    </main>
  )

export default LandingScreen;