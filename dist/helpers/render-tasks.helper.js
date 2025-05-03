export const renderTasks = (tasksListElement, tasks, saveDataLocalStorage) => {
    tasksListElement.innerHTML = ""; // Czyszczenie listy zadań przed jej renderowaniem
    tasks.forEach((task, index) => {
        const id = `task-${index}`;
        const taskElement = document.createElement("li");
        console.log(task.category);
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
        inputElement.addEventListener("change", () => {
            task.done = !task.done;
            task.done
                ? taskElement.classList.add("checked")
                : taskElement.classList.remove("checked");
            saveDataLocalStorage(); // Zapisz dane w localStorage
        });
        const buttonElement = document.createElement("button");
        buttonElement.innerHTML = "x";
        buttonElement.classList.add("usun");
        buttonElement.addEventListener("click", () => {
            removeTask(index, tasks, tasksListElement, saveDataLocalStorage); // Usuwanie zadania
        });
        if (task.done) {
            taskElement.classList.add("checked");
        }
        taskElement.appendChild(labelElement);
        taskElement.appendChild(labelAndInputContainer);
        labelAndInputContainer.appendChild(inputElement);
        labelAndInputContainer.appendChild(buttonElement);
        tasksListElement.appendChild(taskElement);
    });
};
// Funkcja do usuwania zadania
const removeTask = (index, tasks, tasksListElement, saveDataLocalStorage) => {
    tasks.splice(index, 1);
    renderTasks(tasksListElement, tasks, saveDataLocalStorage);
    saveDataLocalStorage();
};
