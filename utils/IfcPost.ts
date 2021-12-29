import IfcPostMeta from "./IfcPostMeta";

export default interface IfcPost {
  slug: string;
  meta: IfcPostMeta;
  content: string;
}
