'use client'

import { Editor } from '@tiptap/react'
import {
    Bold,
    Heading2,
    Heading3,
    Italic,
    Link as LinkIcon,
    List,
    ListOrdered,
    Quote,
    Redo,
    Strikethrough,
    Undo,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Toggle } from '@/components/ui/toggle'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

interface EditorToolbarProps {
    editor: Editor | null
    characterCount?: {
        current: number
    }
}

export function EditorToolbar({ editor, characterCount }: EditorToolbarProps) {
    if (!editor) {
        return null
    }

    const addLink = () => {
        const url = window.prompt('URL:')
        if (url) {
            editor.chain().focus().setLink({ href: url }).run()
        }
    }

    return (
        <TooltipProvider>
            <div className="border-b p-1 flex gap-1 flex-wrap">
                <div className="flex items-center gap-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle
                                size="sm"
                                pressed={editor.isActive('bold')}
                                onPressedChange={() => editor.chain().focus().toggleBold().run()}
                            >
                                <Bold className="h-4 w-4" />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>Negrito</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle
                                size="sm"
                                pressed={editor.isActive('italic')}
                                onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                            >
                                <Italic className="h-4 w-4" />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>Itálico</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle
                                size="sm"
                                pressed={editor.isActive('strike')}
                                onPressedChange={() => editor.chain().focus().toggleStrike().run()}
                            >
                                <Strikethrough className="h-4 w-4" />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>Tachado</TooltipContent>
                    </Tooltip>

                    <Separator orientation="vertical" className="mx-1" />

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle
                                size="sm"
                                pressed={editor.isActive('heading', { level: 2 })}
                                onPressedChange={() =>
                                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                                }
                            >
                                <Heading2 className="h-4 w-4" />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>Título 2</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle
                                size="sm"
                                pressed={editor.isActive('heading', { level: 3 })}
                                onPressedChange={() =>
                                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                                }
                            >
                                <Heading3 className="h-4 w-4" />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>Título 3</TooltipContent>
                    </Tooltip>

                    <Separator orientation="vertical" className="mx-1" />

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle
                                size="sm"
                                pressed={editor.isActive('bulletList')}
                                onPressedChange={() =>
                                    editor.chain().focus().toggleBulletList().run()
                                }
                            >
                                <List className="h-4 w-4" />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>Lista</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle
                                size="sm"
                                pressed={editor.isActive('orderedList')}
                                onPressedChange={() =>
                                    editor.chain().focus().toggleOrderedList().run()
                                }
                            >
                                <ListOrdered className="h-4 w-4" />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>Lista numerada</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle
                                size="sm"
                                pressed={editor.isActive('blockquote')}
                                onPressedChange={() =>
                                    editor.chain().focus().toggleBlockquote().run()
                                }
                            >
                                <Quote className="h-4 w-4" />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>Citação</TooltipContent>
                    </Tooltip>

                    <Separator orientation="vertical" className="mx-1" />

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle
                                size="sm"
                                pressed={editor.isActive('link')}
                                onPressedChange={addLink}
                            >
                                <LinkIcon className="h-4 w-4" />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>Link</TooltipContent>
                    </Tooltip>
                </div>

                <div className="flex-1" />

                <div className="flex items-center gap-1">
                    {characterCount && (
                        <span className="text-xs text-muted-foreground mr-2">
                            {characterCount.current} B
                        </span>
                    )}

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => editor.chain().focus().undo().run()}
                                disabled={!editor.can().undo()}
                            >
                                <Undo className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Desfazer</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => editor.chain().focus().redo().run()}
                                disabled={!editor.can().redo()}
                            >
                                <Redo className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Refazer</TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </TooltipProvider>
    )
} 