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
        annualSalary: $('#salary-in').val()
    }

    //push to employees array
    employees.push(employee);

    //render
    console.log('employees array:', employees)

    //empty inputs
    $('.input').val('');
}

function render() {
    for (let employee of employees){
        // add row

    }
}