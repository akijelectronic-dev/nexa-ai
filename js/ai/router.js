/* ═══════════════════════════════════════════════════════
   NEXA AI — Smart Router (Task based & Fallback)
   Author: AL-AMIN
   Part 13/30
   ═══════════════════════════════════════════════════════ */

'use strict';

NEXA.register('router', {
  
  init: function() {
    console.log('%c🧠 AI Router: Initializing...', 'color:#8b5cf6;font-family:monospace;');
    console.log('%c✅ Smart routing ready', 'color:#22c55e;font-family:monospace;');
  },
  
  /* ═══════════════════════════════════════════════
     MAIN CALL FUNCTION (With Fallback)
     ═══════════════════════════════════════════════ */
  call: async function(task, messages, options = {}) {
    var routes = NEXA.config.routing[task] || NEXA.config.routing['chat'];
    
    console.log(`%c🧠 Router: Task "${task}" -> Providers [${routes.join(', ')}]`, 'color:#8b5cf6;font-family:monospace;');
    
    var lastError = null;
    
    for (var i = 0; i < routes.length; i++) {
      var providerName = routes[i];
      var provider = NEXA.get(providerName);
      
      if (!provider) {
        console.warn(`⚠️ Provider not loaded: ${providerName}`);
        continue;
      }
      
      if (provider.enabled === false) {
        console.warn(`⚠️ Provider disabled: ${providerName}`);
        continue;
      }
      
      try {
        var response = await provider.call(messages, options);
        return {
          success: true,
          provider: providerName,
          content: response
        };
      } catch (error) {
        console.warn(`%c⚠️ Provider failed: ${providerName}`, 'color:#f59e0b;font-family:monospace;', error.message);
        lastError = error;
      }
    }
    
    // If all providers failed
    console.error('%c❌ Router: All providers failed', 'color:#ef4444;font-family:monospace;');
    throw new Error(lastError ? lastError.message : 'All AI providers failed');
  },
  
  /* ═══════════════════════════════════════════════
     HELPER METHODS
     ═══════════════════════════════════════════════ */
  
  // Detect task type from user message
  detectTask: function(message) {
    var lower = message.toLowerCase();
    
    if (/(image|ছবি|photo|picture)/.test(lower)) return 'vision';
    if (/(pdf|doc|document|ফাইল)/.test(lower)) return 'documents';
    if (/(code|function|script|কোড|প্রোগ্রাম)/.test(lower)) return 'code';
    
    return 'chat'; // Default
  }
});

console.log('%c🧠 AI Router Loaded', 'color:#8b5cf6;font-family:monospace;font-size:14px;font-weight:bold;');
