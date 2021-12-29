import { remark } from "remark";
import html from "remark-html";
import prism from "remark-prism";

/**
 *
 * @param markdown a string containing markdown
 * @returns a string containining HTML
 */
export default async function markdownToHtml(markdown: any): Promise<string> {
  const result = await remark().use(html).use(prism).process(markdown);
  return result.toString();
}
