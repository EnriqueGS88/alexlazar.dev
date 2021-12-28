import Link from "next/link";

/* This example requires Tailwind CSS v2.0+ */
const navigation = [
  { name: "Blog", href: "/", icon: "✍🏻" },
  { name: "Github", href: "https://github.com/lazaralex98", icon: "👨🏻‍💻" },
  { name: "Twitter", href: "https://twitter.com/SaxeMauricede", icon: "📱" },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UCBTlMP2ODwm0_Apy4wMoy5g",
    icon: "📹",
  },
];

export default function Navbar() {
  return (
    <header className="bg-black">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-gray-500 lg:border-none">
          <div className="flex items-center">
            <Link href="/">
              <a className="text-white text-2xl hover:underline hover:underline-offset-8">
                alexlazar.dev
              </a>
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              {navigation.map((link) => (
                <Link href={link.href}>
                  <a
                    key={link.name}
                    className="text-base font-medium text-white"
                  >
                    {link.icon}
                    <span className="ml-2 hover:underline hover:underline-offset-4">
                      {link.name}
                    </span>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          {navigation.map((link) => (
            <Link href={link.href}>
              <a
                key={link.name}
                className="text-base font-medium text-white hover:underline"
              >
                {link.name}
              </a>
            </Link>
          ))}
        </div>
      </nav>
      <div className="bg-blue-600 h-2 w-full"></div>
      <div className="bg-yellow-400 h-2 w-full"></div>
      <div className="bg-red-500 h-2 w-full"></div>
    </header>
  );
}
