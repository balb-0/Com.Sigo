import { useState } from 'react';
import { MessageList } from '../components/MessageList';
import { TextInput } from '../components/TextInput';
import { AudioRecorder } from '../components/AudioRecorder';
import { AudioUploader } from '../components/AudioUploader';

type Message = { role: 'user' | 'assistant'; content?: string; audioUrl?: string };

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  function addText(text: string) {
    setMessages((m) => [...m, { role: 'user', content: text }]);
  }

  function addAudio(url: string) {
    setMessages((m) => [...m, { role: 'user', audioUrl: url }]);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <header style={{ padding: 16, borderBottom: '1px solid #eee' }}>Chat</header>
      <MessageList messages={messages} />
      <div style={{ padding: 16, borderTop: '1px solid #eee', display: 'flex', gap: 8, alignItems: 'center' }}>
        <TextInput onSend={addText} />
        <AudioRecorder onUploaded={addAudio} />
        <AudioUploader onUploaded={addAudio} />
      </div>
    </div>
  );
}
