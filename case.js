const { prepareWAMessageMedia, generateWAMessageFromContent, proto } = require("baileys");
const config = require('./config.js');
const { OPENAI } = require("./config");
const fs = require('fs');
const util = require('util');
const Jimp = require('jimp');
const axios = require("axios");
const OpenAI = require("openai");
const yts = require("yt-search");
const { exec } = require("child_process");
const { isOwner } = require('./config');
const fetch = require('node-fetch');
const chatnanoFile = './database/chatnano.json';
let chatnano = fs.existsSync(chatnanoFile) ? JSON.parse(fs.readFileSync(chatnanoFile, 'utf-8')) : [];

module.exports = async (sock, m) => {
try {
const body = (
m.mtype === 'conversation' && m.message.conversation ||
m.mtype === 'imageMessage' && m.message.imageMessage.caption ||
m.mtype === 'documentMessage' && m.message.documentMessage.caption ||
m.mtype === 'videoMessage' && m.message.videoMessage.caption ||
m.mtype === 'extendedTextMessage' && m.message.extendedTextMessage.text ||
m.mtype === 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId ||
m.mtype === 'templateButtonReplyMessage' && m.message.templateButtonReplyMessage.selectedId
) || '';

const budy = typeof m.text === 'string' ? m.text : '';
const prefixRegex = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><™©®Δ^βα~¦|/\\©^]/;
const prefix = prefixRegex.test(body) ? body.match(prefixRegex)[0] : '.';
const isCmd = body.startsWith(prefix);
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
const args = body.trim().split(/ +/).slice(1);
const text = args.join(" ");
const sender = m.key.fromMe ? sock.user.id.split(':')[0]+'@s.whatsapp.net' : (m.key.participant || m.key.remoteJid);
const botNumber = await sock.decodeJid(sock.user.id);
const senderNumber = sender.split('@')[0];
const isCreator = [botNumber, ...(global.owner || [])].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(sender);
const pushname = m.pushName || senderNumber;
     
async function fetchJson(url, options) {
    try {
        const res = await fetch(url, options);
        return await res.json();
    } catch (err) {
        throw err;
    }
}

function runtime(seconds) {
seconds = Number(seconds);
let d = Math.floor(seconds / (3600 * 24));
let h = Math.floor((seconds % (3600 * 24)) / 3600);
let m = Math.floor((seconds % 3600) / 60);
let s = Math.floor(seconds % 60);
return `${d}d ${h}h ${m}m ${s}s`;
}


const qproduk = {
  key: {
    participant: '0@s.whatsapp.net',
    ...(m.chat ? { remoteJid: 'status@broadcast' } : {})
  },
  message: {
    "productMessage": {
      "product": {
        "productImage": {
          "mimetype": "image/jpeg",
          "jpegThumbnail": fs.readFileSync("./media/produk.png") // Ganti dengan path gambar produk
        },
        "title": "BAYMAX BOT KESEHATAN",
        "description": "BAYMAX",
        "currencyCode": "IDR",
        "priceAmount1000": 999999999, 
        "retailerId": "BAYMAX",
        "productImageCount": 9999999999
      },
      "businessOwnerJid": "62815867727093@s.whatsapp.net" // Nomor admin toko
    }
  }
};
const qkeranjang = {
  key: {
    participant: '0@s.whatsapp.net',
    ...(m.chat ? { remoteJid: 'status@broadcast' } : {})
  },
  message: {
    "orderMessage": {
      "orderId": "999999999",
      "thumbnail": fs.readFileSync("./media/produk.png"), // Thumbnail produk
      "itemCount": 999999999, // Jumlah item dalam pesanan
      "status": 1,
      "surface": 1,
      "message": "BAYMAX ROBOT KESEHATAN"
    }
  }
};

const qtext = { key: {fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "0@s.whatsapp.net"} : {}) },'message': {extendedTextMessage: {text: body}}}
const qdoc = {key : {participant : '0@s.whatsapp.net', ...(m.chat ? { remoteJid: `status@broadcast` } : {}) },message: {documentMessage: {title: `_*BAYMAX TERVERIFIKASI*_`, jpegThumbnail: ""}}}
const qkontak = {
key: {
participant: `0@s.whatsapp.net`,
...(botNumber ? {
remoteJid: `status@broadcast`
} : {})
},
message: {
'contactMessage': {
'displayName': `BAYMAX`,
sendEphemeral: true
}}
}

switch (command) {   
case "menu": {
    let textnya = `Halo @${m.sender.split('@')[0]} 🥳
Perkenalkan, saya BAYMAX asisten kesehatan virtual yang siap membantu Anda!

Saya dikembangkan oleh Furqon, bekerja sama dengan tenaga medis, untuk memberikan informasi dan layanan kesehatan dengan mudah dan cepat.

*FITUR KESEHATAN*
* .baymax 
* .tidur 
* .obat
* .vaksin
* .konsultasi 
* .minuman
* .nutrisi
* .cekkolesterol
* .meditasi
* .sleeptracker
* .detakjantung
* .minum
* .polamakan
* .cekguladarah
* .cektekanandarah
* .latihan
* .imt
* .workout

*FITUR INFORMASI*
* .cuaca  

*FITUR ISLAMI*
* .autosolat

*FITUR SISTEM*
* .speed
* .donasi

Saya siap membantu Anda kapan saja!
`;

    await sock.sendMessage(m.chat, {
        image: { url: 'https://files.catbox.moe/leu217.jpg' },
        footer: `BAYMAX 2025`,
        headerType: 1,
        caption: textnya, 
        contextInfo: {
            isForwarded: true,
            mentionedJid: [m.sender],
            forwardedNewsletterMessageInfo: {
                newsletterJid: global.idSaluran,
                newsletterName: global.namaSaluran
            },
            externalAdReply: {
                containsAutoReply: true,
                mediaType: 1,
                mediaUrl: '',
                renderLargerThumbnail: false,
                showAdAttribution: true,
                thumbnailUrl: 'https://files.catbox.moe/leu217.jpg',
                title: `BAYMAX ROBOT🚀`,
                body: `BAYMAX BOT KESEHATAN`
            },
        }
    }, { quoted: qkeranjang });
}
break;
case "autosolat" : {
    let groupId = m.chat;
    let userId = sender;
    let argsCmd = args.join(" ").trim().toLowerCase();
    let autoSholatFile = "./database/autoSholat.json";
    sock.autoSholatStatus = fs.existsSync(autoSholatFile) ? JSON.parse(fs.readFileSync(autoSholatFile, "utf-8")) : {};
    if (argsCmd === "on") {
        if (sock.autoSholatStatus[groupId]) return m.reply("✅ *Auto Sholat sudah AKTIF di grup ini!*");
        // Simpan status Auto Sholat ke file, termasuk user yang mengaktifkan
        sock.autoSholatStatus[groupId] = { status: true, users: [userId] };
        fs.writeFileSync(autoSholatFile, JSON.stringify(sock.autoSholatStatus, null, 2));

        let jadwalSholat = `
╔══✦ *JADWAL SHOLAT HARI INI* ✦══╗
║ 🕌 *Shubuh*  : 04:29 WIB
║ ☀ *Dzuhur*  : 12:02 WIB
║ 🌆 *Ashar*   : 15:15 WIB
║ 🌇 *Maghrib* : 17:52 WIB
║ 🌙 *Isya*    : 19:01 WIB
╚═══════════════════════╝
✨ *Auto Sholat telah diaktifkan!* 
📢 Bot akan mengirim pengingat di grup dan chat pribadi.`;

        m.reply(jadwalSholat);
    } else if (argsCmd === "off") {
        if (!sock.autoSholatStatus[groupId]) return m.reply("⚠ *Auto Sholat sudah NONAKTIF di grup ini!*");
        delete sock.autoSholatStatus[groupId];
        fs.writeFileSync(autoSholatFile, JSON.stringify(sock.autoSholatStatus, null, 2));
        m.reply("❌ *Auto Sholat telah DINONAKTIFKAN untuk grup ini.*");
    } else {
        m.reply(`
📌 *Penggunaan Perintah Auto Sholat* 📌
╭──────────────╮
│ 🕌 *Autosolat On*  ✅
│ ✧ Mengaktifkan pengingat sholat (Grup & Pribadi)
│ 
│ 🚫 *Autosolat Off* ❌
│ ✧ Menonaktifkan pengingat sholat
╰──────────────╯
🔹 Contoh: *.autosolat on*
        `);
    }
}
break;
case "obat": {
    let obatFile = "./database/obatReminder.json";
    let obatData = fs.existsSync(obatFile) ? JSON.parse(fs.readFileSync(obatFile, "utf-8")) : {};

    let userId = sender;
    let command = args[0];

    if (!command) {
        return m.reply(`
🩺 *Pengingat Minum Obat* 🩺

📌 *Cara Menggunakan*:
➤ *obat atur [nama_obat] [jam]*  → Atur pengingat minum obat
   Contoh: *obat atur Paracetamol 08:00*
➤ *obat list*  → Lihat jadwal minum obatmu
➤ *obat hapus [nama_obat]*  → Hapus pengingat obat

⚠ Format waktu harus 24 jam (HH:MM).
`);
    }

    if (command === "atur") {
        if (args.length < 3) return m.reply("⚠ Format salah! Gunakan: *obat atur [nama_obat] [jam]*\nContoh: *obat atur Paracetamol 08:00*");

        let namaObat = args.slice(1, -1).join(" ");
        let jamObat = args[args.length - 1];
        let regexTime = /^([01]\d|2[0-3]):([0-5]\d)$/;

        if (!regexTime.test(jamObat)) return m.reply("⚠ Format waktu salah! Gunakan format 24 jam (HH:MM).\nContoh: *08:00*");

        if (!obatData[userId]) obatData[userId] = [];
        obatData[userId].push({ nama: namaObat, jam: jamObat });

        fs.writeFileSync(obatFile, JSON.stringify(obatData, null, 2));
        return m.reply(`✅ *Pengingat minum obat berhasil ditambahkan!*\n📌 Obat: *${namaObat}*\n⏰ Waktu: *${jamObat} WIB*`);
    }

    if (command === "list") {
        if (!obatData[userId] || obatData[userId].length === 0) return m.reply("⚠ Kamu belum memiliki pengingat minum obat.");

        let listObat = "📋 *Jadwal Minum Obatmu* 📋\n\n";
        obatData[userId].forEach((obat, i) => {
            listObat += `🩺 ${i + 1}. *${obat.nama}* - ⏰ ${obat.jam} WIB\n`;
        });

        return m.reply(listObat);
    }

    if (command === "hapus") {
        if (!obatData[userId] || obatData[userId].length === 0) return m.reply("⚠ Kamu belum memiliki pengingat minum obat.");

        let namaObat = args.slice(1).join(" ");
        let index = obatData[userId].findIndex(o => o.nama.toLowerCase() === namaObat.toLowerCase());

        if (index === -1) return m.reply("⚠ Obat tidak ditemukan dalam daftar pengingatmu.");

        obatData[userId].splice(index, 1);
        if (obatData[userId].length === 0) delete obatData[userId];

        fs.writeFileSync(obatFile, JSON.stringify(obatData, null, 2));
        return m.reply(`✅ *Pengingat minum obat untuk ${namaObat} telah dihapus!*`);
    }

    return m.reply("⚠ Perintah tidak dikenali! Gunakan *obat* untuk melihat panduan.");
}
break;
case 'hd':
case 'remini': {
    try {
        if (!m.quoted) return m.reply(`Kirim/Reply foto dengan caption *${prefix + command}*`)
        let mime = m.quoted.mimetype || ''
        if (!/image/.test(mime)) return m.reply(`Kirim/Reply foto dengan caption *${prefix + command}*`)

        await sock.sendMessage(m.chat, { react: { text: "⏳", key: m.key } })

        const { remini } = require('./database/remini')
        let media = await m.quoted.download()
        
        let hasil = await remini(media, "enhance")
        if (!hasil) return m.reply("❌ Gagal meningkatkan kualitas gambar.")

        await sock.sendMessage(m.chat, { 
            image: hasil, 
            caption: `*✅ Berhasil!*\n_BAYMAX • 2025_`
        }, { quoted: m })

    } catch (err) {
        console.error(err)
        m.reply("⚠️ Terjadi kesalahan, coba lagi nanti.")
    }
}
break
case "polamakan": {
    if (args.length < 1) {
        return m.reply("⚠ *Masukkan kondisi kesehatan Anda!*\n\nContoh:\n- *.polamakan diabetes*\n- *.polamakan hipertensi*\n- *.polamakan asam lambung*\n- *.polamakan jantung*\n- *.polamakan ibu hamil*");
    }

    let kondisi = args.join(" ").trim().toLowerCase();
    let rekomendasi = {
        "diabetes": "🍏 *Rekomendasi Pola Makan untuk Diabetes:*\n✅ Perbanyak sayuran hijau (bayam, brokoli, kale)\n✅ Konsumsi protein tanpa lemak (ikan, ayam tanpa kulit)\n✅ Pilih karbohidrat kompleks (oatmeal, ubi, quinoa)\n✅ Hindari makanan manis & minuman bersoda\n✅ Kurangi nasi putih, ganti dengan nasi merah",
        "hipertensi": "🫀 *Rekomendasi Pola Makan untuk Hipertensi:*\n✅ Konsumsi makanan rendah garam\n✅ Perbanyak buah & sayur (pisang, jeruk, bayam)\n✅ Pilih protein rendah lemak (ikan, dada ayam, tahu)\n✅ Hindari makanan olahan & instan\n✅ Minum cukup air dan batasi kafein",
        "asam lambung": "🔥 *Rekomendasi Pola Makan untuk Asam Lambung:*\n✅ Makan dalam porsi kecil tapi sering\n✅ Pilih makanan rendah asam (pisang, oatmeal, kentang)\n✅ Hindari makanan pedas, berminyak, dan berkafein\n✅ Jangan makan sebelum tidur, beri jeda 2-3 jam\n✅ Minum air putih yang cukup",
        "jantung": "❤️ *Rekomendasi Pola Makan untuk Kesehatan Jantung:*\n✅ Konsumsi ikan berlemak (salmon, tuna, sarden)\n✅ Perbanyak serat dari sayur & buah (alpukat, apel, brokoli)\n✅ Pilih lemak sehat (kacang-kacangan, minyak zaitun)\n✅ Kurangi garam dan makanan olahan\n✅ Batasi konsumsi daging merah",
        "ibu hamil": "🤰 *Rekomendasi Pola Makan untuk Ibu Hamil:*\n✅ Konsumsi makanan tinggi zat besi (bayam, daging tanpa lemak)\n✅ Perbanyak protein sehat (telur, tahu, ikan)\n✅ Pilih karbohidrat kompleks (beras merah, ubi, oatmeal)\n✅ Hindari makanan mentah & berkafein\n✅ Minum air putih yang cukup",
        "anak-anak": "👶 *Rekomendasi Pola Makan untuk Anak-anak:*\n✅ Makanan tinggi protein (telur, susu, ikan)\n✅ Perbanyak buah & sayur (wortel, apel, pisang)\n✅ Karbohidrat sehat (nasi, kentang, roti gandum)\n✅ Hindari makanan tinggi gula & junk food\n✅ Pastikan cukup cairan setiap hari",
        "lansia": "👴 *Rekomendasi Pola Makan untuk Lansia:*\n✅ Konsumsi makanan tinggi kalsium (susu rendah lemak, ikan teri)\n✅ Pilih protein rendah lemak (ayam, tahu, tempe)\n✅ Perbanyak serat dari buah dan sayur\n✅ Kurangi garam & gula\n✅ Pastikan cukup minum untuk mencegah dehidrasi",
        "diet": "🍽 *Rekomendasi Pola Makan untuk Diet:*\n✅ Makan dengan porsi kecil tapi sering\n✅ Konsumsi protein tinggi (telur, ayam, ikan)\n✅ Pilih karbohidrat kompleks (kentang, quinoa, beras merah)\n✅ Hindari makanan berminyak & tinggi gula\n✅ Minum air putih sebelum makan",
        "sehat": "💪 *Rekomendasi Pola Makan Sehat:*\n✅ Konsumsi makanan bergizi seimbang\n✅ Pilih makanan alami, hindari makanan olahan\n✅ Perbanyak serat dari sayur dan buah\n✅ Minum cukup air setiap hari\n✅ Kurangi konsumsi gula dan garam",
    };

    let hasil = rekomendasi[kondisi] || "⚠ *Kondisi tidak ditemukan!*\nGunakan perintah seperti:\n- *.polamakan diabetes*\n- *.polamakan hipertensi*\n- *.polamakan asam lambung*\n- *.polamakan jantung*\n- *.polamakan ibu hamil*\n- *.polamakan anak-anak*\n- *.polamakan lansia*";

    return m.reply(hasil);
}
break;
case "konsultasi": {
    if (args.length < 1) return m.reply("⚠ *Masukkan pertanyaan kesehatan Anda!*\n\nContoh:\n- *.konsultasi Saya sering sakit kepala, kenapa ya?*\n- *.konsultasi Bagaimana cara menurunkan tekanan darah?*");

    let pertanyaan = args.join(" ").trim();
    m.reply("⏳ *Tunggu sebentar*");

    try {
        const OpenAI = require("openai");
        const openai = new OpenAI({
            apiKey: "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", // Ganti dengan API Key yang masih aktif
        });

        let response = await openai.chat.completions.create({
            model: "gpt-4o-mini", 
            messages: [
                { role: "system", content: "Anda adalah asisten kesehatan yang memberikan saran medis secara umum." },
                { role: "user", content: pertanyaan }
            ],
            max_tokens: 200
        });

        let jawaban = response.choices[0].message.content;

        return m.reply(`🩺 *Konsultasi Kesehatan*\n\n💬 *Pertanyaan:* ${pertanyaan}\n\n🩺 *Jawaban:* ${jawaban}\n\n⚠ *Catatan:* Informasi ini hanya sebagai referensi dan bukan pengganti dokter.`);
    } catch (error) {
        console.error(error);
        return m.reply("⚠ *Terjadi kesalahan saat mengambil data konsultasi. Coba lagi nanti!*");
    }
}
break;
case "minuman": {
    if (args.length < 1) return m.reply("⚠ *Masukkan kategori minuman sehat!*\n\nContoh:\n- `.minuman energi`\n- `.minuman detox`\n- `.minuman tidur`");

    let kategori = args[0].toLowerCase();
    let rekomendasi = "";

    switch (kategori) {
        case "energi":
            rekomendasi = `⚡ *Minuman Penambah Energi*\n\n✅ **Smoothie Pisang & Susu Almond** 🍌🥛\n- 1 buah pisang\n- 200ml susu almond\n- 1 sdt madu\n\n✅ **Teh Hijau & Lemon** 🍵🍋\n- 1 gelas teh hijau hangat\n- 1 iris lemon\n- 1 sdt madu\n\n🔥 *Minuman ini akan memberikan energi alami tanpa kafein berlebihan!*`;
            break;
        case "detox":
            rekomendasi = `🌿 *Minuman Detox Tubuh*\n\n✅ **Air Lemon & Madu** 🍋🍯\n- 1 gelas air hangat\n- 1/2 buah lemon\n- 1 sdt madu\n\n✅ **Infused Water Timun & Mint** 🥒🌱\n- 500ml air putih\n- 3 iris timun\n- 3 helai daun mint\n\n💧 *Minuman ini membantu membersihkan racun dalam tubuh!*`;
            break;
        case "tidur":
            rekomendasi = `😴 *Minuman untuk Tidur Nyenyak*\n\n✅ **Susu Hangat & Madu** 🥛🍯\n- 200ml susu hangat\n- 1 sdt madu\n\n✅ **Teh Chamomile** 🍵🌼\n- 1 gelas teh chamomile hangat\n- 1 sdt madu (opsional)\n\n🌙 *Minuman ini akan membantu tidur lebih nyenyak dan rileks!*`;
            break;
        default:
            return m.reply("⚠ *Kategori minuman tidak ditemukan!*\n\nGunakan: `energi`, `detox`, atau `tidur`.\n\nContoh: `.minuman energi`");
    }

    return m.reply(rekomendasi);
}
break;
case "workout": {
    if (args.length < 1) return m.reply("⚠ *Masukkan tujuan workout Anda!*\n\nContoh:\n- `.workout diet`\n- `.workout otot`\n- `.workout kesehatan`");

    let tujuan = args[0].toLowerCase();
    let rekomendasi = "";

    switch (tujuan) {
        case "diet":
            rekomendasi = `🏋️ *Workout untuk Diet*\n\n✅ **Latihan Kardio:**\n- 30 menit jogging / skipping\n- 20 menit HIIT workout\n- 10 menit jumping jacks\n\n✅ **Latihan Kekuatan:**\n- Squat (3x12)\n- Push-up (3x10)\n- Plank (30 detik x 3 set)\n\n🔥 *Lakukan ini minimal 4x seminggu untuk hasil optimal!*`;
            break;
        case "otot":
            rekomendasi = `💪 *Workout untuk Membangun Otot*\n\n✅ **Latihan Beban:**\n- Bench Press (4x10)\n- Deadlift (4x8)\n- Squat (4x12)\n\n✅ **Latihan Tambahan:**\n- Pull-up (3x8)\n- Dips (3x10)\n- Bicep Curl (3x12)\n\n🏆 *Pastikan asupan protein cukup & istirahat yang baik!*`;
            break;
        case "kesehatan":
            rekomendasi = `🧘 *Workout untuk Kesehatan*\n\n✅ **Latihan Ringan:**\n- 15 menit jalan cepat\n- 10 menit stretching\n- 20 menit yoga / meditasi\n\n✅ **Pola Sehat:**\n- Minum cukup air (2L/hari)\n- Tidur cukup (7-8 jam)\n- Hindari junk food\n\n🌿 *Jaga pola hidup sehat setiap hari!*`;
            break;
        default:
            return m.reply("⚠ *Tujuan workout tidak ditemukan!*\n\nGunakan: `diet`, `otot`, atau `kesehatan`.\n\nContoh: `.workout diet`");
    }

    return m.reply(rekomendasi);
}
break;
case "cektekanandarah": {
    if (args.length < 1 || !args[0].includes("/")) {
        return m.reply("⚠ *Masukkan tekanan darah Anda dalam format sistolik/diastolik!*\n\n📌 Contoh: *.cektekanandarah 120/80*");
    }

    let tekanan = args[0].split("/");
    if (tekanan.length !== 2 || isNaN(tekanan[0]) || isNaN(tekanan[1])) {
        return m.reply("⚠ *Format salah!* Masukkan tekanan darah dalam bentuk angka, contoh: *.cektekanandarah 120/80*");
    }

    let sistolik = parseInt(tekanan[0]);
    let diastolik = parseInt(tekanan[1]);
    let kategori = "";
    let saran = "";

    if (sistolik < 90 || diastolik < 60) {
        kategori = "⚠ *Hipotensi (Tekanan Darah Rendah)*";
        saran = "💡 *Saran:*\n- Konsumsi lebih banyak air putih.\n- Makan makanan bergizi dengan cukup garam.\n- Hindari berdiri terlalu lama atau bangun tiba-tiba.";
    } else if (sistolik >= 90 && sistolik <= 120 && diastolik >= 60 && diastolik <= 80) {
        kategori = "✅ *Normal*";
        saran = "💡 *Saran:*\n- Pertahankan pola hidup sehat.\n- Jaga berat badan ideal.\n- Rutin olahraga dan kurangi stres.";
    } else if (sistolik > 120 && sistolik <= 139 || diastolik > 80 && diastolik <= 89) {
        kategori = "⚠ *Prehipertensi (Sedikit Tinggi)*";
        saran = "💡 *Saran:*\n- Kurangi konsumsi garam dan makanan olahan.\n- Perbanyak sayur, buah, dan protein sehat.\n- Lakukan aktivitas fisik secara rutin.";
    } else {
        kategori = "🚨 *Hipertensi (Tekanan Darah Tinggi)*";
        saran = "💡 *Saran:*\n- Kurangi konsumsi garam dan makanan berlemak.\n- Perbanyak minum air putih dan makan makanan sehat.\n- Rutin cek tekanan darah dan konsultasi dengan dokter.";
    }

    let pesan = `🩺 *Cek Tekanan Darah*\n\n💉 *Hasil:* ${sistolik}/${diastolik} mmHg\n📌 *Kategori:* ${kategori}\n\n${saran}`;
    return m.reply(pesan);
}
break;
case "imt": {
    if (args.length < 2) {
        return m.reply("⚖️ *Kalkulator IMT (BMI Calculator)* ⚖️\n\n📌 *Cara Menggunakan:*\n➤ *imt [berat_kg] [tinggi_cm]*\n   Contoh: *imt 70 175*\n\n⚠ Pastikan memasukkan angka dengan benar!");
    }

    let berat = parseFloat(args[0]);
    let tinggi = parseFloat(args[1]) / 100; // Konversi ke meter

    if (isNaN(berat) || isNaN(tinggi) || berat <= 0 || tinggi <= 0) {
        return m.reply("⚠ Mohon masukkan berat & tinggi yang valid!\nContoh: *imt 65 170*");
    }

    let imt = berat / (tinggi * tinggi);
    let kategori = "";

    if (imt < 18.5) {
        kategori = "🟡 *Berat badan kurang (Underweight)*\n⚠ Coba tingkatkan asupan kalori dengan makanan bergizi!";
    } else if (imt >= 18.5 && imt <= 24.9) {
        kategori = "🟢 *Berat badan normal*\n✅ Pertahankan pola hidup sehat!";
    } else if (imt >= 25 && imt <= 29.9) {
        kategori = "🟠 *Berat badan berlebih (Overweight)*\n⚠ Jaga pola makan dan rutin olahraga!";
    } else {
        kategori = "🔴 *Obesitas*\n⚠ Perhatikan pola makan dan aktivitas fisik untuk menjaga kesehatan!";
    }

    let message = `
⚖️ *Hasil Kalkulator IMT* ⚖️
📊 IMT: *${imt.toFixed(2)}*
🔍 Kategori: ${kategori}

📌 Rekomendasi:
- Makan makanan sehat dan bergizi 🥦🍎
- Jaga pola tidur yang baik 😴
- Rutin berolahraga 🏃‍♂️🚴‍♂️
`;

    return m.reply(message);
}
break;
case "detakjantung": {
    if (args.length < 1) {
        return m.reply("🫀 *Cek Detak Jantung* 🫀\n\n📌 *Cara Menggunakan:*\n➤ *detakjantung [BPM]*\n   Contoh: *detakjantung 75*\n\n⚠ Pastikan masukkan angka BPM dengan benar!");
    }

    let bpm = parseInt(args[0]);
    if (isNaN(bpm) || bpm <= 0) {
        return m.reply("⚠ Mohon masukkan angka BPM yang valid!\nContoh: *detakjantung 72*");
    }

    let kondisi = "";
    if (bpm < 60) {
        kondisi = "🟡 *Detak jantung rendah (Bradikardia)*\n⚠ Bisa disebabkan oleh faktor seperti olahraga berat, usia, atau masalah jantung.\n🚑 Jika merasa pusing atau lemas, segera konsultasi ke dokter.";
    } else if (bpm >= 60 && bpm <= 100) {
        kondisi = "🟢 *Detak jantung normal*\n✅ Jantungmu berdetak dengan sehat dan normal.";
    } else {
        kondisi = "🔴 *Detak jantung tinggi (Tachycardia)*\n⚠ Bisa disebabkan oleh stres, dehidrasi, atau masalah kesehatan.\n🚑 Jika merasa sesak napas atau nyeri dada, segera periksa ke dokter!";
    }

    let message = `
🫀 *Hasil Cek Detak Jantung* 🫀
💓 BPM: *${bpm} BPM*
📊 Kondisi: ${kondisi}

📌 Rekomendasi:
- Jika merasa tidak nyaman, segera istirahat.
- Jika detak jantung terlalu rendah/tinggi, periksa ke dokter.
- Tetap jaga pola hidup sehat! 🏃‍♂️🥦
`;

    return m.reply(message);
}
break;
case "cekguladarah": {
    if (args.length < 1 || isNaN(args[0])) {
        return m.reply("⚠ *Masukkan kadar gula darah Anda dalam mg/dL!*\n\n📌 Contoh: *.cekguladarah 95*");
    }

    let gulaDarah = parseFloat(args[0]);
    let kategori = "";
    let saran = "";

    if (gulaDarah < 70) {
        kategori = "⚠ *Hipoglikemia (Rendah)*";
        saran = "🩸 *Saran:*\n- Konsumsi makanan manis seperti permen atau jus buah.\n- Segera makan makanan yang mengandung karbohidrat.\n- Jika terus merasa lemas atau pusing, segera periksa ke dokter.";
    } else if (gulaDarah >= 70 && gulaDarah <= 140) {
        kategori = "✅ *Normal*";
        saran = "🩸 *Saran:* \n- Pertahankan pola makan sehat.\n- Lakukan olahraga rutin.\n- Kontrol asupan gula harian.";
    } else {
        kategori = "⚠ *Hiperglikemia (Tinggi)*";
        saran = "🩸 *Saran:* \n- Kurangi makanan tinggi gula dan karbohidrat sederhana.\n- Perbanyak konsumsi air putih.\n- Lakukan aktivitas fisik secara teratur.\n- Jika kadar gula terus tinggi, konsultasikan dengan dokter.";
    }

    let pesan = `🩺 *Cek Kadar Gula Darah*\n\n💉 *Hasil:* ${gulaDarah} mg/dL\n📌 *Kategori:* ${kategori}\n\n${saran}`;
    return m.reply(pesan);
}
break;

case "latihan": {
    if (args.length < 2) return m.reply("⚠ Gunakan format: *.latihan [jenis] [durasi]*\n\nContoh:\n- *.latihan yoga 10*\n- *.latihan stretching 5*\n- *.latihan olahraga 15*");

    let jenis = args[0].toLowerCase();
    let durasi = parseInt(args[1]);

    if (!["yoga", "stretching", "olahraga"].includes(jenis)) return m.reply("⚠ Jenis latihan tidak dikenali! Gunakan: *yoga, stretching, atau olahraga*.");
    if (isNaN(durasi) || durasi <= 0) return m.reply("⚠ Durasi harus berupa angka dalam menit!");

    let latihan = {
        yoga: [
            "🧘‍♂️ *Yoga - 5 Menit*\n1. Child’s Pose (1 menit)\n2. Downward Dog (1 menit)\n3. Cat-Cow Stretch (1 menit)\n4. Seated Forward Bend (1 menit)\n5. Savasana (1 menit)",
            "🧘‍♂️ *Yoga - 10 Menit*\n1. Sun Salutation A (2 menit)\n2. Warrior Pose (2 menit)\n3. Triangle Pose (2 menit)\n4. Bridge Pose (2 menit)\n5. Savasana (2 menit)",
            "🧘‍♂️ *Yoga - 15 Menit*\n1. Sun Salutation B (3 menit)\n2. Tree Pose (3 menit)\n3. Cobra Pose (3 menit)\n4. Seated Forward Bend (3 menit)\n5. Savasana (3 menit)"
        ],
        stretching: [
            "🤸 *Stretching - 5 Menit*\n1. Neck Stretch (30 detik)\n2. Shoulder Stretch (30 detik)\n3. Side Stretch (30 detik per sisi)\n4. Hamstring Stretch (1 menit)\n5. Seated Spinal Twist (1 menit)",
            "🤸 *Stretching - 10 Menit*\n1. Full Body Stretch (2 menit)\n2. Quad Stretch (1 menit per sisi)\n3. Chest Opener (2 menit)\n4. Hip Flexor Stretch (2 menit)\n5. Butterfly Stretch (2 menit)",
            "🤸 *Stretching - 15 Menit*\n1. Full Body Stretch (3 menit)\n2. Shoulder & Arm Stretch (3 menit)\n3. Spinal Twist (3 menit)\n4. Hamstring Stretch (3 menit)\n5. Butterfly Stretch (3 menit)"
        ],
        olahraga: [
            "🏃 *Olahraga Ringan - 5 Menit*\n1. Jumping Jacks (1 menit)\n2. High Knees (1 menit)\n3. Bodyweight Squats (1 menit)\n4. Plank (1 menit)\n5. Cool Down Stretch (1 menit)",
            "🏃 *Olahraga Ringan - 10 Menit*\n1. Jumping Jacks (2 menit)\n2. High Knees (2 menit)\n3. Lunges (2 menit)\n4. Push-ups (2 menit)\n5. Plank (2 menit)",
            "🏃 *Olahraga Ringan - 15 Menit*\n1. Jump Rope (3 menit)\n2. Squats (3 menit)\n3. Push-ups (3 menit)\n4. Lunges (3 menit)\n5. Plank (3 menit)"
        ]
    };

    let pilihan;
    if (durasi <= 5) pilihan = latihan[jenis][0];
    else if (durasi <= 10) pilihan = latihan[jenis][1];
    else pilihan = latihan[jenis][2];

    return m.reply(`💪 *Rekomendasi Latihan ${jenis.toUpperCase()} - ${durasi} Menit*\n\n${pilihan}\n\n🔥 Selamat berlatih!`);
}
break;
case "cekkolesterol": {
    if (args.length < 1 || isNaN(args[0])) {
        return m.reply("⚠ *Masukkan kadar kolesterol Anda dalam mg/dL!*\n\n📌 Contoh: *.cekkolesterol 180*");
    }

    let kolesterol = parseInt(args[0]);
    let kategori = "";
    let saran = "";

    if (kolesterol < 200) {
        kategori = "✅ *Normal*";
        saran = "💡 *Saran:*\n- Pertahankan pola makan sehat.\n- Rutin olahraga dan jaga berat badan.\n- Hindari makanan tinggi lemak jenuh.";
    } else if (kolesterol >= 200 && kolesterol <= 239) {
        kategori = "⚠ *Batas Tinggi*";
        saran = "💡 *Saran:*\n- Kurangi konsumsi makanan berlemak dan gorengan.\n- Perbanyak makan serat dari buah dan sayur.\n- Olahraga rutin minimal 30 menit per hari.";
    } else {
        kategori = "🚨 *Tinggi (Hiperlipidemia)*";
        saran = "💡 *Saran:*\n- Hindari makanan berlemak jenuh seperti daging berlemak dan makanan olahan.\n- Konsumsi ikan berlemak (salmon, tuna) yang kaya omega-3.\n- Rutin periksa kadar kolesterol dan konsultasi dengan dokter.";
    }

    let pesan = `🩸 *Cek Kadar Kolesterol*\n\n📊 *Hasil:* ${kolesterol} mg/dL\n📌 *Kategori:* ${kategori}\n\n${saran}`;
    return m.reply(pesan);
}
break;
case "minum": {
    let waterFile = "./database/waterReminder.json";
    let waterData = fs.existsSync(waterFile) ? JSON.parse(fs.readFileSync(waterFile, "utf-8")) : {};

    let userId = sender;
    let command = args[0];

    if (!command) {
        return m.reply(`
💧 *Reminder Minum Air* 💧

📌 *Cara Menggunakan*:
➤ *minum atur [interval_menit]*  → Atur pengingat minum air
   Contoh: *minum atur 60* (Setiap 60 menit)
➤ *minum list*  → Lihat status pengingat
➤ *minum off*  → Matikan pengingat minum air

⚠ Minimal 30 menit, maksimal 180 menit.
`);
    }

    if (command === "atur") {
        if (args.length < 2) return m.reply("⚠ Format salah! Gunakan: *minum atur [interval_menit]*\nContoh: *minum atur 60*");

        let interval = parseInt(args[1]);
        if (isNaN(interval) || interval < 30 || interval > 180) {
            return m.reply("⚠ Interval harus dalam rentang *30-180 menit*.");
        }

        waterData[userId] = {
            interval: interval,
            lastReminder: Date.now() - interval * 60 * 1000
        };

        fs.writeFileSync(waterFile, JSON.stringify(waterData, null, 2));
        return m.reply(`✅ *Reminder minum air berhasil diaktifkan!*\n💧 Interval: *${interval} menit*\n🔔 Bot akan mengingatkan kamu secara berkala.`);
    }

    if (command === "list") {
        if (!waterData[userId]) return m.reply("⚠ Kamu belum mengaktifkan reminder minum air.");

        let userReminder = waterData[userId];
        return m.reply(`💧 *Status Reminder Minum Air*\n➤ Interval: *${userReminder.interval} menit*\n✅ Aktif`);
    }

    if (command === "off") {
        if (!waterData[userId]) return m.reply("⚠ Reminder minum air tidak aktif.");

        delete waterData[userId];
        fs.writeFileSync(waterFile, JSON.stringify(waterData, null, 2));
        return m.reply("❌ *Reminder minum air telah dinonaktifkan!*");
    }

    return m.reply("⚠ Perintah tidak dikenali! Gunakan *minum* untuk melihat panduan.");
}
break;
case "vaksin": {
    let teks = `💉 *Jadwal & Informasi Vaksinasi* 💉\n\n` +
               `🧒 **Bayi & Anak-anak**\n` +
               `✅ Hepatitis B: Saat lahir\n` +
               `✅ BCG: 1 bulan\n` +
               `✅ DPT-HB-Hib: 2, 3, 4 bulan\n` +
               `✅ Polio: 0-6 bulan\n` +
               `✅ Campak-Rubella: 9 bulan\n\n` +
               `🧑‍🎓 **Remaja & Dewasa**\n` +
               `✅ HPV: 9-26 tahun (untuk pencegahan kanker serviks)\n` +
               `✅ Tetanus-Diphtheria (Td): Setiap 10 tahun\n\n` +
               `👴 **Lansia & Orang dengan Kondisi Tertentu**\n` +
               `✅ Influenza: Tahunan\n` +
               `✅ Pneumonia: 50+ tahun\n` +
               `✅ COVID-19: Sesuai anjuran\n\n` +
               `🔍 *Untuk informasi lebih lanjut, konsultasikan dengan dokter atau fasilitas kesehatan terdekat.* 🏥`;
    return m.reply(teks);
}
break;
case "meditasi": {
    let teks = `🧘‍♂️ *Panduan Meditasi & Relaksasi* 🧘‍♀️\n\n1️⃣ **Cari Tempat yang Tenang**\n   - Duduk dengan nyaman di tempat yang tenang.\n\n2️⃣ **Atur Pernapasan**\n   - Tarik napas dalam-dalam melalui hidung selama 4 detik.\n   - Tahan selama 4 detik.\n   - Buang napas perlahan melalui mulut selama 6 detik.\n   - Ulangi selama 5 menit.\n\n3️⃣ **Fokus pada Pikiran Positif**\n   - Tutup mata dan bayangkan suasana yang menenangkan.\n   - Biarkan pikiran negatif berlalu tanpa menghakimi.\n\n4️⃣ **Gunakan Musik Relaksasi**\n   - Dengarkan suara alam atau musik meditasi untuk meningkatkan efek relaksasi.\n\n✅ *Coba praktikkan meditasi ini selama 5-10 menit setiap hari untuk hasil terbaik!* 🧘‍♂️✨`;
    return m.reply(teks);
}
break;
case "nutrisi": {
    if (args.length < 1) return m.reply("🍎 *Cek Nutrisi Makanan* 🍎\n\n📌 *Cara Menggunakan:*\n➤ *nutrisi [nama_makanan]*\n   Contoh: *nutrisi nasi goreng*\n\n⚠ Pastikan menulis nama makanan dengan jelas!");

    let foodQuery = args.join(" ").trim();
    let apiUrl = `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(foodQuery)}`;

    try {
        let response = await axios.get(apiUrl, {
            headers: { "X-Api-Key": "BAC+e7OAPVqNYiNtgkj7Qw==ZV1JoOPhQSfwAlpo" }
        });

        if (!response.data.items || response.data.items.length === 0) {
            return m.reply(`⚠ Maaf, informasi untuk *${foodQuery}* tidak ditemukan.`);
        }

        let foodData = response.data.items[0];

        let message = `
🍽 *Informasi Nutrisi* 🍽
🍜 Makanan: *${foodQuery}*
📊 Kalori: *${foodData.calories} kcal*
💪 Protein: *${foodData.protein_g} g*
🥑 Lemak: *${foodData.fat_total_g} g*
🍞 Karbohidrat: *${foodData.carbohydrates_total_g} g*
🧂 Gula: *${foodData.sugar_g} g*
🧂 Garam: *${foodData.sodium_mg} mg*
💦 Serat: *${foodData.fiber_g} g*

⚠ Data ini berdasarkan porsi standar.
`;

        return m.reply(message);
    } catch (err) {
        console.error("⚠ Error saat mengambil data nutrisi:", err);
        return m.reply("⚠ Maaf, terjadi kesalahan saat mengambil data nutrisi. Coba lagi nanti.");
    }
}
break;
case 'ping':
case 'speed': {
    let start = Date.now(); 
    sock.sendMessage(m.chat, { text: "Menghitung kecepatan respons..." })
        .then(() => {
            let latency = Date.now() - start; 
            let usedMemory = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
            let platform = process.platform; 
            let cpuUsage = (process.cpuUsage().user / 1024 / 1024).toFixed(2);
            let statusImage;
            if (latency < 200) {
                statusImage = 'https://files.catbox.moe/iijgr0.png'; 
            } else if (latency < 500) {
                statusImage = 'https://files.catbox.moe/iijgr0.png'; 
            } else {
                statusImage = 'https://files.catbox.moe/iijgr0.png'; 
            }
            let response = `🚀 *BOT STATUS*\n\n`
                + `📶 *Kecepatan Respons:* ${latency}ms\n`
                + `🖥 *Platform:* ${platform}\n`
                + `💾 *RAM Digunakan:* ${usedMemory} MB\n`
                + `⚙️ *CPU Usage:* ${cpuUsage} MB\n`;

            sock.sendMessage(m.chat, { 
                image: { url: statusImage }, 
                caption: response 
            }, { quoted: qproduk });
});
}
break;

case "baymax": {
    if (args[0] === "on") {
        if (chatnano.includes(m.chat)) return m.reply("Baymax sudah di aktifkan sebelumnya!!");
        chatnano.push(m.chat);
        fs.writeFileSync(chatnanoFile, JSON.stringify(chatnano, null, 2));
        m.reply("_⚡BAYMAX BERHASIL DI AKTIFKAN_🚀");
    } else if (args[0] === "off") {
        if (!chatnano.includes(m.chat)) return m.reply("Baymax sudah nonaktif sebelumnya!");
        chatnano = chatnano.filter(chat => chat !== m.chat);
        fs.writeFileSync(chatnanoFile, JSON.stringify(chatnano, null, 2));
        m.reply("_⚡BAYMAX BERHASIL DI NONAKTIFKAN🚀_");
    } else {
        m.reply("Gunakan perintah: *baymax on* atau *baymax off*");
    }
}
break;

case "donasi": {
if (global.qris == false) return m.reply('Donasi Tidak Tersedia')
let teks = `
Silakan scan QRIS di atas untuk mendukung pengembangan BAYMAX. Terima kasih atas dukunganmu!`
sock.sendMessage(m.chat, {image: {url: global.qris}, caption: teks}, {quoted: qproduk})
}
break

case "tidur": {
    let sleepFile = "./database/sleepSchedule.json";
    let sleepData = fs.existsSync(sleepFile) ? JSON.parse(fs.readFileSync(sleepFile, "utf-8")) : [];

    if (args[0] === "atur") {
        if (args.length < 3) return m.reply("Format salah!\nGunakan: *tidur atur [jam_tidur] [jam_bangun]*\nContoh: *tidur atur 22:00 06:00*");

        let sleepTime = args[1];
        let wakeTime = args[2];
        let regexTime = /^([01]\d|2[0-3]):([0-5]\d)$/;

        if (!regexTime.test(sleepTime) || !regexTime.test(wakeTime)) {
            return m.reply("Format waktu salah! Gunakan format 24 jam (HH:MM). Contoh: *22:00 06:00*");
        }

        let userSchedule = {
            user: sender,
            sleepTime: sleepTime,
            wakeTime: wakeTime
        };

        let existingIndex = sleepData.findIndex(s => s.user === sender);
        if (existingIndex !== -1) {
            sleepData[existingIndex] = userSchedule;
        } else {
            sleepData.push(userSchedule);
        }

        fs.writeFileSync(sleepFile, JSON.stringify(sleepData, null, 2));
        return m.reply(`✅ Jadwal tidur berhasil diatur!\n🛏 Tidur: ${sleepTime} WIB\n☀ Bangun: ${wakeTime} WIB`);
    }

    if (args[0] === "off") {
        sleepData = sleepData.filter(s => s.user !== sender);
        fs.writeFileSync(sleepFile, JSON.stringify(sleepData, null, 2));
        return m.reply("❌ Pengingat waktu tidur telah dinonaktifkan.");
    }

    return m.reply("Gunakan:\n- *tidur atur [jam_tidur] [jam_bangun]*\n- *tidur off* (Nonaktifkan pengingat)");
}
break;

case "sleeptracker": {
    if (args.length < 1) return m.reply("⚠ *Masukkan perintah dengan format yang benar!*\n\n🔹 *.sleeptracker mulai* - Mulai mencatat tidur\n🔹 *.sleeptracker selesai* - Selesai tidur & lihat hasil\n🔹 *.sleeptracker info* - Informasi tentang pola tidur sehat");

    let sleepFile = "./database/sleepData.json";
    let userId = m.sender;
    let sleepData = fs.existsSync(sleepFile) ? JSON.parse(fs.readFileSync(sleepFile, "utf-8")) : {};

    if (args[0] === "mulai") {
        if (sleepData[userId]) return m.reply("⚠ *Kamu sudah memulai pencatatan tidur!* Gunakan *.sleeptracker selesai* untuk menghentikan.");

        sleepData[userId] = { startTime: Date.now() };
        fs.writeFileSync(sleepFile, JSON.stringify(sleepData, null, 2));
        return m.reply("🌙 *Pencatatan tidur dimulai!* Selamat beristirahat, semoga tidurmu nyenyak. 😴");
    }

    if (args[0] === "selesai") {
        if (!sleepData[userId]) return m.reply("⚠ *Kamu belum memulai pencatatan tidur!* Gunakan *.sleeptracker mulai* terlebih dahulu.");

        let startTime = sleepData[userId].startTime;
        let endTime = Date.now();
        let sleepDuration = Math.floor((endTime - startTime) / 3600000); // Konversi ke jam

        delete sleepData[userId];
        fs.writeFileSync(sleepFile, JSON.stringify(sleepData, null, 2));

        let message = `💤 *Hasil Pemantauan Tidur*\n\n` +
                      `⏰ Lama Tidur: *${sleepDuration} jam*\n` +
                      `📊 *Rekomendasi Tidur:* \n✅ Dewasa: 7-9 jam\n✅ Remaja: 8-10 jam\n✅ Anak-anak: 9-12 jam\n\n` +
                      `📌 *Pastikan kamu tidur cukup untuk kesehatan yang lebih baik!*`;

        return m.reply(message);
    }

    if (args[0] === "info") {
        let info = "🛏 *Panduan Pola Tidur Sehat*\n\n" +
                   "✅ Tidur 7-9 jam untuk dewasa.\n" +
                   "✅ Hindari layar gadget 1 jam sebelum tidur.\n" +
                   "✅ Tidur dan bangun di jam yang sama setiap hari.\n" +
                   "✅ Hindari kafein & makan berat sebelum tidur.\n\n" +
                   "💡 *Gunakan *.sleeptracker mulai* untuk mulai mencatat tidurmu!";
        return m.reply(info);
    }

    return m.reply("⚠ *Format perintah salah!*\nGunakan: *.sleeptracker mulai / selesai / info*");
}
break;
case "cuaca":
let q = args.join(" ").trim();
if (!q) return await sock.sendMessage(m.chat, { text: "*[ ! ] Masukkan nama kota!*\nContoh: *cuaca Kota Sarjana*" });
try {
let apiUrl = `https://api.agatz.xyz/api/cuaca?message=${encodeURIComponent(q)}`;
let response = await axios.get(apiUrl);
if (!response.data || !response.data.data || !response.data.data.current) {
return await sock.sendMessage(m.chat, { text: "❌ Data cuaca tidak ditemukan untuk kota tersebut." });
}
let data = response.data.data;
let current = data.current;
let location = data.location;
let pesan = `*🌤️ Cuaca di ${location.name}, ${location.region}*\n`;
pesan += `🌡️ Suhu: ${current.temp_c}°C (Terasa seperti ${current.feelslike_c}°C)\n`;
pesan += `💧 Kelembaban: ${current.humidity}%\n`;
pesan += `🌬️ Angin: ${current.wind_kph} km/h (${current.wind_dir})\n`;
pesan += `🌦️ Kondisi: ${current.condition.text}\n`;
await sock.sendMessage(m.chat, { text: pesan }, {quoted: qdoc});
} catch (error) {
console.error(error);
await sock.sendMessage(m.chat, { text: `❌ Gagal mengambil data cuaca.` });
}
break;
default:
if (chatnano.includes(m.chat) && sender !== botNumber && !m.isBot) { // Cegah bot membalas dirinya sendiri
    if (isCmd) return; // Jika user mengetik command bot, AI tidak merespons

    let lowerBudy = budy.toLowerCase();

    // **1️⃣ Mendeteksi command otomatis dari teks user**
    let commandMapping = {
        "cek cuaca": "cuaca",
        "bagaimana cuaca": "cuaca",
        "cuaca di": "cuaca",
        "baymax qris": "donasi",
        "baymax qris mana": "donasi",
        "qris mana": "donasi",
        "halo baymax": "menu",
        "baymax menu": "menu",
        "baymax tampilkan menu": "menu"
    };

    for (let key in commandMapping) {
        if (lowerBudy.includes(key)) {
            let detectedCommand = commandMapping[key];
            let detectedArgs = lowerBudy.replace(key, "").trim();

            if (detectedCommand === "cuaca" && !detectedArgs) {
                return await sock.sendMessage(m.chat, { text: "📍 Tolong sebutkan nama kota!\nContoh: *Baymax, cek cuaca Jakarta*" });
            }

            // Kirim command ke handler utama
            m.text = `.${detectedCommand} ${detectedArgs}`;
            return module.exports(sock, m);
        }
    }

    // **2️⃣ AI Chat atau Konsultasi Kesehatan Otomatis**
    let prompt = `Nama kamu adalah Baymax, sebuah robot kesehatan di WhatsApp.  
Tugas utama kamu adalah membantu pengguna dalam memberikan **informasi kesehatan**, **rekomendasi obat**, dan **menjalankan fitur kesehatan**.  
- Jika pertanyaan berkaitan dengan kesehatan, kamu akan menjawab sebagai **dokter virtual**.  
- Jika pertanyaan umum, kamu akan menjawab sebagai **AI Chat biasa**.  
- Jika gejala terlalu serius, selalu sarankan untuk berkonsultasi dengan dokter.  
- Jangan memberikan informasi yang tidak terbukti secara ilmiah.  

🔎 **Pesan dari pengguna:** "${budy}"`;

try {
const OpenAI = require("openai");
const openai = new OpenAI({
    apiKey: OPENAI,
});
let response = await openai.chat.completions.create({
            model: "gpt-4o-mini", 
            messages: [
                { role: "system", content: "Anda adalah asisten kesehatan AI di WhatsApp." },
                { role: "user", content: budy }
            ],
            max_tokens: 200
        });

        let jawaban = response.choices[0].message.content;

        return await sock.sendMessage(m.chat, { text: jawaban }, { quoted: m });
    } catch (e) {
        console.log("⚠ Error AI BAYMAX:", e.toString());
        return await sock.sendMessage(m.chat, { text: "⚠ Maaf, terjadi kesalahan saat mengambil data. Coba lagi nanti!" });
    }
}
if (budy.startsWith('=>')) {
if (!isCreator) return;
try {
let result = await eval(`(async () => { return ${budy.slice(3)} })()`);
await sock.sendMessage(m.chat, { text: util.format(result) });
} catch (e) {
await sock.sendMessage(m.chat, { text: String(e) });
}
}
if (budy.startsWith('>')) {
if (!isCreator) return;
try {
let result = await eval(`(async () => { return ${text} })()`);
await sock.sendMessage(m.chat, { text: util.format(result) });
} catch (e) {
await sock.sendMessage(m.chat, { text: String(e) });
}
}
if (budy.startsWith('$')) {
if (!isCreator) return;
exec(budy.slice(2), (err, stdout) => {
if (err) return sock.sendMessage(m.chat, { text: `${err}` });
if (stdout) return sock.sendMessage(m.chat, { text: stdout });
});
}
}
} catch (err) {
console.log(util.format(err));
}
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update ${__filename}`);
    delete require.cache[file];
    require(file);
});