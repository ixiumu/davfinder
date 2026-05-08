import { toast } from 'vue-sonner';

export type NotifyType = 'success' | 'error' | 'info' | 'warning';

export interface NotifyPayload {
  type: NotifyType;
  message: string;
}

export type NotifierSource = {
  emitter?: {
    emit?: (event: string, payload?: unknown) => void;
  };
  config?: {
    get?: (key: string) => unknown;
  };
};

export type Notifier = {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
  emit: (type: NotifyType, message: string) => void;
};

function shouldShowToast(source?: NotifierSource): boolean {
  if (!source?.config?.get) {
    return true;
  }

  try {
    return Boolean(source.config.get('notificationsEnabled'));
  } catch {
    return true;
  }
}

export function notify(
  source: NotifierSource | undefined,
  type: NotifyType,
  message: string
): void {
  const payload: NotifyPayload = { type, message };
  source?.emitter?.emit?.('vf-notify', payload);

  if (!shouldShowToast(source)) {
    return;
  }

  switch (type) {
    case 'success':
      toast.success(message);
      break;
    case 'error':
      toast.error(message);
      break;
    case 'warning':
      toast.warning(message);
      break;
    default:
      toast.info(message);
      break;
  }
}

export function createNotifier(source?: NotifierSource): Notifier {
  return {
    success(message: string) {
      notify(source, 'success', message);
    },
    error(message: string) {
      notify(source, 'error', message);
    },
    info(message: string) {
      notify(source, 'info', message);
    },
    warning(message: string) {
      notify(source, 'warning', message);
    },
    emit(type: NotifyType, message: string) {
      notify(source, type, message);
    },
  };
}
