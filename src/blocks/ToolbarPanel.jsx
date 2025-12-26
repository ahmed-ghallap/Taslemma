import { useEffect, useEffectEvent } from "react";

import {
  useDocumentDispatch,
  useDocumentHistory,
  useDocument,
} from "@store/index";
import { updateTemplate, updateField } from "@store/actions";

import Buttton from "@blocks/Button.jsx";
import { Redo2, Undo2, Languages, X } from "lucide-react";

export default function ToolbarPanel({ className }) {
  const { dir } = useDocument();
  const dispatch = useDocumentDispatch();
  const { past, future } = useDocumentHistory();

  const dispatchEffect = useEffectEvent((method) => {
    return dispatch({ type: method });
  });
  useEffect(() => {
    const handleKeyDown = (event) => {
      const isMod = event.ctrlKey || event.metaKey; // Ctrl or Cmd
      const isShift = event.shiftKey;
      const key = event.key.toLowerCase();

      if (isMod && !isShift && key === "z") {
        event.preventDefault();
        dispatchEffect("UNDO");
      }

      if ((isMod && key === "y") || (isMod && isShift && key === "z")) {
        event.preventDefault();
        dispatchEffect("REDO");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);

  const handleUndo = () => {
    dispatch({ type: "UNDO" });
  };
  const handleRedo = () => {
    dispatch({ type: "REDO" });
  };
  const handleClear = () => {
    dispatch(updateTemplate("blank"));
  };

  return (
    <nav className={"flex h-6 items-center gap-6 " + className}>
      <span className="bg-primary-200 flex gap-6 rounded-lg">
        <Buttton
          icon={<Undo2 size={24} />}
          sronly="undo button"
          onClick={handleUndo}
          disabled={past.length === 0}
        />
        <Buttton
          icon={<Redo2 size={24} />}
          sronly="redo button"
          onClick={handleRedo}
          disabled={future.length === 0}
        />
      </span>
      <Buttton
        icon={<X size={24} />}
        sronly="clear"
        onClick={handleClear}
        disabled={past.length === 0}
      />
      <Buttton
        className="ms-auto"
        onClick={() => {
          const newLang = dir === "ltr" ? "rtl" : "ltr";
          dispatch(updateField("dir", newLang));
        }}
        icon={<Languages size={24} />}
        sronly="Languages button"
      >
        <span className="text-xl">{dir === "ltr" ? "En" : "Ar"}</span>
      </Buttton>
    </nav>
  );
}
