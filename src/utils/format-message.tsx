import React from 'react';

// Regex mais robusta para capturar URLs completas
const URL_REGEX = /(https?:\/\/(?:[-\w.])+(?::[0-9]+)?(?:\/(?:[\w\/_.])*)?(?:\?(?:[\w&=%.])*)?(?:#(?:[\w.])*)?)/g;

export function formatMessageWithLinks(text: string): React.ReactNode[] {
    if (!text) return [];

    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    let keyCounter = 0;

    // Reset regex index
    URL_REGEX.lastIndex = 0;

    while ((match = URL_REGEX.exec(text)) !== null) {
        const url = match[0];
        const startIndex = match.index;

        // Adiciona o texto antes do link
        if (startIndex > lastIndex) {
            const textBefore = text.substring(lastIndex, startIndex);
            if (textBefore) {
                parts.push(textBefore);
            }
        }

        // Adiciona o link
        parts.push(
            <a
                key={`link-${keyCounter++}`}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-vmenta-500 hover:text-vmenta-600 underline transition-colors duration-200"
            >
                {url}
            </a>
        );

        lastIndex = startIndex + url.length;
    }

    // Adiciona o texto restante após o último link
    if (lastIndex < text.length) {
        const remainingText = text.substring(lastIndex);
        if (remainingText) {
            parts.push(remainingText);
        }
    }

    // Se não há links, retorna o texto original
    if (parts.length === 0) {
        parts.push(text);
    }

    return parts;
} 