import { useDocument, useDocumentDispatch } from "@store/context";
import {
  updateField,
  addArrayElement,
  updateArrayElement,
} from "@store/actions";

import EditableText from "@blocks/EditableText";
import DateDisplay from "@blocks/DateDisplay.jsx";
import PlusButton from "@blocks/PlusButton";

export default function PageFooter({ editable = false }) {
  const { supervisors, supervisedBy } = useDocument();
  const dispatch = useDocumentDispatch();

  return (
    <div className="grid w-full grid-cols-12 text-[3cqi] font-medium capitalize">
      <EditableText
        onUpdate={(newText) => dispatch(updateField("supervisedBy", newText))}
        className="col-span-12 mb-[1.5cqi]"
        initText={supervisedBy}
      />

      <ul className="relative col-span-8">
        {supervisors.map((supervisor, index) => {
          return (
            <li className="font-semibold" key={index}>
              <EditableText
                onUpdate={(newText) =>
                  dispatch(updateArrayElement("supervisors", index, newText))
                }
                initText={supervisor}
              />
            </li>
          );
        })}
        <li>
          {editable && (
            <PlusButton
              onClick={() =>
                dispatch(addArrayElement("supervisors", "Dr/ supervisor"))
              }
              className="absolute end-0 bottom-0"
            />
          )}
        </li>
      </ul>
      <DateDisplay className="col-span-4 mt-auto h-max" />
    </div>
  );
}
