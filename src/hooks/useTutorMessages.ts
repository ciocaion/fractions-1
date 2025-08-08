
import { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface LastMessage {
  type: 'success' | 'instruction';
  i18nKey: string;
  data?: Record<string, any>;
}

export const useTutorMessages = () => {
  const { t } = useTranslation();
  const lastMessageRef = useRef<LastMessage | null>(null);

  const sendTutorMessage = useCallback((
    type: 'success' | 'instruction',
    i18nKey: string,
    data: Record<string, any> = {}
  ) => {
    const message = t(i18nKey, data) as string;
    
    // Store the last message
    lastMessageRef.current = { type, i18nKey, data };
    
    // Send message to parent frame
    window.parent.postMessage({
      type: 'tutorMessage',
      messageType: type,
      content: message,
      data: data
    }, '*');
  }, [t]);

  const resendLastMessage = useCallback(() => {
    if (lastMessageRef.current) {
      const { type, i18nKey, data } = lastMessageRef.current;
      const message = t(i18nKey, data) as string;
      
      window.parent.postMessage({
        type: 'tutorMessage',
        messageType: type,
        content: message,
        data: data || {}
      }, '*');
    }
  }, [t]);

  return { sendTutorMessage, resendLastMessage };
};
