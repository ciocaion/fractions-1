
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ExerciseThreeProps {
  onComplete: () => void;
}

const ExerciseThree = ({ onComplete }: ExerciseThreeProps) => {
  const [rightSplit, setRightSplit] = useState(false);
  const [selectedParts, setSelectedParts] = useState<number[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleRightSplit = () => {
    setRightSplit(true);
  };

  const handlePartSelect = (partIndex: number) => {
    if (selectedParts.includes(partIndex)) {
      setSelectedParts(selectedParts.filter(p => p !== partIndex));
    } else if (selectedParts.length < 2) {
      const newSelected = [...selectedParts, partIndex];
      setSelectedParts(newSelected);
      
      if (newSelected.length === 2) {
        // Check if both selected parts are quarters (parts 0, 1, 2, 3 where 0,1 are left quarters and 2,3 are right quarters)
        const isCorrectMatch = 
          (newSelected.includes(0) && newSelected.includes(1)) || // Left quarters
          (newSelected.includes(2) && newSelected.includes(3));   // Right quarters
        
        setIsCorrect(isCorrectMatch);
        
        if (isCorrectMatch) {
          setTimeout(() => {
            onComplete();
          }, 2000);
        } else {
          setTimeout(() => {
            setSelectedParts([]);
            setIsCorrect(null);
          }, 1500);
        }
      }
    }
  };

  const parts = [
    { color: "#90EE90", label: "¼" }, // Left top quarter
    { color: "#FFD700", label: "¼" }, // Left bottom quarter  
    { color: "#FF69B4", label: "¼" }, // Right top quarter
    { color: "#87CEEB", label: "¼" }, // Right bottom quarter
  ];

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-[#2F2E41] mb-8" style={{ fontFamily: 'Space Grotesk' }}>
        Exercise 3: Split Another Side
      </h2>
      
      <div className="flex justify-center mb-8">
        <div className="grid grid-cols-2 gap-1">
          {/* Left side - already split */}
          <div
            onClick={() => handlePartSelect(0)}
            className={cn(
              "w-24 h-24 bg-[#90EE90] rounded-tl-lg cursor-pointer transition-all duration-300",
              "hover:scale-105",
              selectedParts.includes(0) && "ring-4 ring-[#6F00FF] scale-110",
              isCorrect === true && selectedParts.includes(0) && "animate-pulse border-4 border-[#FF6F00]"
            )}
          />
          <div
            onClick={() => rightSplit ? handlePartSelect(2) : handleRightSplit()}
            className={cn(
              "w-24 h-24 rounded-tr-lg cursor-pointer transition-all duration-300",
              "hover:scale-105",
              !rightSplit && "bg-[#2F2E41] border-2 border-dashed border-[#6F00FF] border-opacity-50",
              rightSplit && "bg-[#FF69B4]",
              selectedParts.includes(2) && "ring-4 ring-[#6F00FF] scale-110",
              isCorrect === true && selectedParts.includes(2) && "animate-pulse border-4 border-[#FF6F00]"
            )}
          >
            {!rightSplit && (
              <div className="h-full flex items-center justify-center">
                <span className="text-white text-xl">✂️</span>
              </div>
            )}
          </div>
          
          <div
            onClick={() => handlePartSelect(1)}
            className={cn(
              "w-24 h-24 bg-[#FFD700] rounded-bl-lg cursor-pointer transition-all duration-300",
              "hover:scale-105",
              selectedParts.includes(1) && "ring-4 ring-[#6F00FF] scale-110",
              isCorrect === true && selectedParts.includes(1) && "animate-pulse border-4 border-[#FF6F00]"
            )}
          />
          <div
            onClick={() => rightSplit ? handlePartSelect(3) : handleRightSplit()}
            className={cn(
              "w-24 h-24 rounded-br-lg cursor-pointer transition-all duration-300",
              "hover:scale-105",
              !rightSplit && "bg-[#2F2E41] border-2 border-dashed border-[#6F00FF] border-opacity-50",
              rightSplit && "bg-[#87CEEB]",
              selectedParts.includes(3) && "ring-4 ring-[#6F00FF] scale-110",
              isCorrect === true && selectedParts.includes(3) && "animate-pulse border-4 border-[#FF6F00]"
            )}
          >
            {!rightSplit && (
              <div className="h-full flex items-center justify-center">
                <span className="text-white text-xl">✂️</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {!rightSplit && (
        <p className="text-lg text-[#2F2E41] mb-4" style={{ fontFamily: 'DM Sans' }}>
          Tap the right side to split it too! 🔄
        </p>
      )}

      {rightSplit && isCorrect === null && (
        <div className="animate-scale-in">
          <p className="text-lg text-[#2F2E41] mb-6" style={{ fontFamily: 'DM Sans' }}>
            Which two parts are the same size? Tap them! 👆
          </p>
          <p className="text-sm text-[#2F2E41] opacity-75" style={{ fontFamily: 'DM Sans' }}>
            Selected: {selectedParts.length}/2
          </p>
        </div>
      )}

      {isCorrect === true && (
        <div className="mt-6 animate-bounce">
          <span className="text-4xl">🔨</span>
          <p className="text-2xl font-bold text-[#FF6F00]" style={{ fontFamily: 'Space Grotesk' }}>
            Excellent! ¼ + ¼ = ½ !
          </p>
        </div>
      )}

      {isCorrect === false && (
        <div className="mt-6">
          <span className="text-2xl">❓</span>
          <p className="text-lg text-[#2F2E41]" style={{ fontFamily: 'DM Sans' }}>
            Try again! Look for pieces that are the same size.
          </p>
        </div>
      )}
    </div>
  );
};

export default ExerciseThree;
