import { useState } from "react";
import { MessageList } from "../../components/MessageList/MessageList";
import { TextInput } from "../../components/TextInput/TextInput";
import { AudioRecorder } from "../../components/AudioRecorder/AudioRecorder";
import { AudioUploader } from "../../components/AudioUploader/AudioUploader";
import Header from "../../components/Header/Header";
import { parseFiltersWithAI, transcribeAudioByUrl } from "../../lib/api";
import { buildDashboardQueryString, parseChatQueryToParams } from "./queryParser";
import "./ChatPage.css";

type Message = {
  role: "user" | "assistant";
  content?: string;
  audioUrl?: string;
  ctaHref?: string;
};

interface ChatPageProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export default function ChatPage({ currentPage, onNavigate }: ChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Olá! Eu sou seu assistente de filtros. Diga coisas como: 'hoje', 'esta semana', 'ultima semana', 'entre 01/09 e 10/09', 'maior que 6', 'entre 7 e 9', 'com tag empatia'.",
    },
  ]);

  function addText(text: string) {
    setMessages((m) => [...m, { role: "user", content: text }]);
    const parsed = parseChatQueryToParams(text);
    if (parsed) {
      const href = buildDashboardQueryString(parsed.params);
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: `Ok! Apliquei: ${parsed.summary}. Clique abaixo para ver no Dashboard.`,
          ctaHref: href,
        },
      ]);
      return;
    }

    // Fallback to AI parsing with typing indicator
    setMessages((m) => [...m, { role: "assistant", typing: true }]);
    parseFiltersWithAI(text)
      .then(({ params, summary }) => {
        const href = buildDashboardQueryString(params);
        setMessages((m) => {
          const next = [...m];
          const idx = next.findIndex((mm) => mm.typing);
          if (idx !== -1) next.splice(idx, 1);
          next.push({ role: "assistant", content: `Entendi. ${summary}. Clique abaixo para ver no Dashboard.`, ctaHref: href });
          return next;
        });
      })
      .catch(() => {
        setMessages((m) => {
          const next = [...m];
          const idx = next.findIndex((mm) => mm.typing);
          if (idx !== -1) next.splice(idx, 1);
          next.push({ role: "assistant", content: "Não consegui interpretar o pedido. Tente dizer por exemplo: 'hoje', 'esta semana', 'maior que 6', 'entre 7 e 9', 'com tag empatia'." });
          return next;
        });
      });
  }

  async function addAudio(url: string) {
    let insertedIndex = -1;
    setMessages((prev) => {
      insertedIndex = prev.length;
      return [...prev, { role: "user", audioUrl: url }];
    });

    try {
      const { text } = await transcribeAudioByUrl(url);
      setMessages((prev) => {
        const next = [...prev];
        const existing = next[insertedIndex];
        if (existing && existing.audioUrl === url) {
          next[insertedIndex] = { ...existing, content: text };
          return next;
        }
        return [...next, { role: "user", audioUrl: url, content: text }];
      });

      const parsed = parseChatQueryToParams(text);
      if (parsed) {
        const href = buildDashboardQueryString(parsed.params);
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content: `Entendi o áudio. ${parsed.summary}. Clique abaixo para ver no Dashboard.`,
            ctaHref: href,
          },
        ]);
        return;
      }

      // Fallback to AI parsing
      setMessages((m) => [...m, { role: "assistant", typing: true }]);
      parseFiltersWithAI(text)
        .then(({ params, summary }) => {
          const href = buildDashboardQueryString(params);
          setMessages((m) => {
            const next = [...m];
            const idx = next.findIndex((mm) => mm.typing);
            if (idx !== -1) next.splice(idx, 1);
            next.push({ role: "assistant", content: `Entendi o áudio. ${summary}. Clique abaixo para ver no Dashboard.`, ctaHref: href });
            return next;
          });
        })
        .catch(() => {
          setMessages((m) => {
            const next = [...m];
            const idx = next.findIndex((mm) => mm.typing);
            if (idx !== -1) next.splice(idx, 1);
            next.push({ role: "assistant", content: "Não consegui interpretar o pedido. Diga, por exemplo: 'entre 01/09 e 10/09', 'maior que 6', 'com tag empatia'." });
            return next;
          });
        });
    } catch (err) {
      setMessages((prev) => {
        const next = [...prev];
        const existing = next[insertedIndex];
        const fallback = "Não foi possível transcrever o áudio.";
        if (existing && existing.audioUrl === url) {
          next[insertedIndex] = { ...existing, content: fallback };
          return next;
        }
        return [...next, { role: "user", audioUrl: url, content: fallback }];
      });
    }
  }

  return (
    <div className="chat-container">
      <Header currentPage={currentPage} onNavigate={onNavigate} />
      <main className="chat-main-content">
        <div className="chat-content-container">
          <MessageList messages={messages} />
          <div className="chat-input-area">
            <TextInput onSend={addText} />
            <AudioRecorder onUploaded={addAudio} />
            <AudioUploader onUploaded={addAudio} />
          </div>
        </div>
      </main>
    </div>
  );
}
