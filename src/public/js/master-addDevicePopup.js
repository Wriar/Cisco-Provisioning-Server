const lineKeyCount = 6;
const boolOptions = [
    { value: "true", label: "Enabled" },
    { value: "false", label: "Disabled" }
];
const binaryOptions = [
    { value: "1", label: "Enabled" },
    { value: "0", label: "Disabled" }
];
const offOnOptions = [
    { value: "0", label: "Disabled" },
    { value: "1", label: "Enabled" }
];
const phoneSettingsSchema = [
    {
        title: "Display & Wallpaper",
        open: true,
        settings: [
            { id: "defaultWallpaperFile", label: "Default wallpaper", tag: "defaultWallpaperFile", path: ["device", "vendorConfig", 0, "defaultWallpaperFile", 0], type: "text", placeholder: "Desktops/800x480x24/wallpaper.png", help: "Path to the wallpaper file the phone should use by default." },
            { id: "backgroundImageAccess", label: "Allow wallpaper picker", tag: "backgroundImageAccess", path: ["device", "commonProfile", 0, "backgroundImageAccess", 0], options: boolOptions },
            { id: "displayOnTime", label: "Display on time", tag: "displayOnTime", path: ["device", "vendorConfig", 0, "displayOnTime", 0], type: "text", placeholder: "08:00" },
            { id: "displayOnDuration", label: "Display on duration", tag: "displayOnDuration", path: ["device", "vendorConfig", 0, "displayOnDuration", 0], type: "text", placeholder: "10:00" },
            { id: "displayIdleTimeout", label: "Display idle timeout", tag: "displayIdleTimeout", path: ["device", "vendorConfig", 0, "displayIdleTimeout", 0], type: "text", placeholder: "00:10" },
            { id: "displayOnWhenIncomingCall", label: "Wake display for incoming call", tag: "displayOnWhenIncomingCall", path: ["device", "vendorConfig", 0, "displayOnWhenIncomingCall", 0], options: binaryOptions },
            { id: "displayRefreshRate", label: "Display refresh rate", tag: "displayRefreshRate", path: ["device", "vendorConfig", 0, "displayRefreshRate", 0], type: "number" },
            { id: "daysDisplayNotActive", label: "Display inactive days", tag: "daysDisplayNotActive", path: ["device", "vendorConfig", 0, "daysDisplayNotActive", 0], type: "text", placeholder: "1,7" },
            { id: "backlightOnTime", label: "Backlight on time", tag: "backlightOnTime", path: ["device", "vendorConfig", 0, "backlightOnTime", 0], type: "text", placeholder: "08:00" },
            { id: "backlightOnDuration", label: "Backlight on duration", tag: "backlightOnDuration", path: ["device", "vendorConfig", 0, "backlightOnDuration", 0], type: "text", placeholder: "10:00" },
            { id: "backlightIdleTimeout", label: "Backlight idle timeout", tag: "backlightIdleTimeout", path: ["device", "vendorConfig", 0, "backlightIdleTimeout", 0], type: "text", placeholder: "00:10" },
            { id: "backlightOnWhenIncomingCall", label: "Wake backlight for incoming call", tag: "backlightOnWhenIncomingCall", path: ["device", "vendorConfig", 0, "backlightOnWhenIncomingCall", 0], options: binaryOptions },
            { id: "daysBacklightNotActive", label: "Backlight inactive days", tag: "daysBacklightNotActive", path: ["device", "vendorConfig", 0, "daysBacklightNotActive", 0], type: "text", placeholder: "1,7" },
            { id: "homeScreen", label: "Home screen mode", tag: "homeScreen", path: ["device", "vendorConfig", 0, "homeScreen", 0], type: "number" },
            { id: "phonePersonalization", label: "Phone personalization", tag: "phonePersonalization", path: ["device", "phonePersonalization", 0], options: binaryOptions }
        ]
    },
    {
        title: "Local Access & Security",
        open: false,
        settings: [
            { id: "settingsAccess", label: "Settings menu access", tag: "settingsAccess", path: ["device", "vendorConfig", 0, "settingsAccess", 0], options: binaryOptions },
            { id: "webAccess", label: "Phone web UI", tag: "webAccess", path: ["device", "vendorConfig", 0, "webAccess", 0], options: offOnOptions },
            { id: "webAdmin", label: "Web admin", tag: "webAdmin", path: ["device", "vendorConfig", 0, "webAdmin", 0], options: binaryOptions },
            { id: "webProtocol", label: "Web protocol", tag: "webProtocol", path: ["device", "vendorConfig", 0, "webProtocol", 0], options: [{ value: "0", label: "HTTP" }, { value: "1", label: "HTTPS" }] },
            { id: "adminPassword", label: "Local admin password", tag: "adminPassword", path: ["device", "vendorConfig", 0, "adminPassword", 0], type: "text" },
            { id: "sshAccess", label: "SSH access", tag: "sshAccess", path: ["device", "vendorConfig", 0, "sshAccess", 0], options: offOnOptions },
            { id: "phonePassword", label: "Phone unlock password", tag: "phonePassword", path: ["device", "commonProfile", 0, "phonePassword", 0], type: "text" },
            { id: "deviceSecurityMode", label: "Device security mode", tag: "deviceSecurityMode", path: ["device", "deviceSecurityMode", 0], type: "number" },
            { id: "encrConfig", label: "Encrypted config", tag: "encrConfig", path: ["device", "encrConfig", 0], options: boolOptions },
            { id: "certHash", label: "Certificate hash", tag: "certHash", path: ["device", "certHash", 0], type: "text" },
            { id: "capfAuthMode", label: "CAPF auth mode", tag: "capfAuthMode", path: ["device", "capfAuthMode", 0], type: "number" },
            { id: "userId", label: "User ID", tag: "userId", path: ["device", "userId", 0], type: "text" },
            { id: "ownerId", label: "Owner ID", tag: "ownerId", path: ["device", "ownerId", 0], type: "text" }
        ]
    },
    {
        title: "Hardware & Ports",
        open: false,
        settings: [
            { id: "pcPort", label: "PC port", tag: "pcPort", path: ["device", "vendorConfig", 0, "pcPort", 0], options: offOnOptions },
            { id: "spanToPCPort", label: "Span voice traffic to PC port", tag: "spanToPCPort", path: ["device", "vendorConfig", 0, "spanToPCPort", 0], options: binaryOptions },
            { id: "usb1", label: "USB port 1", tag: "usb1", path: ["device", "vendorConfig", 0, "usb1", 0], options: binaryOptions },
            { id: "usb2", label: "USB port 2", tag: "usb2", path: ["device", "vendorConfig", 0, "usb2", 0], options: binaryOptions },
            { id: "usbClasses", label: "USB classes", tag: "usbClasses", path: ["device", "vendorConfig", 0, "usbClasses", 0], type: "text", placeholder: "0,1,2" },
            { id: "bluetooth", label: "Bluetooth", tag: "bluetooth", path: ["device", "vendorConfig", 0, "bluetooth", 0], options: binaryOptions },
            { id: "bluetoothProfile", label: "Bluetooth profiles", tag: "bluetoothProfile", path: ["device", "vendorConfig", 0, "bluetoothProfile", 0], type: "text", placeholder: "0,1" },
            { id: "btpbap", label: "Bluetooth phone book access", tag: "btpbap", path: ["device", "vendorConfig", 0, "btpbap", 0], options: offOnOptions },
            { id: "bthfu", label: "Bluetooth hands-free upgrade", tag: "bthfu", path: ["device", "vendorConfig", 0, "bthfu", 0], options: offOnOptions },
            { id: "wifi", label: "Wi-Fi", tag: "wifi", path: ["device", "vendorConfig", 0, "wifi", 0], options: binaryOptions },
            { id: "scanningMode", label: "Wi-Fi scanning mode", tag: "scanningMode", path: ["device", "vendorConfig", 0, "scanningMode", 0], type: "number" },
            { id: "ehookEnable", label: "Electronic hookswitch", tag: "ehookEnable", path: ["device", "vendorConfig", 0, "ehookEnable", 0], options: offOnOptions },
            { id: "ciscoCamera", label: "Cisco camera", tag: "ciscoCamera", path: ["device", "vendorConfig", 0, "ciscoCamera", 0], options: binaryOptions },
            { id: "sdio", label: "SDIO", tag: "sdio", path: ["device", "vendorConfig", 0, "sdio", 0], options: binaryOptions },
            { id: "powerNegotiation", label: "Power negotiation", tag: "powerNegotiation", path: ["device", "vendorConfig", 0, "powerNegotiation", 0], type: "number" },
            { id: "powerOffWhenCharging", label: "Power off when charging", tag: "powerOffWhenCharging", path: ["device", "vendorConfig", 0, "powerOffWhenCharging", 0], options: offOnOptions }
        ]
    },
    {
        title: "Audio & Media",
        open: false,
        settings: [
            { id: "preferredCodec", label: "Preferred codec", tag: "preferredCodec", path: ["device", "sipProfile", 0, "preferredCodec", 0], type: "text", placeholder: "none" },
            { id: "advertiseG722Codec", label: "Advertise G.722", tag: "advertiseG722Codec", path: ["device", "advertiseG722Codec", 0], options: binaryOptions },
            { id: "g722CodecSupport", label: "G.722 codec support", tag: "g722CodecSupport", path: ["device", "vendorConfig", 0, "g722CodecSupport", 0], type: "number" },
            { id: "handsetWidebandEnable", label: "Handset wideband", tag: "handsetWidebandEnable", path: ["device", "vendorConfig", 0, "handsetWidebandEnable", 0], type: "number" },
            { id: "headsetWidebandEnable", label: "Headset wideband", tag: "headsetWidebandEnable", path: ["device", "vendorConfig", 0, "headsetWidebandEnable", 0], type: "number" },
            { id: "handsetWidebandUIControl", label: "Handset wideband UI control", tag: "handsetWidebandUIControl", path: ["device", "vendorConfig", 0, "handsetWidebandUIControl", 0], options: binaryOptions },
            { id: "headsetWidebandUIControl", label: "Headset wideband UI control", tag: "headsetWidebandUIControl", path: ["device", "vendorConfig", 0, "headsetWidebandUIControl", 0], options: binaryOptions },
            { id: "enableVad", label: "Silence suppression", tag: "enableVad", path: ["device", "sipProfile", 0, "enableVad", 0], options: boolOptions },
            { id: "minimumRingVolume", label: "Minimum ring volume", tag: "minimumRingVolume", path: ["device", "vendorConfig", 0, "minimumRingVolume", 0], type: "number", placeholder: "Blank for phone default" },
            { id: "separateMute", label: "Separate mute per audio path", tag: "separateMute", path: ["device", "vendorConfig", 0, "separateMute", 0], options: offOnOptions },
            { id: "enableGroupListen", label: "Group listen", tag: "enableGroupListen", path: ["device", "sipProfile", 0, "enableGroupListen", 0], options: boolOptions },
            { id: "recordingTone", label: "Recording tone", tag: "recordingTone", path: ["device", "vendorConfig", 0, "recordingTone", 0], options: offOnOptions },
            { id: "recordingToneLocalVolume", label: "Recording tone local volume", tag: "recordingToneLocalVolume", path: ["device", "vendorConfig", 0, "recordingToneLocalVolume", 0], type: "number" },
            { id: "recordingToneRemoteVolume", label: "Recording tone remote volume", tag: "recordingToneRemoteVolume", path: ["device", "vendorConfig", 0, "recordingToneRemoteVolume", 0], type: "number" },
            { id: "recordingToneDuration", label: "Recording tone duration", tag: "recordingToneDuration", path: ["device", "vendorConfig", 0, "recordingToneDuration", 0], type: "text" },
            { id: "dtmfAvtPayload", label: "DTMF AVT payload", tag: "dtmfAvtPayload", path: ["device", "sipProfile", 0, "dtmfAvtPayload", 0], type: "number" },
            { id: "dtmfDbLevel", label: "DTMF dB level", tag: "dtmfDbLevel", path: ["device", "sipProfile", 0, "dtmfDbLevel", 0], type: "number" },
            { id: "dtmfOutofBand", label: "DTMF mode", tag: "dtmfOutofBand", path: ["device", "sipProfile", 0, "dtmfOutofBand", 0], type: "text" },
            { id: "startMediaPort", label: "RTP start port", tag: "startMediaPort", path: ["device", "sipProfile", 0, "startMediaPort", 0], type: "number" },
            { id: "stopMediaPort", label: "RTP stop port", tag: "stopMediaPort", path: ["device", "sipProfile", 0, "stopMediaPort", 0], type: "number" },
            { id: "dscpForAudio", label: "Audio DSCP", tag: "dscpForAudio", path: ["device", "sipProfile", 0, "dscpForAudio", 0], type: "number" }
        ]
    },
    {
        title: "Calling Behavior",
        open: false,
        settings: [
            { id: "autoAnswerTimer", label: "Auto-answer timer", tag: "autoAnswerTimer", path: ["device", "sipProfile", 0, "autoAnswerTimer", 0], type: "number" },
            { id: "autoAnswerAltBehavior", label: "Auto-answer alternate behavior", tag: "autoAnswerAltBehavior", path: ["device", "sipProfile", 0, "autoAnswerAltBehavior", 0], options: boolOptions },
            { id: "autoAnswerOverride", label: "Auto-answer override", tag: "autoAnswerOverride", path: ["device", "sipProfile", 0, "autoAnswerOverride", 0], options: boolOptions },
            { id: "transferOnhookEnabled", label: "Transfer on hook", tag: "transferOnhookEnabled", path: ["device", "sipProfile", 0, "transferOnhookEnabled", 0], options: boolOptions },
            { id: "alwaysUsePrimeLine", label: "Always use primary line", tag: "alwaysUsePrimeLine", path: ["device", "sipProfile", 0, "alwaysUsePrimeLine", 0], options: boolOptions },
            { id: "alwaysUsePrimeLineVoiceMail", label: "Always use primary line for voicemail", tag: "alwaysUsePrimeLineVoiceMail", path: ["device", "sipProfile", 0, "alwaysUsePrimeLineVoiceMail", 0], options: boolOptions },
            { id: "anonymousCallBlock", label: "Anonymous call block", tag: "anonymousCallBlock", path: ["device", "sipProfile", 0, "sipCallFeatures", 0, "anonymousCallBlock", 0], options: offOnOptions },
            { id: "callerIdBlocking", label: "Caller ID blocking", tag: "callerIdBlocking", path: ["device", "sipProfile", 0, "sipCallFeatures", 0, "callerIdBlocking", 0], options: offOnOptions },
            { id: "dndControl", label: "DND control", tag: "dndControl", path: ["device", "sipProfile", 0, "sipCallFeatures", 0, "dndControl", 0], options: offOnOptions },
            { id: "dndCallAlert", label: "DND call alert", tag: "dndCallAlert", path: ["device", "dndCallAlert", 0], type: "number" },
            { id: "dndReminderTimer", label: "DND reminder timer", tag: "dndReminderTimer", path: ["device", "dndReminderTimer", 0], type: "number" },
            { id: "blfAudibleAlertSettingOfIdleStation", label: "BLF idle audible alert", tag: "blfAudibleAlertSettingOfIdleStation", path: ["device", "blfAudibleAlertSettingOfIdleStation", 0], type: "number" },
            { id: "blfAudibleAlertSettingOfBusyStation", label: "BLF busy audible alert", tag: "blfAudibleAlertSettingOfBusyStation", path: ["device", "blfAudibleAlertSettingOfBusyStation", 0], type: "number" },
            { id: "callHoldRingback", label: "Hold ringback", tag: "callHoldRingback", path: ["device", "sipProfile", 0, "sipCallFeatures", 0, "callHoldRingback", 0], type: "number" },
            { id: "localCfwdEnable", label: "Local call forwarding", tag: "localCfwdEnable", path: ["device", "sipProfile", 0, "sipCallFeatures", 0, "localCfwdEnable", 0], options: boolOptions },
            { id: "semiAttendedTransfer", label: "Semi-attended transfer", tag: "semiAttendedTransfer", path: ["device", "sipProfile", 0, "sipCallFeatures", 0, "semiAttendedTransfer", 0], options: boolOptions },
            { id: "offhookToFirstDigitTimer", label: "Off-hook first digit timer", tag: "offhookToFirstDigitTimer", path: ["device", "sipProfile", 0, "offhookToFirstDigitTimer", 0], type: "number" },
            { id: "silentPeriodBetweenCallWaitingBursts", label: "Call-waiting burst silence", tag: "silentPeriodBetweenCallWaitingBursts", path: ["device", "sipProfile", 0, "silentPeriodBetweenCallWaitingBursts", 0], type: "number" },
            { id: "ringSettingBusyStationPolicy", label: "Busy station ring policy", tag: "ringSettingBusyStationPolicy", path: ["device", "sipProfile", 0, "ringSettingBusyStationPolicy", 0], type: "number" },
            { id: "autoCallPickupEnable", label: "Auto call pickup", tag: "autoCallPickupEnable", path: ["device", "autoCallPickupEnable", 0], options: boolOptions },
            { id: "rollover", label: "Rollover", tag: "rollover", path: ["device", "rollover", 0], type: "number" },
            { id: "joinAcrossLines", label: "Join across lines", tag: "joinAcrossLines", path: ["device", "joinAcrossLines", 0], type: "number" }
        ]
    },
    {
        title: "Buttons & On-Screen UI",
        open: false,
        settings: [
            { id: "recentsSoftKey", label: "Recents softkey", tag: "recentsSoftKey", path: ["device", "vendorConfig", 0, "recentsSoftKey", 0], options: binaryOptions },
            { id: "holdResumeKey", label: "Hold/resume key behavior", tag: "holdResumeKey", path: ["device", "vendorConfig", 0, "holdResumeKey", 0], type: "number" },
            { id: "softKeyControl", label: "Softkey control", tag: "softKeyControl", path: ["device", "vendorConfig", 0, "softKeyControl", 0], options: binaryOptions },
            { id: "moreKeyReversionTimer", label: "More-key reversion timer", tag: "moreKeyReversionTimer", path: ["device", "vendorConfig", 0, "moreKeyReversionTimer", 0], type: "number" },
            { id: "dialToneFromReleaseKey", label: "Dial tone from release key", tag: "dialToneFromReleaseKey", path: ["device", "vendorConfig", 0, "dialToneFromReleaseKey", 0], options: offOnOptions },
            { id: "joinAndDirectTransferPolicy", label: "Join/direct transfer policy", tag: "joinAndDirectTransferPolicy", path: ["device", "vendorConfig", 0, "joinAndDirectTransferPolicy", 0], type: "number" },
            { id: "autoSelectLineEnable", label: "Auto-select line", tag: "autoSelectLineEnable", path: ["device", "vendorConfig", 0, "autoSelectLineEnable", 0], options: binaryOptions },
            { id: "autoCallSelect", label: "Auto-select call", tag: "autoCallSelect", path: ["device", "vendorConfig", 0, "autoCallSelect", 0], options: binaryOptions },
            { id: "disableLocalSpeedDialConfig", label: "Disable local speed dial edits", tag: "disableLocalSpeedDialConfig", path: ["device", "sipProfile", 0, "disableLocalSpeedDialConfig", 0], options: boolOptions },
            { id: "incomingCallToastTimer", label: "Incoming call toast timer", tag: "incomingCallToastTimer", path: ["device", "vendorConfig", 0, "incomingCallToastTimer", 0], type: "number" },
            { id: "showCallHistoryForSelectedLine", label: "Call history for selected line", tag: "showCallHistoryForSelectedLine", path: ["device", "vendorConfig", 0, "showCallHistoryForSelectedLine", 0], options: offOnOptions },
            { id: "actionableAlert", label: "Actionable alerts", tag: "actionableAlert", path: ["device", "vendorConfig", 0, "actionableAlert", 0], options: offOnOptions },
            { id: "kemOneColumn", label: "KEM one-column mode", tag: "kemOneColumn", path: ["device", "vendorConfig", 0, "kemOneColumn", 0], options: offOnOptions },
            { id: "lineMode", label: "Line mode", tag: "lineMode", path: ["device", "vendorConfig", 0, "lineMode", 0], type: "number" },
            { id: "lowerYourVoiceAlert", label: "Lower-your-voice alert", tag: "lowerYourVoiceAlert", path: ["device", "vendorConfig", 0, "lowerYourVoiceAlert", 0], options: offOnOptions },
            { id: "markCallAsSpam", label: "Mark call as spam", tag: "markCallAsSpam", path: ["device", "vendorConfig", 0, "markCallAsSpam", 0], options: binaryOptions },
            { id: "allCallsOnPrimary", label: "All calls on primary", tag: "allCallsOnPrimary", path: ["device", "vendorConfig", 0, "allCallsOnPrimary", 0], options: offOnOptions },
            { id: "simplifiedNewCall", label: "Simplified new call", tag: "simplifiedNewCall", path: ["device", "vendorConfig", 0, "simplifiedNewCall", 0], options: offOnOptions },
            { id: "callParkMonitor", label: "Call park monitor", tag: "callParkMonitor", path: ["device", "vendorConfig", 0, "callParkMonitor", 0], options: binaryOptions },
            { id: "kpml", label: "KPML", tag: "kpml", path: ["device", "sipProfile", 0, "kpml", 0], options: offOnOptions },
            { id: "stutterMsgWaiting", label: "Stutter message waiting tone", tag: "stutterMsgWaiting", path: ["device", "sipProfile", 0, "stutterMsgWaiting", 0], options: offOnOptions },
            { id: "callStats", label: "Call stats display", tag: "callStats", path: ["device", "sipProfile", 0, "callStats", 0], options: boolOptions },
            { id: "callLogBlfEnabled", label: "Call-log BLF", tag: "callLogBlfEnabled", path: ["device", "commonProfile", 0, "callLogBlfEnabled", 0], type: "number" },
            { id: "MissedCallLoggingOption", label: "Missed call logging", tag: "MissedCallLoggingOption", path: ["device", "MissedCallLoggingOption", 0], type: "number" },
            { id: "accessContacts", label: "Contacts app access", tag: "accessContacts", path: ["device", "vendorConfig", 0, "accessContacts", 0], options: binaryOptions },
            { id: "accessFavorites", label: "Favorites access", tag: "accessFavorites", path: ["device", "vendorConfig", 0, "accessFavorites", 0], options: binaryOptions },
            { id: "accessVoicemail", label: "Voicemail app access", tag: "accessVoicemail", path: ["device", "vendorConfig", 0, "accessVoicemail", 0], options: binaryOptions },
            { id: "accessApps", label: "Apps access", tag: "accessApps", path: ["device", "vendorConfig", 0, "accessApps", 0], options: binaryOptions }
        ]
    },
    {
        title: "Network & Signaling",
        open: false,
        settings: [
            { id: "transportLayerProtocol", label: "SIP transport", tag: "transportLayerProtocol", path: ["device", "transportLayerProtocol", 0], options: [{ value: "1", label: "TCP" }, { value: "2", label: "UDP" }, { value: "3", label: "TLS" }] },
            { id: "sipInviteRetx", label: "SIP INVITE retransmits", tag: "sipInviteRetx", path: ["device", "sipProfile", 0, "sipStack", 0, "sipInviteRetx", 0], type: "number" },
            { id: "sipRetx", label: "SIP retransmits", tag: "sipRetx", path: ["device", "sipProfile", 0, "sipStack", 0, "sipRetx", 0], type: "number" },
            { id: "timerInviteExpires", label: "INVITE expiry timer", tag: "timerInviteExpires", path: ["device", "sipProfile", 0, "sipStack", 0, "timerInviteExpires", 0], type: "number" },
            { id: "timerRegisterExpires", label: "REGISTER expiry timer", tag: "timerRegisterExpires", path: ["device", "sipProfile", 0, "sipStack", 0, "timerRegisterExpires", 0], type: "number" },
            { id: "timerRegisterDelta", label: "REGISTER delta", tag: "timerRegisterDelta", path: ["device", "sipProfile", 0, "sipStack", 0, "timerRegisterDelta", 0], type: "number" },
            { id: "timerKeepAliveExpires", label: "Keepalive expiry timer", tag: "timerKeepAliveExpires", path: ["device", "sipProfile", 0, "sipStack", 0, "timerKeepAliveExpires", 0], type: "number" },
            { id: "timerSubscribeExpires", label: "SUBSCRIBE expiry timer", tag: "timerSubscribeExpires", path: ["device", "sipProfile", 0, "sipStack", 0, "timerSubscribeExpires", 0], type: "number" },
            { id: "timerSubscribeDelta", label: "SUBSCRIBE delta", tag: "timerSubscribeDelta", path: ["device", "sipProfile", 0, "sipStack", 0, "timerSubscribeDelta", 0], type: "number" },
            { id: "timerT1", label: "SIP T1 timer", tag: "timerT1", path: ["device", "sipProfile", 0, "sipStack", 0, "timerT1", 0], type: "number" },
            { id: "timerT2", label: "SIP T2 timer", tag: "timerT2", path: ["device", "sipProfile", 0, "sipStack", 0, "timerT2", 0], type: "number" },
            { id: "maxRedirects", label: "Max redirects", tag: "maxRedirects", path: ["device", "sipProfile", 0, "sipStack", 0, "maxRedirects", 0], type: "number" },
            { id: "remotePartyID", label: "Remote-Party-ID", tag: "remotePartyID", path: ["device", "sipProfile", 0, "sipStack", 0, "remotePartyID", 0], options: boolOptions },
            { id: "userInfo", label: "SIP user info", tag: "userInfo", path: ["device", "sipProfile", 0, "sipStack", 0, "userInfo", 0], type: "text" },
            { id: "rfc2543Hold", label: "RFC 2543 hold", tag: "rfc2543Hold", path: ["device", "sipProfile", 0, "sipStack", 0, "rfc2543Hold", 0], options: boolOptions },
            { id: "remoteCcEnable", label: "Remote call control", tag: "remoteCcEnable", path: ["device", "sipProfile", 0, "remoteCcEnable", 0], options: boolOptions },
            { id: "retainForwardInformation", label: "Retain forward information", tag: "retainForwardInformation", path: ["device", "sipProfile", 0, "sipCallFeatures", 0, "retainForwardInformation", 0], options: boolOptions },
            { id: "uriDialingDisplayPreference", label: "URI dialing display preference", tag: "uriDialingDisplayPreference", path: ["device", "sipProfile", 0, "sipCallFeatures", 0, "uriDialingDisplayPreference", 0], type: "number" },
            { id: "cnfJoinEnabled", label: "Conference/join", tag: "cnfJoinEnabled", path: ["device", "sipProfile", 0, "sipCallFeatures", 0, "cnfJoinEnabled", 0], options: boolOptions },
            { id: "externalNumberMask", label: "External number mask", tag: "externalNumberMask", path: ["device", "sipProfile", 0, "externalNumberMask", 0], type: "text" },
            { id: "detectCMConnectionFailure", label: "Detect call-control failure", tag: "detectCMConnectionFailure", path: ["device", "vendorConfig", 0, "detectCMConnectionFailure", 0], options: offOnOptions },
            { id: "enableCdpSwPort", label: "CDP switch port", tag: "enableCdpSwPort", path: ["device", "vendorConfig", 0, "enableCdpSwPort", 0], options: binaryOptions },
            { id: "enableCdpPcPort", label: "CDP PC port", tag: "enableCdpPcPort", path: ["device", "vendorConfig", 0, "enableCdpPcPort", 0], options: binaryOptions },
            { id: "enableLldpSwPort", label: "LLDP switch port", tag: "enableLldpSwPort", path: ["device", "vendorConfig", 0, "enableLldpSwPort", 0], options: binaryOptions },
            { id: "enableLldpPcPort", label: "LLDP PC port", tag: "enableLldpPcPort", path: ["device", "vendorConfig", 0, "enableLldpPcPort", 0], options: binaryOptions },
            { id: "cdpEnable", label: "CDP", tag: "cdpEnable", path: ["device", "vendorConfig", 0, "cdpEnable", 0], options: boolOptions },
            { id: "voiceVlanAccess", label: "Voice VLAN access", tag: "voiceVlanAccess", path: ["device", "vendorConfig", 0, "voiceVlanAccess", 0], type: "number" },
            { id: "dfBit", label: "DF bit", tag: "dfBit", path: ["device", "vendorConfig", 0, "dfBit", 0], options: binaryOptions },
            { id: "garp", label: "GARP", tag: "garp", path: ["device", "vendorConfig", 0, "garp", 0], options: offOnOptions },
            { id: "rtcp", label: "RTCP", tag: "rtcp", path: ["device", "vendorConfig", 0, "rtcp", 0], options: binaryOptions },
            { id: "videoRtcp", label: "Video RTCP", tag: "videoRtcp", path: ["device", "vendorConfig", 0, "videoRtcp", 0], options: binaryOptions },
            { id: "natEnabled", label: "NAT enabled", tag: "natEnabled", path: ["device", "sipProfile", 0, "natEnabled", 0], options: boolOptions },
            { id: "natReceivedProcessing", label: "NAT received processing", tag: "natReceivedProcessing", path: ["device", "sipProfile", 0, "natReceivedProcessing", 0], options: boolOptions },
            { id: "natAddress", label: "NAT address", tag: "natAddress", path: ["device", "sipProfile", 0, "natAddress", 0], type: "text" },
            { id: "TLSResumptionTimer", label: "TLS resumption timer", tag: "TLSResumptionTimer", path: ["device", "TLSResumptionTimer", 0], type: "number" }
        ]
    },
    {
        title: "Services & URLs",
        open: false,
        settings: [
            { id: "servicesURL", label: "Services URL", tag: "servicesURL", path: ["device", "servicesURL", 0], type: "text" },
            { id: "directoryURL", label: "Directory URL", tag: "directoryURL", path: ["device", "directoryURL", 0], type: "text" },
            { id: "messagesURL", label: "Messages URL", tag: "messagesURL", path: ["device", "messagesURL", 0], type: "text" },
            { id: "freepbxVoicemailMenu", label: "FreePBX voicemail menu", tag: "freepbxVoicemailMenu", path: ["device", "freepbxVoicemailMenu", 0], options: binaryOptions, defaultValue: "1" },
            { id: "voicemailDialCode", label: "My mailbox code", tag: "voicemailDialCode", path: ["device", "voicemailDialCode", 0], type: "text", placeholder: "*97", defaultValue: "*97" },
            { id: "voicemailMailboxLoginCode", label: "Mailbox login code", tag: "voicemailMailboxLoginCode", path: ["device", "voicemailMailboxLoginCode", 0], type: "text", placeholder: "*98", defaultValue: "*98" },
            { id: "voicemailMenuTitle", label: "Voicemail menu title", tag: "voicemailMenuTitle", path: ["device", "voicemailMenuTitle", 0], type: "text", placeholder: "FreePBX Voicemail", defaultValue: "FreePBX Voicemail" },
            { id: "idleURL", label: "Idle URL", tag: "idleURL", path: ["device", "idleURL", 0], type: "text" },
            { id: "informationURL", label: "Information URL", tag: "informationURL", path: ["device", "informationURL", 0], type: "text" },
            { id: "authenticationURL", label: "Authentication URL", tag: "authenticationURL", path: ["device", "authenticationURL", 0], type: "text" },
            { id: "proxyServerURL", label: "Proxy server URL", tag: "proxyServerURL", path: ["device", "proxyServerURL", 0], type: "text" },
            { id: "secureServicesURL", label: "Secure services URL", tag: "secureServicesURL", path: ["device", "secureServicesURL", 0], type: "text" },
            { id: "secureDirectoryURL", label: "Secure directory URL", tag: "secureDirectoryURL", path: ["device", "secureDirectoryURL", 0], type: "text" },
            { id: "secureMessagesURL", label: "Secure messages URL", tag: "secureMessagesURL", path: ["device", "secureMessagesURL", 0], type: "text" },
            { id: "secureIdleURL", label: "Secure idle URL", tag: "secureIdleURL", path: ["device", "secureIdleURL", 0], type: "text" },
            { id: "secureInformationURL", label: "Secure information URL", tag: "secureInformationURL", path: ["device", "secureInformationURL", 0], type: "text" },
            { id: "secureAuthenticationURL", label: "Secure authentication URL", tag: "secureAuthenticationURL", path: ["device", "secureAuthenticationURL", 0], type: "text" },
            { id: "applicationURL", label: "Application button URL", tag: "applicationURL", path: ["device", "vendorConfig", 0, "applicationURL", 0], type: "text" },
            { id: "appButtonTimer", label: "App button timer", tag: "appButtonTimer", path: ["device", "vendorConfig", 0, "appButtonTimer", 0], type: "number" },
            { id: "appButtonPriority", label: "App button priority", tag: "appButtonPriority", path: ["device", "vendorConfig", 0, "appButtonPriority", 0], type: "number" },
            { id: "idleTimeout", label: "Idle timeout", tag: "idleTimeout", path: ["device", "idleTimeout", 0], type: "number" },
            { id: "problemReportUploadURL", label: "Problem report upload URL", tag: "problemReportUploadURL", path: ["device", "vendorConfig", 0, "problemReportUploadURL", 0], type: "text" }
        ]
    },
    {
        title: "Firmware, Locale & Misc",
        open: false,
        settings: [
            { id: "loadInformation", label: "Active firmware load", tag: "loadInformation", path: ["device", "loadInformation", 0], type: "text" },
            { id: "inactiveLoadInformation", label: "Inactive firmware load", tag: "inactiveLoadInformation", path: ["device", "inactiveLoadInformation", 0], type: "text" },
            { id: "loadServer", label: "Firmware load server", tag: "loadServer", path: ["device", "vendorConfig", 0, "loadServer", 0], type: "text" },
            { id: "peerFirmwareSharing", label: "Peer firmware sharing", tag: "peerFirmwareSharing", path: ["device", "vendorConfig", 0, "peerFirmwareSharing", 0], options: offOnOptions },
            { id: "userLocaleName", label: "User locale name", tag: "userLocaleName", path: ["device", "userLocale", 0, "name", 0], type: "text" },
            { id: "userLocaleLangCode", label: "User locale language code", tag: "userLocaleLangCode", path: ["device", "userLocale", 0, "langCode", 0], type: "text" },
            { id: "userLocaleVersion", label: "User locale version", tag: "userLocaleVersion", path: ["device", "userLocale", 0, "version", 0], type: "text" },
            { id: "networkLocale", label: "Network locale", tag: "networkLocale", path: ["device", "networkLocale", 0], type: "text" },
            { id: "networkLocaleVersion", label: "Network locale version", tag: "networkLocaleVersion", path: ["device", "networkLocaleInfo", 0, "version", 0], type: "text" },
            { id: "featurePolicyFile", label: "Feature policy file", tag: "featurePolicyFile", path: ["device", "featurePolicyFile", 0], type: "text" },
            { id: "dialTemplate", label: "Dial template file", tag: "dialTemplate", path: ["device", "sipProfile", 0, "dialTemplate", 0], type: "text" },
            { id: "softKeyFile", label: "Softkey file", tag: "softKeyFile", path: ["device", "sipProfile", 0, "softKeyFile", 0], type: "text" },
            { id: "specialNumbers", label: "Special numbers", tag: "specialNumbers", path: ["device", "vendorConfig", 0, "specialNumbers", 0], type: "text" },
            { id: "sendKeyAction", label: "Send key action", tag: "sendKeyAction", path: ["device", "vendorConfig", 0, "sendKeyAction", 0], type: "number" },
            { id: "outOfRangeAlert", label: "Out-of-range alert", tag: "outOfRangeAlert", path: ["device", "vendorConfig", 0, "outOfRangeAlert", 0], options: offOnOptions },
            { id: "videoCapability", label: "Video capability", tag: "videoCapability", path: ["device", "vendorConfig", 0, "videoCapability", 0], options: binaryOptions },
            { id: "hideVideoByDefault", label: "Hide video by default", tag: "hideVideoByDefault", path: ["device", "vendorConfig", 0, "hideVideoByDefault", 0], options: offOnOptions }
        ]
    }
];
const phoneSettingDefinitions = phoneSettingsSchema.flatMap((section) => section.settings);
const phoneSettingIds = phoneSettingDefinitions.map((setting) => setting.id);

function getByPath(source, path) {
    return path.reduce((current, key) => {
        if (current === undefined || current === null) return undefined;
        return current[key];
    }, source);
}

function renderPhoneSettings() {
    const root = document.getElementById("phoneSettingsSections");
    root.innerHTML = "";

    phoneSettingsSchema.forEach((section) => {
        const details = document.createElement("details");
        details.className = "settingsSection";
        details.open = section.open === true;

        const summary = document.createElement("summary");
        summary.innerText = section.title;
        details.appendChild(summary);

        const grid = document.createElement("div");
        grid.className = "settingsGrid";

        section.settings.forEach((setting) => {
            const label = document.createElement("label");
            label.htmlFor = setting.id;
            label.innerText = setting.label;
            if (setting.help) label.title = setting.help;

            let control;
            if (setting.options) {
                control = document.createElement("select");
                setting.options.forEach((option) => {
                    const optionElement = document.createElement("option");
                    optionElement.value = option.value;
                    optionElement.innerText = option.label;
                    control.appendChild(optionElement);
                });
            } else {
                control = document.createElement("input");
                control.type = setting.type || "text";
                if (setting.placeholder) control.placeholder = setting.placeholder;
            }
            control.id = setting.id;
            control.value = setting.defaultValue || "";

            const xmlName = document.createElement("span");
            xmlName.className = "xmlName";
            xmlName.innerText = setting.tag;

            grid.append(label, control, xmlName);
        });

        details.appendChild(grid);
        root.appendChild(details);
    });
}

function collectPhoneSettings() {
    const settings = {};
    phoneSettingIds.forEach((id) => {
        settings[id] = document.getElementById(id).value;
    });
    return settings;
}

function setPhoneSettings(settings = {}) {
    phoneSettingIds.forEach((id) => {
        if (settings[id] !== undefined && settings[id] !== null) {
            document.getElementById(id).value = settings[id].toString();
        }
    });
}

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
    const xmlOverrideEnabled = document.getElementById("xmlOverrideEnabled").checked;
    const xmlOverride = document.getElementById("xmlOverride").value;
    const phoneSettings = collectPhoneSettings();

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
        "lineKeys": lineKeyJSONConstruction,
        "phoneSettings": phoneSettings,
        "advanced": {
            xmlOverrideEnabled: xmlOverrideEnabled,
            xmlOverride: xmlOverride
        }
    }
    console.log("SENDING:");
    console.log(xhrDataPacket);

    let xhr = new XMLHttpRequest(); //POST
    xhr.open("POST", "/api/createModifyDevice", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    //Send xhrDataPacket as Property called 'data'
    xhr.send(JSON.stringify({ data: xhrDataPacket }));

    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status >= 200 && this.status < 300) {
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
        if (this.readyState === XMLHttpRequest.DONE && this.status >= 400) {
            try {
                alertHandle(JSON.parse(this.responseText).message, 1);
            } catch (error) {
                alertHandle("Configuration save failed.", 1);
            }
        }
    };
}

function setXmlOverrideStatus(message, isError = false) {
    const status = document.getElementById('xmlOverrideStatus');
    status.innerText = message || "";
    status.classList.toggle('error', isError);
}

let lastLoadedRawProvision = "";

function loadCurrentXmlIntoOverride() {
    if (!lastLoadedRawProvision) {
        setXmlOverrideStatus("No current provisioning XML has been loaded for this device yet.", true);
        return;
    }

    document.getElementById('xmlOverride').value = lastLoadedRawProvision;
    document.getElementById('xmlOverrideEnabled').checked = true;
    setXmlOverrideStatus("Current XML loaded into override editor.");
}

function validateXmlOverride() {
    const xml = document.getElementById('xmlOverride').value;
    setXmlOverrideStatus("Validating XML...");

    fetch('/api/validateProvisioningXml', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ xml })
    })
        .then(async (response) => {
            const payload = await response.json();
            if (!response.ok || payload.code !== 0) {
                throw new Error(payload.message || "XML validation failed.");
            }
            setXmlOverrideStatus(payload.message);
        })
        .catch((error) => {
            setXmlOverrideStatus(error.message, true);
        });
}

let pState = null;

function showAllFieldsets() {
    document.getElementById('lineKeyFieldset').style.opacity = "100";
    document.getElementById('cpaFieldset').style.display = "block";
    document.getElementById('phoneSettingsFieldset').style.display = "block";
    document.getElementById('propFielset').style.display = "block";
    document.getElementById('securityFieldset').style.display = "block";
    document.getElementById('advancedXmlFieldset').style.display = "block";
    document.getElementById('actionFieldset').style.display = "block";
    document.getElementById('deviceinfoFieldset').style.display = "block";
}

function hideAllFieldsets() {
    document.getElementById('lineKeyFieldset').style.opacity = "0";
    document.getElementById('cpaFieldset').style.display = "none";
    document.getElementById('phoneSettingsFieldset').style.display = "none";
    document.getElementById('propFielset').style.display = "none";
    document.getElementById('securityFieldset').style.display = "none";
    document.getElementById('advancedXmlFieldset').style.display = "none";
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
                lastLoadedRawProvision = response.rawProvision || "";
                console.log(response);


                console.log(`[${new Date().toISOString()}] Retrived existing configuration.`);

                //Run after 1s
                setTimeout(function () {
                    const parsedProvision = parseResponseDoc(response.provision, response.config.advancedXmlOverrideEnabled === true);
                    const didLoad = parsedProvision
                        ? reimportDevice(parsedProvision, response.config)
                        : reimportDeviceOverrideOnly(response.config);

                    if(didLoad) {
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
function parseResponseDoc(responseJSONObject, quiet = false) {
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
    const phoneSettings = {};
    phoneSettingDefinitions.forEach((setting) => {
        const value = getByPath(responseJSONObject, setting.path);
        if (value !== undefined && value !== null) {
            phoneSettings[setting.id] = value;
        }
    });

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
        phoneSettings,
      };
    } catch (e) {
        console.error(e);
        if (!quiet) {
            document.getElementById('dstatus-error').style.display = "block";
            document.getElementById('dstatus-error').innerHTML = document.getElementById('dstatus-error').innerHTML.replace("<!--CONTEXT-->", `Could not load device. Verify that configuration is not corrupt (ERR-JPARSER-1).`);
            document.getElementById('dstatus-wait').style.display = "none";
        }
        return;
    }

}

function reimportDeviceOverrideOnly(deviceConfigData) {
    if (deviceConfigData.advancedXmlOverrideEnabled !== true || !lastLoadedRawProvision) {
        document.getElementById('dstatus-error').style.display = "block";
        document.getElementById('dstatus-error').innerHTML = document.getElementById('dstatus-error').innerHTML.replace("<!--CONTEXT-->", `Could not load device. Verify that configuration is not corrupt (ERR-JPARSER-1).`);
        document.getElementById('dstatus-wait').style.display = "none";
        return false;
    }

    document.getElementById('deviceUUID').value = deviceConfigData.uuid;
    document.getElementById('deviceName').value = deviceConfigData.name;
    document.getElementById('deviceDescription').value = deviceConfigData.description;
    document.getElementById('deviceExtension').value = deviceConfigData.extension;
    document.getElementById('deviceMAC').value = deviceConfigData.mac;
    document.getElementById('deviceIP').value = deviceConfigData.ip;
    document.getElementById('deviceGroups').value = deviceConfigData.groups;
    setPhoneSettings(deviceConfigData.phoneSettings);
    document.getElementById('xmlOverrideEnabled').checked = true;
    document.getElementById('xmlOverride').value = lastLoadedRawProvision;
    setXmlOverrideStatus("This device is using a full XML override. Structured fields could not be inferred from the custom XML.");

    for (let i = 0; i < document.getElementById('deviceModel').options.length; i++) {
        if (document.getElementById('deviceModel').options[i].innerText === deviceConfigData.model) {
            document.getElementById('deviceModel').selectedIndex = i;
            break;
        }
    }

    if (deviceConfigData.security?.ipRestricted) {
        document.getElementById('ipRestriction').checked = false;
        document.getElementById('ipRestriction').click();
        document.getElementById('ipRestrictionRangeStart').value = deviceConfigData.security.ipWhitelist[0];
        document.getElementById('ipRestrictionRangeEnd').value = deviceConfigData.security.ipWhitelist[1];
    }

    document.getElementById('enableDevice').checked = deviceConfigData.enabled !== false;
    document.getElementById('dstatus-ready').style.display = 'block';
    return true;
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
    const phoneSettings = deviceDataMap.phoneSettings;
    const deviceIP = deviceConfigData.ip;
    const advancedXmlOverrideEnabled = deviceConfigData.advancedXmlOverrideEnabled === true;

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
    setPhoneSettings(phoneSettings);

    document.getElementById('deviceIP').value = deviceIP;
    document.getElementById('xmlOverrideEnabled').checked = advancedXmlOverrideEnabled;
    if (advancedXmlOverrideEnabled && lastLoadedRawProvision) {
        document.getElementById('xmlOverride').value = lastLoadedRawProvision;
        setXmlOverrideStatus("This device is using a full XML override.");
    }

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
document.addEventListener('DOMContentLoaded', function () {
    renderPhoneSettings();
    readPageQueryState();
});




/**
 * lazy
 */
function alertHandle(message, code = 1) {
    createToast(code, message);
}

//Bind event listeners to the checkboxes
document.getElementById("ipRestriction").addEventListener("change", function () { handleIPRestrictionCBState (this); });
