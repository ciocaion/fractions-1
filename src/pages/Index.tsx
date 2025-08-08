
import { useEffect } from 'react';
import FractionExplorer from "@/components/FractionExplorer";
import { sendTutorMessage } from '@/lib/tutorMessaging';

const Index = () => {
  useEffect(() => {
    sendTutorMessage('instruction', 'exercise.1.instruction.tapToSplit');
  }, []);
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
      <FractionExplorer />
    </div>
  );
};

export default Index;
