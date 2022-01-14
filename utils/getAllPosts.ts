import getPostsSlugs from "../utils/getPostsSlugs";
import getPostBySlug from "./getPostBySlug";
import IfcPost from "../utils/IfcPost";

/**
 *
 * @returns an array of all posts
 */
export default function getAllPosts(): IfcPost[] {
  const slugs = getPostsSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.meta.date > post2.meta.date ? -1 : 1));
  return posts;
}
// TODO it would be cool if this would only return articles that have a date equal or earliet to today
// which would make it super easy to schedule articles
