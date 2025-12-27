<template>
  <div class="landing-container">
    <!-- Navbar -->
    <nav class="navbar" id="navbar">
      <div class="nav-content">
        <div class="logo animate__animated animate__fadeInLeft">
          <i class="fa-solid fa-code-branch"></i> Wanzofc Dev
        </div>
        <div class="nav-links animate__animated animate__fadeInRight">
          <a href="#features" class="link">Features</a>
          <a href="#tech" class="link">Technology</a>
          <button @click="goToChat" class="btn-chat pulse-btn">
            Try AI Chat <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <div class="badge" data-aos="fade-down">
          <i class="fa-solid fa-sparkles"></i> AI Powered Development
        </div>
        <h1 class="glitch-text" data-aos="zoom-in" data-aos-delay="200">
          Build the Future with <br>
          <span class="gradient-text">Wanzofc Studio</span>
        </h1>
        <p data-aos="fade-up" data-aos-delay="400">
          Accelerate your coding workflow with Gemini 2.0 Flash integration. 
          Smart code generation, debugging, and creative problem solving in one unified interface.
        </p>
        
        <div class="cta-group" data-aos="fade-up" data-aos-delay="600">
          <button @click="goToChat" class="btn-primary animate__animated animate__pulse animate__infinite">
            Launch Console
          </button>
          <button class="btn-secondary">
            View Documentation
          </button>
        </div>
      </div>

      <!-- Mockup Animation -->
      <div class="mockup-container" data-aos="flip-up" data-aos-duration="1500">
        <div class="code-window">
          <div class="window-bar">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
            <span class="title">ai_core.js</span>
          </div>
          <div class="window-body">
            <div class="line">
              <span class="kwd">const</span> <span class="var">initAI</span> = <span class="kwd">async</span> () => {
            </div>
            <div class="line indent">
              <span class="kwd">await</span> <span class="func">connect</span>(<span class="str">'Wanzofc-Model'</span>);
            </div>
            <div class="line indent">
              <span class="obj">console</span>.<span class="func">log</span>(<span class="str">'System Online 🚀'</span>);
            </div>
            <div class="line">}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="features">
      <h2 data-aos="fade-up">Why Choose Wanzofc?</h2>
      <div class="grid">
        <div class="card" data-aos="fade-right">
          <i class="fa-solid fa-bolt icon"></i>
          <h3>Lightning Fast</h3>
          <p>Powered by Gemini 2.0 Flash for instant responses.</p>
        </div>
        <div class="card" data-aos="fade-up">
          <i class="fa-solid fa-shield-halved icon"></i>
          <h3>Secure & Private</h3>
          <p>Your code remains yours. Enterprise grade security.</p>
        </div>
        <div class="card" data-aos="fade-left">
          <i class="fa-solid fa-wand-magic-sparkles icon"></i>
          <h3>Smart Context</h3>
          <p>Understands your project structure and dependencies.</p>
        </div>
      </div>
    </section>

    <footer class="footer">
      <p>&copy; 2025 Wanzofc Dev. Built with Vue 3 & Gemini API.</p>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToChat = () => {
  router.push('/chat')
}

// Vanilla JS Navbar Logic
onMounted(() => {
  const navbar = document.getElementById('navbar')
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled')
    } else {
      navbar.classList.remove('scrolled')
    }
  })
})
</script>

<style scoped>
.landing-container {
  min-height: 100vh;
  background: var(--bg-dark);
  overflow-x: hidden;
}

/* Navbar */
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  transition: all 0.4s ease;
  padding: 20px 0;
  border-bottom: 1px solid transparent;
}

.navbar.scrolled {
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(12px);
  padding: 10px 0;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.logo {
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-links {
  display: flex;
  gap: 30px;
  align-items: center;
}

.link {
  color: var(--text-muted);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.link:hover {
  color: var(--accent);
}

.btn-chat {
  background: var(--primary);
  color: white;
  padding: 10px 24px;
  border-radius: 50px;
  font-weight: 600;
  transition: transform 0.3s;
}

.btn-chat:hover {
  background: var(--secondary);
  transform: scale(1.05);
}

/* Hero */
.hero {
  padding-top: 140px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
}

.hero-bg {
  position: absolute;
  top: -20%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0%, rgba(0,0,0,0) 60%);
  z-index: 0;
}

.hero-content {
  z-index: 1;
  max-width: 800px;
  padding: 0 20px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  color: var(--accent);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-bottom: 20px;
}

h1 {
  font-size: 4rem;
  line-height: 1.1;
  margin-bottom: 20px;
  font-weight: 800;
}

.gradient-text {
  background: linear-gradient(135deg, var(--accent) 0%, var(--secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

p {
  font-size: 1.2rem;
  color: var(--text-muted);
  margin-bottom: 40px;
  line-height: 1.6;
}

.cta-group {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 60px;
}

.btn-primary {
  background: white;
  color: var(--bg-dark);
  padding: 16px 32px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1.1rem;
}

.btn-secondary {
  background: transparent;
  border: 1px solid var(--border);
  color: white;
  padding: 16px 32px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
}

.btn-secondary:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* Code Mockup */
.mockup-container {
  width: 90%;
  max-width: 700px;
  margin-bottom: 100px;
  z-index: 2;
}

.code-window {
  background: #1e1e1e;
  border-radius: 12px;
  border: 1px solid #333;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.window-bar {
  background: #252526;
  padding: 12px;
  display: flex;
  gap: 8px;
  align-items: center;
}

.dot { width: 12px; height: 12px; border-radius: 50%; }
.red { background: #ff5f56; }
.yellow { background: #ffbd2e; }
.green { background: #27c93f; }
.title { margin-left: 10px; color: #888; font-size: 0.8rem; font-family: monospace; }

.window-body {
  padding: 20px;
  text-align: left;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.95rem;
}

.line { margin-bottom: 5px; }
.indent { margin-left: 20px; }
.kwd { color: #cc7832; }
.var { color: #ffc66d; }
.str { color: #6a8759; }
.func { color: #9876aa; }
.obj { color: #a9b7c6; }

/* Features */
.features {
  padding: 80px 20px;
  background: #0b1120;
  text-align: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 50px auto 0;
}

.card {
  background: rgba(30, 41, 59, 0.5);
  padding: 40px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.05);
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-10px);
  background: rgba(30, 41, 59, 0.8);
}

.icon {
  font-size: 2.5rem;
  color: var(--secondary);
  margin-bottom: 20px;
}

h3 {
  margin-bottom: 15px;
  font-size: 1.5rem;
}

.footer {
  padding: 40px;
  text-align: center;
  color: var(--text-muted);
  border-top: 1px solid rgba(255,255,255,0.05);
}
</style>