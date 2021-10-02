console.log('js loaded');

let employees = [];

$(function(){
    console.log('jquery loaded');

    // add click handlers
    $('#submit-button').on('click', addEmployee);

    // dynamic click handlers
    $('#table-body').on('click', '.delete-button', deleteEmployee);
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
            <td>${currencyToStr(employee.annualSalary)}</td>
            <td>${deleteButton}</td>
            </tr>`

        $('#table-body').append(row);
    }

    //update monthly expenses
    //watch out for when the last employee is deleted
    let monthlyExpenses = employees.reduce((sum, employee) => {
        return sum + employee.annualSalary/12;
    }, 0);

    $('#monthly-display').html(currencyToStr(monthlyExpenses));

    console.log('monthlyExpenses: ', monthlyExpenses);
}

function deleteEmployee(){
    console.log('deleteEmployee called');
    
    // remove employee from employees array
    let employeeRow = $(this).closest('tr');
    let employeeIndex = employeeRow.index();

    //remove from array
    employees.splice(employeeIndex, 1);
    
    //re-render
    render();
}

function currencyToStr(number){
    // grab that snippet from stackexchange
    return number.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });
}


// OTHER NOTES
/*
    add form validation
*/