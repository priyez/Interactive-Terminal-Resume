export type ThemeType = "dark" | "light" | "hacker";

export const THEMES: Record<ThemeType, string> = {
    dark: "bg-gray-900 text-gray-200",
    light: "bg-[#f7f7f7] text-gray-500",
    hacker: "bg-black text-green-400",
};

export const TEXT_COLORS: Record<ThemeType, string> = {
    dark: "text-[#979797]",
    light: "text-black",
    hacker: "text-[#979797]", // Default green/gray for hacker
};
