const { 
    default: makeWASocket, 
    DisconnectReason, 
    jidDecode, 
    getContentType, 
    useMultiFileAuthState, 
    fetchLatestBaileysVersion,
    Browsers
} = require("baileys")

const pino = require('pino')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const PhoneNumber = require('awesome-phonenumber')
const express = require('express')
const http = require('http')
const { Server } = require("socket.io")
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))

let userData = {
    username: "Maverick",
    email: "maverick@example.com",
    profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
    isPremium: false,
    serverSlots: 2,
    maxSessions: 2,
    sessions: []
}

app.get('/', (req, res) => {
    res.send('Server is running')
})

app.get('/api/profile', (req, res) => {
    res.json({ success: true, data: userData })
})

app.post('/api/profile/update', (req, res) => {
    const { username, email, profilePic } = req.body
    if(username) userData.username = username
    if(email) userData.email = email
    if(profilePic) userData.profilePic = profilePic
    res.json({ success: true, data: userData })
})

app.get('/api/sessions', (req, res) => {
    res.json({ success: true, data: userData.sessions })
})

const store = {
    contacts: {},
    chats: {},
    messages: {},
    groupMetadata: {},
    bind: function(ev) {
        ev.on('contacts.update', (updates) => {
            for (const update of updates) {
                if (update.id) this.contacts[update.id] = { ...this.contacts[update.id], ...update }
            }
        })
        ev.on('chats.set', ({ chats }) => {
            for (const chat of chats) this.chats[chat.id] = chat
        })
        ev.on('messages.set', ({ messages }) => {
            for (const message of messages) {
                if (message.key && message.key.id) this.messages[message.key.id] = message
            }
        })
    }
}

async function startSession(socket, phoneNumber, sessionId) {
    const sessionFolder = `./session/${sessionId}`
    if (!fs.existsSync(sessionFolder)) fs.mkdirSync(sessionFolder, { recursive: true })

    const { state, saveCreds } = await useMultiFileAuthState(sessionFolder)
    const { version } = await fetchLatestBaileysVersion()

    const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: true,
        logger: pino({ level: 'silent' }),
        browser: Browsers.ubuntu('Chrome'),
        markOnlineOnConnect: true,
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 0,
        keepAliveIntervalMs: 10000
    })

    store.bind(sock.ev)

    if (!sock.authState.creds.registered) {
        setTimeout(async () => {
            try {
                let code = await sock.requestPairingCode(phoneNumber)
                code = code?.match(/.{1,4}/g)?.join("-") || code
                socket.emit('pairing-code', { sessionId, code, phoneNumber })
            } catch (error) {
                socket.emit('error', { message: 'Failed to get code: ' + error.message })
            }
        }, 3000)
    }

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        
        if (connection) {
            socket.emit('connection-status', { sessionId, status: connection })
            const idx = userData.sessions.findIndex(s => s.sessionId === sessionId)
            if (idx !== -1) userData.sessions[idx].status = connection
        }

        if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output?.statusCode
            if (reason !== DisconnectReason.loggedOut) {
                startSession(socket, phoneNumber, sessionId)
            } else {
                if (fs.existsSync(sessionFolder)) fs.rmSync(sessionFolder, { recursive: true, force: true })
                userData.sessions = userData.sessions.filter(s => s.sessionId !== sessionId)
                socket.emit('session-deleted', { sessionId })
            }
        }
        
        if (connection === 'open') {
            const idx = userData.sessions.findIndex(s => s.sessionId === sessionId)
            if (idx === -1) {
                userData.sessions.push({ sessionId, phoneNumber, status: 'connected' })
            } else {
                userData.sessions[idx].status = 'connected'
            }
            socket.emit('connection-status', { sessionId, status: 'connected' })
        }
    })

    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('messages.upsert', async (chatUpdate) => {
        try {
            const messages = chatUpdate.messages
            if (!messages || messages.length === 0) return
            
            let mek = messages[0]
            if (!mek.message) return
            mek.message = mek.message.ephemeralMessage ? mek.message.ephemeralMessage.message : mek.message
            if (mek.key && mek.key.remoteJid === 'status@broadcast') return
            
            let m = smsg(sock, mek, store)
            
            if (m.text) {
                console.log(`[MSG] ${m.sender}: ${m.text.substring(0, 50)}`)
            }

            if (fs.existsSync("./case.js")) {
                require("./case")(sock, m, chatUpdate, store)
            }
            
            if (!mek.key.fromMe && mek.key.remoteJid) {
                await sock.readMessages([mek.key])
            }
        } catch (err) {
            console.error(err)
        }
    })

    sock.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server ? decode.user + '@' + decode.server : jid
        } 
        return jid
    }

    return sock
}

io.on('connection', (socket) => {
    socket.on('create-session', ({ phoneNumber }) => {
        const sessionId = 'sess_' + Date.now()
        userData.sessions.push({ sessionId, phoneNumber, status: 'connecting' })
        startSession(socket, phoneNumber, sessionId)
    })

    socket.on('delete-session', ({ sessionId }) => {
        const sessionFolder = `./session/${sessionId}`
        if (fs.existsSync(sessionFolder)) fs.rmSync(sessionFolder, { recursive: true, force: true })
        userData.sessions = userData.sessions.filter(s => s.sessionId !== sessionId)
        socket.emit('session-deleted', { sessionId })
    })
})

function smsg(sock, m, store) {
    if (!m) return m
    if (m.key) {
        m.id = m.key.id
        m.chat = m.key.remoteJid
        m.fromMe = m.key.fromMe
        m.isGroup = m.chat.endsWith('@g.us')
        m.sender = sock.decodeJid(m.fromMe ? sock.user.id : (m.participant || m.key.participant || m.chat))
        if (m.isGroup) m.participant = sock.decodeJid(m.key.participant) || ''
    }
    if (m.message) {
        m.mtype = getContentType(m.message)
        m.msg = m.message[m.mtype]
        m.body = m.message.conversation || m.msg?.caption || m.msg?.text || m.msg?.contentText || ""
        let quoted = m.msg?.contextInfo?.quotedMessage
        m.quoted = quoted
        if (m.quoted) {
            let type = getContentType(quoted)
            m.quoted = m.quoted[type]
            if (typeof m.quoted === 'string') m.quoted = { text: m.quoted }
            m.quoted.mtype = type
            m.quoted.id = m.msg.contextInfo.stanzaId
            m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat
            m.quoted.sender = sock.decodeJid(m.msg.contextInfo.participant)
            m.quoted.fromMe = m.quoted.sender === sock.decodeJid(sock.user.id)
        }
    }
    m.text = m.body
    return m
}

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})