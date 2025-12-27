<template>
  <div class="landing-wrap">
    <nav class="nav-container wipe-in">
      <div class="logo">
        <div class="logo-box rotate"><i class="fa-solid fa-code"></i></div>
        <span>wanzofc dev</span>
      </div>
      <div class="nav-actions slide-in">
        <a href="#pricing" class="nav-link">pricing</a>
        <a href="https://github.com/wanzofc" target="_blank" class="github-btn">
          <i class="fa-brands fa-github"></i>
        </a>
        <button v-if="!isAuth" @click="router.push('/login')" class="login-btn">login</button>
        <button v-else @click="router.push('/chat')" class="login-btn">dashboard</button>
      </div>
    </nav>

    <main class="hero">
      <div class="hero-glow"></div>
      
      <div class="hero-content">
        <div class="badge jack-in-the-box">
          <i class="fa-solid fa-bolt"></i> powered by openrouter
        </div>
        
        <h1 class="zoom-in" style="animation-delay: 0.2s">
          create stuff with <span class="gradient-text">intelligence</span><br>
          deploy with <span class="gradient-text">confidence</span>
        </h1>
        
        <p class="fade-in" style="animation-delay: 0.4s">
          the next-gen ai playground. access top-tier models like deepseek, mistral, and xiaomi flash in one place.
        </p>

        <div class="cta-wrapper fade-in" style="animation-delay: 0.6s">
          <button @click="handleStart" class="btn-primary rubber-band-hover">
            start coding <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </main>

    <section id="pricing" class="pricing-section">
      <h2 class="section-title" data-aos="fade-up">choose your plan</h2>
      <div class="pricing-grid">
        <div class="pricing-card" data-aos="fade-up">
          <div class="plan-name">starter</div>
          <div class="price">rp 0<span class="per-month">/bulan</span></div>
          <ul class="features-list">
            <li><i class="fa-solid fa-check"></i> 100 free requests</li>
            <li><i class="fa-solid fa-check"></i> access to basic models</li>
            <li><i class="fa-solid fa-check"></i> public chat sharing</li>
            <li><i class="fa-solid fa-xmark"></i> private history</li>
          </ul>
          <button class="btn-secondary">get started</button>
        </div>

        <div class="pricing-card highlight" data-aos="fade-up" data-aos-delay="100">
          <div class="plan-name">pro</div>
          <div class="price">rp 150.000<span class="per-month">/bulan</span></div>
          <ul class="features-list">
            <li><i class="fa-solid fa-check"></i> unlimited requests</li>
            <li><i class="fa-solid fa-check"></i> access all models</li>
            <li><i class="fa-solid fa-check"></i> private chat sharing</li>
            <li><i class="fa-solid fa-check"></i> unlimited history</li>
          </ul>
          <button class="btn-primary">upgrade to pro</button>
        </div>

        <div class="pricing-card" data-aos="fade-up" data-aos-delay="200">
          <div class="plan-name">enterprise</div>
          <div class="price">contact us</div>
          <ul class="features-list">
            <li><i class="fa-solid fa-check"></i> dedicated support</li>
            <li><i class="fa-solid fa-check"></i> custom models</li>
            <li><i class="fa-solid fa-check"></i> on-premise option</li>
            <li><i class="fa-solid fa-check"></i> team management</li>
          </ul>
          <button class="btn-secondary">contact sales</button>
        </div>
      </div>
    </section>

    <footer class="landing-footer">
      <p>&copy; 2025 wanzofc dev. built for builders.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isAuth = ref(false)

onMounted(() => {
  isAuth.value = localStorage.getItem('isAuth') === 'true'
})

const handleStart = () => {
  if (isAuth.value) router.push('/chat')
  else router.push('/register')
}
</script>

<style scoped>
:root {
  --primary: #0ea5e9;
  --secondary: #14b8a6;
  --gradient: linear-gradient(to right, #0ea5e9, #14b8a6);
}

.landing-wrap {
  min-height: 100vh;
  background: #020617;
  color: #f8fafc;
  font-family: 'Plus Jakarta Sans', sans-serif;
  overflow-x: hidden;
  text-transform: lowercase;
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
  font-weight: 800;
  font-size: 1.2rem;
}

.logo-box {
  width: 40px;
  height: 40px;
  background: #0ea5e9;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 15px rgba(14, 165, 233, 0.4);
}

.nav-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-link {
  color: #94a3b8;
  font-weight: 600;
  text-decoration: none;
  transition: 0.2s;
}

.nav-link:hover {
  color: white;
}

.github-btn {
  color: #94a3b8;
  font-size: 1.2rem;
  text-decoration: none;
  transition: 0.2s;
}

.github-btn:hover {
  color: white;
}

.login-btn {
  background: rgba(255,255,255,0.1);
  color: white;
  padding: 8px 20px;
  border-radius: 6px;
  font-weight: 600;
  border: 1px solid rgba(255,255,255,0.1);
  transition: 0.3s;
}

.login-btn:hover {
  background: white;
  color: black;
}

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
  background: radial-gradient(circle, rgba(14, 165, 233, 0.2) 0%, transparent 70%);
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 0;
  animation: pulse 4s infinite;
}

.hero-content {
  z-index: 1;
  max-width: 800px;
  padding: 0 20px;
}

.badge {
  display: inline-flex;
  gap: 8px;
  background: rgba(14, 165, 233, 0.1);
  border: 1px solid rgba(14, 165, 233, 0.3);
  padding: 6px 16px;
  border-radius: 20px;
  color: #38bdf8;
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
  background: linear-gradient(to right, #0ea5e9, #14b8a6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

p {
  font-size: 1.2rem;
  color: #94a3b8;
  margin-bottom: 3rem;
}

.cta-wrapper {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 4rem;
}

.btn-primary {
  background: #0ea5e9;
  color: white;
  padding: 14px 32px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 10px 30px -10px #0ea5e9;
  transition: transform 0.2s;
  border: none;
}

.btn-primary:hover {
  background: #0891b2;
  transform: translateY(-3px);
}

.btn-secondary {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.1);
  color: white;
  padding: 14px 32px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: 0.3s;
}

.btn-secondary:hover {
  border-color: #0ea5e9;
  color: #0ea5e9;
}

.pricing-section {
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 50px auto;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  font-weight: 800;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.pricing-card {
  background: #0f172a;
  padding: 30px;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
}

.pricing-card.highlight {
  border-color: #0ea5e9;
  box-shadow: 0 0 30px rgba(14, 165, 233, 0.2);
  transform: scale(1.05);
}

.plan-name {
  font-weight: 700;
  color: #94a3b8;
  font-size: 1rem;
  margin-bottom: 15px;
  text-transform: uppercase;
}

.price {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 15px;
}

.per-month {
  font-size: 1rem;
  color: #64748b;
  font-weight: 500;
}

.features-list {
  list-style: none;
  margin: 25px 0;
  text-align: left;
  flex-grow: 1;
}

.features-list li {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 12px;
  color: #cbd5e1;
}

.features-list .fa-check { color: #22c55e; }
.features-list .fa-xmark { color: #ef4444; }

.landing-footer {
  padding: 40px;
  text-align: center;
  color: #64748b;
  border-top: 1px solid rgba(255,255,255,0.05);
  margin-top: 50px;
}
</style>