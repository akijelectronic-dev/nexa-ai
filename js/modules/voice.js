/* ═══════════════════════════════════════════════════════
   NEXA AI — Voice Module (Input & Output)
   Author: AL-AMIN
   Part 18/30
   ═══════════════════════════════════════════════════════ */

'use strict';

NEXA.register('voice', {
  
  isListening: false,
  recognition: null,
  synth: window.speechSynthesis,
  isSpeaking: false,
  
  init: function() {
    console.log('%c🎤 Voice System: Initializing...', 'color:#ec4899;font-family:monospace;');
    
    // Setup Speech Recognition (Input)
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = NEXA.config.tisha.voice.language; // bn-BD
      
      this.recognition.onstart = () => {
        this.isListening = true;
        this.updateUI('listening');
        if (NEXA.has('main-ui')) NEXA.get('main-ui').showToast('🎤 Listening...');
      };
      
      this.recognition.onresult = (event) => {
        var transcript = event.results[0][0].transcript;
        this.handleInput(transcript);
      };
      
      this.recognition.onerror = (event) => {
        console.error('Speech Recognition Error:', event.error);
        this.isListening = false;
        this.updateUI('idle');
      };
      
      this.recognition.onend = () => {
        this.isListening = false;
        this.updateUI('idle');
      };
    } else {
      console.warn('⚠️ Speech Recognition not supported in this browser');
    }
    
    // Setup Audio Visualizer Canvas
    this.setupVisualizer();
    
    console.log('%c✅ Voice ready', 'color:#22c55e;font-family:monospace;');
  },
  
  /* ═══════════════════════════════════════════════
     VOICE INPUT (Speech to Text)
     ═══════════════════════════════════════════════ */
  toggle: function() {
    if (!this.recognition) {
      if (NEXA.has('main-ui')) NEXA.get('main-ui').showToast('Voice not supported in this browser', 'error');
      return;
    }
    
    if (this.isListening) {
      this.recognition.stop();
    } else {
      // If speaking, stop TTS first
      if (this.isSpeaking) {
        this.synth.cancel();
      }
      this.recognition.start();
    }
  },
  
  handleInput: function(text) {
    console.log('🎤 Voice Input:', text);
    
    // Show in UI
    var status = document.getElementById('voiceStatus');
    if (status) status.textContent = `"${text}"`;
    
    // Send to Chat
    if (NEXA.has('chat')) {
      NEXA.get('main-ui').goChat(); // Switch to chat screen
      NEXA.get('chat').processMessage(text);
    }
  },
  
  /* ═══════════════════════════════════════════════
     VOICE OUTPUT (Text to Speech - Tisha's Voice)
     ═══════════════════════════════════════════════ */
  speak: function(text) {
    if (!this.synth) return;
    
    // Cancel any ongoing speech
    this.synth.cancel();
    
    var utterance = new SpeechSynthesisUtterance(text);
    
    // Set properties
    utterance.lang = NEXA.config.tisha.voice.language;
    utterance.pitch = NEXA.config.tisha.voice.pitch; // 1.1 (feminine)
    utterance.rate = NEXA.config.tisha.voice.rate;   // 0.95 (slightly slow)
    utterance.volume = NEXA.config.audio.voiceVolume;
    
    // Try to find a female voice
    var voices = this.synth.getVoices();
    var preferredVoice = voices.find(v => v.lang.includes('bn') && v.name.includes('Female')) 
                      || voices.find(v => v.lang.includes('bn'))
                      || voices.find(v => v.lang.includes('en') && v.name.includes('Female'));
                      
    if (preferredVoice) utterance.voice = preferredVoice;
    
    utterance.onstart = () => {
      this.isSpeaking = true;
      this.updateUI('speaking');
    };
    
    utterance.onend = () => {
      this.isSpeaking = false;
      this.updateUI('idle');
    };
    
    this.synth.speak(utterance);
  },
  
  stopSpeaking: function() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
      this.updateUI('idle');
    }
  },
  
  /* ═══════════════════════════════════════════════
     UI UPDATES
     ═══════════════════════════════════════════════ */
  updateUI: function(state) {
    var btn = document.getElementById('voiceBtn');
    var status = document.getElementById('voiceStatus');
    var rings = document.querySelector('.voice-rings');
    
    if (!btn) return;
    
    if (state === 'listening') {
      btn.classList.add('listening');
      if (status) status.textContent = 'Listening...';
      if (rings) rings.style.opacity = '1';
    } else if (state === 'speaking') {
      btn.classList.remove('listening');
      btn.innerHTML = '<i class="fas fa-volume-up"></i>';
      if (status) status.textContent = 'Tisha is speaking...';
      if (rings) rings.style.opacity = '1';
    } else {
      btn.classList.remove('listening');
      btn.innerHTML = '<i class="fas fa-microphone"></i>';
      if (status) status.textContent = 'Tap to speak';
      if (rings) rings.style.opacity = '0.3';
    }
  },
  
  /* ═══════════════════════════════════════════════
     VISUALIZER
     ═══════════════════════════════════════════════ */
  setupVisualizer: function() {
    var canvas = document.getElementById('voiceVisualizer');
    if (!canvas) return;
    
    var ctx = canvas.getContext('2d');
    var width = canvas.width = canvas.offsetWidth;
    var height = canvas.height = canvas.offsetHeight;
    
    var draw = () => {
      requestAnimationFrame(draw);
      ctx.clearRect(0, 0, width, height);
      
      if (!this.isListening && !this.isSpeaking) return;
      
      // Simple fake waveform based on time
      var time = Date.now() / 200;
      var color = this.isListening ? '#ec4899' : '#a855f7';
      
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      
      for (var x = 0; x < width; x += 5) {
        var y = height / 2 + Math.sin(x * 0.05 + time) * 20 * Math.sin(x * 0.01 + time * 0.5);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      
      ctx.stroke();
    };
    
    draw();
  }
});

console.log('%c🎤 Voice Module Loaded', 'color:#ec4899;font-family:monospace;font-size:14px;font-weight:bold;');
