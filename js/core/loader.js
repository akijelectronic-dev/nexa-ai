/* ═══════════════════════════════════════════════════════
   NEXA AI — Smart Loader & Debugger
   Author: AL-AMIN
   Part 5/30
   ═══════════════════════════════════════════════════════ */

'use strict';

NEXA.register('loader', {
  
  init: function() {
    console.log('%c📦 Loader: Checking module status...', 'color:#f59e0b;font-family:monospace;');
    
    // Define all expected modules based on our 30-part plan
    var expectedModules = [
      // Core
      'config', 'engine', 'loader', 'storage', 
      'version', 'updater', 'boot',
      
      // Tisha
      'tisha_face', 'tisha_body', 'tisha_animations', 'tisha_emotions',
      
      // AI
      'groq', 'openrouter', 'pollinations', 'gemini', 'streaming', 'router',
      
      // Modules
      'chat', 'vision', 'voice', 'documents', 'memory', 
      'agents', 'tools', 'imagegen', 'ai-suggestions',
      
      // UI
      'main-ui', 'chat-ui', 'voice-ui', 'settings', 'notifications', 'update-ui',
      
      // Admin
      'auth', 'dev-panel', 'admin-panel',
      
      // Utils
      'helpers', 'language', 'analytics'
    ];
    
    var loaded = [];
    var missing = [];
    
    // Check which modules are loaded
    expectedModules.forEach(function(name) {
      // We map the names to what they might register as
      // Some modules might not register exactly with the file name
      if (NEXA.has(name) || NEXA.has(name.replace('tisha_', ''))) {
        loaded.push(name);
      } else {
        missing.push(name);
      }
    });
    
    // Log summary
    console.log(`%c✅ Modules Loaded: ${loaded.length}/${expectedModules.length}`, 'color:#22c55e;font-family:monospace;font-weight:bold;');
    
    if (missing.length > 0) {
      console.log(`%c⚠️ Waiting for Parts: ${missing.join(', ')}`, 'color:#f59e0b;font-family:monospace;');
    } else {
      console.log('%c🎉 All modules are loaded! System is 100% complete.', 'color:#a855f7;font-family:monospace;font-size:14px;font-weight:bold;');
    }
    
    // Set up update check if version module exists
    setTimeout(function() {
      if (NEXA.has('version') && NEXA.config.updates.autoCheck) {
        NEXA.get('version').checkForUpdates();
      }
    }, 3000);
  },
  
  // Utility method to dynamically load a script if it's missing
  // (Optional, for future advanced use)
  loadScript: function(src) {
    return new Promise(function(resolve, reject) {
      var script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
});

console.log('%c📦 NEXA Loader Loaded', 'color:#f59e0b;font-family:monospace;font-size:14px;font-weight:bold;');
