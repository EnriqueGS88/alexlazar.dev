import fs from "fs";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

export default function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}
