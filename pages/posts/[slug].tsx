import { CameraIcon } from "@heroicons/react/solid";
import Head from "next/head";
import Metatags from "../../components/Metatags";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import axios from "axios";
import Footer from "../../components/Footer";
import parse from "html-react-parser";
import IfcPostMeta from "../../utils/IfcPostMeta";
import getPostBySlug from "../../utils/getPostBySlug";
import markdownToHtml from "../../utils/markdownToHTML";
import getAllPosts from "../../utils/getAllPosts";

export async function getStaticProps(context) {
  const post = getPostBySlug(context.params.slug);
  const meta = post.meta;
  const content = await markdownToHtml(post.content || "");
  return {
    props: { meta, content },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts();
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}

export default function Post({
  meta,
  content,
}: {
  meta: IfcPostMeta;
  content: any;
}) {
  return (
    <div className="font-mono overflow-hidden bg-white dark:bg-gray-900 z-[-3]">
      <Head>
        <title>{meta.title}</title>
        <Metatags
          title={meta.title}
          description={meta.excerpt}
          url={`https://alexlazar.dev${`/posts/${meta.slug}/`}`}
          imageUrl={`https://alexlazar.dev${`/posts/${meta.coverImage.url}/`}`}
        />
      </Head>
      <Navbar />

      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="hidden lg:block border-l border-l-black bg-gray-50 dark:bg-gray-800 z-[0] absolute top-0 bottom-0 left-3/4 w-screen" />
        <div className="mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none">
          <div>
            <span className="text-base inline-block text-white bg-black dark:bg-gray-600 px-3 py-2 font-semibold tracking-wide uppercase">
              {meta.category}
            </span>
            <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {meta.title}
            </h3>
          </div>
        </div>
        <div className="mt-8 lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="my-8 lg:mt-0 lg:col-span-2">
            <div className="text-base max-w-prose mx-auto lg:max-w-none border-b-2 py-4 border-b-black">
              <p className="text-lg text-gray-900 dark:text-purple-200">
                {meta.excerpt}
              </p>
            </div>
            <div
              className="mt-5 prose prose-blue dark:prose-invert
              prose-img:border-2 prose-img:border-black prose-img:mb-0 


              prose-a:font-bold


              prose-ol:border-black prose-ol:border-2 prose-ol:px-16 prose-ol:py-5 prose-ol:bg-yellow-50 
              dark:prose-ol:bg-teal-600 prose-ol:text-black prose-ol:decoration-black prose-ol:my-4
              prose-ul:border-black prose-ul:border-2 prose-ul:px-16 prose-ul:py-5 prose-ul:bg-yellow-50 
              dark:prose-ul:bg-teal-600 prose-ul:text-black prose-ul:decoration-black prose-ul:my-4
              prose-li:text-black


              prose-figcaption:mt-0 prose-figcaption:bg-black prose-figcaption:px-3 
              prose-figcaption:py-2 prose-figcaption:text-white


              prose-blockquote:text-4xl prose-blockquote:my-2 prose-blockquote:pl-3 
              prose-blockquote:border-l-8 prose-blockquote:border-l-black dark:prose-blockquote:border-l-white


              prose-pre:border-2 prose-pre:border-black prose-pre:rounded-none 
              prose-pre:bg-purple-100 prose-pre:text-black prose-pre:relative
              before:prose-pre:content-['code'] before:prose-pre:absolute 
              prose-pre:overflow-visible before:prose-pre:bg-black before:prose-pre:text-white
              before:prose-pre:px-3
              before:prose-pre:-top-6 before:prose-pre:left-1 prose-pre:mt-10


              prose-table:border-2 prose-table:border-black prose-th:p-4 prose-th:bg-yellow-50 
              prose-th:border-y-2 prose-th:border-y-black prose-td:p-4 dark:prose-th:bg-teal-600 
              dark:prose-table:bg-gray-800

              
              text-gray-600 dark:text-white mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1"
            >
              {parse(content)}
            </div>
          </div>
          <div className="relative lg:row-start-1 lg:col-start-3">
            <div className="text-base mx-auto max-w-prose lg:max-w-none">
              <figure>
                <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
                  {/* we are not using the Image component here because it creates a TON of style issues */}
                  <img
                    className="border-2 border-black object-cover object-center"
                    width={500}
                    height={500}
                    src={meta.coverImage.url}
                    alt={meta.coverImage.altText}
                  />
                </div>
                <figcaption className="relative -top-3 bg-black px-3 py-2 flex text-sm text-white">
                  <CameraIcon
                    className="flex-none w-5 h-5 text-white"
                    aria-hidden="true"
                  />
                  <span className="ml-2">{meta.coverImage.caption}</span>
                </figcaption>
              </figure>
              <div className="mt-3 relative bg-yellow-50 dark:bg-teal-600 z-[0] px-3 py-4 text-md text-black prose border-2 border-black">
                <p>
                  You can subscribe to my newsletter to receive notifications
                  when I post new content.
                </p>
                <p>I won't spam you and you can unsubscribe at any time.</p>
                <form
                  className="z-[1]"
                  onSubmit={(event) => {
                    console.log("submited:", event);
                  }}
                >
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      autoComplete="email"
                      className="py-3 px-5 text-md border border-black focus:ring-blue-500 focus:border-blue-500 text-black block w-full"
                    />
                  </div>
                  <button
                    type="submit"
                    className="group inline relative mt-3 py-3 px-5 text-md font-medium text-black 
  border border-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
  after:content-[''] after:z-[-1] after:block after:w-full after:h-full after:absolute after:top-1 after:left-1 
  after:transition-all after:bg-red-500 after:hover:top-0 after:hover:left-0"
                  >
                    <div className="relative left-1 transition-all opacity-80 group-hover:left-0 group-hover:opacity-100">
                      Subscribe
                      <span className="transition-all group-hover:opacity-0 group-hover:">
                        ...
                      </span>
                      <span className="relative transition-all opacity-0 left-0 group-hover:opacity-100 group-hover:-left-4">
                        {"📧"}
                      </span>
                    </div>
                  </button>
                </form>
              </div>
              <div className="mt-6 relative bg-gray-50 dark:bg-gray-400 z-[0] px-3 py-4 text-md text-black prose border-2 border-black">
                <p>
                  *Fun fact* The 3 colors under the navbar are Romania's flag
                  🇷🇴.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
