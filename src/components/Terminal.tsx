"use client";

import { useState, useRef, useEffect } from "react";
import CommandOutput from "./CommandOutput";

/**
 * TerminalComp
 * An interactive terminal-style resume component for Sopiriye Jamabo.
 * 
 * Users can type predefined commands to explore skills, experience,
 * contact info, and switch between terminal themes.
 */
const TerminalComp = () => {
  // Terminal output history
  const [history, setHistory] = useState<string[]>([""]);
  // Current input command
  const [input, setInput] = useState("");
  // Stores all past commands for navigating with arrow keys
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  // Index to navigate commandHistory
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  // UI theme
  const [theme, setTheme] = useState<"dark" | "light" | "hacker">("hacker");

  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of terminal on history update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Command handler function
  const handleCommand = (cmd: string) => {
    let output = "";

    switch (cmd.toLowerCase()) {
      case "help":
        output = `
Available commands:
- summary: A brief summary
- skills: Key strengths
- experience: Work experience
- education: Education Info
- contact: Contact Info 📧
- theme: Change theme (dark, light, hacker)
- clear: Clear the terminal`;
        break;

      case "summary":
        output = `A developer with a keen eye for design and a knack for creating interactive user experiences.`;
        break;

      case "skills":
        output = `• JavaScript, TypeScript, React/Next.js, Node.js
• WordPress, PHP, JSON/REST API, Redux/Zustand/Context API
• Tailwind CSS, Figma, SASS/LESS
• Git, CI/CD`;
        break;

      case "experience":
        output = `
Blessed Louis Tech. | Frontend Developer 
Oct 2024 – Present (Remote)
• Built and maintained responsive, user-friendly interfaces using React and modern frontend technologies.
• Collaborated with backend developers to integrate RESTful APIs and improve performance.
• Worked in an agile team to deliver pixel-perfect designs and smooth user experiences.
• Implemented reusable components and optimized code for scalability and maintainability.
• Participated in UI/UX discussions to enhance the design and usability of web applications.

Disaster Accountability Project | Frontend Developer 
May 2024 – Sept 2024 (Remote, US)
• Conducted code reviews and migrated Angular components to React.
• Designed reusable components and improved stability and speed.

Savvily Tech. | Frontend Developer 
Sept 2022 – Feb 2023 (Remote)
• Created responsive UI and dynamic components.
• Integrated APIs and enhanced UI/UX through collaboration.`;
        break;

      case "education":
        output = `B.Ed. in Political Science — University of Port Harcourt`;
        break;

      case "contact":
        output = `📧: sopiriyejamabo@gmail.com
🔗: linkedin.com/in/sopiriye-jamabo
🔗: sopiriye.xyz`;
        break;

      case "clear":
        setHistory([]);
        return;

      case "theme":
        output = `Usage: theme dark | light | hacker`;
        break;

      case "theme dark":
      case "theme light":
      case "theme hacker":
        const newTheme = cmd.split(" ")[1] as "dark" | "light" | "hacker";
        setTheme(newTheme);
        output = `Theme changed to ${newTheme}`;
        break;

      default:
        output = `Command not recognized. Type "help" for available commands.`;
    }

    // Update output history and command list
    setHistory((prev) => [...prev, `~$ ${cmd}`, output]);
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(null);
  };

  // Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input.trim());
    setInput("");
  };

  // Arrow up/down navigation in command history
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      if (commandHistory.length === 0) return;
      const index =
        historyIndex === null
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(index);
      setInput(commandHistory[index]);
    } else if (e.key === "ArrowDown") {
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
  };

  // Theme class mapping
  const themeClasses = {
    dark: "bg-gray-900 text-gray-200",
    light: "bg-[#f7f7f7] text-gray-500",
    hacker: "bg-black text-green-400",
  };


  const textColor = theme === "light" ? "text-black" : "text-[#979797]";


  return (
    <div
      className={`${themeClasses[theme]} transition-all duration-300 min-h-screen p-4 md:px-[30%] rounded`}
    >
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Sopiriye Jamabo</h1>
        <h2 className="text-sm uppercase">Software Developer</h2>
      </header>

      <main>
        <h3 className="mb-4 flex">
          Welcome to Sopiriye&apos;s interactive resume terminal! Type &apos;help&apos; for available commands.
        </h3>


        {/* Terminal history output */}
        {history.map((entry, idx) => (
          <CommandOutput key={idx} content={entry} />
        ))}

        {/* Input prompt */}
        <form onSubmit={handleSubmit} className={`${textColor} flex  items-center mt-2`}>
          <span className="mr-2">~$</span>
          <input
            className="bg-transparent focus:outline-none w-full text-inherit"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </form>

        {/* Scroll anchor */}
        <div ref={bottomRef} />
      </main>
    </div>
  );
};

export default TerminalComp;
