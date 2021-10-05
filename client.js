console.log('js loaded');

let employees = [];
let errors = {
    noInput: 'Enter employee info above',
    noSalary: 'Must include employee salary'
}

//for styling and testing
/*
employees.push(
    {firstName:'bill', lastName:'', id:1234, title: 'burglar', annualSalary:20321},
    {firstName:'bill', lastName:'', id:1234, title: 'burglar', annualSalary:20321}
);
*/

$(function () {
    console.log('jquery loaded');

    // add click handlers
    $('#submit-button').on('click', addEmployee);

    // dynamic click handlers
    $('#table-body').on('click', '.delete-button', deleteEmployee);

    render();
})

function render() {
    // clear table and errorDiv
    $('#table-body').empty();
    $('#error-div').empty();

    // add row for each employee
    for (let employee of employees) {
        let employeeMonthly = employee.annualSalary / 12;
        
        let dangerClass;
        if(employeeMonthly > 20000){
            dangerClass = 'danger';
        }

        let deleteButton = `<button class="btn-danger delete-button">Delete</button>`;
        let row = `<tr class=${dangerClass || ""}>
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

    // recalculate monthly expenses
    let monthlyExpenses = calculateMonthlyExpenses();
    //update DOM
    $('#monthly-display').html(currencyToStr(monthlyExpenses));
}

function addEmployee() {
    //get values from dom
    let employee = {
        firstName: $('#first-in').val(),
        lastName: $('#last-in').val(),
        id: $('#id-in').val(),
        title: $('#title-in').val(),
        annualSalary: parseInt($('#salary-in').val())
    }

    //validate
    let error = validate(employee);
    let errorDiv = $('#error-container');

    switch (error) {
        case errors.noInput:
            //write error message and terminate
            errorDiv.html(errors.noInput);
            return;
        case errors.noSalary:
            errorDiv.html(errors.noSalary);
            return;
        default:
            //clear error messages if there are any;
            errorDiv.empty();
    }

    //push to employees array
    employees.push(employee);

    //render
    //console.log('employees array:', employees)
    render();

    //empty inputs
    $('.input').val('');
}

function calculateMonthlyExpenses() {
    //update monthly expenses
    //watch out for when the last employee is deleted
    let monthlyExpenses = employees.reduce((sum, employee) => {
        // sum all in array, but only if !NaN
        return sum + (employee.annualSalary || 0);
    }, 0) / 12;

    return monthlyExpenses;
}

function deleteEmployee() {
    //remove from array
    let employeeRow = $(this).closest('tr');
    let employeeIndex = employeeRow.index();
    employees.splice(employeeIndex, 1);

    //re-render
    render();
}

function currencyToStr(number) {
    // grab that snippet from stackexchange
    return number.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });
}

function validate(inputObj) {
    //loop through object keys and return error message if no fields
    let infoPresent = false;
    for (let key in inputObj) {
        if (inputObj[key]) {
            infoPresent = true;
            break;
        }
    }

    //check for missing salary
    if (!inputObj.annualSalary && infoPresent) {
        return errors.noSalary;
    } else if (infoPresent) {
        //no errors detected
        return;
    }

    //no fields filled, return noInput error
    return errors.noInput;
}