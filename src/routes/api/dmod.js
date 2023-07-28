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

const { parseString } = require('xml2js'); // Built-in module for XML parsing
const { response } = require('express');
const fs = require('fs');

function isXMLString(str) {
  // Attempt to parse the XML string
  try {
    parseString(str, (err, result) => {
      if (err) {
        throw err;
      }
      // The XML string is valid
      return true;
    });
  } catch (error) {
    // The XML string is invalid
    return false;
  }
}
module.exports = function(app) {
    app.post('/api/createModifyDevice', (req, res) => {

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
            cache.devices[deviceIndex].security.ipRestricted = json.security.ipSecurity;
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
            });
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

        let builtLineXML; //Will be processed from lineData

        //Read template.xml file in current directory
        const path = require('path');
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
            xmlTemplate = xmlTemplate.replace("<!--" + key + "-->", variableAttributeMap[key]);
            replaceCount++;
        });

        xmlTemplate = xmlTemplate.replace("<!--sipLines-->", builtLineXML);
        xmlTemplate = xmlTemplate.replace("<!--DO NOT MODIFY THIS FILE.-->", "<!--This file was automatically generated by CPM. Do not modify it unless you need to. Corrupting this file may cause undesired server operation or crash.-->");

        xmlTemplate = xmlTemplate.replace("<!--sharedDeviceSecretID-->", process.env.SHARED_DEVICE_SECRET);
        xmlTemplate = xmlTemplate.replace("<!--sharedDeviceSecretPassword-->", process.env.SHARED_DEVICE_SECRET);

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