/* ═══════════════════════════════════════════════════════
   NEXA AI — Tisha Face (Full & Fixed)
   Author: AL-AMIN
   Part 7/30 (Updated)
   ═══════════════════════════════════════════════════════ */

'use strict';

NEXA.register('face', {
  
  // Current state
  state: {
    blinkTimer: 0,
    isBlinking: false,
    lookX: 0,
    lookY: 0,
    headTilt: 0
  },
  
  // Current emotion data passed from emotions.js
  currentEmotion: {
    eyeShape: 'normal',
    eyebrowY: 0,
    mouthCurve: 0,
    mouthWidth: 15,
    blushIntensity: 0,
    tearVisible: false
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
    
    // Subtle eye movement (idle)
    var time = Date.now() / 1000;
    this.state.lookX = Math.sin(time * 0.5) * 2;
    this.state.lookY = Math.cos(time * 0.7) * 1.5;
  },
  
  // Receive emotion data from emotions.js
  applyEmotion: function(emo) {
    if (!emo) return;
    this.currentEmotion = emo;
  },
  
  render: function(ctx, dt) {
    if (!ctx) return;
    
    var canvas = ctx.canvas;
    var w = canvas.width / (window.devicePixelRatio || 1);
    var h = canvas.height / (window.devicePixelRatio || 1);
    
    // Center point
    var cx = w / 2;
    var cy = h / 2;
    
    // Scale factor
    var scale = w / 280;
    
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    
    // Apply head tilt (from animations)
    var tilt = this.state.headTilt || 0;
    if (NEXA.has('animations')) {
      tilt = NEXA.get('animations').state.headTilt;
    }
    ctx.rotate(tilt);
    
    // Draw face layers (Back to Front)
    this.drawFaceBase(ctx);
    this.drawEyes(ctx);
    this.drawNose(ctx);
    this.drawLips(ctx);
    this.drawHairFront(ctx);
    this.drawBlush(ctx);
    this.drawTears(ctx);
    
    ctx.restore();
  },
  
  /* ═══════════════════════════════════════════════
     DRAWING FUNCTIONS
     ═══════════════════════════════════════════════ */
  
  drawFaceBase: function(ctx) {
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
    var emo = this.currentEmotion;
    var eyeY = -10 + (emo.eyebrowY || 0) * 0.5;
    var eyeSpacing = 28;
    
    [-eyeSpacing, eyeSpacing].forEach((x, index) => {
      ctx.save();
      ctx.translate(x, eyeY);
      
      // Determine eye shape
      if (this.state.isBlinking || emo.eyeShape === 'sleepy') {
        // Closed/Sleepy eyes
        ctx.beginPath();
        ctx.arc(0, 0, 12, 0.1 * Math.PI, 0.9 * Math.PI);
        ctx.strokeStyle = '#1a1a1a';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.stroke();
        
      } else if (emo.eyeShape === 'happy') {
        // Happy eyes (^ ^)
        ctx.beginPath();
        ctx.arc(0, 5, 12, 1.1 * Math.PI, 1.9 * Math.PI);
        ctx.strokeStyle = '#1a1a1a';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.stroke();
        
      } else if (emo.eyeShape === 'angry') {
        // Angry narrowed eyes
        ctx.beginPath();
        ctx.ellipse(0, 0, 14, 8, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        
        // Angry eyebrow
        ctx.beginPath();
        ctx.moveTo(-15, -15);
        ctx.lineTo(15, -5); // Slanted down towards center
        ctx.strokeStyle = '#1a1a1a';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Iris
        var eyeColor = NEXA.config.tisha.appearance.eyeColor || '#6b4423';
        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx.fillStyle = eyeColor;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#000000';
        ctx.fill();
        
      } else {
        // Normal eyes / Wide / Looking up
        var eyeHeight = emo.eyeShape === 'wide' ? 20 : 18;
        var lookOffsetY = emo.eyeShape === 'looking_up' ? -5 : 0;
        
        // Eye white
        ctx.beginPath();
        ctx.ellipse(0, 0, 14, eyeHeight, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        
        // Iris
        var eyeColor = NEXA.config.tisha.appearance.eyeColor || '#6b4423';
        ctx.beginPath();
        ctx.arc(this.state.lookX, this.state.lookY + lookOffsetY, 8, 0, Math.PI * 2);
        ctx.fillStyle = eyeColor;
        ctx.fill();
        
        // Pupil
        ctx.beginPath();
        ctx.arc(this.state.lookX, this.state.lookY + lookOffsetY, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#000000';
        ctx.fill();
        
        // Eye highlight
        ctx.beginPath();
        ctx.arc(this.state.lookX - 2, this.state.lookY - 2 + lookOffsetY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        
        // Upper eyelid shadow
        ctx.beginPath();
        ctx.ellipse(0, -2, 14, 6, 0, Math.PI, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fill();
        
        // Eyelashes (Normal)
        if (emo.eyeShape !== 'wide') {
          ctx.strokeStyle = '#1a1a1a';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.ellipse(0, 0, 15, eyeHeight + 1, 0, Math.PI * 1.1, Math.PI * 1.9);
          ctx.stroke();
        }
      }
      
      // Standard Eyebrow (if not already drawn for angry)
      if (emo.eyeShape !== 'angry') {
        ctx.beginPath();
        ctx.moveTo(-15, -25 + (emo.eyebrowY || 0));
        ctx.quadraticCurveTo(0, -32 + (emo.eyebrowY || 0), 15, -25 + (emo.eyebrowY || 0));
        ctx.strokeStyle = NEXA.config.tisha.appearance.hairColor || '#1a1a1a';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
      
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
    
    // Nose highlight
    ctx.beginPath();
    ctx.moveTo(0, 5);
    ctx.lineTo(0, 15);
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  },
  
  drawLips: function(ctx) {
    var emo = this.currentEmotion;
    var lipColor = '#d4858c'; // Soft pink
    
    var mw = emo.mouthWidth || 15;
    var mc = emo.mouthCurve || 0;
    
    // Lips shape (changes based on mouthCurve for smile/frown)
    ctx.beginPath();
    
    if (emo.eyeShape === 'wide') {
      // Surprised (O shape)
      ctx.ellipse(0, 35, 6, 8, 0, 0, Math.PI * 2);
    } else {
      // Normal/Smile/Sad
      ctx.moveTo(-mw, 35);
      // Bottom lip
      ctx.quadraticCurveTo(0, 35 + (mc * 10), mw, 35);
      // Top lip
      ctx.quadraticCurveTo(0, 25 + (mc * 5), -mw, 35);
    }
    
    ctx.fillStyle = lipColor;
    ctx.fill();
    
    // Lip line
    if (emo.eyeShape !== 'wide') {
      ctx.beginPath();
      ctx.moveTo(-mw, 35);
      ctx.quadraticCurveTo(0, 35 + (mc * 5), mw, 35);
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    
    // Highlight
    ctx.beginPath();
    ctx.ellipse(0, 37 + (mc * 5), 3, 1.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.fill();
  },
  
  drawHairFront: function(ctx) {
    var hairColor = NEXA.config.tisha.appearance.hairColor || '#1a1a1a';
    
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
    var emo = this.currentEmotion;
    var intensity = emo.blushIntensity || 0;
    
    if (intensity <= 0) return;
    
    var blushColor = `rgba(232, 155, 155, ${intensity * 0.6})`;
    
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
  },
  
  drawTears: function(ctx) {
    var emo = this.currentEmotion;
    if (!emo.tearVisible) return;
    
    // Left tear
    ctx.beginPath();
    ctx.ellipse(-28, 10, 3, 6, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 150, 255, 0.6)';
    ctx.fill();
    
    // Right tear
    ctx.beginPath();
    ctx.ellipse(28, 10, 3, 6, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 150, 255, 0.6)';
    ctx.fill();
  }
});

console.log('%c👩 Tisha Face Loaded (Full)', 'color:#ec4899;font-family:monospace;font-size:14px;font-weight:bold;');
