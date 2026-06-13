const phoneModelMap = {
    1: "7941, 7961, 7942, 7962",
    2: "7945, 7965",
    3: "7970, 7971",
    4: "7975",
    5: "8821",
    6: "8841, 8845, 8851, 8861, 8865",
    7: "8941, 8945",
    8: "8861, 9951, 9971",
    9: "CP-78xx",
    10: "Other, SPA/(g) models, Legacy, or Backlit Only",
    "placeholder": "Not Specified"
};

const {xmlBuild, builder, convert} = require('xmlbuilder2');
const createLog = require("../../server/logger");

const { parseString, Parser } = require('xml2js'); // Built-in module for XML parsing
const { response } = require('express');
const fs = require('fs');
const path = require('path');

const defaultPhoneSettings = {
    cnfJoinEnabled: "true",
    sipInviteRetx: "6",
    sipRetx: "10",
    timerInviteExpires: "180",
    timerRegisterExpires: "3600",
    timerRegisterDelta: "5",
    timerKeepAliveExpires: "120",
    timerSubscribeExpires: "120",
    timerSubscribeDelta: "5",
    timerT1: "500",
    timerT2: "4000",
    maxRedirects: "70",
    remotePartyID: "true",
    userInfo: "Phone",
    rfc2543Hold: "false",
    callHoldRingback: "1",
    localCfwdEnable: "true",
    semiAttendedTransfer: "true",
    anonymousCallBlock: "0",
    callerIdBlocking: "0",
    dndControl: "0",
    remoteCcEnable: "true",
    retainForwardInformation: "false",
    uriDialingDisplayPreference: "1",
    autoAnswerTimer: "1",
    autoAnswerAltBehavior: "false",
    autoAnswerOverride: "true",
    transferOnhookEnabled: "true",
    enableVad: "false",
    preferredCodec: "none",
    dtmfAvtPayload: "101",
    dtmfDbLevel: "3",
    dtmfOutofBand: "avt",
    alwaysUsePrimeLine: "false",
    alwaysUsePrimeLineVoiceMail: "false",
    kpml: "0",
    stutterMsgWaiting: "0",
    callStats: "true",
    offhookToFirstDigitTimer: "15000",
    silentPeriodBetweenCallWaitingBursts: "10",
    disableLocalSpeedDialConfig: "false",
    startMediaPort: "16384",
    stopMediaPort: "32766",
    natEnabled: "false",
    natReceivedProcessing: "false",
    natAddress: "",
    externalNumberMask: "",
    dscpForAudio: "184",
    ringSettingBusyStationPolicy: "0",
    dialTemplate: "",
    softKeyFile: "",
    MissedCallLoggingOption: "1",
    featurePolicyFile: "",
    phonePassword: "",
    backgroundImageAccess: "true",
    callLogBlfEnabled: "2",
    defaultWallpaperFile: "",
    minimumRingVolume: "",
    enableGroupListen: "true",
    holdResumeKey: "1",
    recentsSoftKey: "1",
    dfBit: "1",
    pcPort: "0",
    spanToPCPort: "1",
    garp: "0",
    rtcp: "1",
    videoRtcp: "1",
    voiceVlanAccess: "0",
    videoCapability: "1",
    hideVideoByDefault: "0",
    separateMute: "0",
    ciscoCamera: "1",
    sdio: "1",
    btpbap: "0",
    bthfu: "0",
    ehookEnable: "0",
    autoSelectLineEnable: "1",
    autoCallSelect: "1",
    incomingCallToastTimer: "10",
    dialToneFromReleaseKey: "0",
    joinAndDirectTransferPolicy: "0",
    simplifiedNewCall: "0",
    actionableAlert: "0",
    showCallHistoryForSelectedLine: "0",
    kemOneColumn: "0",
    lineMode: "0",
    lowerYourVoiceAlert: "0",
    markCallAsSpam: "1",
    callParkMonitor: "1",
    allCallsOnPrimary: "0",
    softKeyControl: "1",
    settingsAccess: "1",
    webProtocol: "0",
    webAccess: "0",
    webAdmin: "1",
    adminPassword: "",
    sshAccess: "0",
    detectCMConnectionFailure: "0",
    g722CodecSupport: "1",
    handsetWidebandEnable: "2",
    headsetWidebandEnable: "2",
    headsetWidebandUIControl: "1",
    handsetWidebandUIControl: "1",
    daysDisplayNotActive: "1,7",
    displayOnTime: "08:00",
    displayOnDuration: "10:00",
    displayIdleTimeout: "00:10",
    displayOnWhenIncomingCall: "1",
    displayRefreshRate: "0",
    daysBacklightNotActive: "1,7",
    backlightOnTime: "08:00",
    backlightOnDuration: "10:00",
    backlightIdleTimeout: "00:10",
    backlightOnWhenIncomingCall: "1",
    recordingTone: "0",
    recordingToneLocalVolume: "100",
    recordingToneRemoteVolume: "50",
    recordingToneDuration: "",
    moreKeyReversionTimer: "5",
    peerFirmwareSharing: "0",
    loadServer: "",
    problemReportUploadURL: "",
    enableCdpSwPort: "1",
    enableCdpPcPort: "0",
    enableLldpSwPort: "1",
    enableLldpPcPort: "0",
    cdpEnable: "true",
    powerNegotiation: "0",
    outOfRangeAlert: "0",
    scanningMode: "2",
    applicationURL: "",
    appButtonTimer: "0",
    appButtonPriority: "0",
    specialNumbers: "",
    sendKeyAction: "0",
    powerOffWhenCharging: "0",
    homeScreen: "0",
    accessContacts: "1",
    accessFavorites: "1",
    accessVoicemail: "1",
    accessApps: "1",
    loadInformation: "",
    inactiveLoadInformation: "",
    userLocaleName: "",
    userLocaleLangCode: "",
    userLocaleVersion: "",
    networkLocale: "",
    networkLocaleVersion: "",
    deviceSecurityMode: "1",
    idleTimeout: "0",
    authenticationURL: "http://provisioning.centurate.com/cisco.php",
    messagesURL: "",
    servicesURL: "",
    directoryURL: "",
    idleURL: "",
    informationURL: "",
    proxyServerURL: "",
    secureAuthenticationURL: "",
    secureMessagesURL: "",
    secureServicesURL: "",
    secureDirectoryURL: "",
    secureInformationURL: "",
    secureIdleURL: "",
    transportLayerProtocol: "1",
    TLSResumptionTimer: "3600",
    phonePersonalization: "1",
    autoCallPickupEnable: "true",
    blfAudibleAlertSettingOfIdleStation: "0",
    blfAudibleAlertSettingOfBusyStation: "0",
    dndCallAlert: "1",
    dndReminderTimer: "5",
    advertiseG722Codec: "1",
    rollover: "0",
    joinAcrossLines: "0",
    capfAuthMode: "0",
    certHash: "",
    encrConfig: "false",
    userId: "",
    ownerId: "",
    usb1: "1",
    usb2: "1",
    usbClasses: "0,1,2",
    wifi: "1",
    bluetooth: "1",
    bluetoothProfile: "0,1"
};

function normalizePhoneSettings(settings = {}) {
    return {
        ...defaultPhoneSettings,
        ...settings
    };
}

async function validateProvisioningXml(xml) {
    if (!xml || typeof xml !== "string" || xml.trim() === "") {
        return { valid: false, message: "XML override is empty." };
    }

    const parser = new Parser();
    try {
        const parsed = await parser.parseStringPromise(xml);
        if (!parsed || !parsed.device) {
            return { valid: false, message: "Provisioning XML root element must be <device>." };
        }
        return { valid: true, parsed };
    } catch (error) {
        return { valid: false, message: error.message };
    }
}
module.exports = function(app) {
    app.post('/api/validateProvisioningXml', async (req, res) => {
        if (req.session.loggedIn !== true) return res.status(401).send({ code: 1, message: "Not logged in" });

        const validation = await validateProvisioningXml(req.body.xml);
        if (!validation.valid) {
            res.status(400).send({ code: 1, message: validation.message });
            return;
        }

        res.send({ code: 0, message: "XML is valid." });
    });

    app.post('/api/createModifyDevice', async (req, res) => {

        //Make sure user is logged in

        if (req.session.loggedIn !== true) return res.status(401).send({ code: 1, message: "Not logged in" });

        const data = req.body.data; //Get the data from the request body

        //Parse data as JSON
        console.log(data);

        //const json = JSON.parse(data);
        const json = data; //No need to parse again


        //Ensure JSON has a meta, cpa, cust, security, and lineKeys objects
        if (!json.meta || !json.cpa || !json.cust || !json.security || !json.lineKeys) {
            res.json({code: 1, message: "Invalid JSON"});
            return;
        }

        const serverData = require('../../server/jdata');
        let cache = serverData.get(); //Require a new copy (just in case)

        //Read the JSON 'devices' array. Loop through each item. If the UUID already exists, update the device. If not, create a new device.

        let deviceExists = false;
        let deviceIndex = -1;

        cache.devices.forEach((device, index) => {
            if (device.uuid === json.meta.deviceUUID) {
                deviceExists = true;
                deviceIndex = index;
            }
        });

        console.log("Device Model: " + json.cust.deviceModel);
        console.log("Mapped Device Model from number: " + phoneModelMap[json.cust.deviceModel]);
        const phoneSettings = normalizePhoneSettings(json.phoneSettings);
        if (deviceExists) {

            //Replace the device in the cache's attributes
            cache.devices[deviceIndex].name = json.meta.deviceName;
            cache.devices[deviceIndex].model = phoneModelMap[json.cust.deviceModel];
            cache.devices[deviceIndex].groups = json.cust.deviceGroups || null;
            cache.devices[deviceIndex].description = json.meta.deviceDescription;
            cache.devices[deviceIndex].extension = json.meta.deviceExtension;
            cache.devices[deviceIndex].ip = json.cust.deviceIP;
            cache.devices[deviceIndex].mac = json.meta.deviceMAC;
            cache.devices[deviceIndex].enabled = json.security.enableDevice;
            cache.devices[deviceIndex].security.ipRestricted = json.security.ipRestriction;
            cache.devices[deviceIndex].security.ipWhitelist = [json.security.ipRestrictionRangeStart, json.security.ipRestrictionRangeEnd];
            cache.devices[deviceIndex].phoneSettings = phoneSettings;
            cache.devices[deviceIndex].advancedXmlOverrideEnabled = json.advanced?.xmlOverrideEnabled === true;
            cache.devices[deviceIndex].createdAt = new Date();
        } else {

            //MAC Duplicate Check (fixes Bug in Commit #84)
            cache.devices.forEach(device => {
                if (device.mac === json.meta.deviceMAC) {
                    res.send({code: 1, message: "MAC Address already exists in the system."});
                    return;
                }
            });


            //Create a new device in "devices" of cache
            cache.devices.push({
                uuid: json.meta.deviceUUID,
                model: phoneModelMap[json.cust.deviceModel],
                groups: json.cust.deviceGroups || null,
                name: json.meta.deviceName,    
                description: json.meta.deviceDescription,
                createdAt: new Date(),
                createdBy: req.session.a_username,
                extension: json.meta.deviceExtension,
                ip: json.cust.deviceIP,
                lastPing: "Never",
                mac: json.meta.deviceMAC,
                provisioningFile: `SEP${json.meta.deviceMAC}.cnf.xml`,
                enabled: json.security.enableDevice,
                security: {
                    ipRestricted: json.security.ipRestriction,
                    ipWhitelist: [json.security.ipRestrictionRangeStart, json.security.ipRestrictionRangeEnd]
                },
                phoneSettings,
                advancedXmlOverrideEnabled: json.advanced?.xmlOverrideEnabled === true,
            });
        }

        const advancedXmlOverrideEnabled = json.advanced?.xmlOverrideEnabled === true;
        const advancedXmlOverride = json.advanced?.xmlOverride || "";

        if (advancedXmlOverrideEnabled) {
            const validation = await validateProvisioningXml(advancedXmlOverride);
            if (!validation.valid) {
                res.status(400).send({ code: 1, message: `Advanced XML override is invalid: ${validation.message}` });
                return;
            }

            const responseMethodText = deviceExists ? "Updated" : "Created";
            createLog(1, `${responseMethodText} XML override configuration (SEP${json.meta.deviceMAC}.cnf.xml).`);
            console.log(`${responseMethodText} XML override configuration (SEP${json.meta.deviceMAC}.cnf.xml).`);

            serverData.save(cache);

            fs.writeFile(path.join(__dirname, `../../data/config/SEP${json.meta.deviceMAC}.cnf.xml`), advancedXmlOverride, (err) => {
                if(err) {
                    console.log("Failed to write SEP.cnf.xml to file. " + err);
                    res.send({code: 1, message: "Server failed to write provisioning file."});
                    return;
                }

                res.send({code: 0, message: "Your XML override has been saved successfully."});

                setTimeout(() => {
                    console.log("New XML override posted by purge");
                    serverData.forcePurge();
                }, 2000);
            });
            return;
        }

        //Rebuild the SEP Configuration File
        let lineData = json.lineKeys;
        console.log(lineData);

        
        const convertToArrayWithEmptySlots = (data) => {
            const result = [];
            const keys = Object.keys(data);
            const values = Object.values(data);

            keys.forEach((key, index) => {
                const position = Number(key) - 1;
                result[position] = values[index];
            });

            return result;
        };

        //Convert lineData to an array.
        lineData = convertToArrayWithEmptySlots(lineData);

        console.log("The Linedata: " + lineData);

        let builtLineXML = ""; //Will be processed from lineData

        //Read template.xml file in current directory
        let xmlTemplate = require('fs').readFileSync(path.join(__dirname, 'template.xml'), 'utf8');

        //Begin to replace the <!--ATTRIBUTE--> tags with the data from the JSON
        //The key is the ATTRIBUTE comment in the JSON, which will be replaced with the value
        const variableAttributeMap = {
            "dateTemplate": json.cpa.dateTemplate,
            "timeZone": json.cpa.timeZone,
            "ntpName": json.cpa.ntpName,
            "ntpMode": json.cpa.ntpMode,
            "pbxServerIP": json.meta.pbxServerIP,
            "sipPort": json.cpa.sipPort,
            "phoneLabel": json.cpa.phoneLabel,
            "voipControlPort": json.cpa.voipControlPort,
            "disableSpeaker": json.cpa.disableSpeakerphone,
            "disableSpeakerAndHeadset": json.cpa.disableSpeakerphoneAndHeadset,
            "enableMuteFeature": json.cpa.enableMuteFeature,
            ...phoneSettings,
        }

        //Begin building the XML by looping through each line key

        let currentPhoneLineIndex = 1; //Start at 1, not 0. Tracked seperately from lineNumber const.

        lineData.forEach((line, index) => {
            const lineNumber = index + 1; //Line numbers start at 1, not 0
            switch(line.type) {
                case 1:
                    const case1 = `
                    <line button="${lineNumber}" lineIndex="${currentPhoneLineIndex}">
                        <featureID>9</featureID>
                        <featureLabel></featureLabel>
                        <proxy>USECALLMANAGER</proxy>
                        <port>${json.cpa.sipPort}</port>
                        <name>${line.lineName}</name>
                        <displayName>${line.displayName}</displayName>
                        <autoAnswer>
                            <autoAnswerEnabled>${line.autoAnswer}</autoAnswerEnabled>
                        </autoAnswer>
                        <callWaiting>3</callWaiting>
                        <authName>${line.authname}</authName>
                        <authPassword>${line.authpassword}</authPassword>
                        <contact></contact>
                        <sharedLine>false</sharedLine>
                        <messageWaitingLampPolicy>3</messageWaitingLampPolicy>
                        <messageWaitingAMWI>0</messageWaitingAMWI>
                        <messagesNumber></messagesNumber>
                        <ringSettingIdle>4</ringSettingIdle>
                        <ringSettingActive>5</ringSettingActive>
                        <forwardCallInfoDisplay>
                            <callerName>true</callerName>
                            <callerNumber>true</callerNumber>
                            <redirectedNumber>true</redirectedNumber>
                            <dialedNumber>true</dialedNumber>
                        </forwardCallInfoDisplay>
                        <maxNumCalls>5</maxNumCalls>
                        <busyTrigger>4</busyTrigger>
                        <recordingOption>enable</recordingOption>
                    </line>`;

                    builtLineXML += case1;
                    currentPhoneLineIndex++;

                    break;

                case 2:
                    const case2 = `
                    <line button="${lineNumber}">
                        <featureID>2</featureID>
                        <featureLabel>${line.speedDialName}</featureLabel>
                        <speedDialNumber>${line.speedDialNumber}</speedDialNumber>
                    </line>`;

                    builtLineXML += case2;
                    console.log("Run case 2, appending: \n" + case2 );

                    break;

                case 3:
                    const case3 = `
                    <line button="${lineNumber}">
                        <featureID>20</featureID>
                        <featureLabel>${line.serviceuriName}</featureLabel>
                        <serviceURI>${line.serviceURI}</serviceURI>
                    </line>`;

                    builtLineXML += case3;

                    break;

                case 4:
                    console.log("NOT IMPLEMENTED YET!");
                    break;

                case 5:
                    const case5 = `
                    <line button="${lineNumber}">
                        <featureID>21</featureID>
                        <featureLabel>${line.BLFName}</featureLabel>
                        <featureOptionMask>${line.blfOptionMask}</featureOptionMask>
                        <speedDialNumber>${line.blfExtension}</speedDialNumber>
                    </line>`;

                    builtLineXML += case5;
                    break;

                case 6:
                    const case6 = `
                    <line button="${lineNumber}" lineIndex="${currentPhoneLineIndex}">
                        <featureID>23</featureID>
                        <featureLabel>Intercom</featureLabel>
                        <proxy>USECALLMANAGER</proxy>
                        <port>${line.intercomport}</port>
                        <name>${line.intercomName}</name>
                        <displayName>${line.intercomdisplayname}</displayName>
                        <autoAnswer>
                            <autoAnswerEnabled>${line.intercomautoanswer}</autoAnswerEnabled>
                            <autoAnswerMode>${line.intercomautoAnswerMode}</autoAnswerMode>
                        </autoAnswer>
                        <callWaiting>${line.callWaiting}</callWaiting>
                        <maxNumCalls>${line.maxNumCalls}</maxNumCalls>
                        <busyTrigger>${line.busyTrigger}</busyTrigger>
                    </line>
                    `;
                    currentPhoneLineIndex++;
                    builtLineXML += case6;
                    break;

                case 7:
                    const case7 = `
                    <line button="${lineNumber}">
                        <featureID>27</featureID>
                        <featureLabel>${line.featureLabel}</featureLabel>
                    </line>`;

                    builtLineXML += case7;

                    break;

                case 8:
                    //FeatureID 126
                    const case8 = `
                    <line button="${lineNumber}">
                        <featureID>126</featureID>
                        <featureLabel>${line.featureLabel}</featureLabel>
                    </line>`;
                    builtLineXML += case8;
                    break;

                case 9:
                    //FeatureID 127
                    const case9 = `
                    <line button="${lineNumber}">
                        <featureID>127</featureID>
                        <featureLabel>${line.featureLabel}</featureLabel>
                    </line>`;
                    builtLineXML += case9;

                    break;

                case 10:
                    //FeatureID 128
                    const case10 = `
                    <line button="${lineNumber}">
                        <featureID>128</featureID>
                        <featureLabel>${line.featureLabel}</featureLabel>
                    </line>`;
                    builtLineXML += case10;

                    break;

                case 11:
                    //FeatureID 130
                    const case11 = `
                    <line button="${lineNumber}">
                        <featureID>130</featureID>
                        <featureLabel>${line.featureLabel}</featureLabel>
                    </line>`;
                    builtLineXML += case11;
                    break;

                case 12:
                    //FeatureID 137
                    const case12 = `
                    <line button="${lineNumber}">
                        <featureID>137</featureID>
                        <featureLabel>${line.featureLabel}</featureLabel>
                    </line>`;
                    builtLineXML += case12;

                    break;

                case 13:
                    //FeatureID 139
                    const case13 = `
                    <line button="${lineNumber}">
                        <featureID>139</featureID>
                        <featureLabel>${line.featureLabel}</featureLabel>
                    </line>`;
                    builtLineXML += case13;

                    break;

                case 14:
                    //FeatureID 159
                    const case14 = `
                    <line button="${lineNumber}">
                        <featureID>159</featureID>
                        <featureLabel>${line.featureLabel}</featureLabel>
                    </line>`;
                    builtLineXML += case14;
                    break;

                default:
                    console.log("Unknown Line Key Type: " + line.type);
            }
        });

        //Cleanup builtLineXML by removing any 'undefined' values
        builtLineXML = builtLineXML.replace(/undefined/g, "");

        //Validate the XML Structure with xmlbuilder2. If is is invalid, return an error.
        /* this doesnt work somebody pls fix it
        if(!isXMLString("<sipLines>" + builtLineXML + "</sipLines>")) {
            console.log("Invalid XML Structure");
            res.send({code: 1, message: "Server XML Sequencing Failed."});
            return;
        }
        */

        console.log("Built Line XML: " + builtLineXML);
        


        //Loop through variableAttributeMap. Search for all keys within xmlTemplate and replace them with their values.
        let replaceCount = 0;
        Object.keys(variableAttributeMap).forEach((key) => {
            const placeholder = "<!--" + key + "-->";
            xmlTemplate = xmlTemplate.split(placeholder).join(variableAttributeMap[key] ?? "");
            replaceCount++;
        });

        xmlTemplate = xmlTemplate.split("<!--sipLines-->").join(builtLineXML);
        xmlTemplate = xmlTemplate.replace("<!--DO NOT MODIFY THIS FILE.-->", "<!--This file was automatically generated by CPM. Do not modify it unless you need to. Corrupting this file may cause undesired server operation or crash.-->");

        xmlTemplate = xmlTemplate.split("<!--sharedDeviceSecretID-->").join(process.env.SHARED_DEVICE_SECRET ?? "");
        xmlTemplate = xmlTemplate.split("<!--sharedDeviceSecretPassword-->").join(process.env.SHARED_DEVICE_SECRET ?? "");

        console.log("Postprocess complete, replaced " + replaceCount + " variables (excluding sipLines).");

        console.log("Final XML: " + xmlTemplate);


        let responseMethodText = deviceExists ? "Updated" : "Created";
        createLog(1, `${responseMethodText} new configuration (SEP${json.meta.deviceMAC}.cnf.xml).`);
        console.log(`${responseMethodText} new configuration (SEP${json.meta.deviceMAC}.cnf.xml).`);

        //Save the Cache File
        serverData.save(cache);

        fs.writeFile(path.join(__dirname, `../../data/config/SEP${json.meta.deviceMAC}.cnf.xml`), xmlTemplate, (err) => {
            if(err) {
                console.log("Failed to write SEP.cnf.xml to file. " + err);
                res.send({code: 1, message: "Server failed to write provisioning file."});
                return;
            } else {
                res.send({code: 0, message: "Your data has been saved successfully."});

                //Asynchrously wait 2 seconds, then run serverData.forcePurge(); 
                setTimeout(() => {
                    console.log("New configuration posted by purge");
                    serverData.forcePurge();
                }, 2000);
            }
        });

        


    });
}
