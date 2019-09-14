'use strict';

const dayNum = document.querySelector('.day_num');
const dayName = document.querySelector('.day_name');
const monthAndYear = document.querySelector('.month_year');
const tasks = document.querySelector('.tasks');
const doneTasks = document.querySelector('.done_tasks');
const input = document.querySelector('.input');
const addTaskBtn = document.querySelector( '.add_task');
const modal = document.querySelector('.modal');
const modalBtn = document.querySelector('.modal_btn');
const modalContainer = document.querySelector('.modal_container');
const error = document.querySelector('.error');
const emptyMsg = document.querySelector('.empty_msg');
let taskArray = [];
let doneArray = [];

function createDate() {
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const esDate = currentDate.toLocaleDateString('es-ES', options).split(' ');
    dayNum.innerHTML = esDate[1];
    dayName.innerHTML= esDate[0].slice(0, esDate[0].length -1);
    monthAndYear.innerHTML = esDate[3] + ', ' + esDate[5];
}

function getSavedTasks() {
    const savedTasks = localStorage.getItem('taskArray');
    const savedDonedTasks = localStorage.getItem('doneArray');
    if(!savedTasks) {
        taskArray = [];
    }else {
        taskArray = JSON.parse(savedTasks);
        for(let i= 0; i< taskArray.length; i++) {
            createTaskItem(i);
        }
    }
    if(!savedDonedTasks) {
        doneArray = [];
    }else {
        doneArray = JSON.parse(savedDonedTasks);
        for(let i= 0; i< doneArray.length; i++) {
            createDoneItem(i);
        }
    }
    if(!savedTasks && !savedDonedTasks) {
        emptyMsg.classList.add('show');
    }
}

function createTaskItem(i) {
    emptyMsg.classList.remove('show');
    const listItem = document.createElement('li');
    listItem.classList.add('list_item');
    const newItem = document.createElement('div');
    newItem.classList.add('task_item');
    const newLabel = document.createElement('p');
    newLabel.classList.add('label');
    newLabel.id = i;
    const roundCheck = document.createElement('span');
    roundCheck.classList.add('round_check');
    const newContent = document.createTextNode(taskArray[i]);
    const trashIcon = document.createElement('i');
    trashIcon.classList.add('fas', 'fa-trash-alt', 'trash_icon');
    tasks.appendChild(listItem);
    listItem.appendChild(newItem);
    newItem.appendChild(roundCheck);
    newItem.appendChild(newLabel);
    newLabel.appendChild(newContent);
    listItem.appendChild(trashIcon);
   
    newItem.addEventListener('click', () => {
        doneArray.push(taskArray[i]);
        taskArray.splice(newLabel.id, 1);
        tasks.innerHTML = "";
        for(let i= 0; i< taskArray.length; i++) {
            createTaskItem(i);
        }
        localStorage.setItem('taskArray', JSON.stringify(taskArray));
       
        doneTasks.innerHTML = '';
        for(let i= 0; i< doneArray.length; i++) {
            createDoneItem(i);
        }
        localStorage.setItem('doneArray', JSON.stringify(doneArray));
        console.log('tasks ' +taskArray);
        console.log('done ' +doneArray);
    });
    trashIcon.addEventListener('click', () => {
        taskArray.splice(newLabel.id, 1);
        localStorage.setItem('taskArray', JSON.stringify(taskArray));
        tasks.innerHTML = "";
        for(let i= 0; i< taskArray.length; i++) {
            createTaskItem(i);
        }
    });     
}

function createDoneItem(i) {
    const listItem = document.createElement('li');
    listItem.classList.add('list_item');
    const newItem = document.createElement('div');
    newItem.classList.add('task_item');
    const newLabel = document.createElement('p');
    newLabel.classList.add('label', 'done');
    newLabel.id = i;
    const roundCheck = document.createElement('span');
    roundCheck.classList.add('round_check', 'checked');
    const newContent = document.createTextNode(doneArray[i]);
    const trashIcon = document.createElement('i');
    trashIcon.classList.add('fas', 'fa-trash-alt', 'trash_icon');
    doneTasks.appendChild(listItem);
    listItem.appendChild(newItem);
    newItem.appendChild(roundCheck);
    newItem.appendChild(newLabel);
    newLabel.appendChild(newContent);
    listItem.appendChild(trashIcon);

    newItem.addEventListener('click', () => {
        taskArray.unshift(doneArray[i]);
        doneArray.splice(newLabel.id, 1);
        doneTasks.innerHTML = "";
        for(let i= 0; i< doneArray.length; i++) {
            createDoneItem(i);
        }
        localStorage.setItem('doneArray', JSON.stringify(doneArray));
        tasks.innerHTML= '';
        for(let i= 0; i< taskArray.length; i++) {
            createTaskItem(i);
        }
        localStorage.setItem('taskArray', JSON.stringify(taskArray));
       
        console.log('tasks ' +taskArray);
        console.log('done ' +doneArray);
    });
    trashIcon.addEventListener('click', () => {
        doneArray.splice(newLabel.id, 1);
        localStorage.setItem('doneArray', JSON.stringify(doneArray));
        doneTasks.innerHTML = "";
        for(let i= 0; i< doneArray.length; i++) {
            createDoneItem(i);
        }
    });     
}

function showModal() {
    modalContainer.classList.toggle('show_shadow');
    modal.classList.toggle('show');
    error.classList.remove('show');
}

function addTasks() {
    let newTask = input.value;
    const index = taskArray.length;
    if(newTask) {
        taskArray.push(newTask);
        localStorage.setItem('taskArray', JSON.stringify(taskArray));
        showModal();
        createTaskItem(index, tasks, taskArray);
        
    }else {
        error.classList.add('show');
    }
   input.value = '';
}

createDate();
getSavedTasks();
modalBtn.addEventListener('click', showModal);
addTaskBtn.addEventListener('click', addTasks);
modalContainer.addEventListener('click',showModal);
