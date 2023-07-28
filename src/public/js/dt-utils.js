function getCheckedRowsInJSON() {
    var checkedRows = [];
    var table = $('#deviceDisplay').DataTable();

    // Select all checkboxes that are checked
    var checkedCheckboxes = table.column(0).nodes().to$().find(':checkbox:checked'); // Assuming checkbox is in the first column

    checkedCheckboxes.each(function () {
        var checkboxRow = $(this).closest('tr');
        var rowData = table.row(checkboxRow).data();

        var rowObject = {};
        rowData.forEach(function (cellData, cellIndex) {
            var columnName = table.column(cellIndex).header().innerText.trim();
            var cellDataParsed = $.parseHTML(cellData)[0].textContent;
            rowObject[columnName] = cellDataParsed;
        });

        checkedRows.push(rowObject);
    });

    return checkedRows;
}