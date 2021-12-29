import Head from "next/head";
import Navbar from "../components/Navbar";
import Metatags from "../components/Metatags";
import Footer from "../components/Footer";
import Link from "next/link";
import getAllPosts from "../utils/getAllPosts";
import IfcPost from "../utils/IfcPost";
import Button from "../components/Button";

export async function getStaticProps(context) {
  const posts = getAllPosts();
  return {
    props: { posts },
    revalidate: 60 * 60 * 24, // revalidate daily
  };
}

export default function Home({ posts }: { posts: IfcPost[] }) {
  return (
    <div className="font-mono">
      <Head>
        <title>Alex Lazar - Blog</title>
        <Metatags
          title="Alex Lazar - Blog"
          description="Just a tech blog."
          url="https://alexlazar.dev"
          imageUrl="https://alexlazar.dev/404.jpg"
        />
      </Head>

      <Navbar />

      <div className="z-[-1] bg-white dark:bg-gray-900 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
          <div>
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              {"I'm"} Alex
            </h2>
            <div className="mt-3 sm:mt-4">
              <p className="mt-3 max-w-4xl text-xl text-gray-500 dark:text-purple-200 sm:mt-4">
                {"I'm"} a front-end focused engineer working on web3 projects.
                On this blog, I will try my best to document my career and
                learning experiences.
              </p>
            </div>
          </div>
          <div className="mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
            {posts.map((post) => (
              <div
                key={post.meta.title}
                className="flex flex-col border-2 border-black overflow-hidden"
              >
                <div className="z-[2] relative flex-1 bg-yellow-50 dark:bg-gray-700 p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">
                      <span className="inline-block bg-black px-3 py-2">
                        {post.meta.category}
                      </span>
                    </p>
                    <Link href={`/posts/${post.slug}/`}>
                      <a className="block mt-2 hover:opacity-60">
                        <p className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                          {post.meta.title}
                        </p>
                        <p className="mt-3 text-base text-gray-700 dark:text-gray-100">
                          {post.meta.excerpt}
                        </p>
                      </a>
                    </Link>
                    <Button type="link" href={`/posts/${post.slug}/`}>
                      <div className="relative left-1 transition-all opacity-80 group-hover:left-0 group-hover:opacity-100">
                        Read more
                        <span className="transition-all group-hover:opacity-0 group-hover:">
                          ...
                        </span>
                        <span className="relative transition-all opacity-0 left-0 group-hover:opacity-100 group-hover:-left-4">
                          {"👀"}
                        </span>
                      </div>
                    </Button>
                  </div>
                </div>
                <figcaption className="relative bg-black px-6 py-2 flex items-center text-sm text-white">
                  <div className="flex space-x-1">
                    <time dateTime={post.meta.date}>{post.meta.date}</time>
                    <span aria-hidden="true">&middot;</span>
                    <span>{post.meta.readingTime} read</span>
                  </div>
                </figcaption>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
