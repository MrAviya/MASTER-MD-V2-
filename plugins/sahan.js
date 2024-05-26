const { smd, sleep } = require('../lib');

smd({ cmdname: "sahan", type: "developer", info: "info", filename: __filename }, async (citel) => {
  const messages = [
 "> My Name is Sahan Maduwantha🎉✨" ,
    "> I am 18 Years Old😎✌",
    "> I am programming student🌹✔. I can coding Html,Javascript And other. this All these creations are my creations.😊💖",
    "> I am student of Galewela central collage🐥😘"
  ];

  let editedMessage;
  for (const message of messages) {
    editedMessage = await citel.send(editedMessage || message);
    await sleep(1000);
    editedMessage = await citel.edit(editedMessage, message);
  }
});
