
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface TutorMessage {
  type: 'tutorMessage';
  messageType: 'success' | 'instruction';
  content: string;
  data: Record<string, any>;
}

interface LanguageChangeMessage {
  type: 'setFlowLanguage';
  languageCode: 'en' | 'dk';
}

export const useTutorMessages = () => {
  const { t, i18n } = useTranslation();
  const lastMessageRef = useRef<{
    messageType: 'success' | 'instruction';
    translationKey: string;
    data?: Record<string, any>;
  } | null>(null);

  const sendTutorMessage = (messageType: 'success' | 'instruction', translationKey: string, data: Record<string, any> = {}) => {
    const content = t(translationKey, data);
    
    const message: TutorMessage = {
      type: 'tutorMessage',
      messageType,
      content,
      data
    };

    // Store the last message for potential resending
    lastMessageRef.current = { messageType, translationKey, data };

    window.parent.postMessage(message, '*');
    console.log('Sent tutor message:', message);
  };

  const resendLastMessage = () => {
    if (lastMessageRef.current) {
      const { messageType, translationKey, data } = lastMessageRef.current;
      sendTutorMessage(messageType, translationKey, data);
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data as LanguageChangeMessage;
      
      if (message.type === 'setFlowLanguage') {
        console.log('Language change received:', message.languageCode);
        i18n.changeLanguage(message.languageCode);
        
        // Resend the last message in the new language
        setTimeout(resendLastMessage, 100); // Small delay to ensure language change is processed
      }
    };

    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [i18n]);

  return { sendTutorMessage, t };
};
