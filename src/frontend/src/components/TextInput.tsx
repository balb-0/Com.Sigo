import { useState } from 'react';

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
        style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #ddd' }}
      />
      <button onClick={send}>Send</button>
    </>
  );
}
