
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ExerciseFiveProps {
  onComplete: () => void;
}

const ExerciseFive = ({ onComplete }: ExerciseFiveProps) => {
  const [selectedSplit, setSelectedSplit] = useState<number | null>(null);
  const [showPrediction, setShowPrediction] = useState(false);
  const [predictedFraction, setPredictedFraction] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [currentPiece, setCurrentPiece] = useState(0);
  const [showComparison, setShowComparison] = useState(false);

  const splitOptions = [
    { pieces: 2, label: "Split into 2", icon: "🔄" },
    { pieces: 4, label: "Split into 4", icon: "➕" },
    { pieces: 8, label: "Split into 8", icon: "✨" },
  ];

  const fractionOptions = ["1/2", "1/4", "1/8"];

  const handleSplitSelect = (pieces: number) => {
    setSelectedSplit(pieces);
    setShowPrediction(true);
  };

  const handlePredictionSelect = (fraction: string) => {
    setPredictedFraction(fraction);
    
    setTimeout(() => {
      setShowResult(true);
      animateSplitting();
    }, 1000);
  };

  const animateSplitting = () => {
    if (!selectedSplit) return;
    
    let pieceIndex = 0;
    const interval = setInterval(() => {
      setCurrentPiece(pieceIndex);
      pieceIndex++;
      
      if (pieceIndex >= selectedSplit) {
        clearInterval(interval);
        setTimeout(() => {
          setShowComparison(true);
          setTimeout(() => {
            onComplete();
          }, 3000);
        }, 1000);
      }
    }, 800);
  };

  const getCorrectFraction = () => {
    if (selectedSplit === 2) return "1/2";
    if (selectedSplit === 4) return "1/4";
    if (selectedSplit === 8) return "1/8";
    return "";
  };

  const isPredictionCorrect = () => {
    return predictedFraction === getCorrectFraction();
  };

  const renderSplitResult = () => {
    if (!selectedSplit) return null;

    const pieceSize = 192 / selectedSplit;
    const pieces = [];
    
    for (let i = 0; i < selectedSplit; i++) {
      pieces.push(
        <div
          key={i}
          className={cn(
            "h-48 border-r border-[#2F2E41] last:border-r-0 transition-all duration-500",
            i === currentPiece 
              ? "bg-[#FF6F00] animate-pulse border-4 border-[#6F00FF]" 
              : i < currentPiece 
              ? "bg-[#FFD700]" 
              : "bg-[#0826FF]"
          )}
          style={{ width: `${pieceSize}px` }}
        >
          {i === currentPiece && (
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

      {!showPrediction && (
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

      {showPrediction && !showResult && (
        <div className="animate-scale-in">
          <p className="text-lg text-[#2F2E41] mb-6" style={{ fontFamily: 'DM Sans' }}>
            🤔 Before we split, predict: What will each piece be?
          </p>
          <div className="flex justify-center space-x-4 mb-4">
            {fractionOptions.map((fraction) => (
              <button
                key={fraction}
                onClick={() => handlePredictionSelect(fraction)}
                disabled={!!predictedFraction}
                className={cn(
                  "px-8 py-4 text-white rounded-full transition-all duration-200 text-xl font-bold",
                  predictedFraction === fraction
                    ? isPredictionCorrect()
                      ? "bg-green-500 border-4 border-green-300"
                      : "bg-red-500 border-4 border-red-300"
                    : "bg-[#6F00FF] hover:scale-105 hover:bg-[#5500CC]",
                  "border-4 border-transparent hover:border-[#FF6F00]",
                  predictedFraction && predictedFraction !== fraction && "opacity-50"
                )}
                style={{ fontFamily: 'Space Grotesk' }}
              >
                {fraction}
              </button>
            ))}
          </div>
          {predictedFraction && (
            <p className="text-lg font-medium" style={{ fontFamily: 'DM Sans' }}>
              {isPredictionCorrect() ? (
                <span className="text-green-600">🎉 Great prediction! Let's see...</span>
              ) : (
                <span className="text-red-600">🤔 Let's see what actually happens...</span>
              )}
            </p>
          )}
        </div>
      )}

      {showComparison && (
        <div className="mt-6 animate-bounce">
          <span className="text-4xl">⭐</span>
          <div className="mt-4">
            <p className="text-xl font-bold text-[#2F2E41] mb-2" style={{ fontFamily: 'Space Grotesk' }}>
              Each piece is {getCorrectFraction()}!
            </p>
            {isPredictionCorrect() ? (
              <p className="text-lg text-green-600 font-medium" style={{ fontFamily: 'DM Sans' }}>
                🎉 Your prediction was correct!
              </p>
            ) : (
              <p className="text-lg text-[#FF6F00] font-medium" style={{ fontFamily: 'DM Sans' }}>
                💡 You predicted {predictedFraction}, but it's actually {getCorrectFraction()}!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseFive;
