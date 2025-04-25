"use client"
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const rawSteps = [
  "Installing dependencies...",
  "> Cloning repo...",
  "> Installing packages...",
  "> Setting up environment...",
  "> Checking location...",
  "> Location found: {location}",
  "✔ Done!"
];

const Preloader = ({ onComplete }: { onComplete?: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [location, setLocation] = useState("Detecting...");
  const [finished, setFinished] = useState(false);

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
            const city = data.address.city || data.address.town || data.address.village || "Unknown";
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

  useEffect(() => {
    if (currentStep < rawSteps.length) {
      const timeout = setTimeout(() => {
        let line = rawSteps[currentStep];
        line = line.replace("{location}", location);
        setLogs((prev) => [...prev, line]);
        setCurrentStep((prev) => prev + 1);
      }, 1200);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => setFinished(true), 1000);
    }
  }, [currentStep, location]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!finished && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="font-mono text-green-400 text-sm p-4 h-screen bg-black rounded-lg shadow-md"
        >
          {logs.map((line, index) => (
            <pre key={index} className="mb-1 whitespace-pre-wrap">
              {line}
            </pre>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
