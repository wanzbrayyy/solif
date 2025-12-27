<template>
  <div class="chat-app animate__animated animate__fadeIn">
    <!-- Chat Header -->
    <header class="chat-header">
      <div class="left-section">
        <button class="icon-btn animate__animated animate__hover-pulse">
          <i class="fa-solid fa-bars"></i>
        </button>
        <div class="url-badge animate__animated animate__slideInDown">
          <i class="fa-solid fa-lock"></i> wanzofc.dev/chat
        </div>
      </div>
      <div class="right-section">
        <button class="donate-btn animate__animated animate__rubberBand animate__delay-2s">
          <i class="fa-solid fa-heart"></i> Donate
        </button>
        <button class="icon-btn">
          <i class="fa-regular fa-pen-to-square"></i>
        </button>
      </div>
    </header>

    <!-- Main Chat Area -->
    <main class="chat-viewport">
      
      <!-- Welcome Screen (Initial State) -->
      <div v-if="messages.length === 0" class="welcome-screen">
        <div class="logo-wrapper animate__animated animate__zoomIn">
          <i class="fa-solid fa-graduation-cap big-icon"></i>
        </div>
        <h2 class="animate__animated animate__fadeInUp animate__delay-1s">
          Hello, I'm <span class="highlight">Wanzofc</span>
        </h2>
        <p class="animate__animated animate__fadeInUp animate__delay-1s">
          How can I help you today?
        </p>

        <div class="suggestion-cards animate__animated animate__fadeInUp animate__delay-2s">
          <div @click="sendSuggestion('Help me write a Python script')" class="s-card hover-scale">
            <i class="fa-solid fa-pen-nib"></i> Help me write
          </div>
          <div @click="sendSuggestion('Explain React Hooks')" class="s-card hover-scale">
            <i class="fa-solid fa-book-open"></i> Learn about
          </div>
          <div @click="sendSuggestion('Debug this Vue component')" class="s-card hover-scale">
            <i class="fa-solid fa-bug"></i> Problem solve
          </div>
          <div @click="sendSuggestion('Generate a cool CSS animation')" class="s-card hover-scale">
            <i class="fa-solid fa-code"></i> Write code
          </div>
        </div>
      </div>

      <!-- Chat History (Active State) -->
      <div v-else class="messages-list" ref="chatContainer">
        <div v-for="(msg, index) in messages" :key="index" 
             :class="['message-row', msg.role, 'animate__animated', 'animate__fadeInUp']">
          
          <div v-if="msg.role === 'model'" class="avatar bot">
            <i class="fa-solid fa-graduation-cap"></i>
          </div>
          
          <div class="message-bubble">
            <div class="markdown-body" v-html="renderContent(msg.text)"></div>
          </div>
          
          <div v-if="msg.role === 'user'" class="avatar user">
            <i class="fa-solid fa-user"></i>
          </div>
        </div>

        <div v-if="isLoading" class="message-row model animate__animated animate__pulse animate__infinite">
          <div class="avatar bot"><i class="fa-solid fa-graduation-cap"></i></div>
          <div class="message-bubble loading">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="input-container animate__animated animate__slideInUp">
        <div class="input-wrapper">
          <input 
            v-model="inputMessage" 
            @keyup.enter="sendMessage"
            type="text" 
            placeholder="Type a message... (@ for tools)"
          >
          <div class="input-actions">
            <button class="tool-btn"><i class="fa-solid fa-plus"></i></button>
            <button 
              @click="sendMessage" 
              class="send-btn" 
              :class="{ 'active': inputMessage.length > 0 }"
              :disabled="isLoading"
            >
              <i class="fa-solid fa-arrow-up"></i>
            </button>
          </div>
        </div>
        <div class="footer-text">
          Built with <i class="fa-solid fa-heart fa-beat" style="color: #ef4444;"></i> by Wanzofc Dev
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const inputMessage = ref('')
const messages = ref([])
const isLoading = ref(false)
const chatContainer = ref(null)

const API_KEY = 'AIzaSyDaasWhrWeDS2xJj08VUhmTjnaSYB1U5Ys'
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`

const sendSuggestion = (text) => {
  inputMessage.value = text
  sendMessage()
}

const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}

// Simple Markdown Parser
const renderContent = (text) => {
  if (!text) return ''
  return text
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
}

const sendMessage = async () => {
  if (!inputMessage.value.trim() || isLoading.value) return

  const userText = inputMessage.value
  messages.value.push({ role: 'user', text: userText })
  inputMessage.value = ''
  isLoading.value = true
  scrollToBottom()

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userText }] }]
      })
    })

    const data = await response.json()
    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I didn't get that."
    
    messages.value.push({ role: 'model', text: botReply })
  } catch (error) {
    messages.value.push({ role: 'model', text: "Error connecting to AI server." })
  } finally {
    isLoading.value = false
    scrollToBottom()
  }
}
</script>

<style scoped>
.chat-app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%);
  color: #1e293b;
}

/* Header */
.chat-header {
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  background: rgba(255,255,255,0.7);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.left-section, .right-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon-btn {
  background: none;
  font-size: 1.2rem;
  color: #475569;
  padding: 8px;
  border-radius: 50%;
}

.icon-btn:hover {
  background: rgba(0,0,0,0.05);
}

.url-badge {
  background: #f1f5f9;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 6px;
}

.donate-btn {
  background: #fee2e2;
  color: #ef4444;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Viewport */
.chat-viewport {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

/* Welcome Screen */
.welcome-screen {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
}

.big-icon {
  font-size: 4rem;
  color: #1e293b;
  margin-bottom: 20px;
}

.welcome-screen h2 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #0f172a;
}

.highlight {
  position: relative;
  z-index: 1;
}

.highlight::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 0;
  width: 100%;
  height: 10px;
  background: #a5b4fc;
  opacity: 0.5;
  z-index: -1;
}

.suggestion-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-top: 40px;
  width: 100%;
  max-width: 600px;
}

.s-card {
  background: rgba(255,255,255,0.6);
  padding: 20px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.8);
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
  transition: all 0.3s;
}

.s-card:hover {
  background: white;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
}

.s-card i { color: #6366f1; }

/* Messages */
.messages-list {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
}

.message-row {
  display: flex;
  gap: 15px;
  max-width: 100%;
}

.message-row.user {
  flex-direction: row-reverse;
}

.avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.bot { background: white; color: #0f172a; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
.user { background: #3b82f6; color: white; }

.message-bubble {
  background: white;
  padding: 15px 20px;
  border-radius: 20px;
  border-top-left-radius: 4px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  max-width: 80%;
  line-height: 1.6;
}

.user .message-bubble {
  background: #3b82f6;
  color: white;
  border-radius: 20px;
  border-top-right-radius: 4px;
}

.markdown-body :deep(pre) {
  background: #1e293b;
  color: #f8fafc;
  padding: 15px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 10px 0;
}

/* Loading Dots */
.loading { display: flex; gap: 5px; padding: 15px; }
.typing-dot {
  width: 6px; height: 6px; background: #94a3b8; border-radius: 50%;
  animation: typing 1.4s infinite ease-in-out both;
}
.typing-dot:nth-child(1) { animation-delay: -0.32s; }
.typing-dot:nth-child(2) { animation-delay: -0.16s; }

@keyframes typing {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

/* Input Area */
.input-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.input-wrapper {
  background: white;
  width: 100%;
  max-width: 700px;
  border-radius: 30px;
  padding: 8px 10px 8px 25px;
  display: flex;
  align-items: center;
  box-shadow: 0 5px 20px rgba(0,0,0,0.08);
  transition: box-shadow 0.3s;
}

.input-wrapper:focus-within {
  box-shadow: 0 8px 30px rgba(99, 102, 241, 0.15);
}

input {
  flex: 1;
  border: none;
  font-size: 1rem;
  color: #334155;
  background: transparent;
}

.input-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.tool-btn {
  color: #94a3b8;
  font-size: 1.2rem;
  background: none;
}

.send-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e2e8f0;
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.send-btn.active {
  background: #3b82f6;
  color: white;
  transform: rotate(0deg);
}

.send-btn.active:hover {
  transform: scale(1.1);
}

.footer-text {
  margin-top: 15px;
  font-size: 0.75rem;
  color: #94a3b8;
}

/* Helper Class for Hover Animation */
.hover-scale {
  transition: transform 0.2s;
}
.hover-scale:hover {
  transform: scale(1.02);
}
</style>