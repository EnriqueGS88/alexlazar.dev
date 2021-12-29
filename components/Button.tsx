import React from "react";
import Link from "next/link";

function Button({
  children,
  type,
  href,
}: {
  children?: any;
  type: "submit" | "link";
  href?: string;
}) {
  if (type === "link") {
    return (
      <Link href={href}>
        <a
          className="group inline-block relative mt-3 py-3 px-5 text-md font-medium text-black 
  border border-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
  after:content-[''] after:z-[-1] after:block after:w-full after:h-full after:absolute after:top-1 after:left-1 
  after:transition-all after:bg-red-500 after:hover:top-0 after:hover:left-0"
        >
          {children}
        </a>
      </Link>
    );
  }
  return (
    <button
      type={type}
      className="group inline relative mt-3 py-3 px-5 text-md font-medium text-black 
  border border-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
  after:content-[''] after:z-[-1] after:block after:w-full after:h-full after:absolute after:top-1 after:left-1 
  after:transition-all after:bg-red-500 after:hover:top-0 after:hover:left-0"
    >
      {children}
    </button>
  );
}

export default Button;
