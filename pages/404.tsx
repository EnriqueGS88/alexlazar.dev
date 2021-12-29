import { Helmet } from "react-helmet";
import Head from "next/head";
import Metatags from "../components/Metatags";
import Image from "next/image";
import Link from "next/link";

export default function Error() {
  // TODO dark mode for error page
  return (
    <div className="font-mono h-full">
      <Helmet>
        <html className="h-full" />
        <body className="h-full" />
      </Helmet>
      <Head>
        <title>404</title>
        <Metatags
          title="404"
          description="Just a tech blog."
          url="https://alexlazar.dev"
          imageUrl="https://alexlazar.dev/images/vercel.svg"
        />
      </Head>
      <div className="bg-white dark:bg-gray-900 dark:text-white min-h-full flex flex-col lg:relative">
        <div className="flex-grow flex flex-col lg:border-2 lg:border-black">
          <main className="flex-grow flex flex-col">
            <div className="flex-grow mx-auto max-w-7xl w-full flex flex-col px-4 sm:px-6 lg:px-8">
              <div className="flex-shrink-0 pt-10 sm:pt-16">
                <Link href="/">
                  <a className="inline-flex hover:underline">alexlazar.dev</a>
                </Link>
              </div>
              <div className="flex-shrink-0 my-auto py-16 sm:py-32">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wide">
                  404 error
                </p>
                <h1 className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-gray-50 tracking-tight sm:text-5xl">
                  Page not found
                </h1>
                <div className="mt-6">
                  <Link href="/">
                    <a className="text-base font-medium text-black dark:text-white hover:underline underline-offset-4">
                      Go back home<span aria-hidden="true"> &rarr;</span>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
        <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:border-2 lg:border-black">
          <Image
            className="absolute inset-0 h-full w-full object-cover"
            layout="fill"
            objectFit="cover"
            src="/404.jpg"
            alt="Picture of the author"
          />
        </div>
      </div>
    </div>
  );
}
