smd({
    pattern: "repo",
    alias: ["git", "sc", "script"],
    desc: "Sends info about repo",
    category: "user",
    filename: __filename
}, async _0x45da98 => {
    try {
        let {
            data: _0x44f98c
        } = await axios.get("https://api.github.com/repos/MrMasterOfc/MASTER-MD-V2");
        let _0x1c73f9 = ("\nSimple WhatsApp Bot By Redgang Team.* Used By" + Config.ownername + "*.\n\n  *❲❒❳ Stars:* " + (_0x44f98c?.stargazers_count || "120+") + " stars\n  *❲❒❳ Forks:* " + (_0x44f98c?.forks_count || "500+") + " forks\n  *❲❒❳ Creator:* Sahan Maduwantha\n  *❲❒❳ Created:* " + (_0x44f98c?.created_at || "Unknown") + "\n  *❲❒❳ Repo:* _https://github.com/MrMasterOfc/MASTER-MD-V2_\n" + (Config.caption ? "\n\n" + Config.caption : "")).trim();
        return await _0x45da98.sendUi(_0x45da98.jid, {
            caption: _0x1c73f9
        });
    } catch (_0x5816fe) {
        await _0x45da98.error(_0x5816fe + "\n\ncommand: repo", _0x5816fe);
    }
});
