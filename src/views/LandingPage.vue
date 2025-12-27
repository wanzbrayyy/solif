<template>
  <div class="landing-wrap">
    <!-- background effects -->
    <div class="bg-noise"></div>
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>

    <!-- navigation -->
    <nav class="nav-container wipe-in" :class="{ 'scrolled': isScrolled }">
      <div class="logo">
        <div class="logo-box rotate-hover">
          <i class="fa-solid fa-code"></i>
        </div>
        <span class="logo-text">wanzofc dev</span>
      </div>
      
      <!-- desktop menu -->
      <div class="nav-menu">
        <a href="#features" class="nav-link">features</a>
        <a href="#showcase" class="nav-link">showcase</a>
        <a href="#reviews" class="nav-link">reviews</a>
        <a href="#pricing" class="nav-link">pricing</a>
        <a href="#faq" class="nav-link">faq</a>
      </div>

      <div class="nav-actions slide-in">
        <a href="https://github.com/wanzofc" target="_blank" class="github-btn" title="view on github">
          <i class="fa-brands fa-github"></i>
        </a>
        <button v-if="!isAuth" @click="router.push('/login')" class="login-btn">
          <span>login member</span>
        </button>
        <button v-else @click="router.push('/chat')" class="dashboard-btn">
          <span>dashboard</span>
          <i class="fa-solid fa-arrow-right-long"></i>
        </button>
      </div>
    </nav>

    <!-- hero section -->
    <main class="hero">
      <div class="hero-content">
        <div class="badge-wrapper jack-in-the-box">
          <div class="badge">
            <span class="dot-pulse"></span>
            wanzofc v1 dev
          </div>
        </div>
        
        <h1 class="hero-title zoom-in">
          unlock your potential<br>
          write code at the speed of
          <span class="gradient-text type-effect">thought</span>
        </h1>
        
        <p class="hero-desc fade-in">
          stop wasting time on boilerplate. wanzofc dev provides you with the most advanced
          ai models including deepseek, gpt-4, and claude-3 to accelerate your development workflow
          by 10x. secure, fast, and reliable.
        </p>

        <div class="cta-group fade-in">
          <button @click="handleStart" class="btn-primary glow-effect">
            <i class="fa-solid fa-bolt"></i> start coding for free
          </button>
          <button class="btn-secondary">
            <i class="fa-solid fa-play"></i> watch demo
          </button>
        </div>

        <div class="hero-stats fade-in">
          <div class="stat-item">
            <span class="stat-num">10k+</span>
            <span class="stat-label">active developers</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-num">5m+</span>
            <span class="stat-label">lines generated</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-num">99.9%</span>
            <span class="stat-label">uptime guarantee</span>
          </div>
        </div>
      </div>
    </main>

    <!-- logo cloud / trusted by -->
    <section class="trusted-section">
      <p class="section-label">trusted by innovative teams worldwide</p>
      <div class="logo-marquee">
        <div class="marquee-content">
          <i class="fa-brands fa-google"></i>
          <i class="fa-brands fa-aws"></i>
          <i class="fa-brands fa-meta"></i>
          <i class="fa-brands fa-stripe"></i>
          <i class="fa-brands fa-spotify"></i>
          <i class="fa-brands fa-uber"></i>
          <i class="fa-brands fa-airbnb"></i>
          <!-- duplicate for smooth loop -->
          <i class="fa-brands fa-google"></i>
          <i class="fa-brands fa-aws"></i>
          <i class="fa-brands fa-meta"></i>
          <i class="fa-brands fa-stripe"></i>
          <i class="fa-brands fa-spotify"></i>
          <i class="fa-brands fa-uber"></i>
          <i class="fa-brands fa-airbnb"></i>
        </div>
      </div>
    </section>

    <!-- features grid -->
    <section id="features" class="features-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">why developers choose wanzofc</h2>
          <p class="section-subtitle">
            we provide the tools you need to build the future, faster than ever before.
            everything you need in one powerful dashboard.
          </p>
        </div>

        <div class="features-grid">
          <div class="feature-card" v-for="(feat, index) in features" :key="index" data-aos="fade-up" :style="{ transitionDelay: index * 100 + 'ms' }">
            <div class="feature-icon" :class="feat.color">
              <i :class="feat.icon"></i>
            </div>
            <h3>{{ feat.title }}</h3>
            <p>{{ feat.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- code showcase / promo text -->
    <section id="showcase" class="showcase-section">
      <div class="showcase-container">
        <div class="showcase-text" data-aos="fade-right">
          <h2>less debugging,<br>more building.</h2>
          <p>
            imagine an assistant that knows your entire codebase. wanzofc dev integrates deeply
            with your workflow to provide context-aware suggestions, instant refactoring,
            and bug fixes in seconds.
          </p>
          <ul class="check-list">
            <li><i class="fa-solid fa-check-circle"></i> instant context awareness</li>
            <li><i class="fa-solid fa-check-circle"></i> multi-file editing support</li>
            <li><i class="fa-solid fa-check-circle"></i> zero data retention policy</li>
            <li><i class="fa-solid fa-check-circle"></i> custom fine-tuning available</li>
          </ul>
          <button @click="handleStart" class="btn-text">
            explore documentation <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
        
        <div class="showcase-visual" data-aos="fade-left">
          <div class="code-window">
            <div class="window-header">
              <div class="dots">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
              </div>
              <span class="filename">main.js</span>
            </div>
            <div class="window-body">
              <div class="code-line"><span class="purple">const</span> app = <span class="blue">createApp</span>(App);</div>
              <div class="code-line"><span class="comment">// ai suggestion: implement router here</span></div>
              <div class="code-line typing-anim"><span class="purple">import</span> router <span class="purple">from</span> <span class="green">'./router'</span>;</div>
              <div class="code-line typing-anim-2">app.<span class="blue">use</span>(router).<span class="blue">mount</span>(<span class="green">'#app'</span>);</div>
              <div class="cursor"></div>
            </div>
            <div class="ai-popup floating">
              <i class="fa-solid fa-wand-magic-sparkles"></i>
              <span>code optimized successfully!</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- testimonials -->
    <section id="reviews" class="reviews-section">
      <div class="section-header">
        <h2 class="section-title">loved by hackers & builders</h2>
        <p class="section-subtitle">don't just take our word for it. hear what the community says.</p>
      </div>

      <div class="reviews-scroller">
        <div class="reviews-track">
          <div class="review-card" v-for="(review, i) in reviews" :key="i">
            <div class="review-header">
              <div class="reviewer-avatar">{{ review.initial }}</div>
              <div class="reviewer-info">
                <div class="name">{{ review.name }}</div>
                <div class="role">{{ review.role }}</div>
              </div>
              <div class="stars">
                <i class="fa-solid fa-star" v-for="s in 5" :key="s"></i>
              </div>
            </div>
            <p class="review-text">"{{ review.text }}"</p>
          </div>
          <!-- duplicate for loop -->
           <div class="review-card" v-for="(review, i) in reviews" :key="'dup'+i">
            <div class="review-header">
              <div class="reviewer-avatar">{{ review.initial }}</div>
              <div class="reviewer-info">
                <div class="name">{{ review.name }}</div>
                <div class="role">{{ review.role }}</div>
              </div>
              <div class="stars">
                <i class="fa-solid fa-star" v-for="s in 5" :key="s"></i>
              </div>
            </div>
            <p class="review-text">"{{ review.text }}"</p>
          </div>
        </div>
      </div>
    </section>

    <!-- pricing section -->
    <section id="pricing" class="pricing-section">
      <div class="pricing-bg"></div>
      <h2 class="section-title" data-aos="fade-up">simple pricing, massive value</h2>
      <p class="pricing-subtitle" data-aos="fade-up">start for free, upgrade when you scale. cancel anytime.</p>
      
      <div class="pricing-toggle" data-aos="fade-up">
        <span :class="{active: !isYearly}" @click="isYearly = false">monthly</span>
        <div class="toggle-switch" @click="isYearly = !isYearly" :class="{active: isYearly}">
          <div class="switch-handle"></div>
        </div>
        <span :class="{active: isYearly}" @click="isYearly = true">yearly <span class="save-tag">save 20%</span></span>
      </div>

      <div class="pricing-grid">
        <!-- starter plan -->
        <div class="pricing-card" data-aos="fade-up">
          <div class="plan-header">
            <div class="plan-name">hobby</div>
            <div class="price">
              rp 0
              <span class="period">/{{ isYearly ? 'year' : 'month' }}</span>
            </div>
            <p class="plan-desc">perfect for testing the waters and small scripts.</p>
          </div>
          <button @click="handleStart" class="btn-outline">start for free</button>
          <div class="divider"></div>
          <ul class="features-list">
            <li><i class="fa-solid fa-check"></i> 100 fast requests/day</li>
            <li><i class="fa-solid fa-check"></i> access to gpt-3.5 turbo</li>
            <li><i class="fa-solid fa-check"></i> community discord access</li>
            <li><i class="fa-solid fa-check"></i> public templates</li>
            <li class="disabled"><i class="fa-solid fa-xmark"></i> private mode</li>
            <li class="disabled"><i class="fa-solid fa-xmark"></i> api access</li>
          </ul>
        </div>

        <!-- pro plan -->
        <div class="pricing-card popular" data-aos="fade-up" data-aos-delay="100">
          <div class="popular-tag">most popular</div>
          <div class="plan-header">
            <div class="plan-name">pro dev</div>
            <div class="price">
              rp {{ isYearly ? '1.500k' : '150k' }}
              <span class="period">/{{ isYearly ? 'year' : 'month' }}</span>
            </div>
            <p class="plan-desc">power tools for serious developers and freelancers.</p>
          </div>
          <button @click="handleStart" class="btn-primary full-width">get pro access</button>
          <div class="divider"></div>
          <ul class="features-list">
            <li><i class="fa-solid fa-check"></i> <strong>unlimited</strong> fast requests</li>
            <li><i class="fa-solid fa-check"></i> access to gpt-4 & claude-3</li>
            <li><i class="fa-solid fa-check"></i> private history & storage</li>
            <li><i class="fa-solid fa-check"></i> priority support</li>
            <li><i class="fa-solid fa-check"></i> early access to new features</li>
            <li><i class="fa-solid fa-check"></i> custom instructions</li>
          </ul>
        </div>

        <!-- ultimate plan -->
        <div class="pricing-card" data-aos="fade-up" data-aos-delay="200">
          <div class="plan-header">
            <div class="plan-name">team</div>
            <div class="price">
              rp {{ isYearly ? '4.500k' : '450k' }}
              <span class="period">/{{ isYearly ? 'year' : 'month' }}</span>
            </div>
            <p class="plan-desc">collaborate and build together with centralized billing.</p>
          </div>
          <button class="btn-outline">contact sales</button>
          <div class="divider"></div>
          <ul class="features-list">
            <li><i class="fa-solid fa-check"></i> everything in pro</li>
            <li><i class="fa-solid fa-check"></i> up to 5 team members</li>
            <li><i class="fa-solid fa-check"></i> centralized dashboard</li>
            <li><i class="fa-solid fa-check"></i> api key management</li>
            <li><i class="fa-solid fa-check"></i> dedicated account manager</li>
            <li><i class="fa-solid fa-check"></i> sso integration</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- faq section -->
    <section id="faq" class="faq-section">
      <div class="section-header">
        <h2 class="section-title">frequently asked questions</h2>
        <p class="section-subtitle">everything you need to know about the platform.</p>
      </div>
      
      <div class="faq-grid">
        <div class="faq-item" v-for="(item, i) in faqs" :key="i" @click="toggleFaq(i)" :class="{active: activeFaq === i}">
          <div class="faq-question">
            <span>{{ item.q }}</span>
            <i class="fa-solid fa-chevron-down icon-rotate"></i>
          </div>
          <div class="faq-answer">
            <p>{{ item.a }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- cta final -->
    <section class="final-cta">
      <div class="cta-box">
        <h2>ready to transform your workflow?</h2>
        <p>join thousands of developers who are shipping code faster with wanzofc dev.</p>
        <button @click="handleStart" class="btn-white">
          get started now <i class="fa-solid fa-rocket"></i>
        </button>
      </div>
    </section>

    <!-- footer -->
    <footer class="landing-footer">
      <div class="footer-grid">
        <div class="footer-col brand">
          <div class="logo">
            <div class="logo-box small"><i class="fa-solid fa-code"></i></div>
            <span>wanzofc dev</span>
          </div>
          <p></p>
          <div class="socials">
            <a href="#"><i class="fa-brands fa-twitter"></i></a>
            <a href="#"><i class="fa-brands fa-github"></i></a>
            <a href="#"><i class="fa-brands fa-discord"></i></a>
            <a href="#"><i class="fa-brands fa-linkedin"></i></a>
          </div>
        </div>
        
        <div class="footer-col">
          <h4>product</h4>
          <a href="#">features</a>
          <a href="#">integrations</a>
          <a href="#">pricing</a>
          <a href="#">changelog</a>
        </div>
        
        <div class="footer-col">
          <h4>resources</h4>
          <a href="#">documentation</a>
          <a href="#">api reference</a>
          <a href="#">community</a>
          <a href="#">blog</a>
        </div>
        
        <div class="footer-col">
          <h4>company</h4>
          <a href="#">about us</a>
          <a href="#">careers</a>
          <a href="#">legal</a>
          <a href="#">contact</a>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2025 wanzofc dev</p>
        <div class="legal-links">
          <a href="#">privacy policy</a>
          <a href="#">terms of service</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isAuth = ref(false)
const isYearly = ref(false)
const activeFaq = ref(null)
const isScrolled = ref(false)

// detect scroll for navbar styling
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  isAuth.value = localStorage.getItem('isAuth') === 'true'
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleStart = () => {
  if (isAuth.value) router.push('/chat')
  else router.push('/register')
}

const toggleFaq = (index) => {
  if (activeFaq.value === index) activeFaq.value = null
  else activeFaq.value = index
}

// data untuk konten promo (memperbanyak teks sesuai request)
const features = ref([
  {
    icon: 'fa-solid fa-brain',
    title: 'advanced intelligence',
    desc: 'access the smartest models available today including gpt-4, claude 3 opus, and deepseek coder instantly.',
    color: 'blue'
  },
  {
    icon: 'fa-solid fa-bolt',
    title: 'lightning fast',
    desc: 'optimized infrastructure ensures low latency responses, so you stay in the flow state without interruptions.',
    color: 'yellow'
  },
  {
    icon: 'fa-solid fa-shield-halved',
    title: 'enterprise security',
    desc: 'your code is your intellectual property. we use end-to-end encryption and never train on your private data.',
    color: 'green'
  },
  {
    icon: 'fa-solid fa-code-branch',
    title: 'git integration',
    desc: 'seamlessly connect with github and gitlab to review prs, generate documentation, and automate commits.',
    color: 'purple'
  },
  {
    icon: 'fa-solid fa-users',
    title: 'team collaboration',
    desc: 'share chat sessions, prompts, and custom model configurations with your entire team in real-time.',
    color: 'pink'
  },
  {
    icon: 'fa-solid fa-chart-line',
    title: 'usage analytics',
    desc: 'track your token usage, costs, and productivity metrics through our detailed analytics dashboard.',
    color: 'orange'
  }
])

const reviews = ref([
  {
    name: 'alexander d.',
    role: 'senior frontend dev',
    text: 'wanzofc dev totally changed how i write vue components. the suggestions are incredibly accurate and save me hours every week.',
    initial: 'a'
  },
  {
    name: 'sarah j.',
    role: 'fullstack engineer',
    text: 'i was skeptical about ai coding tools, but this platform is different. it actually understands context across multiple files. highly recommended!',
    initial: 's'
  },
  {
    name: 'michael r.',
    role: 'cto at techstart',
    text: 'the pricing is unbeatable for the value provided. my team has increased shipping velocity by 40% since adopting wanzofc.',
    initial: 'm'
  },
  {
    name: 'jessica t.',
    role: 'indie hacker',
    text: 'finally, a tool that looks good and works even better. the dark mode ui is a joy to use late at night.',
    initial: 'j'
  },
  {
    name: 'david k.',
    role: 'backend specialist',
    text: 'the ability to switch between models instantly helps me test different logic approaches. deepseek integration is fire.',
    initial: 'd'
  }
])

const faqs = ref([
  {
    q: 'is there a free trial available?',
    a: 'yes! our starter plan is completely free forever. you get 100 requests per month to test out the platform and see if it fits your workflow.'
  },
  {
    q: 'which ai models do you support?',
    a: 'we support a wide range of top-tier models including openai gpt-4o, anthropic claude 3.5 sonnet, mistral large, and deepseek coder v2.'
  },
  {
    q: 'is my code safe with wanzofc?',
    a: 'absolutely. we prioritize security above all else. your code snippets are processed in memory and are never stored or used to train our models.'
  },
  {
    q: 'can i use this for commercial projects?',
    a: 'yes, all code generated on our platform belongs to you. you retain full ownership and copyright of any output produced.'
  },
  {
    q: 'what payment methods do you accept?',
    a: 'we accept all major credit cards (visa, mastercard), paypal, and local indonesian bank transfers (qris/virtual account).'
  }
])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

:root {
  --bg-dark: #020617;
  --bg-card: #0f172a;
  --primary: #0ea5e9;
  --primary-glow: rgba(14, 165, 233, 0.5);
  --secondary: #14b8a6;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --border: rgba(255, 255, 255, 0.1);
  --gradient: linear-gradient(135deg, #0ea5e9, #14b8a6);
}

* {
  box-sizing: border-box;
  scroll-behavior: smooth;
}

.landing-wrap {
  min-height: 100vh;
  background: var(--bg-dark);
  color: var(--text-main);
  font-family: 'Plus Jakarta Sans', sans-serif;
  overflow-x: hidden;
  text-transform: lowercase; /* mandatory lowercase */
  position: relative;
}

/* Background Effects */
.bg-noise {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 0;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
  opacity: 0.4;
  animation: floatOrb 10s infinite alternate;
}

.orb-1 { width: 400px; height: 400px; background: #0ea5e9; top: -100px; left: -100px; }
.orb-2 { width: 300px; height: 300px; background: #8b5cf6; bottom: 20%; right: -50px; animation-delay: -2s; }
.orb-3 { width: 200px; height: 200px; background: #14b8a6; top: 40%; left: 30%; opacity: 0.2; }

@keyframes floatOrb {
  0% { transform: translate(0, 0); }
  100% { transform: translate(30px, 50px); }
}

/* Navbar */
.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 3rem;
  position: fixed;
  width: 100%;
  z-index: 100;
  transition: all 0.3s ease;
}

.nav-container.scrolled {
  background: rgba(2, 6, 23, 0.8);
  backdrop-filter: blur(12px);
  padding: 1rem 3rem;
  border-bottom: 1px solid var(--border);
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.logo-box {
  width: 40px;
  height: 40px;
  background: var(--gradient);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 0 20px rgba(14, 165, 233, 0.3);
  transition: transform 0.3s;
}

.logo:hover .logo-box {
  transform: rotate(15deg) scale(1.1);
}

.logo-text {
  font-weight: 800;
  font-size: 1.3rem;
  letter-spacing: -0.5px;
}

.nav-menu {
  display: flex;
  gap: 2rem;
  background: rgba(255, 255, 255, 0.03);
  padding: 8px 20px;
  border-radius: 50px;
  border: 1px solid var(--border);
}

.nav-link {
  color: var(--text-muted);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.2s;
}

.nav-link:hover {
  color: white;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.github-btn {
  color: var(--text-muted);
  font-size: 1.4rem;
  transition: 0.2s;
}

.github-btn:hover { color: white; transform: translateY(-2px); }

.login-btn, .dashboard-btn {
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: inherit;
}

.login-btn {
  background: transparent;
  border: 1px solid var(--border);
  color: white;
}

.login-btn:hover {
  background: white;
  color: black;
}

.dashboard-btn {
  background: var(--primary);
  border: none;
  color: white;
  box-shadow: 0 0 15px rgba(14, 165, 233, 0.3);
}

.dashboard-btn:hover {
  background: #0284c7;
  transform: translateY(-2px);
}

/* Hero Section */
.hero {
  padding-top: 180px;
  padding-bottom: 80px;
  text-align: center;
  position: relative;
  z-index: 1;
}

.hero-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.badge-wrapper {
  margin-bottom: 2rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(14, 165, 233, 0.1);
  border: 1px solid rgba(14, 165, 233, 0.2);
  padding: 8px 20px;
  border-radius: 30px;
  color: #38bdf8;
  font-size: 0.9rem;
  font-weight: 600;
}

.dot-pulse {
  width: 8px;
  height: 8px;
  background: #38bdf8;
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.7);
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(56, 189, 248, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(56, 189, 248, 0); }
}

.hero-title {
  font-size: 4.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: -2px;
}

.gradient-text {
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-desc {
  font-size: 1.25rem;
  color: var(--text-muted);
  line-height: 1.6;
  max-width: 700px;
  margin-bottom: 3rem;
}

.cta-group {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.btn-primary {
  background: var(--primary);
  color: white;
  padding: 16px 36px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s;
  box-shadow: 0 10px 30px -10px var(--primary);
}

.btn-primary:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px -10px var(--primary);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: white;
  padding: 16px 36px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1.1rem;
  border: 1px solid var(--border);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: 0.3s;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: white;
}

.hero-stats {
  display: flex;
  gap: 3rem;
  align-items: center;
  border-top: 1px solid var(--border);
  padding-top: 2rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-num {
  font-size: 1.8rem;
  font-weight: 800;
  color: white;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: var(--border);
}

/* Trusted Section */
.trusted-section {
  padding: 3rem 0;
  background: #020617;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  overflow: hidden;
}

.section-label {
  text-align: center;
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  letter-spacing: 1px;
}

.logo-marquee {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.marquee-content {
  display: flex;
  gap: 4rem;
  animation: marquee 20s linear infinite;
  width: max-content;
}

.marquee-content i {
  font-size: 2.5rem;
  color: #334155;
  transition: 0.3s;
}

.marquee-content i:hover {
  color: white;
  filter: drop-shadow(0 0 10px white);
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* Features */
.features-section {
  padding: 8rem 2rem;
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 5rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--text-muted);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid var(--border);
  padding: 35px;
  border-radius: 20px;
  transition: 0.3s;
}

.feature-card:hover {
  transform: translateY(-10px);
  background: rgba(15, 23, 42, 0.9);
  border-color: var(--primary);
  box-shadow: 0 10px 40px -10px rgba(0,0,0,0.5);
}

.feature-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.feature-icon.blue { background: rgba(14, 165, 233, 0.1); color: #0ea5e9; }
.feature-icon.yellow { background: rgba(234, 179, 8, 0.1); color: #eab308; }
.feature-icon.green { background: rgba(34, 197, 94, 0.1); color: #22c55e; }
.feature-icon.purple { background: rgba(168, 85, 247, 0.1); color: #a855f7; }
.feature-icon.pink { background: rgba(236, 72, 153, 0.1); color: #ec4899; }
.feature-icon.orange { background: rgba(249, 115, 22, 0.1); color: #f97316; }

.feature-card h3 {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.feature-card p {
  color: var(--text-muted);
  line-height: 1.6;
}

/* Showcase */
.showcase-section {
  padding: 8rem 2rem;
  background: radial-gradient(circle at center, rgba(14, 165, 233, 0.05) 0%, transparent 70%);
}

.showcase-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.showcase-text h2 {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.showcase-text p {
  font-size: 1.1rem;
  color: var(--text-muted);
  margin-bottom: 2rem;
}

.check-list {
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
}

.check-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
  font-weight: 500;
  color: #e2e8f0;
}

.check-list i { color: #22c55e; }

.btn-text {
  background: none;
  border: none;
  color: var(--primary);
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0;
}

.btn-text:hover { text-decoration: underline; gap: 15px; transition: 0.3s; }

.code-window {
  background: #1e293b;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  border: 1px solid var(--border);
  position: relative;
  font-family: 'Fira Code', monospace;
}

.window-header {
  background: #0f172a;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border);
}

.dots { display: flex; gap: 8px; margin-right: 20px; }
.dot { width: 12px; height: 12px; border-radius: 50%; }
.red { background: #ef4444; }
.yellow { background: #f59e0b; }
.green { background: #22c55e; }

.filename {
  font-size: 0.8rem;
  color: #64748b;
  margin-left: auto;
  margin-right: auto;
}

.window-body {
  padding: 24px;
  color: #e2e8f0;
  font-size: 0.9rem;
  line-height: 1.8;
}

.purple { color: #c084fc; }
.blue { color: #60a5fa; }
.green { color: #4ade80; }
.comment { color: #64748b; font-style: italic; }

.typing-anim {
  width: 0;
  overflow: hidden;
  white-space: nowrap;
  animation: typing 2s steps(30, end) forwards;
  animation-delay: 1s;
}

.typing-anim-2 {
  width: 0;
  overflow: hidden;
  white-space: nowrap;
  animation: typing 2s steps(30, end) forwards;
  animation-delay: 3.5s;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

.ai-popup {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(14, 165, 233, 0.9);
  backdrop-filter: blur(5px);
  padding: 10px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  animation-delay: 5s;
  opacity: 0;
  transform: scale(0.8);
}

@keyframes popIn {
  to { opacity: 1; transform: scale(1); }
}

/* Reviews */
.reviews-section {
  padding: 8rem 0;
  overflow: hidden;
}

.reviews-scroller {
  width: 100%;
  overflow: hidden;
  padding: 20px 0;
  mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
}

.reviews-track {
  display: flex;
  gap: 20px;
  width: max-content;
  animation: marquee 40s linear infinite;
}

.review-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 25px;
  border-radius: 16px;
  width: 350px;
  flex-shrink: 0;
}

.review-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
}

.reviewer-avatar {
  width: 40px;
  height: 40px;
  background: #334155;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
}

.reviewer-info .name { font-weight: 700; font-size: 0.9rem; }
.reviewer-info .role { font-size: 0.75rem; color: var(--text-muted); }

.stars { color: #fbbf24; font-size: 0.8rem; margin-left: auto; }
.review-text { font-size: 0.95rem; color: #cbd5e1; font-style: italic; line-height: 1.5; }

/* Pricing */
.pricing-section {
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.pricing-toggle {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 3rem;
  font-weight: 600;
  cursor: pointer;
}

.pricing-toggle span.active { color: white; }
.pricing-toggle span { color: var(--text-muted); transition: 0.3s; }

.toggle-switch {
  width: 50px;
  height: 26px;
  background: #334155;
  border-radius: 20px;
  position: relative;
  transition: 0.3s;
}

.toggle-switch.active { background: var(--primary); }

.switch-handle {
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
  transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.toggle-switch.active .switch-handle { left: 27px; }

.save-tag {
  background: #dcfce7;
  color: #166534;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: 5px;
  vertical-align: middle;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  align-items: start;
}

.pricing-card {
  background: #0f172a;
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 30px;
  position: relative;
  transition: 0.3s;
}

.pricing-card.popular {
  border-color: var(--primary);
  box-shadow: 0 0 30px rgba(14, 165, 233, 0.15);
  transform: scale(1.05);
  z-index: 2;
  background: #141d33;
}

.popular-tag {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--primary);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
}

.plan-name { font-size: 1.1rem; font-weight: 700; color: var(--text-muted); margin-bottom: 10px; }
.price { font-size: 2.5rem; font-weight: 800; color: white; margin-bottom: 10px; }
.period { font-size: 1rem; color: var(--text-muted); font-weight: 500; }
.plan-desc { font-size: 0.9rem; color: #64748b; margin-bottom: 25px; }

.btn-outline {
  width: 100%;
  padding: 12px;
  background: transparent;
  border: 1px solid var(--border);
  color: white;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

.btn-outline:hover { border-color: white; }

.full-width { width: 100%; justify-content: center; }

.divider { height: 1px; background: var(--border); margin: 25px 0; }

.features-list li {
  margin-bottom: 12px;
  font-size: 0.9rem;
  color: #cbd5e1;
  display: flex;
  gap: 10px;
  align-items: center;
}

.features-list li.disabled { color: #475569; }
.features-list i { color: #22c55e; }
.features-list li.disabled i { color: #475569; }

/* FAQ */
.faq-section {
  padding: 6rem 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  border-bottom: 1px solid var(--border);
  margin-bottom: 15px;
}

.faq-question {
  padding: 20px 0;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
}

.icon-rotate { transition: 0.3s; }
.faq-item.active .icon-rotate { transform: rotate(180deg); color: var(--primary); }

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  color: var(--text-muted);
  line-height: 1.6;
}

.faq-item.active .faq-answer {
  max-height: 200px;
  padding-bottom: 20px;
}

/* Final CTA */
.final-cta {
  padding: 4rem 2rem;
  display: flex;
  justify-content: center;
}

.cta-box {
  background: var(--gradient);
  width: 100%;
  max-width: 1000px;
  border-radius: 24px;
  padding: 4rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.cta-box h2 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.cta-box p {
  font-size: 1.1rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
}

.btn-white {
  background: white;
  color: #0284c7;
  padding: 16px 40px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.btn-white:hover { transform: scale(1.05); box-shadow: 0 10px 20px rgba(0,0,0,0.2); }

/* Footer */
.landing-footer {
  background: #020617;
  padding: 5rem 2rem 2rem;
  border-top: 1px solid var(--border);
}

.footer-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
}

.footer-col p { color: #64748b; line-height: 1.6; margin: 20px 0; max-width: 300px; }

.socials { display: flex; gap: 15px; }
.socials a {
  width: 36px; height: 36px;
  background: rgba(255,255,255,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: #94a3b8;
  transition: 0.3s;
}
.socials a:hover { background: var(--primary); color: white; }

.footer-col h4 { margin-bottom: 20px; font-size: 1rem; color: white; }
.footer-col a {
  display: block;
  color: #64748b;
  text-decoration: none;
  margin-bottom: 12px;
  transition: 0.2s;
  font-size: 0.9rem;
}
.footer-col a:hover { color: var(--primary); }

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  color: #475569;
  font-size: 0.9rem;
}

.legal-links { display: flex; gap: 2rem; }

/* Responsive */
@media (max-width: 1024px) {
  .hero-title { font-size: 3.5rem; }
  .pricing-grid { grid-template-columns: 1fr; max-width: 500px; margin: 0 auto; }
  .pricing-card.popular { transform: scale(1); }
  .showcase-container { grid-template-columns: 1fr; }
  .footer-grid { grid-template-columns: 1fr 1fr; }
  .nav-menu { display: none; }
}

@media (max-width: 768px) {
  .hero-title { font-size: 2.5rem; }
  .hero-stats { flex-direction: column; gap: 1rem; }
  .stat-divider { display: none; }
  .cta-group { flex-direction: column; width: 100%; }
  .btn-primary, .btn-secondary { width: 100%; justify-content: center; }
  .footer-grid { grid-template-columns: 1fr; text-align: center; }
  .socials { justify-content: center; }
  .footer-bottom { flex-direction: column; align-items: center; gap: 1rem; }
  .logo { justify-content: center; margin-bottom: 1rem; }
}

/* Animations */
.fade-in { animation: fadeIn 1s ease forwards; opacity: 0; }
.zoom-in { animation: zoomIn 0.8s ease forwards; opacity: 0; }
.slide-in { animation: slideIn 0.6s ease forwards; opacity: 0; }

@keyframes fadeIn { to { opacity: 1; } }
@keyframes zoomIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
@keyframes slideIn { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
</style>