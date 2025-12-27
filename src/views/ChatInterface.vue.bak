<template>
  <div class="chat-wrapper">
    <header class="chat-header">
      <div class="header-left">
        <button class="menu-btn"><i class="fa-solid fa-bars"></i></button>
        <div class="url-display">
          <i class="fa-solid fa-lock"></i>
          <span>zeroku.vercel.app</span>
        </div>
      </div>
      <div class="header-right">
        <button class="donate-pill">
          <i class="fa-solid fa-heart"></i> Donate
        </button>
        <button class="edit-btn"><i class="fa-regular fa-pen-to-square"></i></button>
      </div>
    </header>

    <main class="chat-viewport">
      <div v-if="messages.length === 0" class="welcome-container">
        <div class="avatar-icon">
          <i class="fa-solid fa-graduation-cap"></i>
        </div>
        <h2>Hello, I'm <span class="name-highlight">Wanzofc</span></h2>
        <p class="subtitle">How can I help you today?</p>

        <div class="cards-grid">
          <button @click="fillInput('Help me write a story about AI')" class="action-card">
            <i class="fa-solid fa-pen-nib card-icon"></i>
            <span>Help me write</span>
          </button>
          <button @click="fillInput('Explain Vue 3 composition API')" class="action-card">
            <i class="fa-solid fa-book-open card-icon"></i>
            <span>Learn about</span>
          </button>
          <button @click="fillInput('Create a Python script for scraping')" class="action-card">
            <i class="fa-solid fa-code card-icon"></i>
            <span>Write code</span>
          </button>
          <button @click="fillInput('Solve 2x + 5 = 15')" class="action-card">
            <i class="fa-solid fa-brain card-icon"></i>
            <span>Problem solve</span>
          </button>
          <button class="action-card full">
            <i class="fa-regular fa-comments card-icon"></i>
            <span>Natural chat</span>
          </button>
        </div>
      </div>

      <div v-else class="messages-container" ref="msgContainer">
        <div v-for="(msg, idx) in messages" :key="idx" :class="['message-row', msg.role]">
          <div v-if="msg.role === 'model'" class="bot-avatar">
            <i class="fa-solid fa-graduation-cap"></i>
          </div>
          <div class="bubble">
            <div v-html="renderMarkdown(msg.text)"></div>
          </div>
        </div>
        <div v-if="isThinking" class="message-row model">
          <div class="bot-avatar"><i class="fa-solid fa-graduation-cap"></i></div>
          <div class="bubble thinking">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>

      <div class="input-area">
        <div class="input-box">
          <input 
            v-model="userQuery" 
            @keyup.enter="sendRequest"
            type="text" 
            placeholder="Type a message... (@ for tools)"
          >
          <div class="input-tools">
            <button class="tool-btn"><i class="fa-solid fa-plus"></i></button>
            <button class="tool-btn"><i class="fa-solid fa-wand-magic-sparkles"></i></button>
            <button 
              @click="sendRequest" 
              class="send-btn" 
              :class="{ active: userQuery.length > 0 }"
              :disabled="!userQuery || isThinking"
            >
              <i class="fa-solid fa-arrow-up"></i>
            </button>
          </div>
        </div>
        <div class="footer-info">
          Built with <i class="fa-solid fa-heart"></i> by AortaVx
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const userQuery = ref('')
const messages = ref([])
const isThinking = ref(false)
const msgContainer = ref(null)

const API_KEY = 'AIzaSyDaasWhrWeDS2xJj08VUhmTjnaSYB1U5Ys'
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`

const fillInput = (text) => {
  userQuery.value = text
}

const scrollToBottom = () => {
  nextTick(() => {
    if (msgContainer.value) {
      msgContainer.value.scrollTop = msgContainer.value.scrollHeight
    }
  })
}

const renderMarkdown = (text) => {
  if (!text) return ''
  let formatted = text
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
    .replace(/```([\s\S]*?)```/g, '<div class="code-block">$1</div>')
  return formatted
}

const sendRequest = async () => {
  if (!userQuery.value.trim()) return

  const text = userQuery.value
  messages.value.push({ role: 'user', text: text })
  userQuery.value = ''
  isThinking.value = true
  scrollToBottom()

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: text }] }]
      })
    })

    const data = await response.json()
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that."
    
    messages.value.push({ role: 'model', text: reply })
  } catch (error) {
    messages.value.push({ role: 'model', text: "Error connecting to AI service." })
  } finally {
    isThinking.value = false
    scrollToBottom()
  }
}
</script>

<style scoped>
.chat-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--bg-chat);
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
}

.header-left, .header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.menu-btn, .edit-btn {
  background: transparent;
  font-size: 1.2rem;
  color: #334155;
  padding: 8px;
}

.url-display {
  background: #f1f5f9;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 6px;
}

.donate-pill {
  background: #fee2e2;
  color: #ef4444;
  padding: 6px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  gap: 6px;
  align-items: center;
}

.chat-viewport {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

.welcome-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: fadeUp 0.6s ease;
}

.avatar-icon {
  font-size: 3.5rem;
  color: #1e293b;
  margin-bottom: 1rem;
}

h2 {
  font-size: 2rem;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.name-highlight {
  border-bottom: 3px solid #1e293b;
}

.subtitle {
  color: #64748b;
  font-size: 1.1rem;
  margin-bottom: 3rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  width: 100%;
  max-width: 600px;
}

.action-card {
  background: var(--card-white);
  padding: 16px;
  border-radius: 12px;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;
  color: #334155;
  transition: transform 0.2s, background 0.2s;
}

.action-card:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
}

.card-icon {
  color: #8b5cf6;
}

.full {
  grid-column: span 2;
  justify-content: center;
}

.messages-container {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}

.message-row {
  display: flex;
  gap: 12px;
  width: 100%;
}

.message-row.user {
  justify-content: flex-end;
}

.bot-avatar {
  width: 36px;
  height: 36px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1e293b;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  flex-shrink: 0;
}

.bubble {
  max-width: 80%;
  padding: 12px 18px;
  border-radius: 18px;
  line-height: 1.5;
  font-size: 1rem;
}

.user .bubble {
  background: #3b82f6;
  color: white;
  border-bottom-right-radius: 4px;
}

.model .bubble {
  background: white;
  color: #1e293b;
  border-bottom-left-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.thinking {
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 15px;
}

.thinking span {
  width: 6px;
  height: 6px;
  background: #94a3b8;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;
}

.thinking span:nth-child(1) { animation-delay: -0.32s; }
.thinking span:nth-child(2) { animation-delay: -0.16s; }

.input-area {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.input-box {
  background: white;
  width: 100%;
  max-width: 700px;
  border-radius: 28px;
  padding: 8px 8px 8px 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}

.input-box input {
  flex: 1;
  border: none;
  font-size: 1rem;
  color: #1e293b;
}

.input-tools {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tool-btn {
  background: transparent;
  color: #94a3b8;
  font-size: 1.1rem;
  padding: 8px;
}

.tool-btn:hover {
  color: #64748b;
}

.send-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f1f5f9;
  color: #cbd5e1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.send-btn.active {
  background: #3b82f6;
  color: white;
}

.footer-info {
  margin-top: 12px;
  font-size: 0.75rem;
  color: #64748b;
}

.footer-info .fa-heart {
  color: #ef4444;
}

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

:deep(.code-block) {
  background: #1e293b;
  color: #cbd5e1;
  padding: 10px;
  border-radius: 8px;
  font-family: monospace;
  margin-top: 5px;
  white-space: pre-wrap;
}
</style>