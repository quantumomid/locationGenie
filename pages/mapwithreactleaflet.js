import Link from "next/link";
// import MapWithReactLeaflet from "../components/MapWithReactLeaflet";
import dynamic from 'next/dynamic'
import Script from "next/script";
import { useState } from "react";

const DynamicMapWithReactLeafletComponentWithNoSSR = dynamic(
    () => import("../components/MapWithReactLeaflet"),
    { 
        loading: () => <p>A map is loading</p>,
        ssr: false 
    }
  )

export default function MapWithReactLeafletPage () {
    // const [ hasLeafletLoaded, setHasLeafletLoaded ] = useState(false);

    return (
        <main className="min-h-screen p-4 bg-slate-900">
            <h1 className="text-5xl text-center font-bold mb-24 text-white">Welcome to the Map with React-Leaflet page 🗺!</h1>
                {/* <MapWithReactLeaflet /> */}
            <DynamicMapWithReactLeafletComponentWithNoSSR />
            <h2 className="text-2xl text-white mt-25">Click <Link href="/"><a className="underline">here</a></Link> to return back to the home page 🏡!</h2>
            <Script
                src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js"
                integrity="sha512-GffPMF3RvMeYyc1LWMHtK8EbPv0iNZ8/oTtHPx9/cc2ILxQ+u905qIwdpULaqDkyBKgOaB57QTMg7ztg8Jm2Og=="
                crossOrigin=""
                // onLoad={() => {
                //         console.log(L)
                //         setHasLeafletLoaded(true)
                //     }
                // }
            />
        </main>
        // <>
        //     <DynamicMapWithReactLeafletComponentWithNoSSR />
        //     <Script
        //             src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js"
        //             integrity="sha512-GffPMF3RvMeYyc1LWMHtK8EbPv0iNZ8/oTtHPx9/cc2ILxQ+u905qIwdpULaqDkyBKgOaB57QTMg7ztg8Jm2Og=="
        //             crossOrigin=""
        //             // onLoad={() => {
        //             //         console.log(L)
        //             //         setHasLeafletLoaded(true)
        //             //     }
        //             // }
        //     />
        // </>
    )
}