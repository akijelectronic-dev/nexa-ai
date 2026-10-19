/* ═══════════════════════════════════════════════════════
   NEXA AI — Language Detection & Utility
   Author: AL-AMIN
   Part 25/30
   ═══════════════════════════════════════════════════════ */

'use strict';

NEXA.register('language', {
  
  currentLanguage: 'bn', // Default to Bengali
  
  init: function() {
    console.log('%c🌐 Language System: Initializing...', 'color:#06b6d4;font-family:monospace;');
    console.log('%c✅ Language ready', 'color:#22c55e;font-family:monospace;');
  },
  
  /* ═══════════════════════════════════════════════
     AUTO DETECT LANGUAGE
     ═══════════════════════════════════════════════ */
  detect: function(text) {
    if (!text || text.trim() === '') return this.currentLanguage;
    
    // Unicode ranges for major languages
    var ranges = {
      bn: /[\u0980-\u09FF]/, // Bengali
      hi: /[\u0900-\u097F]/, // Hindi
      ar: /[\u0600-\u06FF]/, // Arabic
      zh: /[\u4E00-\u9FFF]/, // Chinese
      ja: /[\u3040-\u309F\u30A0-\u30FF]/, // Japanese
      ko: /[\uAC00-\uD7AF]/, // Korean
      ru: /[\u0400-\u04FF]/, // Russian
      th: /[\u0E00-\u0E7F]/  // Thai
    };
    
    // Check for specific language scripts
    for (var lang in ranges) {
      if (ranges[lang].test(text)) {
        this.currentLanguage = lang;
        return lang;
      }
    }
    
    // Default to English if no specific script found (assuming Latin alphabet)
    this.currentLanguage = 'en';
    return 'en';
  },
  
  /* ═══════════════════════════════════════════════
     GET LANGUAGE NAME
     ═══════════════════════════════════════════════ */
  getName: function(code) {
    var lang = NEXA.config.languages.supported.find(l => l.code === code);
    return lang ? lang.name : 'Unknown';
  },
  
  /* ═══════════════════════════════════════════════
     TTS LANGUAGE HELPER
     ═══════════════════════════════════════════════ */
  getVoiceLang: function() {
    // Map our codes to SpeechSynthesis lang codes
    var map = {
      bn: 'bn-BD',
      en: 'en-US',
      hi: 'hi-IN',
      ar: 'ar-SA',
      zh: 'zh-CN',
      ja: 'ja-JP',
      ko: 'ko-KR',
      fr: 'fr-FR',
      de: 'de-DE',
      es: 'es-ES',
      ru: 'ru-RU'
    };
    return map[this.currentLanguage] || 'en-US';
  }
});

console.log('%c🌐 Language Module Loaded', 'color:#06b6d4;font-family:monospace;font-size:14px;font-weight:bold;');
