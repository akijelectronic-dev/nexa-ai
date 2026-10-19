/* ═══════════════════════════════════════════════════════
   NEXA AI — Memory Module
   Author: AL-AMIN
   Part 21/30
   ═══════════════════════════════════════════════════════ */

'use strict';

NEXA.register('memory', {
  
  facts: {}, // Key-value store for user facts (e.g., {name: "AL-AMIN", favorite_color: "blue"})
  
  init: function() {
    console.log('%c🧠 Memory System: Initializing...', 'color:#8b5cf6;font-family:monospace;');
    
    // Load from storage
    if (NEXA.has('storage')) {
      var saved = NEXA.get('storage').get('nexa_memory');
      if (saved) this.facts = saved;
    }
    
    console.log('%c✅ Memory ready', 'color:#22c55e;font-family:monospace;');
  },
  
  /* ═══════════════════════════════════════════════
     SAVE & GET
     ═══════════════════════════════════════════════ */
  remember: function(key, value) {
    this.facts[key] = value;
    this.save();
    console.log(`%c🧠 Remembered: ${key} = ${value}`, 'color:#8b5cf6;font-family:monospace;');
  },
  
  recall: function(key) {
    return this.facts[key] || null;
  },
  
  forget: function(key) {
    delete this.facts[key];
    this.save();
  },
  
  save: function() {
    if (NEXA.has('storage')) {
      NEXA.get('storage').set('nexa_memory', this.facts);
    }
  },
  
  /* ═══════════════════════════════════════════════
     AUTO-EXTRACT MEMORY (From Chat)
     ═══════════════════════════════════════════════ */
  extractFromMessage: function(text) {
    var lower = text.toLowerCase();
    
    // Simple Regex to extract name
    var nameMatch = text.match(/(?:my name is|আমার নাম)\s+([A-Za-z\u0980-\u09FF]+)/i);
    if (nameMatch && nameMatch[1]) {
      this.remember('user_name', nameMatch[1]);
    }
    
    // Extract favorite things
    var favMatch = text.match(/(?:my favorite|আমার প্রিয়)\s+([A-Za-z\u0980-\u09FF]+)\s+(?:is|হলো)\s+([A-Za-z\u0980-\u09FF]+)/i);
    if (favMatch && favMatch[1] && favMatch[2]) {
      this.remember(`favorite_${favMatch[1]}`, favMatch[2]);
    }
    
    // Extract age
    var ageMatch = text.match(/(?:I am|আমার বয়স)\s+(\d+)/i);
    if (ageMatch && ageMatch[1]) {
      this.remember('user_age', ageMatch[1]);
    }
  },
  
  /* ═══════════════════════════════════════════════
     GET CONTEXT FOR AI
     ═══════════════════════════════════════════════ */
  getContext: function() {
    if (Object.keys(this.facts).length === 0) return '';
    
    var context = 'User Facts (Remember these):\n';
    for (var key in this.facts) {
      context += `- ${key.replace(/_/g, ' ')}: ${this.facts[key]}\n`;
    }
    return context;
  }
});

console.log('%c🧠 Memory Module Loaded', 'color:#8b5cf6;font-family:monospace;font-size:14px;font-weight:bold;');
