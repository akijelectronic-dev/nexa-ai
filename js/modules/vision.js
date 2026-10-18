/* ═══════════════════════════════════════════════════════
   NEXA AI — Vision Module
   Author: AL-AMIN
   Part 17/30
   ═══════════════════════════════════════════════════════ */

'use strict';

NEXA.register('vision', {
  
  currentImage: null,
  currentFile: null,
  
  init: function() {
    console.log('%c📸 Vision System: Initializing...', 'color:#06b6d4;font-family:monospace;');
    
    // Setup upload area click
    var uploadArea = document.getElementById('visionUploadArea');
    if (uploadArea) {
      uploadArea.addEventListener('click', () => {
        document.getElementById('visionFileInput').click();
      });
    }
    
    // Setup drag and drop
    if (uploadArea) {
      uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--purple)';
      });
      
      uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--glass-border)';
      });
      
      uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--glass-border)';
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          this.handleFile({ target: { files: e.dataTransfer.files } });
        }
      });
    }
    
    console.log('%c✅ Vision ready', 'color:#22c55e;font-family:monospace;');
  },
  
  /* ═══════════════════════════════════════════════
     FILE HANDLING
     ═══════════════════════════════════════════════ */
  openUpload: function() {
    if (NEXA.has('main-ui')) {
      NEXA.get('main-ui').goVision();
    }
    setTimeout(() => {
      document.getElementById('visionFileInput').click();
    }, 300);
  },
  
  handleFile: function(event) {
    var file = event.target.files[0];
    if (!file) return;
    
    // Check size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      if (NEXA.has('main-ui')) NEXA.get('main-ui').showToast('Image too large (max 10MB)', 'error');
      return;
    }
    
    this.currentFile = file;
    
    var reader = new FileReader();
    reader.onload = (e) => {
      this.currentImage = e.target.result;
      this.showPreview();
    };
    reader.readAsDataURL(file);
  },
  
  showPreview: function() {
    var uploadArea = document.getElementById('visionUploadArea');
    var preview = document.getElementById('visionPreview');
    var img = document.getElementById('visionImage');
    
    if (uploadArea) uploadArea.style.display = 'none';
    if (preview) preview.style.display = 'block';
    if (img) img.src = this.currentImage;
  },
  
  clear: function() {
    this.currentImage = null;
    this.currentFile = null;
    
    var uploadArea = document.getElementById('visionUploadArea');
    var preview = document.getElementById('visionPreview');
    
    if (uploadArea) uploadArea.style.display = 'flex';
    if (preview) preview.style.display = 'none';
  },
  
  /* ═══════════════════════════════════════════════
     ANALYZE IMAGE
     ═══════════════════════════════════════════════ */
  analyze: async function() {
    if (!this.currentImage) {
      if (NEXA.has('main-ui')) NEXA.get('main-ui').showToast('Please upload an image first', 'error');
      return;
    }
    
    var btn = document.querySelector('#visionScreen .btn-primary');
    var originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
    btn.disabled = true;
    
    try {
      // For now, we'll send the image as a prompt to the text AI 
      // (since we haven't set up Gemini Vision API yet)
      var messages = [
        { 
          role: 'user', 
          content: `[Image Uploaded: ${this.currentFile.name}]\n\nPlease analyze this image. (Note: Full vision API is coming soon, but describe what you can do with it).` 
        }
      ];
      
      var response = await NEXA.get('router').call('vision', messages);
      
      if (NEXA.has('main-ui')) {
        NEXA.get('main-ui').showToast('✅ Analysis complete!');
      }
      
      // Switch to chat and show result
      if (NEXA.has('chat')) {
        NEXA.get('chat').messages.push({ role: 'user', content: `[Image: ${this.currentFile.name}]` });
        NEXA.get('chat').addMessage('assistant', response.content);
        NEXA.get('main-ui').goChat();
      }
      
    } catch (error) {
      if (NEXA.has('main-ui')) {
        NEXA.get('main-ui').showToast('❌ Analysis failed: ' + error.message, 'error');
      }
    } finally {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  }
});

console.log('%c📸 Vision Module Loaded', 'color:#06b6d4;font-family:monospace;font-size:14px;font-weight:bold;');
