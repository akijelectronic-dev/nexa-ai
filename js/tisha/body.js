/* ═══════════════════════════════════════════════════════
   NEXA AI — Tisha Body & Hair
   Author: AL-AMIN
   Part 8/30
   ═══════════════════════════════════════════════════════ */

'use strict';

NEXA.register('body', {
  
  // Breathing animation state
  state: {
    breathTimer: 0,
    breathY: 0,
    hairSway: 0
  },
  
  init: function() {
    console.log('%c👗 Tisha Body: Initializing...', 'color:#a855f7;font-family:monospace;');
    console.log('%c✅ Body ready', 'color:#22c55e;font-family:monospace;');
  },
  
  update: function(dt) {
    var time = Date.now() / 1000;
    
    // Subtle breathing animation
    this.state.breathY = Math.sin(time * 1.5) * 1.5;
    
    // Hair swaying
    this.state.hairSway = Math.sin(time * 0.8) * 3;
  },
  
  render: function(ctx, dt) {
    // This module renders BEHIND the face
    // We need to draw the body first, then face.js will draw the face on top
    
    if (!ctx) return;
    
    var canvas = ctx.canvas;
    var w = canvas.width / (window.devicePixelRatio || 1);
    var h = canvas.height / (window.devicePixelRatio || 1);
    
    var scale = w / 280;
    
    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.scale(scale, scale);
    
    // Apply breathing
    ctx.translate(0, this.state.breathY);
    
    // Draw body parts
    this.drawBackHair(ctx);
    this.drawShoulders(ctx);
    this.drawNeck(ctx);
    this.drawOutfit(ctx);
    this.drawFrontHair(ctx);
    
    ctx.restore();
  },
  
  /* ═══════════════════════════════════════════════
     DRAWING FUNCTIONS
     ═══════════════════════════════════════════════ */
  
  drawBackHair: function(ctx) {
    var hairColor = NEXA.config.tisha.appearance.hairColor || '#1a1a1a';
    
    ctx.save();
    ctx.translate(this.state.hairSway, 0);
    
    // Back hair flowing down
    ctx.beginPath();
    ctx.moveTo(-70, -60);
    ctx.quadraticCurveTo(-90, 50, -80, 120);
    ctx.quadraticCurveTo(-60, 130, -40, 100);
    ctx.lineTo(40, 100);
    ctx.quadraticCurveTo(60, 130, 80, 120);
    ctx.quadraticCurveTo(90, 50, 70, -60);
    ctx.closePath();
    
    // Hair gradient
    var gradient = ctx.createLinearGradient(0, -60, 0, 120);
    gradient.addColorStop(0, hairColor);
    gradient.addColorStop(1, '#0d0d0d');
    
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Hair highlights
    ctx.beginPath();
    ctx.moveTo(-50, 0);
    ctx.quadraticCurveTo(-60, 60, -50, 100);
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(50, 0);
    ctx.quadraticCurveTo(60, 60, 50, 100);
    ctx.stroke();
    
    ctx.restore();
  },
  
  drawShoulders: function(ctx) {
    var skinColor = NEXA.config.tisha.appearance.skinTone || '#d4a574';
    
    // Left shoulder
    ctx.beginPath();
    ctx.moveTo(-40, 90);
    ctx.quadraticCurveTo(-80, 100, -90, 140);
    ctx.lineTo(-40, 140);
    ctx.closePath();
    ctx.fillStyle = skinColor;
    ctx.fill();
    
    // Right shoulder
    ctx.beginPath();
    ctx.moveTo(40, 90);
    ctx.quadraticCurveTo(80, 100, 90, 140);
    ctx.lineTo(40, 140);
    ctx.closePath();
    ctx.fillStyle = skinColor;
    ctx.fill();
  },
  
  drawNeck: function(ctx) {
    var skinColor = NEXA.config.tisha.appearance.skinTone || '#d4a574';
    
    // Neck
    ctx.beginPath();
    ctx.moveTo(-20, 80);
    ctx.lineTo(-15, 110);
    ctx.quadraticCurveTo(0, 115, 15, 110);
    ctx.lineTo(20, 80);
    ctx.closePath();
    
    var gradient = ctx.createLinearGradient(0, 80, 0, 110);
    gradient.addColorStop(0, skinColor);
    gradient.addColorStop(1, '#a17c52'); // Shadow under chin
    
    ctx.fillStyle = gradient;
    ctx.fill();
  },
  
  drawOutfit: function(ctx) {
    // Purple casual top (from config)
    
    // Shirt body
    ctx.beginPath();
    ctx.moveTo(-90, 140);
    ctx.lineTo(-60, 130);
    ctx.quadraticCurveTo(-30, 120, 0, 125);
    ctx.quadraticCurveTo(30, 120, 60, 130);
    ctx.lineTo(90, 140);
    ctx.lineTo(100, 200);
    ctx.lineTo(-100, 200);
    ctx.closePath();
    
    // Purple gradient
    var gradient = ctx.createLinearGradient(0, 120, 0, 200);
    gradient.addColorStop(0, '#a855f7'); // Purple
    gradient.addColorStop(1, '#7e22ce'); // Darker purple
    
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Collar
    ctx.beginPath();
    ctx.moveTo(-25, 90);
    ctx.quadraticCurveTo(0, 130, 25, 90);
    ctx.strokeStyle = '#6b21a8';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Shirt highlights/folds
    ctx.beginPath();
    ctx.moveTo(-40, 150);
    ctx.quadraticCurveTo(-45, 180, -40, 200);
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(40, 150);
    ctx.quadraticCurveTo(45, 180, 40, 200);
    ctx.stroke();
  },
  
  drawFrontHair: function(ctx) {
    var hairColor = NEXA.config.tisha.appearance.hairColor || '#1a1a1a';
    
    ctx.save();
    ctx.translate(this.state.hairSway * 0.5, 0);
    
    // Front bangs (overlapping forehead)
    ctx.beginPath();
    ctx.moveTo(-75, -40);
    ctx.quadraticCurveTo(-50, -95, 0, -95);
    ctx.quadraticCurveTo(50, -95, 75, -40);
    ctx.quadraticCurveTo(60, -30, 40, -50);
    ctx.quadraticCurveTo(20, -65, 0, -65);
    ctx.quadraticCurveTo(-20, -65, -40, -50);
    ctx.quadraticCurveTo(-60, -30, -75, -40);
    ctx.closePath();
    
    ctx.fillStyle = hairColor;
    ctx.fill();
    
    // Side bangs
    ctx.beginPath();
    ctx.moveTo(-75, -40);
    ctx.quadraticCurveTo(-80, 0, -70, 40);
    ctx.lineTo(-55, 40);
    ctx.quadraticCurveTo(-60, 0, -60, -40);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(75, -40);
    ctx.quadraticCurveTo(80, 0, 70, 40);
    ctx.lineTo(55, 40);
    ctx.quadraticCurveTo(60, 0, 60, -40);
    ctx.closePath();
    ctx.fill();
    
    ctx.restore();
  }
});

console.log('%c👗 Tisha Body Loaded', 'color:#a855f7;font-family:monospace;font-size:14px;font-weight:bold;');
