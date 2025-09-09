import { useState } from 'react';
import './TextInput.css';

export function TextInput({ onSend }: { onSend: (text: string) => void }) {
  const [input, setInput] = useState('');

  function send() {
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  }

  return (
    <>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        className="text-input"
      />
      <button onClick={send}>Send</button>
    </>
  );
}
