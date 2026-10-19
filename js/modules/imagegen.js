/* ═══════════════════════════════════════════════════════
   NEXA AI — Image Generator Module
   Author: AL-AMIN
   Part 20/30
   ═══════════════════════════════════════════════════════ */

'use strict';

NEXA.register('imagegen', {
  
  currentStyle: 'realistic',
  isGenerating: false,
  
  init: function() {
    console.log('%c🎨 Image Generator: Initializing...', 'color:#ec4899;font-family:monospace;');
    console.log('%c✅ Image Gen ready', 'color:#22c55e;font-family:monospace;');
  },
  
  /* ═══════════════════════════════════════════════
     STYLE SELECTION
     ═══════════════════════════════════════════════ */
  setStyle: function(style) {
    this.currentStyle = style;
    
    // Update active class on chips
    var chips = document.querySelectorAll('#imagegenScreen .chip');
    chips.forEach(chip => {
      chip.classList.remove('active');
      if (chip.textContent.toLowerCase().includes(style)) {
        chip.classList.add('active');
      }
    });
  },
  
  /* ═══════════════════════════════════════════════
     GENERATE IMAGE
     ═══════════════════════════════════════════════ */
  generate: async function() {
    if (this.isGenerating) return;
    
    var promptInput = document.getElementById('imagegenPrompt');
    if (!promptInput) return;
    
    var prompt = promptInput.value.trim();
    if (!prompt) {
      if (NEXA.has('main-ui')) NEXA.get('main-ui').showToast('Please enter a prompt', 'error');
      return;
    }
    
    this.isGenerating = true;
    var btn = document.querySelector('#imagegenScreen .btn-primary');
    var originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    btn.disabled = true;
    
    try {
      // Enhance prompt with style
      var enhancedPrompt = `${prompt}, ${this.currentStyle} style, high quality, detailed`;
      
      // Pollinations API URL
      var baseUrl = NEXA.config.ai.pollinations.url;
      var imageUrl = baseUrl + encodeURIComponent(enhancedPrompt) + `?width=1024&height=1024&seed=${Date.now()}`;
      
      // Show result
      var resultContainer = document.getElementById('imagegenResult');
      resultContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 20px;">
          <img src="${imageUrl}" style="width: 100%; border-radius: 16px; box-shadow: 0 10px 30px rgba(168,85,247,0.3);">
          <div style="margin-top: 16px; display: flex; gap: 10px; justify-content: center;">
            <a href="${imageUrl}" download="nexa_${Date.now()}.jpg" class="btn-secondary" style="text-decoration:none;">
              <i class="fas fa-download"></i> Download
            </a>
          </div>
        </div>
      `;
      
      if (NEXA.has('main-ui')) NEXA.get('main-ui').showToast('✅ Image generated!');
      
    } catch (error) {
      if (NEXA.has('main-ui')) NEXA.get('main-ui').showToast('❌ Generation failed', 'error');
    } finally {
      this.isGenerating = false;
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  },
  
  /* ═══════════════════════════════════════════════
     OPEN SCREEN
     ═══════════════════════════════════════════════ */
  open: function() {
    if (NEXA.has('main-ui')) {
      NEXA.get('main-ui').goImageGen();
    }
  }
});

console.log('%c🎨 Image Generator Loaded', 'color:#ec4899;font-family:monospace;font-size:14px;font-weight:bold;');
