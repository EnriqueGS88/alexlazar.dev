import fs from "fs";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

/**
 *
 * @returns an array of slugs of all .md posts in the _posts directory
 */
export default function getPostSlugs(): string[] {
  return fs.readdirSync(postsDirectory);
}
