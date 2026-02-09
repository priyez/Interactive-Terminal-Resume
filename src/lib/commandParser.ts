/**
 * Command Parser Utility
 * Parses command strings into structured data with arguments and flags
 */

export interface ParsedCommand {
    command: string;
    args: string[];
    flags: Record<string, string | boolean>;
}

/**
 * Parse a command string into command, arguments, and flags
 * @param input - Raw command string (e.g., "theme --color dark")
 * @returns ParsedCommand object
 * 
 * @example
 * parseCommand("theme --color dark")
 * // Returns: { command: "theme", args: [], flags: { color: "dark" } }
 * 
 * parseCommand("experience --company BlessedLouis")
 * // Returns: { command: "experience", args: [], flags: { company: "BlessedLouis" } }
 */
export function parseCommand(input: string): ParsedCommand {
    const trimmed = input.trim();
    if (!trimmed) {
        return { command: "", args: [], flags: {} };
    }

    const parts = trimmed.split(/\s+/);
    const command = parts[0].toLowerCase();
    const args: string[] = [];
    const flags: Record<string, string | boolean> = {};

    let i = 1;
    while (i < parts.length) {
        const part = parts[i];

        // Check if it's a flag (starts with --)
        if (part.startsWith("--")) {
            const flagName = part.slice(2);

            // Check if next part is a value (not a flag)
            if (i + 1 < parts.length && !parts[i + 1].startsWith("--")) {
                flags[flagName] = parts[i + 1];
                i += 2;
            } else {
                // Boolean flag
                flags[flagName] = true;
                i += 1;
            }
        } else {
            // Regular argument
            args.push(part);
            i += 1;
        }
    }

    return { command, args, flags };
}

/**
 * Get a flag value with a default fallback
 */
export function getFlagValue(
    flags: Record<string, string | boolean>,
    key: string,
    defaultValue: string = ""
): string {
    const value = flags[key];
    if (typeof value === "string") return value;
    if (value === true) return "";
    return defaultValue;
}

/**
 * Check if a flag exists
 */
export function hasFlag(
    flags: Record<string, string | boolean>,
    key: string
): boolean {
    return key in flags;
}
