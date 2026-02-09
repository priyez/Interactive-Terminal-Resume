/**
 * Command Plugin Architecture
 * Allows modular, pluggable commands
 */

import { ParsedCommand } from "./commandParser";
import { ThemeType } from "./themes";

export interface CommandContext {
    setTheme: (theme: ThemeType) => void;
    clearHistory: () => void;
}

export interface CommandPlugin {
    name: string;
    aliases?: string[];
    description: string;
    execute: (parsed: ParsedCommand, context: CommandContext) => string;
}

/**
 * Command Registry
 * Manages all available command plugins
 */
export class CommandRegistry {
    private plugins: Map<string, CommandPlugin> = new Map();

    /**
     * Register a command plugin
     */
    register(plugin: CommandPlugin): void {
        this.plugins.set(plugin.name, plugin);

        // Register aliases
        if (plugin.aliases) {
            plugin.aliases.forEach(alias => {
                this.plugins.set(alias, plugin);
            });
        }
    }

    /**
     * Get a command plugin by name or alias
     */
    get(name: string): CommandPlugin | undefined {
        return this.plugins.get(name.toLowerCase());
    }

    /**
     * Get all registered command names (excluding aliases)
     */
    getAllCommands(): string[] {
        const commands: string[] = [];
        const seen = new Set<CommandPlugin>();

        this.plugins.forEach(plugin => {
            if (!seen.has(plugin)) {
                commands.push(plugin.name);
                seen.add(plugin);
            }
        });

        return commands;
    }

    /**
     * Execute a command
     */
    execute(commandName: string, parsed: ParsedCommand, context: CommandContext): string {
        const plugin = this.get(commandName);

        if (!plugin) {
            return `Command not recognized: "${commandName}". Type "help" for available commands.`;
        }

        try {
            return plugin.execute(parsed, context);
        } catch (error) {
            return `Error executing command "${commandName}": ${error instanceof Error ? error.message : String(error)}`;
        }
    }
}

/**
 * Create the global command registry
 */
export const commandRegistry = new CommandRegistry();
