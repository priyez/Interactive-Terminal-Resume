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

  // Apply syntax highlighting
  const highlightSyntax = (text: string) => {
    // Don't highlight commands
    if (isCommand) return text;

    // Split by lines for processing
    return text.split('\n').map((line, idx) => {
      let processedLine = line;

      // Highlight headers (lines ending with :)
      if (line.trim().endsWith(':') && !line.includes('http')) {
        return <span key={idx} className="syntax-header">{line}<br /></span>;
      }

      // Highlight bullets (•, -, ✅, etc.)
      if (/^[\s]*[•\-✅❌🎯🚀📱💻🌐📧🐦🔗📄📝💡🎮🐰]/m.test(line)) {
        const parts = line.split(/([•\-✅❌🎯🚀📱💻🌐📧🐦🔗📄📝💡🎮🐰])/);
        return (
          <span key={idx}>
            {parts.map((part, i) => {
              if (/[•\-✅❌🎯🚀📱💻🌐📧🐦🔗📄📝💡🎮🐰]/.test(part)) {
                return <span key={i} className="syntax-emoji">{part}</span>;
              }
              return part;
            })}
            <br />
          </span>
        );
      }

      // Highlight links (contains .com, .xyz, github, linkedin, etc.)
      if (/\.(com|xyz|io|dev)|github|linkedin|twitter|@/.test(line)) {
        return <span key={idx} className="syntax-link">{line}<br /></span>;
      }

      return <span key={idx}>{line}<br /></span>;
    });
  };

  return (
    <pre
      className={`mb-2 whitespace-pre-wrap text-sm fade-in ${isCommand ? 'text-[#979797] font-bold' : 'text-green-400'
        }`}
    >
      {isCommand ? displayed : highlightSyntax(displayed)}
    </pre>
  );
};

export default CommandOutput;
