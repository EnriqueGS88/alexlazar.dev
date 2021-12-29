export default interface IfcPost {
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
