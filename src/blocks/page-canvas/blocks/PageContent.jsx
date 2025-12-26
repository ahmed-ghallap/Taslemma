import { useDocument, useDocumentDispatch } from "@store/context";
import { updateField, addArrayElement } from "@store/actions";

import EditableText from "@blocks/EditableText";
import PlusButton from "@blocks/PlusButton";
import { updateArrayElement } from "../../../store/actions";

export default function PageContent({ editable = false }) {
  const { students, heading, subHeading, submittedBy } = useDocument();
  const dispatch = useDocumentDispatch();

  return (
    <div className="grow">
      <div className="w-full py-[13cqi] text-center font-semibold">
        <EditableText
          className="w-full text-center text-[5cqi]"
          initText={heading}
          onUpdate={(newText) => dispatch(updateField("heading", newText))}
        />
        <EditableText
          className="w-full text-center text-[3cqi]"
          initText={subHeading}
          onUpdate={(newText) => dispatch(updateField("subHeading", newText))}
        />
      </div>

      <div className="flex w-full items-start gap-[8cqi] pt-[10cqi] pb-[5cqi] text-[3cqi]">
        <EditableText
          onUpdate={(newText) => dispatch(updateField("submittedBy", newText))}
          className="w-max text-nowrap"
          initText={submittedBy}
        />
        <ul className="w-full">
          {students.map((student, index) => {
            return (
              <li
                className="mb-[.5cqi] grid grid-cols-10 justify-between"
                key={index}
              >
                <EditableText
                  className="col-span-7 capitalize"
                  onUpdate={(newText) =>
                    dispatch(
                      updateArrayElement("students", index, {
                        ...student,
                        name: newText,
                      }),
                    )
                  }
                  initText={student.name}
                />
                <EditableText
                  className="col-span-3 h-max font-semibold"
                  onUpdate={(newText) =>
                    dispatch(
                      updateArrayElement("students", index, {
                        ...student,
                        studentId: newText,
                      }),
                    )
                  }
                  initText={student.studentId}
                />
              </li>
            );
          })}
          <li>
            {editable && (
              <PlusButton
                onClick={() =>
                  dispatch(
                    addArrayElement("students", {
                      name: "Student Name",
                      studentId: "0000",
                    }),
                  )
                }
                className="mt-[2cqi]"
              />
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
