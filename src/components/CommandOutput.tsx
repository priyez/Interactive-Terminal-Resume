import { useEffect, useState } from "react";

const CommandOutput = ({ content }: { content: string }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let index = 0;
    const typing = setInterval(() => {
      setDisplayed(content.slice(0, index));
      index++;
      if (index > content.length) clearInterval(typing);
    }, 5); // Fast typing effect

    return () => clearInterval(typing);
  }, [content]);

  // Determine if this line is a user command (starts with ~$)
  const isCommand = content.trim().startsWith("~$");

  return (
    <pre
      className={`mb-2 whitespace-pre-wrap text-sm ${
        isCommand ? 'text-[#979797] font-bold' : 'text-green-400'
      }`}
    >
      {displayed}
    </pre>
  );
};

export default CommandOutput;
