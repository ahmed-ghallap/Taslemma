import NavbarSection from "./blocks/navbar-section/Index.jsx";
import WorkspaceSection from "./blocks/workspace-section/Index.jsx";

export default function Index() {
  return (
    <div className="flex h-screen flex-col overflow-y-scroll bg-slate-300">
      <NavbarSection />
      <WorkspaceSection className="flex-[1_1_0] py-3 pb-6" />
    </div>
  );
}
