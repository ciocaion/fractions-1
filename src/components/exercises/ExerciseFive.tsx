import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from 'react-i18next';
import { sendTutorMessage } from '@/lib/tutorMessaging';

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
  const { t } = useTranslation();

  const splitOptions = [
    { pieces: 2, icon: "🔄" },
    { pieces: 4, icon: "➕" },
    { pieces: 8, icon: "✨" },
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

  useEffect(() => {
    if (!showPrediction) {
      sendTutorMessage('instruction', 'exercise.5.question.howManyPieces');
    }
  }, [showPrediction]);

  useEffect(() => {
    if (showPrediction && !showResult) {
      sendTutorMessage('instruction', 'exercise.5.question.predict');
    }
  }, [showPrediction, showResult]);

  useEffect(() => {
    if (predictedFraction && !showResult) {
      if (isPredictionCorrect()) {
        sendTutorMessage('instruction', 'exercise.5.feedback.prediction.correct');
      } else {
        sendTutorMessage('instruction', 'exercise.5.feedback.prediction.incorrect');
      }
    }
  }, [predictedFraction, showResult]);

  useEffect(() => {
    if (showComparison) {
      sendTutorMessage('success', 'exercise.5.feedback.eachPieceIs', { params: { fraction: getCorrectFraction() } });
      if (predictedFraction) {
        if (isPredictionCorrect()) {
          sendTutorMessage('success', 'exercise.5.feedback.prediction.wasCorrect');
        } else {
          sendTutorMessage('success', 'exercise.5.feedback.prediction.wasIncorrect', { params: { predicted: predictedFraction, actual: getCorrectFraction() } });
        }
      }
    }
  }, [showComparison]);

  const renderSplitResult = () => {
    if (!selectedSplit) return null;

    if (selectedSplit === 2) {
      // Horizontal split for 2 pieces
      const pieces = [];
      for (let i = 0; i < 2; i++) {
        pieces.push(
          <div
            key={i}
            className={cn(
              "w-24 h-24 border-b border-[#2F2E41] last:border-b-0 transition-all duration-500",
              i === currentPiece 
                ? "bg-[#FF6F00] animate-pulse border-4 border-[#6F00FF]" 
                : i < currentPiece 
                ? "bg-[#FFD700]" 
                : "bg-[#0826FF]"
            )}
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
        <div className="flex flex-col animate-fade-in border-2 border-[#2F2E41] rounded-lg overflow-hidden">
          {pieces}
        </div>
      );
    }

    if (selectedSplit === 4) {
      // 2x2 grid for 4 pieces
      const pieces = [];
      for (let i = 0; i < 4; i++) {
        pieces.push(
          <div
            key={i}
            className={cn(
              "w-24 h-24 border border-[#2F2E41] transition-all duration-500",
              i === currentPiece 
                ? "bg-[#FF6F00] animate-pulse border-4 border-[#6F00FF]" 
                : i < currentPiece 
                ? "bg-[#FFD700]" 
                : "bg-[#0826FF]"
            )}
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
        <div className="grid grid-cols-2 animate-fade-in border-2 border-[#2F2E41] rounded-lg overflow-hidden">
          {pieces}
        </div>
      );
    }

    if (selectedSplit === 8) {
      // 2x4 grid for 8 pieces
      const pieces = [];
      for (let i = 0; i < 8; i++) {
        pieces.push(
          <div
            key={i}
            className={cn(
              "w-12 h-12 border border-[#2F2E41] transition-all duration-500",
              i === currentPiece 
                ? "bg-[#FF6F00] animate-pulse border-4 border-[#6F00FF]" 
                : i < currentPiece 
                ? "bg-[#FFD700]" 
                : "bg-[#0826FF]"
            )}
          >
            {i === currentPiece && (
              <div className="h-full flex items-center justify-center text-white font-bold text-sm">
                1/{selectedSplit}
              </div>
            )}
          </div>
        );
      }
      return (
        <div className="grid grid-cols-4 animate-fade-in border-2 border-[#2F2E41] rounded-lg overflow-hidden">
          {pieces}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-[#2F2E41] mb-8" style={{ fontFamily: 'Space Grotesk' }}>
        {t('exercise.5.title')}
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
          {/* Instruction sent via tutor message */}
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
                <span className="text-sm font-medium">{t('exercise.5.action.splitInto', { count: option.pieces })}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {showPrediction && !showResult && (
        <div className="animate-scale-in">
          {/* Instruction sent via tutor message */}
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
          {/* Prediction feedback sent via tutor message */}
        </div>
      )}

      {showComparison && (
        <div className="mt-6 animate-bounce">
          <span className="text-4xl">⭐</span>
          <div className="mt-4">
            <p className="text-xl font-bold text-[#2F2E41] mb-2" style={{ fontFamily: 'Space Grotesk' }}>
              {t('exercise.5.feedback.eachPieceIs', { fraction: getCorrectFraction() })}
            </p>
            {isPredictionCorrect() ? (
              <p className="text-lg text-green-600 font-medium" style={{ fontFamily: 'DM Sans' }}>
                {t('exercise.5.feedback.prediction.wasCorrect')}
              </p>
            ) : (
              <p className="text-lg text-[#FF6F00] font-medium" style={{ fontFamily: 'DM Sans' }}>
                {t('exercise.5.feedback.prediction.wasIncorrect', { predicted: predictedFraction ?? '', actual: getCorrectFraction() })}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseFive;
