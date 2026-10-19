/* ═══════════════════════════════════════════════════════
   NEXA AI — Helper Utilities
   Author: AL-AMIN
   Part 24/30
   ═══════════════════════════════════════════════════════ */

'use strict';

NEXA.register('helpers', {
  
  init: function() {
    console.log('%c🛠️ Helpers: Initializing...', 'color:#06b6d4;font-family:monospace;');
    console.log('%c✅ Helpers ready', 'color:#22c55e;font-family:monospace;');
  },
  
  /* ═══════════════════════════════════════════════
     TIME & DATE
     ═══════════════════════════════════════════════ */
  formatTime: function(date) {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  },
  
  formatDate: function(date) {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  },
  
  timeAgo: function(date) {
    var seconds = Math.floor((new Date() - new Date(date)) / 1000);
    var interval = seconds / 31536000;
    
    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";
    return Math.floor(seconds) + "s ago";
  },
  
  /* ═══════════════════════════════════════════════
     STRING MANIPULATION
     ═══════════════════════════════════════════════ */
  truncate: function(str, length = 30) {
    if (!str) return '';
    if (str.length <= length) return str;
    return str.substring(0, length) + '...';
  },
  
  capitalize: function(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  
  escapeHtml: function(text) {
    var map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
  },
  
  /* ═══════════════════════════════════════════════
     CLIPBOARD
     ═══════════════════════════════════════════════ */
  copyToClipboard: function(text) {
    if (!navigator.clipboard) {
      // Fallback
      var textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        if (NEXA.has('notifications')) NEXA.get('notifications').success('Copied!');
      } catch (err) {
        if (NEXA.has('notifications')) NEXA.get('notifications').error('Copy failed');
      }
      document.body.removeChild(textArea);
      return;
    }
    
    navigator.clipboard.writeText(text).then(function() {
      if (NEXA.has('notifications')) NEXA.get('notifications').success('Copied to clipboard!');
    }).catch(function() {
      if (NEXA.has('notifications')) NEXA.get('notifications').error('Copy failed');
    });
  },
  
  /* ═══════════════════════════════════════════════
     GENERATORS
     ═══════════════════════════════════════════════ */
  generateId: function(prefix = 'id') {
    return prefix + '_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
  },
  
  random: function(min, max) {
    return Math.random() * (max - min) + min;
  },
  
  randomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  
  randomColor: function() {
    var colors = ['#a855f7', '#06b6d4', '#ec4899', '#22c55e', '#f59e0b'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
});

console.log('%c🛠️ Helpers Module Loaded', 'color:#06b6d4;font-family:monospace;font-size:14px;font-weight:bold;');
