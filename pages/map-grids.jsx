import Script from 'next/script'
import { useState } from 'react'
import { useEffect } from 'react'

const MapPage = () => {
  const [map, setMap] = useState(null)

  function drawGrid() {
    const zoom = map.getZoom()
    const loadFeatures = zoom > 17

    if (loadFeatures) {
      // Zoom level is high enough
      var ne = map.getBounds().getNorthEast()
      var sw = map.getBounds().getSouthWest()

      // Call the what3words Grid API to obtain the grid squares within the current visble bounding box
      what3words.api
        .gridSectionGeoJson({
          southwest: {
            lat: sw.lat,
            lng: sw.lng,
          },
          northeast: {
            lat: ne.lat,
            lng: ne.lng,
          },
        })
        .then(function (data) {
          // If the grid layer is already present, remove it as it will need to be replaced by the new grid section
          if (typeof grid_layer !== 'undefined') {
            map.removeLayer(grid_layer)
          }

          // Create a new GeoJSON layer, based on the GeoJSON returned from the what3words API
          grid_layer = L.geoJSON(data, {
            style: function () {
              return {
                color: '#777',
                stroke: true,
                weight: 0.5,
              }
            },
          }).addTo(map)
        })
        .catch(console.error)
    } else {
      // If the grid layer already exists, remove it as the zoom level no longer requires the grid to be displayed
      if (typeof grid_layer !== 'undefined') {
        map.removeLayer(grid_layer)
      }
    }
  }

  useEffect(() => {
    if (map) {
      map.whenReady(drawGrid)
      map.on('move', drawGrid)
    }
  }, [map])

  return (
    <div>
      <Script
        id="what3word-js"
        strategy="beforeInteractive"
        src={`https://cdn.what3words.com/javascript-components@4-latest/dist/what3words/what3words.js?key=${process.env.NEXT_PUBLIC_WHAT3WORDS_API_KEY}`}
      />
      <Script
        id="leaflet-js"
        src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js"
        integrity="sha512-GffPMF3RvMeYyc1LWMHtK8EbPv0iNZ8/oTtHPx9/cc2ILxQ+u905qIwdpULaqDkyBKgOaB57QTMg7ztg8Jm2Og=="
        crossorigin=""
        onLoad={() => {
          const mapVar = L.map('map').setView([51.505, -0.09], 19)
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxNativeZoom: 19,
            maxZoom: 25,
          }).addTo(mapVar)
          setMap(mapVar)
        }}
      />
      <div className='h-full w-full absolute'>
        <h1>Map:</h1>
        <div id="map"></div>
      </div>
    </div>
  )
}

export default MapPage
