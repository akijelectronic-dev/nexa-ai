/* ═══════════════════════════════════════════════════════
   NEXA AI — Chat Module
   Author: AL-AMIN
   Part 14/30
   ═══════════════════════════════════════════════════════ */

'use strict';

NEXA.register('chat', {
  
  messages: [],
  isProcessing: false,
  
  init: function() {
    console.log('%c💬 Chat System: Initializing...', 'color:#06b6d4;font-family:monospace;');
    
    // Load history from storage
    if (NEXA.has('storage')) {
      this.messages = NEXA.get('storage').getChat();
    }
    
    // If no history, add welcome message
    if (this.messages.length === 0) {
      this.messages.push({
        role: 'assistant',
        content: 'আসসালামু আলাইকুম AL-AMIN! আমি তিশা। কীভাবে সাহায্য করতে পারি?'
      });
    }
    
    console.log('%c✅ Chat ready', 'color:#22c55e;font-family:monospace;');
  },
  
  /* ═══════════════════════════════════════════════
     SEND MESSAGE
     ═══════════════════════════════════════════════ */
  send: async function() {
    if (this.isProcessing) return;
    
    var input = document.getElementById('chatInput');
    if (!input) return;
    
    var text = input.value.trim();
    if (!text) return;
    
    // Clear input
    input.value = '';
    input.style.height = 'auto';
    
    await this.processMessage(text);
  },
  
  sendFromHome: async function() {
    if (this.isProcessing) return;
    
    var input = document.getElementById('homeInput');
    if (!input) return;
    
    var text = input.value.trim();
    if (!text) return;
    
    // Clear input
    input.value = '';
    input.style.height = 'auto';
    
    // Switch to chat screen if not already
    if (NEXA.has('main-ui')) {
      NEXA.get('main-ui').goChat();
    }
    
    await this.processMessage(text);
  },
  
  processMessage: async function(text) {
    this.isProcessing = true;
    
    // 1. Add user message to UI and state
    this.addMessage('user', text);
    
    // 2. Detect emotion (Visual feedback)
    if (NEXA.has('emotions')) {
      NEXA.get('emotions').detectFromText(text);
    }
    
    // 3. Show Typing Indicator
    this.showTyping();
    
    try {
      // 4. Prepare API Messages (include System Prompt)
      var apiMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...this.messages.slice(-10) // Keep last 10 messages for context
      ];
      
      // 5. Call AI Router
      var task = NEXA.get('router').detectTask(text);
      var response = await NEXA.get('router').call(task, apiMessages);
      
      // 6. Remove Typing Indicator
      this.hideTyping();
      
      // 7. Add AI response
      this.addMessage('assistant', response.content);
      
      // 8. Reset emotion to neutral after a delay
      setTimeout(() => {
        if (NEXA.has('emotions')) NEXA.get('emotions').set('neutral');
      }, 4000);
      
    } catch (error) {
      this.hideTyping();
      this.addMessage('assistant', `⚠️ দুঃখিত, একটা সমস্যা হয়েছে: ${error.message}`);
      
      if (NEXA.has('emotions')) {
        NEXA.get('emotions').set('sad');
      }
    }
    
    this.isProcessing = false;
  },
  
  /* ═══════════════════════════════════════════════
     UI HANDLERS
     ═══════════════════════════════════════════════ */
  addMessage: function(role, content) {
    // 1. Save to state
    this.messages.push({ role, content });
    
    // 2. Save to storage
    if (NEXA.has('storage')) {
      NEXA.get('storage').saveChat(this.messages);
    }
    
    // 3. Render to UI
    var container = document.getElementById('chatMessages');
    if (!container) return;
    
    var msgDiv = document.createElement('div');
    msgDiv.className = `msg ${role === 'user' ? 'user' : 'ai'}`;
    
    var bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.textContent = content;
    
    msgDiv.appendChild(bubble);
    container.appendChild(msgDiv);
    
    // 4. Scroll to bottom
    this.scrollToBottom();
    
    // 5. Update Home Recent List (if home screen exists)
    this.updateRecentList();
  },
  
  showTyping: function() {
    var container = document.getElementById('chatMessages');
    if (!container) return;
    
    var typingDiv = document.createElement('div');
    typingDiv.className = 'msg ai';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
      <div class="typing">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    
    container.appendChild(typingDiv);
    this.scrollToBottom();
    
    // Change Tisha emotion to thinking
    if (NEXA.has('emotions')) {
      NEXA.get('emotions').set('thinking');
    }
  },
  
  hideTyping: function() {
    var typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
  },
  
  scrollToBottom: function() {
    var container = document.getElementById('chatMessages');
    if (container) {
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 50);
    }
  },
  
  updateRecentList: function() {
    var list = document.getElementById('recentList');
    if (!list) return;
    
    // Simple recent list logic (can be expanded later)
    list.innerHTML = '';
    
    // Get last user message
    var lastUser = [...this.messages].reverse().find(m => m.role === 'user');
    if (lastUser) {
      var item = document.createElement('div');
      item.className = 'recent-item';
      item.innerHTML = `
        <div class="recent-icon">💬</div>
        <div class="recent-text">${lastUser.content.substring(0, 30)}...</div>
      `;
      item.onclick = () => NEXA.get('main-ui').goChat();
      list.appendChild(item);
    }
  },
  
  clear: function() {
    if (confirm('Clear chat history?')) {
      this.messages = [];
      if (NEXA.has('storage')) {
        NEXA.get('storage').clearChat();
      }
      
      var container = document.getElementById('chatMessages');
      if (container) container.innerHTML = '';
      
      this.addMessage('assistant', 'চ্যাট ক্লিয়ার করা হয়েছে। নতুন করে শুরু করি!');
    }
  }
});

console.log('%c💬 Chat Module Loaded', 'color:#06b6d4;font-family:monospace;font-size:14px;font-weight:bold;');
