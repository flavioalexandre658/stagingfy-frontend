// Define os possíveis papéis de uma mensagem no chat
export type ChatRole = "user" | "agent" | "bot";

// Representa uma mensagem do chat
export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  type?: "text" | "image";
  created_at?: string;
}

// Representa uma conversa salva (dados essenciais para localStorage)
export interface SavedChatReference {
  id: string; // local chat ID
  conversation_id?: string; // backend conversation ID
  agent_id: string;
  agent_name: string;
  created_at: string;
  updated_at: string;
  is_archived: boolean;
  finished?: boolean; // indica se a conversation foi finalizada
  last_message_preview?: string; // preview da última mensagem
}

// Representa uma conversa completa carregada da API
export interface SavedChat extends SavedChatReference {
  messages: ChatMessage[];
}

// Representa o estado local do chat (apenas referências essenciais)
export interface LocalChatState {
  chatReferences: SavedChatReference[];
  current_chat_id?: string;
}

// Estilização de um balão de mensagem (user ou agent)
export interface ChatBubbleStyle {
  backgroundColor: string;
  textColor: string;
  borderRadius: string;
}

// Configuração do cabeçalho do chat
export interface ChatHeaderConfig {
  title: string;
  backgroundColor: string;
  textColor: string;
  height: string;
  iconUrl: string | null;
}

// Configuração visual do chat
export interface ChatBubblesConfig {
  user: ChatBubbleStyle;
  agent: ChatBubbleStyle;
  maxWidthPercent: number;
}

// Configuração geral do ChatWindow
export interface ChatConfig {
  themeColor: string;
  fontColor: string;
  fontSize: string;
  font: string;
  header: ChatHeaderConfig;
  bubbles: ChatBubblesConfig;
  placeholder: string;
  initialMessages: { id: string; role: ChatRole; content: string, created_at: string }[];
  showReactions: boolean;
  suggestedMessages: string[];
  footerHTML?: string;
  conditions: {
    syncHeaderWithUserBubble: boolean;
  };
}
