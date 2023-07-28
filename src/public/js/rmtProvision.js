function reprovision() {
    //Create a long-polling xhr request to the server
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/remoteReprovision', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            console.log(response);
            document.getElementById('xtra').style.display = 'block';
            document.getElementById('utilInfo').innerHTML = "Reprovisioning has completed. Please check the results below.";


            if (response.code === 0) {

                document.getElementById('fs').style.border = "1px solid mediumseagreen";
                document.getElementById('fsLegend').style.color = "mediumseagreen";

                let select = document.getElementById('dash_exportSelection_select');

                select.innerHTML = "";
                let results = response.results;
                let failed = 0;
                let provisioned = 0;
                results.forEach(result => {
                    if (result.success == false) {
                        failed += 1;
                        //Append to the select
                        let option = document.createElement("option");
                        option.text = `${result["host"]} - ${result["error"]}`;
                        option.value = result["MAC Address"];
                        select.add(option);

                        document.getElementById('warnText').innerHTML = `<i class="icmn-warning"></i> The following devices by IP failed to provision. To retry these devices, please click the "Begin Provision" button below.`;
                    } else {
                        provisioned += 1;

                        //Remove the IP from ips
                        ips = ips.filter(ip => ip !== result["host"]);

                    }
                });
                document.getElementById('headText').innerHTML = `Reprovisioning Complete. ${provisioned} / ${results.length} devices were successfully reprovisioned.`;

                //Clear dash_exportSelection_select <select> and replace it with the results
                

            } else {
                document.getElementById('headText').innerHTML = "Reprovisioning Failed.";

            }

        } else {
            console.log("Error: " + xhr.responseText);
        }
    };

    xhr.send(JSON.stringify({
        ips: ips
    }));

    //Scroll to top
    window.scrollTo(0, 0);

    document.getElementById('xtra').style.display = 'none';
    document.getElementById('utilInfo').innerHTML = "Please wait while reprovisioning takes place. Depending on the number of devices, this may take several minutes. You will be automatically notified when this process completes. <b>Please do not use your browser's back button or refresh at this time.</b>";
    document.getElementById('headText').innerHTML = "<img src='/shared/ico/preloader.gif' style='height: 1rem;' alt='loading'>&nbsp;Reprovisioning in progress...";
    document.getElementById('fs').style.border = "1px solid orange";
    document.getElementById('fsLegend').style.color = "orange";

}

const select = document.getElementById('dash_exportSelection_select');
let ips = [];

function pageOnLoad() {
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get('data');
    const dataReduce = JSON.parse(atob(data));

    console.log(dataReduce);

    let deviceCount = 0;

    dataReduce.forEach(item => {
        deviceCount++;
        let option = document.createElement("option");
        option.text = `${item["Name"]} (${item["Extension"]} - ${item["IP Address"]}) - ${item["MAC Address"]}`;
        option.value = item["MAC Address"];
        ips.push(item["IP Address"]);
        select.add(option);
    });

    document.getElementById('rpCount').innerText = deviceCount;
}

pageOnLoad();

