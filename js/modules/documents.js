/* ═══════════════════════════════════════════════════════
   NEXA AI — Documents Module
   Author: AL-AMIN
   Part 19/30
   ═══════════════════════════════════════════════════════ */

'use strict';

NEXA.register('documents', {
  
  documents: [],
  
  init: function() {
    console.log('%c📄 Documents System: Initializing...', 'color:#06b6d4;font-family:monospace;');
    
    // Setup upload area
    var uploadArea = document.querySelector('#docsScreen .upload-area');
    if (uploadArea) {
      uploadArea.addEventListener('click', () => {
        document.getElementById('docsFileInput').click();
      });
      
      // Drag and drop
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
    
    console.log('%c✅ Documents ready', 'color:#22c55e;font-family:monospace;');
  },
  
  /* ═══════════════════════════════════════════════
     FILE HANDLING
     ═══════════════════════════════════════════════ */
  handleFile: function(event) {
    var file = event.target.files[0];
    if (!file) return;
    
    // Check size (max 20MB)
    if (file.size > 20 * 1024 * 1024) {
      if (NEXA.has('main-ui')) NEXA.get('main-ui').showToast('File too large (max 20MB)', 'error');
      return;
    }
    
    var reader = new FileReader();
    reader.onload = (e) => {
      var content = e.target.result;
      
      // Add to state
      var doc = {
        id: NEXA.utils.generateId(),
        name: file.name,
        size: file.size,
        content: content,
        date: new Date()
      };
      
      this.documents.push(doc);
      this.renderList();
      
      if (NEXA.has('main-ui')) NEXA.get('main-ui').showToast(`✅ Uploaded: ${file.name}`);
    };
    
    // Read as text (for PDF/DOCX, you would need a parser library)
    // For this demo, we'll just read plain text files
    reader.readAsText(file);
  },
  
  /* ═══════════════════════════════════════════════
     RENDER LIST
     ═══════════════════════════════════════════════ */
  renderList: function() {
    var list = document.getElementById('docsList');
    if (!list) return;
    
    if (this.documents.length === 0) {
      list.innerHTML = '<p class="text-center" style="color:var(--text-3); margin-top:20px;">No documents uploaded yet.</p>';
      return;
    }
    
    list.innerHTML = '';
    
    this.documents.forEach(doc => {
      var item = document.createElement('div');
      item.className = 'recent-item';
      item.innerHTML = `
        <div class="recent-icon">📄</div>
        <div style="flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size:14px; color:var(--text-1);">
          ${doc.name}
        </div>
        <button class="btn-glass-icon small" onclick="NEXA.get('documents').analyze('${doc.id}')">
          <i class="fas fa-brain"></i>
        </button>
      `;
      list.appendChild(item);
    });
  },
  
  /* ═══════════════════════════════════════════════
     ANALYZE DOCUMENT
     ═══════════════════════════════════════════════ */
  analyze: async function(docId) {
    var doc = this.documents.find(d => d.id === docId);
    if (!doc) return;
    
    if (NEXA.has('main-ui')) NEXA.get('main-ui').showToast('🧠 Analyzing document...');
    
    // Prepare prompt
    var prompt = `I have uploaded a document named "${doc.name}". Please read this text and summarize it in 3 bullet points. If there is code, explain what it does.\n\nDocument Content:\n${doc.content.substring(0, 3000)}...`;
    
    // Send to Chat
    if (NEXA.has('chat')) {
      NEXA.get('main-ui').goChat();
      NEXA.get('chat').processMessage(prompt);
    }
  }
});

console.log('%c📄 Documents Module Loaded', 'color:#06b6d4;font-family:monospace;font-size:14px;font-weight:bold;');
