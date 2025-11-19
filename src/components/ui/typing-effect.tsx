'use client'

import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect } from 'react'

interface TypingEffectProps {
    text: string;
    speed?: number;
    onComplete?: () => void;
}

export default function TypingEffect({ text, speed = 0.02, onComplete }: TypingEffectProps) {
    const count = useMotionValue(0)
    const rounded = useTransform(count, (latest) => Math.round(latest))
    const displayText = useTransform(rounded, (latest) => text.slice(0, latest))

    useEffect(() => {
        const controls = animate(count, text.length, {
            type: 'tween',
            duration: text.length * speed,
            ease: 'linear',
            onComplete: () => {
                onComplete?.()
            }
        })

        return controls.stop
    }, [text, count, speed, onComplete])

    return (
        <motion.span>
            {displayText}
        </motion.span>
    )
} 