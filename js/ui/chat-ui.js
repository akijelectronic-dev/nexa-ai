/* ═══════════════════════════════════════════════════════
   NEXA AI — Chat UI Enhancements
   Author: AL-AMIN
   Part 16/30
   ═══════════════════════════════════════════════════════ */

'use strict';

NEXA.register('chat-ui', {
  
  init: function() {
    console.log('%c💬 Chat UI: Initializing...', 'color:#06b6d4;font-family:monospace;');
    
    // Setup event listeners for chat inputs
    this.setupInputs();
    
    // Setup enter key behavior
    this.setupKeyboard();
    
    // Auto scroll to bottom on load
    if (NEXA.has('chat')) {
      NEXA.get('chat').scrollToBottom();
    }
    
    console.log('%c✅ Chat UI ready', 'color:#22c55e;font-family:monospace;');
  },
  
  /* ═══════════════════════════════════════════════
     INPUT HANDLING
     ═══════════════════════════════════════════════ */
  setupInputs: function() {
    var inputs = ['chatInput', 'homeInput'];
    
    inputs.forEach(id => {
      var input = document.getElementById(id);
      if (!input) return;
      
      // Auto-grow textarea
      input.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
        if (this.scrollHeight > 120) {
          this.style.height = '120px';
          this.style.overflowY = 'auto';
        } else {
          this.style.overflowY = 'hidden';
        }
      });
      
      // Focus events
      input.addEventListener('focus', function() {
        var container = this.closest('.glass-input-container');
        if (container) container.style.borderColor = 'var(--glass-border-active)';
      });
      
      input.addEventListener('blur', function() {
        var container = this.closest('.glass-input-container');
        if (container) container.style.borderColor = 'var(--glass-border)';
      });
    });
  },
  
  setupKeyboard: function() {
    // Enter to send (unless Shift is held)
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        var activeElement = document.activeElement;
        
        if (activeElement && (activeElement.id === 'chatInput' || activeElement.id === 'homeInput')) {
          e.preventDefault();
          
          if (activeElement.id === 'chatInput') {
            if (NEXA.has('chat')) NEXA.get('chat').send();
          } else if (activeElement.id === 'homeInput') {
            if (NEXA.has('chat')) NEXA.get('chat').sendFromHome();
          }
        }
      }
    });
  },
  
  /* ═══════════════════════════════════════════════
     MESSAGE SCROLLING (FIXED)
     ═══════════════════════════════════════════════ */
  scrollToBottom: function() {
    var container = document.getElementById('chatMessages');
    if (container) {
      requestAnimationFrame(() => {
        container.scrollTop = container.scrollHeight;
      });
    }
  },
  
  /* ═══════════════════════════════════════════════
     COPY MESSAGE
     ═══════════════════════════════════════════════ */
  copyMessage: function(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        if (NEXA.has('main-ui')) {
          NEXA.get('main-ui').showToast('✅ Copied to clipboard!');
        }
      }).catch(() => {
        if (NEXA.has('main-ui')) {
          NEXA.get('main-ui').showToast('❌ Failed to copy', 'error');
        }
      });
    }
  },
  
  /* ═══════════════════════════════════════════════
     CLEAR CHAT
     ═══════════════════════════════════════════════ */
  clearChat: function() {
    if (NEXA.has('chat')) {
      NEXA.get('chat').clear();
    }
  }
});

console.log('%c💬 Chat UI Loaded', 'color:#06b6d4;font-family:monospace;font-size:14px;font-weight:bold;');
