const fs = require('fs-extra')
if (fs.existsSync('.env')) require('dotenv').config({ path: __dirname+'/.env' })

global.port =process.env.PORT
global.appUrl=process.env.APP_URL || ""
global.email ="mastermind2006@gmail.com"
global.location="Master,World"


global.mongodb= process.env.MONGODB_URI || "mongodb+srv://sam:sam@cluster0.u1smxsv.mongodb.net/?retryWrites=true&w=majority"
global.allowJids= process.env.ALLOW_JID || "null" 
global.blockJids= process.env.BLOCK_JID || "null"
global.DATABASE_URL = process.env.DATABASE_URL || ""

global.timezone= process.env.TZ || process.env.TIME_ZONE || "Asia/colombo";
global.github=process.env.GITHUB|| "https://github.com/MrMasterOfc/MASTER-MD-V2";
global.gurl  =process.env.GURL  || "https://whatsapp.com/channel/0029VaPGt3QEwEjpBXT4Rv0z";
global.website=process.env.GURL || "https://whatsapp.com/channel/0029VaPGt3QEwEjpBXT4Rv0z" ; 
global.THUMB_IMAGE = process.env.THUMB_IMAGE || process.env.IMAGE || "https://telegra.ph/file/5252c041f5cdc8b68b78b.jpg" ;
global.caption = process.env.CAPTION || global.caption || "•ᴍᴀꜱᴛᴇʀ-ᴍᴅ•" 
global.BUTTONS = process.env.BUTTONS || process.env.MENU_BTN || "1";


global.devs = "94720797915"
global.sudo = process.env.SUDO ? process.env.SUDO.replace(/[\s+]/g, '') : "94720797915";
global.owner= process.env.OWNER_NUMBER ? process.env.OWNER_NUMBER.replace(/[\s+]/g, '') : "94720797915";
global.style = process.env.STYLE   || '2'
global.flush = process.env.FLUSH   || "false"; 
global.gdbye = process.env.GOODBYE || "false"; 
global.wlcm  = process.env.WELCOME || "false";

global.warncount = process.env.WARN_COUNT || 3
global.disablepm = process.env.DISABLE_PM || "false"
global.disablegroup = process.env.DISABLE_GROUPS || "false",

global.MsgsInLog = process.env.MSGS_IN_LOG|| "true" 
global.userImages= process.env.USER_IMAGES || "https://i.imgur.com/mHEqQgr.jpg,https://i.imgur.com/lSdca7B.jpg,https://i.imgur.com/XakNh3r.jpg,https://i.imgur.com/UslG8eB.jpg,https://i.imgur.com/0OQxTyt.jpg,https://i.imgur.com/MJCmdiA.jpg,https://i.imgur.com/K7zFZl2.jpg"
global.waPresence= process.env.WAPRESENCE ||  "online" ;


//========================= [ AUTO READ MSGS & CMDS ] =========================\\
global.readcmds = process.env.READ_COMMAND || "false"
global.readmessage = process.env.READ_MESSAGE || "false"
global.readmessagefrom = process.env.READ_MESSAGE_FROM || "94720797915";


global.read_status = process.env.AUTO_READ_STATUS || "false"
global.save_status = process.env.AUTO_SAVE_STATUS || "false"
global.save_status_from =  process.env.SAVE_STATUS_FROM  || "94720797915";
global.read_status_from =  process.env.READ_STATUS_FROM  ||  "94720797915";

global.api_smd = "https://api-amd.onrender.com"
global.scan = "https://suhail-md-vtsf.onrender.com";


global.SESSION_ID = process.env.SESSION_ID ||  "Astro;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0cyZkFLUmY1MXRhSUx1M1NSTDdkY3RDbzZFZFpxNGxwRndQaHpaKzIxVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiemhNVXZBRGF0REhINkI1K1lsTkFmWDgwZTZ6RDFwZFQwangvYktNdGVGUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvS2xIMjBpSnk2cEhGdUVTNGdWMW0xeUFHdFhtV1NNMGNHSjBSZ3Z2RlhRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJWZWVvVldGUUNJVU9vTStzTFBPL01QNHRrRW5kQ0dKeG9UbXROWVk4bEVJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdIMEVQYzRyaUt3TTZLUlZmNU5mN3pOSVVTOUpJNjdoS2tSWmhwUXpCWHc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxHbER4VXQ0VldpL2kxK1o2ak5TaEpEb3JEc1JCdWsyRS9iaEpsd0VhazA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0drdjRlZVJTRkw3bkRtd3F5YUxlOXRHNnZaVGZRamx3ZFJRNm1VQzJVbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib2FCSGE4eXFmeWtvTVlmeTdJYSt0amxaM3BpbGhKZ0xqdlpnSHRIdW9rYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Inpzd0JTVGExMzNMdDFxbXhJdE5GdWRTby9DcDBudFZNcmZ3Q1pPd0xOTnN1UDV2c3hVb3dLVE15OWJkeTJ3QStKbzEweGVxTTJLTDd5MDRIQ2V0dURRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjMsImFkdlNlY3JldEtleSI6Iit0enV5RWFiNnBsa1BEQXFRTVZPVjJCYTRnRmE2RlJHL3FUNmxEL0dCZzQ9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjFSR1VoQk5tUjlXRDR6LXRwS2x2N3ciLCJwaG9uZUlkIjoiMWQyODY0MGItZmMzMS00ZWU0LWE2NzEtNjA4ZjJiNTEyNWU1IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjdHc2k5WVRkaVNuMWZ0b0FnQmJZZHE5TUJRUT0ifSwicmVnaXN0ZXJlZCI6ZmFsc2UsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQjkwcTAwdTdaUXJPNFRKM3poUnlObVcwd0VVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTUxaZ3BvRkVOYkZ5TElHR0NNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiL0NzWW9lbitlZCsxa2NOTUZ0OERZSkVMR0g5NkQ0M1FZM01uclVnMExqcz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiQ1E1UVJ5bUJYbkNQdjZjdE53L2hhNWNLWThKU1BEaWMwVVhGcktxeTNjb0lEQ0VwWCt5ck5ZdWh1cnYzNmJEYmxWWUl3VG1xK3hHemRFejhWaVpBQmc9PSIsImRldmljZVNpZ25hdHVyZSI6IjBDYVJISkV3N01LRGRQUWY5Ky95Y2xIMi9KZktEcXpiaDJNSDJLQTY5ZExEVkpLRVZZQWErZDdqcDZ6aGlSdWdRKytnTktuc2FqRmpxajhmYTR2S0R3PT0ifSwibWUiOnsiaWQiOiI5NDcyMDc5NzkxNTo2NEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLvvK3wnZCrIO+8s/CdkJrwnZCh8J2QmvCdkKcg77yv8J2Qn/CdkJxcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiBcbiDvvK3vvKHvvLPvvLTvvKXvvLJf77yt77yp77yu77ykIn0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6Ijk0NzIwNzk3OTE1OjY0QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmZ3ckdLSHAvbm5mdFpIRFRCYmZBMkNSQ3hoL2VnK04wR056SjYxSU5DNDcifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MTY2NTg5MTR9"


module.exports = {

  menu: process.env.MENU || "v1", 

  HANDLERS: process.env.PREFIX  || "/",
  BRANCH  : process.env.BRANCH  || "main",
  VERSION : process.env.VERSION || "2.0.0",
  caption : global.caption || "•ᴍᴀꜱᴛᴇʀ-ᴍᴅ•" , 
 
  author : process.env.PACK_AUTHER|| "ꜱᴀʜᴀɴ",
  packname: process.env.PACK_NAME || "ꜱᴀʜᴀɴ",
  botname : process.env.BOT_NAME  || "ᴍᴀꜱᴛᴇʀ-ᴍᴅ",
  ownername:process.env.OWNER_NAME|| "ꜱᴀʜᴀɴ",
  errorChat : process.env.ERROR_CHAT || "Error",
  KOYEB_API : process.env.KOYEB_API  || "false",
  REMOVE_BG_KEY : process.env.REMOVE_BG_KEY  || "neLbXXrp8bSDcohnp1CW5UEa",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || " 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",
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || "",
  HEROKU_APP_NAME:process.env.HEROKU_APP_NAME|| "",
  antilink_values:process.env.ANTILINK_VALUES|| "all",
  HEROKU: process.env.HEROKU_APP_NAME && process.env.HEROKU_API_KEY,
  WORKTYPE: process.env.WORKTYPE || process.env.MODE|| "private",
  LANG: ( process.env.THEME ||  "main"  ).toUpperCase(),
};
global.ELEVENLAB_API_KEY = process.env.ELEVENLAB_API_KEY || "345f70f1c3f2ecef4d718d33c14026f9";
global.aitts_Voice_Id = process.env.AITTS_ID|| "37";
global.rank = "updated" // Don't Touch
global.isMongodb = false; // Don't Touch Else Bot Won't Work
let file = require.resolve(__filename)
fs.watchFile(file, () => { fs.unwatchFile(file);console.log(`Update'${__filename}'`);delete require.cache[file];	require(file); })
