declare module '@heygen/streaming-avatar' {
  export interface VoiceSetting {
    voiceId: string;
    rate?: number;
    emotion?: 'EXCITED' | 'SERIOUS' | 'FRIENDLY' | 'SOOTHING' | 'BROADCASTER';
  }

  export interface StartAvatarRequest {
    avatarName: string;
    quality?: 'low' | 'medium' | 'high';
    language?: string;
    voice?: VoiceSetting;
    knowledgeId?: string;
    knowledgeBase?: string;
    disableIdleTimeout?: boolean;
  }

  export interface StreamingAvatarApiConfig {
    token: string;
    basePath?: string;
  }

  export class StreamingAvatar {
    constructor(config: StreamingAvatarApiConfig);
    createStartAvatar(request: StartAvatarRequest): Promise<{ session_id: string }>;
    speak(params: { text: string; task_type?: 'TALK' | 'REPEAT' }): Promise<void>;
    stopAvatar(sessionId: string): Promise<void>;
    on(event: string, callback: () => void): void;
    off(event: string, callback: () => void): void;
  }

  interface StreamingAvatarOptions {
    quality?: 'low' | 'medium' | 'high';
    languageCode?: string;
    enableAutoplay?: boolean;
    enableIdle?: boolean;
  }

  interface StreamingAvatarConfig {
    apiKey: string;
    avatarId: string;
    containerElement: HTMLElement;
    options?: StreamingAvatarOptions;
  }

  interface StreamingAvatarInstance {
    speak: (text: string) => Promise<void>;
    destroy: () => void;
    addEventListener: (event: string, callback: () => void) => void;
    removeEventListener: (event: string, callback: () => void) => void;
  }

  export function createStreamingAvatar(config: StreamingAvatarConfig): Promise<StreamingAvatarInstance>;
} 