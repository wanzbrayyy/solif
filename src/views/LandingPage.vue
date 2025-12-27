<template>
  <div class="landing-wrap">
    <!-- Navbar -->
    <nav class="nav-container wipe-in">
      <div class="logo">
        <div class="logo-box rotate"><i class="fa-solid fa-code"></i></div>
        <span>wanzofc dev</span>
      </div>
      <div class="nav-actions slide-in">
        <a href="https://github.com/wanzofc" target="_blank" class="github-btn">
          <i class="fa-brands fa-github"></i>
        </a>
        <button v-if="!isAuth" @click="router.push('/login')" class="login-btn">login</button>
        <button v-else @click="router.push('/chat')" class="login-btn">dashboard</button>
      </div>
    </nav>

    <!-- Hero -->
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
          <button class="btn-secondary">docs</button>
        </div>
      </div>
    </main>

    <!-- Promo Cards Section (High Quality Vibe) -->
    <section class="promo-section">
      <h2 class="section-title" data-aos="fade-up">supercharged features</h2>
      
      <div class="card-grid">
        <!-- Card 1 -->
        <div class="promo-card" data-aos="fade-up">
          <div class="card-badge">new</div>
          <div class="card-icon"><i class="fa-solid fa-microchip"></i></div>
          <h3>mistral 2512</h3>
          <p>lightning fast inference for complex reasoning tasks.</p>
          <div class="card-footer">
            <span>free tier</span>
            <i class="fa-solid fa-arrow-right"></i>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="promo-card highlight" data-aos="fade-up" data-aos-delay="100">
          <div class="card-badge">hot</div>
          <div class="card-icon"><i class="fa-solid fa-fire"></i></div>
          <h3>xiaomi mimo v2</h3>
          <p>optimized for rapid prototyping and creative writing.</p>
          <div class="card-footer">
            <span>flash speed</span>
            <i class="fa-solid fa-arrow-right"></i>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="promo-card" data-aos="fade-up" data-aos-delay="200">
          <div class="card-badge">beta</div>
          <div class="card-icon"><i class="fa-solid fa-brain"></i></div>
          <h3>deepseek nex</h3>
          <p>deep reasoning capabilities for advanced debugging.</p>
          <div class="card-footer">
            <span>pro access</span>
            <i class="fa-solid fa-arrow-right"></i>
          </div>
        </div>

        <!-- Card 4 -->
        <div class="promo-card" data-aos="fade-up" data-aos-delay="300">
          <div class="card-icon"><i class="fa-solid fa-shield-halved"></i></div>
          <h3>secure runtime</h3>
          <p>your code runs in isolated sandboxes.</p>
        </div>

        <!-- Card 5 -->
        <div class="promo-card" data-aos="fade-up" data-aos-delay="400">
           <div class="card-icon"><i class="fa-solid fa-terminal"></i></div>
          <h3>cli integration</h3>
          <p>connect directly from your terminal.</p>
        </div>

        <!-- Card 6 -->
        <div class="promo-card" data-aos="fade-up" data-aos-delay="500">
           <div class="card-icon"><i class="fa-brands fa-github"></i></div>
          <h3>git sync</h3>
          <p>auto-sync your prompts to repositories.</p>
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
  if (isAuth.value) {
    router.push('/chat')
  } else {
    router.push('/register')
  }
}
</script>

<style scoped>
/* Base Style with Lowercase enforcement */
.landing-wrap {
  min-height: 100vh;
  background: #020617;
  color: #f8fafc;
  font-family: 'Plus Jakarta Sans', sans-serif;
  overflow-x: hidden;
  text-transform: lowercase; /* ENFORCE LOWERCASE */
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

.logo { display: flex; align-items: center; gap: 12px; font-weight: 800; font-size: 1.2rem; }
.logo-box { width: 40px; height: 40px; background: #6366f1; border-radius: 8px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 15px rgba(99, 102, 241, 0.4); }
.nav-actions { display: flex; gap: 1rem; align-items: center; }

.login-btn { background: rgba(255,255,255,0.1); color: white; padding: 8px 20px; border-radius: 6px; font-weight: 600; border: 1px solid rgba(255,255,255,0.1); transition: 0.3s; }
.login-btn:hover { background: white; color: black; }

.hero { padding-top: 150px; padding-bottom: 50px; text-align: center; display: flex; flex-direction: column; align-items: center; position: relative; }
.hero-glow { position: absolute; width: 600px; height: 600px; background: radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%); top: -100px; left: 50%; transform: translateX(-50%); z-index: 0; animation: pulse 4s infinite; }
.hero-content { z-index: 1; max-width: 800px; padding: 0 20px; }

.badge { display: inline-flex; gap: 8px; background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.3); padding: 6px 16px; border-radius: 20px; color: #a5b4fc; font-size: 0.9rem; margin-bottom: 2rem; }
h1 { font-size: 4rem; font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem; }
.gradient-text { background: linear-gradient(to right, #818cf8, #c084fc); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
p { font-size: 1.2rem; color: #94a3b8; margin-bottom: 3rem; }
.cta-wrapper { display: flex; gap: 1rem; justify-content: center; margin-bottom: 4rem; }

.btn-primary { background: #6366f1; color: white; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 1.1rem; display: flex; align-items: center; gap: 10px; box-shadow: 0 10px 30px -10px #6366f1; transition: transform 0.2s; }
.btn-primary:hover { transform: translateY(-3px); }
.btn-secondary { background: transparent; border: 1px solid rgba(255,255,255,0.1); color: white; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 1.1rem; transition: 0.3s; }
.btn-secondary:hover { border-color: #6366f1; color: #6366f1; }

/* Promo Section */
.promo-section { padding: 4rem 2rem; max-width: 1200px; margin: 0 auto; }
.section-title { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; font-weight: 800; }
.card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }

.promo-card { background: #0f172a; padding: 30px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.05); position: relative; overflow: hidden; transition: all 0.3s ease; }
.promo-card:hover { transform: translateY(-10px); border-color: #6366f1; box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5); }
.promo-card.highlight { background: linear-gradient(145deg, #0f172a 0%, #1e1b4b 100%); border: 1px solid rgba(99, 102, 241, 0.3); }

.card-badge { position: absolute; top: 20px; right: 20px; background: rgba(99, 102, 241, 0.2); color: #818cf8; padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; }
.card-icon { width: 50px; height: 50px; background: #1e293b; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: #a5b4fc; margin-bottom: 20px; }
h3 { font-size: 1.4rem; margin-bottom: 10px; font-weight: 700; }
.promo-card p { font-size: 1rem; margin-bottom: 20px; line-height: 1.5; }
.card-footer { display: flex; justify-content: space-between; align-items: center; color: #6366f1; font-weight: 600; font-size: 0.9rem; }

.landing-footer { padding: 40px; text-align: center; color: #64748b; border-top: 1px solid rgba(255,255,255,0.05); margin-top: 50px; }
</style>