import React, { forwardRef } from "react";
import "./css/typinginput.css";
const TypingInput = forwardRef(({ running, value, onType }, ref) => {
  return (
    <input
      type="text"
      ref={ref}
      value={value}
      onChange={(e) => onType(e.target.value)}
      disabled={!running}
      autoFocus
      id={"user-input"}
      onKeyDown={(e) => {
        // Prevent Ctrl+A (Select All)
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "a") {
          e.preventDefault();
        }

        // Prevent Ctrl+Backspace (delete word)
        if ((e.ctrlKey || e.metaKey) && e.key === "Backspace") {
          e.preventDefault();
        }

        // Optional: prevent Ctrl+V (paste)
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "v") {
          e.preventDefault();
        }
      }}
      onPaste={(e) => e.preventDefault()} // disable paste
    />
  );
});

export default TypingInput;
