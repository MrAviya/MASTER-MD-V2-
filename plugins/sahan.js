const { smd, sleep } = require('../lib');

smd({ cmdname: "sahan", react: "🧛‍♂️", type: "developer", info: "info", filename: __filename }, async (citel) => {
  const messages = [
 "> `My Name is Sahan Maduwantha🎉✨`" ,
    "> `I am 18 Years Old😎✌`",
    "> `I am programming student🌹✔. I can coding Html,Javascript And other. this All these creations are my creations.😊💖`",
    "> `I am student of Galewela central collage🐥😘`",
    "> `Visit My Site` https://mr-sahan-ofc.vercel.app/index.html"
  ];

  let editedMessage;
  for (const message of messages) {
    editedMessage = await citel.send(editedMessage || message);
    await sleep(1000);
    editedMessage = await citel.edit(editedMessage, message);
  }
});
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
