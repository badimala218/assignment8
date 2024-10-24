/*eslint-env browser*/

var $ = function (id) {
    "use strict";
    return window.document.getElementById(id);
};

let employee_list = [];
employee_list[0] = ["Merlin", "Magic", "7777"];
employee_list[1] = ["Gawain", "Security", "4646"];
employee_list[2] = ["Arthur", "CEO", "2222"];
employee_list[3] = ["Lancelot", "Loss Prevention", "3333"];
employee_list[4] = ["Morgana", "Legal", "6666"];

function add(evt) {
    "use strict";
    let name = $("newName");
    let title = $("newTitle");
    let extension = $("newExtension");
    $("errorName").innerHTML = "";
    $("errorTitle").innerHTML = "";
    $("errorExt").innerHTML = "";

    // Validate
    let valid = true;
    if (name.value === "")
    {
        valid = false;
        const nameError = $("errorName");
        nameError.appendChild(document.createTextNode("Invalid entry"));
    } 
    if (title.value === "")
    {
        valid = false;
        const titleError = $("errorTitle");
        titleError.appendChild(document.createTextNode("Invalid entry"));
    } 
    if (extension.value === "")
    {
        valid = false
        const extError = $("errorExt");
        extError.appendChild(document.createTextNode("Invalid entry"));
    }
    // if valid, update list and heading
    if (valid)
    {    
        employee_list.push([name.value, title.value, extension.value]);
        updateEmployeeDisplay();
    }
}

function del(evt) {
    "use strict";
    let target = evt.currentTarget.parentNode.parentNode;
    console.log(target);
    let index = parseInt(target.id.replace(/^[^\d]+/, ""));
    if (Number.isNaN(index) || index < 0 || index > employee_list.length) {
        window.console.log("Invalid employee number. " + index);
    } else {
        let employee = employee_list.splice(index, 1);
        window.console.log(employee + ' was deleted.');
        // Update employee display
        updateEmployeeDisplay();
    }
}

const tableHeader = "<tr id='tableHeader'><th>Name</th><th>Title</th><th>Extension</th><th></th></tr>";

function updateEmployeeDisplay()
{
    "use strict";
    $("employeeTable").innerHTML = tableHeader;
    $("employeeCount").innerHTML = "Showing " + employee_list.length + " Employees";
    for (const index in employee_list)
    {
        let employeeEntry = employee_list[index];
        const newEmployee = document.createElement("tr");
        const newName = document.createElement("td");
        const newTitle = document.createElement("td");
        const newExtension = document.createElement("td");
        const newNameText = document.createTextNode(employeeEntry[0]);
        const newTitleText = document.createTextNode(employeeEntry[1]);
        const newExtensionText = document.createTextNode(employeeEntry[2]);
        newName.appendChild(newNameText);
        newTitle.appendChild(newTitleText);
        newExtension.appendChild(newExtensionText);
        newEmployee.appendChild(newName);
        newEmployee.appendChild(newTitle);
        newEmployee.appendChild(newExtension);
        
        // Add the button
        const dataElement = document.createElement("td");
        const deleteButton = document.createElement("input");
        deleteButton.setAttribute("type", "button");
        deleteButton.setAttribute("value", "Delete");
        deleteButton.setAttribute("class", "delete");
        dataElement.appendChild(deleteButton);
        newEmployee.appendChild(dataElement);
        newEmployee.setAttribute("id", "employee" + index);
        $("employeeTable").appendChild(newEmployee);
    }
    addDeleteEventListeners();
}

function addDeleteEventListeners()
{
    const elements = window.document.getElementsByClassName("delete");
    for (const element of elements) 
    {
        element.addEventListener("click", del);
    }
}

window.addEventListener("load", function () {
    "use strict";
    // Update display
    updateEmployeeDisplay();
    $("add").addEventListener("click", add);
    addDeleteEventListeners();
});