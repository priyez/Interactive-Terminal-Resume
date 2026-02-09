/**
 * Command Plugins
 * Individual command implementations using the plugin architecture
 */

import { CommandPlugin } from "@/lib/commandPlugin";
import { getFlagValue } from "@/lib/commandParser";
import { COMMANDS } from "./resume";

export const helpPlugin: CommandPlugin = {
    name: "help",
    aliases: ["ls", "dir"],
    description: "Show available commands",
    execute: () => COMMANDS.help,
};

export const summaryPlugin: CommandPlugin = {
    name: "summary",
    aliases: ["about"],
    description: "Show professional summary",
    execute: () => COMMANDS.summary,
};

export const skillsPlugin: CommandPlugin = {
    name: "skills",
    aliases: ["sk"],
    description: "Show technical skills",
    execute: () => COMMANDS.skills,
};

export const experiencePlugin: CommandPlugin = {
    name: "experience",
    aliases: ["exp"],
    description: "Show work experience",
    execute: (parsed) => {
        const company = getFlagValue(parsed.flags, "company");

        if (company) {
            // Filter experience by company
            const lines = COMMANDS.experience.split("\n");
            const filtered = lines.filter(line =>
                line.toLowerCase().includes(company.toLowerCase())
            );

            if (filtered.length > 0) {
                return filtered.join("\n");
            }
            return `No experience found for company: ${company}`;
        }

        return COMMANDS.experience;
    },
};

export const educationPlugin: CommandPlugin = {
    name: "education",
    aliases: ["edu"],
    description: "Show education information",
    execute: () => COMMANDS.education,
};

export const contactPlugin: CommandPlugin = {
    name: "contact",
    aliases: ["info"],
    description: "Show contact information",
    execute: () => COMMANDS.contact,
};

export const themePlugin: CommandPlugin = {
    name: "theme",
    aliases: [],
    description: "Change terminal theme",
    execute: (parsed, context) => {
        const color = getFlagValue(parsed.flags, "color", parsed.args[0] || "");

        if (!color) {
            return COMMANDS.theme;
        }

        if (["dark", "light", "hacker"].includes(color)) {
            context.setTheme(color as "dark" | "light" | "hacker");
            return `Theme changed to ${color}`;
        }

        return `Invalid theme: ${color}. Available themes: dark, light, hacker`;
    },
};

export const clearPlugin: CommandPlugin = {
    name: "clear",
    aliases: ["clr"],
    description: "Clear the terminal",
    execute: (_parsed, context) => {
        context.clearHistory();
        return "";
    },
};

export const socialPlugin: CommandPlugin = {
    name: "social",
    aliases: [],
    description: "View social media links",
    execute: () => COMMANDS.social,
};

export const downloadPlugin: CommandPlugin = {
    name: "download",
    aliases: [],
    description: "Download resume",
    execute: () => COMMANDS.download,
};

// Easter Egg Commands
export const whoamiPlugin: CommandPlugin = {
    name: "whoami",
    aliases: [],
    description: "Who are you?",
    execute: () => `sopiriye
You are viewing the interactive resume of Sopiriye Jamabo, a Software Developer.
Type 'summary' to learn more!`,
};

export const sudoPlugin: CommandPlugin = {
    name: "sudo",
    aliases: [],
    description: "Superuser do",
    execute: (parsed) => {
        const command = parsed.args.join(" ");
        if (!command) {
            return `sudo: command not specified. Usage: sudo <command>`;
        }
        return `[sudo] password for guest: 
Permission denied. Nice try! 😄
This is a resume, not a real terminal. Try 'help' for available commands.`;
    },
};

export const hackPlugin: CommandPlugin = {
    name: "hack",
    aliases: [],
    description: "Hack the mainframe",
    execute: () => `Initializing hack sequence...
[████████████████████████] 100%

ACCESS DENIED

Just kidding! This is a resume terminal, not the Matrix 😎
Find out more about me with the 'contact' command!`,
};

export const matrixPlugin: CommandPlugin = {
    name: "matrix",
    aliases: [],
    description: "Enter the Matrix",
    execute: () => `Wake up, Neo...
The Matrix has you...
Follow the white rabbit.

🐰 Knock, knock.

Just a fun easter egg! 😄
Type 'contact' to see my contact info!`,
};
