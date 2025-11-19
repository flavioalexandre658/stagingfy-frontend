import { Editor } from '@tiptap/react'

export interface RichEditorProps {
    value?: string
    onChange?: (value: string) => void
    className?: string
    placeholder?: string
    onCharacterCount?: (count: number) => void
    showCharacterCount?: boolean
}

export interface EditorToolbarProps {
    editor: Editor | null
    characterCount?: {
        current: number
    }
} 