<template>
  <div class="landing-wrapper">
    <nav class="navbar">
      <div class="brand">
        <i class="fa-solid fa-code"></i>
        <span>wanzofc Dev</span>
      </div>
      <div class="nav-links">
        <a href="https://github.com/wanzofc" target="_blank" class="nav-item">
          <i class="fa-brands fa-github"></i> GitHub
        </a>
      </div>
    </nav>

    <main class="hero-section">
      <div class="glow-effect"></div>
      <div class="content">
        <span class="pill">Generative AI Studio</span>
        <h1>Code Smarter, <br><span class="gradient-text">Build Faster</span></h1>
        <p class="description">
          An intelligent development environment powered by Gemini 2.0 Flash. 
          Experience the next level of coding assistance and problem solving.
        </p>
        
        <div class="cta-buttons">
          <button @click="navigateToChat" class="btn-primary">
            Start Developing <i class="fa-solid fa-arrow-right"></i>
          </button>
          <button class="btn-outline">Documentation</button>
        </div>
      </div>

      <div class="code-preview">
        <div class="window-header">
          <div class="dots">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <span class="filename">main.py</span>
        </div>
        <div class="code-content">
          <pre><code>def init_ai():
    print("Wanzofc AI Loaded...")
    return True

if __name__ == "__main__":
    init_ai()</code></pre>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const navigateToChat = () => {
  router.push('/chat')
}
</script>

<style scoped>
.landing-wrapper {
  background-color: var(--bg-landing);
  color: var(--text-light);
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;
}

.navbar {
  padding: 1.5rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.brand {
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  gap: 10px;
  align-items: center;
}

.nav-item {
  color: #94a3b8;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-item:hover {
  color: white;
}

.hero-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  position: relative;
}

.glow-effect {
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(0,0,0,0) 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
}

.content {
  z-index: 1;
  max-width: 800px;
  margin-bottom: 3rem;
}

.pill {
  background: rgba(139, 92, 246, 0.1);
  color: #a78bfa;
  border: 1px solid rgba(139, 92, 246, 0.2);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  display: inline-block;
}

h1 {
  font-size: 4rem;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  font-weight: 800;
}

.gradient-text {
  background: linear-gradient(to right, #8b5cf6, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.description {
  font-size: 1.25rem;
  color: #94a3b8;
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-primary {
  background: var(--accent);
  color: white;
  padding: 14px 32px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-primary:hover {
  background: var(--accent-hover);
  transform: translateY(-2px);
}

.btn-outline {
  background: transparent;
  border: 1px solid #334155;
  color: white;
  padding: 14px 32px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
}

.btn-outline:hover {
  background: rgba(255,255,255,0.05);
}

.code-preview {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.window-header {
  background: #0f172a;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid #334155;
}

.dots {
  display: flex;
  gap: 6px;
}

.dot { width: 10px; height: 10px; border-radius: 50%; }
.red { background: #ef4444; }
.yellow { background: #f59e0b; }
.green { background: #10b981; }

.filename {
  color: #64748b;
  font-size: 0.8rem;
  font-family: monospace;
}

.code-content {
  padding: 20px;
  text-align: left;
}

code {
  color: #38bdf8;
  font-family: 'Consolas', monospace;
}
</style>