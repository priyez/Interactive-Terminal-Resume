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
  const {
    history,
    input,
    setInput,
    theme,
    handleCommand,
    traverseHistory,
    suggestions,
    handleTabComplete,
    clearInput,
    clearTerminal,
  } = useTerminal();
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom of terminal on history update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input.trim());
    setInput("");
  };

  // Keyboard shortcuts and navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Ctrl+C - Clear input
    if (e.ctrlKey && e.key === "c") {
      e.preventDefault();
      clearInput();
      return;
    }

    // Ctrl+L - Clear terminal
    if (e.ctrlKey && e.key === "l") {
      e.preventDefault();
      clearTerminal();
      return;
    }

    // Arrow up/down navigation
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
      className={`${THEMES[theme]} theme-transition min-h-screen p-4 md:px-[20%] lg:px-[30%] rounded`}
      role="application"
      aria-label="Interactive terminal resume"
    >
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Sopiriye Jamabo</h1>
        <h2 className="text-sm uppercase">Software Developer</h2>
      </header>

      <main>
        {/* ASCII Banner */}
        <pre
          className="text-xs mb-4 opacity-70 overflow-x-auto whitespace-pre"
          aria-label="ASCII art banner with name"
        >
          {ASCII_BANNER}
        </pre>

        <h3 className="mb-4 flex text-sm md:text-base">
          Welcome to Sopiriye&apos;s interactive resume terminal! Type &apos;help&apos; for available commands.
        </h3>

        {/* Terminal history output - Live region for screen readers */}
        <div
          aria-live="polite"
          aria-atomic="false"
          role="log"
          aria-label="Command output"
        >
          {history.map((entry: string, idx: number) => (
            <CommandOutput key={idx} content={entry} />
          ))}
        </div>

        {/* Command Suggestions */}
        <CommandSuggestions
          suggestions={suggestions}
          onSelect={(suggestion) => setInput(suggestion)}
        />

        {/* Input prompt */}
        <form
          onSubmit={handleSubmit}
          className={`${TEXT_COLORS[theme]} flex items-center mt-2`}
        >
          <label htmlFor="terminal-input" className="mr-2" aria-label="Command prompt">
            ~$
          </label>
          <input
            id="terminal-input"
            ref={inputRef}
            className="bg-transparent focus:outline-none w-full text-inherit"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            aria-label="Terminal command input"
            aria-describedby="keyboard-shortcuts"
            placeholder="Type 'help' for commands"
            style={{ caretColor: 'transparent' }}
          />
          <span className="terminal-cursor" aria-hidden="true"></span>
        </form>

        {/* Screen reader only keyboard shortcuts info */}
        <div id="keyboard-shortcuts" className="sr-only">
          Keyboard shortcuts: Arrow up and down to navigate command history,
          Tab for auto-complete, Ctrl+C to clear input, Ctrl+L to clear terminal.
        </div>

        {/* Scroll anchor */}
        <div ref={bottomRef} />
      </main>
    </div>
  );
};

export default TerminalComp;
