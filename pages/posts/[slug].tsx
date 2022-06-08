import { CameraIcon } from "@heroicons/react/solid";
import Head from "next/head";
import Metatags from "../../components/Metatags";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import IfcPost from "../../utils/IfcPost";
import IfcPostMeta from "../../utils/IfcPostMeta";
import getPostBySlug from "../../utils/getPostBySlug";
import markdownToHtml from "../../utils/markdownToHTML";
import getAllPosts from "../../utils/getAllPosts";
import { useEffect, useState } from "react";
import subscribeToNewsletter from "../../utils/subscribeToNewsletter";
import Button from "../../components/Button";
import ArticleContent from "../../components/ArticleContent";
import getRandomPosts from "../../utils/getRandomPosts";
import Link from "next/link";

export async function getStaticProps(context) {
  const post: IfcPost = getPostBySlug(context.params.slug);
  const meta: IfcPostMeta = post.meta;
  const content: string = await markdownToHtml(post.content || "");
  const recommendedPosts: IfcPost[] = getRandomPosts(3);
  return {
    props: { meta, content, recommendedPosts },
    revalidate: 60 * 60 * 24, // revalidate daily
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

/**
 *
 * @TODO I need to implement MDX
 * 1. All in article links are Next.js Links which will improve performance
 * 2. I can embed YT videos instead of just linking to them
 * 3. I could embed my newsletter signup form or otehr similar stuff
 */

interface IfcPostPageProps {
  meta: IfcPostMeta;
  content: string;
  recommendedPosts: IfcPost[];
}

export default function Post({
  meta,
  content,
  recommendedPosts,
}: IfcPostPageProps) {
  const [email, setEmail] = useState("");
  /**
   *  this state will be used to differentiate between people that haven't subscribed, people that
   * have tried to subscribe but had an error and people that have successfully subscribed.
   */
  type TsubscriberStatus = "subscribed" | "notSubscribed" | "error";
  const [subscriberStatus, setSubscriberStatus] =
    useState<TsubscriberStatus>("notSubscribed");

  async function handleNewsletterSubmit(event) {
    event.preventDefault();
    const result = await subscribeToNewsletter(email);
    if (result) {
      setSubscriberStatus("subscribed");
    } else {
      setSubscriberStatus("error");
    }
  }

  return (
    <div className="font-mono overflow-hidden bg-white dark:bg-gray-900 z-[-3]">
      <Head>
        <title>{meta.title}</title>
        <Metatags
          title={meta.title}
          description={meta.excerpt}
          url={`https://alexlazar.dev${`/posts/${meta.slug}/`}`}
          imageUrl={meta.coverImage.url}
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
            <ArticleContent>{content}</ArticleContent>
            {/* TODO: a way for people to like the article? */}
            <div className="mt-5 relative bg-yellow-50 dark:bg-teal-600 z-[0] px-3 py-4 text-md text-black prose border-2 border-black">
              <p className="text-lg font-bold">
                A few other articles you may like
              </p>
              <div>
                {recommendedPosts.map((post, index) => (
                  <Link key={index} href={`/posts/${post.meta.slug}`}>
                    <a className="mt-2 block font-medium hover:no-underline">
                      {post.meta.title}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="relative lg:row-start-1 lg:col-start-3">
            <div className="h-full text-base mx-auto max-w-prose lg:max-w-none">
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
              <div className="mt-6 relative bg-gray-50 dark:bg-gray-400 z-[0] px-3 py-4 text-md text-black prose border-2 border-black">
                <p>
                  *Fun fact* The 3 colors under the navbar are {"Romania's"}{" "}
                  flag 🇷🇴.
                </p>
              </div>
              <div className="mt-6 relative bg-gray-50 dark:bg-gray-400 z-[0] px-3 py-4 text-md text-black prose border-2 border-black">
                <p className="font-bold">A few other articles you may like</p>
                <div>
                  {recommendedPosts.map((post, index) => (
                    <Link key={index} href={`/posts/${post.meta.slug}`}>
                      <a className="mt-2 block hover:no-underline">
                        {post.meta.title}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
              {/* TODO a "go to the top" btn */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
