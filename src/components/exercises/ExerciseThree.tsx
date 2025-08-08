
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import FractionSelector from "../FractionSelector";
import { useTranslation } from 'react-i18next';
import { sendTutorMessage } from '@/lib/tutorMessaging';

interface ExerciseThreeProps {
  onComplete: () => void;
}

const ExerciseThree = ({ onComplete }: ExerciseThreeProps) => {
  const [rightSplit, setRightSplit] = useState(false);
  const [selectedParts, setSelectedParts] = useState<number[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showSumTask, setShowSumTask] = useState(false);
  const [selectedSum, setSelectedSum] = useState<string | null>(null);
  const [sumIsCorrect, setSumIsCorrect] = useState<boolean | null>(null);
  const { t } = useTranslation();

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
        // Any two parts are correct since all are ¼
        setIsCorrect(true);
        sendTutorMessage('success', 'exercise.3.feedback.correctChoice');
        setTimeout(() => {
          setShowSumTask(true);
        }, 1500);
      }
    }
  };

  const handleSumSelect = (sum: string) => {
    setSelectedSum(sum);
    const correct = sum === "1/2";
    setSumIsCorrect(correct);
    
    if (correct) {
      sendTutorMessage('success', 'exercise.3.feedback.correctSum');
      setTimeout(() => {
        onComplete();
      }, 1500);
    }
  };

  useEffect(() => {
    if (!rightSplit) {
      sendTutorMessage('instruction', 'exercise.3.instruction.tapRight');
    }
  }, [rightSplit]);

  useEffect(() => {
    if (rightSplit && !showSumTask && isCorrect === null) {
      sendTutorMessage('instruction', 'exercise.3.instruction.pickAnyTwo');
    }
  }, [rightSplit, showSumTask, isCorrect]);

  useEffect(() => {
    if (rightSplit && !showSumTask && isCorrect === null) {
      sendTutorMessage('instruction', 'exercise.3.selected', { params: { count: selectedParts.length } });
    }
  }, [selectedParts, rightSplit, showSumTask, isCorrect]);

  useEffect(() => {
    if (showSumTask) {
      sendTutorMessage('instruction', 'exercise.3.question.sum');
    }
  }, [showSumTask]);

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-[#2F2E41] mb-8" style={{ fontFamily: 'Space Grotesk' }}>
        {t('exercise.3.title')}
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

      {/* Instruction sent via tutor message */}

      {/* Instructions and selection count sent via tutor messages */}

      {showSumTask && (
        <div className="animate-scale-in">
          {/* Question sent via tutor message */}
          <FractionSelector
            options={["1/2", "1/4", "1/3"]}
            onSelect={handleSumSelect}
            selectedFraction={selectedSum}
            correctAnswer="1/2"
            isCorrect={sumIsCorrect}
          />
        </div>
      )}

      {isCorrect === true && !showSumTask && (
        <div className="mt-6 animate-bounce">
          <span className="text-4xl">⭐</span>
          <p className="text-2xl font-bold text-[#FF6F00]" style={{ fontFamily: 'Space Grotesk' }}>
            {t('exercise.3.feedback.correctChoice')}
          </p>
        </div>
      )}

      {sumIsCorrect === true && (
        <div className="mt-6 animate-bounce">
          <span className="text-4xl">🔨</span>
          {/* Success message sent via tutor messaging only */}
        </div>
      )}
    </div>
  );
};

export default ExerciseThree;
