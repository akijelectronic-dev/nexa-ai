/* ═══════════════════════════════════════════════════════
   NEXA AI — Storage System
   Author: AL-AMIN
   Part 6/30
   ═══════════════════════════════════════════════════════ */

'use strict';

NEXA.register('storage', {
  
  // Storage keys
  KEYS: {
    CHAT: 'nexa_chat_history',
    SETTINGS: 'nexa_settings',
    MEMORY: 'nexa_memory',
    USER: 'nexa_user_profile',
    TISHA: 'nexa_tisha_appearance',
    ANALYTICS: 'nexa_analytics'
  },
  
  init: function() {
    console.log('%c💾 Storage: Initializing...', 'color:#06b6d4;font-family:monospace;');
    
    // Check if localStorage is available
    if (!this.isAvailable()) {
      console.error('❌ LocalStorage is not available');
      return;
    }
    
    // Initialize default settings if not exists
    this.initDefaults();
    
    console.log('%c✅ Storage ready', 'color:#22c55e;font-family:monospace;');
  },
  
  /* ═══════════════════════════════════════════════
     BASIC METHODS
     ═══════════════════════════════════════════════ */
  isAvailable: function() {
    try {
      var test = '__nexa_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch(e) {
      return false;
    }
  },
  
  set: function(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch(e) {
      console.error('Storage Set Error:', e);
      return false;
    }
  },
  
  get: function(key, defaultValue) {
    try {
      var item = localStorage.getItem(key);
      if (item === null) return defaultValue !== undefined ? defaultValue : null;
      return JSON.parse(item);
    } catch(e) {
      console.error('Storage Get Error:', e);
      return defaultValue !== undefined ? defaultValue : null;
    }
  },
  
  remove: function(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch(e) {
      return false;
    }
  },
  
  clearAll: function() {
    try {
      localStorage.clear();
      console.log('🗑️ All storage cleared');
      return true;
    } catch(e) {
      return false;
    }
  },
  
  /* ═══════════════════════════════════════════════
     INIT DEFAULTS
     ═══════════════════════════════════════════════ */
  initDefaults: function() {
    // Default settings
    if (!this.get(this.KEYS.SETTINGS)) {
      this.set(this.KEYS.SETTINGS, {
        theme: 'dark',
        animations: 'full',
        language: 'auto',
        aiModel: 'auto'
      });
    }
    
    // Default Tisha appearance
    if (!this.get(this.KEYS.TISHA)) {
      this.set(this.KEYS.TISHA, NEXA.config.tisha.appearance);
    }
  },
  
  /* ═══════════════════════════════════════════════
     CHAT HISTORY
     ═══════════════════════════════════════════════ */
  saveChat: function(messages) {
    // Keep only the last N messages (from config)
    var max = NEXA.config.storage.maxMessages || 100;
    var toSave = messages.slice(-max);
    return this.set(this.KEYS.CHAT, toSave);
  },
  
  getChat: function() {
    return this.get(this.KEYS.CHAT, []);
  },
  
  clearChat: function() {
    return this.remove(this.KEYS.CHAT);
  },
  
  /* ═══════════════════════════════════════════════
     SETTINGS
     ═══════════════════════════════════════════════ */
  saveSettings: function(settings) {
    return this.set(this.KEYS.SETTINGS, settings);
  },
  
  getSettings: function() {
    return this.get(this.KEYS.SETTINGS, {});
  },
  
  /* ═══════════════════════════════════════════════
     TISHA APPEARANCE
     ═══════════════════════════════════════════════ */
  saveTisha: function(appearance) {
    return this.set(this.KEYS.TISHA, appearance);
  },
  
  getTisha: function() {
    return this.get(this.KEYS.TISHA, NEXA.config.tisha.appearance);
  }
});

console.log('%c💾 NEXA Storage Loaded', 'color:#06b6d4;font-family:monospace;font-size:14px;font-weight:bold;');
