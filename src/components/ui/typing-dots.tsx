import { motion } from 'framer-motion';

export default function TypingDots() {
    return (
        <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="w-1.5 h-1.5 bg-current rounded-full"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.2,
                    }}
                />
            ))}
        </div>
    );
} 