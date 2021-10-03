console.log('js loaded');

let employees = [];

//for styling and testing
/*
employees.push(
    {firstName:'bill', lastName:'', id:1234, title: 'burglar', annualSalary:20321},
    {firstName:'bill', lastName:'', id:1234, title: 'burglar', annualSalary:20321}
);
*/

console.log('employees', employees)

$(function(){
    console.log('jquery loaded');

    // add click handlers
    $('#submit-button').on('click', addEmployee);

    // dynamic click handlers
    $('#table-body').on('click', '.delete-button', deleteEmployee);

    render();
})

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
            <td>${employee.annualSalary ? 
                currencyToStr(employee.annualSalary) : ''}</td>
            <td class="delete-cell">${deleteButton}</td>
            </tr>`

        $('#table-body').append(row);
    }

    // recalulate monthly expenses
    let monthlyExpenses = calculateMonthlyExpenses();
    //update DOM
    $('#monthly-display').html(currencyToStr(monthlyExpenses));
}

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

function calculateMonthlyExpenses(){
     //update monthly expenses
    //watch out for when the last employee is deleted
    let monthlyExpenses = employees.reduce((sum, employee) => {
        // sum all in array, but only if !NaN
        return sum + (employee.annualSalary || 0);
    }, 0)/12;

    return monthlyExpenses
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
