"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { AlertTriangle, CheckCircle, Clock, Copy, Terminal, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import RunningCodeSkeleton from "./RunningCodeSkeleton";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

function OutputPanel() {
    const { output, error, isRunning } = useCodeEditorStore();
    const [isCopied, setIsCopied] = useState(false);
    const [executionTime, setExecutionTime] = useState<number | null>(null);

    const hasContent = error || output;

    useEffect(() => {
        if (isRunning) {
            setExecutionTime(null);
        }
    }, [isRunning]);

    const handleCopy = async () => {
        if (!hasContent) return;
        try {
            await navigator.clipboard.writeText(error || output);
            setIsCopied(true);
            toast.success("Output copied to clipboard");
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            toast.error("Failed to copy output");
        }
    };

    const formatError = (error: string) => {
        // Split error into lines and format each line
        return error.split('\n').map((line, index) => {
            // Highlight error messages
            if (line.toLowerCase().includes('error')) {
                return <span key={index} className="text-red-400">{line}</span>;
            }
            // Highlight line numbers
            if (line.match(/^\d+:/)) {
                return <span key={index} className="text-yellow-400">{line}</span>;
            }
            return <span key={index} className="text-red-400/80">{line}</span>;
        });
    };

    return (
        <div className="relative bg-[#181825] rounded-xl p-4 ring-1 ring-gray-800/50">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
                        <Terminal className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-300">Output</span>
                    {executionTime && (
                        <span className="text-xs text-gray-500">
                            (Executed in {executionTime}ms)
                        </span>
                    )}
                </div>

                {hasContent && (
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-400 hover:text-gray-300 bg-[#1e1e2e] 
                            rounded-lg ring-1 ring-gray-800/50 hover:ring-gray-700/50 transition-all"
                    >
                        <AnimatePresence mode="wait">
                            {isCopied ? (
                                <motion.div
                                    key="check"
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.5, opacity: 0 }}
                                    className="flex items-center gap-1.5"
                                >
                                    <CheckCircle className="w-3.5 h-3.5" />
                                    Copied!
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="copy"
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.5, opacity: 0 }}
                                    className="flex items-center gap-1.5"
                                >
                                    <Copy className="w-3.5 h-3.5" />
                                    Copy
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                )}
            </div>

            {/* Output Area */}
            <div className="relative">
                <div
                    className="relative bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244] 
                        rounded-xl p-4 h-[600px] overflow-auto font-mono text-sm"
                >
                    <AnimatePresence mode="wait">
                        {isRunning ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <RunningCodeSkeleton />
                            </motion.div>
                        ) : error ? (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-start gap-3 text-red-400"
                            >
                                <XCircle className="w-5 h-5 flex-shrink-0 mt-1" />
                                <div className="space-y-1">
                                    <div className="font-medium">Execution Error</div>
                                    <pre className="whitespace-pre-wrap">{formatError(error)}</pre>
                                </div>
                            </motion.div>
                        ) : output ? (
                            <motion.div
                                key="output"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-2"
                            >
                                <div className="flex items-center gap-2 text-emerald-400 mb-3">
                                    <CheckCircle className="w-5 h-5" />
                                    <span className="font-medium">Execution Successful</span>
                                </div>
                                <pre className="whitespace-pre-wrap text-gray-300">{output}</pre>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-full flex flex-col items-center justify-center text-gray-500"
                            >
                                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-800/50 ring-1 ring-gray-700/50 mb-4">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <p className="text-center">Run your code to see the output here...</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export default OutputPanel;
