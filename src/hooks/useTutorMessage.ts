
import { useTranslation } from 'react-i18next';
import { useCallback, useRef } from 'react';

type MessageType = 'success' | 'instruction';

interface TutorMessage {
  type: 'tutorMessage';
  messageType: MessageType;
  content: string;
  data: object;
}

export const useTutorMessage = () => {
  const { t } = useTranslation();
  const lastMessageRef = useRef<{ key: string; messageType: MessageType; data: object } | null>(null);

  const sendMessage = useCallback((messageType: MessageType, translationKey: string, data: object = {}) => {
    const content = t(translationKey);
    
    const message: TutorMessage = {
      type: 'tutorMessage',
      messageType,
      content,
      data
    };

    // Store last message for re-sending on language change
    lastMessageRef.current = { key: translationKey, messageType, data };

    // Send message to parent frame
    window.parent.postMessage(message, '*');
  }, [t]);

  const resendLastMessage = useCallback(() => {
    if (lastMessageRef.current) {
      const { key, messageType, data } = lastMessageRef.current;
      sendMessage(messageType, key, data);
    }
  }, [sendMessage]);

  return { sendMessage, resendLastMessage };
};
