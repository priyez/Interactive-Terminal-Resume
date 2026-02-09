import { useState, useEffect } from "react";

export const useLocation = () => {
    const [location, setLocation] = useState("Detecting...");

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                navigator.geolocation.getCurrentPosition(
                    async (pos) => {
                        const { latitude, longitude } = pos.coords;
                        const res = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                        );
                        const data = await res.json();
                        const city =
                            data.address.city ||
                            data.address.town ||
                            data.address.village ||
                            "Unknown";
                        const country = data.address.country_code?.toUpperCase() || "??";
                        setLocation(`${city}, ${country}`);
                    },
                    () => {
                        setLocation("Unknown");
                    }
                );
            } catch {
                setLocation("Unknown");
            }
        };

        fetchLocation();
    }, []);

    return location;
};
