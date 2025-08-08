
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTutorMessage } from "@/hooks/useTutorMessage";
import { cn } from "@/lib/utils";
import FractionSelector from "../FractionSelector";

interface ExerciseThreeProps {
  onComplete: () => void;
}

const ExerciseThree = ({ onComplete }: ExerciseThreeProps) => {
  const { t } = useTranslation();
  const { sendMessage } = useTutorMessage();
  const [rightSplit, setRightSplit] = useState(false);
  const [selectedParts, setSelectedParts] = useState<number[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showSumTask, setShowSumTask] = useState(false);
  const [selectedSum, setSelectedSum] = useState<string | null>(null);
  const [sumIsCorrect, setSumIsCorrect] = useState<boolean | null>(null);

  const handleRightSplit = () => {
    setRightSplit(true);
    setTimeout(() => {
      sendMessage('instruction', 'fraction_explorer.ex3_split_another_side.after_split_prompt');
    }, 500);
  };

  const handlePartSelect = (partIndex: number) => {
    if (selectedParts.includes(partIndex)) {
      setSelectedParts(selectedParts.filter(p => p !== partIndex));
    } else if (selectedParts.length < 2) {
      const newSelected = [...selectedParts, partIndex];
      setSelectedParts(newSelected);
      
      if (newSelected.length === 2) {
        setIsCorrect(true);
        sendMessage('success', 'fraction_explorer.ex3_split_another_side.success');
        setTimeout(() => {
          setShowSumTask(true);
          sendMessage('instruction', 'fraction_explorer.ex3_split_another_side.after_split_prompt');
        }, 1500);
      }
    }
  };

  const handleSumSelect = (sum: string) => {
    setSelectedSum(sum);
    const correct = sum === "1/2";
    setSumIsCorrect(correct);
    
    if (correct) {
      sendMessage('success', 'fraction_explorer.ex3_split_another_side.success');
      setTimeout(() => {
        onComplete();
      }, 1500);
    } else {
      sendMessage('instruction', 'fraction_explorer.ex3_split_another_side.incorrect');
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-[#2F2E41] mb-8" style={{ fontFamily: 'Space Grotesk' }}>
        {t('fraction_explorer.ex3_split_another_side.title')}
      </h2>
      
      <div className="flex justify-center mb-8">
        <div className="grid grid-cols-2 gap-1">
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

      {showSumTask && (
        <div className="animate-scale-in">
          <FractionSelector
            options={["1/2", "1/4", "1/3"]}
            onSelect={handleSumSelect}
            selectedFraction={selectedSum}
            correctAnswer="1/2"
            isCorrect={sumIsCorrect}
          />
        </div>
      )}
    </div>
  );
};

export default ExerciseThree;
