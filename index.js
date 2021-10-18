const inquirer = require('inquirer')
const fs = require('fs')
// const Employee = require('./lib/Employee')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')
const Manager = require('./lib/Manager')
const generateTeam = require('./util/generateHtml')
var team = []

init()

function init() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'addEmployee',
            message: 'Would you like to add an employee?',
            choices: ['Yes','No']
        }
    ])
    .then(data => {
        switch(data.addEmployee) {
            case 'Yes':
                newEmployee();
                break;
            case 'No':
                fs.writeFileSync('index.html',generateTeam(team),err => err ? console.log(err):console.log('HTML Generated'))
                break;
        }
    })
}

function newEmployee() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'employeeType',
            message: 'What type of employee do you want to add?',
            choices: ['Manager','Engineer','Intern']
        }
    ])
    .then(data => {
        switch(data.employeeType) {
            case 'Manager': newManager()
                break;
            case 'Engineer': newEngineer()
                break;
            case 'Intern': newIntern()
                break;
        }
    })
}

function newManager() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Adding a manager. What is their name?'
        },
        {
            type: 'number',
            name: 'id',
            message: 'What is their employee id?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is their email address?'
        },
        {
            type: 'number',
            name: 'officeNumber',
            message: 'What is their office number?'
        }
    ])
    .then(data => {
        const manager = new Manager(data.name,data.id,data.email,data.officeNumber)
        team.push(manager)
        init()
    })
}

function newEngineer() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Adding an engineer. What is their name?'
        },
        {
            type: 'number',
            name: 'id',
            message: 'What is their employee id?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is their email address?'
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is their GitHub username?'
        }
    ])
    .then(data => {
        const engineer = new Engineer(data.name,data.id,data.email,data.github)
        team.push(engineer)
        init()
    })
}

function newIntern() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Adding an intern. What is their name?'
        },
        {
            type: 'number',
            name: 'id',
            message: 'What is their employee id?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is their email address?'
        },
        {
            type: 'input',
            name: 'school',
            message: 'What is their school?'
        }
    ])
    .then(data => {
        const intern = new Intern(data.name,data.id,data.email,data.school)
        team.push(intern)
        init()
    })
}
