import IfcPost from "./IfcPost";
import getAllPosts from "./getAllPosts";

/**
 * @param howMany how many articles you want return
 * @returns an array of random posts
 */
export default function getRandomPosts(howMany: number): IfcPost[] {
  const posts = getAllPosts();
  const shuffledPosts = shuffle(posts);

  return shuffledPosts.slice(0, howMany);
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
