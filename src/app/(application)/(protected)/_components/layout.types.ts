export type Tab = {
    value: string;
    label: string;
}

export type AgentList = {
    value: string;
    label: string;
    slug: string;
    id: string;
}

// Legacy type for backward compatibility
export type ChatList = AgentList;