import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Metatags from "../components/Metatags";

export default function Home() {
  return (
    <div className="font-mono">
      <Head>
        <title>Alex Lazar's Blog</title>
        <Metatags
          title="Alex Lazar's Blog"
          description="Just a tech blog."
          url="https://alexlazar.dev"
          imageUrl="https://alexlazar.dev/images/vercel.svg"
        />
      </Head>

      <Navbar />
    </div>
  );
}
