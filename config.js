module.exports = {
    OPENAI: "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",
};


global.owner = "62815867727093"
global.name = "BAYMAX"
global.qris = "https://files.catbox.moe/4364xh.png"
global.image = "https://files.catbox.moe/iijgr0.png";
global.linkSaluran = "https://whatsapp.com/channel/0029Vb4dlHfLtOjFxeJ0JD1B";
global.idSaluran = "120363285340341608@newsletter";
global.namaSaluran = "BAYMAX ROBOT KESEHATAN";

let fs = require('fs')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(`Update ${__filename}`)
delete require.cache[file]
require(file)
})