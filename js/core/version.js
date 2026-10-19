/* ═══════════════════════════════════════════════════════
   NEXA AI — Version & Update Manager
   Author: AL-AMIN
   Part 26/30
   ═══════════════════════════════════════════════════════ */

'use strict';

NEXA.register('version', {
  
  currentVersion: '1.0.0',
  latestVersion: null,
  updateAvailable: false,
  
  init: function() {
    console.log('%c📦 Version Manager: Initializing...', 'color:#f59e0b;font-family:monospace;');
    
    // Set current version
    this.currentVersion = NEXA.config.app.version || '1.0.0';
    
    // Update UI displays
    this.updateVersionDisplay();
    
    // Check for updates if enabled
    if (NEXA.config.updates.enabled && NEXA.config.updates.autoCheck) {
      setTimeout(() => {
        this.checkForUpdates();
      }, 5000); // Check after 5 seconds of boot
    }
    
    console.log('%c✅ Version Manager ready', 'color:#22c55e;font-family:monospace;');
  },
  
  /* ═══════════════════════════════════════════════
     UPDATE UI DISPLAY
     ═══════════════════════════════════════════════ */
  updateVersionDisplay: function() {
    var displays = [
      document.getElementById('versionDisplay'),
      document.getElementById('aboutVersion')
    ];
    
    displays.forEach(el => {
      if (el) el.textContent = 'v' + this.currentVersion;
    });
  },
  
  /* ═══════════════════════════════════════════════
     CHECK FOR UPDATES
     ═══════════════════════════════════════════════ */
  checkForUpdates: async function() {
    if (!NEXA.config.updates.versionURL) return;
    
    console.log('%c🔄 Checking for updates...', 'color:#06b6d4;font-family:monospace;');
    
    try {
      // Fetch version.json from GitHub
      // Add timestamp to bypass cache
      var url = NEXA.config.updates.versionURL + '?t=' + Date.now();
      var response = await fetch(url);
      
      if (!response.ok) throw new Error('Failed to fetch version info');
      
      var data = await response.json();
      this.latestVersion = data.version;
      
      // Compare versions
      if (this.isNewer(this.latestVersion, this.currentVersion)) {
        this.updateAvailable = true;
        this.showUpdateBanner(data);
      } else {
        console.log('%c✅ App is up to date', 'color:#22c55e;font-family:monospace;');
      }
      
    } catch (error) {
      console.warn('⚠️ Update check failed:', error);
    }
  },
  
  /* ═══════════════════════════════════════════════
     COMPARE VERSIONS
     ═══════════════════════════════════════════════ */
  isNewer: function(latest, current) {
    var v1 = latest.split('.').map(Number);
    var v2 = current.split('.').map(Number);
    
    for (var i = 0; i < 3; i++) {
      if (v1[i] > v2[i]) return true;
      if (v1[i] < v2[i]) return false;
    }
    return false;
  },
  
  /* ═══════════════════════════════════════════════
     SHOW UPDATE BANNER
     ═══════════════════════════════════════════════ */
  showUpdateBanner: function(updateInfo) {
    console.log('%c🎉 Update Available!', 'color:#f59e0b;font-family:monospace;font-size:14px;font-weight:bold;');
    
    // Update modal content
    var versionEl = document.getElementById('newVersion');
    var changesEl = document.getElementById('updateChanges');
    
    if (versionEl) versionEl.textContent = updateInfo.version;
    
    if (changesEl) {
      var html = '';
      if (updateInfo.changes && Array.isArray(updateInfo.changes)) {
        updateInfo.changes.forEach(change => {
          html += `<div style="margin-bottom:8px;">
            <strong style="color:var(--purple-light)">${change.type.toUpperCase()}:</strong>
            <span style="color:var(--text-2)">${change.title}</span>
          </div>`;
        });
      } else {
        html = '<p style="color:var(--text-2)">Bug fixes and improvements.</p>';
      }
      changesEl.innerHTML = html;
    }
    
    // Show modal
    var modal = document.getElementById('updateModal');
    if (modal) modal.classList.add('show');
    
    // Also show toast
    if (NEXA.has('notifications')) {
      NEXA.get('notifications').show('🎉 New update available!', 'info');
    }
  },
  
  /* ═══════════════════════════════════════════════
     APPLY UPDATE
     ═══════════════════════════════════════════════ */
  applyUpdate: function() {
    console.log('%c🔄 Applying update...', 'color:#06b6d4;font-family:monospace;');
    
    var modal = document.getElementById('updateModal');
    if (modal) modal.classList.remove('show');
    
    if (NEXA.has('notifications')) {
      NEXA.get('notifications').show('🔄 Updating... Please wait', 'info');
    }
    
    // In a PWA, this would trigger service worker update
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(function(reg) {
        if (reg) {
          reg.update();
        }
        // Reload after 2 seconds
        setTimeout(function() {
          location.reload();
        }, 2000);
      });
    } else {
      // Fallback: just reload
      setTimeout(function() {
        location.reload();
      }, 2000);
    }
  }
});

console.log('%c📦 Version Module Loaded', 'color:#f59e0b;font-family:monospace;font-size:14px;font-weight:bold;');
