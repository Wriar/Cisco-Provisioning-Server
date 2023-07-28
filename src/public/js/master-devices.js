console.log("Loaded Master Devices");

function a_createNew() {
}


function a_selectAll() {

    //Toggle the select all checkbox (selectAllCheckbox) to checked.
    let selectAllCheckbox = document.getElementById("selectAllCheckbox");
    selectAllCheckbox.checked = true;


    let table = $('#deviceDisplay').DataTable();
    let checkboxes = table.column(0, { search: 'applied' }).nodes().to$().find(':checkbox');

    checkboxes.prop('checked', true);
}

function a_deselectAll() {
    //Toggle the select all checkbox (selectAllCheckbox) to unchecked.
    let selectAllCheckbox = document.getElementById("selectAllCheckbox");
    selectAllCheckbox.checked = false;

    let table = $('#deviceDisplay').DataTable();
    let checkboxes = table.column(0, { search: 'applied' }).nodes().to$().find(':checkbox');

    checkboxes.prop('checked', false);
}

function a_deleteSelection() {

}

function a_reprovisionSelection() {
    let checkedRows = getCheckedRowsInJSON();

    //Check if there are any rows checked
    if (checkedRows.length == 0) {
        createToast(1, "No rows are selected. Please select device(s) and try again.");
        return;
    }

    let data = btoa(JSON.stringify(checkedRows));

    window.open(`/dashboard/remoteProvision?data=${data}`, "actionPopup", "width=500,height=650,resizeable=0");
}

function a_exportSelection() {
    let checkedRows = getCheckedRowsInJSON();

    //Check if there are any rows checked
    if (checkedRows.length == 0) {
        createToast(1, "No rows are selected. Please select device(s) and try again.");
        return;
    }

    let data = btoa(JSON.stringify(checkedRows));

    window.open(`/dashboard/action?act=dash_exportSelection&data=${data}`, "actionPopup", "width=500,height=650,resizeable=0");
}

function a_verifySelection() {

}


let buttons = document.querySelectorAll(".menuItem button");
for(let i = 0; i < buttons.length; i++) {
    switch(i) {
        case 0:
            buttons[i].addEventListener("click", a_createNew);
            break;
        case 1:
            buttons[i].addEventListener("click", a_selectAll);
            break;
        case 2:
            buttons[i].addEventListener("click", a_deselectAll);
            break;
        case 3:
            buttons[i].addEventListener("click", a_deleteSelection);
            break;
        case 4:
            buttons[i].addEventListener("click", a_reprovisionSelection);
            break;
        case 5:
            buttons[i].addEventListener("click", a_exportSelection);
            break;
        case 6:
            buttons[i].addEventListener("click", a_verifySelection);
            break;
    }
}

function createNewTab(url) {
    window.open(url, '_blank');
}