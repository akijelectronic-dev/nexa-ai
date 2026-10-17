/* ═══════════════════════════════════════════════════════
   NEXA AI — Tisha Face (Realistic Character)
   Author: AL-AMIN
   Part 7/30
   ═══════════════════════════════════════════════════════ */

'use strict';

NEXA.register('face', {
  
  // Current state
  state: {
    blinkTimer: 0,
    isBlinking: false,
    lookX: 0,
    lookY: 0,
    headTilt: 0,
    baseX: 0,
    baseY: 0
  },
  
  init: function() {
    console.log('%c👩 Tisha Face: Initializing...', 'color:#ec4899;font-family:monospace;');
    
    // Setup canvas
    var canvas = document.getElementById('tishaCanvas');
    if (canvas) {
      // Set high resolution for crisp rendering
      var dpr = window.devicePixelRatio || 1;
      var rect = canvas.getBoundingClientRect();
      
      // Default size if not set by CSS
      if (rect.width === 0) {
        rect = { width: 280, height: 280 };
      }
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      var ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);
      
      this.state.baseX = rect.width / 2;
      this.state.baseY = rect.height / 2;
      
      console.log('%c✅ Face canvas ready', 'color:#22c55e;font-family:monospace;');
    }
  },
  
  update: function(dt) {
    // Blinking logic
    this.state.blinkTimer -= dt;
    if (this.state.blinkTimer <= 0) {
      this.state.isBlinking = true;
      setTimeout(() => { this.state.isBlinking = false; }, 150);
      this.state.blinkTimer = NEXA.utils.randomInt(2, 5); // Blink every 2-5 seconds
    }
    
    // Subtle head movement (idle)
    var time = Date.now() / 1000;
    this.state.lookX = Math.sin(time * 0.5) * 2;
    this.state.lookY = Math.cos(time * 0.7) * 1.5;
    this.state.headTilt = Math.sin(time * 0.3) * 0.02; // Slight rotation
  },
  
  render: function(ctx, dt) {
    if (!ctx) return;
    
    var canvas = ctx.canvas;
    var w = canvas.width / (window.devicePixelRatio || 1);
    var h = canvas.height / (window.devicePixelRatio || 1);
    
    // Clear canvas
    ctx.clearRect(0, 0, w, h);
    
    // Center point
    var cx = w / 2;
    var cy = h / 2;
    
    // Scale factor based on canvas size
    var scale = w / 280;
    
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    ctx.rotate(this.state.headTilt);
    
    // Draw face
    this.drawFace(ctx);
    
    // Draw eyes
    this.drawEyes(ctx);
    
    // Draw nose
    this.drawNose(ctx);
    
    // Draw lips
    this.drawLips(ctx);
    
    // Draw hair (front)
    this.drawHair(ctx);
    
    // Draw blush
    this.drawBlush(ctx);
    
    ctx.restore();
  },
  
  /* ═══════════════════════════════════════════════
     DRAWING FUNCTIONS
     ═══════════════════════════════════════════════ */
  
  drawFace: function(ctx) {
    var skinColor = NEXA.config.tisha.appearance.skinTone || '#d4a574';
    
    // Face base shape (Oval)
    ctx.beginPath();
    ctx.ellipse(0, 10, 75, 95, 0, 0, Math.PI * 2);
    
    // Skin gradient
    var gradient = ctx.createRadialGradient(-20, -20, 10, 0, 0, 100);
    gradient.addColorStop(0, '#f4d5b3'); // Highlight
    gradient.addColorStop(0.5, skinColor);
    gradient.addColorStop(1, '#a17c52'); // Shadow
    
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Face shadow/border
    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
    ctx.lineWidth = 2;
    ctx.stroke();
  },
  
  drawEyes: function(ctx) {
    // Eye positions
    var eyeY = -10;
    var eyeSpacing = 28;
    
    [-eyeSpacing, eyeSpacing].forEach((x) => {
      ctx.save();
      ctx.translate(x, eyeY);
      
      if (this.state.isBlinking) {
        // Draw closed eyes (arcs)
        ctx.beginPath();
        ctx.arc(0, 0, 12, 0, Math.PI);
        ctx.strokeStyle = '#1a1a1a';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else {
        // Draw open eyes
        // Eye white
        ctx.beginPath();
        ctx.ellipse(0, 0, 14, 18, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        
        // Iris
        var eyeColor = NEXA.config.tisha.appearance.eyeColor || '#6b4423';
        ctx.beginPath();
        ctx.arc(this.state.lookX, this.state.lookY, 8, 0, Math.PI * 2);
        ctx.fillStyle = eyeColor;
        ctx.fill();
        
        // Pupil
        ctx.beginPath();
        ctx.arc(this.state.lookX, this.state.lookY, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#000000';
        ctx.fill();
        
        // Eye highlight
        ctx.beginPath();
        ctx.arc(this.state.lookX - 2, this.state.lookY - 2, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        
        // Upper eyelid (shadow)
        ctx.beginPath();
        ctx.ellipse(0, -2, 14, 6, 0, Math.PI, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fill();
        
        // Eyelashes
        ctx.strokeStyle = '#1a1a1a';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(0, 0, 15, 19, 0, Math.PI * 1.1, Math.PI * 1.9);
        ctx.stroke();
      }
      
      // Eyebrow
      ctx.beginPath();
      ctx.moveTo(-15, -25);
      ctx.quadraticCurveTo(0, -32, 15, -25);
      ctx.strokeStyle = NEXA.config.tisha.appearance.hairColor || '#1a1a1a';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.stroke();
      
      ctx.restore();
    });
  },
  
  drawNose: function(ctx) {
    ctx.beginPath();
    ctx.moveTo(0, 5);
    ctx.lineTo(-6, 20);
    ctx.quadraticCurveTo(0, 25, 6, 20);
    ctx.strokeStyle = 'rgba(0,0,0,0.15)';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    
    // Nose shadow/highlight
    ctx.beginPath();
    ctx.moveTo(0, 5);
    ctx.lineTo(0, 15);
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  },
  
  drawLips: function(ctx) {
    var lipColor = '#d4858c'; // Soft pink
    
    // Lips shape
    ctx.beginPath();
    ctx.moveTo(-15, 35);
    ctx.quadraticCurveTo(0, 45, 15, 35); // Bottom lip
    ctx.quadraticCurveTo(0, 25, -15, 35); // Top lip
    ctx.fillStyle = lipColor;
    ctx.fill();
    
    // Lip line
    ctx.beginPath();
    ctx.moveTo(-15, 35);
    ctx.quadraticCurveTo(0, 38, 15, 35);
    ctx.strokeStyle = 'rgba(0,0,0,0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Highlight (gloss)
    ctx.beginPath();
    ctx.ellipse(0, 42, 4, 2, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.fill();
  },
  
  drawHair: function(ctx) {
    var hairColor = NEXA.config.tisha.appearance.hairColor || '#1a1a1a';
    
    // Back hair
    ctx.beginPath();
    ctx.ellipse(0, 10, 85, 105, 0, 0, Math.PI * 2);
    ctx.fillStyle = hairColor;
    ctx.fill();
    
    // Redraw face over back hair
    this.drawFace(ctx);
    this.drawBlush(ctx);
    
    // Front hair bangs
    ctx.beginPath();
    ctx.moveTo(-70, -60);
    ctx.quadraticCurveTo(-40, -90, 0, -90);
    ctx.quadraticCurveTo(40, -90, 70, -60);
    ctx.quadraticCurveTo(60, -40, 40, -30);
    ctx.quadraticCurveTo(20, -50, 0, -50);
    ctx.quadraticCurveTo(-20, -50, -40, -30);
    ctx.quadraticCurveTo(-60, -40, -70, -60);
    ctx.fillStyle = hairColor;
    ctx.fill();
    
    // Hair highlights
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-30, -80);
    ctx.quadraticCurveTo(0, -85, 30, -80);
    ctx.stroke();
  },
  
  drawBlush: function(ctx) {
    var blushColor = 'rgba(232, 155, 155, 0.4)';
    
    // Left cheek
    ctx.beginPath();
    ctx.ellipse(-45, 25, 15, 8, -0.2, 0, Math.PI * 2);
    ctx.fillStyle = blushColor;
    ctx.fill();
    
    // Right cheek
    ctx.beginPath();
    ctx.ellipse(45, 25, 15, 8, 0.2, 0, Math.PI * 2);
    ctx.fillStyle = blushColor;
    ctx.fill();
  }
});

console.log('%c👩 Tisha Face Loaded', 'color:#ec4899;font-family:monospace;font-size:14px;font-weight:bold;');
