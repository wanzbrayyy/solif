<template>
  <div class="landing-wrap">
    <!-- Navbar -->
    <nav class="nav-container wipe-in">
      <div class="logo">
        <div class="logo-box rotate"><i class="fa-solid fa-code"></i></div>
        <span>Wanzofc Dev</span>
      </div>
      <div class="nav-actions slide-in">
        <a href="https://github.com/wanzofc" target="_blank" class="github-btn">
          <i class="fa-brands fa-github"></i>
        </a>
        <button @click="router.push('/chat')" class="login-btn">Launch App</button>
      </div>
    </nav>

    <!-- Hero -->
    <main class="hero">
      <div class="hero-glow"></div>
      
      <div class="hero-content">
        <div class="badge jack-in-the-box">
          <i class="fa-solid fa-bolt"></i> Powered by Gemini 2.0 Flash
        </div>
        
        <h1 class="zoom-in" style="animation-delay: 0.2s">
          Code with <span class="gradient-text">Intelligence</span><br>
          Create with <span class="gradient-text">Speed</span>
        </h1>
        
        <p class="fade-in" style="animation-delay: 0.4s">
          The next-generation AI developer environment. 
          Debug, refactor, and generate code in seconds.
        </p>

        <div class="cta-wrapper fade-in" style="animation-delay: 0.6s">
          <button @click="router.push('/chat')" class="btn-primary rubber-band-hover">
            Start Coding Now <i class="fa-solid fa-arrow-right"></i>
          </button>
          <button class="btn-secondary">View Documentation</button>
        </div>
      </div>

      <!-- Mockup Code -->
      <div class="code-mockup flip-in" style="animation-delay: 0.8s">
        <div class="mockup-header">
          <div class="dots">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <span class="file-name">helper.py</span>
        </div>
        <div class="mockup-body">
          <pre><code><span class="kwd">def</span> <span class="func">generate_solution</span>(problem):
    <span class="comment"># AI Processing</span>
    ai = <span class="cls">WanzofcAI</span>()
    result = ai.<span class="func">solve</span>(problem)
    <span class="kwd">return</span> result</code></pre>
        </div>
      </div>
    </main>

    <!-- Features -->
    <section class="features">
      <div class="feature-card" data-aos="fade-up">
        <div class="icon-box"><i class="fa-solid fa-microchip"></i></div>
        <h3>Ultra Fast</h3>
        <p>Responses in milliseconds using Flash models.</p>
      </div>
      <div class="feature-card" data-aos="fade-up" data-aos-delay="100">
        <div class="icon-box"><i class="fa-solid fa-shield-halved"></i></div>
        <h3>Secure Code</h3>
        <p>Your intellectual property remains safe.</p>
      </div>
      <div class="feature-card" data-aos="fade-up" data-aos-delay="200">
        <div class="icon-box"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
        <h3>Smart Context</h3>
        <p>Understands full project directory scope.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style scoped>
.landing-wrap {
  min-height: 100vh;
  background: var(--bg-dark);
  position: relative;
  overflow: hidden;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  backdrop-filter: blur(10px);
  position: fixed;
  width: 100%;
  z-index: 50;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  font-size: 1.2rem;
}

.logo-box {
  width: 40px;
  height: 40px;
  background: var(--primary);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 15px var(--primary-glow);
}

.nav-actions { display: flex; gap: 1rem; align-items: center; }

.login-btn {
  background: rgba(255,255,255,0.1);
  color: white;
  padding: 8px 20px;
  border-radius: 6px;
  font-weight: 600;
  border: 1px solid rgba(255,255,255,0.1);
  transition: 0.3s;
}

.login-btn:hover { background: white; color: black; }

.hero {
  padding-top: 150px;
  padding-bottom: 50px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.hero-glow {
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, var(--primary-glow) 0%, transparent 70%);
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 0;
  animation: pulse 4s infinite;
}

.hero-content { z-index: 1; max-width: 800px; padding: 0 20px; }

.badge {
  display: inline-flex;
  gap: 8px;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  padding: 6px 16px;
  border-radius: 20px;
  color: #a5b4fc;
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

h1 {
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.gradient-text {
  background: linear-gradient(to right, #818cf8, #c084fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

p { font-size: 1.2rem; color: var(--text-muted); margin-bottom: 3rem; }

.cta-wrapper { display: flex; gap: 1rem; justify-content: center; margin-bottom: 4rem; }

.btn-primary {
  background: var(--primary);
  color: white;
  padding: 14px 32px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 10px 30px -10px var(--primary);
  transition: transform 0.2s;
}

.btn-primary:hover { transform: translateY(-3px); }

.btn-secondary {
  background: transparent;
  border: 1px solid var(--border);
  color: white;
  padding: 14px 32px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: 0.3s;
}

.btn-secondary:hover { border-color: var(--primary); color: var(--primary); }

.code-mockup {
  width: 90%;
  max-width: 600px;
  background: #0f172a;
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  text-align: left;
  z-index: 1;
}

.mockup-header {
  background: #1e293b;
  padding: 10px 15px;
  display: flex;
  gap: 15px;
  align-items: center;
}

.dots { display: flex; gap: 6px; }
.dot { width: 10px; height: 10px; border-radius: 50%; }
.red { background: #ef4444; } .yellow { background: #eab308; } .green { background: #22c55e; }
.file-name { font-family: monospace; font-size: 0.8rem; color: #94a3b8; }

.mockup-body { padding: 20px; font-family: 'Fira Code', monospace; color: #cbd5e1; }
.kwd { color: #c084fc; } .func { color: #60a5fa; } .cls { color: #facc15; } .comment { color: #475569; }

.features {
  padding: 4rem 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: rgba(30, 41, 59, 0.4);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid var(--border);
  transition: 0.3s;
}

.feature-card:hover { transform: translateY(-5px); background: rgba(30, 41, 59, 0.7); border-color: var(--primary); }

.icon-box {
  width: 50px;
  height: 50px;
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

/* Rubber Band Hover Effect for Button */
.rubber-band-hover:hover {
  animation: rubberBand 1s;
}
</style>