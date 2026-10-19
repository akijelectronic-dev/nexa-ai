/* ═══════════════════════════════════════════════════════
   NEXA AI — Settings Logic
   Author: AL-AMIN
   Part 22/30
   ═══════════════════════════════════════════════════════ */

'use strict';

NEXA.register('settings', {
  
  init: function() {
    console.log('%c⚙️ Settings: Initializing...', 'color:#94a3b8;font-family:monospace;');
    
    // Load settings on boot
    this.loadSettings();
    
    console.log('%c✅ Settings ready', 'color:#22c55e;font-family:monospace;');
  },
  
  /* ═══════════════════════════════════════════════
     LOAD & APPLY SETTINGS
     ═══════════════════════════════════════════════ */
  loadSettings: function() {
    var settings = {};
    if (NEXA.has('storage')) {
      settings = NEXA.get('storage').getSettings();
    }
    
    // Apply theme
    if (settings.theme) {
      document.documentElement.setAttribute('data-theme', settings.theme);
    }
    
    // Apply animations (placeholder)
    if (settings.animations === 'none') {
      document.body.style.setProperty('--animations', 'none');
    }
  },
  
  saveSettings: function(newSettings) {
    if (NEXA.has('storage')) {
      var current = NEXA.get('storage').getSettings();
      var updated = { ...current, ...newSettings };
      NEXA.get('storage').saveSettings(updated);
    }
  },
  
  /* ═══════════════════════════════════════════════
     UI HANDLERS
     ═══════════════════════════════════════════════ */
  setTheme: function(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.saveSettings({ theme: theme });
    
    // Update active chip
    var chips = document.querySelectorAll('#settingsModal [data-tab="general"] .option-chip');
    chips.forEach(chip => {
      chip.classList.remove('active');
      if (chip.textContent.toLowerCase() === theme) {
        chip.classList.add('active');
      }
    });
    
    if (NEXA.has('main-ui')) {
      NEXA.get('main-ui').showToast(`Theme changed to ${theme}`);
    }
  },
  
  setAnimation: function(level) {
    this.saveSettings({ animations: level });
    
    var chips = document.querySelectorAll('#settingsModal [data-tab="general"] .option-chip');
    chips.forEach(chip => {
      if (chip.textContent.toLowerCase() === level) {
        // Note: Logic for finding exactly the right chips needs specific IDs
        chip.classList.add('active');
      }
    });
  },
  
  /* ═══════════════════════════════════════════════
     TISHA CUSTOMIZATION
     ═══════════════════════════════════════════════ */
  changeTishaAppearance: function(key, value) {
    if (NEXA.has('storage')) {
      var appearance = NEXA.get('storage').getTisha();
      appearance[key] = value;
      NEXA.get('storage').saveTisha(appearance);
      
      // Also update config
      NEXA.config.tisha.appearance[key] = value;
      
      if (NEXA.has('main-ui')) {
        NEXA.get('main-ui').showToast(`Updated ${key}`);
      }
    }
  },
  
  changeTishaName: function(newName) {
    if (newName && newName.trim() !== '') {
      NEXA.config.tisha.name = newName.trim();
      this.saveSettings({ tishaName: newName.trim() });
      
      if (NEXA.has('main-ui')) {
        NEXA.get('main-ui').showToast(`Tisha's name is now ${newName.trim()}`);
      }
    }
  }
});

console.log('%c⚙️ Settings Module Loaded', 'color:#94a3b8;font-family:monospace;font-size:14px;font-weight:bold;');
