export default interface IfcPostMeta {
  title: string;
  slug: string;
  excerpt: string;
  coverImage: {
    url: string;
    altText: string;
    caption: string;
  };
  date: string;
  category: string;
  readingTime: string;
}
