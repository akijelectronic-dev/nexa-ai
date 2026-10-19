/* ═══════════════════════════════════════════════════════
   NEXA AI — Main UI Controller (Complete & Fixed)
   Author: AL-AMIN
   Part 15/30 (Updated)
   ═══════════════════════════════════════════════════════ */

'use strict';

NEXA.register('main-ui', {
  
  currentScreen: 'home',
  
  init: function() {
    console.log('%c🖥️ Main UI: Initializing...', 'color:#8b5cf6;font-family:monospace;');
    
    // Hide splash screen if it exists
    var splash = document.getElementById('splash');
    if (splash) {
      splash.classList.add('hide');
      setTimeout(() => {
        splash.style.display = 'none';
      }, 800);
    }
    
    // Setup initial screen
    this.goHome();
    
    // Setup modals for outside click
    this.setupModals();
    
    // Setup sidebar overlay click
    this.setupSidebar();
    
    console.log('%c✅ Main UI ready', 'color:#22c55e;font-family:monospace;');
  },
  
  /* ═══════════════════════════════════════════════
     SCREEN NAVIGATION
     ═══════════════════════════════════════════════ */
  switchScreen: function(screenId) {
    // Hide all screens
    var screens = document.querySelectorAll('.screen');
    screens.forEach(function(screen) {
      screen.classList.remove('active');
    });
    
    // Show target screen
    var target = document.getElementById(screenId + 'Screen');
    if (target) {
      target.classList.add('active');
      this.currentScreen = screenId;
    }
    
    // Update bottom nav highlighting
    this.updateNav(screenId);
    
    // Close sidebar if open
    this.closeSidebar();
    
    // Auto-scroll to top
    window.scrollTo(0, 0);
  },
  
  goHome: function() { this.switchScreen('home'); },
  goChat: function() { this.switchScreen('chat'); },
  goVision: function() { this.switchScreen('vision'); },
  goVoice: function() { this.switchScreen('voice'); },
  goDocs: function() { this.switchScreen('docs'); },
  goImageGen: function() { this.switchScreen('imagegen'); },
  goTisha: function() { this.switchScreen('tisha'); },
  
  updateNav: function(screenId) {
    var navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(function(btn, index) {
      btn.classList.remove('active');
      // Simple logic for bottom nav highlighting
      if (screenId === 'home' && index === 0) btn.classList.add('active');
      else if (screenId === 'chat' && index === 1) btn.classList.add('active');
      else if (screenId === 'voice' && index === 2) btn.classList.add('active');
      else if (screenId === 'vision' && index === 3) btn.classList.add('active');
      else if (screenId === 'stats' && index === 4) btn.classList.add('active'); 
    });
  },
  
  /* ═══════════════════════════════════════════════
     SIDEBAR
     ═══════════════════════════════════════════════ */
  toggleSidebar: function() {
    var sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.toggle('open');
  },
  
  closeSidebar: function() {
    var sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.remove('open');
  },
  
  setupSidebar: function() {
    // Close sidebar when clicking outside (on mobile)
    document.addEventListener('click', (e) => {
      var sidebar = document.getElementById('sidebar');
      var menuBtn = document.getElementById('menuBtn');
      
      if (sidebar && sidebar.classList.contains('open')) {
        if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
          this.closeSidebar();
        }
      }
    });
  },
  
  /* ═══════════════════════════════════════════════
     MODALS (Settings, Profile, Update)
     ═══════════════════════════════════════════════ */
  toggleSettings: function() {
    var modal = document.getElementById('settingsModal');
    if (modal) modal.classList.toggle('show');
  },
  
  closeSettings: function(e) {
    if (e && e.target !== e.currentTarget && !e.target.closest('.modal-header button')) return;
    var modal = document.getElementById('settingsModal');
    if (modal) modal.classList.remove('show');
  },
  
  toggleProfile: function() {
    var modal = document.getElementById('profileModal');
    if (modal) modal.classList.toggle('show');
  },
  
  closeProfile: function(e) {
    if (e && e.target !== e.currentTarget && !e.target.closest('.modal-header button')) return;
    var modal = document.getElementById('profileModal');
    if (modal) modal.classList.remove('show');
  },
  
  closeUpdate: function() {
    var modal = document.getElementById('updateModal');
    if (modal) modal.classList.remove('show');
  },
  
  setupModals: function() {
    var overlays = document.querySelectorAll('.modal-overlay');
    overlays.forEach(function(overlay) {
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
          overlay.classList.remove('show');
        }
      });
    });
  },
  
  /* ═══════════════════════════════════════════════
     SETTINGS TABS
     ═══════════════════════════════════════════════ */
  switchTab: function(tabName) {
    // Update tab buttons
    var tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(function(btn) {
      btn.classList.remove('active');
      if (btn.textContent.toLowerCase().includes(tabName)) {
        btn.classList.add('active');
      }
    });
    
    // Update tab panels
    var panels = document.querySelectorAll('.tab-panel');
    panels.forEach(function(panel) {
      panel.classList.remove('active');
      if (panel.getAttribute('data-tab') === tabName) {
        panel.classList.add('active');
      }
    });
  },
  
  /* ═══════════════════════════════════════════════
     THEME
     ═══════════════════════════════════════════════ */
  setTheme: function(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    if (NEXA.has('settings')) {
      NEXA.get('settings').setTheme(themeName);
    }
  },
  
  /* ═══════════════════════════════════════════════
     UTILITIES
     ═══════════════════════════════════════════════ */
  autoGrow: function(element) {
    element.style.height = 'auto';
    element.style.height = (element.scrollHeight) + 'px';
    if (element.scrollHeight > 120) {
      element.style.height = '120px';
      element.style.overflowY = 'auto';
    } else {
      element.style.overflowY = 'hidden';
    }
  },
  
  toggleStats: function() {
    this.showToast('📊 Stats coming soon!');
  },
  
  showToast: function(message, type = 'info') {
    // Redirect to notifications module if available
    if (NEXA.has('notifications')) {
      NEXA.get('notifications').show(message, type);
      return;
    }
    
    // Fallback
    var toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
});

console.log('%c🖥️ Main UI Loaded (Fixed)', 'color:#8b5cf6;font-family:monospace;font-size:14px;font-weight:bold;');
