import { TEMPLATES } from "@store/templates.js";

import { useDocumentDispatch } from "@store/context";
import { updateTemplate } from "@store/actions";

import Button from "@blocks/Button";
export default function PresetExamples({ className }) {
  const Templates = { ...TEMPLATES };
  const dispatch = useDocumentDispatch();
  const templateNames = Object.keys(Templates);
  return (
    <article className={"rounded-xl bg-white py-3 shadow-xs " + className}>
      <div
        dir="rtl"
        className="flex h-full max-h-50 flex-nowrap items-center gap-3 overflow-x-auto p-3 *:flex-[1_1_auto]"
      >
        {templateNames.map((name, i) => (
          <Button
            key={i}
            className="justify-center px-2 text-center text-nowrap"
            onClick={() => dispatch(updateTemplate(name))}
          >
            {Templates[name].fullName}
          </Button>
        ))}
      </div>
    </article>
  );
}
