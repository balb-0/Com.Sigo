import "./MessageList.css";

type Message = {
  role: "user" | "assistant";
  content?: string;
  audioUrl?: string;
};

export function MessageList({ messages }: { messages: Message[] }) {
  return (
    <main className="message-list">
      {messages.map((m, i) => (
        <div key={i} className={`message-item ${m.role}`}>
          {m.content && (
            <div className="message-content">
              {m.role === "user" && <div className="message-label">Você</div>}
              <div className="message-text">{m.content}</div>
            </div>
          )}
          {m.audioUrl && (
            <audio controls src={m.audioUrl} className="message-audio" />
          )}
        </div>
      ))}
    </main>
  );
}
