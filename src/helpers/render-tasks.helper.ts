import { Task } from '../types/types.js';

export const renderTasks = (
    tasksListElement: HTMLElement, 
    tasks: Task[], 
    saveDataLocalStorage: Function
) => {
    tasksListElement.innerHTML = "";  // Czyszczenie listy zadań przed jej renderowaniem

    tasks.forEach((task, index) => {
        const id: string = `task-${index}`;

        const taskElement: HTMLElement = document.createElement("li");
        console.log(task.category);
        if (task.category) {
            taskElement.classList.add(task.category);
        }

        const labelAndInputContainer: HTMLElement = document.createElement("div");
        labelAndInputContainer.classList.add("tasks_buttons");

        const labelElement: HTMLLabelElement = document.createElement("label");
        labelElement.innerText = task.name;
        labelElement.setAttribute("for", id);

        const inputElement: HTMLInputElement = document.createElement("input");
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

        const buttonElement: HTMLButtonElement = document.createElement("button");
        buttonElement.innerHTML = "x";
        buttonElement.classList.add("usun");
        buttonElement.addEventListener("click", () => {
            removeTask(index, tasks, tasksListElement, saveDataLocalStorage);  // Usuwanie zadania
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
const removeTask = (index: number, tasks: Task[], tasksListElement: HTMLElement, saveDataLocalStorage: Function) => {
    tasks.splice(index, 1); 
    renderTasks(tasksListElement, tasks, saveDataLocalStorage); 
    saveDataLocalStorage();
};
