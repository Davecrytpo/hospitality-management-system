import { useParams } from "react-router-dom";
import PublicCmsPage from "./PublicCmsPage";

export default function PublicCmsDynamicPage() {
  const { slug = "" } = useParams();

  return <PublicCmsPage slug={slug} />;
}
