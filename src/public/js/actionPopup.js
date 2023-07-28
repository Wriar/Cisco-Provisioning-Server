let globalData = null;


function detectAction() {
    //Get the ?action= query string from the URL.
    const urlParams = new URLSearchParams(window.location.search);
    let action = urlParams.get('act');
    let data = urlParams.get('data');

    data = atob(data);

    console.log(`Action: ${action}, Data: ${data}`);

    return [action, data];
}

function renderAction(action, data) {

    console.log("Got Action: " + action);
    switch (action) {
        case "dash_exportSelection":
            document.getElementById('actionText').innerText = `Selection Data Export`;

            //Loop through the data as json
            let dataJSON = JSON.parse(data);

            //Clear InnerHTML of #dash_exportSelection_select
            document.getElementById("dash_exportSelection_select").innerHTML = "";

            let count = 0;

            //For each item, append a new row to the <select> element in #dash_exportSelection
            let select = document.getElementById("dash_exportSelection_select");
            dataJSON.forEach(function (item) {
                let option = document.createElement("option");
                option.text = `${item["Name"]} (${item["Extension"]} - ${item["Model"]}) - ${item["MAC Address"]}`;
                option.value = item["MAC Address"];
                select.add(option);

                count++;
            });

            document.getElementById('dash_exportSelection_count').innerText = count;

            globalData = dataJSON;
            break;

        default:
            document.getElementById('actionText').innerText = `Unknown Action`;
            alert("Action was not recognized. Please try again.");

            //Close the window if its a popup
            if (window.opener) {
                window.close();
            }
            break;
    }
}

function dash_exportSelection_doExport() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/exportDataRequest", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("Response: " + xhr.responseText);
            let response = JSON.parse(xhr.responseText);

            if (response.code === 0) {

                let data = response.data;
                const fileName = `cpmExport-${Date.now()}.json`
                downloadObjectAsJson(data, "cpmExport-" + Date.now());

                const dialogResponse = confirm(`The export file is currently downloading (${fileName}). To close this page, select OK. To remain on this page, select Cancel.`);

                if (dialogResponse) {
                    window.close();
                }

            } else {
                alert("An Error Has Occured: " + response.error);
            }
        }
    }

    const data = {
        "action": "dash_exportSelection_doExport",
        "data": globalData
    };

    xhr.send(JSON.stringify(data));
}

function downloadObjectAsJson(exportObj, exportName) {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

//If changes were made to the DOM, prompt the user to save changes before closing the window.
window.onbeforeunload = function () {
    if (window.opener) {
        window.opener.postMessage("close", "*");
    }
}

function closeWindow() {
    window.close();
}

renderAction(detectAction()[0], detectAction()[1]);