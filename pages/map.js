import Link from "next/link";
import { useEffect } from "react"
import Map from "../components/Map"

const MapPage = () => {

  useEffect(() => {
    speechSynthesis.cancel(); // Stop any currently recited speech
  }, []);

  return (
    <main className="min-h-screen p-4 bg-slate-900">
      <h1 className="text-5xl text-center font-bold mb-10 text-white">Welcome to the Map page 🗺!</h1>
      <Map />
      <h2 className="text-2xl text-white mt-5">Click <Link href="/"><a className="underline">here</a></Link> to return back to the home page 🏡!</h2>
    </main>
  )
}

export default MapPage
