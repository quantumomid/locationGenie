import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "contentful";
import { ContentfulResponse } from ".";

type Data = {
    matched: boolean;
    description: string;
    name: string;
}

// For getting specific location data
export default async function locationHandler (req: NextApiRequest, res: NextApiResponse<Data>) {
    // console.log(req);
    const location = req.query.location[0];

    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID || "",
        accessToken: process.env.CONTENTFUL_ACCESS_KEY || "",
    });

    try {
        const response: ContentfulResponse = await client.getEntries({
            content_type: "location",
            "fields.name": location.toLowerCase()
        });
        
        // console.log(response.items);
        const { name, summary } = response.items[0].fields;

        res.status(200).json({ matched: true, description: summary, name: name });
    } catch (error) {
        res.status(200).json({ matched: false, description: "No data found for provided location. Please try again", name: "" });
    }
}