/**
 * Populates the dashboard BOXES with the most up-to-date data from the server.
 */

function updateDashBoxes() {
    try {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/org-statistics', true);
        xhr.onload = function () {
            if (this.status === 200) {
                const response = JSON.parse(this.responseText);
                if (response.code == 1) {
                    createToast(1, response.error);
                    return;
                }
                document.getElementById('txt-db-endpoints').innerText = response.provisionedEndpoints;
                document.getElementById('txt-db-devices').innerText = response.totalDevices;
                document.getElementById('txt-db-requests').innerText = response.totalProvisioningRequests;
                document.getElementById('txt-db-errors').innerText = response.totalProvisioningErrors;

                //Remove 'loading' class from all boxes
                document.getElementById('txt-db-endpoints').classList.remove('loading');
                document.getElementById('txt-db-devices').classList.remove('loading');
                document.getElementById('txt-db-requests').classList.remove('loading');
                document.getElementById('txt-db-errors').classList.remove('loading');

                console.log("Dashboard boxes updated!");

            } else {
                createToast(1, "Unable to retrieve server statistics (" + this.status + ")");
                return;
            }
        }
        xhr.send();
    } catch (ex) {
        console.log(ex);
        createToast(1, "Unable to retrieve server statistics.");
    }

}

//Runs when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    //Wait
    setTimeout(() => {
        //Update dashboard boxes
        updateDashBoxes();
        getServerLogs();
    }, 500);

    //Run all page scripts (may be crossreferenced on different files)
    setInterval(() => {
        if (logStatus) {
            console.log("Server Log Request Started!");
            getServerLogs();
            updateDashBoxes();
        }
    }, 5000);
});

function createNewTab(url) {
    window.open(url, '_blank');
}