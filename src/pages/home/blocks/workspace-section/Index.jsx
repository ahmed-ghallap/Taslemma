import DocumentProvider from "@store/DocumentProvider.jsx";
import PagePreviewer from "@blocks/PagePreviewer.jsx";
import PageEditor from "@blocks/PageEditor.jsx";

export default function Workspace({ className }) {
  return (
    <DocumentProvider>
      <section className={className}>
        <div className="container grid h-full grid-cols-6 gap-8">
          <PagePreviewer className="col-span-2 pt-9" />
          <PageEditor className="col-span-4 flex flex-col" />
        </div>
      </section>
    </DocumentProvider>
  );
}
