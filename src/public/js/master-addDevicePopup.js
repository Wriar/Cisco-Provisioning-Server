const lineKeyCount = 6;

function handleUUIDGenCBState(cb) {
    if (cb.checked) {
        document.getElementById("deviceUUID").value = generateUUID();
        document.getElementById("deviceUUID").disabled = true;
    } else {
        document.getElementById("deviceUUID").value = "";
        document.getElementById("deviceUUID").disabled = false;
    }
}


function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if (d > 0) {//Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

//Listen if ipRestriction checkbox is changed. If it is,  enable/disable ipRestrictionRangeStart and ipRestrictionRangeEnd
function handleIPRestrictionCBState(cb) {
    if (cb.checked) {
        document.getElementById("ipRestrictionRangeStart").disabled = false;
        document.getElementById("ipRestrictionRangeEnd").disabled = false;
    } else {
        document.getElementById("ipRestrictionRangeStart").disabled = true;
        document.getElementById("ipRestrictionRangeEnd").disabled = true;
    }
}

function doSubmit(after) {
    /*
    Device Metadata Configurations
    */

    const deviceUUID = document.getElementById("deviceUUID").value;
    const deviceName = document.getElementById("deviceName").value;
    const deviceDescription = document.getElementById("deviceDescription").value;
    const deviceExtension = document.getElementById("deviceExtension").value;
    const deviceMAC = document.getElementById("deviceMAC").value;
    const pbxServerIP = document.getElementById("pbxServerIP").value;

    /*
    Common Provisioning Attributes
    */

    const dateTemplate = document.getElementById("dateTemplate").value;
    const timeZone = document.getElementById("timeZone").value;
    const ntpName = document.getElementById("ntpName").value;
    //NTP Mode is <select> 
    const ntpMode = document.getElementById("ntpMode").value;
    const sipPort = document.getElementById("sipPort").value;
    const phoneLabel = document.getElementById("phoneLabel").value;
    const disableSpeakerphone = document.getElementById("disableSpeakerphone").value;
    const disableSpeakerphoneAndHeadset = document.getElementById("disableSpeakerphoneAndHeadset").value;
    const enableMuteFeature = document.getElementById("enableMuteFeature").value;
    const voipControlPort = document.getElementById("voipControlPort").value;

    const deviceModel = document.getElementById("deviceModel").value;
    const deviceGroups = document.getElementById("deviceGroups").value;
    const deviceIP = document.getElementById("deviceIP").value;

    /*
    Security Settings
    */
    const ipRestriction = document.getElementById("ipRestriction").checked;
    const ipRestrictionRangeStart = document.getElementById("ipRestrictionRangeStart").value;
    const ipRestrictionRangeEnd = document.getElementById("ipRestrictionRangeEnd").value;
    const enableDevice = document.getElementById("enableDevice").checked;

    /**
     * Retrieve Line Key Values
     */
    let totalLineKeys = [];

    for (let i = 1; i <= lineKeyCount; i++) {
        if (document.getElementById(`line${i}_s`).value != 0) {
            totalLineKeys.push(i);
        } 
    }

    //There must be at least one line key
    if (totalLineKeys.length == 0) {
        alertHandle("Please add at least one line key.");
        return;
    }

    let lineKeyJSONConstruction = {};

    //Loop through each line key and retrieve values
    totalLineKeys.forEach((lineKey) => {
        const type = parseInt(document.getElementById(`line${lineKey}_s`).value);
        
        switch (type) {
            case 1:
                //New Account Line
                const lineName = document.getElementById(`lineName_${lineKey}`).value;
                const displayName = document.getElementById(`displayName_${lineKey}`).value;
                const autoAnswer = document.getElementById(`autoAnswer_${lineKey}`).checked ? 1 : 0;
                const authname = document.getElementById(`authName_${lineKey}`).value;
                const authpassword = document.getElementById(`authPassword_${lineKey}`).value;

                //alert(`lineName: ${lineName}\ndisplayName: ${displayName}\nautoAnswer: ${autoAnswer}\nauthname: ${authname}\nauthpassword: ${authpassword}`);

                lineKeyJSONConstruction[lineKey] = {
                    "type": type,
                    "lineName": lineName,
                    "displayName": displayName,
                    "autoAnswer": autoAnswer,
                    "authname": authname,
                    "authpassword": authpassword
                };

                break;
            case 2:
                //Speeddial
                const speedDialName = document.getElementById(`linename_${lineKey}`).value;
                const speedDialNumber = document.getElementById(`speeddial_${lineKey}`).value;

                lineKeyJSONConstruction[lineKey] = {
                    "type": type,
                    "speedDialName": speedDialName,
                    "speedDialNumber": speedDialNumber
                };


                break;
            case 3:
                //Service URI
                const serviceuriName = document.getElementById(`linename_${lineKey}`).value;
                const serviceURI = document.getElementById(`serviceuri_${lineKey}`).value;

                lineKeyJSONConstruction[lineKey] = {
                    "type": type,
                    "serviceuriName": serviceuriName,
                    "serviceURI": serviceURI
                };

                break;
            case 4:
                //CPM Embedded Service
                alert("Not Implemented");

                break;
            case 5:
                //BLF Speed Dial
                const BLFName = document.getElementById(`linename_${lineKey}`).value;
                const blfOptionMask = document.getElementById(`blfOptionMask_${lineKey}`).value;
                const blfExtesion = document.getElementById(`blf_${lineKey}`).value;

                lineKeyJSONConstruction[lineKey] = {
                    "type": type,
                    "BLFName": BLFName,
                    "blfOptionMask": blfOptionMask,
                    "blfExtension": blfExtesion
                };


                break;
            case 6:
                //Intercom

                const intercomName = document.getElementById(`linename_${lineKey}`).value;
                const intercomport = document.getElementById(`intercomport_${lineKey}`).value;
                const intercomdisplayname = document.getElementById(`intercomdisplayname_${lineKey}`).value;
                const intercomautoanswer = document.getElementById(`intercomautoanswer_${lineKey}`).value;
                const intercomautoAnswerMode = document.getElementById(`intercomautoAnswerMode_${lineKey}`).value;
                const callWaiting = document.getElementById(`callWaiting_${lineKey}`).value;
                const maxNumCalls = document.getElementById(`maxNumCalls_${lineKey}`).value;
                const busyTrigger = document.getElementById(`busyTrigger_${lineKey}`).value;

                lineKeyJSONConstruction[lineKey] = {
                    "type": type,
                    "intercomName": intercomName,
                    "intercomport": intercomport,
                    "intercomdisplayname": intercomdisplayname,
                    "intercomautoanswer": intercomautoanswer,
                    "intercomautoAnswerMode": intercomautoAnswerMode,
                    "callWaiting": callWaiting,
                    "maxNumCalls": maxNumCalls,
                    "busyTrigger": busyTrigger
                };

                break;
            case 7:
                //Malicious Call

                const maliciousName = document.getElementById(`linename_${lineKey}`).value;
                
                lineKeyJSONConstruction[lineKey] = {
                    "type": type,
                    "featureLabel": maliciousName
                };

                break;
            case 8:
                //Park
                const parkName = document.getElementById(`linename_${lineKey}`).value;
                lineKeyJSONConstruction[lineKey] = {
                    "type": type,
                    "featureLabel": parkName
                };

                break;
            case 9:
                //Call Pickup
                const callPickupName = document.getElementById(`linename_${lineKey}`).value;
                lineKeyJSONConstruction[lineKey] = {
                    "type": type,
                    "featureLabel": callPickupName
                };

                break;
            case 10:
                //Group Pickup
                const groupPickupName = document.getElementById(`linename_${lineKey}`).value;
                lineKeyJSONConstruction[lineKey] = {
                    "type": type,
                    "featureLabel": groupPickupName
                };

                break;
            case 11:
                //DND
                const dndName = document.getElementById(`linename_${lineKey}`).value;
                lineKeyJSONConstruction[lineKey] = {
                    "type": type,
                    "featureLabel": dndName
                };
                break;

            case 12:
                //New Call
                const newCallName = document.getElementById(`linename_${lineKey}`).value;
                lineKeyJSONConstruction[lineKey] = {
                    "type": type,
                    "featureLabel": newCallName
                };


                break;
            case 13:
                //Hunt group login/logout
                const huntGroupLoginName = document.getElementById(`linename_${lineKey}`).value;
                lineKeyJSONConstruction[lineKey] = {
                    "type": type,
                    "featureLabel": huntGroupLoginName
                };

                break;
            case 14:
                //Record Call
                const recordCallName = document.getElementById(`linename_${lineKey}`).value;
                lineKeyJSONConstruction[lineKey] = {
                    "type": type,
                    "featureLabel": recordCallName
                };

                break;
            default:
                //Do nothing
                alertHandle("Invalid Line Key Type");
                return;
        }
    });

    console.log("BEGIN LINE KEY JSON CONSTRUCTION");
    console.log(lineKeyJSONConstruction);

    let xhrDataPacket = {
        "meta": {
            deviceUUID: deviceUUID,
            deviceName: deviceName,
            deviceDescription: deviceDescription,
            deviceExtension: deviceExtension,
            deviceMAC: deviceMAC,
            pbxServerIP: pbxServerIP,
        },
        "cpa": {
            dateTemplate: dateTemplate,
            timeZone: timeZone,
            ntpName: ntpName,
            ntpMode: ntpMode,
            sipPort: sipPort,
            phoneLabel: phoneLabel,
            disableSpeakerphone: disableSpeakerphone,
            disableSpeakerphoneAndHeadset: disableSpeakerphoneAndHeadset,
            enableMuteFeature: enableMuteFeature,
            voipControlPort: voipControlPort
        },
        "cust": {
            deviceModel: deviceModel,
            deviceGroups: deviceGroups,
            deviceIP: deviceIP,
        },
        "security": {
            ipRestriction: ipRestriction,
            ipRestrictionRangeStart: ipRestrictionRangeStart,
            ipRestrictionRangeEnd: ipRestrictionRangeEnd,
            enableDevice: enableDevice,
        },
        "lineKeys": lineKeyJSONConstruction
    }
    console.log("SENDING:");
    console.log(xhrDataPacket);

    let xhr = new XMLHttpRequest(); //POST
    xhr.open("POST", "/api/createModifyDevice", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    //Send xhrDataPacket as Property called 'data'
    xhr.send(JSON.stringify({ data: xhrDataPacket }));

    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            // Request finished. Do processing here.
            console.log(this.responseText);
            alertHandle(JSON.parse(this.responseText).message, 0);



            if(document.getElementById('dstatus-fresh').style.display == "block") {
                document.getElementById('dstatus-fresh').style.display = "none";
                //Show dstatus-new
                document.getElementById('dstatus-new').style.display = "block";
            }else if (document.getElementById('dstatus-ready').style.display == "block") {
                //Show dstatus-readynew
                document.getElementById('dstatus-readynew').style.display = "block";
                document.getElementById('dstatus-ready').style.display = "none";
            }

            
            if (document.getElementById('cb_remainOnPage').checked != true) {
                hideAllFieldsets();
                //Scroll to top of page
                window.scrollTo(0, 0);
                document.getElementById('fieldset-info').style.display = "block";

            }
            
            
        }
    };
}

let pState = null;

function showAllFieldsets() {
    document.getElementById('lineKeyFieldset').style.opacity = "100";
    document.getElementById('cpaFieldset').style.display = "block";
    document.getElementById('propFielset').style.display = "block";
    document.getElementById('securityFieldset').style.display = "block";
    document.getElementById('actionFieldset').style.display = "block";
    document.getElementById('deviceinfoFieldset').style.display = "block";
}

function hideAllFieldsets() {
    document.getElementById('lineKeyFieldset').style.opacity = "0";
    document.getElementById('cpaFieldset').style.display = "none";
    document.getElementById('propFielset').style.display = "none";
    document.getElementById('securityFieldset').style.display = "none";
    document.getElementById('actionFieldset').style.display = "none";
    document.getElementById('deviceinfoFieldset').style.display = "none";
    document.getElementById('fieldset-info').style.display = "none";
}

hideAllFieldsets();
function readPageQueryState() {
    //Read the GET url parameters into a dictionary
    let urlParams = new URLSearchParams(window.location.search);
    let additionStatus = urlParams.get('astat'); //Whether to add or modify a device
    pState = additionStatus;

    if (additionStatus == "mod") {
        const deviceUUID = urlParams.get('data'); //Get the device UUID

        //Create XMLHTTPRequest to get device data
        let xhr = new XMLHttpRequest(); //GET
        xhr.open("GET", `/api/getProvisionedDeviceData?deviceUUID=${deviceUUID}`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();

        console.log(`[${new Date().toISOString()}] Preload data package sent to server.`);

        xhr.onreadystatechange = function () {
            if(xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 404) {
                    document.getElementById('dstatus-error').style.display = "block";
                    document.getElementById('dstatus-error').innerHTML = document.getElementById('dstatus-error').innerHTML.replace("<!--CONTEXT-->", `Device with UUID ${deviceUUID} was not found.`);
                    document.getElementById('dstatus-wait').style.display = "none";
                    return;
                }
                const response = JSON.parse(xhr.responseText);

                if (response.code != 0) {
                    console.error("Error code returned from server.");
                    document.getElementById('dstatus-error').style.display = "block";
                    document.getElementById('dstatus-error').innerHTML = document.getElementById('dstatus-error').innerHTML.replace("<!--CONTEXT-->", `Could not load device due to Server Parser Error (2)`);
                    document.getElementById('dstatus-wait').style.display = "none";
                }
                console.log(response);
                //console.log(JSON.stringify(response));
                console.log(parseResponseDoc(response.provision));
                console.log(parseResponseDoc(response.provision).sipLines);
                console.log(JSON.stringify(parseResponseDoc(response.provision).sipLines));


                console.log(`[${new Date().toISOString()}] Retrived existing configuration.`);

                //Run after 1s
                setTimeout(function () {
                    if(reimportDevice(parseResponseDoc(response.provision), response.config)) {
                        showAllFieldsets();
                        document.getElementById('dstatus-wait').style.display = "none";
                        console.log(`[${new Date().toISOString()}] Loaded existing configuration`);
                    }
                }, 500);
            }
        }


    } else {
        //Create a new device

        //Look inside fieldset-status. Set every single <p> element to display:none;
        document.getElementById("fieldset-status").querySelectorAll("p").forEach(function (element) {
            element.style.display = "none";
        });

        document.getElementById('dstatus-fresh').style.display = "block";
        showAllFieldsets();
    }

}

/**
 * Provides a way to parse the JSON response of the provisioning file into a map
 * @param {JSON} responseJSONObject Raw JSON response of the provisioning file
 * @returns {Map} Map of all the items to the corresponding line name
 */
function parseResponseDoc(responseJSONObject) {
    try {

    
    // Extracting 'sipLines'
    const sipLines = responseJSONObject.device.sipProfile[0].sipLines;

    // Date Stuff
    const dateTemplate = responseJSONObject.device.devicePool[0].dateTimeSetting[0].dateTemplate[0];
    const timeZone = responseJSONObject.device.devicePool[0].dateTimeSetting[0].timeZone[0];

    const ntpName = responseJSONObject.device.devicePool[0].dateTimeSetting[0].ntps[0].ntp[0].name[0];
    const ntpMode = responseJSONObject.device.devicePool[0].dateTimeSetting[0].ntps[0].ntp[0].ntpMode[0];

    //server things
    const processNodeName = responseJSONObject.device.devicePool[0].callManagerGroup[0].members[0].member[0].callManager[0].processNodeName[0];
    const sipPort = responseJSONObject.device.devicePool[0].callManagerGroup[0].members[0].member[0].callManager[0].ports[0].sipPort[0];

    //Additional metadata
    const phoneLabel = responseJSONObject.device.sipProfile[0].phoneLabel[0];
    const voipControlPort = responseJSONObject.device.sipProfile[0].voipControlPort[0];
    const disableSpeaker = responseJSONObject.device.vendorConfig[0].disableSpeaker[0];
    const disableSpeakerAndHeadset = responseJSONObject.device.vendorConfig[0].disableSpeakerAndHeadset[0];
    const enableMuteFeature = responseJSONObject.device.vendorConfig[0].enableMuteFeature[0];

    //console.log(JSON.stringify(sipLines));

    return {
        sipLines,
        dateTemplate,
        timeZone,
        ntpName,
        ntpMode,
        processNodeName,
        sipPort,
        phoneLabel,
        voipControlPort,
        disableSpeaker,
        disableSpeakerAndHeadset,
        enableMuteFeature,
      };
    } catch (e) {
        console.error(e);
        document.getElementById('dstatus-error').style.display = "block";
        document.getElementById('dstatus-error').innerHTML = document.getElementById('dstatus-error').innerHTML.replace("<!--CONTEXT-->", `Could not load device. Verify that configuration is not corrupt (ERR-JPARSER-1).`);
        document.getElementById('dstatus-wait').style.display = "none";
        return;
    }

}

function setPillRegistered(buttonIndex) {
    document.getElementById(`line${buttonIndex}_p`).setAttribute('data-after-text', "PROVISIONED");
    document.getElementById(`line${buttonIndex}_p`).setAttribute('data-after-type', "green-pill");
    document.getElementById(`line${buttonIndex}_p`).getElementsByTagName('span')[0].innerHTML = 'Provisioned';
}

/**
 * Given a map of device data, reimport the device into the UI and disables the loading status
 * @param {Map} deviceDataMap Device data map returned by the parseResponseDOC function
 * @param {JSON} deviceConfigData Device configuration data
 */
function reimportDevice(deviceDataMap, deviceConfigData) {

    const dateTemplate = deviceDataMap.dateTemplate;
    const timeZone = deviceDataMap.timeZone;
    const ntpName = deviceDataMap.ntpName;
    const ntpMode = deviceDataMap.ntpMode;
    const processNodeName = deviceDataMap.processNodeName;
    const sipPort = deviceDataMap.sipPort;
    const phoneLabel = deviceDataMap.phoneLabel;
    const voipControlPort = deviceDataMap.voipControlPort;
    const disableSpeaker = deviceDataMap.disableSpeaker;
    const disableSpeakerAndHeadset = deviceDataMap.disableSpeakerAndHeadset;
    const enableMuteFeature = deviceDataMap.enableMuteFeature;
    const deviceIP = deviceConfigData.ip;

    document.getElementById('deviceUUID').value = deviceConfigData.uuid;
    document.getElementById('deviceName').value = deviceConfigData.name;
    document.getElementById('deviceDescription').value = deviceConfigData.description;
    document.getElementById('deviceExtension').value = deviceConfigData.extension;
    document.getElementById('deviceMAC').value = deviceConfigData.mac;
    document.getElementById('pbxServerIP').value = processNodeName;

    document.getElementById('dateTemplate').value = dateTemplate;
    document.getElementById('timeZone').value = timeZone;
    document.getElementById('ntpName').value = ntpName;

    document.getElementById('ntpMode').value = ntpMode;
    document.getElementById('sipPort').value = sipPort;
    document.getElementById('phoneLabel').value = phoneLabel;
    document.getElementById('disableSpeakerphone').value = disableSpeaker.toString();
    document.getElementById('disableSpeakerphoneAndHeadset').value = disableSpeakerAndHeadset.toString();
    document.getElementById('enableMuteFeature').value = enableMuteFeature.toString();

    document.getElementById('deviceIP').value = deviceIP;

    document.getElementById('voipControlPort').value = voipControlPort;

    //Loop through the 'deviceModel' select and find the option that matches the deviceConfigData.model
    for (let i = 0; i < document.getElementById('deviceModel').options.length; i++) {
        if (document.getElementById('deviceModel').options[i].innerText === deviceConfigData.model) {
            document.getElementById('deviceModel').selectedIndex = i;
            break;
        }
    }

    document.getElementById('deviceGroups').value = deviceConfigData.groups;

    //If deviceConfigData.security.ipRestricted = true, the check ipRestriction checkbox by clickign it
    if (deviceConfigData.security.ipRestricted) {
        //Clear the state of the checkbox
        document.getElementById('ipRestriction').checked = false;
        document.getElementById('ipRestriction').click();

        document.getElementById('ipRestrictionRangeStart').value = deviceConfigData.security.ipWhitelist[0];
        document.getElementById('ipRestrictionRangeEnd').value = deviceConfigData.security.ipWhitelist[1];
    }

    //Check enableDevice if enabled = true. Uncheck it if its not
    document.getElementById('enableDevice').checked = true;
    if (deviceConfigData.enabled === false) {
        document.getElementById('enableDevice').checked = false;
    }

    let sipLines = deviceDataMap.sipLines[0].line; //Array of sipLines

    sipLines.forEach((sipLine, index) => {
        const lineManifest = sipLine.$;
        const buttonIndex = lineManifest.button;
        const featureID = parseInt(sipLine.featureID[0]);

        switch(featureID) {
            case 9:
                //Line
                const lineName = sipLine.name[0];
                const displayName = sipLine.displayName[0];
                const authName = sipLine.authName[0];
                const authPassword = sipLine.authPassword[0];
                const autoAnswer = sipLine.autoAnswer[0].autoAnswerEnabled[0];

                updateLineIcon(buttonIndex, '1');
                document.getElementById(`line${buttonIndex}_s`).value = 1;
                document.getElementById(`line${buttonIndex}_d`).innerHTML = returnDropdownData(1, buttonIndex, [lineName, displayName, autoAnswer, authName, authPassword]);

                setPillRegistered(buttonIndex);
                break;
            case 2:
                //Speeddial
                const speedDialName = sipLine.featureLabel[0];
                const speedDialNumber = sipLine.speedDialNumber[0];

                updateLineIcon(buttonIndex, '2');
                document.getElementById(`line${buttonIndex}_s`).value = 2;
                document.getElementById(`line${buttonIndex}_d`).innerHTML = returnDropdownData(2, buttonIndex, [speedDialName, speedDialNumber]);
                
                setPillRegistered(buttonIndex);
                break;
            case 20:
                //ServiceURI
                const serviceuriName = sipLine.featureLabel[0];
                const serviceURI = sipLine.serviceURI[0];

                updateLineIcon(buttonIndex, '3');
                document.getElementById(`line${buttonIndex}_s`).value = 3;
                document.getElementById(`line${buttonIndex}_d`).innerHTML = returnDropdownData(3, buttonIndex, [serviceuriName, serviceURI]);
                
                setPillRegistered(buttonIndex);
                break;
            case 21:
                //BLF
                const BLFName = sipLine.featureLabel[0];
                const blfOptionMask = sipLine.featureOptionMask[0];
                const speedDialNumber_2 = sipLine.speedDialNumber[0];

                updateLineIcon(buttonIndex, '5');
                document.getElementById(`line${buttonIndex}_s`).value = 5;
                document.getElementById(`line${buttonIndex}_d`).innerHTML = returnDropdownData(5, buttonIndex, [BLFName, blfOptionMask, speedDialNumber_2]);

                setPillRegistered(buttonIndex);
                break;
            case 23:
                //Intercom
                const featureLabel = sipLine.featureLabel[0];
                const port = sipLine.port[0];
                const intercomName = sipLine.name[0];
                const intercomdisplayName = sipLine.displayName[0];
                const intercomautoAnswerEnabled = sipLine.autoAnswer[0].autoAnswerEnabled[0];
                const intercomautoAnswerMode = sipLine.autoAnswer[0].autoAnswerMode[0];
                const callWaiting = sipLine.callWaiting[0];
                const maxNumCalls = sipLine.maxNumCalls[0];
                const busyTrigger = sipLine.busyTrigger[0];

                updateLineIcon(buttonIndex, '6');
                document.getElementById(`line${buttonIndex}_s`).value = 6;
                document.getElementById(`line${buttonIndex}_d`).innerHTML = returnDropdownData(6, buttonIndex, [featureLabel, port, intercomName, intercomautoAnswerEnabled, intercomautoAnswerMode, callWaiting, maxNumCalls, busyTrigger]);
                
                setPillRegistered(buttonIndex);
                break;
            case 27:
                //malicious call
                const malicious_featureLabel = sipLine.featureLabel[0];

                updateLineIcon(buttonIndex, '7');
                document.getElementById(`line${buttonIndex}_s`).value = 7;
                document.getElementById(`line${buttonIndex}_d`).innerHTML = returnDropdownData(7, buttonIndex, [malicious_featureLabel]);
                
                setPillRegistered(buttonIndex);
                break;
            case 126:
                //Park
                const park_featureLabel = sipLine.featureLabel[0];

                updateLineIcon(buttonIndex, '8');
                document.getElementById(`line${buttonIndex}_s`).value = 8;
                document.getElementById(`line${buttonIndex}_d`).innerHTML = returnDropdownData(8, buttonIndex, [park_featureLabel]);
                
                setPillRegistered(buttonIndex);
                break;
            case 127:
                //Call Pickup
                const callPickup_featureLabel = sipLine.featureLabel[0];

                updateLineIcon(buttonIndex, '9');
                document.getElementById(`line${buttonIndex}_s`).value = 9;
                document.getElementById(`line${buttonIndex}_d`).innerHTML = returnDropdownData(9, buttonIndex, [callPickup_featureLabel]);
                
                setPillRegistered(buttonIndex);
                break;
            case 128:
                //Group Pickup
                const groupPickup_featureLabel = sipLine.featureLabel[0];

                updateLineIcon(buttonIndex, '10');
                document.getElementById(`line${buttonIndex}_s`).value = 10;
                document.getElementById(`line${buttonIndex}_d`).innerHTML = returnDropdownData(10, buttonIndex, [groupPickup_featureLabel]);
                
                setPillRegistered(buttonIndex);
                break;
            case 130:
                //DND
                const dnd_featureLabel = sipLine.featureLabel[0];

                updateLineIcon(buttonIndex, '11');
                document.getElementById(`line${buttonIndex}_s`).value = 11;
                document.getElementById(`line${buttonIndex}_d`).innerHTML = returnDropdownData(11, buttonIndex, [dnd_featureLabel]);
                
                setPillRegistered(buttonIndex);
                break;
            case 137:
                //New Call
                const newCall_featureLabel = sipLine.featureLabel[0];

                updateLineIcon(buttonIndex, '12');
                document.getElementById(`line${buttonIndex}_s`).value = 12;
                document.getElementById(`line${buttonIndex}_d`).innerHTML = returnDropdownData(12, buttonIndex, [newCall_featureLabel]);
                
                setPillRegistered(buttonIndex);
                break;
            case 139:
                //Hunt group login/logout
                const huntGroup_featureLabel = sipLine.featureLabel[0];

                updateLineIcon(buttonIndex, '13');
                document.getElementById(`line${buttonIndex}_s`).value = 13;
                document.getElementById(`line${buttonIndex}_d`).innerHTML = returnDropdownData(13, buttonIndex, [huntGroup_featureLabel]);
                
                setPillRegistered(buttonIndex);
                break;
            case 159:
                //Record call
                const recordCall_featureLabel = sipLine.featureLabel[0];

                updateLineIcon(buttonIndex, '14');
                document.getElementById(`line${buttonIndex}_s`).value = 14;
                document.getElementById(`line${buttonIndex}_d`).innerHTML = returnDropdownData(14, buttonIndex, [recordCall_featureLabel]);
                
                setPillRegistered(buttonIndex);
                break;
            default:
                //Unknown featureID
                console.error("Unknown featureID: " + featureID);
                document.getElementById('dstatus-wait').style.display = 'none';
                return;
                break;

        }

        
    });


    //Change the banner text to the appropriate value of the device STATUS

    /* This logic flow is very goofy but it works so dont change it thx */
    let createdAtDate = new Date(deviceConfigData.createdAt);
    if (deviceConfigData.lastPing.toLowerCase() == "never") {
        document.getElementById('dstatus-new').style.display = 'block';
    } else if (deviceConfigData.enabled == false) {
        document.getElementById('dstatus-disabled').style.display = 'block';
    } else {
        let lastPingDate = new Date(deviceConfigData.lastPing);
        if (createdAtDate > lastPingDate) {
            document.getElementById('dstatus-readynew').style.display = 'block';
        } else {
            document.getElementById('dstatus-ready').style.display = 'block';
        }
    }

    return true;
}

/**
 * Provides a way to identify the type of device by feature ID
 * @param {String} deviceContext Raw Device Data
 */
function deviceXMLTypeIdentifier(deviceContext) {
    
}
//Run readPageQueryState() when DOM loaded
document.addEventListener('DOMContentLoaded', readPageQueryState);




/**
 * lazy
 */
function alertHandle(message, code = 1) {
    createToast(code, message);
}

//Bind event listeners to the checkboxes
document.getElementById("ipRestriction").addEventListener("change", function () { handleIPRestrictionCBState (this); });