
import { cn } from "@/lib/utils";

interface FractionSelectorProps {
  options: string[];
  onSelect: (fraction: string) => void;
  selectedFraction: string | null;
  correctAnswer: string;
  isCorrect: boolean | null;
}

const FractionSelector = ({ 
  options, 
  onSelect, 
  selectedFraction, 
  correctAnswer, 
  isCorrect 
}: FractionSelectorProps) => {
  
  return (
    <div className="flex justify-center space-x-6">
      {options.map((fraction) => (
        <button
          key={fraction}
          onClick={() => onSelect(fraction)}
          className={cn(
            "flex flex-col items-center space-y-3 p-4 rounded-2xl transition-all duration-300",
            "hover:scale-105 min-w-[80px] min-h-[80px]",
            selectedFraction === fraction
              ? isCorrect === true
                ? "bg-[#FF6F00] text-white border-4 border-[#FF6F00] animate-pulse"
                : isCorrect === false
                ? "bg-red-500 text-white border-4 border-red-500 animate-bounce"
                : "bg-[#6F00FF] text-white border-4 border-[#6F00FF]"
              : "bg-[#F0F0F0] text-[#2F2E41] border-4 border-[#2F2E41] hover:border-[#6F00FF]"
          )}
        >
          <div className="flex flex-col items-center">
            <span className="font-bold text-3xl" style={{ fontFamily: 'DM Sans' }}>
              {fraction.split('/')[0]}
            </span>
            <div className="w-8 h-1 bg-current my-2"></div>
            <span className="font-bold text-3xl" style={{ fontFamily: 'DM Sans' }}>
              {fraction.split('/')[1]}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default FractionSelector;
