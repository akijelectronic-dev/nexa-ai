/* ═══════════════════════════════════════════════════════
   NEXA AI — OpenRouter Provider (Secondary AI)
   Author: AL-AMIN
   Part 12/30
   ═══════════════════════════════════════════════════════ */

'use strict';

NEXA.register('openrouter', {
  
  name: 'openrouter',
  enabled: true,
  priority: 2,
  
  init: function() {
    console.log('%c🔓 OpenRouter Provider: Initializing...', 'color:#ec4899;font-family:monospace;');
    
    // Check if worker URL exists
    if (!NEXA.config.workerURL) {
      console.warn('⚠️ OpenRouter: No worker URL found in config');
      this.enabled = false;
      return;
    }
    
    console.log('%c✅ OpenRouter ready', 'color:#22c55e;font-family:monospace;');
  },
  
  /* ═══════════════════════════════════════════════
     CALL API
     ═══════════════════════════════════════════════ */
  call: async function(messages, options = {}) {
    if (!this.enabled) throw new Error('OpenRouter is disabled');
    
    var model = options.model || NEXA.config.ai.openrouter.defaultModel;
    var temperature = options.temperature || NEXA.config.ai.generation.temperature;
    var maxTokens = options.maxTokens || NEXA.config.ai.generation.maxTokens;
    
    console.log(`%c🔓 OpenRouter: Sending request (${model})...`, 'color:#ec4899;font-family:monospace;');
    
    try {
      var response = await fetch(NEXA.config.workerURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          provider: 'openrouter',
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
        console.log('%c✅ OpenRouter: Response received', 'color:#22c55e;font-family:monospace;');
        return data.choices[0].message.content;
      }
      
      throw new Error('Invalid response format from OpenRouter');
      
    } catch (error) {
      console.error('%c❌ OpenRouter Error:', 'color:#ef4444;font-family:monospace;', error);
      throw error;
    }
  },
  
  /* ═══════════════════════════════════════════════
     STREAM API (For Future)
     ═══════════════════════════════════════════════ */
  stream: async function(messages, onChunk, options = {}) {
    console.log('%c⚠️ OpenRouter: Streaming not implemented yet', 'color:#f59e0b;font-family:monospace;');
    
    // Fallback to normal call
    var result = await this.call(messages, options);
    if (onChunk) onChunk(result);
    return result;
  }
});

console.log('%c🔓 OpenRouter Provider Loaded', 'color:#ec4899;font-family:monospace;font-size:14px;font-weight:bold;');
