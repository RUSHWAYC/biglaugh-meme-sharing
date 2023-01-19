//Connecting Sanity backend with the front end.
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

//Sanity data.
export const client = sanityClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2023-01-04",
  useCdn: true,
  token: process.env.REACT_APP_SANITY_TOKEN,
  ignoreBrowserTokenWarning: true,
});

//Sanity image builder from image links.
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
