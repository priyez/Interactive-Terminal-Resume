const ANALYTICS_KEY = "terminal_analytics";

export interface AnalyticsData {
    commands: Record<string, number>;
    sessionStartTime: number;
    totalEngagementTime: number; // in seconds
}

export const initAnalytics = () => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(ANALYTICS_KEY);
    if (!saved) {
        const initialData: AnalyticsData = {
            commands: {},
            sessionStartTime: Date.now(),
            totalEngagementTime: 0,
        };
        localStorage.setItem(ANALYTICS_KEY, JSON.stringify(initialData));
    }
};

export const trackCommand = (command: string) => {
    if (typeof window === "undefined") return;
    try {
        const saved = localStorage.getItem(ANALYTICS_KEY);
        const data: AnalyticsData = saved
            ? JSON.parse(saved)
            : { commands: {}, sessionStartTime: Date.now(), totalEngagementTime: 0 };

        data.commands[command] = (data.commands[command] || 0) + 1;
        localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
    } catch (err) {
        console.error("Failed to track command:", err);
    }
};

export const updateEngagementTime = () => {
    if (typeof window === "undefined") return;
    try {
        const saved = localStorage.getItem(ANALYTICS_KEY);
        if (!saved) return;
        const data: AnalyticsData = JSON.parse(saved);

        const now = Date.now();
        const sessionSeconds = Math.floor((now - data.sessionStartTime) / 1000);
        data.totalEngagementTime += sessionSeconds;
        data.sessionStartTime = now; // Reset for next incremental update

        localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
    } catch (err) {
        console.error("Failed to update engagement time:", err);
    }
};
