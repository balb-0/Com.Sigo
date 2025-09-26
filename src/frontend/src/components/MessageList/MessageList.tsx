import "./MessageList.css";
import { useNavigate } from "react-router-dom";

type Message = {
  role: "user" | "assistant";
  content?: string;
  audioUrl?: string;
  ctaHref?: string;
  typing?: boolean;
};

export function MessageList({ messages }: { messages: Message[] }) {
  const navigate = useNavigate();
  return (
    <main className="message-list">
      {messages.map((m, i) => (
        <div key={i} className={`message-item ${m.role}`}>
          {m.content && (
            <div className="message-content">
              {m.role === "user" && <div className="message-label">Você</div>}
              <div className="message-text">{m.content}</div>
              {m.role === "assistant" && (m as any).ctaHref && (
                <button className="audio-recorder-button" onClick={() => navigate((m as any).ctaHref)}>
                  Ver no Dashboard
                </button>
              )}
            </div>
          )}
          {m.typing && (
            <div className="message-content">
              <div className="typing-dots"><span></span><span></span><span></span></div>
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
