/* ═══════════════════════════════════════════════════════
   NEXA AI — Core Engine (Completed)
   Author: AL-AMIN
   Part 4/30 (Updated)
   ═══════════════════════════════════════════════════════ */

'use strict';

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
    if (!name || typeof name !== 'string') return;
    if (this.modules[name]) return;
    
    this.modules[name] = module;
    module.__name = name;
    
    if (typeof module.init === 'function') this.initQueue.push(module);
    if (typeof module.update === 'function') this.updateQueue.push(module);
    if (typeof module.render === 'function') this.renderQueue.push(module);
    
    console.log(`%c✅ Module registered: ${name}`, 'color:#22c55e; font-family:monospace;');
  },
  
  get: function(name) { return this.modules[name] || null; },
  has: function(name) { return !!this.modules[name]; },
  count: function() { return Object.keys(this.modules).length; },
  
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
    this.events[event].forEach(function(cb) {
      try { cb(data); } catch (e) { console.error('Event error:', event, e); }
    });
    return this;
  },
  
  /* ═══════════════════════════════════════════════
     BOOT SEQUENCE
     ═══════════════════════════════════════════════ */
  boot: function() {
    console.log('%c🚀 Booting NEXA AI...', 'color:#a855f7;font-family:monospace;font-size:14px;font-weight:bold');
    
    var success = 0;
    var failed = 0;
    
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
    
    this.startLoop();
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
          if (!self.updateQueue[i].__errorLogged) {
            console.error(`Update error: ${self.updateQueue[i].__name}`, e);
            self.updateQueue[i].__errorLogged = true;
          }
        }
      }
      
      // ═══ RENDER MODULES ═══
      var tishaCanvas = document.getElementById('tishaCanvas');
      
      if (tishaCanvas) {
        var ctx = tishaCanvas.getContext('2d');
        
        // Clear canvas once per frame (fixes flickering/overlap)
        var dpr = window.devicePixelRatio || 1;
        var cw = tishaCanvas.width / dpr;
        var ch = tishaCanvas.height / dpr;
        ctx.clearRect(0, 0, cw, ch);
        
        // Order matters: Body first, then Face
        for (var j = 0; j < self.renderQueue.length; j++) {
          if (self.renderQueue[j].__name === 'body') {
            try { self.renderQueue[j].render(ctx, dt); } catch(e){}
          }
        }
        
        for (var k = 0; k < self.renderQueue.length; k++) {
          if (self.renderQueue[k].__name !== 'body') {
            try { self.renderQueue[k].render(ctx, dt); } catch(e){}
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
    random: function(min, max) { return Math.random() * (max - min) + min; },
    randomInt: function(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; },
    clamp: function(val, min, max) { return Math.max(min, Math.min(max, val)); },
    formatDate: function(date) {
      return new Date(date).toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit' });
    },
    generateId: function() { return 'id_' + Date.now() + '_' + Math.floor(Math.random() * 1000); }
  }
};

console.log('%c⚙️ NEXA Core Engine Loaded (Fixed)', 'color:#06b6d4;font-family:monospace;font-size:14px;font-weight:bold;');
