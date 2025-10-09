import { useState } from "react";
import { MessageList } from "../../components/MessageList/MessageList";
import { TextInput } from "../../components/TextInput/TextInput";
import { AudioRecorder } from "../../components/AudioRecorder/AudioRecorder";
import { AudioUploader } from "../../components/AudioUploader/AudioUploader";
import Header from "../../components/Header/Header";
import { transcribeAudioByUrl, agentInterpret } from "../../lib/api";
import { buildDashboardQueryString } from "./queryParser";
import "./ChatPage.css";

type Message = {
  role: "user" | "assistant";
  content?: string;
  audioUrl?: string;
  ctaHref?: string;
  typing?: boolean;
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
        "Olá! Eu sou seu assistente de filtros. Diga coisas como: 'hoje', 'esta semana', 'ultima semana', 'entre 01/09 e 10/09', 'maior que 6', 'entre 7 e 9', 'com tag empatia'. Também posso buscar trechos semânticos, por exemplo: 'cliente disse \"vazamento\"'.",
    },
  ]);

  function setTyping() {
    setMessages((m) => [...m, { role: "assistant", typing: true }]);
  }
  function clearTypingAndPush(msg: Message) {
    setMessages((m) => {
      const next = [...m];
      const idx = next.findIndex((mm) => mm.typing);
      if (idx !== -1) next.splice(idx, 1);
      next.push(msg);
      return next;
    });
  }

  async function handleAgentAndPreview(text: string) {
    try {
      setTyping();
      const agent = await agentInterpret(text);
      // Monta URL exata para o Dashboard a partir de filtros retornados pelo agente
      const filters = (agent as any).filters || {};
      // Fallback client-side: if user pediu "últimos N dias" e o LLM não setou, ajusta
      const lastDaysMatch = text.toLowerCase().match(/\bultim[oa]s?\s+(\d+)\s+dias\b/);
      if (lastDaysMatch) {
        const n = Number(lastDaysMatch[1]);
        if (!filters.dateRange) filters.dateRange = {};
        if (!filters.dateRange.lastDays) filters.dateRange.lastDays = n;
        if (!filters.dateRange.filter) filters.dateRange.filter = 'custom';
      }
      const search = new URLSearchParams();
      if (filters.dateRange?.lastDays && !filters.dateRange?.filter) search.set('filter', 'custom');
      if (filters.dateRange?.filter) search.set('filter', filters.dateRange.filter);
      if (filters.dateRange?.from) search.set('startDate', filters.dateRange.from);
      if (filters.dateRange?.to) search.set('endDate', filters.dateRange.to);
      if (filters.dateRange?.lastDays) search.set('lastDays', String(filters.dateRange.lastDays));
      if (filters.speaker) search.set('speaker', filters.speaker);
      if (filters.semantic) search.set('semantic', filters.semantic);
      const href = `/?${search.toString()}`;
      clearTypingAndPush({ role: "assistant", content: agent.reply, ctaHref: filters.semantic || filters.dateRange ? href : undefined });
    } catch {
      clearTypingAndPush({
        role: "assistant",
        content:
          "Não consegui interpretar. Tente: cliente/agente disse 'palavra', ou filtros: 'hoje', 'esta semana', 'entre 01/09 e 10/09'.",
      });
    }
  }

  function addText(text: string) {
    setMessages((m) => [...m, { role: "user", content: text }]);

    // Agente LLM (fonte única de verdade)
    void handleAgentAndPreview(text);
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

      // Agente LLM (fonte única)
      void handleAgentAndPreview(text);
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
