
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ExerciseFiveProps {
  onComplete: () => void;
}

const ExerciseFive = ({ onComplete }: ExerciseFiveProps) => {
  const [selectedSplit, setSelectedSplit] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [highlightedPiece, setHighlightedPiece] = useState<number | null>(null);

  const splitOptions = [
    { pieces: 2, label: "Split into 2", icon: "🔄" },
    { pieces: 4, label: "Split into 4", icon: "➕" },
    { pieces: 8, label: "Split into 8", icon: "✨" },
  ];

  const handleSplitSelect = (pieces: number) => {
    setSelectedSplit(pieces);
    setShowResult(true);
    
    setTimeout(() => {
      setHighlightedPiece(0); // Highlight first piece
      setTimeout(() => {
        onComplete();
      }, 2000);
    }, 1000);
  };

  const renderSplitResult = () => {
    if (!selectedSplit) return null;

    const pieceSize = 192 / selectedSplit; // 192px total width
    const pieces = [];
    
    for (let i = 0; i < selectedSplit; i++) {
      pieces.push(
        <div
          key={i}
          className={cn(
            "h-48 border-r border-[#2F2E41] last:border-r-0 transition-all duration-500",
            i === highlightedPiece 
              ? "bg-[#FF6F00] animate-pulse border-4 border-[#6F00FF]" 
              : "bg-[#0826FF]"
          )}
          style={{ width: `${pieceSize}px` }}
        >
          {i === highlightedPiece && (
            <div className="h-full flex items-center justify-center text-white font-bold text-lg">
              1/{selectedSplit}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="flex animate-fade-in border-2 border-[#2F2E41] rounded-lg overflow-hidden">
        {pieces}
      </div>
    );
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-[#2F2E41] mb-8" style={{ fontFamily: 'Space Grotesk' }}>
        Exercise 5: Predict Before Splitting
      </h2>
      
      <div className="flex justify-center mb-8">
        {!showResult ? (
          <div className="w-48 h-48 bg-[#FF6F00] rounded-lg border-4 border-[#2F2E41]" />
        ) : (
          renderSplitResult()
        )}
      </div>

      {!showResult && (
        <div className="animate-scale-in">
          <p className="text-lg text-[#2F2E41] mb-8" style={{ fontFamily: 'DM Sans' }}>
            How many pieces do you want to make? 🤔
          </p>
          <div className="flex justify-center space-x-4">
            {splitOptions.map((option) => (
              <button
                key={option.pieces}
                onClick={() => handleSplitSelect(option.pieces)}
                className={cn(
                  "px-6 py-4 bg-[#6F00FF] text-white rounded-full transition-all duration-200",
                  "hover:scale-105 hover:bg-[#5500CC] min-w-[120px]",
                  "border-4 border-transparent hover:border-[#FF6F00]",
                  "flex flex-col items-center space-y-2"
                )}
                style={{ fontFamily: 'DM Sans' }}
              >
                <span className="text-2xl">{option.icon}</span>
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {highlightedPiece !== null && (
        <div className="mt-6 animate-bounce">
          <span className="text-4xl">⭐</span>
          <p className="text-2xl font-bold text-[#FF6F00]" style={{ fontFamily: 'Space Grotesk' }}>
            This is 1 of {selectedSplit} parts — 1/{selectedSplit}!
          </p>
        </div>
      )}
    </div>
  );
};

export default ExerciseFive;
