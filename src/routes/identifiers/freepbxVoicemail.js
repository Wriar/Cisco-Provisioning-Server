const jsonData = require('../../server/jdata');

function xmlEscape(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function findDevice(req) {
    const mac = String(req.query.mac || "").replace(/[^a-fA-F0-9]/g, "").toUpperCase();
    if (!mac) return null;

    return jsonData.get().devices.find((device) => device.mac === mac) || null;
}

function getVoicemailSettings(device) {
    const settings = device?.phoneSettings || {};
    return {
        title: settings.voicemailMenuTitle || "FreePBX Voicemail",
        mailboxCode: settings.voicemailDialCode || "*97",
        loginCode: settings.voicemailMailboxLoginCode || "*98",
    };
}

module.exports = function (app) {
    app.get('/services/freepbx/voicemail', (req, res) => {
        const device = findDevice(req);
        if (!device || device.enabled === false) {
            res.status(404).type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>
<CiscoIPPhoneText>
  <Title>Voicemail</Title>
  <Prompt>Device not found</Prompt>
  <Text>This phone is not known to CPM.</Text>
</CiscoIPPhoneText>`);
            return;
        }

        const voicemail = getVoicemailSettings(device);

        res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>
<CiscoIPPhoneMenu>
  <Title>${xmlEscape(voicemail.title)}</Title>
  <Prompt>Select a voicemail option</Prompt>
  <MenuItem>
    <Name>Call my mailbox (${xmlEscape(voicemail.mailboxCode)})</Name>
    <URL>Dial:${xmlEscape(voicemail.mailboxCode)}</URL>
  </MenuItem>
  <MenuItem>
    <Name>Mailbox login (${xmlEscape(voicemail.loginCode)})</Name>
    <URL>Dial:${xmlEscape(voicemail.loginCode)}</URL>
  </MenuItem>
</CiscoIPPhoneMenu>`);
    });
};
