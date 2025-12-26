import { useRef } from "react";
import ToolbarPanel from "@blocks/ToolbarPanel.jsx";
import PageCanvas from "@blocks/page-canvas/Index.jsx";
import ExportPanel from "@blocks/ExportPanel.jsx";
import PresetExamples from "@blocks/PresetExamples";

export default function PageEditor({ className }) {
  const pageRef = useRef(null);
  return (
    <div className={className}>
      <ToolbarPanel />
      <div className="scrollbar-hide mt-6 overflow-y-auto rounded-2xl shadow-sm lg:mt-3 lg:flex-[1_1_0]">
        <PageCanvas editable={true} />
      </div>
      <div className="mt-6 space-y-6 lg:hidden">
        <PageCanvas className="" ref={pageRef} />
        <ExportPanel className="" docRef={pageRef} />
        <PresetExamples className="max-h-149 flex-1" />
      </div>
    </div>
  );
}
