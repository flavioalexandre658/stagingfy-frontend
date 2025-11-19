import { ChatConfig } from "./chat.interface";
import { KnowledgeSource } from "./knowledge-source.interface";
// Status possível do chatbot
export type AgentStatus = "training" | "active" | "disable";

// Interface principal do modelo Chatbot
export interface Agent {
  id: string; // UUID
  user_id: string; // UUID (FK → users)

  name: string;
  description: string;

  status: AgentStatus;
  model: string; // ex: "gpt-4"

  config: ChatConfig; // JSON de configuração do modelo
  personalization: AgentPersonalization; // JSON de cores, temas, tom de voz

  embed_url: string;
  slug: string;

  is_public: boolean;
  access_key?: string;

  created_at: string; // ou Date, se estiver usando Date no seu backend
  updated_at: string;

  // Relacionamentos (opcionalmente populáveis)
  knowledge_sources?: KnowledgeSource[];
  integrations?: Integration[];
  conversations?: Conversation[];
}

export interface AgentPersonalization {
  toneOfVoice: string;
  temperature?: number;
  instructions?: string;
  type_of_agent?: string;
}

export interface Integration {
  id: string;
  chatbot_id: string;
  provider: string;
  config: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: string;
  chatbot_id: string;
  user_id?: string;
  created_at: string;
  finished?: boolean;
  messages: ConversationMessage[];
}

export interface ConversationMessage {
  id: string;
  conversation_id: string;
  role: "user" | "agent" | "system";
  content: string;
  timestamp: string;
}
