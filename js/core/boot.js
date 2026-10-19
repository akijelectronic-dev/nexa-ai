/* ═══════════════════════════════════════════════════════
   NEXA AI — Final Boot Sequence
   Author: AL-AMIN
   Part 28/30
   ═══════════════════════════════════════════════════════ */

'use strict';

(function() {
  
  console.log('%c🚀 NEXA AI — Igniting Engine...', 'color:#a855f7;font-family:monospace;font-size:18px;font-weight:bold;text-shadow:0 0 10px #a855f7;');
  
  // Wait for DOM and all scripts to load
  window.addEventListener('load', function() {
    
    // Give scripts a moment to register
    setTimeout(function() {
      
      if (typeof NEXA === 'undefined' || typeof NEXA.boot !== 'function') {
        console.error('❌ FATAL: NEXA Engine not found! Check script loading order.');
        return;
      }
      
      // Start the engine
      console.log('%c[SYSTEM] Starting core modules...', 'color:#06b6d4;font-family:monospace;');
      NEXA.boot();
      
      // Remove loading overlay if it exists
      var loader = document.getElementById('loadingOverlay');
      if (loader) loader.classList.remove('show');
      
      // Trigger welcome toast
      setTimeout(function() {
        if (NEXA.has('notifications')) {
          NEXA.get('notifications').show('🌍 Welcome to NEXA AI, AL-AMIN!', 'success');
        }
      }, 1000);
      
    }, 300); // 300ms delay for script parsing
    
  });
  
})();
