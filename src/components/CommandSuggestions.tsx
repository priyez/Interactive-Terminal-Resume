"use client";

interface CommandSuggestionsProps {
    suggestions: string[];
    onSelect: (suggestion: string) => void;
}

const CommandSuggestions = ({ suggestions, onSelect }: CommandSuggestionsProps) => {
    if (suggestions.length === 0) return null;

    return (
        <div className="mt-2 mb-2">
            <div className="text-xs opacity-70 mb-1">Suggestions:</div>
            <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, idx) => (
                    <button
                        key={idx}
                        onClick={() => onSelect(suggestion)}
                        className="px-2 py-1 text-xs bg-green-400/10 border border-green-400/30 rounded hover:bg-green-400/20 transition-colors cursor-pointer"
                    >
                        {suggestion}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CommandSuggestions;
