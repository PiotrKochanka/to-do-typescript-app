const tasksListElement = document.querySelector(".todo_tasks");
const categoriesListElement = document.querySelector(".todo_categories");
const taskButtonElement = document.querySelector(".todo_add_button");
const taskNameInputELement = document.querySelector("#add_input");
let selectedCategory;
var Category;
(function (Category) {
    Category["GENERAL"] = "general";
    Category["WORK"] = "work";
    Category["HOBBY"] = "hobby";
    Category["SPORT"] = "sport";
    Category["GYM"] = "gym";
    Category["SCHOOL"] = "school";
})(Category || (Category = {}));
const categories = [
    Category.GENERAL,
    Category.WORK,
    Category.HOBBY,
    Category.SPORT,
    Category.GYM,
    Category.SCHOOL
];
const tasks = [
    {
        name: "wynieść śmieci",
        done: false,
        category: Category.WORK
    },
    {
        name: "nakarmić psa",
        done: true
    },
    {
        name: "poćwiczyć na siłowni",
        done: false
    }
];
const renderCategories = () => {
    categories.forEach((category) => {
        const categoryElement = document.createElement("li");
        categoryElement.classList.add(category);
        const categoryLabelElement = document.createElement("label");
        categoryLabelElement.innerText = category;
        const categoryInputElement = document.createElement("input");
        categoryInputElement.type = "radio";
        categoryInputElement.name = "category";
        categoryInputElement.addEventListener("change", () => {
            selectedCategory = category;
        });
        categoryElement.appendChild(categoryLabelElement);
        categoryElement.appendChild(categoryInputElement);
        categoriesListElement.appendChild(categoryElement);
    });
};
const renderTasks = () => {
    tasksListElement.innerHTML = "";
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
        inputElement.value = "-";
        inputElement.name = task.name;
        inputElement.id = id;
        inputElement.checked = task.done;
        inputElement.addEventListener("change", () => {
            task.done = !task.done;
        });
        const buttonElement = document.createElement("button");
        buttonElement.innerHTML = "-";
        buttonElement.classList.add("usun");
        taskElement.appendChild(labelElement);
        taskElement.appendChild(labelAndInputContainer);
        labelAndInputContainer.appendChild(inputElement);
        labelAndInputContainer.appendChild(buttonElement);
        tasksListElement.appendChild(taskElement);
    });
};
const addTask = (task) => {
    tasks.push(task);
};
taskButtonElement.addEventListener("click", (event) => {
    event.preventDefault();
    const taskName = taskNameInputELement.value.trim();
    if (!taskName) {
        alert("Wpisz nazwę zadania!");
        return;
    }
    if (!selectedCategory) {
        alert("Wybierz kategorię!");
        return;
    }
    addTask({
        name: taskNameInputELement.value,
        done: false,
        category: selectedCategory
    });
    taskNameInputELement.value = "";
    renderTasks();
});
renderCategories();
renderTasks();
