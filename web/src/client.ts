import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'


export const client = sanityClient({
    projectId: "1pw49hcr",
    dataset: "production",
    apiVersion: "2022-06-01",
    useCdn: true,
    token: "skwKgNTMD8rLNeJP3PubDUwIBj1gtP8EekTZui2wxBK7azbXCIip9mSqQisT8cA1eXgi4dAYeKM4uKG6Jw7rIQI8xYTfLDt1bUFHiwuTbBZPYyfisTOCdDJV4LHE7IQ6Hh92JhaeCZ0Oh00CpmwS1WFsE63eum4Ivz0oAtP8PuUI8VOqa9A0",
});


const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => builder.image(source)