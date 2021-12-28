import { CameraIcon } from "@heroicons/react/solid";
import Head from "next/head";
import Metatags from "../../components/Metatags";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import axios from "axios";
import Footer from "../../components/Footer";

const title = "Nice post";
const category = {
  title: "tutorial",
  href: "#",
};
const coverImage = {
  url: "https://images.unsplash.com/photo-1610909762155-02fcc33e03d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHJvbWFuaWF8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60",
  altText: "Whitney leaning against a railing on a downtown street",
  figCaption: "Podul Minciunilor, Sibiu",
};
const summary =
  "Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum urna sed consectetur neque tristique pellentesque. Blandit amet, sed aenean erat arcu morbi.";

// TODO make sure md also supports nice styling and dark mode styling
const content = `<p>
                Sollicitudin <u>tristique eros erat</u> odio sed vitae, consequat
                turpis elementum. <mark>Lorem nibh vel</mark>, eget pretium arcu vitae. Eros
                eu viverra donec ut volutpat donec laoreet quam urna.
              </p>
              <p>
                <strong>Bibendum eu nulla feugiat</strong> justo, elit adipiscing. Ut tristique
                sit nisi lorem pulvinar. Urna, laoreet fusce nibh leo. Dictum et
                et et sit. <a href="#">Faucibus sed non</a> gravida lectus dignissim imperdiet
                a.
              </p>
              <blockquote>caca maca e e e </blockquote>
              <p>
                Dictum magnis risus phasellus vitae quam morbi. Quis lorem lorem
                arcu, metus, egestas netus cursus. In.
              </p>
              <figure>
                <img src="https://images.unsplash.com/photo-1502489597346-dad15683d4c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80" />
                <figcaption>Blah blah blah - FIGCAPTION</figcaption>
              </figure>
              <ul role="list">
                <li>Quis elit egestas venenatis mattis dignissim.</li>
                <li>
                  Cras cras lobortis vitae vivamus ultricies facilisis tempus.
                </li>
                <li>Orci in sit morbi dignissim metus diam arcu pretium.</li>
              </ul>
              <p>
                Rhoncus nisl, libero egestas diam fermentum dui. At quis
                tincidunt vel ultricies. Vulputate aliquet velit faucibus
                semper. Pellentesque in venenatis vestibulum consectetur nibh
                id. In id ut tempus egestas. Enim sit aliquam nec, a. Morbi enim
                fermentum lacus in. Viverra.
              </p>
              <h3>How we helped</h3>
              <p>
                Tincidunt integer commodo, cursus etiam aliquam neque, et.
                Consectetur pretium in volutpat, diam. Montes, magna cursus
                nulla feugiat dignissim id lobortis amet. Laoreet sem est
                phasellus eu proin massa, lectus. Diam rutrum posuere donec
                ultricies non morbi. Mi a platea auctor mi.
              </p>
              <p>
                Sagittis scelerisque nulla cursus in enim consectetur quam.
                Dictum urna sed consectetur neque tristique pellentesque.
                Blandit amet, sed aenean erat arcu morbi.
              </p>`;

export default function Post() {
  // TODO make backend with .md

  async function subscribeToNewsletter(email) {
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.io)",
      "Content-Type": "application/json; charset=utf-8",
    };

    let reqOptions = JSON.stringify({
      url: "https://api.convertkit.com/v3/forms/2871455/subscribe",
      method: "POST",
      headers: headersList,
      data:
        '{ \n    "api_key": "NeIvJhiL4Cv-vr1w3_XIvg",\n    "email": "' +
        email +
        '"\n}',
    });

    // TODO integrate form with Convertkit

    // axios.request(reqOptions).then(function (response) {
    //   console.log(response.data);
    // });
  }

  return (
    <div className="font-mono overflow-hidden bg-white dark:bg-gray-900 z-[-3]">
      <Head>
        <title>{title}</title>
        <Metatags
          title={title}
          description="Just a tech blog."
          url="https://alexlazar.dev"
          imageUrl="https://alexlazar.dev/images/vercel.svg"
        />
      </Head>
      <Navbar />
      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="hidden lg:block border-l border-l-black bg-gray-50 dark:bg-gray-800 z-[0] absolute top-0 bottom-0 left-3/4 w-screen" />
        <div className="mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none">
          <div>
            <Link href={category.href}>
              <a className="text-base inline-block text-white bg-black dark:bg-gray-600 px-3 py-2 font-semibold tracking-wide uppercase hover:underline">
                {category.title}
              </a>
            </Link>
            <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {title}
            </h3>
          </div>
        </div>
        <div className="mt-8 lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="relative lg:row-start-1 lg:col-start-3">
            <div className="text-base mx-auto max-w-prose lg:max-w-none">
              <figure>
                <div className="relative aspect-w-12 aspect-h-7 lg:aspect-none">
                  <div className="relative border-2 border-black box-content">
                    <Image
                      width={500}
                      height={500}
                      objectFit="cover"
                      src={coverImage.url}
                      alt={coverImage.altText}
                    />
                  </div>
                </div>
                <figcaption className="relative -top-3 bg-black px-3 py-2 flex text-sm text-white">
                  <CameraIcon
                    className="flex-none w-5 h-5 text-white"
                    aria-hidden="true"
                  />
                  <span className="ml-2">{coverImage.figCaption}</span>
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
                  {/* TODO make beautiful btn like on https://www.peterlunch.com/snippets/next-image-styling */}
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
          <div className="mt-8 lg:mt-0 lg:col-span-2">
            <div className="text-base max-w-prose mx-auto lg:max-w-none border-b-2 py-4 border-b-black">
              <p className="text-lg text-gray-900 dark:text-purple-200">
                {summary}
              </p>
            </div>
            <div
              className="mt-5 prose prose-indigo text-gray-600 dark:text-white mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
