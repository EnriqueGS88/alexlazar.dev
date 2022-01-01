import React from "react";
import parse from "html-react-parser";

export default function ArticleContent({ children }) {
  // TODO how can I make links within the content be next.js links?
  // it's important for performance
  return (
    <div
      className="mt-5 prose prose-blue dark:prose-invert
              prose-img:border-2 prose-img:border-black prose-img:mb-0 


              prose-a:font-bold prose-strong:font-extrabold


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
      {parse(children)}
    </div>
  );
}
