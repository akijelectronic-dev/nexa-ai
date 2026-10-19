# 🧠 NEXA AI — Next Generation AI Twin

![Version](https://img.shields.io/badge/version-1.0.0-a855f7)
![Author](https://img.shields.io/badge/author-AL--AMIN-06b6d4)
![License](https://img.shields.io/badge/license-MIT-green)

> **NEXA AI** is an advanced AI companion featuring **Tisha** (তিশা), a realistic AI twin. 
> Built with Liquid Glass UI (iOS 26 style), Multi-API routing, 50+ languages, Voice, Vision, and a Self-Updating System.

## ✨ Features

- 🎨 **Liquid Glass UI**: Premium iOS 26 style design with smooth animations.
- 👩 **Tisha Avatar**: Realistic SVG human character with 8 emotions, blinking, and breathing.
- 🧠 **Multi-AI Router**: Uses Groq, OpenRouter, and Gemini with auto-fallback.
- 🎤 **Voice Interface**: Speech-to-Text (Bengali/English) and Text-to-Speech (Tisha's voice).
- 📸 **Vision**: Image upload and analysis.
- 📄 **Documents**: Upload text-based docs for Q&A.
- 🎨 **Image Generation**: Create images via Pollinations AI.
- 🧠 **Memory System**: Tisha remembers facts about you (name, preferences).
- 🔄 **Auto-Update System**: Checks GitHub for new versions.
- 🌐 **PWA & Offline Mode**: Installable on Android/iOS, works offline.
- 🌍 **50+ Languages**: Auto-detects input language and replies accordingly.

## 📂 Project Structure

```text
nexa-ai/
├── index.html
├── style.css
├── manifest.json
├── service-worker.js
├── version.json
├── README.md
└── js/
    ├── core/
    │   ├── config.js
    │   ├── engine.js
    │   ├── loader.js
    │   ├── storage.js
    │   ├── version.js
    │   └── boot.js
    ├── tisha/
    │   ├── face.js
    │   ├── body.js
    │   ├── animations.js
    │   └── emotions.js
    ├── ai/
    │   ├── groq.js
    │   ├── openrouter.js
    │   └── router.js
    ├── modules/
    │   ├── chat.js
    │   ├── vision.js
    │   ├── voice.js
    │   ├── documents.js
    │   ├── memory.js
    │   └── imagegen.js
    ├── ui/
    │   ├── main-ui.js
    │   ├── chat-ui.js
    │   ├── settings.js
    │   └── notifications.js
    ├── admin/
    │   └── auth.js
    └── utils/
        ├── helpers.js
        └── language.js
