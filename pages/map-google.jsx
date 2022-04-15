import React, { useState, useEffect } from 'react'
import Script from 'next/script'
import { drawGrids } from '../utils/google-map-utils'

const MapWithGoogle = (props) => {
  const [w3w, setW3w] = useState(null)
  const [googleMap, setGoogleMap] = useState(null)
  const [scriptStatus, setScriptStatus] = useState('Not Loaded')

  const renderMap = () => {
    let map = new googleMap.Map(document.getElementById('map'), {
      center: { lat: 51.52086, lng: -0.195499 },
      zoom: 19,
    })
    drawGrids(map, w3w)
  }

  const onW3wLoad = () => {
    setW3w(what3words)
  }
  const onGoogleMapLoad = () => {
    setGoogleMap(google.maps)
  }

  useEffect(() => {
    // console.log(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY)
    if (w3w && googleMap) {
      setScriptStatus('Loaded')
      renderMap()
    }
  }, [w3w, googleMap])

  return (
    <div>
      <Script
        id="what3word-js"
        src={`https://cdn.what3words.com/javascript-components@4-latest/dist/what3words/what3words.js?key=${process.env.NEXT_PUBLIC_WHAT3WORDS_API_KEY}`}
        onLoad={onW3wLoad}
      />
      <Script
        id="google-map-js"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`}
        onLoad={onGoogleMapLoad}
      />
      <h1>Script Status: {scriptStatus}</h1>
      <div id="map" className="absolute h-full w-full"></div>
    </div>
  )
}

export default MapWithGoogle
