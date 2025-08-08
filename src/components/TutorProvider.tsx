import { useEffect } from 'react';
import i18n from '@/i18n';
import { resendLastTutorMessageInCurrentLanguage } from '@/lib/tutorMessaging';

type Props = { children: React.ReactNode };

const TutorProvider = ({ children }: Props) => {
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data || typeof data !== 'object') return;
      if (data.type === 'setFlowLanguage' && typeof data.languageCode === 'string') {
        const lang = data.languageCode;
        if (lang === 'en' || lang === 'dk') {
          i18n.changeLanguage(lang).then(() => {
            resendLastTutorMessageInCurrentLanguage();
          });
        }
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return <>{children}</>;
};

export default TutorProvider;

