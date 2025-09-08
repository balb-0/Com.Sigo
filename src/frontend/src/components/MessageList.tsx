type Message = { role: 'user' | 'assistant'; content?: string; audioUrl?: string };

export function MessageList({ messages }: { messages: Message[] }) {
  return (
    <main style={{ flex: 1, overflow: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
      {messages.map((m, i) => (
        <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: 520 }}>
          {m.content && <div style={{ background: '#f4f4f5', padding: 12, borderRadius: 12 }}>{m.content}</div>}
          {m.audioUrl && <audio controls src={m.audioUrl} style={{ width: 300 }} />}
        </div>
      ))}
    </main>
  );
}
