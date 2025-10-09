import htmlContent from "./../index.html?raw";

export default function StaticPage() {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
