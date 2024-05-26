let antiCallMessage = process.env.ANTICALL_MESSAGE || "```Hii this is WASI-Md a Personal Assistant!!\n\n\tSorry for now, we cannot receive calls, whether in a group or personal \n\n if you need help or request features please chat owner\n\n\nPowered by WASI-MD-V2```";
let antiCallCountries = [];
let antiCallusers = {};
let bots = false;
smd({
  'pattern': "anticall",
  'desc': "Detects calls and decline them. ",
  'category': "owner",
  'use': "<on | off>",
  'filename': __filename
}, async (_0x3079c3, _0x16cfc8) => {
  let _0x20f464 = (await bot_.findOne({
    'id': "bot_" + _0x3079c3.user
  })) || (await bot_["new"]({
    'id': "bot_" + _0x3079c3.user
  }));
  let _0xfa720 = _0x16cfc8 ? _0x16cfc8.toLowerCase().trim() : '';
  if (_0xfa720.startsWith("off") || _0xfa720.startsWith("deact") || _0xfa720.startsWith('disable')) {
    if (_0x20f464.anticall === "false") {
      return await _0x3079c3.send("*anticall Already Disabled In Current Chat!*");
    }
    await bot_.updateOne({
      'id': "bot_" + _0x3079c3.user
    }, {
      'anticall': "false"
    });
    return await _0x3079c3.send("*anticall Disable Succesfully!*");
  } else {
    if (!_0x16cfc8) {
      return await _0x3079c3.send("*_anticall " + (_0x20f464.anticall === 'false' ? "Not set to any" : "set to \"" + _0x20f464.anticall + "\"") + " Country Code!_*\n *Provide Country code to Update Status*\n*Eg: _.anticall all | 212, 91_*");
    }
  }
  let _0x550952 = _0xfa720.includes("all") ? "all" : _0x16cfc8 ? _0x16cfc8.split(',').map(_0x5dedec => parseInt(_0x5dedec)).filter(_0x388aec => !isNaN(_0x388aec)).join(',') : false;
  if (!_0x16cfc8 || !_0x550952) {
    return await _0x3079c3.send("*_Please provide country code to block calls_*\n*_eg: " + prefix + "anticall all | 92_*");
  } else {
    if (_0x550952) {
      await bot_.updateOne({
        'id': "bot_" + _0x3079c3.user
      }, {
        'anticall': '' + _0x550952
      });
      return await _0x3079c3.send("*anticall Succesfully set to \"" + _0x550952 + "\"!*");
    } else {
      return await _0x3079c3.send("*_Please provide a Valid country code_*\n*example: " + prefix + "anticall all,212,91,231_*");
    }
  }
});
smd({
  'call': "offer"
}, async _0x1a2ce4 => {
  try {
    if (!bots) {
      bots = await bot_.findOne({
        'id': "bot_" + _0x1a2ce4.user
      });
    }
    if (_0x1a2ce4.fromMe || !bots || !bots.anticall || bots.anticall === "false") {
      return;
    }
    if (!antiCallCountries || !antiCallCountries[0x0]) {
      antiCallCountries = bots.anticall?.["split"](',') || [];
      antiCallCountries = antiCallCountries.filter(_0x1e7c5a => _0x1e7c5a.trim() !== '');
    }
    let _0x15d906 = ('' + bots.anticall).includes("all") ? "all" : '';
    let _0x166d3c = _0x15d906 == "all" ? true : antiCallCountries.some(_0x464681 => _0x1a2ce4.from?.["toString"]()?.['startsWith'](_0x464681));
    if (_0x166d3c || _0x1a2ce4.isBot) {
      try {
        if (!antiCallusers || !antiCallusers[_0x1a2ce4.from]) {
          antiCallusers[_0x1a2ce4.from] = {
            'warn': 0x0
          };
        }
        if (antiCallusers[_0x1a2ce4.from].warn < 0x2) {
          await _0x1a2ce4.send(antiCallMessage);
        }
        antiCallusers[_0x1a2ce4.from].warn++;
        await _0x1a2ce4.send('*_' + antiCallusers[_0x1a2ce4.from].warn + " Call rejected From User @" + _0x1a2ce4.from.split('@')[0x0] + "..!!_*", {
          'mentions': [_0x1a2ce4.from]
        }, "asta", '', _0x1a2ce4.user);
        return await _0x1a2ce4.decline();
      } catch {}
    }
  } catch {}
});
