import { useDocument, useDocumentDispatch } from "@store/context";
import { updateField } from "@store/actions";
import EditableText from "@blocks/EditableText.jsx";

//   const arabicFormat = "en" || "en-SA-u-ca-islamic-umalqura";

export default function DateDisplay({ className }) {
  const { date } = useDocument();
  const dispatch = useDocumentDispatch();
  return (
    <EditableText
      onUpdate={(newText) => dispatch(updateField("date", newText))}
      className={"text-end " + className}
      initText={date}
    />
  );
}
