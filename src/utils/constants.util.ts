import { IconBrandWhatsapp,IconCreditCard, IconPalette, IconSettings, IconShare, IconSourceCode, IconSparkles, IconUser } from "@tabler/icons-react";

export const tabsAgentSelected = [
    { value: "playground", label: "Playground" },
    { value: "activity", label: "Atividade" },
    { value: "sources", label: "Fontes" },
    { value: "connect", label: "Conectar" },
    { value: "settings", label: "Configurações" }
];

export const tabsConfigs = [
    { value: "agents", label: "Agentes" },
    // { value: "/usage", label: "Uso" },
    { value: "adjustments", label: "Ajustes" },
];

export const menuConnect = [
    { label: 'Embed', icon: IconSourceCode, prefix: '/embed', option: 'embed' },
    { label: 'Compartilhar', icon: IconShare, prefix: '/share', option: 'share' },
    { label: 'Canais', icon: IconBrandWhatsapp, prefix: '/channels', option: 'channels' },
];

export const menuSettings = [
    { label: 'Geral', icon: IconSettings, prefix: '/general', option: 'general' },
    //{ label: 'IA', icon: IconSparkles, prefix: '/ia', option: 'ia' },
    //{ label: 'Customização', icon: IconPalette, prefix: '/customization', option: 'customization' },
];

export const menuAdjustments = [
    { label: 'Conta', icon: IconUser, prefix: '/account', option: 'account' },
    { label: 'Planos', icon: IconCreditCard, prefix: '/plans', option: 'plans' },
];

// Legacy constants for backward compatibility
export const tabsChatSelected = tabsAgentSelected;