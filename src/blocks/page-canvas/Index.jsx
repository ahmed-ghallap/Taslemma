import { useDocument, useDocumentDispatch } from "@store/index";
import { updateField } from "@store/actions";

import PageHeader from "./blocks/PageHeader";
import PageContent from "./blocks/PageContent";
import PageFooter from "./blocks/PageFooter";

export default function PageCanvas({ className, editable = false, ref }) {
  const { dir } = useDocument();
  const dispatch = useDocumentDispatch();

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(droppedFile);
      dispatch(updateField("logo", objectUrl));
    }
  };

  return (
    <article
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      dir={dir}
      ref={ref}
      className="@container"
    >
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
