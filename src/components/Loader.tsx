import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Brain } from 'lucide-react'
import { useVektorStore } from '../store/useVektorStore'

export function Loader() {
    const isLoading = useVektorStore((state) => state.isLoading)

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-50 bg-void flex flex-col items-center justify-center"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center gap-6"
                    >
                        {/* Logo/Icon */}
                        <div className="relative">
                            <div className="p-6 rounded-2xl bg-oi-primary/10 border border-oi-primary/20">
                                <Brain className="w-12 h-12 text-oi-primary" />
                            </div>
                            {/* Pulse rings */}
                            <div className="absolute inset-0 rounded-2xl border border-oi-primary/30 animate-ping" />
                        </div>

                        {/* Text */}
                        <div className="text-center">
                            <h2 className="text-xl font-semibold text-white mb-2">
                                Carregando...
                            </h2>
                            <p className="text-zinc-500 text-sm">
                                Preparando seu briefing
                            </p>
                        </div>

                        {/* Spinner */}
                        <Loader2 className="w-6 h-6 text-oi-primary animate-spin" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
