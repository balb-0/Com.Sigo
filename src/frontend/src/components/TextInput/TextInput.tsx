import { useState } from "react";
import "./TextInput.css";

export function TextInput({ onSend }: { onSend: (text: string) => void }) {
  const [input, setInput] = useState("");

  function send() {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  }

  return (
    <div className="text-input-container">
      <div className="chat-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M132,24A100.11,100.11,0,0,0,32,124v84a16,16,0,0,0,16,16h84a100,100,0,0,0,0-200Zm0,184H48V124a84,84,0,1,1,84,84Z"></path>
        </svg>
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Pergunte alguma informação ao chat"
        className="text-input"
        onKeyDown={(e) => e.key === "Enter" && send()}
      />
      <button onClick={send} className="send-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M231.4,44.34s0,0,0,0a8.32,8.32,0,0,0-8.81-1.74L33.81,108.67a16,16,0,0,0-2.21,29.18L80,152l14.14,48.42a16,16,0,0,0,29.18-2.21L189.4,9.6A8.46,8.46,0,0,0,231.4,44.34ZM102.22,195.75,92.85,155.08l116.95-116.95Z"></path>
        </svg>
      </button>
    </div>
  );
}
