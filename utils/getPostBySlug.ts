import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import IfcPostMeta from "../utils/IfcPostMeta";

export default function getPostBySlug(slug: string): {
  slug: string;
  meta: any; // TODO this could be a IfcPostMeta?
  content: string;
} {
  const realSlug = slug.replace(/\.md$/, "");
  const docsDirectory = join(process.cwd(), "_posts");
  const fullPath = join(docsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { slug: realSlug, meta: data, content };
}
