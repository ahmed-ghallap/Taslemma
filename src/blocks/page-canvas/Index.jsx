import { useDocument, useDocumentDispatch } from "@store/index";

import PageHeader from "./blocks/PageHeader";
import PageContent from "./blocks/PageContent";
import PageFooter from "./blocks/PageFooter";

export default function PageCanvas({ className, editable = false, ref }) {
  const { dir } = useDocument();

  return (
    <article dir={dir} ref={ref} className="@container">
      <div
        className={`aspect-a4 @container flex h-auto w-full flex-col overflow-hidden bg-white p-[5cqi] ${className} ${editable ? "" : "event-lock"}`}
      >
        <PageHeader editable={editable}></PageHeader>
        <PageContent editable={editable}></PageContent>
        <PageFooter editable={editable}></PageFooter>
      </div>
    </article>
  );
}
