import { createClient } from "contentful";

// Gives all location data
export default async function AllLocationHandler (req, res) {
    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_KEY,
    });

    const response = await client.getEntries({
        content_type: "location",
    });

    const locationsData = response.items.map(locationData => ({ name: locationData.fields.name, summary: locationData.fields.summary }));

    console.log(response);
    res.status(200).json({ locations: locationsData });
}