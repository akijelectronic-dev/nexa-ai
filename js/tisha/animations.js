/* ═══════════════════════════════════════════════════════
   NEXA AI — Tisha Animations
   Author: AL-AMIN
   Part 9/30
   ═══════════════════════════════════════════════════════ */

'use strict';

NEXA.register('animations', {
  
  // Animation state
  state: {
    breathOffset: 0,
    blinkTimer: 0,
    isBlinking: false,
    hairSwayOffset: 0,
    headTilt: 0,
    time: 0
  },
  
  init: function() {
    console.log('%c🌬️ Tisha Animations: Initializing...', 'color:#06b6d4;font-family:monospace;');
    
    // Start blinking loop
    this.resetBlinkTimer();
    
    console.log('%c✅ Animations ready', 'color:#22c55e;font-family:monospace;');
  },
  
  update: function(dt) {
    // Accumulate time
    this.state.time += dt;
    
    var t = this.state.time;
    
    // 1. Breathing (chest movement)
    this.state.breathOffset = Math.sin(t * 1.5) * 2;
    
    // 2. Hair Swaying (gentle movement)
    this.state.hairSwayOffset = Math.sin(t * 0.8) * 3;
    
    // 3. Head Tilt (subtle idle movement)
    this.state.headTilt = Math.sin(t * 0.3) * 0.03;
    
    // 4. Blinking logic
    if (this.state.isBlinking) {
      this.state.blinkTimer -= dt;
      if (this.state.blinkTimer <= 0) {
        this.state.isBlinking = false;
        this.resetBlinkTimer();
      }
    } else {
      this.state.blinkTimer -= dt;
      if (this.state.blinkTimer <= 0) {
        this.state.isBlinking = true;
        this.state.blinkTimer = 0.15; // Blink duration
      }
    }
    
    // Update face module with current animation state
    if (NEXA.has('face')) {
      var face = NEXA.get('face');
      if (face.state) {
        face.state.isBlinking = this.state.isBlinking;
        face.state.headTilt = this.state.headTilt;
      }
    }
    
    // Update body module with current animation state
    if (NEXA.has('body')) {
      var body = NEXA.get('body');
      if (body.state) {
        body.state.breathY = this.state.breathOffset;
        body.state.hairSway = this.state.hairSwayOffset;
      }
    }
  },
  
  resetBlinkTimer: function() {
    // Blink every 2 to 6 seconds
    this.state.blinkTimer = NEXA.utils.random(2, 6);
  }
});

console.log('%c🌬️ Tisha Animations Loaded', 'color:#06b6d4;font-family:monospace;font-size:14px;font-weight:bold;');
