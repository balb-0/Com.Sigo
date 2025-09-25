import "./CallDetailsModal.css";
import type { Chamada } from "../Table/Table";

interface CallDetailsModalProps {
  chamada: Chamada | null;
  isOpen: boolean;
  onClose: () => void;
}

interface ConversationMessage {
  role: "Cliente" | "Atendente";
  content: string;
}

export function CallDetailsModal({
  chamada,
  isOpen,
  onClose,
}: CallDetailsModalProps) {
  if (!isOpen || !chamada) return null;

  // Mock conversation data - in real app this would come from API
  const conversation: ConversationMessage[] = [
    {
      role: "Cliente",
      content:
        "Alô? Finalmente! Eu já tentei resolver isso pelo site umas três vezes, mas aquele robô não entende nada do que eu falo!",
    },
    {
      role: "Atendente",
      content:
        "Boa tarde! Peço desculpas pela sua experiência no nosso canal digital. Meu nome é Atendente e agora eu vou te ajudar a resolver isso. Pode me confirmar seu CPF, por favor?",
    },
    {
      role: "Cliente",
      content:
        "(Informa o CPF). O problema é que a minha fatura deste mês veio com um valor muito mais alto, cobrando um serviço que eu não contratei.",
    },
  ];

  const mockSummary =
    "O cliente iniciou a chamada frustrado com o canal digital (Transferência Digital), mas o atendente reverteu a situação com agilidade e empatia, cancelando um serviço indevido e emitindo uma nova fatura. A chamada terminou com a questão totalmente Resolvida e um Elogio explícito ao atendente.";

  const mockAnalysis =
    "Para o Atendimento Humano: O atendente aplicou excelentemente as técnicas de reversão de cliente insatisfeito. A empatia inicial e a resolução rápida foram cruciais para o sucesso. Este é um ótimo exemplo para usar em treinamentos.";

  const getScoreColor = (score: number) => {
    if (score < 4) return "var(--color-vermelho)";
    if (score < 7) return "var(--color-amarelo)";
    return "var(--color-verde)";
  };

  const getTagClass = (type: string) => {
    switch (type) {
      case "positivo":
        return "tagPositivo";
      case "negativo":
        return "tagNegativo";
      case "neutro":
        return "tagNeutro";
      default:
        return "";
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M232,80V192a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V80A16,16,0,0,1,40,64H216A16,16,0,0,1,232,80ZM176,112a16,16,0,1,0-16,16A16,16,0,0,0,176,112Zm-80,0a16,16,0,1,0-16,16A16,16,0,0,0,96,112Z"></path>
            </svg>
          </div>

          <button className="close-button" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
            </svg>
          </button>
        </div>

        {/* Call Info Section */}
        <div className="call-info-section">
          <div className="call-info-left">
            <div className="modal-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M231.88,175.08A56.26,56.26,0,0,1,176,224C96.6,224,32,159.4,32,80A56.26,56.26,0,0,1,80.92,24.12a16,16,0,0,1,16.62,9.52l21.12,47.15,0,.12A16,16,0,0,1,117.39,96c-.18.27-.37.52-.57.77L96,121.45c7.49,15.22,23.41,31,38.83,38.51l24.34-20.71a8.12,8.12,0,0,1,.75-.56a16,16,0,0,1,15.17-1.4l.13.06,47.11,21.11A16,16,0,0,1,231.88,175.08Z"></path>
              </svg>
            </div>
            <span className="call-id">{chamada.id}</span>
          </div>

          <div className="call-info-center">
            <div className="call-date">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM128,168a16,16,0,1,1,16-16A16,16,0,0,1,128,168Zm80-88H48V48H72v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24Z"></path>
              </svg>
              {chamada.dataHora}
            </div>

            <div className="call-score">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M221.87,90.86a4,4,0,0,0-6.17-.62l-75.42,75.42A8,8,0,0,1,129,154.35l92.7-92.69a8,8,0,0,0-11.32-11.32L197,63.73A112.05,112.05,0,0,0,22.34,189.25,16.09,16.09,0,0,0,37.46,200H218.53a16,16,0,0,0,15.11-10.71,112.28,112.28,0,0,0-11.77-98.43ZM57.44,166.41a8,8,0,0,1-6.25,9.43,7.89,7.89,0,0,1-1.6.16,8,8,0,0,1-7.83-6.41A88.06,88.06,0,0,1,143.59,65.38a8,8,0,0,1-2.82,15.75,72.07,72.07,0,0,0-83.33,85.28Z"></path>
              </svg>
              <span style={{ color: getScoreColor(chamada.pontuacao) }}>
                {chamada.pontuacao}/10
              </span>
            </div>
          </div>

          <div className="call-info-right">
            <div className="call-tags">
              {chamada.tags.map((tag, index) => (
                <span key={index} className={`tag ${getTagClass(tag.type)}`}>
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Content - Both sections stacked */}
        <div className="modal-body">
          {/* AI Point of View Section */}
          <div className="section-header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M216,40H72A16,16,0,0,0,56,56V72H40A16,16,0,0,0,24,88V200a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V184h16a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM184,200H40V88H56v80a16,16,0,0,0,16,16H184Zm32-32H72V56H216Z"></path>
            </svg>
            Ponto de vista da IA
          </div>

          <div className="resumo-content">
            <div className="summary-section">
              <h3>Resumo da Chamada:</h3>
              <p>{mockSummary}</p>
            </div>

            <div className="analysis-section">
              <h3>Análise e Sugestões:</h3>
              <ul>
                <li>{mockAnalysis}</li>
              </ul>
            </div>
          </div>

          {/* Complete Conversation Section */}
          <div className="section-header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M232,124A100.11,100.11,0,0,1,132,224H48a16,16,0,0,1-16-16V124a100,100,0,0,1,200,0Z"></path>
            </svg>
            Conversa completa
          </div>

          <div className="conversa-content">
            {conversation.map((message, index) => (
              <div
                key={index}
                className={`conversation-message ${message.role.toLowerCase()}`}
              >
                <div className="message-content">
                  <div className="message-header">
                    <strong>{message.role}</strong>
                  </div>
                  <div className="message-text">{message.content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
