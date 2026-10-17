/* ═══════════════════════════════════════════════════════
   NEXA AI — Core Engine
   Author: AL-AMIN
   Part 4/30
   ═══════════════════════════════════════════════════════ */

'use strict';

/* ═══════════════════════════════════════════════════════
   MAIN NEXA OBJECT
   ═══════════════════════════════════════════════════════ */
window.NEXA = {
  
  version: '1.0.0',
  name: 'NEXA AI',
  author: 'AL-AMIN',
  
  // Module Registry
  modules: {},
  initQueue: [],
  updateQueue: [],
  renderQueue: [],
  
  // Global State
  state: {
    booted: false,
    activeScreen: 'home',
    fps: 60,
    frame: 0,
    isThinking: false
  },
  
  // Event System
  events: {},
  
  // Config reference
  config: (typeof CONFIG !== 'undefined') ? CONFIG : {},
  
  /* ═══════════════════════════════════════════════
     MODULE REGISTRATION
     ═══════════════════════════════════════════════ */
  register: function(name, module) {
    if (!name || typeof name !== 'string') {
      console.error('❌ NEXA.register: Invalid module name');
      return;
    }
    
    if (this.modules[name]) {
      console.warn('⚠️ Module already registered:', name);
      return;
    }
    
    this.modules[name] = module;
    module.__name = name;
    
    // Auto-add to queues
    if (typeof module.init === 'function') {
      this.initQueue.push(module);
    }
    if (typeof module.update === 'function') {
      this.updateQueue.push(module);
    }
    if (typeof module.render === 'function') {
      this.renderQueue.push(module);
    }
    
    console.log(`%c✅ Module registered: ${name}`, 'color:#22c55e; font-family:monospace;');
  },
  
  get: function(name) {
    return this.modules[name] || null;
  },
  
  has: function(name) {
    return !!this.modules[name];
  },
  
  count: function() {
    return Object.keys(this.modules).length;
  },
  
  /* ═══════════════════════════════════════════════
     EVENT SYSTEM
     ═══════════════════════════════════════════════ */
  on: function(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
    return this;
  },
  
  emit: function(event, data) {
    if (!this.events[event]) return this;
    this.events[event].forEach(function(callback) {
      try {
        callback(data);
      } catch (e) {
        console.error('Event error:', event, e);
      }
    });
    return this;
  },
  
  /* ═══════════════════════════════════════════════
     BOOT SEQUENCE
     ═══════════════════════════════════════════════ */
  boot: function() {
    console.log('%c🚀 Booting NEXA AI...', 'color:#a855f7;font-family:monospace;font-size:14px;font-weight:bold');
    console.log(`%c   Total modules: ${this.initQueue.length}`, 'color:#06b6d4;font-family:monospace');
    
    var success = 0;
    var failed = 0;
    
    // Run all init functions
    for (var i = 0; i < this.initQueue.length; i++) {
      var mod = this.initQueue[i];
      try {
        if (typeof mod.init === 'function') {
          mod.init();
          success++;
        }
      } catch (e) {
        console.error(`❌ Init failed: ${mod.__name}`, e);
        failed++;
      }
    }
    
    this.state.booted = true;
    
    console.log(`%c✅ Boot complete: ${success} success, ${failed} failed`, 'color:#22c55e;font-family:monospace;font-weight:bold');
    
    // Start Game Loop
    this.startLoop();
    
    // Emit ready event
    this.emit('nexa:ready');
  },
  
  /* ═══════════════════════════════════════════════
     GAME LOOP
     ═══════════════════════════════════════════════ */
  startLoop: function() {
    var self = this;
    var lastTime = performance.now();
    var fpsCounter = 0;
    var fpsTimer = 0;
    
    function loop(time) {
      var dt = (time - lastTime) / 1000;
      lastTime = time;
      
      // Clamp dt
      if (dt > 0.1) dt = 0.1;
      
      self.state.frame++;
      
      // FPS Counter
      fpsCounter++;
      fpsTimer += dt;
      if (fpsTimer >= 1) {
        self.state.fps = Math.round(fpsCounter / fpsTimer);
        fpsCounter = 0;
        fpsTimer = 0;
      }
      
      // ═══ UPDATE MODULES ═══
      for (var i = 0; i < self.updateQueue.length; i++) {
        try {
          self.updateQueue[i].update(dt);
        } catch (e) {
          // Log once to prevent spam
          if (!self.updateQueue[i].__errorLogged) {
            console.error(`Update error: ${self.updateQueue[i].__name}`, e);
            self.updateQueue[i].__errorLogged = true;
          }
        }
      }
      
      // ═══ RENDER MODULES ═══
      // Only render if canvas exists
      var tishaCanvas = document.getElementById('tishaCanvas');
      var ctx = tishaCanvas ? tishaCanvas.getContext('2d') : null;
      
      if (ctx) {
        for (var j = 0; j < self.renderQueue.length; j++) {
          try {
            self.renderQueue[j].render(ctx, dt);
          } catch (e) {
            if (!self.renderQueue[j].__errorLogged) {
              console.error(`Render error: ${self.renderQueue[j].__name}`, e);
              self.renderQueue[j].__errorLogged = true;
            }
          }
        }
      }
      
      requestAnimationFrame(loop);
    }
    
    requestAnimationFrame(loop);
    console.log('%c🔄 Game loop started', 'color:#22c55e;font-family:monospace;');
  },
  
  /* ═══════════════════════════════════════════════
     UTILITIES
     ═══════════════════════════════════════════════ */
  utils: {
    random: function(min, max) {
      return Math.random() * (max - min) + min;
    },
    randomInt: function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    clamp: function(val, min, max) {
      return Math.max(min, Math.min(max, val));
    },
    formatDate: function(date) {
      var d = new Date(date);
      return d.toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit' });
    },
    generateId: function() {
      return 'id_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
    }
  }
};

console.log('%c⚙️ NEXA Core Engine Loaded', 'color:#06b6d4;font-family:monospace;font-size:14px;font-weight:bold;');
