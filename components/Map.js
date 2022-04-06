import Script from "next/script";
import { useEffect, useState } from "react";
import What3Words from "./What3Words";

const Map = () => {
    const [map, setMap] = useState(null)

    const initialiseMap = () => {
      const leafletMap = L.map("map", { zoomControl: false }).setView(
        [51.520847, -0.195521],
        16
      )
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributor',
        maxNativeZoom: 19,
        maxZoom: 25,
      }).addTo(leafletMap)
      const nav = new L.Control.Zoom({ position: "bottomright" }).addTo(
        leafletMap
      )
      leafletMap.addControl(nav, "bottom-right")
      const w3wIcon = renderIcon()
      modifyAutoSuggest(w3wIcon, leafletMap)
      setMap(leafletMap)
    }
  
    const renderIcon = () => {
      return L.icon({
        iconUrl: "https://map.what3words.com/map/marker.png",
        iconSize: [64, 64], // size of the icon
        iconAnchor: [25, 59], // point of the icon which will correspond to marker"s location
      })
    }
  
    const modifyAutoSuggest = (w3wIcon, leafletMap) => {
      const markers = [];
      const autosuggest = document.getElementById("autosuggest")
      autosuggest.addEventListener("selected_suggestion", (value) => {
        autoSuggestListener(w3wIcon, leafletMap, markers, value)
      })
    }
  
    const autoSuggestListener = (w3wIcon, leafletMap, markers, value) => {
      console.log("[EVENT:select]", value.detail.suggestion.words)
      // Call the what3words Forward API to obtain the latitude and longitude of the three word address provided
      what3words.api
        .convertToCoordinates(value.detail.suggestion.words)
        .then(function (response) {
          console.log("[convertToCoordinates]", response)
          if (response.coordinates) {
            // Clear out the old markers.
            markers.forEach(function (marker) {
              marker.remove()
            })
            markers = []
  
            const marker = L.marker(
              [response.coordinates.lat, response.coordinates.lng],
              { icon: w3wIcon }
            ).addTo(leafletMap)
  
            // Create a marker for the location
            markers.push(marker)
  
            // Center the leafletMap on that location, and zoom in on it to display the grid
            leafletMap.setView(
              [response.coordinates.lat, response.coordinates.lng],
              18
            )
          }
        })
    }
  
    const drawGrid = () => {
      const zoom = map.getZoom()
      const loadFeatures = zoom > 17
      let grid_layer;
  
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
            if (typeof grid_layer !== "undefined") {
              map.removeLayer(grid_layer)
            }
  
            // Create a new GeoJSON layer, based on the GeoJSON returned from the what3words API
            grid_layer = L.geoJSON(data, {
              style: function () {
                return {
                  color: "#777",
                  stroke: true,
                  weight: 0.5,
                }
              },
            }).addTo(map)
          })
          .catch(console.error)
      } else {
        // If the grid layer already exists, remove it as the zoom level no longer requires the grid to be displayed
        if (typeof grid_layer !== "undefined") {
          map.removeLayer(grid_layer)
        }
      }
    }
  
    useEffect(() => {
      if (map) {
        map.whenReady(drawGrid)
        map.on("move", drawGrid)
      //   map.on("zoomlevelschange", drawGrid)
      //   map.on("zoomend", drawGrid)
      // map.on("zoomstart", drawGrid)
      map.on("resize", drawGrid)
  
      }
    }, [map])
  
    return (
      <>
        <Script
          type="module"
          src={`https://cdn.what3words.com/javascript-components@4-latest/dist/what3words/what3words.esm.js?key=${process.env.NEXT_PUBLIC_WHAT3WORDS_API_KEY}`}
        ></Script>
        <Script
          src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js"
          integrity="sha512-GffPMF3RvMeYyc1LWMHtK8EbPv0iNZ8/oTtHPx9/cc2ILxQ+u905qIwdpULaqDkyBKgOaB57QTMg7ztg8Jm2Og=="
          crossorigin=""
          onLoad={initialiseMap}
        />
        <div id="wrapper" className="relative h-full">
          <div className="absolute top-[10px] left-[10px] z-[500]">
            <What3Words />
          </div>
          <div id="map" className="h-[400px] w-full"></div>
        </div>
      </>
    )
}

export default Map;