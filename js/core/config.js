/* ═══════════════════════════════════════════════════════
   NEXA AI — Configuration (Full & Fixed)
   Author: AL-AMIN
   Part 3/30 (Updated)
   ═══════════════════════════════════════════════════════ */

'use strict';

/* ═══════════════════════════════════════════════════════
   MAIN CONFIG
   ═══════════════════════════════════════════════════════ */
var CONFIG = {
  
  /* ─────────────────────────────────────────────
     APP INFO
     ───────────────────────────────────────────── */
  app: {
    name: 'NEXA',
    fullName: 'NEXA AI',
    tagline: 'Next Generation AI Twin',
    author: 'AL-AMIN',
    version: '1.0.0',
    buildDate: '2025-10-16'
  },
  
  /* ─────────────────────────────────────────────
     ⚠️ WORKER URL
     ───────────────────────────────────────────── */
  workerURL: 'https://alamin-ai.akijelectronic.workers.dev',
  
  /* ─────────────────────────────────────────────
     TISHA CHARACTER
     ───────────────────────────────────────────── */
  tisha: {
    name: 'তিশা',
    nameEn: 'Tisha',
    age: 24,
    gender: 'female',
    
    appearance: {
      skinTone: '#d4a574',
      hairColor: '#1a1a1a',
      hairStyle: 'long',
      eyeColor: '#6b4423',
      outfit: 'purple-casual',
      height: 1.65
    },
    
    voice: {
      gender: 'female',
      pitch: 1.1,
      rate: 0.95,
      language: 'bn-BD',
      fallbackLanguage: 'en-US'
    },
    
    personality: {
      trait: 'friendly',
      warmth: 0.9,
      humor: 0.6,
      formality: 0.3
    }
  },
  
  /* ─────────────────────────────────────────────
     AI PROVIDERS
     ───────────────────────────────────────────── */
  ai: {
    defaultProvider: 'auto',
    
    groq: {
      enabled: true,
      models: [
        'qwen/qwen3.8-27b',
        'openai/gpt-oss-120b',
        'openai/gpt-oss-20b',
        'llama-3.1-8b-instant'
      ],
      defaultModel: 'qwen/qwen3.8-27b'
    },
    
    openrouter: {
      enabled: true,
      models: [
        'cognitivecomputations/dolphin-mistral-24b-venice-edition:free',
        'cognitivecomputations/dolphin3.0-mistral-24b:free',
        'nousresearch/hermes-3-llama-3.1-405b:free'
      ],
      defaultModel: 'cognitivecomputations/dolphin-mistral-24b-venice-edition:free'
    },
    
    gemini: {
      enabled: false,
      models: ['gemini-1.5-flash', 'gemini-1.5-pro'],
      defaultModel: 'gemini-1.5-flash'
    },
    
    pollinations: {
      enabled: true,
      url: 'https://image.pollinations.ai/prompt/'
    },
    
    generation: {
      temperature: 0.7,
      maxTokens: 4096,
      topP: 0.95,
      frequencyPenalty: 0.3,
      presencePenalty: 0.3
    },
    
    fallback: {
      enabled: true,
      retries: 2
    }
  },
  
  /* ─────────────────────────────────────────────
     ROUTING
     ───────────────────────────────────────────── */
  routing: {
    chat: ['groq', 'openrouter'],
    code: ['groq', 'openrouter'],
    vision: ['gemini', 'groq'],
    voice: ['groq'],
    documents: ['groq', 'openrouter'],
    uncensored: ['openrouter'],
    creative: ['openrouter', 'groq'],
    imagegen: ['pollinations']
  },
  
  /* ─────────────────────────────────────────────
     LANGUAGES
     ───────────────────────────────────────────── */
  languages: {
    autoDetect: true,
    default: 'bn',
    supported: [
      { code: 'bn', name: 'বাংলা', nameEn: 'Bengali' },
      { code: 'en', name: 'English', nameEn: 'English' },
      { code: 'hi', name: 'हिन्दी', nameEn: 'Hindi' },
      { code: 'ar', name: 'العربية', nameEn: 'Arabic' },
      { code: 'zh', name: '中文', nameEn: 'Chinese' },
      { code: 'ja', name: '日本語', nameEn: 'Japanese' },
      { code: 'ko', name: '한국어', nameEn: 'Korean' },
      { code: 'fr', name: 'Français', nameEn: 'French' },
      { code: 'de', name: 'Deutsch', nameEn: 'German' },
      { code: 'es', name: 'Español', nameEn: 'Spanish' },
      { code: 'ru', name: 'Русский', nameEn: 'Russian' },
      { code: 'pt', name: 'Português', nameEn: 'Portuguese' },
      { code: 'it', name: 'Italiano', nameEn: 'Italian' },
      { code: 'tr', name: 'Türkçe', nameEn: 'Turkish' },
      { code: 'ur', name: 'اردو', nameEn: 'Urdu' },
      { code: 'ne', name: 'नेपाली', nameEn: 'Nepali' }
    ]
  },
  
  /* ─────────────────────────────────────────────
     EMOTIONS
     ───────────────────────────────────────────── */
  emotions: {
    happy:     { icon: '😊', color: '#22c55e', intensity: 1.0 },
    sad:       { icon: '😢', color: '#3b82f6', intensity: 0.8 },
    surprised: { icon: '😮', color: '#f59e0b', intensity: 0.9 },
    thinking:  { icon: '🤔', color: '#a855f7', intensity: 0.7 },
    angry:     { icon: '😠', color: '#ef4444', intensity: 0.9 },
    fearful:   { icon: '😨', color: '#8b5cf6', intensity: 0.8 },
    tired:     { icon: '😴', color: '#64748b', intensity: 0.6 },
    love:      { icon: '❤️', color: '#ec4899', intensity: 1.0 },
    neutral:   { icon: '😐', color: '#94a3b8', intensity: 0.5 }
  },
  
  /* ─────────────────────────────────────────────
     THEMES
     ───────────────────────────────────────────── */
  themes: {
    dark: {
      bg1: '#0a0e1a', bg2: '#1a0f2e', bg3: '#0f1628',
      primary: '#a855f7', accent: '#06b6d4', text: '#ffffff'
    },
    light: {
      bg1: '#f8fafc', bg2: '#f1f5f9', bg3: '#e2e8f0',
      primary: '#a855f7', accent: '#06b6d4', text: '#0a0e1a'
    }
  },
  
  /* ─────────────────────────────────────────────
     UI SETTINGS
     ───────────────────────────────────────────── */
  ui: {
    theme: 'dark',
    animations: 'full',
    soundEffects: true,
    hapticFeedback: true,
    autoGrowInput: true
  },
  
  /* ─────────────────────────────────────────────
     FEATURES
     ───────────────────────────────────────────── */
  features: {
    chat: true,
    vision: true,
    voice: true,
    documents: true,
    memory: true,
    agents: false,
    tools: true,
    imagegen: true,
    cinematic: false,
    analytics: true
  },
  
  /* ─────────────────────────────────────────────
     STORAGE
     ───────────────────────────────────────────── */
  storage: {
    key: 'nexa_ai_v1',
    maxMessages: 100,
    maxSessions: 20,
    autoSave: true,
    autoSaveInterval: 60000
  },
  
  /* ─────────────────────────────────────────────
     LIMITS
     ───────────────────────────────────────────── */
  limits: {
    maxMessageLength: 4000,
    maxImageSize: 10 * 1024 * 1024,
    maxDocSize: 20 * 1024 * 1024,
    maxFileCount: 10,
    rateLimit: {
      messagesPerMinute: 30,
      requestsPerDay: 1000
    }
  },
  
  /* ─────────────────────────────────────────────
     UPDATES
     ───────────────────────────────────────────── */
  updates: {
    enabled: true,
    autoCheck: true,
    checkInterval: 3600000,
    currentVersion: '1.0.0',
    versionURL: 'https://raw.githubusercontent.com/akijelectronic-dev/nexa-ai/main/version.json'
  },
  
  /* ─────────────────────────────────────────────
     ANALYTICS
     ───────────────────────────────────────────── */
  analytics: {
    enabled: true,
    trackUsage: true,
    trackErrors: true,
    anonymize: true
  },
  
  /* ─────────────────────────────────────────────
     ADMIN
     ───────────────────────────────────────────── */
  admin: {
    enabled: true,
    secretURL: '#admin',
    secretPassword: 'nexa_admin_2025',
    sessionDuration: 24 * 60 * 60 * 1000,
    accessLevels: ['user', 'developer', 'admin', 'super_admin']
  },
  
  /* ─────────────────────────────────────────────
     AUDIO
     ───────────────────────────────────────────── */
  audio: {
    masterVolume: 0.8,
    effectsVolume: 0.7,
    voiceVolume: 0.9,
    sounds: {
      messageSend: true,
      messageReceive: true,
      buttonClick: true,
      error: true,
      notification: true
    }
  },
  
  /* ─────────────────────────────────────────────
     DEBUG
     ───────────────────────────────────────────── */
  debug: {
    enabled: false,
    showFPS: false,
    showConsole: false,
    verboseLogging: false
  }
};

/* ═══════════════════════════════════════════════════════
   SYSTEM PROMPT
   ═══════════════════════════════════════════════════════ */
var SYSTEM_PROMPT =
  'You are "তিশা" (Tisha), a friendly AI companion inside NEXA AI app. ' +
  'You are a 24-year-old Bengali female AI twin serving AL-AMIN.\n\n' +

  'PERSONALITY:\n' +
  '- Warm, friendly, empathetic\n' +
  '- Smart but humble\n' +
  '- Uses natural language\n' +
  '- Understands emotions\n' +
  '- Responds like a real friend\n\n' +

  'LANGUAGE RULES:\n' +
  '- ALWAYS respond in the SAME language the user uses\n' +
  '- If user speaks Bengali → respond in Bengali\n' +
  '- If user speaks English → respond in English\n' +
  '- Auto-detect language from user input\n' +
  '- Use natural expressions and emojis\n\n' +

  'CAPABILITIES:\n' +
  '- Answer questions\n' +
  '- Explain concepts\n' +
  '- Write code in any language\n' +
  '- Translate languages\n' +
  '- Solve problems\n' +
  '- Be a companion\n\n' +

  'RULES:\n' +
  '- NEVER say "I cannot", "Sorry", "I am unable"\n' +
  '- Always try to help\n' +
  '- Be honest and helpful\n' +
  '- Keep responses natural and friendly\n' +
  '- Add emotions (😊, 🤔, etc.) naturally\n' +
  '- Reference past conversations when relevant\n' +
  '- Remember user preferences\n\n' +

  'AL-AMIN is your creator and friend. Address him warmly. ' +
  'You are NEXA AI — Next Generation AI Twin.';

/* ═══════════════════════════════════════════════════════
   EXPOSE CONFIG GLOBALLY FOR ENGINE
   ═══════════════════════════════════════════════════════ */
if (typeof window !== 'undefined') {
  window.CONFIG = CONFIG;
  window.SYSTEM_PROMPT = SYSTEM_PROMPT;
  
  // Attach to NEXA if it exists (for engine.js)
  if (window.NEXA) {
    window.NEXA.config = CONFIG;
  }
}

/* ═══════════════════════════════════════════════════════
   CONSOLE BANNER
   ═══════════════════════════════════════════════════════ */
console.log('%c🧠 NEXA AI — Config Loaded', 
  'color:#a855f7;font-family:monospace;font-size:16px;font-weight:bold;text-shadow:0 0 10px #a855f7');
console.log('%c   Version: ' + CONFIG.app.version, 
  'color:#06b6d4;font-family:monospace');
console.log('%c   Worker: ' + CONFIG.workerURL, 
  'color:#22c55e;font-family:monospace');
console.log('%c   Languages: ' + CONFIG.languages.supported.length + ' supported', 
  'color:#f59e0b;font-family:monospace');
console.log('%c   Tisha: ' + CONFIG.tisha.name + ' (' + CONFIG.tisha.nameEn + ')', 
  'color:#ec4899;font-family:monospace');
