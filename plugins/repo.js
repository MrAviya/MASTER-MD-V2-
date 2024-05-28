const { smd, sleep } = require('../lib');

smd({ cmdname: "repo", react: "🧛‍♂️", type: "user", info: "info", filename: __filename }, async (citel) => {
  const messages = [
 "`Github` = https://github.com/MrMasterOfc/MASTER-MD-V2"
  ];

  let editedMessage;
  for (const message of messages) {
    editedMessage = await citel.send(editedMessage || message);
    await sleep(1000);
    editedMessage = await citel.edit(editedMessage, message);
  }
});
