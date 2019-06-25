

const THEAD = ['name', 'value', 'domain', 'delete']

// Creates a table of all cookies on the browser
function createTable(cookies) {
    var table = document.createElement('table');

    // Creating the table head.
    var tableHead = document.createElement('thead');
    var tableHeadRow = document.createElement('tr');
    THEAD.forEach(function(header) {
        var cell = document.createElement('th');
        cell.appendChild(document.createTextNode(header));
        tableHeadRow.appendChild(cell)
    });
    tableHead.appendChild(tableHeadRow)
    table.appendChild(tableHead)

    // Creating the table body
    var tableBody = document.createElement('tbody');
    cookies.forEach(function(cookie) {
        // Creating a row
        var tableBodyRow = document.createElement('tr');

        // Name
        var name = document.createElement('td');
        name.appendChild(document.createTextNode(format(cookie.name, 20)));
        tableBodyRow.appendChild(name);

        // Value
        var value = document.createElement('td');
        value.appendChild(document.createTextNode(format(cookie.value, 20)));
        tableBodyRow.appendChild(value);

        // Domain
        var domain = document.createElement('td');
        domain.appendChild(document.createTextNode(format(cookie.domain, 40)));
        tableBodyRow.appendChild(domain);

        // Delete Button
        var del = document.createElement('td');
        var button = document.createElement('button')
        button.addEventListener('click', function() {
            delCookie(cookie);
            tableBody.removeChild(tableBodyRow);
            //chrome.cookies.getAll({}, createTable); // need to remove the chlid now
        });
        button.appendChild(document.createTextNode('delete'));
        del.appendChild(button);
        tableBodyRow.appendChild(del);

        tableBody.appendChild(tableBodyRow);
    });

    table.appendChild(tableBody);

    document.getElementById('table-wrapper').appendChild(table);
}

function delCookie(cookie) {
    var url = '';
    if (cookie.secure) {
        url = 'https://' + cookie.domain + cookie.path;
    } else {
        url = 'http://' + cookie.domain + cookie.path;
    }

    chrome.cookies.remove({'url': url, 'name': cookie.name});
}

// Formats a string down to a given length, appending '...' if it is too long
function format(str, len) {
    if (str.length > len) {
        return str.substring(0, len - 3) + '...'
    } else {
        return str
    }
}

document.addEventListener('DOMContentLoaded', function() {
    chrome.cookies.getAll({}, createTable);
});
