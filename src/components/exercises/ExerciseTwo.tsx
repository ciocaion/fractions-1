
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTutorMessage } from "@/hooks/useTutorMessage";
import { cn } from "@/lib/utils";
import FractionSelector from "../FractionSelector";

interface ExerciseTwoProps {
  onComplete: () => void;
}

const ExerciseTwo = ({ onComplete }: ExerciseTwoProps) => {
  const { t } = useTranslation();
  const { sendMessage } = useTutorMessage();
  const [topSplit, setTopSplit] = useState(false);
  const [showSelector, setShowSelector] = useState(false);
  const [selectedFraction, setSelectedFraction] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showSumTask, setShowSumTask] = useState(false);
  const [selectedSum, setSelectedSum] = useState<string | null>(null);
  const [sumIsCorrect, setSumIsCorrect] = useState<boolean | null>(null);

  const handleTopSplit = () => {
    setTopSplit(true);
    setTimeout(() => {
      setShowSelector(true);
      sendMessage('instruction', 'fraction_explorer.ex2_split_one_half.after_split_prompt');
    }, 1000);
  };

  const handleFractionSelect = (fraction: string) => {
    setSelectedFraction(fraction);
    const correct = fraction === "1/4";
    setIsCorrect(correct);
    
    if (correct) {
      sendMessage('success', 'fraction_explorer.ex2_split_one_half.success_top_piece');
      setTimeout(() => {
        setShowSumTask(true);
        sendMessage('instruction', 'fraction_explorer.ex2_split_one_half.sum_prompt');
      }, 1500);
    } else {
      sendMessage('instruction', 'fraction_explorer.ex2_split_one_half.incorrect_top_piece');
    }
  };

  const handleSumSelect = (sum: string) => {
    setSelectedSum(sum);
    const correct = sum === "1/2";
    setSumIsCorrect(correct);
    
    if (correct) {
      sendMessage('success', 'fraction_explorer.ex2_split_one_half.sum_success');
      setTimeout(() => {
        onComplete();
      }, 1500);
    } else {
      sendMessage('instruction', 'fraction_explorer.ex2_split_one_half.sum_incorrect');
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-[#2F2E41] mb-8" style={{ fontFamily: 'Space Grotesk' }}>
        {t('fraction_explorer.ex2_split_one_half.title')}
      </h2>
      
      <div className="flex justify-center mb-8">
        <div className="flex flex-col">
          {!topSplit ? (
            <div
              onClick={handleTopSplit}
              className={cn(
                "w-48 h-24 bg-[#0826FF] rounded-t-lg cursor-pointer transition-all duration-300",
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
            <div className="flex animate-fade-in rounded-t-lg overflow-hidden">
              <div className={cn(
                "w-24 h-24 bg-[#90EE90] transition-all duration-500",
                showSelector && !showSumTask && "border-4 border-[#FF6F00] animate-pulse",
                showSumTask && "border-4 border-[#FF6F00] animate-pulse"
              )} />
              <div className={cn(
                "w-24 h-24 bg-[#FFD700] transition-all duration-500",
                showSumTask && "border-4 border-[#FF6F00] animate-pulse"
              )} />
            </div>
          )}
          <div className="w-48 h-24 bg-[#2F2E41] rounded-b-lg" />
        </div>
      </div>

      {showSelector && !showSumTask && (
        <div className="animate-scale-in">
          <FractionSelector
            options={["1/4", "1/2", "1/8"]}
            onSelect={handleFractionSelect}
            selectedFraction={selectedFraction}
            correctAnswer="1/4"
            isCorrect={isCorrect}
          />
        </div>
      )}

      {showSumTask && (
        <div className="animate-scale-in">
          <FractionSelector
            options={["1/2", "1/4", "1/8"]}
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

export default ExerciseTwo;
