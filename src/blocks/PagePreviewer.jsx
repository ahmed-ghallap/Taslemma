import { useRef } from "react";

import PageCanvas from "@blocks/page-canvas/Index.jsx";
import ExportPanel from "@blocks/ExportPanel.jsx";
import PresetExamples from "@blocks/PresetExamples";

export default function PagePreviewer({ className }) {
  const pageRef = useRef(null);
  return (
    <div
      className={`flex flex-col gap-6 overflow-hidden border-red-500 ${className}`}
    >
      <PageCanvas ref={pageRef} className="rounded-xl shadow-sm" />
      <ExportPanel className="" docRef={pageRef} />
      <PresetExamples className="max-h-149 flex-1" />
    </div>
  );
}
