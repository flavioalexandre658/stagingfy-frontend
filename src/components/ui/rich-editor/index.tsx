'use client'

import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

import { EditorToolbar } from './toolbar'

export interface RichEditorProps {
    value?: string
    onChange?: (value: string) => void
    className?: string
    placeholder?: string
    onCharacterCount?: (count: number) => void
    showCharacterCount?: boolean
}

// Função para extrair texto puro do HTML
function stripHtml(html: string) {
    if (!html) return ''
    const doc = new DOMParser().parseFromString(html, 'text/html')
    return doc.body.textContent || ''
}

export default function RichEditor({
    value,
    onChange,
    className,
    placeholder = 'Comece a escrever...',
    onCharacterCount,
    showCharacterCount = false,
}: RichEditorProps) {
    const [characterCount, setCharacterCount] = useState(0)
    const isUpdatingRef = useRef(false)

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
                hardBreak: {
                    keepMarks: false,
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-primary underline underline-offset-4 cursor-pointer',
                },
            }),
            Placeholder.configure({
                placeholder,
            }),
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
        ],
        content: value,
        editorProps: {
            attributes: {
                class: cn(
                    'prose prose-stone dark:prose-invert max-w-full',
                    'focus:outline-none min-h-[150px] p-4',
                    'overflow-hidden break-words overflow-wrap-anywhere',
                    'whitespace-pre-wrap hyphens-auto',
                    '[&_*]:break-words [&_*]:max-w-full',
                    className
                ),
                style: 'word-break: break-word; overflow-wrap: anywhere; max-width: 100%;',
            },
        },
        onUpdate: ({ editor }) => {
            if (isUpdatingRef.current) return

            const html = editor.getHTML()
            const textContent = stripHtml(html)
            const count = new TextEncoder().encode(textContent).length

            setCharacterCount(count)
            onCharacterCount?.(count)
            onChange?.(html)
        },
    })

    useEffect(() => {
        if (!editor || !value || isUpdatingRef.current) return

        const currentContent = editor.getHTML()
        if (value === currentContent) return

        isUpdatingRef.current = true
        editor.commands.setContent(value)

        const textContent = stripHtml(value)
        const count = new TextEncoder().encode(textContent).length
        setCharacterCount(count)
        onCharacterCount?.(count)

        isUpdatingRef.current = false
    }, [value, editor, onCharacterCount])

    return (
        <div className="bg-background w-full overflow-hidden rounded-lg border">
            <EditorToolbar editor={editor} characterCount={showCharacterCount ? { current: characterCount } : undefined} />
            <div className="overflow-hidden">
                <EditorContent
                    editor={editor}
                    className="[&_.ProseMirror]:break-words [&_.ProseMirror]:overflow-wrap-anywhere [&_.ProseMirror]:max-w-full [&_.ProseMirror]:overflow-hidden [&_.ProseMirror]:hyphens-auto [&_.ProseMirror_p]:break-words [&_.ProseMirror_h1]:break-words [&_.ProseMirror_h2]:break-words [&_.ProseMirror_h3]:break-words [&_.ProseMirror_li]:break-words"
                    style={{
                        wordBreak: 'break-word',
                        overflowWrap: 'anywhere',
                        maxWidth: '100%',
                        fontSize: '16px'
                    }}
                />
            </div>
        </div>
    )
} 