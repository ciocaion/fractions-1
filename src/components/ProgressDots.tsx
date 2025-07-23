
import { cn } from "@/lib/utils";

interface ProgressDotsProps {
  total: number;
  completed: number;
  current: number;
}

const ProgressDots = ({ total, completed, current }: ProgressDotsProps) => {
  return (
    <div className="flex justify-center space-x-3 mb-6">
      {Array.from({ length: total }, (_, i) => i + 1).map((step) => (
        <div
          key={step}
          className={cn(
            "w-4 h-4 rounded-full transition-all duration-300",
            step <= completed
              ? "bg-[#FF6F00] scale-110 shadow-lg"
              : step === current
              ? "bg-[#6F00FF] scale-105 animate-pulse"
              : "bg-[#F0F0F0] border-2 border-[#2F2E41]"
          )}
        />
      ))}
    </div>
  );
};

export default ProgressDots;
