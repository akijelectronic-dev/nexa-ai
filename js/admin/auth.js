/* ═══════════════════════════════════════════════════════
   NEXA AI — Admin Authentication
   Author: AL-AMIN
   Part 27/30
   ═══════════════════════════════════════════════════════ */

'use strict';

NEXA.register('auth', {
  
  // Admin Credentials (Change these to your own)
  admins: {
    'alamin': {
      role: 'super_admin',
      passwordHash: 'h_1q2w3e4r', // Simple hash for demo
      permissions: ['all']
    }
  },
  
  init: function() {
    console.log('%c🔐 Admin Auth: Initializing...', 'color:#ef4444;font-family:monospace;');
    
    // Bind keyboard shortcut for Admin (Ctrl + Shift + A)
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        this.promptLogin();
      }
    });
    
    console.log('%c✅ Auth ready', 'color:#22c55e;font-family:monospace;');
  },
  
  /* ═══════════════════════════════════════════════
     LOGIN SYSTEM
     ═══════════════════════════════════════════════ */
  promptLogin: function() {
    // Check if already logged in
    if (this.isLoggedIn()) {
      console.log('%c✅ Already logged in as Admin', 'color:#22c55e;font-family:monospace;');
      this.openAdminPanel();
      return;
    }
    
    // Simple prompt for demo (in production, use a secure modal)
    var username = prompt('🔐 Enter Admin Username:');
    if (!username) return;
    
    var password = prompt('🔑 Enter Password:');
    if (!password) return;
    
    this.login(username, password);
  },
  
  login: function(username, password) {
    var admin = this.admins[username];
    
    if (!admin) {
      alert('❌ Access Denied: User not found');
      return;
    }
    
    // Check password (using simple hash)
    if (admin.passwordHash !== this.hash(password)) {
      alert('❌ Access Denied: Incorrect password');
      return;
    }
    
    // Set session
    sessionStorage.setItem('nexa_admin_session', JSON.stringify({
      username: username,
      role: admin.role,
      loginTime: Date.now(),
      expires: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    }));
    
    alert(`✅ Welcome, ${username}!\nRole: ${admin.role}`);
    this.openAdminPanel();
  },
  
  /* ═══════════════════════════════════════════════
     SESSION MANAGEMENT
     ═══════════════════════════════════════════════ */
  isLoggedIn: function() {
    try {
      var sessionStr = sessionStorage.getItem('nexa_admin_session');
      if (!sessionStr) return false;
      
      var session = JSON.parse(sessionStr);
      if (session.expires < Date.now()) {
        sessionStorage.removeItem('nexa_admin_session');
        return false;
      }
      return true;
    } catch(e) {
      return false;
    }
  },
  
  logout: function() {
    sessionStorage.removeItem('nexa_admin_session');
    alert('Logged out successfully');
  },
  
  /* ═══════════════════════════════════════════════
     OPEN ADMIN PANEL
     ═══════════════════════════════════════════════ */
  openAdminPanel: function() {
    // In a full app, this would switch to a hidden admin screen
    // For this demo, we'll show a special toast/modal
    if (NEXA.has('notifications')) {
      NEXA.get('notifications').show('👑 Admin Panel: Login Successful', 'success');
    }
    
    console.log('%c👑 Admin Panel Opened', 'color:#ef4444;font-family:monospace;font-size:16px;font-weight:bold;');
    console.log('%c   Welcome, AL-AMIN', 'color:#f59e0b;font-family:monospace;');
    
    // Unlock features if needed
    NEXA.config.features.agents = true;
  },
  
  /* ═══════════════════════════════════════════════
     UTILITIES
     ═══════════════════════════════════════════════ */
  hash: function(str) {
    // Simple hash for demo purposes
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      var char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return 'h_' + Math.abs(hash).toString(36);
  }
});

console.log('%c🔐 Auth Module Loaded', 'color:#ef4444;font-family:monospace;font-size:14px;font-weight:bold;');
