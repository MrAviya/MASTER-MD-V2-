const { UserFunction } = require("../lib");

UserFunction({
  pattern: 'clear',
  fromMe: true,
  desc: 'delete whatsapp chat',
  type: 'chats'
}, async (message) => {
  try {
    await message.bot.chatModify({ delete: true, lastMessages: [{ key: message.key, messageTimestamp: message.messageTimestamp }] }, message.jid);
    await message.send('_Cleared!_');
  } catch (e) {
    message.error(`${e}\n\nCommand: clear`, e, false);
  }
});

UserFunction({
  pattern: 'archive',
  fromMe: true,
  desc: 'archive whatsapp chat',
  type: 'chats'
}, async (message) => {
  try {
    await message.bot.chatModify({ archive: true, lastMessages: [{ key: message.key, messageTimestamp: message.messageTimestamp }] }, message.jid);
    await message.send('_Archived!_');
  } catch (e) {
    message.error(`${e}\n\nCommand: archive`, e, false);
  }
});

UserFunction({
  pattern: 'unarchive',
  fromMe: true,
  desc: 'unarchive whatsapp chat',
  type: 'chats'
}, async (message) => {
  try {
    await message.bot.chatModify({ archive: false, lastMessages: [{ key: message.key, messageTimestamp: message.messageTimestamp }] }, message.jid);
    await message.send('_Unarchived!_');
  } catch (e) {
    message.error(`${e}\n\nCommand: unarchive`, e, false);
  }
});

UserFunction({
  pattern: 'chatpin',
  alias: ["pinchat"],
  fromMe: true,
  desc: 'pin a chat',
  type: 'chats'
}, async (message) => {
  try {
    await message.bot.chatModify({ pin: true }, message.jid);
    await message.send('_Pinned!_');
  } catch (e) {
    message.error(`${e}\n\nCommand: chatpin`, e, false);
  }
});

UserFunction({
  pattern: 'unpin',
  alias: ["unpinchat", "chatunpin"],
  fromMe: true,
  desc: 'unpin a chat',
  type: 'chats'
}, async (message) => {
  try {
    await message.bot.chatModify({ pin: false }, message.jid);
    await message.send('_Unpinned!_');
  } catch (e) {
    message.error(`${e}\n\nCommand: unpin`, e, false);
  }
});

UserFunction({
  pattern: 'markread',
  fromMe: true,
  desc: 'mark as read',
  type: 'chats'
}, async (message) => {
  try {
    await message.react("🍁");
    await message.bot.chatModify({ markRead: true, lastMessages: [message] }, message.jid);
  } catch (e) {
    message.error(`${e}\n\nCommand: markread`, e, false);
  }
});

UserFunction({
  pattern: 'markunread',
  fromMe: true,
  desc: 'mark as unread',
  type: 'chats'
}, async (message) => {
  try {
    await message.send("🍁", {}, "react");
    await message.bot.chatModify({ markRead: false, lastMessages: [message] }, message.jid);
  } catch (e) {
    message.error(`${e}\n\nCommand: markunread`, e, false);
  }
});

UserFunction({
  pattern: 'unmutechat',
  fromMe: true,
  desc: 'unmute a chat',
  type: 'chats'
}, async (message) => {
  try {
    await message.bot.chatModify({ mute: null }, message.jid);
    await message.send('_Chat Unmuted!_');
  } catch (e) {
    message.error(`${e}\n\nCommand: unmutechat`, e, false);
  }
});


UserFunction({
    pattern: 'profilename',
    fromMe: true,
    desc: 'To change your profile name',
    type: 'whatsapp'
}, async (message, match) => {
    try {
        match = match || message.reply_message.text
        if (!match) return await message.send('*Need Name!*\n*Example: profilename your name*.')
        await message.bot.updateProfileName(match)
        await message.send('_Profile name updated!_')
    } catch (e) { message.error(`${e}\n\nCommand : profilename`, e, false) }
})


// ============================ PRIVACY SETTINGS ============================    









UserFunction({
    pattern: 'getprivacy',
    fromMe: true,
    desc: 'get your privacy settings',
    type: 'privacy'
}, async (message, match) => {
    const {
        readreceipts,
        profile,
        status,
        online,
        last,
        groupadd,
        calladd
    } = await message.bot.fetchPrivacySettings(true);
    const msg = `*♺ whatsapp privacy settings*

*ᝄ name :* ${(message.fromMe && message.pushName ? message.pushName : message.bot.user.name).split("\n").join("  ")}
*ᝄ number :* ${message.user.split("@")[0]}

*ᝄ online :* ${online}
*ᝄ profile :* ${profile}
*ᝄ last seen :* ${last}
*ᝄ whts status :* ${status}
*ᝄ read receipt :* ${readreceipts}

*ᝄ who can add in group :* ${groupadd}
*ᝄ who can call :* ${calladd}`;
    let img = await message.getpp(message.user)
    await message.send(img, {
        caption: msg
    }, 'img');
})





UserFunction({
    pattern: 'lastseen',
    fromMe: true,
    desc: 'to change lastseen privacy',
    type: 'privacy'
}, async (message, match, { smd }) => {
    try {
        if (!match) return await message.send(`_*Example:-* .lastseen all_\n_to change last seen privacy settings_`);
        const available_privacy = ['all', 'contacts', 'contact_blacklist', 'none'];
        if (!available_privacy.includes(match)) return await message.send(`_action must be *${available_privacy.join(' / ')}* values_`);
        await message.bot.updateLastSeenPrivacy(match)
        await message.send(`_Privacy settings *last seen* Updated to *${match}*_`);
    } catch (e) { message.error(`${e}\n\nCommand : lastseen`, e, false) }
})


UserFunction({
    pattern: 'online',
    fromMe: true,
    desc: 'to change online privacy',
    type: 'privacy'
}, async (message, match,) => {
    try {
        if (!match) return await message.send(`_*Example:-* .online all_\n_to change *online*  privacy settings_`);
        const available_privacy = ['all', 'match_last_seen'];
        if (!available_privacy.includes(match)) return await message.send(`_action must be *${available_privacy.join('/')}* values_`);
        await message.bot.updateOnlinePrivacy(match)
        await message.send(`_Privacy Updated to *${match}*_`);
    } catch (e) { message.error(`${e}\n\nCommand : online`, e, false) }
})


UserFunction({
    pattern: 'mypp',
    fromMe: true,
    desc: 'privacy setting profile picture',
    type: 'privacy'
}, async (message, match) => {
    try {
        if (!match) return await message.send(`_*Example:-* .mypp all_\n_to change *profile picture*  privacy settings_`);
        const available_privacy = ['all', 'contacts', 'contact_blacklist', 'none'];
        if (!available_privacy.includes(match)) return await message.send(`_action must be *${available_privacy.join('/')}* values_`);
        await message.bot.updateProfilePicturePrivacy(match)
        await message.send(`_Privacy Updated to *${match}*_`);
    } catch (e) { message.error(`${e}\n\nCommand : mypp`, e, false) }
})

UserFunction({
    pattern: 'mystatus',
    fromMe: true,
    desc: 'privacy for my status',
    type: 'privacy'
}, async (message, match,) => {
    try {
        if (!match) return await message.send(`_*Example:-* .mystatus all_\n_to change *status*  privacy settings_`);
        const available_privacy = ['all', 'contacts', 'contact_blacklist', 'none'];
        if (!available_privacy.includes(match)) return await message.send(`_action must be *${available_privacy.join('/')}* values_`);
        await message.bot.updateStatusPrivacy(match)
        await message.send(`_Privacy Updated to *${match}*_`);
    } catch (e) { message.error(`${e}\n\nCommand : mystatus`, e, false) }
})

UserFunction({
    pattern: 'read',
    fromMe: true,
    desc: 'privacy for read message',
    type: 'privacy'
}, async (message, match, cmd) => {
    try {
        if (!match) return await message.send(`_*Example:-* .read all_\n_to change *read and receipts message*  privacy settings_`);
        const available_privacy = ['all', 'none'];
        if (!available_privacy.includes(match)) return await message.send(`_action must be *${available_privacy.join('/')}* values_`);
        await message.bot.updateReadReceiptsPrivacy(match)
        await message.send(`_Privacy Updated to *${match}*_`);
    } catch (e) { message.error(`${e}\n\nCommand : read`, e, false) }
})

UserFunction({
    pattern: 'groupadd',
    fromMe: true,
    desc: 'privacy for group add',
    type: 'privacy'
}, async (message, match, cmd) => {
    try {
        if (!match) return await message.send(`_*Example:-* .groupadd all_\n_to change *group add*  privacy settings_`);
        const available_privacy = ['all', 'contacts', 'contact_blacklist', 'none'];
        if (!available_privacy.includes(match)) return await message.send(`_action must be *${available_privacy.join('/')}* values_`);
        await message.bot.updateGroupsAddPrivacy(match)
        await message.send(`_Privacy Updated to *${match}*_`);
    } catch (e) { message.error(`${e}\n\nCommand : groupadd`, e, false) }
})