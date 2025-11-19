export interface Plan {
    id: string;
    name: string;
    slug: string;
    price: number;
    currency: string;
    interval: string;
    description: string;
    features: string[];
    max_agents: number;
    max_messages: number;
    max_links: number;
    max_document_size: number;
    max_messages_per_month: number;
    stripe_price_id?: string;
    is_popular?: boolean;
    is_enterprise?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateCheckoutRequest {
    planId: string;
    successUrl?: string;
    cancelUrl?: string;
}

export interface CreateCheckoutResponse {
    url: string;
    sessionId: string;
}

export interface UserSubscription {
    id: string;
    userId?: string;
    user_id?: string;
    planId?: string;
    plan_id?: string;
    plan?: Plan;
    status: 'active' | 'inactive' | 'canceled' | 'past_due';
    currentPeriodStart?: string;
    currentPeriodEnd?: string;
    cancelAtPeriodEnd?: boolean;
    stripeSubscriptionId?: string;
    stripe_subscription_id?: string;
    createdAt?: string;
    updatedAt?: string;
}