const taskDoneElement = document.querySelector(".todo_tasks_done");
export const renderTasks = (tasksListElement, tasks, saveDataLocalStorage) => {
    tasksListElement.innerHTML = "";
    taskDoneElement.innerHTML = "";
    tasks.forEach((task, index) => {
        const id = `task-${index}`;
        const taskElement = document.createElement("li");
        if (task.category) {
            taskElement.classList.add(task.category);
        }
        const labelAndInputContainer = document.createElement("div");
        labelAndInputContainer.classList.add("tasks_buttons");
        const labelElement = document.createElement("label");
        labelElement.innerText = task.name;
        labelElement.setAttribute("for", id);
        const inputElement = document.createElement("input");
        inputElement.type = "checkbox";
        inputElement.name = task.name;
        inputElement.id = id;
        inputElement.checked = task.done;
        const buttonElement = document.createElement("button");
        buttonElement.innerHTML = "x";
        buttonElement.classList.add("usun");
        buttonElement.addEventListener("click", () => {
            removeTask(index, tasks, tasksListElement, saveDataLocalStorage);
        });
        inputElement.addEventListener("change", () => {
            task.done = !task.done;
            saveDataLocalStorage();
            renderTasks(tasksListElement, tasks, saveDataLocalStorage);
        });
        if (task.done) {
            taskElement.classList.add("checked");
            taskDoneElement.appendChild(taskElement);
        }
        else {
            tasksListElement.appendChild(taskElement);
        }
        taskElement.appendChild(labelElement);
        taskElement.appendChild(labelAndInputContainer);
        labelAndInputContainer.appendChild(inputElement);
        labelAndInputContainer.appendChild(buttonElement);
    });
};
const removeTask = (index, tasks, tasksListElement, saveDataLocalStorage) => {
    tasks.splice(index, 1);
    renderTasks(tasksListElement, tasks, saveDataLocalStorage);
    saveDataLocalStorage();
};
