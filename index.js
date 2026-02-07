function addTask() {
    const taskBar = document.querySelector('#taskBar');
    const message = document.querySelector('#message');
    let task = taskBar.value.trim();

    if (task == '') {
        errorMessage = 'Digite algo para adicionar uma tarefa.'
        message.textContent = errorMessage;
        message.style.backgroundColor = '#d12727';
        message.style.color = '#fff';
    }

    else {
        const tasks = document.querySelector('#tasks');

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';

        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'fa-solid fa-trash-can';

        let newTask = document.createElement('li');
        newTask.className = 'new-task';

        sucessMessage = 'Tarefa adicionada com sucesso!';
        message.textContent = sucessMessage;
        message.style.backgroundColor = '#84dd1e';
        message.style.color = '#fff';


        newTask.textContent = task;
        tasks.appendChild(newTask);
        newTask.appendChild(deleteBtn);
        deleteBtn.appendChild(deleteIcon);

        deleteBtn.addEventListener('click', function () {
            deleteBtn.parentElement.remove();  // .remove() desprende o deleteBtn (filho) de seu pai (newTask/tarefa),
        });                                    // fazendo com que ele suma.

        console.log(newTask.textContent);
    }

    taskBar.value = '';
}