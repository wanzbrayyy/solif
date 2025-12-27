<template>
  <div class="chat-layout animate__animated animate__fadeIn">
    <!-- Responsive Sidebar Overlay -->
    <div class="sidebar-overlay fade-in" v-if="isSidebarOpen" @click="toggleSidebar"></div>

    <!-- Sidebar / Navigation -->
    <aside :class="['sidebar', { 'open': isSidebarOpen }]">
      <div class="sidebar-header">
        <div class="logo-area animate__animated animate__fadeInLeft">
          <i class="fa-solid fa-layer-group"></i> wanzofc
        </div>
        <!-- Tombol Close Keren -->
        <button class="close-btn-cool" @click="toggleSidebar">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      
      <div class="new-chat-btn-wrapper">
        <button @click="createNewChat" class="new-chat-btn pulse-hover">
          <i class="fa-solid fa-plus"></i> new chat
        </button>
      </div>

      <div class="history-list">
        <div class="history-label">recent chats</div>
        
        <div v-if="savedChats.length === 0" class="no-history">
          no history yet
        </div>

        <div 
          v-for="chat in savedChats" 
          :key="chat.id" 
          @click="loadChat(chat.id)"
          :class="['history-item', 'slide-in', { 'active': currentChatId === chat.id }]"
        >
          <i class="fa-regular fa-message"></i>
          <span class="chat-title">{{ chat.title || 'New Conversation' }}</span>
          <button @click.stop="deleteChat(chat.id)" class="delete-chat-btn">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>

      <div class="sidebar-footer">
        <div class="user-card">
          <div class="avatar-circle">{{ userInitial }}</div>
          <div class="user-info">
            <span class="u-email">{{ userEmail }}</span>
            <span class="u-plan">pro plan</span>
          </div>
          <button @click="handleLogout" class="logout-icon-btn" title="Logout">
            <i class="fa-solid fa-right-from-bracket"></i>
          </button>
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
          
          <!-- MODEL SELECTOR DROPDOWN -->
          <div class="model-dropdown-wrapper">
            <button @click="isModelMenuOpen = !isModelMenuOpen" class="model-selector-btn">
              <span class="dot"></span> 
              {{ currentModelName }}
              <i class="fa-solid fa-chevron-down" :class="{ 'rotate-icon': isModelMenuOpen }"></i>
            </button>
            
            <div v-if="isModelMenuOpen" class="model-menu jack-in-the-box">
              <div 
                v-for="model in availableModels" 
                :key="model.id" 
                class="model-item"
                @click="selectModel(model)"
              >
                <div class="model-info">
                  <span class="model-name">{{ model.name }}</span>
                  <span class="model-id">{{ model.id }}</span>
                </div>
                <i v-if="selectedModel === model.id" class="fa-solid fa-check"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="right">
          <a href="https://github.com/wanzofc" target="_blank" class="icon-link shake-hover">
             <i class="fa-brands fa-github"></i>
          </a>
        </div>
      </header>

      <!-- Chat Container -->
      <div class="chat-messages" ref="chatBox" @click="isModelMenuOpen = false">
        
        <!-- Empty State -->
        <div v-if="messages.length === 0" class="empty-state">
          <div class="ai-avatar zoom-in">
            <i class="fa-solid fa-robot"></i>
          </div>
          <h2 class="fade-in">how can <span class="gradient">wanzofc ai</span> help?</h2>
          
          <div class="suggestion-grid jack-in-the-box">
            <button @click="sendPrompt('explain quantum computing simply')" class="card-sug">
              <i class="fa-solid fa-atom"></i> explain concept
            </button>
            <button @click="sendPrompt('write a python script for web scraping')" class="card-sug">
              <i class="fa-brands fa-python"></i> python script
            </button>
            <button @click="sendPrompt('debug this react code snippet')" class="card-sug">
              <i class="fa-brands fa-react"></i> debug code
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
            
            <!-- Message Bubble -->
            <div class="msg-bubble-wrapper">
              <div class="msg-bubble">
                <div v-if="msg.isError" class="error-content">
                  <i class="fa-solid fa-triangle-exclamation"></i> {{ msg.text }}
                </div>
                <div v-else class="md-content" v-html="renderMarkdown(msg.text)"></div>
                <span v-if="isLoading && idx === messages.length - 1 && msg.role === 'model'" class="cursor-blink">|</span>
              </div>
            </div>

          </div>
          
          <div v-if="isThinking" class="msg-row model fade-in">
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
            placeholder="ask anything..."
            rows="1"
            ref="textarea"
          ></textarea>
          <button @click="sendMessage" :disabled="isLoading || !input.trim()" class="send-btn">
            <i v-if="isLoading" class="fa-solid fa-square fa-fade"></i>
            <i v-else class="fa-solid fa-paper-plane"></i>
          </button>
        </div>
        <div class="credits">using {{ currentModelName }} via openrouter</div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, computed, watch } from 'vue'
import { marked } from 'marked'
import { useRouter, useRoute } from 'vue-router'

marked.setOptions({ breaks: true, gfm: true })
const router = useRouter()
const route = useRoute()

// --- API Configuration ---
const API_KEY = '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'

// --- State ---
const isSidebarOpen = ref(false)
const isModelMenuOpen = ref(false)
const input = ref('')
const messages = ref([])
const isLoading = ref(false)
const isThinking = ref(false)
const chatBox = ref(null)
const userEmail = ref('')
const savedChats = ref([]) // Real-time chat list
const currentChatId = ref(null)

// --- Model Selection ---
const availableModels = [
  { id: 'mistralai/devstral-2512:free', name: 'devstral 2512' },
  { id: 'xiaomi/mimo-v2-flash:free', name: 'mimo v2 flash' },
  { id: 'nex-agi/deepseek-v3.1-nex-n1:free', name: 'deepseek nex' }
]

const selectedModel = ref(availableModels[0].id)
const currentModelName = computed(() => availableModels.find(m => m.id === selectedModel.value)?.name)

// --- Lifecycle & Auth ---
onMounted(() => {
  const email = localStorage.getItem('user')
  if (email) userEmail.value = email
  refreshSavedChats()

  // Handle URL Load
  if (route.params.id) {
    loadChat(route.params.id)
  }
  if (route.query.model) {
    const modelExists = availableModels.find(m => m.id === route.query.model)
    if (modelExists) selectedModel.value = route.query.model
  }
})

// Watch route changes to load chat or new chat
watch(() => route.params.id, (newId) => {
  if (newId) {
    loadChat(newId)
  } else {
    resetView()
  }
})

const userInitial = computed(() => userEmail.value ? userEmail.value.charAt(0).toUpperCase() : 'U')

const handleLogout = () => {
  localStorage.removeItem('isAuth')
  localStorage.removeItem('user')
  router.push('/login')
}

// --- History & LocalStorage Logic ---
const refreshSavedChats = () => {
  const chats = JSON.parse(localStorage.getItem('chat_history') || '[]')
  // Sort by newest
  savedChats.value = chats.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
}

const createNewChat = () => {
  router.push({ 
    name: 'chat', 
    query: { model: selectedModel.value } // Keep current model setting
  })
}

const resetView = () => {
  currentChatId.value = null
  messages.value = []
  isSidebarOpen.value = false
}

const loadChat = (id) => {
  const chats = JSON.parse(localStorage.getItem('chat_history') || '[]')
  const chat = chats.find(c => c.id === id)
  
  if (chat) {
    currentChatId.value = id
    messages.value = chat.messages
    if (chat.model) selectedModel.value = chat.model
    isSidebarOpen.value = false
    
    // Update URL if not already there without reloading
    if (route.params.id !== id) {
      router.replace({ 
        name: 'chat', 
        params: { id: id },
        query: { model: chat.model }
      })
    }
  } else {
    // If chat not found (e.g. deleted), go to new chat
    router.push('/chat')
  }
}

const deleteChat = (id) => {
  let chats = JSON.parse(localStorage.getItem('chat_history') || '[]')
  chats = chats.filter(c => c.id !== id)
  localStorage.setItem('chat_history', JSON.stringify(chats))
  refreshSavedChats()
  
  if (currentChatId.value === id) {
    router.push('/chat')
  }
}

const saveCurrentChat = () => {
  let chats = JSON.parse(localStorage.getItem('chat_history') || '[]')
  
  if (!currentChatId.value) {
    // Generate UUID v4 logic simple
    currentChatId.value = crypto.randomUUID()
    
    // Update URL
    router.replace({ 
      name: 'chat', 
      params: { id: currentChatId.value },
      query: { model: selectedModel.value } 
    })
  }

  const existingIndex = chats.findIndex(c => c.id === currentChatId.value)
  
  // Create Title from first message
  let title = 'New Conversation'
  if (messages.value.length > 0) {
    title = messages.value[0].text.substring(0, 30)
    if (messages.value[0].text.length > 30) title += '...'
  }

  const chatData = {
    id: currentChatId.value,
    timestamp: new Date().toISOString(),
    title: title,
    messages: messages.value,
    model: selectedModel.value
  }

  if (existingIndex > -1) {
    chats[existingIndex] = chatData
  } else {
    chats.push(chatData)
  }

  localStorage.setItem('chat_history', JSON.stringify(chats))
  refreshSavedChats()
}

// --- Chat Functions ---
const selectModel = (model) => {
  selectedModel.value = model.id
  isModelMenuOpen.value = false
  
  // Update Query Param
  router.replace({
    query: { ...route.query, model: model.id }
  })

  // If inside a chat, update the chat model metadata
  if (currentChatId.value) {
    saveCurrentChat()
  }
}

const toggleSidebar = () => { isSidebarOpen.value = !isSidebarOpen.value }
const sendPrompt = (text) => { input.value = text; sendMessage() }

const renderMarkdown = (text) => {
  if (!text) return ''
  try { return marked.parse(text) } catch (e) { return text }
}

const scrollToBottom = () => {
  nextTick(() => { if (chatBox.value) chatBox.value.scrollTop = chatBox.value.scrollHeight })
}

const sendMessage = async () => {
  if (!input.value.trim() || isLoading.value) return

  const userText = input.value
  input.value = ''
  messages.value.push({ role: 'user', text: userText })
  
  saveCurrentChat() // Save immediately user message

  isLoading.value = true
  isThinking.value = true 
  scrollToBottom()

  try {
    const apiMessages = messages.value
      .filter(m => !m.isError)
      .map(msg => ({
        role: msg.role === 'model' ? 'assistant' : 'user',
        content: msg.text
      }))

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Wanzofc Dev'
      },
      body: JSON.stringify({
        model: selectedModel.value,
        messages: apiMessages,
        stream: true 
      })
    })

    if (!response.ok) throw new Error(`API Error: ${response.status}`)
    if (!response.body) throw new Error('ReadableStream not supported.')

    const reader = response.body.getReader()
    const decoder = new TextDecoder("utf-8")
    
    isThinking.value = false 
    messages.value.push({ role: 'model', text: '' })
    const botMsgIndex = messages.value.length - 1

    let buffer = '' 
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value, { stream: true })
      buffer += chunk
      
      const lines = buffer.split('\n')
      buffer = lines.pop()

      for (const line of lines) {
        const trimmedLine = line.trim()
        if (!trimmedLine || trimmedLine === 'data: [DONE]') continue
        
        if (trimmedLine.startsWith('data: ')) {
          try {
            const jsonStr = trimmedLine.replace('data: ', '')
            const json = JSON.parse(jsonStr)
            const content = json.choices[0]?.delta?.content || ''
            if (content) {
              messages.value[botMsgIndex].text += content
              scrollToBottom()
            }
          } catch (e) { }
        }
      }
    }
    
    saveCurrentChat() // Save after generation

  } catch (error) {
    isThinking.value = false
    let errorText = `Error: ${error.message}`
    if (error.message.includes("401")) errorText = "auth failed: check key."
    
    const lastMsg = messages.value[messages.value.length - 1]
    if (lastMsg && lastMsg.role === 'model' && !lastMsg.text) {
      lastMsg.text = errorText
      lastMsg.isError = true
    } else {
      messages.value.push({ role: 'model', text: errorText, isError: true })
    }
  } finally {
    isLoading.value = false
    scrollToBottom()
  }
}
</script>

<style scoped>
/* Vibe: Clean, Dark, Lowercase, Responsive */
.chat-layout { display: flex; height: 100vh; background: #0f172a; color: #e2e8f0; position: relative; overflow: hidden; font-family: 'Plus Jakarta Sans', sans-serif; text-transform: lowercase; }

/* === SIDEBAR === */
.sidebar { width: 280px; background: #020617; border-right: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column; position: fixed; height: 100%; z-index: 100; transform: translateX(-100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.sidebar.open { transform: translateX(0); }
.sidebar-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(2px); z-index: 99; }

@media (min-width: 1024px) { 
  .sidebar { position: relative; transform: translateX(0); } 
  .sidebar-overlay { display: none; } 
  .menu-trigger { display: none; } 
}

/* Header & Cool Close Button */
.sidebar-header { padding: 20px; display: flex; justify-content: space-between; align-items: center; font-weight: 700; letter-spacing: 1px; }

.close-btn-cool {
  width: 32px; height: 32px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 50%;
  color: #94a3b8;
  display: flex;
  align-items: center; justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}
.close-btn-cool:hover {
  background: #ef4444;
  color: white;
  transform: rotate(90deg);
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.4);
}

@media (min-width: 1024px) { .close-btn-cool { display: none; } }

/* Chat List */
.new-chat-btn { width: 100%; background: #6366f1; color: white; padding: 12px; border-radius: 8px; display: flex; align-items: center; justify-content: center; gap: 10px; font-weight: 600; margin-bottom: 20px; }
.history-list { flex: 1; padding: 10px; overflow-y: auto; }
.history-label { font-size: 0.75rem; color: #64748b; margin-bottom: 10px; padding-left: 10px; text-transform: uppercase; letter-spacing: 1px; }
.no-history { color: #475569; font-size: 0.8rem; text-align: center; margin-top: 20px; font-style: italic; }

.history-item { 
  padding: 10px 12px; 
  border-radius: 8px; 
  color: #cbd5e1; 
  font-size: 0.9rem; 
  display: flex; 
  gap: 10px; 
  align-items: center; 
  cursor: pointer; 
  transition: 0.2s; 
  position: relative;
  overflow: hidden;
}
.history-item:hover { background: rgba(255,255,255,0.05); }
.history-item.active { background: rgba(99, 102, 241, 0.1); color: #818cf8; border: 1px solid rgba(99, 102, 241, 0.2); }

.chat-title { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1; }
.delete-chat-btn { background: none; color: #475569; opacity: 0; transition: 0.2s; font-size: 0.8rem; }
.history-item:hover .delete-chat-btn { opacity: 1; }
.delete-chat-btn:hover { color: #ef4444; }

/* Responsive Sidebar Footer */
.sidebar-footer { 
  padding: 15px; 
  border-top: 1px solid rgba(255,255,255,0.05); 
  background: #020617; 
}

.user-card {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #0f172a;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.05);
}

.avatar-circle { width: 36px; height: 36px; background: #6366f1; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; font-weight: 700; color: white; flex-shrink: 0; }

.user-info { 
  display: flex; flex-direction: column; 
  overflow: hidden; 
  flex: 1;
}

.u-email { 
  font-size: 0.85rem; 
  color: #f1f5f9; 
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
}

.u-plan { font-size: 0.7rem; color: #22c55e; font-weight: 600; }

.logout-icon-btn { 
  background: transparent; 
  color: #64748b; 
  font-size: 1.1rem; 
  padding: 5px; 
  flex-shrink: 0;
  transition: 0.2s;
}
.logout-icon-btn:hover { color: #ef4444; transform: scale(1.1); }


/* === MAIN CONTENT === */
.main-content { flex: 1; display: flex; flex-direction: column; background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%); width: 100%; }

.top-bar { padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(10px); z-index: 10; width: 100%; box-sizing: border-box; }
.menu-trigger { font-size: 1.2rem; background: transparent; color: white; margin-right: 15px; }

/* Model Selector */
.model-dropdown-wrapper { position: relative; }
.model-selector-btn { display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.08); padding: 8px 16px; border-radius: 20px; color: #cbd5e1; font-size: 0.9rem; transition: 0.2s; border: 1px solid transparent; min-width: 160px; justify-content: space-between; }
.model-selector-btn:hover { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.1); }
.dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 8px #22c55e; }
.rotate-icon { transform: rotate(180deg); }

.model-menu { position: absolute; top: 120%; left: 0; background: #1e293b; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; width: 260px; padding: 5px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); z-index: 50; }
.model-item { display: flex; justify-content: space-between; align-items: center; padding: 10px 12px; border-radius: 8px; cursor: pointer; transition: 0.2s; }
.model-item:hover { background: rgba(255,255,255,0.05); }
.model-info { display: flex; flex-direction: column; }
.model-name { font-weight: 600; color: #f1f5f9; }
.model-id { font-size: 0.7rem; color: #64748b; font-family: monospace; margin-top: 2px; }
.fa-check { color: #22c55e; }

/* Chat Area & RESPONSIVENESS FIX */
.chat-messages { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; align-items: center; width: 100%; box-sizing: border-box; }

/* Messages */
.message-list { width: 100%; max-width: 800px; display: flex; flex-direction: column; gap: 20px; padding-bottom: 20px; }
.msg-row { display: flex; gap: 15px; width: 100%; }
.msg-row.user { flex-direction: row-reverse; }

.msg-avatar { width: 36px; height: 36px; border-radius: 6px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.model .msg-avatar { background: #6366f1; color: white; }
.user .msg-avatar { background: #475569; color: white; }

/* BUBBLE RESPONSIVE FIX */
.msg-bubble-wrapper {
  max-width: 85%;
  min-width: 0; /* Flexbox overflow fix */
}

.msg-bubble { 
  background: #1e293b; 
  padding: 15px 20px; 
  border-radius: 12px; 
  line-height: 1.6; 
  font-size: 0.95rem; 
  border: 1px solid rgba(255,255,255,0.05); 
  /* Critical for responsive text */
  overflow-wrap: break-word; 
  word-wrap: break-word;
  word-break: break-word;
}
.user .msg-bubble { background: #334155; border-color: transparent; }

/* Markdown Content Responsive Fix */
.md-content :deep(p) { margin-bottom: 10px; }
.md-content :deep(p:last-child) { margin-bottom: 0; }
.md-content :deep(pre) { 
  background: #020617; 
  padding: 15px; 
  border-radius: 8px; 
  overflow-x: auto; /* Scrollbar for code */
  margin: 10px 0; 
  border: 1px solid rgba(255,255,255,0.1); 
  max-width: 100%;
}
.md-content :deep(code) { font-family: 'Fira Code', monospace; color: #a5b4fc; }
.md-content :deep(ul), .md-content :deep(ol) { margin-left: 20px; margin-bottom: 10px; }

/* Input */
.input-area { padding: 20px; background: #0f172a; display: flex; flex-direction: column; align-items: center; width: 100%; box-sizing: border-box; }
.input-box { width: 100%; max-width: 800px; background: #1e293b; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 10px 15px; display: flex; align-items: flex-end; gap: 10px; transition: 0.3s; }
.input-box:focus-within { border-color: #6366f1; box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2); }
textarea { flex: 1; background: transparent; border: none; resize: none; color: white; padding: 10px 0; min-height: 24px; }
.send-btn { background: #6366f1; color: white; width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; transition: 0.2s; flex-shrink: 0; }
.send-btn:disabled { background: #334155; color: #64748b; cursor: not-allowed; }
.credits { margin-top: 10px; font-size: 0.7rem; color: #64748b; }

/* Animations & Helpers */
.cursor-blink { display: inline-block; width: 6px; background: #a855f7; animation: blink 1s step-end infinite; }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

.dot-flashing { position: relative; width: 6px; height: 6px; border-radius: 5px; background-color: #9880ff; animation: dot-flashing 1s infinite linear alternate; animation-delay: 0.5s; margin: 0 10px; }
.dot-flashing::before, .dot-flashing::after { content: ""; display: inline-block; position: absolute; top: 0; }
.dot-flashing::before { left: -12px; width: 6px; height: 6px; border-radius: 5px; background-color: #9880ff; animation: dot-flashing 1s infinite alternate; animation-delay: 0s; }
.dot-flashing::after { left: 12px; width: 6px; height: 6px; border-radius: 5px; background-color: #9880ff; animation: dot-flashing 1s infinite alternate; animation-delay: 1s; }
@keyframes dot-flashing { 0% { background-color: #9880ff; } 50%, 100% { background-color: rgba(152, 128, 255, 0.2); } }

.empty-state { margin-top: 5vh; text-align: center; max-width: 600px; width: 100%; }
.ai-avatar { width: 70px; height: 70px; background: white; color: #6366f1; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 2rem; box-shadow: 0 0 30px rgba(255,255,255,0.1); }
.suggestion-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 40px; }
.card-sug { background: #1e293b; border: 1px solid rgba(255,255,255,0.05); padding: 15px; border-radius: 12px; color: #cbd5e1; text-align: left; display: flex; gap: 10px; align-items: center; transition: 0.2s; }
.card-sug:hover { background: #334155; transform: translateY(-3px); }
</style>