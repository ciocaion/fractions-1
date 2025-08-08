
import { cn } from "@/lib/utils";
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { sendTutorMessage } from '@/lib/tutorMessaging';

interface CompletionScreenProps {
  onReset: () => void;
}

const CompletionScreen = ({ onReset }: CompletionScreenProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    // Send learned summary to tutor
    sendTutorMessage('success', 'completion.learned.summary');
  }, []);
  return (
    <div className="text-center">
      <div className="mb-8 animate-bounce">
        <span className="text-8xl">🎉</span>
      </div>
      
      <h2 className="text-4xl font-bold text-[#FF6F00] mb-6" style={{ fontFamily: 'Space Grotesk' }}>
        {t('completion.title')}
      </h2>
      
      <p className="text-xl text-[#2F2E41] mb-8" style={{ fontFamily: 'DM Sans' }}>
        {t('completion.subtitle')}
      </p>

      {/* Visual summary of learned fractions */}
      <div className="mb-8">
        <div className="flex justify-center items-center space-x-4 mb-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#90EE90] rounded mb-2"></div>
            <span className="text-sm font-bold" style={{ fontFamily: 'DM Sans' }}>¼</span>
          </div>
          <span className="text-2xl">+</span>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#FFD700] rounded mb-2"></div>
            <span className="text-sm font-bold" style={{ fontFamily: 'DM Sans' }}>¼</span>
          </div>
          <span className="text-2xl">+</span>
          <div className="text-center">
            <div className="w-32 h-16 bg-[#FF69B4] rounded mb-2"></div>
            <span className="text-sm font-bold" style={{ fontFamily: 'DM Sans' }}>½</span>
          </div>
          <span className="text-2xl">=</span>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#FF6F00] rounded mb-2 animate-pulse"></div>
            <span className="text-sm font-bold" style={{ fontFamily: 'DM Sans' }}>{t('completion.oneWhole')}</span>
          </div>
        </div>
      </div>

      {/* Confetti effect simulation */}
      <div className="mb-8">
        <div className="flex justify-center space-x-2 animate-bounce">
          <span className="text-2xl">🎊</span>
          <span className="text-2xl">⭐</span>
          <span className="text-2xl">🏆</span>
          <span className="text-2xl">⭐</span>
          <span className="text-2xl">🎊</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Learned summary moved to tutor messaging */}

        <button
          onClick={onReset}
          className={cn(
            "px-12 py-4 bg-[#6F00FF] text-white rounded-full text-xl font-bold",
            "hover:scale-105 transition-all duration-300",
            "border-4 border-transparent hover:border-[#FF6F00]",
            "shadow-lg hover:shadow-xl"
          )}
          style={{ fontFamily: 'Space Grotesk' }}
          >
          {t('completion.playAgain')}
        </button>
      </div>
    </div>
  );
};

export default CompletionScreen;
