import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import IfcPostMeta from "../utils/IfcPostMeta";
import IfcPost from "./IfcPost";

/**
 *
 * @param slug a string representing the slug of the post you want
 * @returns the post with the respective slug
 */
export default function getPostBySlug(slug: string): IfcPost {
  const realSlug = slug.replace(/\.md$/, "");
  const docsDirectory = join(process.cwd(), "_posts");
  const fullPath = join(docsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // ts flags the meta for some reason
  //@ts-ignore
  return { slug: realSlug, meta: data, content };
}
