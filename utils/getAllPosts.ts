import getPostsSlugs from "../utils/getPostsSlugs";
import getPostBySlug from "./getPostBySlug";
import IfcPost from "../utils/IfcPost";

/**
 *
 * @returns an array of all posts, sorted by date (desc.), filtering out the posts that have a date in the future
 */
export default function getAllPosts(): IfcPost[] {
  const slugs = getPostsSlugs();
  const posts = slugs
    // get posts
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.meta.date > post2.meta.date ? -1 : 1))
    // remove posts that have a date in the future
    .filter((post) => {
      if (Date.parse(post.meta.date) > Date.now()) return false;
      return post;
    });
  return posts;
}
