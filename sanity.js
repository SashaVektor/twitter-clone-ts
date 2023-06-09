import {createClient} from "next-sanity"

export const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    projectId: process.env.NEXT_PUBLIC_SANITY_ID,
    apiVersions: "2021-03-05",
    useCdn: process.env.NODE_ENV === "production"
}

export const sanityClient = createClient(config)