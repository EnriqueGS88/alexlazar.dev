import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Metatags from "../components/Metatags";
import Footer from "../components/Footer";
import Link from "next/link";

const posts = [
  {
    title: "Boost your conversion rate",
    href: "/posts/test",
    category: { name: "Article", href: "#" },
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    imageUrl:
      "https://images.unsplash.com/photo-1566827954254-0c0692424c04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDF8fHJvbWFuaWF8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60",
    readingTime: "6 min",
    author: {
      name: "Roel Aufderehar",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    title: "How to use search engine optimization to drive sales",
    href: "/posts/test",
    category: { name: "Video", href: "#" },
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro quaerat doloribus, eveniet dolore. Adipisci tempora aut inventore optio animi., tempore temporibus quo laudantium.",
    date: "Mar 10, 2020",
    datetime: "2020-03-10",
    imageUrl:
      "https://images.unsplash.com/photo-1610909762155-02fcc33e03d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHJvbWFuaWF8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60",
    readingTime: "4 min",
    author: {
      name: "Brenna Goyette",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    title: "Improve your customer experience",
    href: "/posts/test",
    category: { name: "Case Study", href: "#" },
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.",
    date: "Feb 12, 2020",
    datetime: "2020-02-12",
    imageUrl:
      "https://images.unsplash.com/photo-1621243277275-ebcce6e6d79e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fHJvbWFuaWF8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60",
    readingTime: "11 min",
    author: {
      name: "Daniela Metz",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    title: "Improve your customer experience",
    href: "/posts/test",
    category: { name: "Case Study", href: "#" },
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.",
    date: "Feb 12, 2020",
    datetime: "2020-02-12",
    imageUrl:
      "https://images.unsplash.com/photo-1621243277275-ebcce6e6d79e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fHJvbWFuaWF8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60",
    readingTime: "11 min",
    author: {
      name: "Daniela Metz",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    title: "Improve your customer experience",
    href: "/posts/test",
    category: { name: "Case Study", href: "#" },
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.",
    date: "Feb 12, 2020",
    datetime: "2020-02-12",
    imageUrl:
      "https://images.unsplash.com/photo-1621243277275-ebcce6e6d79e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fHJvbWFuaWF8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60",
    readingTime: "11 min",
    author: {
      name: "Daniela Metz",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    title: "Improve your customer experience",
    href: "/posts/test",
    category: { name: "Case Study", href: "#" },
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.",
    date: "Feb 12, 2020",
    datetime: "2020-02-12",
    imageUrl:
      "https://images.unsplash.com/photo-1621243277275-ebcce6e6d79e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fHJvbWFuaWF8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60",
    readingTime: "11 min",
    author: {
      name: "Daniela Metz",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    title: "Improve your customer experience",
    href: "/posts/test",
    category: { name: "Case Study", href: "#" },
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.",
    date: "Feb 12, 2020",
    datetime: "2020-02-12",
    imageUrl:
      "https://images.unsplash.com/photo-1621243277275-ebcce6e6d79e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fHJvbWFuaWF8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60",
    readingTime: "11 min",
    author: {
      name: "Daniela Metz",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    title: "Improve your customer experience",
    href: "/posts/test",
    category: { name: "Case Study", href: "#" },
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.",
    date: "Feb 12, 2020",
    datetime: "2020-02-12",
    imageUrl:
      "https://images.unsplash.com/photo-1621243277275-ebcce6e6d79e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fHJvbWFuaWF8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60",
    readingTime: "11 min",
    author: {
      name: "Daniela Metz",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
];

export default function Home() {
  return (
    <div className="font-mono">
      <Head>
        <title>Alex Lazar - Blog</title>
        <Metatags
          title="Alex Lazar - Blog"
          description="Just a tech blog."
          url="https://alexlazar.dev"
          imageUrl="https://alexlazar.dev/images/vercel.svg"
        />
      </Head>

      <Navbar />

      <div className="z-[-1] bg-white dark:bg-gray-900 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
          <div>
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              I'm Alex
            </h2>
            <div className="mt-3 sm:mt-4">
              <p className="mt-3 max-w-4xl text-xl text-gray-500 dark:text-purple-200 sm:mt-4">
                I'm a front-end focused engineer working on web3 projects. On
                this blog, I will try my best to document my career and learning
                experiences.
              </p>
            </div>
          </div>
          <div className="mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
            {posts.map((post) => (
              <div
                key={post.title}
                className="flex flex-col border-2 border-black overflow-hidden"
              >
                <div className="z-[2] relative flex-1 bg-yellow-50 dark:bg-gray-700 p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">
                      <Link href={post.category.href}>
                        <a className="inline-block bg-black px-3 py-2 hover:underline">
                          {post.category.name}
                        </a>
                      </Link>
                    </p>
                    <Link href={post.href}>
                      <a className="block mt-2 hover:opacity-60">
                        <p className="text-xl font-semibold text-gray-100">
                          {post.title}
                        </p>
                        <p className="mt-3 text-base text-gray-300">
                          {post.description}
                        </p>
                      </a>
                    </Link>
                    <Link href={post.href}>
                      <button
                        type="submit"
                        className="group inline relative mt-3 py-3 px-5 text-md font-medium text-black 
  border border-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
  after:content-[''] after:z-[-1] after:block after:w-full after:h-full after:absolute after:top-1 after:left-1 
  after:transition-all after:bg-red-500 after:hover:top-0 after:hover:left-0"
                      >
                        <div className="relative left-1 transition-all opacity-80 group-hover:left-0 group-hover:opacity-100">
                          Read more
                          <span className="transition-all group-hover:opacity-0 group-hover:">
                            ...
                          </span>
                          <span className="relative transition-all opacity-0 left-0 group-hover:opacity-100 group-hover:-left-4">
                            {"👀"}
                          </span>
                        </div>
                      </button>
                    </Link>
                  </div>
                </div>
                <figcaption className="relative bg-black px-6 py-2 flex items-center text-sm text-white">
                  <div className="flex space-x-1">
                    <time dateTime={post.datetime}>{post.date}</time>
                    <span aria-hidden="true">&middot;</span>
                    <span>{post.readingTime} read</span>
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
