import { useRef, useEffect, useEffectEvent, useState } from "react";
import { useDocument, useDocumentDispatch } from "@store/index";
import { updateField } from "@store/actions";

import { ImageUp } from "lucide-react";

export default function EditableImage() {
  const [loading, setLoading] = useState(true);

  const { logo } = useDocument();
  const dispatch = useDocumentDispatch();

  const inputRef = useRef(null);
  const saveImageEffect = useEffectEvent((url) => {
    dispatch(updateField("logo", url));
  });
  useEffect(() => {
    const handlePaste = (event) => {
      const items = event.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const blob = items[i].getAsFile();
          if (blob) {
            const url = URL.createObjectURL(blob);
            saveImageEffect(url);
            event.preventDefault();
          }
        }
      }
    };

    window.addEventListener("paste", handlePaste);

    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, []);

  useEffect(() => {
    const handleDragOver = (e) => e.preventDefault();
    const handleDragEnter = (e) => e.preventDefault();

    const handleDrop = (e) => {
      e.preventDefault();

      const files = e.dataTransfer.files;

      if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];

          if (file.type.startsWith("image/")) {
            const url = URL.createObjectURL(file);

            saveImageEffect(url);
          }
        }
      }
    };

    // Attach listeners to the global window
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("drop", handleDrop);

    // Clean up listeners on unmount
    return () => {
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("drop", handleDrop);
    };
  }, []);

  const handleSelectImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    dispatch(updateField("logo", url));
  };

  const ImageView = (
    <div
      onClick={() => inputRef.current.click()}
      className={
        "group relative aspect-square h-full w-full cursor-pointer overflow-hidden rounded-full " +
        (logo === null ? "bg-primary-300 border-primary-600 border" : "")
      }
    >
      {loading && logo !== null && <Spinner />}
      {logo && (
        <img
          key={logo}
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
          className="h-full w-full cursor-pointer rounded-full object-cover transition-all duration-300 ease-in-out hover:scale-110"
          src={logo}
        />
      )}

      {
        <div className="motion-bg-out-primary-950/60 motion-duration-200 absolute inset-0 hidden h-full w-full place-items-center group-hover:grid">
          <ImageUp className="text-gray-200" size={"5cqi"} />
        </div>
      }
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

function Spinner() {
  return (
    <article className="motion-bg-out-primary-200/70 relative h-full w-full">
      <div
        role="status"
        className="absolute top-2/4 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <svg
          aria-hidden="true"
          className="text-secondary-900 fill-secondary-100 aspect-square w-[4cqi] scale-130 animate-spin"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </article>
  );
}
