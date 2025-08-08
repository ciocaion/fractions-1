
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import FractionSelector from "../FractionSelector";
import { useTutorMessages } from "@/hooks/useTutorMessages";

interface ExerciseOneProps {
  onComplete: () => void;
}

const ExerciseOne = ({ onComplete }: ExerciseOneProps) => {
  const [isSplit, setIsSplit] = useState(false);
  const [showSelector, setShowSelector] = useState(false);
  const [selectedFraction, setSelectedFraction] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const { t } = useTranslation();
  const { sendTutorMessage } = useTutorMessages();

  useEffect(() => {
    sendTutorMessage('instruction', 'fraction_explorer.ex1.split_instruction');
  }, [sendTutorMessage]);

  const handleSplit = () => {
    setIsSplit(true);
    setTimeout(() => {
      setShowSelector(true);
      sendTutorMessage('instruction', 'fraction_explorer.ex1.fraction_question');
    }, 1000);
  };

  const handleFractionSelect = (fraction: string) => {
    setSelectedFraction(fraction);
    const correct = fraction === "1/2";
    setIsCorrect(correct);
    
    if (correct) {
      sendTutorMessage('success', 'fraction_explorer.ex1.success');
      setTimeout(() => {
        onComplete();
      }, 1500);
    } else {
      sendTutorMessage('instruction', 'fraction_explorer.ex1.try_again');
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-[#2F2E41] mb-8" style={{ fontFamily: 'Space Grotesk' }}>
        {t('fraction_explorer.ex1.title')}
      </h2>
      
      <div className="flex justify-center mb-8">
        <div className="relative">
          {!isSplit ? (
            <div
              onClick={handleSplit}
              className={cn(
                "w-48 h-48 bg-[#FF6F00] rounded-lg cursor-pointer transition-all duration-300",
                "hover:scale-105 hover:shadow-lg",
                "border-4 border-dashed border-[#6F00FF] border-opacity-50"
              )}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-[#6F00FF] opacity-50 animate-pulse" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-2xl">✂️</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col animate-fade-in">
              <div
                className={cn(
                  "w-48 h-24 bg-[#0826FF] rounded-t-lg transition-all duration-500",
                  isCorrect === true && "animate-pulse border-4 border-[#FF6F00]"
                )}
              />
              <div
                className={cn(
                  "w-48 h-24 bg-[#2F2E41] rounded-b-lg transition-all duration-500",
                  isCorrect === true && "animate-pulse border-4 border-[#FF6F00]"
                )}
              />
            </div>
          )}
        </div>
      </div>

      {showSelector && (
        <div className="animate-scale-in">
          <FractionSelector
            options={["1/2", "1/3", "1/4"]}
            onSelect={handleFractionSelect}
            selectedFraction={selectedFraction}
            correctAnswer="1/2"
            isCorrect={isCorrect}
          />
        </div>
      )}

      {isCorrect === true && (
        <div className="mt-6 animate-bounce">
          <span className="text-4xl">⭐</span>
        </div>
      )}
    </div>
  );
};

export default ExerciseOne;
