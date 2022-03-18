import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from "contentful";

export interface LocationItems {
    fields: {
        name: string;
        summary: string;
    }
}

export interface ContentfulResponse {
    items: LocationItems[]
}

export interface LocationData {
    name: string;
    summary: string;
}

type Data = {
    locations: LocationData[]
}

// Gives all location data
export default async function AllLocationHandler (req:NextApiRequest, res:NextApiResponse<Data>) {
    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID || "",
        accessToken: process.env.CONTENTFUL_ACCESS_KEY || "",
    });

    const response: ContentfulResponse = await client.getEntries({
        content_type: "location",
    });

    // console.log(response.items);

    const locationsData = response.items.map((locationData) => ({ name: locationData.fields.name, summary: locationData.fields.summary }));

    // console.log(response);
    res.status(200).json({ locations: locationsData });
}