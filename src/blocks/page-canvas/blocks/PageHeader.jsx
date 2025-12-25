import { useDocument, useDocumentDispatch } from "@store/index";

import {
  updateArrayElement,
  removeArrayElement,
  addArrayElement,
} from "@store/actions.js";

import EditableText from "@blocks/EditableText";
import EditableImage from "@blocks/EditableImage";
import PlusButton from "@blocks/PlusButton";

export default function PageHeader({ editable = false }) {
  const { InstitutionHeader } = useDocument();
  const dispatch = useDocumentDispatch();

  const handelAddParagrapgh = () => {
    dispatch(addArrayElement("InstitutionHeader", "Modify Me"));
  };

  const paragraphArray = InstitutionHeader.map((text, index) => {
    return (
      <EditableText
        onUpdate={(newText) =>
          dispatch(updateArrayElement("InstitutionHeader", index, newText))
        }
        onRemove={() =>
          dispatch(removeArrayElement("InstitutionHeader", index))
        }
        key={index}
        initText={text}
      />
    );
  });

  return (
    <div className="flex max-h-[40cqi] items-stretch gap-[4cqi]">
      <div className="relative flex flex-5 flex-col justify-center py-[1cqi] text-[3cqi] leading-[4.5cqi] *:mb-[1cqi]">
        {paragraphArray}
        {editable && (
          <PlusButton
            onClick={handelAddParagrapgh}
            className="absolute top-full"
          />
        )}
      </div>
      <div className="imgBx aspect-square max-h-[25cqi] flex-[1_1_7cqi]">
        <EditableImage />
      </div>
    </div>
  );
}
