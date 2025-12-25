import { useState, useEffect } from "react";

import Textarea from "react-textarea-autosize";

export default function EditableText({
  initText = "Click to edit",
  editable = false,
  className,
  onUpdate,
  onRemove,
}) {
  const [text, setText] = useState(initText);
  const [isEditing, setIsEditing] = useState(editable);

  useEffect(() => {
    setText(initText);
  }, [initText]);

  const handelUpdateAndRemove = () => {
    if (text === initText) {
      setIsEditing(false);
      return;
    }
    if (text.trim() === "" && onRemove !== undefined) {
      onRemove();
      setIsEditing(false);
      return;
    }
    onUpdate(text);
    setIsEditing(false);
  };

  const TextView = (
    <p
      className={`hover:bg-primary-200 cursor-pointer rounded-lg transition-colors duration-100 ${className}`}
      onClick={() => setIsEditing(true)}
    >
      {initText}
    </p>
  );
  const TextInput = (
    <Textarea
      className={
        "outline-primary-800 h-max resize-none rounded-lg outline-[.4cqi] focus:outline-offset-[.5cqi] " +
        className
      }
      autoFocus
      minRows={1}
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && e.shiftKey === false) handelUpdateAndRemove();
      }}
      onBlur={() => handelUpdateAndRemove()}
    />
  );
  return isEditing ? TextInput : TextView;
  // return TextInput;
}
