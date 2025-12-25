import ToolbarPanel from "@blocks/ToolbarPanel.jsx";
import PageCanvas from "@blocks/page-canvas/Index.jsx";

export default function PageEditor({ className }) {
  return (
    <div className={className}>
      <ToolbarPanel />
      <div className="scrollbar-hide mt-3 flex-[1_1_0] overflow-y-auto rounded-2xl shadow-sm">
        <PageCanvas editable={true} />
      </div>
    </div>
  );
}
