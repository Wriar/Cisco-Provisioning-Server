function doLogin() {
    document.getElementById('errorText').style.display = "none";

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    //Verify that username and password are present
    if (!username || !password) {
        document.getElementById('errorText').style.display = "block";
        document.getElementById('errorText').innerText = "Please enter a Username and Password";
        return;
    }

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/auth", true);

    xhr.setRequestHeader("Content-Type", "application/json");

    try {
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE) {
                const response = JSON.parse(this.responseText);
                if (response.code === 0) {
                    window.location.href = "/dashboard";
                } else {
                    //Successful server response, but error
                    document.getElementById('errorText').style.display = "block";
                    document.getElementById('errorText').innerText = response.error;
                }
            }
        }

        xhr.send(JSON.stringify({ username: username, password: password }));
    } catch (e) {
        //Problem with server or request
        console.log(e);
        document.getElementById('errorText').style.display = "block";
        document.getElementById('errorText').innerText = "An error has occured (104)";
    }
}


document.getElementById("btn-submit").addEventListener("click", doLogin);

//Register enter key to doLogin for ALL input elements
document.querySelectorAll("input").forEach((element) => {
    element.addEventListener("keyup", (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            doLogin();
        }
    });
});