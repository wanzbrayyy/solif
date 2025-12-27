<template>
  <div class="public-view-layout">
    <div class="chat-container">
      <div v-if="isLoading" class="loading-state">
        <i class="fa-solid fa-spinner fa-spin"></i> loading shared chat...
      </div>

      <div v-if="error" class="error-state">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <h2>{{ error }}</h2>
        <p>this chat may be private or has been deleted.</p>
        <router-link to="/" class="back-home-btn">go to home</router-link>
      </div>

      <div v-if="!isLoading && !error" class="chat-content">
        <div class="chat-header">
          <h2 class="chat-title">{{ chatData.title || 'Shared Conversation' }}</h2>
          <p class="meta-info">last updated: {{ formattedDate }} · model: {{ chatData.model }}</p>
        </div>

        <div class="message-list">
          <div v-for="(msg, idx) in chatData.messages" :key="idx" :class="['msg-row', msg.role]">
            <div class="msg-avatar">
              <i v-if="msg.role === 'model'" class="fa-solid fa-robot"></i>
              <i v-else class="fa-solid fa-user"></i>
            </div>
            <div class="msg-bubble-wrapper">
              <div class="msg-bubble">
                <div class="md-content" v-html="renderMarkdown(msg.text)"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="public-footer">
      <p>viewing a conversation from <strong>wanzofc ai</strong></p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import api from '../services/api' 

const route = useRoute()
const isLoading = ref(true)
const error = ref('')
const chatData = ref({ title: '', messages: [], model: '', updatedAt: '' })

onMounted(async () => {
  const chatId = route.params.id
  if (!chatId) {
    error.value = "No Chat ID Provided."
    isLoading.value = false
    return
  }

  try {
    const res = await api.getPublicChat(chatId) 
    chatData.value = res.data
  } catch (e) {
    error.value = e.response?.data?.error || "Failed to load chat."
  } finally {
    isLoading.value = false
  }
})

const renderMarkdown = (text) => {
  if (!text) return ''
  try { return marked.parse(text) } catch (e) { return text }
}

const formattedDate = computed(() => {
  if (!chatData.value.updatedAt) return ''
  return new Date(chatData.value.updatedAt).toLocaleString()
})
</script>

<style scoped>
.public-view-layout {
  background: #0f172a;
  min-height: 100vh;
  color: #e2e8f0;
  font-family: 'Plus Jakarta Sans', sans-serif;
  text-transform: lowercase;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.chat-container {
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  flex-grow: 1;
}

.loading-state, .error-state {
  text-align: center;
  margin-top: 20vh;
  font-size: 1.2rem;
  color: #94a3b8;
}

.error-state { color: #ef4444; }
.error-state h2 { margin: 0; }
.error-state p { font-size: 1rem; color: #64748b; }
.back-home-btn { display: inline-block; margin-top: 20px; background: #0ea5e9; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; }

.chat-header {
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: 20px;
  margin-bottom: 30px;
}

.chat-title { font-size: 1.8rem; margin: 0 0 5px 0; color: white; }
.meta-info { color: #64748b; margin: 0; font-size: 0.9rem; }

.message-list { display: flex; flex-direction: column; gap: 20px; }
.msg-row { display: flex; gap: 15px; width: 100%; }
.msg-row.user { flex-direction: row-reverse; }
.msg-avatar { width: 36px; height: 36px; border-radius: 6px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.model .msg-avatar { background: #0ea5e9; color: white; }
.user .msg-avatar { background: #475569; color: white; }
.msg-bubble-wrapper { max-width: 85%; min-width: 0; }
.msg-bubble { background: #1e293b; padding: 15px 20px; border-radius: 12px; line-height: 1.6; font-size: 0.95rem; border: 1px solid rgba(255,255,255,0.05); overflow-wrap: break-word; }
.user .msg-bubble { background: #334155; }

.md-content :deep(pre) { background: #020617; padding: 15px; border-radius: 8px; overflow-x: auto; margin: 10px 0; border: 1px solid rgba(255,255,255,0.1); }
.md-content :deep(code) { font-family: 'Fira Code', monospace; color: #7dd3fc; }

.public-footer {
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid rgba(255,255,255,0.05);
  color: #64748b;
  font-size: 0.8rem;
}
</style>