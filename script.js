// Model
let tasks = [
    /* { description: 'Handle til middag', person:'Julenissen', isDone: true },
    { description: 'Lage middag', person:'Julenissen', isDone: false },
    { description: 'Spise middag', person:'Meg selv', isDone: false }, */
];

// View
const tasksTable = document.getElementById('tasksTable');
show();

function show() {
    let html = /*html*/`
        <tr>
            <th>Oppgave</th>
            <th>Gjort</th>
            <th>Tid ferdig med oppgave</th>
            <th>Ansvarlig person</th>
            <th></th>
        </tr>`;
    for (let i = 0; i < tasks.length; i++) {
        html += createHtmlRow(i);
    }
    tasksTable.innerHTML = html;
}

function createHtmlRow(i) {
    const task = tasks[i];
    const checkedHtml = task.isDone ? 'checked="checked"' : '';
    let timestamp = task.timestamp ? task.timestamp.toLocaleString('no-nb') : '';
    let html;
    if (!task.editMode) {
        html = /*html*/`
            <tr>
                <td>${task.description}</td>
                <td><input onchange="changeIsDone(this, ${i})" type="checkbox" ${checkedHtml} /></td>
                <td>${timestamp}</td>
                <td>${task.person}</td>
                <td>
                    <button onclick="deleteTask(${i})">Slett</button>
                    <button onclick="editTask(${i})">Rediger</button>
                </td>
            </tr>
        `;

        return html;
    }

    html = /*html*/`
        <tr>
            <td><input id="editDescription${i}" type="text" value="${task.description}"/></td>
            <td><input onchange="changeIsDone(this, ${i})" type="checkbox" ${checkedHtml} /></td>
            <td>${timestamp}</td>
            <td><input id="editPerson${i}" type="text" value="${task.person}"></td>
            <td>
                <button onclick="updateTask(${i})">Lagre</button>
            </td>
        </tr>
    `;

    return html;
}

// Controller
function addTask() {
    const taskDescriptionInput = document.getElementById('taskDescription');
    const taskResponsiblePerson = document.getElementById('taskResponsiblePerson');

    tasks.push({
        description: taskDescriptionInput.value,
        person: taskResponsiblePerson.value,
        isDone: false
    });
    taskDescriptionInput.value = '';
    show();
}

function changeIsDone(checkbox, index) {
    tasks[index].isDone = checkbox.checked;
    tasks[index].timestamp = checkbox.checked ? new Date() : '';
    show();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    show();
}

function editTask(index) {
    tasks[index].editMode = true;
    show();
}

function updateTask(index) {
    const inputDescription = document.getElementById('editDescription'+index);
    const inputPerson = document.getElementById('editPerson'+index);
    
    const task = tasks[index];
    task.description = inputDescription.value;
    task.person = inputPerson.value;
    task.editMode = false;
    show();
}

function addDemoData() {
    tasks.push({ description: 'Handle til middag', person:'Meg selv', isDone: false });
    tasks.push({ description: 'Lage middag', person:'Vet ikke', isDone: false });
    tasks.push({ description: 'Spise middag', person:'Meg selv', isDone: false });
    tasks.push({ description: 'Rydde inn i oppvaskmaskin', person: 'Noen andre', isDone: false });
    tasks.push({ description: 'Rydde ut av oppvaskmaskin', person: 'Julenissen', isDone: false });
    show();
}