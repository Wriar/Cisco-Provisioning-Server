function createToast(code, message) {
    switch (code) {
        case 1:
            Toastify({
                text: `${message}`,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    borderLeft: "3px solid pink",
                    background: "red",
                    color: "white"
                },
                onClick: function () { } // Callback after click
            }).showToast();
            break;
        case 0:
            Toastify({
                text: message,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    borderLeft: "3px solid gainsboro",
                    background: "green",
                    color: "white"
                },
                onClick: function () { } // Callback after click
            }).showToast();
            break;
        default:
            alert(message);
            break;

    }
}