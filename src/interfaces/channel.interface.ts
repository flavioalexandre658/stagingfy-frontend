export interface Channel {
    id: string;
    user_id: string;
    type: 'whatsapp' | 'instagram' | 'facebook' | 'slack' | 'zapier' | 'help_page' | 'wordpress' | 'zendesk' | 'api';
    instance_name: string;
    phone_number?: string | null;
    status: 'pending_qr' | 'connected' | 'disconnected' | 'error';
    last_qr?: string | null;
    created_at: string;
    updated_at: string;
}

export interface ChannelResponse {
    id: string;
    user_id: string;
    type: string;
    instance_name: string;
    phone_number?: string | null;
    status: string;
    last_qr?: string | null;
    created_at: string;
    updated_at: string;
}

export interface CreateChannelRequest {
    type: string;
    instance_name?: string;
}

export interface CreateChannelResponse extends ChannelResponse {}

export interface GetChannelsResponse extends Array<ChannelResponse> {}