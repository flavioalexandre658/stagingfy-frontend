// utils.js
import 'dayjs/locale/pt-br';

import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export function getInitials(name: string): string {
    const words = name.trim().split(/\s+/)
    const initials = words.slice(0, 2).map((w) => w[0]).join("")
    return initials.toUpperCase()
}

export const getCookie = (name: string) => {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ').reduce((acc: { [key: string]: string }, current: string) => {
        const [key, value] = current.split('=');
        acc[key] = value;
        return acc;
    }, {});
    return cookies[name] || null;
};

export const setCookie = (name: string, value: string, options: { days?: number, path?: string, domain?: string, secure?: boolean, sameSite?: string } = {}) => {
    const { days = 7, path = '/', domain, secure, sameSite } = options;

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=${path};`;

    // Configurar o tempo de expiração (se especificado)
    if (days) {
        const date = new Date();
        date.setDate(date.getDate() + days);
        cookieString += `expires=${date.toUTCString()};`;
    }

    // Configurar o domínio (se especificado)
    if (domain) {
        cookieString += `domain=${domain};`;
    }

    // Configurar o atributo secure (se especificado)
    if (secure) {
        cookieString += 'secure;';
    }

    // Configurar o atributo SameSite (se especificado)
    if (sameSite) {
        cookieString += `SameSite=${sameSite};`;
    }

    document.cookie = cookieString;
};

export function getFirstName(fullName: string) {
    if (typeof fullName !== 'string' || !fullName.trim()) {
        return '';
    }
    return fullName.split(' ')[0];
}

// Função para obter o restante do nome
export function getRemainingName(fullName: string) {
    if (typeof fullName !== 'string' || !fullName.trim()) {
        return '';
    }
    const parts = fullName.split(' ');
    if (parts.length > 1) {
        return parts.slice(1).join(' ');
    }
    return ''; // Retorna uma string vazia se não houver partes restantes
}

export function formatDate(originalDate: string) {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    const date = new Date(originalDate);
    return date.toLocaleDateString('pt-BR', options);
}

export function openUrl(url: string) {
    if (typeof window !== "undefined") {
        window.open(url, '_blank'); // Abrir em uma nova aba
    }
}

export function openWhatsApp(phoneNumber?: string, content?: string) {
    if (typeof window !== "undefined") {
        let phoneclear = clearPhone(phoneNumber || '');

        if (!phoneclear.includes('+55') && !phoneclear.includes('+')) {
            phoneclear = '+55' + phoneclear.replace(/^55/, "XX")
        }

        const url = `https://wa.me/${phoneclear}?text=${content}`; // URL do WhatsApp com o número de telefone
        window.open(url, '_blank'); // Abrir em uma nova aba
    }
}

export function clearPhone(telefone: string) {
    // Use uma expressão regular para remover todos os caracteres não numéricos, exceto o '+'
    return telefone.replace(/[^\d+]/g, '');
}

export function extractNumberFromCPF(cpf: string) {
    return cpf.replace(/[^\d]/g, '');
}

export const hashSHA256 = async (value: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(value);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
};

export function validateCNPJ(cnpj: string) {
    // Remove caracteres não numéricos
    cnpj = cnpj.replace(/[^\d]/g, '');

    // CNPJ deve ter 14 dígitos
    if (cnpj.length !== 14) return false;

    // Elimina CNPJs com todos os números iguais (e.g., 00.000.000/0000-00)
    if (/^(\d)\1+$/.test(cnpj)) return false;

    // Cálculo dos dígitos verificadores
    const calcCheckDigit = (cnpj: string, size: number) => {
        let sum = 0;
        let pos = size - 7;
        for (let i = 0; i < size; i++) {
            sum += parseInt(cnpj.charAt(i)) * pos--;
            if (pos < 2) pos = 9;
        }
        const result = sum % 11;
        return result < 2 ? 0 : 11 - result;
    };

    const check1 = calcCheckDigit(cnpj, 12); // Primeiro dígito verificador
    const check2 = calcCheckDigit(cnpj, 13); // Segundo dígito verificador

    return (
        check1 === parseInt(cnpj.charAt(12)) &&
        check2 === parseInt(cnpj.charAt(13))
    );
}

export function validateCPF(cpf: string) {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]/g, '');

    // CPF deve ter 11 dígitos
    if (cpf.length !== 11) return false;

    // Elimina CPFs com todos os números iguais (e.g., 111.111.111-11)
    if (/^(\d)\1+$/.test(cpf)) return false;

    // Cálculo dos dígitos verificadores
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let check1 = (sum * 10) % 11;
    if (check1 === 10 || check1 === 11) check1 = 0;

    if (check1 !== parseInt(cpf.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let check2 = (sum * 10) % 11;
    if (check2 === 10 || check2 === 11) check2 = 0;

    return check2 === parseInt(cpf.charAt(10));
}

export const translatePath = (path: string) => {
    const translations = {
        Premiados: "winning",
        Bilhetes: "tickets",
        Prêmios: "awards",
        Pedidos: "collaborators",
        Pagamentos: "payments",
        Ajustes: "settings",
        Redes: "media",
        Sociais: "social",
        Personalização: "customizations",
        Conta: "account",
        'home': "home",
        'gerenciar': "home",
    };

    const translatedParts: string[] = path.split("/").map((part: string) => translations[part as keyof typeof translations] || part);

    return `/${translatedParts[1]}`;
};

export function showDataFriendly(date: string) {
    const brazilTimeZone = 'America/Sao_Paulo';

    // Se a data já estiver no formato 'YYYY-MM-DD HH:mm:ss', não converter
    const isFormatted = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(date);

    const dateToConvert = isFormatted ? date : dayjs(date).utc().format('YYYY-MM-DD HH:mm:ss');

    // Aplicar o fuso horário de São Paulo e formatar de forma amigável
    return dayjs(dateToConvert)
        .tz(brazilTimeZone)
        .locale('pt-br')
        .format('ddd. D MMM [às] HH:mm');
}

export const convertToBase64 = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

export const formatCPF = (cpf: string) => {
    if (!cpf) return '';
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export const formatCurrency = (value: string) => {
    return parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};


export function getGclidFromLocalStorage() {
    return localStorage.getItem('gclid');
}

// Função para adicionar o valor do "gclid" à URL
export function addGclidToUrl(path: string) {
    const gclidValue = getGclidFromLocalStorage();

    if (gclidValue) {
        return `${path}?gclid=${encodeURIComponent(gclidValue)}`;
    }

    return path;
}

export function formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}