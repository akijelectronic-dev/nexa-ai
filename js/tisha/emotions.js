/* ═══════════════════════════════════════════════════════
   NEXA AI — Tisha Emotions
   Author: AL-AMIN
   Part 10/30
   ═══════════════════════════════════════════════════════ */

'use strict';

NEXA.register('emotions', {
  
  // Current emotion
  current: 'neutral',
  previous: 'neutral',
  transitionProgress: 1, // 1 means fully transitioned
  
  // Emotion configurations
  configs: {
    neutral: {
      eyeShape: 'normal',
      eyebrowY: 0,
      mouthCurve: 0,
      mouthWidth: 15,
      blushIntensity: 0,
      tearVisible: false
    },
    happy: {
      eyeShape: 'happy', // Arched eyes ^ ^
      eyebrowY: -2,
      mouthCurve: 0.5, // Smile
      mouthWidth: 20,
      blushIntensity: 0.6,
      tearVisible: false
    },
    sad: {
      eyeShape: 'sad', // Droopy eyes
      eyebrowY: 3, // Inner eyebrows up
      mouthCurve: -0.5, // Frown
      mouthWidth: 12,
      blushIntensity: 0.2,
      tearVisible: true
    },
    surprised: {
      eyeShape: 'wide', // Wide open
      eyebrowY: -4,
      mouthCurve: 0, // O shape
      mouthWidth: 8,
      blushIntensity: 0.1,
      tearVisible: false
    },
    thinking: {
      eyeShape: 'looking_up',
      eyebrowY: -1,
      mouthCurve: -0.1,
      mouthWidth: 10,
      blushIntensity: 0,
      tearVisible: false
    },
    angry: {
      eyeShape: 'angry', // Narrowed
      eyebrowY: 2, // Inner eyebrows down
      mouthCurve: -0.4,
      mouthWidth: 14,
      blushIntensity: 0.8, // Red cheeks
      tearVisible: false
    },
    tired: {
      eyeShape: 'sleepy', // Half closed
      eyebrowY: 1,
      mouthCurve: -0.2,
      mouthWidth: 12,
      blushIntensity: 0,
      tearVisible: false
    }
  },
  
  // Current interpolated values
  currentValues: {
    eyeShape: 'normal',
    eyebrowY: 0,
    mouthCurve: 0,
    mouthWidth: 15,
    blushIntensity: 0,
    tearVisible: false
  },
  
  init: function() {
    console.log('%c😊 Tisha Emotions: Initializing...', 'color:#ec4899;font-family:monospace;');
    this.currentValues = { ...this.configs.neutral };
    console.log('%c✅ Emotions ready', 'color:#22c55e;font-family:monospace;');
  },
  
  update: function(dt) {
    // Smooth transition between emotions
    if (this.transitionProgress < 1) {
      this.transitionProgress += dt * 2; // Transition speed
      if (this.transitionProgress > 1) this.transitionProgress = 1;
      
      var from = this.configs[this.previous];
      var to = this.configs[this.current];
      var t = this.transitionProgress;
      
      // Interpolate numeric values
      this.currentValues.eyebrowY = NEXA.utils.lerp(from.eyebrowY, to.eyebrowY, t);
      this.currentValues.mouthCurve = NEXA.utils.lerp(from.mouthCurve, to.mouthCurve, t);
      this.currentValues.mouthWidth = NEXA.utils.lerp(from.mouthWidth, to.mouthWidth, t);
      this.currentValues.blushIntensity = NEXA.utils.lerp(from.blushIntensity, to.blushIntensity, t);
      
      // Switch shapes halfway
      if (this.transitionProgress > 0.5) {
        this.currentValues.eyeShape = to.eyeShape;
        this.currentValues.tearVisible = to.tearVisible;
      }
    }
    
    // Pass to face module
    if (NEXA.has('face') && NEXA.get('face').applyEmotion) {
      NEXA.get('face').applyEmotion(this.currentValues);
    }
  },
  
  // Method to change emotion
  set: function(emotionName) {
    if (emotionName === this.current) return;
    if (!this.configs[emotionName]) emotionName = 'neutral';
    
    this.previous = this.current;
    this.current = emotionName;
    this.transitionProgress = 0;
    
    console.log(`%c😊 Emotion: ${emotionName}`, 'color:#ec4899;font-family:monospace;');
  },
  
  // Auto-detect emotion from text
  detectFromText: function(text) {
    var lower = text.toLowerCase();
    
    if (/(\bha\b|\bhi\b|hello|হ্যালো|হাই|ভালো|ধন্যবাদ|thanks|great|awesome|😊|😄|❤️)/.test(lower)) {
      this.set('happy');
    } else if (/(sad|দুঃখ|কান্না|😢|😭|sorry|দুঃখিত)/.test(lower)) {
      this.set('sad');
    } else if (/(angry|রাগ|😠|😡|hate)/.test(lower)) {
      this.set('angry');
    } else if (/(wow|কি|😮|😲|surprise)/.test(lower)) {
      this.set('surprised');
    } else if (/(think|ভাব|🤔|hmm)/.test(lower)) {
      this.set('thinking');
    } else if (/(tired|ক্লান্ত|😴|sleep)/.test(lower)) {
      this.set('tired');
    }
    // Default falls back to neutral after a while, but we'll let the chat module handle reset
  }
});

console.log('%c😊 Tisha Emotions Loaded', 'color:#ec4899;font-family:monospace;font-size:14px;font-weight:bold;');
