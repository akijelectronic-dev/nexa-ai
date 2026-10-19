/* ═══════════════════════════════════════════════════════
   NEXA AI — Notifications System
   Author: AL-AMIN
   Part 23/30
   ═══════════════════════════════════════════════════════ */

'use strict';

NEXA.register('notifications', {
  
  timeout: null,
  
  init: function() {
    console.log('%c🔔 Notifications: Initializing...', 'color:#f59e0b;font-family:monospace;');
    console.log('%c✅ Notifications ready', 'color:#22c55e;font-family:monospace;');
  },
  
  /* ═══════════════════════════════════════════════
     SHOW TOAST
     ═══════════════════════════════════════════════ */
  show: function(message, type = 'info') {
    var toast = document.getElementById('toast');
    if (!toast) return;
    
    // Clear existing timeout
    clearTimeout(this.timeout);
    
    // Set content and class
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    
    // Auto hide after 3 seconds
    this.timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  },
  
  /* ═══════════════════════════════════════════════
     SHORTCUTS
     ═══════════════════════════════════════════════ */
  success: function(message) {
    this.show(message, 'success');
  },
  
  error: function(message) {
    this.show(message, 'error');
  },
  
  info: function(message) {
    this.show(message, 'info');
  }
});

console.log('%c🔔 Notifications Module Loaded', 'color:#f59e0b;font-family:monospace;font-size:14px;font-weight:bold;');
