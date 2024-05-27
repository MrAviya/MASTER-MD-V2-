const { smd, sleep } = require('../lib');

smd({ cmdname: "hack", type: "fun", info: "hacking prank", filename: __filename }, async (citel) => {
  const messages = [
    "Injecting Malware",
    " █ 10%",
    " █ █ 20%",
    " █ █ █ 30%",
    " █ █ █ █ 40%",
    " █ █ █ █ █ 50%",
    " █ █ █ █ █ █ 60%",
    " █ █ █ █ █ █ █ 70%",
    " █ █ █ █ █ █ █ █ 80%",
    " █ █ █ █ █ █ █ █ █ 90%",
    " █ █ █ █ █ █ █ █ █ █ 100%",
    "> System hyjacking on process.. ",
    "Conecting to Server error to find 404 ",
    "Device successfully connected...",
    "Receving data...",
    "Data hyjacked from divice 100% completed",
    "killing all evidence killing all malwares...",
    "HACKING COMPLETED",
    "SENDING LOG DOCUMENTS...",
    "SUCCESSFULLY SENT DATA AND Connection disconnected",
    "BACKLOGS CLEARED`",
    "`MASTER MIND HACKED YOUR WHATSAPP` 🧛‍♂️👨‍💻"
  ];

  let editedMessage;
  for (const message of messages) {
    editedMessage = await citel.send(editedMessage || message);
    await sleep(1000);
    editedMessage = await citel.edit(editedMessage, message);
  }
});
