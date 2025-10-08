import htmlContent from "../../public/index.html?raw";

export default function StaticPage() {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
