import { defineCollection, z } from "astro:content";
const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    heading: z.string(),
    sub_heading: z.string(),
    author: z.string(),
    pubdate: z.date(),
    img: z.string(),
  }),
});

export const collections = {
  blog: blogCollection,
};
