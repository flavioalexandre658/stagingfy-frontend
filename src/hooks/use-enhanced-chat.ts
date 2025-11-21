import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

import { createConversation } from '@/actions/conversation/create-conversation';
import { getConversations } from '@/actions/conversation/get-conversations';
import { getMessages } from '@/actions/conversation/get-messages';
import { updateConversation } from '@/actions/conversation/update-conversation';
import { Conversation, ConversationMessage } from '@/interfaces/agent.interface';
import { ChatMessage, LocalChatState, SavedChat, SavedChatReference } from '@/interfaces/chat.interface';

const LOCAL_STORAGE_KEY = '@stagingfy:chat-references';

export function useEnhancedChat(agent_id: string, agent_name: string) {
    const [state, setState] = useState<LocalChatState>({ chatReferences: [] });
    const [currentChat, setCurrentChat] = useState<SavedChat | null>(null);
    const [loading, setLoading] = useState(false);
    const [loadingMessages, setLoadingMessages] = useState(false);

    // Carrega o estado inicial do localStorage
    useEffect(() => {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
            const parsedState = JSON.parse(stored);
            setState(parsedState);
        }
    }, []);

    // Carrega conversations da API quando o agent_id muda
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const conversationsResult = await getConversations(agent_id);

                if (!conversationsResult.error && conversationsResult.data) {
                    const apiConversations = conversationsResult.data;

                    setState(prev => {
                        const updatedReferences: SavedChatReference[] = [...prev.chatReferences];

                        // Sincroniza conversations da API com localStorage
                        apiConversations.forEach((conversation: Conversation) => {
                            const existingRefIndex = updatedReferences.findIndex(ref => ref.conversation_id === conversation.id);

                            const conversationRef: SavedChatReference = {
                                id: existingRefIndex >= 0 ? updatedReferences[existingRefIndex].id : uuidv4(),
                                conversation_id: conversation.id,
                                agent_id,
                                agent_name,
                                created_at: conversation.created_at,
                                updated_at: conversation.created_at,
                                is_archived: false,
                                finished: (conversation as any).finished || false,
                                last_message_preview: existingRefIndex >= 0 ? updatedReferences[existingRefIndex].last_message_preview : undefined
                            };

                            if (existingRefIndex >= 0) {
                                updatedReferences[existingRefIndex] = conversationRef;
                            } else {
                                updatedReferences.push(conversationRef);
                            }
                        });

                        return {
                            ...prev,
                            chatReferences: updatedReferences
                        };
                    });
                }
            } catch (error) {
                console.error('Erro ao carregar conversations da API:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [agent_id, agent_name]);

    // Salva alterações no localStorage (com debounce para evitar muitas escritas)
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
        }, 100);

        return () => clearTimeout(timeoutId);
    }, [state]);

    // Função para recarregar conversations da API (para uso manual)
    const loadConversationsFromAPI = useCallback(async () => {
        try {
            setLoading(true);
            const conversationsResult = await getConversations(agent_id);

            if (!conversationsResult.error && conversationsResult.data) {
                const apiConversations = conversationsResult.data;

                setState(prev => {
                    const updatedReferences: SavedChatReference[] = [...prev.chatReferences];

                    // Sincroniza conversations da API com localStorage
                    apiConversations.forEach((conversation: Conversation) => {
                        const existingRefIndex = updatedReferences.findIndex(ref => ref.conversation_id === conversation.id);

                        const conversationRef: SavedChatReference = {
                            id: existingRefIndex >= 0 ? updatedReferences[existingRefIndex].id : uuidv4(),
                            conversation_id: conversation.id,
                            agent_id,
                            agent_name,
                            created_at: conversation.created_at,
                            updated_at: conversation.created_at,
                            is_archived: false,
                            finished: (conversation as any).finished || false,
                            last_message_preview: existingRefIndex >= 0 ? updatedReferences[existingRefIndex].last_message_preview : undefined
                        };

                        if (existingRefIndex >= 0) {
                            updatedReferences[existingRefIndex] = conversationRef;
                        } else {
                            updatedReferences.push(conversationRef);
                        }
                    });

                    return {
                        ...prev,
                        chatReferences: updatedReferences
                    };
                });
            }
        } catch (error) {
            console.error('Erro ao carregar conversations da API:', error);
        } finally {
            setLoading(false);
        }
    }, [agent_id, agent_name]);

    // Carrega messages de uma conversation
    const loadChatMessages = useCallback(async (chatReference: SavedChatReference): Promise<SavedChat> => {
        if (!chatReference.conversation_id) {
            // Chat local sem conversation_id - retorna com messages vazias
            return {
                ...chatReference,
                messages: []
            };
        }

        try {
            setLoadingMessages(true);
            const messagesResult = await getMessages(chatReference.conversation_id);

            if (!messagesResult.error && messagesResult.data) {
                const apiMessages = messagesResult.data;

                // Converte ConversationMessage para ChatMessage
                const chatMessages: ChatMessage[] = apiMessages.map((msg: ConversationMessage) => ({
                    id: msg.id,
                    role: msg.role === 'agent' ? 'agent' : msg.role as 'user' | 'agent',
                    content: msg.content,
                    created_at: msg.timestamp
                }));

                return {
                    ...chatReference,
                    messages: chatMessages
                };
            } else {
                toast.error('Erro ao carregar mensagens do chat');
                return {
                    ...chatReference,
                    messages: []
                };
            }
        } catch (error) {
            console.error('Erro ao carregar messages:', error);
            toast.error('Erro ao carregar mensagens do chat');
            return {
                ...chatReference,
                messages: []
            };
        } finally {
            setLoadingMessages(false);
        }
    }, []);

    // Inicia um novo chat
    const startNewChat = useCallback(async () => {
        const newChatReference: SavedChatReference = {
            id: uuidv4(),
            agent_id,
            agent_name,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            is_archived: false,
        };

        setState(prev => ({
            chatReferences: [...prev.chatReferences, newChatReference],
            current_chat_id: newChatReference.id,
        }));

        const newChat: SavedChat = {
            ...newChatReference,
            messages: []
        };

        setCurrentChat(newChat);
        return newChat;
    }, [agent_id, agent_name]);

    // Atualiza as mensagens do chat atual
    const updateCurrentChat = useCallback((messages: ChatMessage[]) => {
        if (!currentChat) return;

        const updatedChat = {
            ...currentChat,
            messages,
            updated_at: new Date().toISOString(),
            last_message_preview: messages[messages.length - 1]?.content.substring(0, 50) || ''
        };

        setCurrentChat(updatedChat);

        // Atualiza a referência no localStorage
        setState(prev => ({
            ...prev,
            chatReferences: prev.chatReferences.map(ref =>
                ref.id === currentChat.id
                    ? {
                        ...ref,
                        updated_at: updatedChat.updated_at,
                        last_message_preview: updatedChat.last_message_preview
                    }
                    : ref
            )
        }));
    }, [currentChat]);

    // Vincula conversation_id ao chat local
    const linkConversationToChat = useCallback((chatId: string, conversationId: string) => {
        setState(prev => ({
            ...prev,
            chatReferences: prev.chatReferences.map(ref =>
                ref.id === chatId
                    ? { ...ref, conversation_id: conversationId }
                    : ref
            )
        }));

        if (currentChat?.id === chatId) {
            setCurrentChat(prev => prev ? { ...prev, conversation_id: conversationId } : null);
        }
    }, [currentChat]);

    // Arquiva o chat atual
    const archiveCurrentChat = useCallback(async () => {
        if (!currentChat) return;

        try {
            // Se tem conversation_id, finaliza na API
            if (currentChat.conversation_id) {
                const result = await updateConversation(currentChat.conversation_id);
                if (result.error) {
                    toast.error('Erro ao finalizar conversa na API');
                    console.error('Erro ao finalizar conversation:', result.error);
                }
            }

            setState(prev => ({
                ...prev,
                chatReferences: prev.chatReferences.map(ref =>
                    ref.id === currentChat.id
                        ? { ...ref, is_archived: true, finished: true }
                        : ref
                ),
                current_chat_id: undefined,
            }));

            setCurrentChat(null);
        } catch (error) {
            console.error('Erro ao arquivar chat:', error);
            toast.error('Erro ao arquivar conversa');
        }
    }, [currentChat]);

    // Restaura/seleciona uma conversation
    const restoreChat = useCallback(async (chatId: string) => {
        const chatReference = state.chatReferences.find(ref => ref.id === chatId);
        if (!chatReference) return;

        setState(prev => ({
            ...prev,
            current_chat_id: chatId,
        }));

        // Carrega o chat completo com messages
        const fullChat = await loadChatMessages(chatReference);
        setCurrentChat(fullChat);
    }, [state.chatReferences]);

    // Obtém todas as conversations salvas
    const getAllSavedChats = useCallback(async (): Promise<SavedChat[]> => {
        const allChats: SavedChat[] = [];
        const currentReferences = state.chatReferences;

        for (const ref of currentReferences) {
            if (ref.conversation_id) { // Apenas conversations que existem na API
                const fullChat = await loadChatMessages(ref);
                allChats.push(fullChat);
            }
        }

        return allChats.sort((a, b) => (new Date(b.updated_at || b.created_at).getTime()) - (new Date(a.updated_at || a.created_at).getTime()));
    }, [state.chatReferences]);

    // Obtém os chats arquivados (para compatibilidade, mas agora retorna todas)
    const getArchivedChats = useCallback(async (): Promise<SavedChat[]> => {
        return getAllSavedChats();
    }, [getAllSavedChats]);

    return {
        currentChat,
        archivedChats: [], // Será carregado sob demanda via getArchivedChats
        loading,
        loadingMessages,
        startNewChat,
        updateCurrentChat,
        archiveCurrentChat,
        restoreChat,
        loadConversationsFromAPI,
        linkConversationToChat,
        getArchivedChats,
        getAllSavedChats,
    };
}