<template>
  <div class="chat-layout">
    <!-- Responsive Sidebar Overlay -->
    <div class="sidebar-overlay fade-in" v-if="isSidebarOpen" @click="toggleSidebar"></div>

    <!-- Sidebar / Navigation -->
    <aside :class="['sidebar', { 'open': isSidebarOpen }]">
      <div class="sidebar-header">
        <div class="logo-area">
          <i class="fa-solid fa-layer-group"></i> Wanzofc
        </div>
        <button class="close-btn" @click="toggleSidebar"><i class="fa-solid fa-xmark"></i></button>
      </div>
      
      <div class="new-chat-btn-wrapper">
        <button @click="resetChat" class="new-chat-btn pulse-hover">
          <i class="fa-solid fa-plus"></i> New Chat
        </button>
      </div>

      <div class="history-list">
        <div class="history-label">Today</div>
        <div class="history-item slide-in" style="animation-delay: 0.1s">
          <i class="fa-regular fa-message"></i> Python Script Help
        </div>
        <div class="history-item slide-in" style="animation-delay: 0.2s">
          <i class="fa-regular fa-message"></i> Vue Animation Logic
        </div>
      </div>

      <div class="sidebar-footer">
        <div class="user-profile">
          <div class="avatar-circle">U</div>
          <span>User Dev</span>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <header class="top-bar slide-in">
        <div class="left">
          <button @click="toggleSidebar" class="menu-trigger rubber-band-hover">
            <i class="fa-solid fa-bars-staggered"></i>
          </button>
          <div class="model-selector">
            <span class="dot"></span> Gemini 2.0 Flash
          </div>
        </div>
        <div class="right">
          <a href="https://github.com/wanzofc" target="_blank" class="icon-link shake-hover">
             <i class="fa-brands fa-github"></i>
          </a>
        </div>
      </header>

      <!-- Chat Container -->
      <div class="chat-messages" ref="chatBox">
        
        <!-- Empty State / Welcome -->
        <div v-if="messages.length === 0" class="empty-state">
          <div class="ai-avatar zoom-in">
            <i class="fa-solid fa-robot"></i>
          </div>
          <h2 class="fade-in">How can <span class="gradient">Wanzofc</span> help?</h2>
          
          <div class="suggestion-grid jack-in-the-box">
            <button @click="sendPrompt('Write a Python script for web scraping')" class="card-sug">
              <i class="fa-brands fa-python"></i> Python Script
            </button>
            <button @click="sendPrompt('Explain Quantum Computing simply')" class="card-sug">
              <i class="fa-solid fa-atom"></i> Explain Concept
            </button>
            <button @click="sendPrompt('Debug this React code snippet')" class="card-sug">
              <i class="fa-brands fa-react"></i> Debug Code
            </button>
            <button @click="sendPrompt('Create a CSS animation keyframe')" class="card-sug">
              <i class="fa-brands fa-css3-alt"></i> CSS Animation
            </button>
          </div>
        </div>

        <!-- Message List -->
        <div v-else class="message-list">
          <div v-for="(msg, idx) in messages" :key="idx" :class="['msg-row', msg.role, 'slide-in']">
            <div class="msg-avatar">
              <i v-if="msg.role === 'model'" class="fa-solid fa-robot"></i>
              <i v-else class="fa-solid fa-user"></i>
            </div>
            <div class="msg-bubble">
              <div class="md-content" v-html="renderMarkdown(msg.text)"></div>
            </div>
          </div>
          
          <!-- Loading Indicator -->
          <div v-if="isLoading" class="msg-row model fade-in">
            <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
            <div class="msg-bubble loading-bubble">
              <div class="dot-flashing"></div>
            </div>
          </div>
        </div>

      </div>

      <!-- Input Area -->
      <div class="input-area wipe-in">
        <div class="input-box">
          <textarea 
            v-model="input" 
            @keydown.enter.prevent="sendMessage"
            placeholder="Ask anything..."
            rows="1"
            ref="textarea"
          ></textarea>
          <button @click="sendMessage" :disabled="isLoading || !input.trim()" class="send-btn">
            <i v-if="isLoading" class="fa-solid fa-spinner fa-spin"></i>
            <i v-else class="fa-solid fa-paper-plane"></i>
          </button>
        </div>
        <div class="credits">AI can make mistakes. Check important info.</div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { marked } from 'marked'

// Setup Marked for Code Highlighting
marked.setOptions({
  breaks: true,
  gfm: true
})

const isSidebarOpen = ref(false)
const input = ref('')
const messages = ref([])
const isLoading = ref(false)
const chatBox = ref(null)

// IMPORTANT: API Configuration
// Using generic v1beta endpoint structure that works with key provided
const API_KEY = 'AIzaSyDaasWhrWeDS2xJj08VUhmTjnaSYB1U5Ys'
// Changed model to gemini-1.5-flash or gemini-pro if 2.0-flash is not publicly active yet, 
// but user requested 2.0-flash specifically in curl. Keeping curl logic.
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const resetChat = () => {
  messages.value = []
  isSidebarOpen.value = false
}

const sendPrompt = (text) => {
  input.value = text
  sendMessage()
}

const renderMarkdown = (text) => {
  try {
    return marked.parse(text)
  } catch (e) {
    return text
  }
}

const scrollToBottom = () => {
  nextTick(() => {
    if (chatBox.value) chatBox.value.scrollTop = chatBox.value.scrollHeight
  })
}

const sendMessage = async () => {
  if (!input.value.trim() || isLoading.value) return

  const userText = input.value
  messages.value.push({ role: 'user', text: userText })
  input.value = ''
  isLoading.value = true
  scrollToBottom()

  try {
    const payload = {
      contents: [
        {
          parts: [{ text: userText }]
        }
      ]
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    const data = await response.json()
    
    // Improved Response Parsing to avoid "Sorry I didn't get that"
    let botText = "No response generated."
    
    if (data.candidates && data.candidates.length > 0 && data.candidates[0].content) {
       botText = data.candidates[0].content.parts[0].text;
    } else if (data.promptFeedback && data.promptFeedback.blockReason) {
       botText = `Blocked by safety filters: ${data.promptFeedback.blockReason}`;
    }

    messages.value.push({ role: 'model', text: botText })

  } catch (error) {
    console.error(error)
    messages.value.push({ 
      role: 'model', 
      text: `**Error:** Could not connect to Gemini AI. (${error.message})` 
    })
  } finally {
    isLoading.value = false
    scrollToBottom()
  }
}
</script>

<style scoped>
.chat-layout {
  display: flex;
  height: 100vh;
  background: #0f172a; /* Dark theme Chat */
  color: #e2e8f0;
  position: relative;
  overflow: hidden;
}

/* Sidebar Styling */
.sidebar {
  width: 280px;
  background: #020617;
  border-right: 1px solid rgba(255,255,255,0.05);
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  z-index: 100;
  transform: translateX(-100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar.open { transform: translateX(0); }

.sidebar-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(2px);
  z-index: 99;
}

@media (min-width: 1024px) {
  .sidebar { position: relative; transform: translateX(0); }
  .sidebar-overlay { display: none; }
  .menu-trigger { display: none; }
}

.sidebar-header {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  letter-spacing: 1px;
}

.new-chat-btn-wrapper { padding: 0 15px 20px; }
.new-chat-btn {
  width: 100%;
  background: var(--primary);
  color: white;
  padding: 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 600;
  transition: 0.2s;
}
.new-chat-btn:hover { background: #4f46e5; }

.history-list { flex: 1; padding: 10px; overflow-y: auto; }
.history-label { font-size: 0.75rem; color: #64748b; margin-bottom: 10px; padding-left: 10px; }
.history-item {
  padding: 10px 12px;
  border-radius: 6px;
  color: #cbd5e1;
  font-size: 0.9rem;
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  transition: 0.2s;
}
.history-item:hover { background: rgba(255,255,255,0.05); }

.sidebar-footer { padding: 20px; border-top: 1px solid rgba(255,255,255,0.05); }
.user-profile { display: flex; align-items: center; gap: 10px; }
.avatar-circle { width: 32px; height: 32px; background: #334155; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; }

/* Main Content */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
}

.top-bar {
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(10px);
  z-index: 10;
}

.menu-trigger { font-size: 1.2rem; background: transparent; color: white; padding: 5px; margin-right: 15px; }

.model-selector {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.05);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  color: #cbd5e1;
}
.dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 8px #22c55e; }

.icon-link { color: #94a3b8; font-size: 1.2rem; transition: 0.2s; }
.icon-link:hover { color: white; }

/* Chat Area */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.empty-state {
  margin-top: 5vh;
  text-align: center;
  max-width: 600px;
  width: 100%;
}

.ai-avatar {
  width: 70px;
  height: 70px;
  background: white;
  color: var(--primary);
  border-radius: 50%;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  box-shadow: 0 0 30px rgba(255,255,255,0.1);
}

.suggestion-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 40px;
}

.card-sug {
  background: #1e293b;
  border: 1px solid rgba(255,255,255,0.05);
  padding: 15px;
  border-radius: 12px;
  color: #cbd5e1;
  text-align: left;
  display: flex;
  gap: 10px;
  align-items: center;
  transition: 0.2s;
}
.card-sug:hover { background: #334155; transform: translateY(-3px); }

/* Messages */
.message-list { width: 100%; max-width: 800px; display: flex; flex-direction: column; gap: 20px; padding-bottom: 20px; }

.msg-row { display: flex; gap: 15px; width: 100%; }
.msg-row.user { flex-direction: row-reverse; }

.msg-avatar { width: 36px; height: 36px; border-radius: 6px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.model .msg-avatar { background: var(--primary); color: white; }
.user .msg-avatar { background: #475569; color: white; }

.msg-bubble {
  background: #1e293b;
  padding: 15px 20px;
  border-radius: 12px;
  max-width: 85%;
  line-height: 1.6;
  font-size: 0.95rem;
  border: 1px solid rgba(255,255,255,0.05);
}
.user .msg-bubble { background: #334155; border-color: transparent; }

/* Input */
.input-area {
  padding: 20px;
  background: #0f172a;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-box {
  width: 100%;
  max-width: 800px;
  background: #1e293b;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  padding: 10px 15px;
  display: flex;
  align-items: flex-end;
  gap: 10px;
  transition: 0.3s;
}

.input-box:focus-within { border-color: var(--primary); box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2); }

textarea {
  flex: 1;
  background: transparent;
  border: none;
  resize: none;
  color: white;
  padding: 10px 0;
  min-height: 24px;
}

.send-btn {
  background: var(--primary);
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
}
.send-btn:disabled { background: #334155; color: #64748b; cursor: not-allowed; }

.credits { margin-top: 10px; font-size: 0.7rem; color: #64748b; }

/* Markdown Styles */
.md-content :deep(pre) {
  background: #020617;
  padding: 15px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 10px 0;
  border: 1px solid rgba(255,255,255,0.1);
}
.md-content :deep(code) { font-family: 'Fira Code', monospace; color: #a5b4fc; }

/* Loading Animation */
.dot-flashing {
  position: relative;
  width: 6px; height: 6px;
  border-radius: 5px;
  background-color: #9880ff;
  color: #9880ff;
  animation: dot-flashing 1s infinite linear alternate;
  animation-delay: 0.5s;
  margin: 0 10px;
}
.dot-flashing::before, .dot-flashing::after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 0;
}
.dot-flashing::before { left: -12px; width: 6px; height: 6px; border-radius: 5px; background-color: #9880ff; animation: dot-flashing 1s infinite alternate; animation-delay: 0s; }
.dot-flashing::after { left: 12px; width: 6px; height: 6px; border-radius: 5px; background-color: #9880ff; animation: dot-flashing 1s infinite alternate; animation-delay: 1s; }

@keyframes dot-flashing { 0% { background-color: #9880ff; } 50%, 100% { background-color: rgba(152, 128, 255, 0.2); } }

.shake-hover:hover { animation: shake 0.5s; }
.pulse-hover:hover { animation: pulse 1s infinite; }
</style>