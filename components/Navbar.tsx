/* This example requires Tailwind CSS v2.0+ */
const navigation = [
  { name: "Solutions", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "Docs", href: "#" },
  { name: "Company", href: "#" },
];

export default function Navbar() {
  return (
    <header className="bg-black">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-gray-500 lg:border-none">
          <div className="flex items-center">
            <span className="text-white text-2xl">alexlazar.dev</span>
            <div className="hidden ml-10 space-x-8 lg:block">
              {navigation.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-white hover:underline"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          {navigation.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium text-white hover:underline"
            >
              {link.name}
            </a>
          ))}
        </div>
      </nav>
      <div className="bg-blue-600 h-2 w-full"></div>
      <div className="bg-yellow-400 h-2 w-full"></div>
      <div className="bg-red-500 h-2 w-full"></div>
    </header>
  );
}
