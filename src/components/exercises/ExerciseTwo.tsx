
import { useState } from "react";
import { cn } from "@/lib/utils";
import FractionSelector from "../FractionSelector";

interface ExerciseTwoProps {
  onComplete: () => void;
}

const ExerciseTwo = ({ onComplete }: ExerciseTwoProps) => {
  const [leftSplit, setLeftSplit] = useState(false);
  const [showSelector, setShowSelector] = useState(false);
  const [selectedFraction, setSelectedFraction] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showSnapTask, setShowSnapTask] = useState(false);
  const [partsSnapped, setPartsSnapped] = useState(false);

  const handleLeftSplit = () => {
    setLeftSplit(true);
    setTimeout(() => {
      setShowSelector(true);
    }, 1000);
  };

  const handleFractionSelect = (fraction: string) => {
    setSelectedFraction(fraction);
    const correct = fraction === "1/4";
    setIsCorrect(correct);
    
    if (correct) {
      setTimeout(() => {
        setShowSnapTask(true);
      }, 1500);
    }
  };

  const handleSnapParts = () => {
    setPartsSnapped(true);
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-[#2F2E41] mb-8" style={{ fontFamily: 'Space Grotesk' }}>
        Exercise 2: Split One Half
      </h2>
      
      <div className="flex justify-center mb-8">
        <div className="flex">
          {!leftSplit ? (
            <div
              onClick={handleLeftSplit}
              className={cn(
                "w-24 h-48 bg-[#0826FF] rounded-l-lg cursor-pointer transition-all duration-300",
                "hover:scale-105 hover:shadow-lg",
                "border-2 border-dashed border-[#6F00FF] border-opacity-50 relative"
              )}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1 h-full bg-[#6F00FF] opacity-50 animate-pulse" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-xl">✂️</span>
              </div>
            </div>
          ) : (
            <div className="flex animate-fade-in">
              <div
                className={cn(
                  "w-12 h-48 bg-[#90EE90] rounded-l-lg transition-all duration-500",
                  partsSnapped && "animate-pulse border-4 border-[#FF6F00]"
                )}
              />
              <div
                className={cn(
                  "w-12 h-48 bg-[#FFD700] rounded-none transition-all duration-500",
                  partsSnapped && "animate-pulse border-4 border-[#FF6F00]"
                )}
              />
            </div>
          )}
          <div className="w-24 h-48 bg-[#2F2E41] rounded-r-lg" />
        </div>
      </div>

      {!leftSplit && (
        <p className="text-lg text-[#2F2E41] mb-4" style={{ fontFamily: 'DM Sans' }}>
          Tap the left half to split it again! 🔄
        </p>
      )}

      {showSelector && !showSnapTask && (
        <div className="animate-scale-in">
          <p className="text-lg text-[#2F2E41] mb-6" style={{ fontFamily: 'DM Sans' }}>
            What's the left piece now?
          </p>
          <FractionSelector
            options={["1/4", "1/2", "1/8"]}
            onSelect={handleFractionSelect}
            selectedFraction={selectedFraction}
            correctAnswer="1/4"
            isCorrect={isCorrect}
          />
        </div>
      )}

      {showSnapTask && (
        <div className="animate-scale-in">
          <p className="text-lg text-[#2F2E41] mb-6" style={{ fontFamily: 'DM Sans' }}>
            Tap the two ¼ parts to combine them! 🔗
          </p>
          <button
            onClick={handleSnapParts}
            className={cn(
              "px-8 py-4 bg-[#6F00FF] text-white rounded-full text-lg font-medium",
              "hover:scale-105 transition-all duration-200",
              "border-4 border-transparent hover:border-[#FF6F00]"
            )}
            style={{ fontFamily: 'DM Sans' }}
          >
            Combine Parts ➕
          </button>
        </div>
      )}

      {isCorrect === true && !showSnapTask && (
        <div className="mt-6 animate-bounce">
          <span className="text-4xl">⭐</span>
          <p className="text-2xl font-bold text-[#FF6F00]" style={{ fontFamily: 'Space Grotesk' }}>
            Perfect! That's ¼!
          </p>
        </div>
      )}

      {partsSnapped && (
        <div className="mt-6 animate-bounce">
          <span className="text-4xl">🎉</span>
          <p className="text-2xl font-bold text-[#FF6F00]" style={{ fontFamily: 'Space Grotesk' }}>
            ¼ + ¼ = ½ !
          </p>
        </div>
      )}
    </div>
  );
};

export default ExerciseTwo;
