import type { NextPage } from "next";
import React, { useState } from "react";
import LocationInfo from "../components/LocationInfo";
import SearchInput from "../components/SearchInput";
import LandingScreen from "../components/LandingScreen";

const Home: NextPage = () => {
  const [ startSearch, setStartSearch ] = useState(false);
  const [ searchInput, setSearchInput ] = useState<string>("");
  const [ locationDetails, setLocationDetails ] = useState({
    name: "",
    description: ""
  });

  const handleStart = () => {
    const opening = "Welcome to the Location Genie. This is an application where you can explore information regarding various areas around the globe. Tell us a location you would like to learn more about."
    const openingUtterance = new SpeechSynthesisUtterance(opening);
    speechSynthesis.speak(openingUtterance);
    setStartSearch(true)
  }

  const handleSearch = async(event: any) => {
    event.preventDefault();
    speechSynthesis.cancel(); // Stop any currently recited speech

    let textToRead = "No information found!" // default
    if(searchInput){
      const locationEndPoint = `/api/locations/${searchInput}`;
      const response = await fetch(locationEndPoint);
      const data = await response.json();
      console.log(data);
      setLocationDetails({
        name: data.name,
        description: data.description
      })
      textToRead = data.description;
      if(data.matched){
        document.getElementById("form-search")?.scrollIntoView();
      }
    }

    let utterance = new SpeechSynthesisUtterance(textToRead);
    speechSynthesis.speak(utterance);
  }

  if(!startSearch) return <LandingScreen handleStart={handleStart} />

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-slate-900 text-white">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-10 text-center">
        <h1 className="text-6xl font-bold mb-10">
          Welcome to the Location Genie <span className="font-medium">🧞</span>
        </h1>
        <p className="text-4xl font-medium text-slate-500 mb-10">Tell us a location you would like to learn more about.</p>
        <SearchInput searchInput={searchInput} handleSearch={handleSearch} setSearchInput={setSearchInput} />
        {searchInput && <LocationInfo name={locationDetails.name} description={locationDetails.description} />}
      </main>
    </div>
  )
}

export default Home;