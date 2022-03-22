import Script from "next/script";
import { useEffect } from "react";
import What3Words from "../components/What3Words";

const MapPage = () => {

    useEffect(() => {
        const w3wIcon = L.icon({
            iconUrl: "https://map.what3words.com/map/marker.png",
            iconSize: [64, 64], // size of the icon
            iconAnchor: [25, 59] // point of the icon which will correspond to marker's location
        });

        const map = L.map('map', {zoomControl: false}).setView([51.520847, -0.195521], 16);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxNativeZoom:19,
            maxZoom:25
        }).addTo(map);
        
        const nav = new L.Control.Zoom({ position: "bottomright" }).addTo(map);

        map.addControl(nav, 'bottom-right');

        const markers = [];

        const autosuggest = document.getElementById("autosuggest");
        autosuggest.addEventListener("selected_suggestion", (value) => {
          console.log("[EVENT:select]", value.detail.suggestion.words);
            // Call the what3words Forward API to obtain the latitude and longitude of the three word address provided
            what3words.api
                .convertToCoordinates(value.detail.suggestion.words)
                .then(function (response) {
                    console.log("[convertToCoordinates]", response);
                    if (response.coordinates) {
                    // Clear out the old markers.
                    markers.forEach(function (marker) {
                        marker.remove();
                    });
                    markers = [];

                    const marker = L.marker(
                        [response.coordinates.lat, response.coordinates.lng],
                        { icon: w3wIcon }
                    ).addTo(map);

                    // Create a marker for the location
                    markers.push(marker);

                    // Center the map on that location, and zoom in on it to display the grid
                    map.setView(
                        [response.coordinates.lat, response.coordinates.lng],
                        18
                    );
                    }
                })
        });
    }, [])

    return (
        <>
            <Script
                type="module" 
                src={`https://cdn.what3words.com/javascript-components@4-latest/dist/what3words/what3words.esm.js?key=${process.env.NEXT_PUBLIC_WHAT3WORDS_API_KEY}`}
            ></Script>
            <Script
                nomodule 
                src={`https://cdn.what3words.com/javascript-components@4-latest/dist/what3words/what3words.js?key=${process.env.NEXT_PUBLIC_WHAT3WORDS_API_KEY}`}
            ></Script>
            <Script 
                strategy="beforeInteractive" src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js"
                integrity="sha512-GffPMF3RvMeYyc1LWMHtK8EbPv0iNZ8/oTtHPx9/cc2ILxQ+u905qIwdpULaqDkyBKgOaB57QTMg7ztg8Jm2Og=="
                crossorigin=""
            />
            <div id="wrapper" className="relative h-full">
                <div className="absolute top-[10px] left-[10px] z-[500]">
                    <What3Words />
                </div>
                <div id="map" className="w-full h-[400px]"></div>
            </div>
        </>
    )
}

export default MapPage;