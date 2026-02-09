import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "@/hooks/useLocation";

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
  const location = useLocation();
  const [logs, setLogs] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (currentStep < rawSteps.length) {
      const timeout = setTimeout(() => {
        let line = rawSteps[currentStep];
        line = line.replace("{location}", location);
        setLogs((prev: string[]) => [...prev, line]);
        setCurrentStep((prev: number) => prev + 1);
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
          {logs.map((line: string, index: number) => (
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
