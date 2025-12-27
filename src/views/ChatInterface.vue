<template>
  <div class="chat-layout animate__animated animate__fadeIn">
    <div class="sidebar-overlay fade-in" v-if="isSidebarOpen" @click="toggleSidebar"></div>

    <aside :class="['sidebar', { 'open': isSidebarOpen }]">
      <div class="sidebar-header">
        <div class="logo-area animate__animated animate__fadeInLeft">
          <i class="fa-solid fa-layer-group"></i> wanzofc
        </div>
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
        <div v-if="savedChats.length === 0" class="no-history">no history yet</div>
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
        <div class="user-card-enhanced">
          <div class="user-info-row">
            <img :src="userAvatar || defaultAvatar" class="avatar-circle-img">
            <div class="user-details">
              <span class="u-name">{{ userName }}</span>
              <span class="tier-label" :class="userTier === 'Pro' ? 'pro-tier' : 'free-tier'">
                {{ userTier || 'Free' }} Plan
              </span>
            </div>
          </div>
          <div class="user-actions-row">
            <button @click="$router.push('/profile')" class="action-btn-small">
              <i class="fa-solid fa-gear"></i> Profile
            </button>
            <button @click="handleLogout" class="action-btn-small logout">
              <i class="fa-solid fa-right-from-bracket"></i>
            </button>
          </div>
        </div>
      </div>
    </aside>

    <main class="main-content">
      <header class="top-bar slide-in">
        <div class="left">
          <button @click="toggleSidebar" class="menu-trigger rubber-band-hover">
            <i class="fa-solid fa-bars-staggered"></i>
          </button>
          
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
          <div v-if="currentChatId" class="sharing-controls">
            <button @click="shareChat" class="icon-btn" title="Share Chat">
              <i class="fa-solid fa-share-nodes"></i>
            </button>
            <label class="switch-public" title="Toggle Public Access">
              <input type="checkbox" v-model="isPublic" @change="handlePublicToggle">
              <span class="slider-public"></span>
            </label>
            <div v-if="isPublic" class="permission-wrapper">
              <select v-model="permissionLevel" @change="handlePermissionChange">
                <option value="view">can view</option>
                <option value="edit">can edit</option>
              </select>
            </div>
          </div>
          <a href="https://github.com/wanzofc" target="_blank" class="icon-link shake-hover">
             <i class="fa-brands fa-github"></i>
          </a>
        </div>
      </header>

      <div class="chat-messages" ref="chatBox" @click="isModelMenuOpen = false">
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
          </div>
        </div>

        <div v-else class="message-list">
          <div v-for="(msg, idx) in messages" :key="idx" :class="['msg-row', msg.role, 'slide-in']">
            <div class="msg-avatar">
              <i v-if="msg.role === 'model'" class="fa-solid fa-robot"></i>
              <i v-else class="fa-solid fa-user"></i>
            </div>
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
        <div class="credits">created by wanzofc</div>
      </div>
    </main>

    <div v-if="showShareModal" class="share-modal-overlay fade-in" @click="showShareModal = false">
      <div class="share-card jack-in-the-box" @click.stop>
        <h3>share conversation</h3>
        <p>anyone with this link can view this chat.</p>
        <div class="share-link-box">
          <input type="text" :value="shareableLink" readonly>
          <button @click="copyLink">
            <i :class="isCopied ? 'fa-solid fa-check' : 'fa-regular fa-copy'"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, computed, watch } from 'vue'
import { marked } from 'marked'
import { useRouter, useRoute } from 'vue-router'
import api from '../services/api' 

marked.setOptions({ breaks: true, gfm: true })
const router = useRouter()
const route = useRoute()

const OPENROUTER_KEY = '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'
const isSidebarOpen = ref(false)
const isModelMenuOpen = ref(false)
const input = ref('')
const messages = ref([])
const isLoading = ref(false)
const isThinking = ref(false)
const chatBox = ref(null)
const savedChats = ref([])
const currentChatId = ref(null)

const userName = ref('User Dev')
const userTier = ref('Free')
const userAvatar = ref('')
const defaultAvatar = 'https://ui-avatars.com/api/?name=User&background=0ea5e9&color=fff'

const isPublic = ref(false)
const permissionLevel = ref('view')
const showShareModal = ref(false)
const shareableLink = ref('')
const isCopied = ref(false)

const availableModels = [
  { id: 'mistralai/devstral-2512:free', name: 'devstral 2512' },
  { id: 'xiaomi/mimo-v2-flash:free', name: 'mimo v2 flash' },
  { id: 'nex-agi/deepseek-v3.1-nex-n1:free', name: 'deepseek nex' }
]

const selectedModel = ref(availableModels[0].id)
const currentModelName = computed(() => availableModels.find(m => m.id === selectedModel.value)?.name)

onMounted(async () => {
  const userStr = localStorage.getItem('userData')
  if (userStr) {
    const user = JSON.parse(userStr)
    userName.value = user.username
    userTier.value = user.tier
    userAvatar.value = user.avatar
  }
  await refreshSavedChats()
  if (route.params && route.params.id) await loadChat(route.params.id)
  if (route.query && route.query.model) {
    const modelExists = availableModels.find(m => m.id === route.query.model)
    if (modelExists) selectedModel.value = route.query.model
  }
})

watch(() => route.params.id, (newId) => {
  if (newId && newId !== currentChatId.value) loadChat(newId)
  else if (!newId) resetView()
})

const handleLogout = () => {
  localStorage.clear()
  router.push('/login')
}

const refreshSavedChats = async () => {
  try {
    const res = await api.getChats()
    savedChats.value = res.data.map(c => ({
      id: c._id,
      title: c.title,
      messages: c.messages,
      model: c.model,
      isPublic: c.isPublic,
      permissionLevel: c.permissionLevel
    }))
  } catch (e) {
    console.error("History sync failed")
  }
}

const createNewChat = () => router.push({ name: 'chat', params: { id: undefined }, query: { model: selectedModel.value } })

const resetView = () => {
  currentChatId.value = null
  messages.value = []
  isSidebarOpen.value = false
  isPublic.value = false
  permissionLevel.value = 'view'
}

const loadChat = async (id) => {
  const chat = savedChats.value.find(c => c.id === id)
  if (chat) {
    currentChatId.value = id
    messages.value = chat.messages
    if (chat.model) selectedModel.value = chat.model
    isPublic.value = chat.isPublic || false
    permissionLevel.value = chat.permissionLevel || 'view'
    isSidebarOpen.value = false
    const currentRouteId = route.params ? route.params.id : null
    if (currentRouteId !== id) router.replace({ name: 'chat', params: { id: id }, query: { model: chat.model } })
  } else {
    router.push('/chat')
  }
}

const deleteChat = async (id) => {
  try {
    await api.deleteChat(id)
    savedChats.value = savedChats.value.filter(c => c.id !== id)
    if (currentChatId.value === id) router.push('/chat')
  } catch (e) {
    alert("Failed to delete chat")
  }
}

const saveCurrentChat = async () => {
  try {
    const payload = {
      id: currentChatId.value,
      title: messages.value[0]?.text?.substring(0, 30) || 'New Chat',
      model: selectedModel.value,
      messages: messages.value,
      isPublic: isPublic.value,
      permissionLevel: permissionLevel.value
    }
    const res = await api.saveChat(payload)
    if (!currentChatId.value && res.data._id) {
      currentChatId.value = res.data._id
      router.replace({ params: { id: res.data._id }, query: { model: selectedModel.value } })
      savedChats.value.unshift({ ...payload, id: res.data._id });
    }
  } catch(e) {
    console.warn("Auto-save failed")
  }
}

const shareChat = () => {
  if (!currentChatId.value) return;
  shareableLink.value = `${window.location.origin}/view/${currentChatId.value}`
  showShareModal.value = true
  isCopied.value = false
}

const copyLink = () => {
  navigator.clipboard.writeText(shareableLink.value)
  isCopied.value = true
  setTimeout(() => { isCopied.value = false }, 2000)
}

const handlePublicToggle = () => saveCurrentChat()
const handlePermissionChange = () => saveCurrentChat()

const selectModel = (model) => {
  selectedModel.value = model.id
  isModelMenuOpen.value = false
  router.replace({ query: { ...route.query, model: model.id } })
}

const toggleSidebar = () => isSidebarOpen.value = !isSidebarOpen.value
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
  await saveCurrentChat() 
  isLoading.value = true
  isThinking.value = true 
  scrollToBottom()
  try {
    const apiMessages = messages.value.filter(m => !m.isError).map(msg => ({ role: msg.role === 'model' ? 'assistant' : 'user', content: msg.text }))
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${OPENROUTER_KEY}`, 'Content-Type': 'application/json', 'HTTP-Referer': window.location.origin, 'X-Title': 'Wanzofc Dev' },
      body: JSON.stringify({ model: selectedModel.value, messages: apiMessages, stream: true })
    })
    if (!response.ok) throw new Error(`AI Error: ${response.status}`)
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
        if (line.trim().startsWith('data: ')) {
          try {
            const json = JSON.parse(line.trim().replace('data: ', ''))
            const content = json.choices[0]?.delta?.content || ''
            if (content) {
              messages.value[botMsgIndex].text += content
              scrollToBottom()
            }
          } catch (e) { }
        }
      }
    }
    await saveCurrentChat()
  } catch (error) {
    isThinking.value = false
    const lastMsg = messages.value[messages.value.length - 1]
    if (lastMsg && lastMsg.role === 'model' && !lastMsg.text) {
      lastMsg.text = `Error: ${error.message}`
      lastMsg.isError = true
    } else {
      messages.value.push({ role: 'model', text: `Error: ${error.message}`, isError: true })
    }
  } finally {
    isLoading.value = false
    scrollToBottom()
  }
}
</script>

<style scoped>
:root { --primary: #0ea5e9; --secondary: #14b8a6; }
.chat-layout { display: flex; height: 100vh; background: #0f172a; color: #e2e8f0; font-family: 'Plus Jakarta Sans', sans-serif; text-transform: lowercase; }
.sidebar { width: 280px; background: #020617; border-right: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column; position: fixed; height: 100%; z-index: 100; transform: translateX(-100%); transition: transform 0.3s; }
.sidebar.open { transform: translateX(0); }
.sidebar-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(2px); z-index: 99; }
@media (min-width: 1024px) { .sidebar { position: relative; transform: translateX(0); } .sidebar-overlay { display: none; } .menu-trigger { display: none; } }
.sidebar-header { padding: 20px; display: flex; justify-content: space-between; align-items: center; font-weight: 700; letter-spacing: 1px; }
.close-btn-cool { width: 32px; height: 32px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 50%; color: #94a3b8; display: flex; align-items: center; justify-content: center; transition: all 0.3s; }
.close-btn-cool:hover { background: #ef4444; color: white; transform: rotate(90deg); }
.new-chat-btn { width: 100%; background: #0ea5e9; color: white; padding: 12px; border-radius: 8px; font-weight: 600; margin-bottom: 20px; }
.history-list { flex: 1; padding: 10px; overflow-y: auto; }
.history-item { padding: 10px 12px; border-radius: 8px; color: #cbd5e1; font-size: 0.9rem; display: flex; gap: 10px; align-items: center; cursor: pointer; }
.history-item:hover { background: rgba(255,255,255,0.05); }
.history-item.active { background: rgba(14, 165, 233, 0.1); color: #38bdf8; border: 1px solid rgba(14, 165, 233, 0.2); }
.delete-chat-btn { background: none; color: #475569; opacity: 0; }
.history-item:hover .delete-chat-btn { opacity: 1; }
.sidebar-footer { padding: 15px; border-top: 1px solid rgba(255,255,255,0.05); }
.user-card-enhanced { background: #0f172a; border-radius: 12px; padding: 12px; border: 1px solid rgba(255,255,255,0.05); }
.avatar-circle-img { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 2px solid #0ea5e9; }
.tier-label.pro-tier { color: #f59e0b; }
.action-btn-small.logout:hover { background: rgba(239, 68, 68, 0.2); color: #ef4444; }
.main-content { flex: 1; display: flex; flex-direction: column; }
.top-bar { padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(10px); z-index: 10; }
.model-selector-btn { background: rgba(255,255,255,0.08); color: #cbd5e1; }
.dot { background: #22c55e; }
.model-menu { background: #1e293b; border: 1px solid rgba(255,255,255,0.1); }
.fa-check { color: #22c55e; }
.right { display: flex; align-items: center; gap: 15px; }
.sharing-controls { display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.05); padding: 5px 10px; border-radius: 20px; }
.icon-btn { color: #94a3b8; }
.switch-public { position: relative; display: inline-block; width: 40px; height: 22px; }
.slider-public { background-color: #334155; }
input:checked + .slider-public { background-color: #22c55e; }
input:checked + .slider-public:before { transform: translateX(18px); }
.permission-wrapper select { background: transparent; border: none; color: #94a3b8; }
.chat-messages { flex: 1; overflow-y: auto; padding: 20px; }
.msg-avatar { background: #0ea5e9; }
.user .msg-avatar { background: #475569; }
.msg-bubble { background: #1e293b; }
.user .msg-bubble { background: #334155; }
.error-content { color: #ef4444; }
.input-area { background: #0f172a; }
.input-box { background: #1e293b; }
.input-box:focus-within { border-color: #0ea5e9; }
.send-btn { background: #0ea5e9; }
.credits { text-align: center; }
.share-modal-overlay { background: rgba(0,0,0,0.8); }
.share-card { background: #1e293b; }
.share-link-box { background: #0f172a; }
.share-link-box button { background: #0ea5e9; }
/* ... (sisa style dari kode sebelumnya sama) ... */
</style>