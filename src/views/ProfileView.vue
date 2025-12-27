<template>
  <div class="profile-layout animate__animated animate__fadeIn">
    <!-- Main Profile Card -->
    <div class="profile-card zoom-in">
      
      <!-- Header Navigation -->
      <div class="header-nav">
        <button @click="$router.push('/chat')" class="back-btn">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <h2>account settings</h2>
      </div>

      <!-- Profile Header (Avatar & Tier) -->
      <div class="profile-header">
        <div class="avatar-container">
          <!-- Avatar Image -->
          <img :src="form.avatar || defaultAvatar" class="avatar-img" alt="Profile" />
          
          <!-- Edit Overlay -->
          <label class="edit-badge">
             <i class="fa-solid fa-camera"></i>
             <input type="file" @change="handleFile" hidden accept="image/*">
          </label>
        </div>
        
        <div class="user-meta">
          <h3>{{ form.username || 'User Dev' }}</h3>
          
          <!-- Tier Badge -->
          <span class="tier-badge" :class="form.tier === 'Pro' ? 'pro' : 'free'">
            {{ form.tier || 'Free' }} plan
          </span>
          
          <!-- Upgrade Button (If Free) -->
          <button v-if="form.tier !== 'Pro'" @click="upgradeTier" class="upgrade-link">
            upgrade to pro <i class="fa-solid fa-crown"></i>
          </button>
        </div>
      </div>

      <!-- Settings Form -->
      <form @submit.prevent="updateProfile" class="settings-form">
        
        <!-- Username Input -->
        <div class="form-group">
          <label>username</label>
          <div class="input-wrap">
            <i class="fa-regular fa-user"></i>
            <input v-model="form.username" type="text" placeholder="your username">
          </div>
        </div>

        <!-- Email Input -->
        <div class="form-group">
          <label>email address</label>
          <div class="input-wrap">
            <i class="fa-regular fa-envelope"></i>
            <input v-model="form.email" type="email" placeholder="name@example.com">
          </div>
        </div>

        <!-- Password Input -->
        <div class="form-group">
          <label>new password (optional)</label>
          <div class="input-wrap">
            <i class="fa-solid fa-lock"></i>
            <input v-model="form.password" type="password" placeholder="leave blank to keep current">
          </div>
        </div>

        <!-- 2FA Toggle Section -->
        <div class="form-group toggle-group">
          <div class="toggle-text">
            <span class="t-title"><i class="fa-solid fa-shield-halved"></i> two-factor auth</span>
            <span class="t-desc">secure account with google authenticator.</span>
          </div>
          <label class="switch">
            <input type="checkbox" v-model="is2FAToggled" @change="handle2FAToggle">
            <span class="slider round"></span>
          </label>
        </div>

        <!-- Save Button -->
        <button type="submit" class="save-btn rubber-band-hover" :disabled="isLoading">
          <span v-if="isLoading"><i class="fa-solid fa-circle-notch fa-spin"></i> saving...</span>
          <span v-else>save changes</span>
        </button>
      </form>
    </div>

    <!-- QR CODE MODAL (Muncul saat setup 2FA) -->
    <div v-if="showQRModal" class="qr-modal-overlay fade-in">
      <div class="qr-card jack-in-the-box">
        <div class="qr-header">
          <i class="fa-solid fa-qrcode"></i>
          <h3>setup authenticator</h3>
        </div>
        
        <p>scan this qr code with your google authenticator app.</p>
        
        <!-- QR Image Container -->
        <div class="qr-wrapper">
          <img :src="qrCodeDataUrl" class="qr-img" alt="Scan QR Code" />
        </div>

        <!-- Verification Input -->
        <div class="input-group-qr">
          <input 
            v-model="verificationCode" 
            type="text" 
            placeholder="enter 6-digit code" 
            maxlength="6"
            @keyup.enter="verifyAndEnable2FA"
          >
          <button @click="verifyAndEnable2FA" class="verify-btn">
            activate
          </button>
        </div>
        
        <button @click="cancel2FASetup" class="cancel-btn">cancel setup</button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api' // Pastikan service api sudah ada sesuai instruksi sebelumnya

const isLoading = ref(false)
const defaultAvatar = 'https://ui-avatars.com/api/?name=User&background=6366f1&color=fff'

// Form State
const form = ref({
  username: '',
  email: '',
  password: '',
  avatar: '',
  tier: 'Free',
  is2FAEnabled: false
})

// 2FA State
const is2FAToggled = ref(false)   // State visual toggle switch
const showQRModal = ref(false)    // State modal visibility
const qrCodeDataUrl = ref('')     // URL gambar QR dari backend
const verificationCode = ref('')  // Kode input user
const currentUserId = ref('')     // ID User untuk API call

// Lifecycle: Load Data
onMounted(() => {
  const userStr = localStorage.getItem('userData')
  if (userStr) {
    const user = JSON.parse(userStr)
    // Populate form
    form.value = { ...form.value, ...user }
    form.value.password = '' // Kosongkan password demi keamanan visual
    currentUserId.value = user.id
    
    // Sync toggle dengan status 2FA user
    is2FAToggled.value = user.is2FAEnabled
  }
})

// Handle Avatar Upload (Convert to Base64)
const handleFile = (e) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      form.value.avatar = e.target.result // Simpan string Base64
    }
    reader.readAsDataURL(file)
  }
}

// Logic saat Toggle 2FA diklik
const handle2FAToggle = async () => {
  // Scenario 1: User mau mengaktifkan (Toggle ON, tapi data masih OFF)
  if (is2FAToggled.value && !form.value.is2FAEnabled) {
    try {
      isLoading.value = true
      // Request QR Code ke Backend
      const res = await api.setup2FA(currentUserId.value)
      
      qrCodeDataUrl.value = res.data.qrCode
      showQRModal.value = true // Tampilkan Modal
    } catch (e) {
      alert("Failed to generate QR Code. Please try again.")
      is2FAToggled.value = false // Kembalikan switch ke off
    } finally {
      isLoading.value = false
    }
  } 
  // Scenario 2: User mau mematikan (Toggle OFF, data masih ON)
  else if (!is2FAToggled.value && form.value.is2FAEnabled) {
    if(confirm("Are you sure you want to disable Two-Factor Authentication?")) {
      form.value.is2FAEnabled = false
      // Update ke backend nanti saat tombol Save diklik, atau bisa langsung call API disable disini
    } else {
      is2FAToggled.value = true // Cancel, kembalikan switch ke on
    }
  }
}

// Verifikasi Kode OTP dari Modal
const verifyAndEnable2FA = async () => {
  if (verificationCode.value.length !== 6) {
    alert("Please enter a 6-digit code.")
    return
  }

  try {
    const res = await api.verify2FASetup({ 
      userId: currentUserId.value, 
      code: verificationCode.value 
    })

    if (res.data.success) {
      form.value.is2FAEnabled = true
      is2FAToggled.value = true
      showQRModal.value = false // Tutup Modal
      verificationCode.value = ''
      
      alert("Two-Factor Authentication Activated Successfully!")
      
      // Update LocalStorage agar sinkron
      const user = JSON.parse(localStorage.getItem('userData'))
      user.is2FAEnabled = true
      localStorage.setItem('userData', JSON.stringify(user))
    }
  } catch (e) {
    alert("Invalid Code. Please check Google Authenticator again.")
  }
}

// Batal Setup 2FA
const cancel2FASetup = () => {
  showQRModal.value = false
  is2FAToggled.value = false // Kembalikan toggle ke posisi off
  verificationCode.value = ''
}

// Simpan Semua Perubahan Profile
const updateProfile = async () => {
  isLoading.value = true
  try {
    const token = localStorage.getItem('token')
    
    // Call API Update
    const res = await api.updateProfile({ 
      token, 
      ...form.value 
    })
    
    // Update LocalStorage dengan data terbaru dari server
    localStorage.setItem('userData', JSON.stringify(res.data))
    alert('Profile updated successfully!')
  } catch (error) {
    console.error(error)
    alert('Failed to update profile.')
  } finally {
    isLoading.value = false
  }
}

// Simulasi Upgrade Tier
const upgradeTier = () => {
  if(confirm("Upgrade to Pro Plan for $10/mo?")) {
    form.value.tier = 'Pro'
    alert("Welcome to Pro Plan! Click 'Save Changes' to confirm.")
  }
}
</script>

<style scoped>
/* Layout dasar mengikuti tema */
.profile-layout { 
  min-height: 100vh; 
  background: #020617; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  padding: 20px; 
  font-family: 'Plus Jakarta Sans', sans-serif; 
  color: #f8fafc; 
  text-transform: lowercase; 
}

/* Card Utama */
.profile-card { 
  width: 100%; 
  max-width: 480px; 
  background: #0f172a; 
  padding: 30px; 
  border-radius: 24px; 
  border: 1px solid rgba(255,255,255,0.05); 
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

/* Header Navigation */
.header-nav { display: flex; align-items: center; gap: 15px; margin-bottom: 30px; }
.back-btn { background: rgba(255,255,255,0.05); color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; transition: 0.2s; cursor: pointer; border: none; }
.back-btn:hover { background: #6366f1; }
h2 { font-size: 1.5rem; font-weight: 700; margin: 0; }

/* Profile Info Header */
.profile-header { display: flex; flex-direction: column; align-items: center; margin-bottom: 30px; text-align: center; }
.avatar-container { position: relative; margin-bottom: 15px; }
.avatar-img { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 3px solid #6366f1; box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }
.edit-badge { position: absolute; bottom: 0; right: 0; background: #22c55e; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: white; border: 3px solid #0f172a; transition: 0.2s; }
.edit-badge:hover { transform: scale(1.1); }

/* User Meta & Tier */
.user-meta h3 { font-size: 1.2rem; font-weight: 700; margin-bottom: 8px; }
.tier-badge { padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; display: inline-block; margin-right: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
.tier-badge.free { background: #334155; color: #94a3b8; }
.tier-badge.pro { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; box-shadow: 0 0 10px rgba(245, 158, 11, 0.4); }
.upgrade-link { background: none; color: #f59e0b; font-size: 0.8rem; cursor: pointer; font-weight: 600; border: none; }
.upgrade-link:hover { text-decoration: underline; }

/* Form Styles */
.settings-form { display: flex; flex-direction: column; gap: 20px; }
.form-group label { display: block; margin-bottom: 8px; font-size: 0.85rem; color: #94a3b8; font-weight: 600; }
.input-wrap { display: flex; align-items: center; background: #1e293b; border-radius: 12px; padding: 12px; gap: 10px; border: 1px solid rgba(255,255,255,0.05); transition: 0.3s; }
.input-wrap:focus-within { border-color: #6366f1; box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2); }
.input-wrap input { background: transparent; border: none; color: white; width: 100%; outline: none; font-size: 0.95rem; }
.input-wrap i { color: #64748b; }

/* 2FA Toggle Card */
.toggle-group { display: flex; justify-content: space-between; align-items: center; background: rgba(99, 102, 241, 0.05); padding: 15px; border-radius: 12px; border: 1px solid rgba(99, 102, 241, 0.1); }
.t-title { display: block; font-weight: 600; color: #818cf8; margin-bottom: 2px; }
.t-desc { font-size: 0.75rem; color: #64748b; }

/* Save Button */
.save-btn { background: #6366f1; color: white; padding: 16px; border-radius: 12px; font-weight: 700; margin-top: 10px; transition: 0.2s; font-size: 1rem; cursor: pointer; border: none; width: 100%; }
.save-btn:hover { background: #4f46e5; transform: translateY(-2px); }
.save-btn:disabled { background: #334155; cursor: not-allowed; }

/* Custom Switch Toggle */
.switch { position: relative; display: inline-block; width: 50px; height: 26px; }
.switch input { opacity: 0; width: 0; height: 0; }
.slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #334155; transition: .4s; border-radius: 34px; }
.slider:before { position: absolute; content: ""; height: 20px; width: 20px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; }
input:checked + .slider { background-color: #22c55e; }
input:checked + .slider:before { transform: translateX(24px); }

/* === QR CODE MODAL STYLES === */
.qr-modal-overlay { 
  position: fixed; top: 0; left: 0; right: 0; bottom: 0; 
  background: rgba(0,0,0,0.8); 
  display: flex; align-items: center; justify-content: center; 
  z-index: 1000; 
  backdrop-filter: blur(5px); 
}

.qr-card { 
  background: #1e293b; 
  padding: 30px; 
  border-radius: 20px; 
  text-align: center; 
  width: 340px; 
  border: 1px solid #6366f1; 
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
}

.qr-header { margin-bottom: 15px; }
.qr-header i { font-size: 2rem; color: #6366f1; margin-bottom: 10px; }
.qr-header h3 { font-size: 1.2rem; color: white; margin: 0; font-weight: 700; }

.qr-wrapper { 
  margin: 20px 0; 
  background: white; 
  padding: 10px; 
  border-radius: 10px; 
  display: inline-block; 
}
.qr-img { width: 180px; height: 180px; display: block; }

.input-group-qr { display: flex; gap: 10px; margin-bottom: 15px; justify-content: center; }
.input-group-qr input { 
  background: #0f172a; 
  border: 1px solid #334155; 
  color: white; 
  padding: 10px; 
  border-radius: 8px; 
  width: 140px;
  text-align: center; 
  font-weight: bold; 
  letter-spacing: 3px; 
  font-size: 1.1rem;
}
.input-group-qr input:focus { border-color: #22c55e; outline: none; }

.verify-btn { background: #22c55e; color: white; border: none; padding: 0 15px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: 0.2s; }
.verify-btn:hover { background: #16a34a; }

.cancel-btn { background: transparent; color: #94a3b8; border: none; font-size: 0.9rem; cursor: pointer; text-decoration: underline; transition: 0.2s; }
.cancel-btn:hover { color: white; }
</style>