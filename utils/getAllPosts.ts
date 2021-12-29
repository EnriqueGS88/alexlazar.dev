import getPostsSlugs from "../utils/getPostsSlugs";
import getPostBySlug from "./getPostBySlug";

export function getAllPosts(fields = []) {
  const slugs = getPostsSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.meta.date > post2.meta.date ? -1 : 1));
  return posts;
}
