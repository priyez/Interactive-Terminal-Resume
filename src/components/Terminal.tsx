"use client";

import React, { useRef, useEffect } from "react";
import CommandOutput from "./CommandOutput";
import CommandSuggestions from "./CommandSuggestions";
import { useTerminal } from "@/hooks/useTerminal";
import { THEMES, TEXT_COLORS } from "@/lib/themes";
import { ASCII_BANNER } from "@/data/resume";

/**
 * TerminalComp
 * An interactive terminal-style resume component for Sopiriye Jamabo.
 * 
 * Users can type predefined commands to explore skills, experience,
 * contact info, and switch between terminal themes.
 */
const TerminalComp = () => {
  const { history, input, setInput, theme, handleCommand, traverseHistory, suggestions, handleTabComplete } = useTerminal();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of terminal on history update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input.trim());
  };

  // Arrow up/down navigation in command history + Tab completion
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      traverseHistory("up");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      traverseHistory("down");
    } else if (e.key === "Tab") {
      e.preventDefault();
      handleTabComplete();
    }
  };

  return (
    <div
      className={`${THEMES[theme]} transition-all duration-300 min-h-screen p-4 md:px-[20%] lg:px-[30%] rounded`}
    >
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Sopiriye Jamabo</h1>
        <h2 className="text-sm uppercase">Software Developer</h2>
      </header>

      <main>
        {/* ASCII Banner */}
        <pre className="text-xs mb-4 opacity-70 overflow-x-auto whitespace-pre">
          {ASCII_BANNER}
        </pre>

        <h3 className="mb-4 flex text-sm md:text-base">
          Welcome to Sopiriye&apos;s interactive resume terminal! Type &apos;help&apos; for available commands.
        </h3>


        {/* Terminal history output */}
        {history.map((entry: string, idx: number) => (
          <CommandOutput key={idx} content={entry} />
        ))}

        {/* Command Suggestions */}
        <CommandSuggestions
          suggestions={suggestions}
          onSelect={(suggestion) => setInput(suggestion)}
        />

        {/* Input prompt */}
        <form onSubmit={handleSubmit} className={`${TEXT_COLORS[theme]} flex items-center mt-2`}>
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
