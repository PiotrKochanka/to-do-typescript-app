const tasksListElement: HTMLElement = document.querySelector(".todo_tasks");
const categoriesListElement: HTMLElement = document.querySelector(".todo_categories");
const taskButtonElement: HTMLButtonElement = document.querySelector(".todo_add_button");
const taskNameInputELement: HTMLInputElement = document.querySelector("#add_input");

let selectedCategory: Category;

interface Task {
    name: string;
    done: boolean;
    category?: Category;
}

enum Category {
    GENERAL = "general",
    WORK = "work",
    HOBBY = "hobby",
    SPORT = "sport",
    GYM = "gym",
    SCHOOL = "school"
}

const categories: Category[] = [
    Category.GENERAL,
    Category.WORK,
    Category.HOBBY,
    Category.SPORT,
    Category.GYM,
    Category.SCHOOL
]

const tasks: Task[] = [
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
]

const renderCategories = () => {
    categories.forEach((category) => {
        const categoryElement: HTMLElement = document.createElement("li");
        categoryElement.classList.add(category);

        const categoryLabelElement: HTMLLabelElement = document.createElement("label");
        categoryLabelElement.innerText = category;

        const categoryInputElement: HTMLInputElement = document.createElement("input");
        categoryInputElement.type = "radio";
        categoryInputElement.name = "category";

        categoryElement.appendChild(categoryLabelElement);
        categoryElement.appendChild(categoryInputElement);

        categoriesListElement.appendChild(categoryElement);
    });
}

const renderTasks = () => {
    tasksListElement.innerHTML = "";
    tasks.forEach((task, index) => {
        const id: string = `task-${index}`;

        const taskElement: HTMLElement = document.createElement("li");
        if(task.category){
            taskElement.classList.add(task.category);
        }

        const labelElement: HTMLLabelElement = document.createElement("label");
        labelElement.innerText = task.name;
        labelElement.setAttribute("for", id);

        const inputElement: HTMLInputElement = document.createElement("input");
        inputElement.type = "button";
        inputElement.value = "-"
        inputElement.name = task.name;
        inputElement.id = id;
        // inputElement.checked = task.done;
        // inputElement.addEventListener("change", () => {
        //     task.done = !task.done
        // })

        taskElement.appendChild(labelElement);
        taskElement.appendChild(inputElement);

        tasksListElement.appendChild(taskElement);
    });
}

const addTask = (task: Task) => {
    tasks.push(task);
}

taskButtonElement.addEventListener("click", (event: Event) => {
    event.preventDefault();

    const taskName = taskNameInputELement.value.trim();

    if (!taskName) {
        alert("Wpisz nazwę zadania!");
        return;
    }

    // if (!selectedCategory) {
    //     alert("Wybierz kategorię!");
    //     return;
    // }

    addTask(
        {
            name: taskNameInputELement.value,
            done: false,
            category: selectedCategory
        }
    );

    taskNameInputELement.value = "";
    renderTasks();
});

renderCategories();
renderTasks();