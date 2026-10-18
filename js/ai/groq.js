/* ═══════════════════════════════════════════════════════
   NEXA AI — Groq Provider (Primary AI)
   Author: AL-AMIN
   Part 11/30
   ═══════════════════════════════════════════════════════ */

'use strict';

NEXA.register('groq', {
  
  name: 'groq',
  enabled: true,
  priority: 1,
  
  init: function() {
    console.log('%c⚡ Groq Provider: Initializing...', 'color:#f59e0b;font-family:monospace;');
    
    // Check if worker URL exists
    if (!NEXA.config.workerURL) {
      console.warn('⚠️ Groq: No worker URL found in config');
      this.enabled = false;
      return;
    }
    
    console.log('%c✅ Groq ready', 'color:#22c55e;font-family:monospace;');
  },
  
  /* ═══════════════════════════════════════════════
     CALL API
     ═══════════════════════════════════════════════ */
  call: async function(messages, options = {}) {
    if (!this.enabled) throw new Error('Groq is disabled');
    
    var model = options.model || NEXA.config.ai.groq.defaultModel;
    var temperature = options.temperature || NEXA.config.ai.generation.temperature;
    var maxTokens = options.maxTokens || NEXA.config.ai.generation.maxTokens;
    
    console.log(`%c⚡ Groq: Sending request (${model})...`, 'color:#f59e0b;font-family:monospace;');
    
    try {
      var response = await fetch(NEXA.config.workerURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          provider: 'groq',
          model: model,
          messages: messages,
          temperature: temperature,
          max_tokens: maxTokens
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      var data = await response.json();
      
      // Extract content
      if (data && data.choices && data.choices[0] && data.choices[0].message) {
        console.log('%c✅ Groq: Response received', 'color:#22c55e;font-family:monospace;');
        return data.choices[0].message.content;
      }
      
      throw new Error('Invalid response format from Groq');
      
    } catch (error) {
      console.error('%c❌ Groq Error:', 'color:#ef4444;font-family:monospace;', error);
      throw error;
    }
  },
  
  /* ═══════════════════════════════════════════════
     STREAM API (For Future)
     ═══════════════════════════════════════════════ */
  stream: async function(messages, onChunk, options = {}) {
    console.log('%c⚠️ Groq: Streaming not implemented yet', 'color:#f59e0b;font-family:monospace;');
    
    // Fallback to normal call
    var result = await this.call(messages, options);
    if (onChunk) onChunk(result);
    return result;
  }
});

console.log('%c⚡ Groq Provider Loaded', 'color:#f59e0b;font-family:monospace;font-size:14px;font-weight:bold;');
