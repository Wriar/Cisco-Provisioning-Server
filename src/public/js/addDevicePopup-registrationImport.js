//Reset all the dropdowns to the default value of 0 
//TODO: Import existing data.
document.getElementById("line1_s").selectedIndex = 0;
document.getElementById("line2_s").selectedIndex = 0;
document.getElementById("line3_s").selectedIndex = 0;
document.getElementById("line4_s").selectedIndex = 0;
document.getElementById("line5_s").selectedIndex = 0;
document.getElementById("line6_s").selectedIndex = 0;


//TODO: This should go last (update all existing icons with updateLineIcon)
//Update all the icons to the default value of 0
updateLineIcon(1, "0");
updateLineIcon(2, "0");
updateLineIcon(3, "0");
updateLineIcon(4, "0");
updateLineIcon(5, "0");
updateLineIcon(6, "0");

lineKeySelectChange(document.getElementById("line1_s"), 1);
lineKeySelectChange(document.getElementById("line2_s"), 2);
lineKeySelectChange(document.getElementById("line3_s"), 3);
lineKeySelectChange(document.getElementById("line4_s"), 4);
lineKeySelectChange(document.getElementById("line5_s"), 5);
lineKeySelectChange(document.getElementById("line6_s"), 6);



//Bind Event Listeners on the <select> elements (line1_s, line2_s, line3_s, line4_s, line5_s, line6_s) to see when a new item is selected
//Then pass the selected item to the lineKeySelectChange function
document.getElementById("line1_s").addEventListener("change", function () { lineKeySelectChange(this, 1); });
document.getElementById("line2_s").addEventListener("change", function () { lineKeySelectChange(this, 2); });
document.getElementById("line3_s").addEventListener("change", function () { lineKeySelectChange(this, 3); });
document.getElementById("line4_s").addEventListener("change", function () { lineKeySelectChange(this, 4); });
document.getElementById("line5_s").addEventListener("change", function () { lineKeySelectChange(this, 5); });
document.getElementById("line6_s").addEventListener("change", function () { lineKeySelectChange(this, 6); });

function lineKeySelectChange(select, id) {
    const selectValue = select.value;
    const selectID = id;

    updateLineIcon(selectID, selectValue);

    document.getElementById(`line${selectID}_d`).innerHTML = returnDropdownData(selectValue, selectID);
    //console.log(`Line ${selectID} selected value: ${selectValue}`);


   
}

function updateLineIcon(selectID, selectValue) {
    switch(selectValue) {
        case "0":
            //Unprovisioned key.
            //Change the respective ICON

            document.getElementById(`line${selectID}_i`).className = "icmn-file-empty";

            break;
        case "1":
            //New Account Line (user)
            document.getElementById(`line${selectID}_i`).className = "icmn-user";
            break;
        case "2":
            //SPEED DIAL (menu7)
            document.getElementById(`line${selectID}_i`).className = "icmn-menu7";
            break;
        case "3":
            //Services URI (earth)
            document.getElementById(`line${selectID}_i`).className = "icmn-earth";
            break;
        case "4":
            //CPM Embedded (database-menu)
            document.getElementById(`line${selectID}_i`).className = "icmn-database-menu";
            break;
        case "5":
            //BLF SPEED DIAL (menu9)
            document.getElementById(`line${selectID}_i`).className = "icmn-menu9";
            break;
        case "6":
            //Intercom (phone-wave)
            document.getElementById(`line${selectID}_i`).className = "icmn-phone-wave";
            break;
        case "7":
            //Malicious Call (shield-notice)
            document.getElementById(`line${selectID}_i`).className = "icmn-shield-notice";
            break;
        case "8":
            //Park (phone-hang-up)
            document.getElementById(`line${selectID}_i`).className = "icmn-phone-hang-up";
            break;
        case "9":
            //Call Pickup (phone-outgoing)
            document.getElementById(`line${selectID}_i`).className = "icmn-phone-outgoing";

            break;
        case "10":
            //Group Pickup (users5)
            document.getElementById(`line${selectID}_i`).className = "icmn-users5";
            break;
        case "11":
            //DND (volume-mute5)
            document.getElementById(`line${selectID}_i`).className = "icmn-volume-mute5";
            break;
        case "12":
            //New Call (phone-plus)
            document.getElementById(`line${selectID}_i`).className = "icmn-phone-plus";
            break;
        case "13":
            //Hunt group login/logout (users)
            document.getElementById(`line${selectID}_i`).className = "icmn-users";
            break;
        case "14":
            //Record Call (recording)
            document.getElementById(`line${selectID}_i`).className = "icmn-recording";
            break;
        default:
            alert("Error: Invalid line key type selected.");
            break;
    }
}

function returnDropdownData(type, selectID, prefill = [null, null, null, null, null, null]) {

    //Parse type as an int
    try {
        type = parseInt(type);
    } catch (ex) {
        throw new Error(ex);
    }
    

    switch (type) {
        case 0:
            return `<i class="icmn-warning yellow"></i> Empty or Unregistered Line Key.`;
        case 1:
            //New Account Line
            const html = `<div class="tbcontain">
            <label for="lineName_${selectID}">Line Name:</label>
            <input id="lineName_${selectID}" type="text" placeholder="1000" value="${prefill[0] !== null ? prefill[0] : ''}" /><br/>

            <label for="displayName_${selectID}">Line Display Name:</label>
            <input id="displayName_${selectID}" type="text" placeholder="1000" value="${prefill[1] !== null ? prefill[1] : ''}" /><br/>

            <!--Autoanswer-->
            <label for="autoAnswer_${selectID}">Auto Answer:</label>
            <input id="autoAnswer_${selectID}" type="checkbox" ${prefill[2] != 0 ? `checked="${prefill[2]}"` : ''} /> <br/>

            <!--Authname/password-->
            <label for="authName_${selectID}">Auth Name:</label>
            <input id="authName_${selectID}" type="text" placeholder="1000" value="${prefill[3] !== null ? prefill[3] : ''}" /> <br/>


            <label for="authPassword_${selectID}">Auth Password:</label>
            <input id="authPassword_${selectID}" type="password" placeholder="*******" value="${prefill[4] !== null ? prefill[4] : ''}" /><br/>
            </div>
            `;

            console.log("The HTML: " + html);
            return html;
        case 2:
            //SPEED DIAL

            const html2 = `<div class="tbcontain">
            <label for="linename_${selectID}">Speeddial Name:</label>
            <input id="linename_${selectID}" type="text" placeholder="Lilith Central" value="${prefill[0] !== null ? prefill[0] : ''}" /><br/>

            <label for="speeddial_${selectID}">Speeddial Extension:</label>
            <input id="speeddial_${selectID}" type="text" placeholder="*1234" value="${prefill[1] !== null ? prefill[1] : ''}" /><br/>
            </div>
            `

            return html2;
        case 3:
            //Services URI
            const html3 = `<div class="tbcontain">
            <label for="linename_${selectID}">Services URI Name:</label>
            <input id="linename_${selectID}" type="text" placeholder="My Web Service" value="${prefill[0] !== null ? prefill[0] : ''}" /><br/>
            
            <label for="serviceuri_${selectID}">Services URI:</label>
            <input id="serviceuri_${selectID}" type="text" placeholder="http://example.com" value="${prefill[1] !== null ? prefill[1] : ''}" /><br/>
            `
            return html3;
        case 4:
            //CPM Embedded
            return 'i forgor';
        case 5:
            //BLF SPEED DIAL
            const html5 = `<div class="tbcontain">

            <label for="linename_${selectID}">BLF Name:</label>
            <input id="linename_${selectID}" type="text" placeholder="My BLF Line" value="${prefill[0] !== null ? prefill[0] : ''}" /><br/>

            <label for="blfOptionMask_${selectID}">BLF Feature Option Mask:</label>
            <input id="blfOptionMask_${selectID}" type="text" placeholder="1" value="${prefill[1] !== null ? prefill[1] : ''}" /><br/>

            <label for="blf_${selectID}">BLF Extension:</label>
            <input id="blf_${selectID}" type="text" placeholder="*1234" value="${prefill[2] !== null ? prefill[2] : ''}" /><br/>
            </div>
            `
            return html5;

        case 6:
            //Intercom

            const html6 = `<div class="tbcontain">
            <label for="linename_${selectID}">Intercom Name:</label>
            <input id="linename_${selectID}" type="text" placeholder="Intercom 1" value="${prefill[0] !== null ? prefill[0] : ''}" /><br/>

            <!--Intercom Port -->
            <label for="intercomport_${selectID}">Intercom Port:</label>
            <input id="intercomport_${selectID}" type="text" placeholder="*1234" value="${prefill[1] !== null ? prefill[1] : ''}" /><br/>

            <!--Intercom Display Name -->
            <label for="intercomdisplayname_${selectID}">Intercom Display Name:</label>
            <input id="intercomdisplayname_${selectID}" type="text" placeholder="Intercom 1" value="${prefill[2] !== null ? prefill[2] : ''}" /><br/>

            <!--AutoAnswerEnabled -->
            <label for="intercomautoanswer_${selectID}">Auto Answer:</label>
            <input id="intercomautoanswer_${selectID}" type="number" placeholder="3" value="${prefill[3] !== null ? prefill[3] : ''}" /><br/>

            <!--AutoAnswerMode -->
            <label for="intercomautoAnswerMode_${selectID}">Auto Answer Mode:</label>
            <input id="intercomautoAnswerMode_${selectID}" type="text" placeholder="Auto Answer with Speakerphone" value="${prefill[4] !== null ? prefill[4] : ''}" /><br/>

            <!--CallWaiting (default 3)-->
            <label for="callWaiting_${selectID}">Call Waiting:</label>
            <input id="callWaiting_${selectID}" type="number" placeholder="3" value="${prefill[5] !== null ? prefill[5] : ''}" /><br/>

            <!--MaxNumCalls (default 1)-->
            <label for="maxNumCalls_${selectID}">MaxNumCalls:</label>
            <input id="maxNumCalls_${selectID}" type="number" placeholder="1" value="${prefill[6] !== null ? prefill[6] : ''}" /><br/>
            
            <!--BusyTrigger (default 1)-->
            <label for="busyTrigger_${selectID}">BusyTrigger:</label>
            <input id="busyTrigger_${selectID}" type="number" placeholder="1" value="${prefill[7] !== null ? prefill[7] : ''}" /><br/>

            </div>
            `
            return html6;

        case 7:
            //Malicious Call
            const html7 = `
            <div class="tbcontain">
            <label for="linename_${selectID}">Feature Label:</label>
            <input id="linename_${selectID}" type="text" placeholder="Report Call" value="${prefill[0] !== null ? prefill[0] : ''}" /><br/>
            
            </div>`;

            return html7;
        case 8:
            //Park

            const html8 = `
            <div class="tbcontain">
            <label for="linename_${selectID}">Feature Label:</label>
            <input id="linename_${selectID}" type="text" placeholder="Park" value="${prefill[0] !== null ? prefill[0] : ''}" /><br/>
            </div>`;
            return html8;
        case 9:
            //Call Pickup

            const html9 = `
            <div class="tbcontain">
            <label for="linename_${selectID}">Feature Label:</label>
            <input id="linename_${selectID}" type="text" placeholder="Pickup Call" value="${prefill[0] !== null ? prefill[0] : ''}" /><br/>
            </div>`;
            return html9;
        case 10:
            //Group Pickup
            const html10 = `
            <div class="tbcontain">
            <label for="linename_${selectID}">Feature Label:</label>
            <input id="linename_${selectID}" type="text" placeholder="Group Pickup" value="${prefill[0] !== null ? prefill[0] : ''}" /><br/>
            </div>`;
            return html10;
        case 11:
            //DND

            const html11 = `
            <div class="tbcontain">
            <label for="linename_${selectID}">Feature Label:</label>
            <input id="linename_${selectID}" type="text" placeholder="Do Not Disturb" value="${prefill[0] !== null ? prefill[0] : ''}" /><br/>
            </div>`;
            return html11;
        case 12:
            //New Call
            const html12 = `
            <div class="tbcontain">
            <label for="linename_${selectID}">Feature Label (7900 Series Only):</label>
            <input id="linename_${selectID}" type="text" placeholder="New Call" value="${prefill[0] !== null ? prefill[0] : ''}" /><br/>
            </div>`;
            return html12;
        case 13:
            //Hunt group login/logout

            const html13 = `
            <div class="tbcontain">
            <label for="linename_${selectID}">Feature Label:</label>
            <input id="linename_${selectID}" type="text" placeholder="Hunt Group" value="${prefill[0] !== null ? prefill[0] : ''}" /><br/>
            </div>`;
            return html13;

        case 14:
            //Record Call

            const html14 = `
            <div class="tbcontain">
            <label for="linename_${selectID}">Feature Label:</label>
            <input id="linename_${selectID}" type="text" placeholder="Record Call" value="${prefill[0] !== null ? prefill[0] : ''}" /><br/>
            </div>`;
            return html14;
        default: 
            return `<i class="icmn-warning yellow"></i> Feature Not Found!`;
    }
}