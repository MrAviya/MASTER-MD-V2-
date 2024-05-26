const os = require("os");
const fs = require("fs");
const Config = require("../config");
let { fancytext, tlang, runtime, formatp, prefix, amd } = require("../lib");
const long = String.fromCharCode(8206);
const readmore = long.repeat(4001);
const AdminFunction = require("../lib/plugins");
const axios = require("axios");
const events = AdminFunction;
const { exec } = require("child_process");
const translatte = require("translatte");
const cron = require("node-cron");
global.caption = global.caption || Config.caption || "•ᴍᴀꜱᴛᴇʀ-ᴍᴅ•";
global.ownername = global.ownername || Config.ownername || "ꜱᴀʜᴀɴ";
global.botname = global.botname || Config.botname || "ᴍᴀꜱᴛᴇʀ-ᴍᴅ";
global.menu = global.menu || Config.menu || "";
global.HANDLERS = global.HANDLERS || Config.HANDLERS || prefix || "^";
global.menu_fancy = global.menu_fancy || process.env.MENU_FANCY || "ss";
global.ui_Cache = {};
global.ui_urls = [];
var cronStart = false;
if (!cronStart) {
  cron.schedule("*/15 * * * *", () => {
    cronStart = true;
    fs.readdir("./temp", (err, files) => {
      if (err) {
        return;
      } else {
        files.forEach((file) => {
          try {
            fs.unlinkSync("./temp/" + file);
          } catch {
            console.log("ERROR DELETING FILES: ", e);
          }
        });
      }
    });
  });
}
AdminFunction.cmd(
  {
    pattern: "newcmd",
    desc: "To check ping",
    category: "user",
    fromMe: true,
    filename: __filename,
  },
  async (message, match) => {
    try {
      if (!match) {
        return await message.send(
          "*_Please provide cmd name by replying a Sticker_*"
        );
      }
      let input = match.split(",");
      var check;
      var init;
      let column = false;
      if (message.quoted) {
        let _0x2cb146 = message.quoted.mtype;
        if (_0x2cb146 == "stickerMessage" && match) {
          column = true;
          check = match.split(" ")[0];
          init = "sticker-" + message.quoted.msg.fileSha256;
        }
      }
      if (!column && input.length > 1) {
        init = input[0].trim().toLowerCase();
        check = input[1].trim().toLowerCase();
      } else if (!column) {
        return await message.send(
          "*_Uhh Dear, Give Cmd With New Name_*\n*Eg: _.setcmd New_Name, Cmd_Name_*"
        );
      }
      if (init.length < 1) {
        return await message.reply(
          "*_Uhh Please, Provide New_Cmd Name First_*"
        );
      }
      if (global.setCmdAlias[init]) {
        return await message.send(
          '*_"' +
            (column ? "Given Sticker" : init) +
            '" Already set for "' +
            global.setCmdAlias[init] +
            '" Cmd, Please try another ' +
            (column ? "Sticker" : "Name") +
            "_*"
        );
      }
      const check_cmd =
        AdminFunction.commands.find((cmd) => cmd.pattern === check) ||
        AdminFunction.commands.find(
          (cmds) => cmds.alias && cmds.alias.includes(check)
        );
      if (check_cmd) {
        global.setCmdAlias[init] = check_cmd.pattern;
        return await message.send(
          '*_Cmd "' +
            global.setCmdAlias[init] +
            '" Succesfully set to "' +
            (column ? "Sticker" : init) +
            '"._*\n*_These all names are reset, If bot restart_*'
        );
      } else {
        return await message.send(
          "*_Provided Cmd( " +
            check +
            ") not found in bot cmds. Please Provide Valid cmd Name_*"
        );
      }
    } catch (error) {
      await message.error(error + "\nCommand:setcmd", error);
    }
  }
);
AdminFunction.cmd(
  {
    pattern: "delcmd",
    desc: "To check ping",
    category: "user",
    fromMe: true,
    filename: __filename,
  },
  async (message, input) => {
    try {
      let search = input ? input.split(" ")[0].trim().toLowerCase() : "";
      let extra = false;
      if (message.quoted) {
        if (message.quoted.mtype == "stickerMessage") {
          extra = true;
          search = "sticker-" + message.quoted.msg.fileSha256;
        } else if (!input) {
          return await message.send(
            "*_Please reply to a Sticker that set for a Cmd_*"
          );
        }
      } else if (!input) {
        return await message.send(
          "*_Uhh Dear, provide Name that set to a cmd_*\n*Eg: _.delcmd Cmd_Name_*"
        );
      }
      if (global.setCmdAlias[search]) {
        await message.send(
          '*_"' +
            (extra ? "Given Sticker" : search) +
            '" deleted Succesfully at "' +
            global.setCmdAlias[search] +
            '" cmd_*'
        );
        delete global.setCmdAlias[search];
        return;
      } else {
        return await message.send(
          '*_"' +
            (extra ? "Given Sticker" : search) +
            '" not Set for any cmd._*\n *_Please Provide Valid ' +
            (extra ? "Sticker" : "cmd Name") +
            " to delete_*"
        );
      }
    } catch (error) {
      await message.error(error + "\nCommand:delcmd", error);
    }
  }
);
AdminFunction.amd(
  {
    pattern: "ping",
    desc: "To check ping",
    category: "user",
    filename: __filename,
  },
  async (request) => {
    var init = new Date().getTime();
    const { key: latency } = await request.reply("*`Server Check`*");
    var deinit = new Date().getTime();
    return await request.send(
      "*`ᴘɪɴɢ ꜱᴘᴇᴇᴅ " + (deinit - init) + " ms`*",
      {
        edit: latency,
      },
      "",
      request
    );
  }
);
AdminFunction.cmd(
  {
    pattern: "runtime",
    alias: ["uptime"],
    desc: "Tells runtime/uptime of bot.",
    category: "misc",
    filename: __filename,
  },
  async (token) => {
    try {
      token.reply(
        "*`Bot Alive Since " +
          tlang().title +
          ": " +
          runtime(process.uptime()) +
          "`*"
      );
    } catch (error) {
      await token.error(error + "\n\ncommand : uptime", error, false);
    }
  }
);
global.create_UI = () => {
  if (!global.userImages || /text|txt|nothing|suhail/.test(global.userImages)) {
    return {};
  }
  const initFormat = [".jpg", ".jpeg", ".png", ".webp"];
  const rcnFormat = [".mp4", ".avi", ".mov", ".mkv", ".gif", ".m4v"];
  let vidFile = (video = false);
  if (!ui_urls || !ui_urls[0]) {
    ui_urls = global.userImages ? global.userImages.split(",") : [""];
    ui_urls = ui_urls.filter((_0x2e34e7) => _0x2e34e7.trim() !== "");
  }
  let RandomSwitch = (
    ui_urls[Math.floor(Math.random() * ui_urls.length)] || ""
  ).trim();
  if (/http/gi.test(RandomSwitch) && !ui_infoCache[RandomSwitch]) {
    const IndexedSwitched = RandomSwitch.substring(
      RandomSwitch.lastIndexOf(".")
    ).toLowerCase();
    if (initFormat.includes(IndexedSwitched)) {
      ui_Cache[RandomSwitch] = "image";
    } else if (rcnFormat.includes(IndexedSwitched)) {
      ui_Cache[RandomSwitch] = "video";
    }
  }
  return {
    [ui_Cache[RandomSwitch] || "Inavlid_Type_URL"]: {
      url: RandomSwitch,
    },
  };
};
global.createButtons = (OnMessage) => {
  if (!OnMessage || Array.isArray(OnMessage)) {
    return OnMessage || [];
  }
  const BtnValue =
    /#button\s*:\s*([^|]+)\s*\|\s*display_text\s*:\s*([^|]+)(?:\s*\|\s*(id)\s*:\s*([^|]+))?(?:\s*\|\s*(copy_code)\s*:\s*([^|]+))?\/#/gi;
  const JsonBtn = [];
  let BtnContext;
  while ((BtnContext = BtnValue.exec(OnMessage)) !== null) {
    try {
      const OnBtnValue = BtnContext[1].trim();
      const InBtnValue = BtnContext[2].trim();
      const OffBtnValue = BtnContext[4] ? BtnContext[4].trim() : "";
      let ActionBtn = BtnContext[6] ? BtnContext[6].trim() : "";
      let TouchValue = {
        display_text: InBtnValue,
      };
      if (OnBtnValue === "cta_copy") {
        TouchValue = {
          display_text: InBtnValue,
          id: OffBtnValue,
          copy_code: ActionBtn,
        };
      } else if (OnBtnValue === "cta_url") {
        TouchValue = {
          display_text: InBtnValue,
          url: ("" + (OffBtnValue || "")).replace(" /#", "").trim(),
          merchant_url: ActionBtn || "https://www.google.com",
        };
      } else {
        TouchValue = {
          display_text: InBtnValue,
          id: OffBtnValue,
        };
      }
      if (OnBtnValue) {
        JsonBtn.push({
          name: OnBtnValue,
          buttonParamsJson: JSON.stringify(TouchValue),
        });
      } else {
        log("button_name missing in", BtnContext[0]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return JsonBtn || [];
};
global.sendButtons = async (
  message,
  context = {},
  MessageBody = [],
  OnBodyBtn = false
) => {
  if (!message) {
    throw "need m instance";
  }
  let BtnJid = OnBodyBtn || message.jid;
  if (typeof context != "object") {
    context = {};
  }
  context.messageId = context.messageId || message.bot.messageId();
  if (typeof MessageBody === "string") {
    MessageBody = createButtons(MessageBody);
  }
  if (typeof context.buttons === "string" || Array.isArray(context.buttons)) {
    MessageBody = [...MessageBody, ...(createButtons(context.buttons) || [])];
  }
  let {
    generateWAMessageFromContent: MsgGen,
    proto: ProtCol,
    prepareWAMessageMedia: MediaMsg,
  } = require("@whiskeysockets/baileys");
  let OfDataMsg = {};
  try {
    if (typeof context.imageMessage === "object") {
      OfDataMsg = {
        imageMessage: context.imageMessage,
      };
    } else if (typeof context.videoMessage === "object") {
      OfDataMsg = {
        videoMessage: context.videoMessage,
      };
    } else {
      let OnDataMsg = false;
      let ImgVidValue = context.image || context.video ? context : create_UI();
      if (ImgVidValue.image) {
        OnDataMsg =
          (await MediaMsg(
            {
              image: ImgVidValue.image || log0,
            },
            {
              upload: message.bot.waUploadToServer,
            }
          )) || false;
      } else if (ImgVidValue.video) {
        OnDataMsg =
          (await MediaMsg(
            {
              image: ImgVidValue.video || log0,
            },
            {
              upload: message.bot.waUploadToServer,
            }
          )) || false;
      }
      if (OnDataMsg) {
        OfDataMsg = OnDataMsg.imageMessage
          ? {
              imageMessage: OnDataMsg.imageMessage,
            }
          : OnDataMsg.videoMessage
          ? {
              videoMessage: OnDataMsg.videoMessage,
            }
          : {};
      }
    }
  } catch (error) {
    OfDataMsg = {};
  }
  let FadedContext = {
    ...(await message.bot.contextInfo(
      botname,
      message.senderName || ownername
    )),
    ...(context.contextInfo || {}),
  };
  let _0x5f08d6 = MsgGen(
    BtnJid,
    {
      viewOnceMessage: {
        message: {
          interactiveMessage: ProtCol.Message.InteractiveMessage.create({
            body: {
              text: context.text || context.body || context.caption || "Astro",
            },
            footer: {
              text: context.footer || "αѕтα тє¢н тєαм",
            },
            header: {
              ...(OfDataMsg || {}),
              hasMediaAttachment:
                OfDataMsg.imageMessage || OfDataMsg.videoMessage ? true : false,
              ...(context.header || {}),
            },
            contextInfo: FadedContext,
            nativeFlowMessage:
              ProtCol.Message.InteractiveMessage.NativeFlowMessage.create({
                buttons: MessageBody,
              }),
          }),
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2,
          },
        },
      },
    },
    context
  );
  await message.bot.relayMessage(BtnJid, _0x5f08d6.message, {
    messageId: context.messageId,
  });
  return _0x5f08d6;
};
AdminFunction.cmd(
  {
    cmdname: "menu",
    desc: "Help list",
    react: "📃",
    type: "user",
    filename: __filename,
  },
  async (message, match) => {
    try {
      const { commands: commands } = require("../lib");
      if (match.split(" ")[0]) {
        let PreData = [];
        const identifer = commands.find(
          (cmds) => cmds.pattern === match.split(" ")[0].toLowerCase()
        );
        if (identifer) {
          PreData.push("*🍁Command:* " + identifer.pattern);
          if (identifer.category) {
            PreData.push("*🧩Category:* " + identifer.category);
          }
          if (identifer.alias && identifer.alias[0]) {
            PreData.push("*🧩Alias:* " + identifer.alias.join(", "));
          }
          if (identifer.desc) {
            PreData.push("*🧩Description:* " + identifer.desc);
          }
          if (identifer.use) {
            PreData.push(
              "*〽️Usa:*\n ```" +
                prefix +
                identifer.pattern +
                " " +
                identifer.use +
                "```"
            );
          }
          if (identifer.usage) {
            PreData.push("*〽️Usage:*\n ```" + identifer.usage + "```");
          }
          await message.reply(PreData.join("\n"));
        }
      }
      var MenuTopHeader;
      var MenuSideHeader;
      var MenuTopFooter;
      var CategoryStartHeader;
      var CategoryEndHeader;
      var CmdNameLine;
      var CategoryFullEnd;
      let MenuType = 0;
      if (menu === "") {
        MenuType = Math.floor(Math.random() * 4) + 1;
      }
      if (
        MenuType == 1 ||
        menu.trim().startsWith("1") ||
        menu.toLowerCase().includes("v1")
      ) {
        MenuTopHeader = "╭━━━〔 *" + botname + "* 〕━━━┈⊷";
        MenuSideHeader = "┃✵│";
        MenuTopFooter = "┃✵╰──────────────\n╰━━━━━━━━━━━━━━━┈⊷";
        CategoryStartHeader = "╭─────────────┈⊷\n│「";
        CategoryEndHeader = "」\n╰┬────────────┈⊷";
        CmdNameLine = "││◦➛";
        CategoryFullEnd = "│╰────────────┈⊷\n╰─────────────┈⊷";
      } else if (
        MenuType == 2 ||
        menu.trim().startsWith("2") ||
        menu.toLowerCase().includes("v2")
      ) {
        MenuTopHeader = "╭═══ *" + botname + "*  ═══⊷\n┃❃╭──────────────";
        MenuSideHeader = "┃❃│";
        MenuTopFooter = "┃❃╰───────────────\n╰═════════════════⊷";
        CategoryStartHeader = "╭─❏";
        CategoryEndHeader = "❏";
        CmdNameLine = "┃❃│";
        CategoryFullEnd = "┃❃╰───────────────\n╰═════════════════⊷";
      } else {
        MenuTopHeader = "╭═══〘  " + botname + "  〙═══⊷❍\n┃✰╭──────────────";
        MenuSideHeader = "┃✰│";
        MenuTopFooter = "┃✰╰───────────────\n╰═════════════════⊷";
        CategoryStartHeader = "╭════〘";
        CategoryEndHeader = "〙════⊷❍";
        CmdNameLine = "┃✰│";
        CategoryFullEnd = "┃✰╰─────────────────❍\n╰══════════════════⊷❍";
      }
      const cmdlets = {};
      commands.map(async (query, data) => {
        if (query.dontAddCommandList === false && query.pattern !== undefined) {
          if (!cmdlets[query.category]) {
            cmdlets[query.category] = [];
          }
          cmdlets[query.category].push(query.pattern);
        }
      });
      let MenuFancys = [1, 22, 23, 1, 36, 35, 48, 1, 42, 55, 56];
      let text =
        parseInt(menu_fancy || "") ||
        MenuFancys[Math.floor(Math.random() * MenuFancys.length)];
      const currentTime = message.time;
      const currentDate = message.date;
      let BotInfoOnMenu =
        MenuTopHeader +
        "\n" +
        MenuSideHeader +
        " Ｕꜱᴇʀ:- " +
        ownername +
        "\n" +
        MenuSideHeader +
        " Ｍᴏᴅᴇ:- " +
        Config.WORKTYPE +
        "\n" +
        MenuSideHeader +
        " Ｃᴍᴅꜱ:- " +
        commands.length +
        "\n" +
        MenuSideHeader +
        " Ａʟɪᴠᴇ:- " +
        runtime(process.uptime()) +
        "\n" +
        MenuSideHeader +
        " Ｒᴀᴍ:- " +
        formatp(os.totalmem() - os.freemem()) +
        "\n" +
        MenuSideHeader +
        " Ｔɪᴍᴇ:- " +
        currentTime +
        "\n" +
        MenuTopFooter +
        "\n\t```❑ MASTER-MD-V2 ❑```\n " +
        readmore +
        "\n";
      for (const Texts in cmdlets) {
        BotInfoOnMenu +=
          CategoryStartHeader +
          " *" +
          fancytext(Texts, text) +
          "* " +
          CategoryEndHeader +
          "\n";
        if (match.toLowerCase() == Texts.toLowerCase()) {
          BotInfoOnMenu =
            CategoryStartHeader +
            " *" +
            fancytext(Texts, text) +
            "* " +
            CategoryEndHeader +
            "\n";
          for (const randomlate of cmdlets[Texts]) {
            BotInfoOnMenu +=
              CmdNameLine + " " + fancytext(randomlate, text) + "\n";
          }
          BotInfoOnMenu += CategoryFullEnd + "\n";
          break;
        } else {
          for (const _0x34d05f of cmdlets[Texts]) {
            BotInfoOnMenu +=
              CmdNameLine + " " + fancytext(_0x34d05f, text) + "\n";
          }
          BotInfoOnMenu += CategoryFullEnd + "\n";
        }
      }
      BotInfoOnMenu += caption;
      let Important = {
        caption: BotInfoOnMenu,
      };
      if (/1|buttons|btn/gi.test(BUTTONS) && message.device !== "web") {
        await sendButtons(message, {
          caption: BotInfoOnMenu,
          buttons:
            "\n            #button:cta_url | display_text : Get Your Own| id:" +
            github +
            " /# \n            #button:cta_url | display_text : Founder| id:" +
            SupportGc +
            " /# \n            #button:cta_url | display_text : Channel | id:" +
            ChannelLink +
            " /#            \n            #button:cta_url | display_text : Full Support | id:" +
            tglink +
            " /#            \n            ",
        });
      } else {
        await message.sendUi(message.chat, Important, message);
      }
    } catch (error) {
      await message.error(error + "\nCommand:menu", error);
    }
  }
);
let tglink = "https://t.me/mrsahanofc";
let ChannelLink = "https://whatsapp.com/channel/0029VaWWZa1G3R3c4TPADo0M";
let SupportGc = "https://wa.me/+94720797915";
amd(
  {
    pattern: "alive",
    desc: "Shows system status with different designs.",
    category: "user",
    filename: __filename,
    use: "alive",
  },
  async (message, input) => {
    try {
      const start = new Date().getTime();
      const designs = [
        async () => {
          const imageBuffer = await axios.get(
            "https://telegra.ph/file/5252c041f5cdc8b68b78b.jpg",
            {
              responseType: "arraybuffer",
            }
          );

          const quoteResponse = await axios.get(
            "https://api.maher-zubair.tech/misc/quote"
          );
          const quote = quoteResponse.data;
          if (!quote || quote.status !== 200) {
            return await message.reply("*Failed to fetch a quote.*");
          }

          const quoteText = `\n\n*"${quote.result.body}"*\n_- ${quote.result.author}_`;
          const end = new Date().getTime();
          const pingSeconds = (end - start) / 1000;
          const captionText = `ᴍᴀꜱᴛᴇʀ-ᴍᴅ\n\n*ᴘɪɴɢ:* ${pingSeconds} ꜱᴇᴄᴏɴᴅꜱ${quoteText}\n\nᴍᴀꜱᴛᴇʀ ᴍᴅ`;

          return { image: imageBuffer.data, caption: captionText };
        },
        async () => {
          const imageBuffer = await axios.get(
            "https://telegra.ph/file/5252c041f5cdc8b68b78b.jpg",
            {
              responseType: "arraybuffer",
            }
          );

          const factResponse = await axios.get(
            "https://api.maher-zubair.tech/misc/fact"
          );
          const fact = factResponse.data;
          if (!fact || fact.status !== 200) {
            return await message.reply("*Failed to fetch a fact.*");
          }

          const end = new Date().getTime();
          const pingSeconds = (end - start) / 1000;
          const captionText = `ᴍᴀꜱᴛᴇʀ-ᴍᴅ\n\n*ᴘɪɴɢ:* ${pingSeconds} ꜱᴇᴄᴏɴᴅꜱ\n\n\n${fact.result.fact}\n\nᴍᴀꜱᴛᴇʀ-ᴍᴅ`;

          return { image: imageBuffer.data, caption: captionText };
        },
        async () => {
          const imageBuffer = await axios.get(
            "https://telegra.ph/file/5252c041f5cdc8b68b78b.jpg",
            {
              responseType: "arraybuffer",
            }
          );

          const lineResponse = await axios.get(
            "https://api.maher-zubair.tech/misc/lines"
          );
          const line = lineResponse.data;
          if (!line || line.status !== 200) {
            return await message.reply("*Failed to fetch a line.*");
          }

          const end = new Date().getTime();
          const pingSeconds = (end - start) / 1000;
          const captionText = `ᴍᴀꜱᴛᴇʀ-ᴍᴅ\n\n*ᴘɪɴɢ:* ${pingSeconds} ꜱᴇᴄᴏɴᴅꜱ\n\n\n${line.result}\n\nᴍᴀꜱᴛᴇʀ ᴍᴅ`;

          return { image: imageBuffer.data, caption: captionText };
        },
      ];

      const randomDesign = designs[Math.floor(Math.random() * designs.length)];
      const messageData = await randomDesign();

      const message_options = {
        quoted: message,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
        },
      };

      return message.bot.sendUi(message.chat, messageData, message_options);
    } catch (error) {
      await message.error(
        error + "\n\nCommand: alive",
        error,
        "*Failed to show status.*"
      );
    }
  }
);
AdminFunction.cmd(
  {
    pattern: "list",
    desc: "list menu",
    category: "user",
  },
  async (message) => {
    try {
      const { commands: RanDon } = require("../lib");
      let mVoid = "\n\t*Mᴀꜱᴛᴇʀ Mᴅ Cᴏᴍᴍᴀɴᴅs Iɴғᴏ*  \n";
      for (let RamDom = 0; RamDom < RanDon.length; RamDom++) {
        if (RanDon[RamDom].pattern == undefined) {
          continue;
        }
        mVoid +=
          "*" +
          (RamDom + 1) +
          " " +
          fancytext(RanDon[RamDom].pattern, 1) +
          "*\n";
        mVoid += "  " + fancytext(RanDon[RamDom].desc, 1) + "\n";
      }
      return await message.sendUi(message.chat, {
        caption: mVoid + Config.caption,
      });
    } catch (error) {
      await message.error(error + "\nCommand:list", error);
    }
  }
);
AdminFunction.amd(
  {
    pattern: "owner",
    desc: "To check ping",
    category: "user",
    filename: __filename,
  },
  async (citel) => {
    try {
      const data =
        "BEGIN:VCARD\nVERSION:3.0\nFN:" +
        ownername +
        "\nORG:;\nTEL;type=CELL;type=VOICE;waid=" +
        global.owner?.split(",")[0] +
        ":+" +
        global.owner?.split(",")[0] +
        "\nEND:VCARD";
      let Contact = {
        contacts: {
          displayName: ownername,
          contacts: [
            {
              vcard: data,
            },
          ],
        },
        contextInfo: {
          externalAdReply: {
            title: ownername,
            body: "Touch here.",
            renderLargerThumbnail: true,
            thumbnailUrl: "",
            thumbnail: log0,
            mediaType: 1,
            mediaUrl: "",
            sourceUrl:
              "https://wa.me/+" +
              global.owner?.split(",")[0] +
              "?text=Hii+" +
              ownername,
          },
        },
      };
      return await citel.sendMessage(citel.jid, Contact, {
        quoted: citel,
      });
    } catch (error) {
      await citel.error(error + "\nCommand:owner", error);
    }
  }
);
AdminFunction.cmd(
  {
    pattern: "trt",
    alias: ["translate"],
    category: "user",
    filename: __filename,
    use: "< text >",
    desc: "Translate's given text in desird language.",
  },
  async (Aoid, Aitel) => {
    try {
      let formal = Aitel ? Aitel.split(" ")[0].toLowerCase() : "en";
      if (!Aoid.reply_text) {
        var result = Aitel.replace(formal, "")?.trim() || false;
      } else {
        var result = Aoid.reply_text;
      }
      if (!result) {
        return await Aoid.reply(
          "*Please Give Me Text. Example: _" + prefix + "trt en Who are you_*"
        );
      }
      var output = await translatte(result, {
        from: "auto",
        to: formal,
      });
      if ("text" in output) {
        return await Aoid.reply(output.text);
      }
    } catch (error) {
      await Aoid.error(error + "\n\ncommand trt", error);
    }
  }
);
const readDirectory = (path) => {
  return new Promise((location, dir) => {
    fs.readdir(path, (place, classss) => {
      if (place) {
        dir("Error reading directory");
      } else {
        location(classss);
      }
    });
  });
};
AdminFunction.cmd(
  {
    pattern: "file",
    desc: "to get extact name where that command is in repo.\nSo user can edit that.",
    category: "user",
    fromMe: true,
    filename: __filename,
  },
  async (message, read) => {
    try {
      if (!read) {
        return message.reply(
          "*`Sir Give me a Command Name to Find it's Location`*"
        );
      }
      if (read.startsWith(".")) {
        let data = "*------------- FILE MANAGER -------------*\n";
        try {
          const Get = await readDirectory(read);
          Get.forEach((files) => {
            data += files + "\n";
          });
          await message.reply(data.toString());
        } catch (error) {
          message.reply(error);
        }
        return;
      }
      const { commands: _0x3c2c2b } = require("../lib");
      let init = [];
      let commands = read.split(" ")[0].toLowerCase().trim();
      let match =
        events.commands.find((commands) => commands.pattern === commands) ||
        events.commands.find(
          (category) => category.alias && category.alias.includes(commands)
        );
      if (!match) {
        return await message.reply("*❌No Such commands.*");
      }
      init.push("*🍁Command:* " + match.pattern);
      if (match.category) {
        init.push("*🧩Type:* " + match.category);
      }
      if (match.alias && match.alias[0]) {
        init.push("*🧩Alias:* " + match.alias.join(", "));
      }
      if (match.desc) {
        init.push("*✨Description:* " + match.desc);
      }
      if (match.use) {
        init.push(
          "*〽️Usa:*\n ```" + prefix + match.pattern + " " + match.use + "```"
        );
      }
      if (match.usage) {
        init.push("*〽️Usage:*\n ```" + match.usage + "```");
      }
      if (match.filename) {
        init.push("*✨FileName:* " + match.filename);
      }
      try {
        if (
          read.includes("function") &&
          match.function &&
          message.isAstro &&
          match.pattern !== "file"
        ) {
          init.push("*🧩Function:* " + match.function.toString());
        }
      } catch {}
      await message.reply(init.join("\n"));
    } catch (error) {
      await message.error(error + "\nCommand:file", error);
    }
  }
);
AdminFunction.cmd(
  {
    pattern: "eval",
    alias: ["$"],
    category: "owner",
    filename: __filename,
    fromMe: true,
    desc: "Runs js code on node server.",
    use: "< run code >",
    dontAddCommandList: true,
  },
  async (message, query) => {
    try {
      if (!query) {
        return message.reply("*Provide A Query To Run Master*");
      }
      let Query = eval("const a = async()=>{\n" + query + "\n}\na()");
      if (typeof Query === "object") {
        await message.reply(JSON.stringify(Query));
      } else {
        await message.reply(Query.toString());
      }
    } catch (error) {
      return await message.reply(error.toString());
    }
  }
);
AdminFunction.cmd(
  {
    pattern: "shell",
    category: "owner",
    filename: __filename,
    fromMe: true,
    desc: "Runs command in Heroku(server) shell.",
    use: "<shell cmds | ls,cd >",
    dontAddCommandList: true,
  },
  async (match, data) => {
    try {
      if (!match.isCreator) {
        return match.reply(tlang().owner);
      }
      if (!data) {
        return match.reply("*Uhh PLease, Provide A Command to Run Heroku*");
      }
      exec(data, (result, output) => {
        if (result) {
          return match.reply("----" + tlang().title + "----\n\n" + result);
        }
        if (output) {
          return match.reply("----" + tlang().title + "----\n\n" + output);
        }
      });
    } catch (error) {
      await match.error(error + "\n\ncommand shell", error);
    }
  }
);
amd(
  {
    pattern: "channel",
    desc: "To check ping",
    react: "🗨️",
    category: "user",
    filename: __filename,
  },
  async (message) => {
    const channelMessage = `ᴍᴀꜱᴛᴇʀ ᴍᴅ ꜱᴜᴘᴘᴏʀᴛᴇᴅ ᴄʜᴀɴɴᴇʟ\n\n _ʜᴇʏ ʜᴇʀᴇ's ᴏᴜʀ ᴄʜᴀɴɴᴇʟ ʟɪɴᴋ, ᴘʟᴇᴀsᴇ ғᴏʟʟᴏᴡ ᴀɴᴅ sᴜᴘᴘᴏʀᴛ ᴜs ᴛᴏ ᴋᴇᴇᴘ ᴛʜɪs ᴘʀᴏᴊᴇᴄᴛ ᴀʟɪᴠᴇ_\n *ʟɪɴᴋ:* https://whatsapp.com/channel/0029VaWWZa1G3R3c4TPADo0M\n\n ${Config.botname} *ᴡᴏʀᴋꜱ*`;

    const contextInfo = {
      forwardingScore: 999,
      isForwarded: true,
    };

    await message.send(channelMessage, { contextInfo });
  }
);
amd(
  {
    pattern: "support",
    desc: "To check ping",
    react: "🗨️",
    category: "user",
    filename: __filename,
  },
  async (message) => {
    const SupportMsg = `ᴍᴀꜱᴛᴇʀ ᴍᴅ ꜱᴜᴘᴘᴏʀᴛᴇᴅ ɢʀᴏᴜᴘ\n\n *ʟɪɴᴋ:* https://chat.whatsapp.com/C9vNmipX64o0FbrVz8QPhX\n\n ${Config.botname} *ᴡᴏʀᴋꜱ*`;

    const contextInfo = {
      forwardingScore: 999,
      isForwarded: true,
    };

    await message.send(SupportMsg, { contextInfo });
  }
);
