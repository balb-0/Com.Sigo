import { useState } from 'react';
import { MessageList } from '../../components/MessageList/MessageList';
import { TextInput } from '../../components/TextInput/TextInput';
import { AudioRecorder } from '../../components/AudioRecorder/AudioRecorder';
import { AudioUploader } from '../../components/AudioUploader/AudioUploader';
import Header from '../../components/Header/Header';
import './ChatPage.css';

type Message = { role: 'user' | 'assistant'; content?: string; audioUrl?: string };

interface ChatPageProps {
    currentPage?: string;
    onNavigate?: (page: string) => void;
}

export default function ChatPage({ currentPage, onNavigate }: ChatPageProps) {
    const [messages, setMessages] = useState<Message[]>([]);

    function addText(text: string) {
        setMessages((m) => [...m, { role: 'user', content: text }]);
    }

    function addAudio(url: string) {
        setMessages((m) => [...m, { role: 'user', audioUrl: url }]);
    }

    return (
        <div className="chat-container">
            <Header currentPage={currentPage} onNavigate={onNavigate} />
            <main className="chat-main-content">
                <MessageList messages={messages} />
                <div className="chat-input-area">
                    <TextInput onSend={addText} />
                    <AudioRecorder onUploaded={addAudio} />
                    <AudioUploader onUploaded={addAudio} />
                </div>
            </main>
        </div>
    );
}
