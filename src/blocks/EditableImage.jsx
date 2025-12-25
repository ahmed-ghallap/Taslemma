import { useRef } from "react";
import { useDocument, useDocumentDispatch } from "@store/index";
import { updateField } from "@store/actions";

import { ImageUp } from "lucide-react";

export default function EditableImage() {
  const { logo } = useDocument();
  const dispatch = useDocumentDispatch();

  const inputRef = useRef(null);

  const handleSelectImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    dispatch(updateField("logo", url));
  };

  const ImageView = (
    <div className="group relative aspect-square cursor-pointer overflow-hidden rounded-full">
      <img
        className="h-full w-full cursor-pointer rounded-full object-cover transition-all duration-300 ease-in-out hover:scale-110"
        src={logo}
      />

      <div
        className="motion-bg-out-primary-950/60 motion-duration-200 absolute inset-0 hidden h-full w-full place-items-center group-hover:grid"
        onClick={() => inputRef.current.click()}
      >
        <ImageUp className="text-gray-200" size={32} />
      </div>
    </div>
  );
  return (
    <>
      {ImageView}
      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={handleSelectImage}
      />
    </>
  );
}
