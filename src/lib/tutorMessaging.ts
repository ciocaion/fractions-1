import i18n from '@/i18n';

export type TutorMessageType = 'success' | 'instruction';

export type LastTutorMessage = {
  type: TutorMessageType;
  data: Record<string, unknown>;
  i18nKey: string;
  i18nParams?: Record<string, unknown>;
};

let lastMessage: LastTutorMessage | null = null;

export const getLastTutorMessage = (): LastTutorMessage | null => lastMessage;

export const setLastTutorMessage = (msg: LastTutorMessage | null) => {
  lastMessage = msg;
};

export const sendTutorMessage = (
  type: TutorMessageType,
  i18nKey: string,
  options?: { params?: Record<string, unknown>; data?: Record<string, unknown> }
) => {
  const { params = {}, data = {} } = options || {};
  const message = i18n.t(i18nKey, params);

  lastMessage = { type, data, i18nKey, i18nParams: params };

  window.parent.postMessage(
    {
      type: 'tutorMessage',
      messageType: type,
      content: message,
      data: data,
    },
    '*'
  );
};

export const resendLastTutorMessageInCurrentLanguage = () => {
  if (!lastMessage) return;
  const message = i18n.t(lastMessage.i18nKey, lastMessage.i18nParams || {});
  window.parent.postMessage(
    {
      type: 'tutorMessage',
      messageType: lastMessage.type,
      content: message,
      data: lastMessage.data || {},
    },
    '*'
  );
};

