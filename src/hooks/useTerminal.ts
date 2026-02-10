import { useState, useMemo, useCallback, useEffect } from "react";
import { AVAILABLE_COMMANDS } from "@/data/resume";
import { ThemeType } from "@/lib/themes";
import { parseCommand } from "@/lib/commandParser";
import { commandRegistry, CommandContext } from "@/lib/commandPlugin";
import {
    helpPlugin,
    summaryPlugin,
    skillsPlugin,
    experiencePlugin,
    educationPlugin,
    contactPlugin,
    themePlugin,
    clearPlugin,
    socialPlugin,
    downloadPlugin,
    whoamiPlugin,
    sudoPlugin,
    hackPlugin,
    matrixPlugin,
} from "@/data/commandPlugins";

// Register all plugins
commandRegistry.register(helpPlugin);
commandRegistry.register(summaryPlugin);
commandRegistry.register(skillsPlugin);
commandRegistry.register(experiencePlugin);
commandRegistry.register(educationPlugin);
commandRegistry.register(contactPlugin);
commandRegistry.register(themePlugin);
commandRegistry.register(clearPlugin);
commandRegistry.register(socialPlugin);
commandRegistry.register(downloadPlugin);
commandRegistry.register(whoamiPlugin);
commandRegistry.register(sudoPlugin);
commandRegistry.register(hackPlugin);
commandRegistry.register(matrixPlugin);

const HISTORY_KEY = "terminal_command_history";

export const useTerminal = () => {
    const [history, setHistory] = useState<string[]>([""]);
    const [input, setInput] = useState("");
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number | null>(null);
    const [theme, setTheme] = useState<ThemeType>("hacker");
    const [suggestions, setSuggestions] = useState<string[]>([]);

    // Load command history from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(HISTORY_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    setCommandHistory(parsed);
                }
            }
        } catch (error) {
            console.error("Failed to load command history:", error);
        }
    }, []);

    // Save command history to localStorage when it changes
    useEffect(() => {
        try {
            if (commandHistory.length > 0) {
                localStorage.setItem(HISTORY_KEY, JSON.stringify(commandHistory));
            }
        } catch (error) {
            console.error("Failed to save command history:", error);
        }
    }, [commandHistory]);

    // Get command suggestions based on input
    const getSuggestions = useCallback((inputText: string): string[] => {
        if (!inputText.trim()) return [];
        const lower = inputText.toLowerCase().trim();
        return AVAILABLE_COMMANDS.filter(cmd => cmd.startsWith(lower));
    }, []);

    // Handle tab completion
    const handleTabComplete = useCallback(() => {
        const currentSuggestions = getSuggestions(input);
        if (currentSuggestions.length === 1) {
            setInput(currentSuggestions[0]);
            setSuggestions([]);
        } else if (currentSuggestions.length > 1) {
            setSuggestions(currentSuggestions);
        }
    }, [input, getSuggestions]);

    // Command context for plugins
    const commandContext: CommandContext = useMemo(() => ({
        setTheme,
        clearHistory: () => {
            setHistory([]);
            setSuggestions([]);
        },
    }), []);

    // Handle command execution
    const handleCommand = useCallback((cmd: string) => {
        const parsed = parseCommand(cmd);

        // Execute command via plugin system
        const output = commandRegistry.execute(parsed.command, parsed, commandContext);

        // Don't add to history if clear command
        if (parsed.command !== "clear" && parsed.command !== "clr") {
            setHistory((prev: string[]) => [...prev, `~$ ${cmd}`, output]);
        }

        setCommandHistory((prev: string[]) => [...prev, cmd]);
        setHistoryIndex(null);
        setSuggestions([]);
    }, [commandContext]);

    // Navigate command history
    const traverseHistory = useCallback((direction: "up" | "down") => {
        if (direction === "up") {
            if (commandHistory.length === 0) return;
            const index =
                historyIndex === null
                    ? commandHistory.length - 1
                    : Math.max(0, historyIndex - 1);
            setHistoryIndex(index);
            setInput(commandHistory[index]);
        } else {
            if (historyIndex === null) return;
            const index = historyIndex + 1;
            if (index >= commandHistory.length) {
                setHistoryIndex(null);
                setInput("");
            } else {
                setHistoryIndex(index);
                setInput(commandHistory[index]);
            }
        }
    }, [commandHistory, historyIndex]);

    // Update suggestions when input changes
    const handleInputChange = useCallback((value: string) => {
        setInput(value);
        setSuggestions(getSuggestions(value));
    }, [getSuggestions]);

    // Clear input (for Ctrl+C)
    const clearInput = useCallback(() => {
        setInput("");
        setSuggestions([]);
    }, []);

    // Clear terminal (for Ctrl+L)
    const clearTerminal = useCallback(() => {
        setHistory([]);
        setSuggestions([]);
    }, []);

    return {
        history,
        input,
        setInput: handleInputChange,
        theme,
        handleCommand,
        traverseHistory,
        suggestions,
        handleTabComplete,
        clearInput,
        clearTerminal,
    };
};
