
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
  
  const getFractionIcon = (fraction: string) => {
    switch (fraction) {
      case "1/2":
        return (
          <div className="w-12 h-12 bg-white rounded border-2 border-current overflow-hidden">
            <div className="w-full h-1/2 bg-current"></div>
          </div>
        );
      case "1/3":
        return (
          <div className="w-12 h-12 bg-white rounded border-2 border-current overflow-hidden">
            <div className="w-full h-1/3 bg-current"></div>
          </div>
        );
      case "1/4":
        return (
          <div className="w-12 h-12 bg-white rounded border-2 border-current overflow-hidden grid grid-cols-2">
            <div className="bg-current"></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        );
      case "1/8":
        return (
          <div className="w-12 h-12 bg-white rounded border-2 border-current overflow-hidden grid grid-cols-4">
            <div className="bg-current"></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        );
      default:
        return <div className="w-12 h-12 bg-white rounded border-2 border-current"></div>;
    }
  };

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
          {getFractionIcon(fraction)}
          <span className="font-bold text-lg" style={{ fontFamily: 'DM Sans' }}>
            {fraction}
          </span>
        </button>
      ))}
    </div>
  );
};

export default FractionSelector;
