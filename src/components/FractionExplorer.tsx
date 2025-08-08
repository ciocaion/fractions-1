
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTutorMessage } from "@/hooks/useTutorMessage";
import { cn } from "@/lib/utils";
import ExerciseOne from "./exercises/ExerciseOne";
import ExerciseTwo from "./exercises/ExerciseTwo";
import ExerciseThree from "./exercises/ExerciseThree";
import ExerciseFour from "./exercises/ExerciseFour";
import ExerciseFive from "./exercises/ExerciseFive";
import CompletionScreen from "./CompletionScreen";
import ProgressDots from "./ProgressDots";

const FractionExplorer = () => {
  const { t } = useTranslation();
  const { sendMessage } = useTutorMessage();
  const [currentExercise, setCurrentExercise] = useState(1);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);

  // Send intro message when component mounts
  useEffect(() => {
    sendMessage('instruction', 'fraction_explorer.intro');
  }, [sendMessage]);

  const completeExercise = (exerciseNumber: number) => {
    if (!completedExercises.includes(exerciseNumber)) {
      setCompletedExercises([...completedExercises, exerciseNumber]);
    }
    
    if (exerciseNumber < 5) {
      setTimeout(() => {
        setCurrentExercise(exerciseNumber + 1);
      }, 2000);
    } else {
      setTimeout(() => {
        setCurrentExercise(6);
        sendMessage('success', 'fraction_explorer.ex5_predict_before.wrap_up');
      }, 2000);
    }
  };

  const resetGame = () => {
    setCurrentExercise(1);
    setCompletedExercises([]);
    sendMessage('instruction', 'fraction_explorer.intro');
  };

  return (
    <div className="max-w-4xl w-full mx-auto">
      <div className="bg-white rounded-[50px] border-l-[10px] border-b-[10px] border-[#2F2E41] p-8 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="font-bold text-5xl md:text-6xl text-[#2F2E41] mb-4" style={{ fontFamily: 'Space Grotesk' }}>
            {t('fraction_explorer.title')}
          </h1>
          <p className="text-xl text-[#2F2E41] font-medium" style={{ fontFamily: 'DM Sans' }}>
            {t('fraction_explorer.subtitle')}
          </p>
        </div>

        <ProgressDots 
          total={5} 
          completed={completedExercises.length}
          current={currentExercise} 
        />

        <div className="mt-8">
          {currentExercise === 1 && (
            <ExerciseOne onComplete={() => completeExercise(1)} />
          )}
          {currentExercise === 2 && (
            <ExerciseTwo onComplete={() => completeExercise(2)} />
          )}
          {currentExercise === 3 && (
            <ExerciseThree onComplete={() => completeExercise(3)} />
          )}
          {currentExercise === 4 && (
            <ExerciseFour onComplete={() => completeExercise(4)} />
          )}
          {currentExercise === 5 && (
            <ExerciseFive onComplete={() => completeExercise(5)} />
          )}
          {currentExercise === 6 && (
            <CompletionScreen onReset={resetGame} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FractionExplorer;
