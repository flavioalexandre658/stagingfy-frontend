import { Agent, AgentPersonalization } from "@/interfaces/agent.interface";
import { ChatBubblesConfig, ChatConfig, ChatHeaderConfig } from "@/interfaces/chat.interface";

export const mockAgent: Agent = {
    id: "e12f6c6a-5b8e-4f3c-a1a1-0d27f2db6abc",
    user_id: "f9b3a6c9-1c23-4d4d-a3c2-f01fd1234abc",
    name: "Chat Agentes",
    description: "Assistente virtual para atendimento ao cliente.",
    status: "active",
    model: "gpt-4",
    config: {
        themeColor: "#000000",
        fontColor: "#FFFFFF",
        fontSize: "16px",
        font: "Inter",
        header: {
            title: "Chat agentes",
            iconUrl: "/assets/images/icon/icon.svg",
            backgroundColor: "#F3F4F6",
            textColor: "#000000",
            height: "48px",
        } as ChatHeaderConfig,
        bubbles: {
            user: {
                backgroundColor: "#000000",
                textColor: "#FFFFFF",
                borderRadius: "1rem",
            },
            agent: {
                backgroundColor: "#F3F4F6",
                textColor: "#1F2937",
                borderRadius: "1rem",
            },
            maxWidthPercent: 75,
        } as ChatBubblesConfig,
        placeholder: "Escreva sua mensagem...",
        initialMessages: [
            { role: "agent", content: "Olá! Como posso ajudar hoje?" },
        ],
        showReactions: true,
        suggestedMessages: ["Oi, bom dia", "Tudo bem?"],
        footerHTML: `<a href="/privacy" class="underline">Privacy Policy</a>`,
        conditions: {
            syncHeaderWithUserBubble: false,
        },
    } as ChatConfig,
    personalization: {
        toneOfVoice: "amigável",
    } as AgentPersonalization,
    embed_url: "https://chatagentes.com/embed/chat-agentes",
    slug: "chat-agentes",
    is_public: true,
    access_key: "abc123",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),

    knowledge_sources: [],
    integrations: [],
    conversations: [],
};