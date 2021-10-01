console.log('js loaded');

let employees = [];

$(function(){
    console.log('jquery loaded');

    // add click handlers
    $('#submit-button').on('click', addEmployee)


    // dynamic click handlers
})

function addEmployee() {
    console.log('addEmployee called');

    //get values from dom
    let employee = {
        firstName: $('#first-in').val(),
        lastName: $('#last-in').val(),
        id: $('#id-in').val(),
        title: $('#title-in').val(),
        annualSalary: parseInt($('#salary-in').val())
    }

    //push to employees array
    employees.push(employee);

    //render
    //console.log('employees array:', employees)
    render();

    //empty inputs
    $('.input').val('');
}

function render() {
    // clear table
    $('#table-body').empty();

    // add row for each employee
    for (let employee of employees){
        let deleteButton = `<button class="btn-danger delete-button">Delete</button>`;
        let row = `<tr>
            <td>${employee.firstName}</td>
            <td>${employee.lastName}</td>
            <td>${employee.id}</td>
            <td>${employee.title}</td>
            <td>${employee.annualSalary}</td>
            <td>${deleteButton}</td>
            </tr>`

        $('#table-body').append(row);
    }
}

function formatCurrency(){
    
}